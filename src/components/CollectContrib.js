import React, {useState} from 'react';
import Centerer from './Centerer';
import { Button, Input, Loader } from 'rsuite';
import { useQuery } from 'react-query';
import axios from 'axios';
import moment from 'moment';


const CollectContrib = () => {
  const [operator, setOperator] = useState("toshi")
  const [form, setForm] = useState("")

  if(operator === "")
    return (
      <Centerer>
        <b>Digite o seu nome:</b>
        <Input className='mt-3' onChange={setForm} value={form} />
        <Button onClick={() => setOperator(form)} className='mt-2' block>
          Entrar
        </Button>
      </Centerer>
    );
  else return <ContribList operator={operator} />
}

export default CollectContrib;

const ContribList = ({operator}) => {

  const {isLoading} = useQuery('expositores', () => axios.get(process.env.REACT_APP_API_HOST + '?type=get-expositores').then(
    res => res.data
  ), {staleTime: Infinity})



  return (
    <div className="py-3 px-4">
      {isLoading && <Loader inverse center content="loading..." />}
      <div className='text-lg'><b>Operador: </b> {operator}</div>
      <div className='text-lg'><b>Data: </b> {moment().format("DD/MM/YYYY")}</div>
      <div className='text-lg'><b>Busca: </b> </div>
      <div className=''>
        
      </div>
    </div>
  )
}