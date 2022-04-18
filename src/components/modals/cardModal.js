import React from 'react'
import Modal from 'react-modal'

export default function CardModal({card, cardIndex, columnIndex, appState, setAppState,  cardModalIsOpen, setCardModalOpen}) {

    if(!card) return <></>;

    Modal.setAppElement('#root');
    
    return (
    <Modal isOpen={cardModalIsOpen} shouldCloseOnOverlayClick={false} onRequestClose={()=>setCardModalOpen(false)}> 
        <h1>CardModal: {card.name} from column: {appState.boards[appState.current_board].columns[columnIndex].name} (Board: {appState.boards[appState.current_board].name})</h1>
        <p>TODO: Card inside buttons</p>
        <h1>Closes with Esc button (for now)</h1>
    </Modal>
  )
}
