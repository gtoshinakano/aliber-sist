import React from 'react';
import './App.css';
import 'rsuite/dist/styles/rsuite-default.css';
import Menu from './components/Menu'
import Movimentacao from './components/Movimentacao'
import Ajuda from './components/Ajuda'
import {Toggle, Icon} from 'rsuite'
import AppendHead from 'react-append-head';
import FinancesView from './components/FinancesView';

function LoggedApp(props) {

  const [current, setCurrent] = React.useState('movimentacao')
  const [show, setMenuShow] = React.useState(true);

  const onSelect = (e) => {
    setCurrent(e)
  }


  return (
    <div className="App">
      <AppendHead>
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
      </AppendHead>
      <header className="App-header">
        {show && <Menu onSelect={onSelect} />}
        <div className="absolute right-0 top-0 pt-2 pr-2">
          <Toggle checked={show} onChange={setMenuShow} checkedChildren={<Icon icon="bars" />} unCheckedChildren={"Impressão"} />
        </div>
      </header>
      {current === 'movimentacao' && <Movimentacao username={props.username} />}
      {current === 'financeiro' && <FinancesView />}
      {current === 'ajuda' && <Ajuda />}
    </div>
  );
}

export default LoggedApp;
