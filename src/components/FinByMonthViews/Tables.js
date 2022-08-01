import React from 'react';
import {Table, Divider} from 'rsuite';
import _ from 'lodash';
import { useQuery } from 'react-query';
import moment from 'moment';
import axios from 'axios'

const ByDayTable = ({data, title, negative}) => {

  const uniqueDays = [...new Set(data.map(item => item.dia_ref))].sort();
  const uniqueDesc = [...new Set(data.map(item => item.descricao))];
  if(data.length > 0){
    let prepared = []
    let totals = { descricao: <b>TOTAL</b>}
    uniqueDesc.forEach(el => {
      let toPush = { descricao: el }
      uniqueDays.forEach(day => {
        totals[day.toString()] = totals[day.toString()] || 0
        const filtered = data.filter(f=>f.dia_ref === day && f.descricao === el)
        toPush[day.toString()] = filtered[0]?.valor || 0
        totals[day.toString()]+= filtered[0]?.valor || 0
      })
      prepared.push(toPush)
    });
    prepared.push(totals)

    return (
      <Table data={prepared} autoHeight rowHeight={25} hover={false}  >
        <Table.Column fixed resizable verticalAlign="top" width={250}>
          <Table.HeaderCell>{title}</Table.HeaderCell>
          <Table.Cell>{rowData => (
              <small>{rowData.descricao}</small>
            )}</Table.Cell>
        </Table.Column>
        {uniqueDays.map((day, i) => (
          <Table.Column key={day} align="center" resizable verticalAlign="top" width={70}>
            <Table.HeaderCell>Dia {day}</Table.HeaderCell>
            <Table.Cell>{(rowData, rowIndex) => { 
              return(
              <small  className={`${rowIndex === prepared.length-1 && "font-bold text-sm"} block text-center`}
              >{negative && rowData[day.toString()] > 0 && "-"}{rowData[day.toString()].toFixed(2).replace(".",",")}</small>
            )}}</Table.Cell>
          </Table.Column>
          )
        )}
        
      </Table>
    );
  }
  else return ""
}

const SimpleList = ({data, title, negative}) => {
  
  const grouped = _.groupBy(data, 'descricao')
  const prepared = []
  
  for(let key in grouped) {
    prepared.push({
      descricao: key,
      valor: _.sumBy(grouped[key], 'valor')
    }) 
  }
  let totals = { descricao: <b>TOTAL</b>}
  totals.valor = _.sumBy(prepared, 'valor')
  prepared.push(totals)

  return (
    <Table data={prepared} autoHeight rowHeight={25} hover={false} >
      <Table.Column fixed resizable verticalAlign="top" width={250}>
        <Table.HeaderCell>{title}</Table.HeaderCell>
        <Table.Cell>{rowData => (
            <small>{rowData.descricao}</small>
          )}</Table.Cell>
      </Table.Column>
      <Table.Column fixed resizable verticalAlign="top" align="center" width={70}>
        <Table.HeaderCell>Valor</Table.HeaderCell>
        <Table.Cell>{(rowData, rowIndex) => (
            <small
              className={`${rowIndex === prepared.length-1 && "font-bold text-sm"} `}
            >{negative && rowData.valor > 0 &&"-"}{rowData.valor.toFixed(2).replace(".",",")}</small>
          )}</Table.Cell>
      </Table.Column>
    </Table>
  );
}

const Statistics = ({title, data, config }) => {

  const balancesQuery = useQuery(
    'balances', () => axios.get(process.env.REACT_APP_API_HOST + '?type=get-balances').then(res=>res.data), {staleTime: Infinity})

  let balances = ! balancesQuery.isLoading ? balancesQuery.data.filter(i => i[0] === config.mes_ref && i[1] === parseInt(config.ano_ref)) : []

  return (
    <div>
      <Table data={data} autoHeight rowHeight={25} hover={false}>
        <Table.Column fixed resizable verticalAlign="top" width={130}>
          <Table.HeaderCell>{title}</Table.HeaderCell>
          <Table.Cell>{rowData => (
              <span className="font-bold">{rowData.descricao}</span>
            )}</Table.Cell>
        </Table.Column>
        <Table.Column fixed resizable verticalAlign="top" align="center" width={70}>
          <Table.HeaderCell>Valor</Table.HeaderCell>
          <Table.Cell>{(rowData) => (
              <span
                className={` `}
              >{rowData.negative && rowData.valor > 0 &&"-"}{rowData.valor.toFixed(2).replace(".",",")}</span>
            )}</Table.Cell>
        </Table.Column>
      </Table>
      {balances[0] && balances[0][2] > 0 && balances[0][2] > 0 &&<div className='w-full pl-2'>
        <h3 className='m-0 p-0'>SALDOS <span>{balances[0] && moment(balances[0][4]).isValid() ? `(${moment(balances[0][4]).format('DD/MM/YY')})`: ""}</span></h3>
        <div className='flex flex-col'>
          <div className='inline-flex justify-between'>
            <b>Caixa</b>
            <span>{balances[0] ? balances[0][2].toFixed(2).replace(".",","): 0.00}</span>
          </div>
          <div className='inline-flex justify-between'>
            <b>Banco</b>
            <span>{balances[0] ? balances[0][3].toFixed(2).replace(".",","): 0.00}</span>
          </div>
          <div className='inline-flex justify-between'>
            <b>TOTAL</b>
            <span>{balances[0] ? (balances[0][2]+balances[0][3]).toFixed(2).replace(".",","): 0.00}</span>
          </div>
        </div>
      </div>}
    </div>
  );
}

const DepositTable = ({data, title, divider}) => {

  if(data.length > 0){
    return (
      <>
        {divider && <div className="w-full"><Divider></Divider></div>}
        <h4>{title}</h4>
        <Table data={data}>
          <Table.Column width={150} align="center" fixed>
            <Table.HeaderCell>Data</Table.HeaderCell>
            <Table.Cell>{rowData => (
              moment(rowData.data).format('DD/MM/YYYY')
            )}</Table.Cell>
          </Table.Column>
          <Table.Column width={150} align="center" fixed>
            <Table.HeaderCell>Mês</Table.HeaderCell>
            <Table.Cell dataKey="mes" />
          </Table.Column>
          <Table.Column width={150} align="center" fixed>
            <Table.HeaderCell>Ano</Table.HeaderCell>
            <Table.Cell dataKey="ano" />
          </Table.Column>
          <Table.Column width={150} align="center" fixed>
            <Table.HeaderCell>Banco</Table.HeaderCell>
            <Table.Cell dataKey="banco" />
          </Table.Column>
          <Table.Column width={150} align="center" fixed>
            <Table.HeaderCell>Valor</Table.HeaderCell>
            <Table.Cell>{rowData => (
              rowData.valor.toFixed(2).replace(".",",")
            )}</Table.Cell>
          </Table.Column>
        </Table>
      </>
    )
  } else {
    return (<></>)
  }

}

export {ByDayTable, SimpleList, Statistics, DepositTable};