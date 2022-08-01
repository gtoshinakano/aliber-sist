import React from 'react'
import {Modal, Button, Icon} from 'rsuite'
import { render } from 'react-dom'

let resolve

class ConfirmModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      props: {}
    }
  }

  static create(props={}) {
    const containerElement = document.createElement('div');
    document.body.appendChild(containerElement);
    return render(<ConfirmModal creteProps={props} />, containerElement);
  }

  handleClose= () => {
    this.setState({open: false})
    resolve(false)
  }

  handleConfirm = () => {
    this.setState({open: false})
    resolve(true)
  }

  show = (props = {}) => {
    const confirmProps = { ...this.props.createProps, ...props };
    this.setState({open: true, props: confirmProps})
    return new Promise((res) => {
      resolve = res;
    });
  }

  render (){
    const { props } = this.state
    return (
      <Modal backdrop="static" show={this.state.open} onHide={this.handleClose} size="xs" enforceFocus>
        <Modal.Body>
          <Icon
            icon="remind"
            style={{
              color: '#ffb300',
              fontSize: 24
            }}
          />
          {props.content ? props.content : "Confirma a ação ?"}
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

export default ConfirmModal.create()
