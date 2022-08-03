import moment from 'moment';
import React from 'react';
import { Table, Divider, Alert, IconButton, Icon } from 'rsuite';
import * as Custom from './Tables'
import _ from 'lodash'
import ConfirmModal from '../ConfirmModal'
import UpdateModal from './UpdateModal'
import axios from 'axios'
import { useQueryClient, useQuery } from 'react-query';

const FinByMonthViews = ({ data, config, deposits }) => {

  const [loading, setLoading] = React.useState(false)


  if (config.view === "Tabela")
    return (
      <div className="text-black">
        <Table data={data} autoHeight hover={false} rowHeight={40}>
          <Table.Column align="center" resizable verticalAlign="middle">
            <Table.HeaderCell>Data</Table.HeaderCell>
            <Table.Cell>
              {rowData => <small>{moment(rowData.data).format('DD/MM/YY')}</small>}
            </Table.Cell>
          </Table.Column>

          <Table.Column resizable verticalAlign="middle">
            <Table.HeaderCell>Tipo</Table.HeaderCell>
            <Table.Cell>
              {rowData =>
                <small
                  className={`text-white p-1 text-xs block
                    ${rowData.tipo === "Contribuição" || rowData.tipo === "Receita"
                      ? "bg-green-500"
                      : "bg-red-500"
                    }
                  `}
                >{rowData.tipo}</small>
              }
            </Table.Cell>
          </Table.Column>

          <Table.Column resizable verticalAlign="middle" width={270}>
            <Table.HeaderCell>Descrição</Table.HeaderCell>
            <Table.Cell>{rowData => rowData.descricao}</Table.Cell>
          </Table.Column>

          <Table.Column resizable align="center" verticalAlign="middle" width={55}>
            <Table.HeaderCell>Mês Ref.</Table.HeaderCell>
            <Table.Cell>{rowData => <small>{rowData.mes_ref}</small>}</Table.Cell>
          </Table.Column>

          <Table.Column resizable align="center" verticalAlign="middle" width={55}>
            <Table.HeaderCell>Ano Ref.</Table.HeaderCell>
            <Table.Cell>{rowData => <small>{rowData.ano_ref}</small>}</Table.Cell>
          </Table.Column>

          <Table.Column resizable align="center" verticalAlign="middle" width={50}>
            <Table.HeaderCell>Dia Ref.</Table.HeaderCell>
            <Table.Cell>{rowData => <small>{rowData.dia_ref}</small>}</Table.Cell>
          </Table.Column>

          <Table.Column resizable verticalAlign="middle" align="right" width={60}>
            <Table.HeaderCell>Valor</Table.HeaderCell>
            <Table.Cell>{rowData => <span className="">{rowData.valor.toFixed(2).replace(".", ",")}</span>}</Table.Cell>
          </Table.Column>

          <Table.Column resizable verticalAlign="middle">
            <Table.HeaderCell>Obs</Table.HeaderCell>
            <Table.Cell>{rowData => <small className="ml-2">{rowData.obs}</small>}</Table.Cell>
          </Table.Column>

          <Table.Column resizable verticalAlign="middle">
            <Table.HeaderCell>Ações</Table.HeaderCell>
            <ActionCell dataKey="timestamp" loading={loading} setLoading={setLoading} />
          </Table.Column>

        </Table>
      </div>
    );
  else {
    const incomeByDay = _.filter(data, f => f.tipo === "Contribuição")
    const expenseByDay = _.filter(data, f => f.tipo === "Despesa")
    const incomeList = _.filter(data, f => f.tipo === "Receita")
    const expenseList = _.filter(data, f => f.tipo === "Despesa Mensal")

    const incomeByDayTotal = _.reduce(incomeByDay, (a, b) => a + b.valor, 0)
    const expenseByDayTotal = _.reduce(expenseByDay, (a, b) => a + b.valor, 0)
    const incomeTotal = _.reduce(incomeList, (a, b) => a + b.valor, 0)
    const expenseTotal = _.reduce(expenseList, (a, b) => a + b.valor, 0)


    const totals = [
      { descricao: "Contribuição", valor: incomeByDayTotal, negative: false },
      { descricao: "Despesa", valor: expenseByDayTotal, negative: true },
      { descricao: "Receita", valor: incomeTotal, negative: false },
      { descricao: "Despesa Mensal", valor: expenseTotal, negative: true },
      { descricao: `Resultado ${config.mes_ref}`, valor: incomeByDayTotal - expenseByDayTotal + incomeTotal - expenseTotal }
    ]

    return (
      <div className="text-black flex flex-wrap">
        <div className="w-full">
          <Custom.ByDayTable data={incomeByDay} title="ENTRADAS - Contribuições p/ dia" />
        </div>
        <div className="w-full"><Divider></Divider></div>
        <div className="w-full">
          <Custom.ByDayTable data={expenseByDay} title="SAÍDAS - Despesas p/ dia" negative />
        </div>
        <div className="w-full"><Divider></Divider></div>
        <div className="w-1/3 flex">
          <div className="w-full"><Custom.SimpleList data={expenseList} title="DESPESAS MENSAIS" negative /></div>
        </div>
        <div className="w-1/3 flex flex-wrap">
          <div className="w-full"><Custom.SimpleList data={incomeList} title="OUTRAS RECEITAS" />
          </div>
          <div className="w-full"><Custom.Statistics data={totals} deposits={deposits} config={config} /></div>
        </div>
      </div>
    );
  }
}

