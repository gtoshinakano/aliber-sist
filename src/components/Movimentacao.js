import React from 'react'
import {addDays, getMonth, format} from 'date-fns'
import {
  DatePicker,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  SelectPicker,
  InputNumber,
  InputPicker,
  Button,
  Icon,
  Alert,
  Grid, Row, Col
} from 'rsuite'
import axios from 'axios'
import MovFinList from './MovFinList'
import TempMovFinList from './TempMovFinList'
import moment from 'moment';



const Movimentacao = (props) => {

  const date = new Date()

  const [form, setForm] = React.useState({
    'data': date,
    'tipo': "Receita",
    'descricao': "",
    'ano_ref': moment().format('YYYY'),
    'mes_ref': meses[getMonth(new Date())].value,
    'dia_ref': "",
    'valor': 0,
    'obs': "",
    'username': props.username
  })
  const [loading, setLoading] = React.useState(false)
  const [list, setList] = React.useState([])
  const [key, setKey] = React.useState(new Date())

  Alert.config({ top:215 } )

  //const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSskdb47vLTyZwyxYs_---KTemjeXIeaYia2CfRc_q2SPxz92OhRvfm9DpYfgC_kB82mTnuDrXS3mGj/pubhtml?gid=1550895360&amp;single=true&amp;widget=true&amp;headers=false"

  const movi_endpoint = process.env.REACT_APP_API_HOST

  const formChange = (e) => {
    let toForm = {...e}
    if(e.tipo === "Receita" || e.tipo === "Despesa Mensal")
      toForm.dia_ref = ""

    setForm({...form, ...toForm})
  }

  const handleSubmit = (e) => {
    setLoading(true)
    axios.get(movi_endpoint, {
      params: {
        type:'add-mov-fin',
        dados: list
      }
    })
    .then(e => {
      Alert.success('Movimentação Financeira adicionada com sucesso a partir da linha ' + e.data.row + ' da planilha "movimentacao_financeira".', 5000)
      setList([])
      setLoading(false)
    })
    .catch(err => console.log(err))
  }

  const handleAddToList = () => {
    let newList = [...list]
    newList.push({
      ...form,
      valor: form.valor.toString().replace('.',','),
      data: format(form.data, 'dd/MM/yy'),
      timestamp: format(new Date(), 'dd/MM/yyyy hh:mm:ss')
    })
    setList(newList)
    setKey(new Date())
    setForm({...form, descricao: "", valor: 0, obs: ""})
  }

  const resetList = () => setList([])

  const isValid = () => {
    if(form["descricao"] === "") return false
    else if(form["valor"] <= 0 ) return false
    else if(form["data"] === null ) return false
    else if((form.tipo === "Contribuição" || form.tipo === "Despesa") && form.dia_ref === "") return false
    else return true
  }

  return (
    <>
      <div style={styles.formContainer} key={key}>
        <Form value={form} onChange={formChange} fluid layout="inline">
          <FormGroup>
            <ControlLabel>Data</ControlLabel>
            <FormControl
              name="data"
              accepter={DatePicker}
              format="DD/MM/YYYY"
              oneTap={true}
              ranges={[
                {
                  label: 'Hoje',
                  value: new Date()
                },
                {
                  label: 'Ontem',
                  value: addDays(new Date(), -1),
                }
              ]}
              value={form.data}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Tipo</ControlLabel>
            <FormControl
              name="tipo"
              accepter={SelectPicker}
              data={[
                {value: "Contribuição", label: "Contribuição"},
                {value: "Receita", label: "Receita"},
                {value: "Despesa", label: "Despesa"},
                {value: "Despesa Mensal", label:"Despesa Mensal"}]
              }
              cleanable={false}
              value={form.tipo}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Mês</ControlLabel>
            <FormControl
              name="mes_ref"
              accepter={SelectPicker}
              data={meses}
              value={form["mes_ref"]}
              cleanable={false}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Ano</ControlLabel>
            <FormControl
              name="ano_ref"
              value={form.ano_ref}
              placeholder="Ano de referência"
              style={styles.smallFields}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Dia</ControlLabel>
            <FormControl
              name="dia_ref"
              disabled={form.tipo === "Receita" || form.tipo === "Despesa Mensal"}
              value={form.dia_ref}
              placeholder="Dia(s) de referência"
              style={styles.smallFields}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Descrição</ControlLabel>
            <FormControl
              name="descricao"
              accepter={InputPicker}
              value={form["descricao"]}
              data={descricoes}
              placeholder="Digite uma descrição"
              cleanable={true}
              creatable={true}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Valor</ControlLabel>
            <FormControl
              name="valor"
              accepter={InputNumber}
              value={form["valor"]}
              placeholder="Digite o valor"
              step={0.1}
              min={0}
              style={styles.smallFields}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Obs</ControlLabel>
            <FormControl
              name="obs"
              value={form["obs"]}
              placeholder="Opcional"
              style={styles.obsField}
            />
          </FormGroup>
          <Button
            type="submit"
            onClick={handleAddToList}
            appearance='primary'
            disabled={!isValid() || loading}
            loading={loading}
          >
            Adicionar à Lista
          </Button>
        </Form>
      </div>
      <Grid fluid>
        <Row className="show-grid">
          <Col xs={24} sm={24} md={12}>
            <TempMovFinList list={list} setList={setList} loading={loading} />
            <div style={styles.actionBottom}>
              <Button
                onClick={resetList}
                size="lg"
                color="red"
                disabled={list.length === 0}
              >
                <Icon icon="trash" /> Limpar Lista
              </Button>
              <br />
              <Button
                onClick={handleSubmit}
                size="lg"
                color="blue"
                style={styles.button}
                disabled={list.length === 0 || loading}
                loading={loading}
              >
                <Icon icon="check" /> Enviar Lista
              </Button>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
          <div>
            {!loading && <MovFinList />}
          </div>
          </Col>
        </Row>
      </Grid>
      {/*!loading && <Iframe
          url={url}
          width="100%"
          height="780px"
        />*/}
    </>
  )
}

