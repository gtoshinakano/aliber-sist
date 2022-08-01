import React from 'react'
import {Button, Modal } from 'rsuite'

const HelpModal = () => {

  const [open, setOpen] = React.useState(false)

  return(
    <div className="modal-container">
      <Button size="xs" onClick={() => setOpen(true)}>
        Ajuda
      </Button>
      <Modal size="lg" show={open} onHide={() => setOpen(false)}>
        <Modal.Header>
          <Modal.Title>Ajuda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Texto de ajuda
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpen(false)} appearance="primary">
            Ok
          </Button>
          <Button onClick={() => setOpen(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default HelpModal
