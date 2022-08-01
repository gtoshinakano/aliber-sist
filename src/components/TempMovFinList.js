import React from 'react'
import { Table, IconButton, Icon } from 'rsuite';
import _ from 'lodash'

const TempMovFinList = ({list, setList, loading}) => {

  let receita = 0
  let despesa = 0
  list.forEach(item => {
    receita += !item.tipo.includes("Despesa") ? Number(item.valor.replace(',','.')) : 0
    despesa += item.tipo.includes("Despesa") ? Number(item.valor.replace(',','.')) : 0
  })

  return (
    <>
      <Table
        height={500}
        data={list}
        loading={loading}
        headerHeight={100}
      >

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

        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Observações</Table.HeaderCell>
          <Table.Cell dataKey="obs" />
        </Table.Column>

        <Table.Column width={160} fixed="right">
          <Table.HeaderCell><HeaderSummary title="Valor" receita={receita} despesa={despesa} /></Table.HeaderCell>
          <Table.Cell dataKey="valor" />
        </Table.Column>

        <Table.Column width={80} fixed="right">
            <Table.HeaderCell>Ações</Table.HeaderCell>
            <ActionCell dataKey={'getKey'} list={list} setList={setList} />
          </Table.Column>
      </Table>
    </>
  )
}

const ActionCell = ({ rowData, dataKey, updateData, list, setList, ...props }) => {
  const handleAction = (e) => {
    const index = _.findIndex(list, function(o) { return o.descricao === rowData.descricao && o.valor === rowData.valor})
    let lst = [...list]
    lst.splice(index, 1)
    setList(lst)
  }

  return (
    <Table.Cell {...props} className="link-group">
      <IconButton
        appearance="subtle"
        onClick={handleAction}
        icon={<Icon icon="close" />}
      />
    </Table.Cell>
  );
};

const HeaderSummary = ({ title, receita, despesa }) => (
  <div>
    <label>{title}</label>
    <div
      style={{
        fontSize: 18,
        color: '#2eabdf'
      }}
    >
      Receita: {receita.toFixed(2)}<br />
      Despesa: {despesa.toFixed(2)}
    </div>
  </div>
);

export default TempMovFinList
