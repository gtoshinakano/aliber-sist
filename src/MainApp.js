import React from 'react';
import './App.css';
import 'rsuite/dist/styles/rsuite-default.css';
import Centerer from './components/Centerer'
import {Form, FormGroup, ControlLabel, FormControl, Button, Alert} from 'rsuite'
import md5 from 'md5'

import LoggedApp from './LoggedApp'


function App() {

  const [logged, setLogged] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [user, setUser] = React.useState("")
  const [form, setForm] = React.useState({
    username: process.env.NODE_ENV === "development" ? process.env.REACT_APP_USERNAME: "",
    password: process.env.NODE_ENV === "development" ? process.env.REACT_APP_PASSWORD: ""
  })

  const formChange = (e) => {setForm({
    ...form, ...e
  })}

  const handleLogin = () => {
    setLoading(true)
    if(md5(form.password) === process.env.REACT_APP_HASH_PWD){
      setUser(form.username)
      setTimeout(() => {
        setLoading(false)
        setLogged(true)
      }, 1500)
    }else setTimeout(() => {
      setLoading(false)
      Alert.error('Senha inválida', 3000)
    }, 1000)
  }

  const formIsValid = () => {
    if(form.username === "") return false
    else if(form.password === "") return false
    else if(form.username.length < 6) return false
    else if(form.password.length < 6) return false
    else return true
  }

  if(logged){
    return (
      <div>
        <LoggedApp username={user} />
      </div>
    )
  }else{
    return(
      <Centerer>
        <Form value={form} onChange={formChange}>
          <FormGroup>
            <ControlLabel>Login</ControlLabel>
            <FormControl name="username" style={{ width: 280 }} value={form.username} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Senha</ControlLabel>
            <FormControl name="password" style={{ width:280 }} type="password" value={form.password} />
          </FormGroup>
          <Button
            disabled={!formIsValid() || loading}
            type="submit"
            onClick={handleLogin}
            color="blue"
            loading={loading}
          >
            Entrar
          </Button>
        </Form>
      </Centerer>
    )
  }

}

export default App;