export default FinByMonthViews;

const ActionCell = ({ rowData, dataKey, setLoading, loading, ...props }) => {

  const queryClient = useQueryClient()
  const { isFetching } = useQuery('all-finances', { staleTime: Infinity })

  const handleDelete = async () => {
    setLoading(true)
    const deleteProps = {
      content: "TEM CERTEZA DE QUE DESEJA APAGAR ESTA MOVIMENTAÇÃO FINANCEIRA ?",
      confirmButton: "APAGAR",
      cancelButton: "CANCELAR"
    }
    const result = await ConfirmModal.show(deleteProps);
    if (result) {
      axios.get(process.env.REACT_APP_API_HOST + '?type=rem-mov-fin&key=' + rowData[dataKey])
        .then(res => {
          Alert.success('Removido com êxito')
          queryClient.invalidateQueries("all-finances")
        })
    }
    setLoading(false)

  }

  const handleUpdate = async () => {
    setLoading(true)
    const updateProps = {
      content: "Atualizar Lançamento",
      formVal: rowData,
      confirmButton: "ATUALIZAR",
      cancelButton: "CANCELAR"
    }
    const result = await UpdateModal.show(updateProps)
    if (result.success) {
      const { data } = result
      await axios.get(
        process.env.REACT_APP_API_HOST,
        {
          params: {
            type: "update-mov-fin",
            key: rowData[dataKey],
            rowdata: [
              moment(data.data).format("DD/MM/YYYY"),
              data.tipo,
              data.descricao,
              data.mes_ref,
              data.ano_ref,
              data.dia_ref,
              `${data.valor}`.replace(".", ","),
              data.obs,
              moment(data.timestamp).format("DD/MM/YYYY hh:mm:ss"),
              data.username
            ]
          }
        }
      ).then(res => {
        setLoading(false)
        Alert.success('Alterado com êxito')
        queryClient.invalidateQueries("all-finances")
      })
    } else setLoading(false)
  }

  return (
    <Table.Cell {...props} className="link-group">
      <IconButton
        appearance="subtle"
        onClick={handleUpdate}
        icon={<Icon icon="pencil" />}
        loading={isFetching || loading}
        disabled={isFetching || loading}
      />
      <IconButton
        appearance="subtle"
        onClick={handleDelete}
        icon={<Icon icon="trash" />}
        loading={isFetching || loading}
        disabled={isFetching || loading}
      />
    </Table.Cell>
  );
};
