import React from 'react'
import {Modal, Button, Icon, InputPicker, InputNumber, Input} from 'rsuite'
import { render } from 'react-dom'
import moment from 'moment'

let resolve

class UpdateModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      props: {},
      form: {
        data: "",
        tipo: "",
        descricao: "",
        mes_ref: "",
        ano_ref:"",
        dia_ref:"",
        valor:"",
        obs:"",
        timestamp: "",
        username: ""
      }
    }
  }

  static create(props={}) {
    const containerElement = document.createElement('div');
    document.body.appendChild(containerElement);
    return render(<UpdateModal creteProps={props} />, containerElement);
  }

  handleClose= () => {
    this.setState({open: false})
    resolve(false)
  }

  handleConfirm = () => {
    this.setState({open: false})
    resolve({data: this.state.form, success: true})
  }

  show = (props = {}) => {
    const confirmProps = { ...this.props.createProps, ...props };
    this.setState({open: true, props: confirmProps, form: confirmProps.formVal})
    return new Promise((res) => {
      resolve = res;
    });
  }

  handleFormChange = (value, name) => {
    this.setState({form: {...this.state.form, [name]: value}})
  }

  render (){
    const { props, form } = this.state
    return (
      <Modal backdrop="static" show={this.state.open} onHide={this.handleClose} size="xs" enforceFocus>
        <Modal.Body className='mt-0'>
          <div className='flex w-full flex-wrap'>
            <div className='w-full uppercase font-semibold'>
              <Icon
                icon="pencil"
                style={{
                  color: '#ffb300',
                  fontSize: 24,
                  marginRight: 5
                }}
              />
              {props.content ? props.content : "Confirma a ação ?"}
            </div>
            <UpdateForm form={form} handleFormChange={this.handleFormChange} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleConfirm} appearance="primary">
            {props.confirmButton ? props.confirmButton : "Ok"}
          </Button>
          <Button onClick={this.handleClose} appearance="subtle">
            {props.cancelButton ? props.cancelButton : "Cancelar"}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

}

const UpdateForm = ({form, handleFormChange}) => {

  return(
    <div className='w-full flex flex-col'>
      <div className='my-4'>
        {moment(form.data).format("DD/MM/YYYY")} | {form.tipo} | {form.mes_ref} | {form.ano_ref} | {form.dia_ref}
      </div>
      <div className='mb-3 flex flex-col'>
        <label className='font-semibold mb-2 text-blue-600'>Descrição</label>
        <InputPicker 
          value={form.descricao}
          data={descricoes}
          onChange={(v) => handleFormChange(v, "descricao")}
          placeholder="Digite uma descrição"
          cleanable={true}
          creatable={true} className="w-full"
        />
      </div>
      <div className='mb-3 flex flex-col'>
        <label className='font-semibold mb-2 text-blue-600'>Valor</label>
        <InputNumber 
          value={form.valor}
          min={0}
          step={0.01}
          onChange={(v) => handleFormChange(v, "valor")}
          placeholder="Digite uma descrição"
        />
      </div>
      <div className='mb-3 flex flex-col'>
        <label className='font-semibold mb-2 text-blue-600'>Observação</label>
        <Input
          value={form.obs}
          onChange={(v) => handleFormChange(v, "obs")}
          placeholder="Observação"
          className="w-full"
          componentClass="textarea"
          rows={3}
        />
      </div>
      
    </div>
  )
}


export default UpdateModal.create()


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