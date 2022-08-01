import React from 'react'
import {Nav, Icon} from 'rsuite'
//import HelpModal from './HelpModal'

const styles = {
  marginBottom: 5
};

const Menu = (props) => {

  const [active, setActive] = React.useState("movimentacao") 

  const onSelect = (e) => {
    setActive(e)
    props.onSelect(e)
  }

  return (
    <Nav {...props} activeKey={active} appearance="subtle" onSelect={onSelect} style={styles}>
      <Nav.Item eventKey="movimentacao" icon={<Icon icon="usd" />}>
        Movimentação Financeira
      </Nav.Item>
      {/*<Nav.Item eventKey="lista-expositor" icon={<Icon icon="people-group" />}>Lista de Expositor</Nav.Item>*/}
      <Nav.Item eventKey="financeiro" icon={<Icon icon="money" />}>
        Balanço Mensal
      </Nav.Item>
      <Nav.Item eventKey="ajuda" icon={<Icon icon="help-o" />}>
        Ajuda
      </Nav.Item>
    </Nav>
  )
}

export default Menu
