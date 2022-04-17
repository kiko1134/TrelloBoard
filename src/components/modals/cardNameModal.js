import React from 'react'
import Modal from 'react-modal'

export default function CardNameModal({card, cardIndex, columnIndex, appState, setAppState,  cardNameModalIsOpen, setCardNameModalOpen}) {

    Modal.setAppElement('#root');
    
    return (
    <Modal isOpen={cardNameModalIsOpen} shouldCloseOnOverlayClick={false} onRequestClose={()=>setCardNameModalOpen(false)}> 
        <h1>CardNameModal: {card.name} from column: {appState.boards[appState.current_board].columns[columnIndex].name} (Board: {appState.boards[appState.current_board].name})</h1>
        <p>TODO: edit card name(probably with Object.assign())</p>
        <h1>Closes with Esc button (for now)</h1>
    </Modal>
  )
}
