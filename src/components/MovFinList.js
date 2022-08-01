import React from 'react'
import axios from 'axios'
import { Table, IconButton, Icon, Alert } from 'rsuite';
import moment from 'moment'
import ConfirmModal from './ConfirmModal'
import _ from 'lodash'

const MovFinList = () => {

  const [list, setList] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    axios.get(process.env.REACT_APP_API_HOST + '?type=get-mov-fin-list')
    .then(res => {
      let l = res.data
      l.shift()
      const objList = l.map(i => {
        return {
          data: moment(i[0]).format("DD/MM/YYYY"),
          tipo: i[1],
          descricao: i[2],
          mes_ref: i[3],
          ano_ref: i[4],
          dia_ref: i[5],
          valor: i[6],
          obs: i[7],
          timestamp: moment(i[8]).format('DD/MM/YY HH:mm:ss'),
          getKey: i[8]
        }
      })
      setList(_.reverse(objList))
      setLoading(false)
    })
  }

  return (
    <>
      <Table
        height={500}
        data={list}
        loading={loading}
      >
        <Table.Column width={150} align="center" fixed>
          <Table.HeaderCell>Criado em</Table.HeaderCell>
          <Table.Cell dataKey="timestamp" />
        </Table.Column>

        <Table.Column width={150} align="center">
          <Table.HeaderCell>Data</Table.HeaderCell>
          <Table.Cell dataKey="data" />
        </Table.Column>

        <Table.Column width={130}>
          <Table.HeaderCell>Tipo</Table.HeaderCell>
          <Table.Cell dataKey="tipo" />
        </Table.Column>

        <Table.Column width={130}>
          <Table.HeaderCell>Descrição</Table.HeaderCell>
          <Table.Cell dataKey="descricao" />
        </Table.Column>

        <Table.Column width={80}>
          <Table.HeaderCell>Mês Ref.</Table.HeaderCell>
          <Table.Cell dataKey="mes_ref" />
        </Table.Column>

        <Table.Column width={80}>
          <Table.HeaderCell>Ano Ref.</Table.HeaderCell>
          <Table.Cell dataKey="ano_ref" />
        </Table.Column>

        <Table.Column width={80}>
          <Table.HeaderCell>Dia Ref.</Table.HeaderCell>
          <Table.Cell dataKey="dia_ref" />
        </Table.Column>

        <Table.Column width={100}>
          <Table.HeaderCell>Valor</Table.HeaderCell>
          <Table.Cell dataKey="valor" />
        </Table.Column>

        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Observações</Table.HeaderCell>
          <Table.Cell dataKey="obs" />
        </Table.Column>
        <Table.Column width={80} fixed="right">
            <Table.HeaderCell>Apagar</Table.HeaderCell>
            <ActionCell dataKey={'getKey'} setLoading={setLoading} updateData={getData} />
          </Table.Column>
      </Table>
    </>
  )
}

const ActionCell = ({ rowData, dataKey, setLoading, updateData, ...props }) => {

  const handleAction = async () => {
    setLoading(true)
    const modalProps = {
      content: "TEM CERTEZA DE QUE DESEJA APAGAR ESTA MOVIMENTAÇÃO FINANCEIRA ?",
      confirmButton: "APAGAR",
      cancelButton: "CANCELAR"
    }
    const result = await ConfirmModal.show(modalProps);
    if(result) {
      axios.get(process.env.REACT_APP_API_HOST + '?type=rem-mov-fin&key=' + rowData[dataKey])
      .then(res => {
        updateData()
        Alert.success('Removido com êxito')
      })
    }else setLoading(false)

  }

  return (
    <Table.Cell {...props} className="link-group">
      <IconButton
        appearance="subtle"
        onClick={handleAction}
        icon={<Icon icon="trash" />}
      />
    </Table.Cell>
  );
};

export default MovFinList
