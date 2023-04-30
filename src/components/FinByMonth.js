import React from 'react';
import { Loader, Icon, Toggle, Dropdown } from 'rsuite';
import axios from 'axios';
import { useQuery } from 'react-query';
import moment from 'moment';
import 'moment/locale/pt-br';
import FinByMonthViews from './FinByMonthViews';

const FinByMonth = () => {
  const { isLoading, data } = useQuery(
    'all-finances', () => axios.get(process.env.REACT_APP_API_HOST + '?type=get-all-mov-fin-list').then(
      res => {
        let array = [...res.data]
        const keys = array.shift()
        return array.map(row => {
          let ret = {}
          row.map((col, index) => ret[keys[index]] = col)
          return ret
        })
      }
    ), { staleTime: Infinity })

  const { isLoading: depositIsLoading, data: deposits } = useQuery('deposits', () => axios.get(
    process.env.REACT_APP_API_HOST + '?type=get-deposits').then(res => res.data)
    , { staleTime: Infinity }
  )

  const [config, setConfig] = React.useState(_config);


  const changeConfigMes = (key) => setConfig({ ...config, mes_ref: key })
  const changeConfigAno = (key) => setConfig({ ...config, ano_ref: key })
  const changeConfigView = (checked) => setConfig({ ...config, view: checked ? "Tabela" : "Board" })



  if (isLoading || depositIsLoading) return <div className="fixed w-full h-full"> <Loader inverse center backdrop content="loading..." /> </div>
  else if (data && deposits) {
    const uniqueAnos = [...new Set(data.map(item => item.ano_ref))];
    const filteredData = data.filter(item => item.ano_ref === config.ano_ref && item.mes_ref === config.mes_ref)
    const monthDeposits = deposits.filter(f => f[0] === config.mes_ref && f[1].toString() === config.ano_ref)
    const depositMatrix = [deposits[0] || [], ...monthDeposits]
    const depositList = jsonify(depositMatrix)

    return (
      <div className="flex flex-wrap">
        <div className="w-full inline-flex justify-between items-center">
          <div className=""><img src="logo.jpg" alt="Aliber logo" className="w-16" /></div>
          <div className="text-center text-lg font-bold text-black">
            ALIBER ASSOCIAÇÃO DOS EXPOSITORES<br />DA FEIRA DA PRAÇA DA LIBERDADE
          </div>
          <div className="w-16"></div>
        </div>
        <div className="inline-flex mt-4 items-center">
          <Toggle checked={config.view === "Tabela"} onChange={changeConfigView} checkedChildren={<Icon icon="table" />} unCheckedChildren={<Icon icon="building2" />} />
          <MesDropdown config={config} changeConfigMes={changeConfigMes} />
          <AnoDropdown config={config} changeConfigAno={changeConfigAno} data={uniqueAnos} />
        </div>
        <div className="w-full">
          <FinByMonthViews data={filteredData} deposits={depositList} config={config} />
        </div>
      </div>
    );
  }
}

export default FinByMonth;

moment.locale('pt-br')

const _config = {
  view: "Tabela",
  mes_ref: moment().format("MMMM").charAt(0).toUpperCase() + moment().format("MMMM").slice(1),
  ano_ref: moment().format("YYYY"),
}

const MesDropdown = ({ config, changeConfigMes }) => (
  <Dropdown title={config.mes_ref} activeKey={config.mes_ref} size="lg" noCaret>
    <Dropdown.Item onSelect={changeConfigMes} eventKey="Janeiro">Janeiro</Dropdown.Item>
    <Dropdown.Item onSelect={changeConfigMes} eventKey="Fevereiro">Fevereiro</Dropdown.Item>
    <Dropdown.Item onSelect={changeConfigMes} eventKey="Março">Março</Dropdown.Item>
    <Dropdown.Item onSelect={changeConfigMes} eventKey="Abril">Abril</Dropdown.Item>
    <Dropdown.Item onSelect={changeConfigMes} eventKey="Maio">Maio</Dropdown.Item>
    <Dropdown.Item onSelect={changeConfigMes} eventKey="Junho">Junho</Dropdown.Item>
    <Dropdown.Item onSelect={changeConfigMes} eventKey="Julho">Julho</Dropdown.Item>
    <Dropdown.Item onSelect={changeConfigMes} eventKey="Agosto">Agosto</Dropdown.Item>
    <Dropdown.Item onSelect={changeConfigMes} eventKey="Setembro">Setembro</Dropdown.Item>
    <Dropdown.Item onSelect={changeConfigMes} eventKey="Outubro">Outubro</Dropdown.Item>
    <Dropdown.Item onSelect={changeConfigMes} eventKey="Novembro">Novembro</Dropdown.Item>
    <Dropdown.Item onSelect={changeConfigMes} eventKey="Dezembro">Dezembro</Dropdown.Item>
  </Dropdown>
)

const AnoDropdown = ({ config, changeConfigAno, data }) => (
  <Dropdown title={config.ano_ref} activeKey={config.ano_ref} size="lg" noCaret>
    {data.map(item => (
      <Dropdown.Item onSelect={changeConfigAno} key={item} eventKey={item}>{item}</Dropdown.Item>
    ))}
  </Dropdown>
)


function jsonify(arr) {
  let ret = []
  const keys = arr[0]
  arr.forEach((val, i) => {
    if (i !== 0) ret.push(objectify(val, keys))
  })
  return ret
}

function objectify(value, keys) {
  let ret = {}
  value.forEach((val, i) => {
    ret[keys[i]] = val
  })
  return ret
}