export default Movimentacao

const styles = {
  formContainer: {margin: 8, paddingTop:8},
  smallFields: {width: 80},
  obsField: {width: 100},
  actionBottom: {margin: 10},
  button: {marginTop: 10}
}

const meses = [
  {value: "Janeiro", label: "Janeiro"},
  {value: "Fevereiro", label: "Fevereiro"},
  {value: "Março", label: "Março"},
  {value: "Abril", label: "Abril"},
  {value: "Maio", label: "Maio"},
  {value: "Junho", label: "Junho"},
  {value: "Julho", label: "Julho"},
  {value: "Agosto", label: "Agosto"},
  {value: "Setembro", label: "Setembro"},
  {value: "Outubro", label: "Outubro"},
  {value: "Novembro", label: "Novembro"},
  {value: "Dezembro", label: "Dezembro"},
]

const descricoes = [
  {label: "Contrib. Setor Artesanato", value: "Contribuições Setor de Artesanato"},
  {label: "Contrib. Setor Alimentação", value: "Contribuições Setor de Alimentação"},
  {label: '"Tô Legal"', value: 'Contribuição do Programa "Tô Legal"'},
  {label: 'Contrib. de Guarda - Barraca', value: 'Contribuição de Guarda - Barraca'},
  {label: 'Serviço de Limpeza', value: 'Serviço de Limpeza'},
  {label: 'Apoio ao Turista', value: 'Apoio ao Turista'},
  {label: 'Guarda-Barraca', value: 'Guarda-Barraca'},
  {label: 'Sacos de Lixo', value: 'Sacos de Lixo'},
  {label: 'Mat. de Limpeza', value: 'Material de Limpeza'},
  {label: 'Vale Refeição', value: 'Vale Refeição'},
  {label: 'Coleta de Lixo', value: 'Coleta de Lixo'},
  {label: 'Mat. de Escritório', value: 'Material de Escritório'},
  {label: 'Telefone (a serviço da Feira)', value: 'Telefone (a serviço da Feira)'},
  {label: 'Transporte (a serviço da Feira)', value: 'Transporte (a serviço da Feira)'},
  {label: 'Conta de Luz', value: 'Conta de Luz'},
  {label: 'Conta de Água', value: 'Conta de Água'},
  {label: 'Manut. Praça da Liberdade', value: 'Manutencao da Praça da Liberdade'},
  {label: 'Depósito', value: 'Depósito'},
  {label: 'Tarifa Bancária', value: 'Tarifa Bancária'},
  {label: 'Rateio Conta de Luz', value: 'Rateio Conta de Luz'},
  {label: 'Rateio Conta de Água', value: 'Rateio Conta de Água'},
  {label: 'Honor. Escrit. Contabilidade', value: 'Honorários Escritorio de Contabilidade'},
  {label: 'Koden', value: 'Koden'},
  {label: 'Serv. Assess. Jurídica honorários', value: 'Serviços de Assessoria Jurídica honorarios'},
  {label: 'Confecção de camisetas para Limpeza', value: 'Confecção de camisetas para Limpeza'},
  {label: 'Despesas à serviço da Feira', value: 'Despesas à serviço da Feira'},
  {label: 'Serviços Extra', value: 'Serviços Extra'},
  {label: 'Rendimento Aplicações', value: 'Rendimento Aplicações'},
]

//"https://docs.google.com/spreadsheets/d/e/2PACX-1vSskdb47vLTyZwyxYs_---KTemjeXIeaYia2CfRc_q2SPxz92OhRvfm9DpYfgC_kB82mTnuDrXS3mGj/pubhtml?gid=1550895360&amp;single=true&amp;widget=true&amp;headers=false"
