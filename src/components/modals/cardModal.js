import React from 'react'
import Modal from 'react-modal'

export default function CardModal({ card, cardIndex, columnIndex, appState, setAppState, cardModalIsOpen, setCardModalOpen }) {

  Modal.setAppElement('#root');

  return (
    <Modal isOpen={cardModalIsOpen} shouldCloseOnOverlayClick={false} onRequestClose={() => setCardModalOpen(false)}>
      <div className='CardModal'>
        <div className='title'>
          <div className='headers'>
            <h1><i className='far fa-list-alt'></i> {card.name}</h1>
            <p>form list {appState.boards[appState.current_board].columns[columnIndex].name} in board {appState.boards[appState.current_board].name}</p>
          </div>
          <i className='fas fa-times' onClick={() => { setCardModalOpen(false) }}></i>
        </div>
        <div className='content'>
          <div className='description'>
          </div>
          <div className='actions'>
            <h4>Add to card</h4>
            <div className='action'>
              <i className='far fa-user'> </i>
              <p>Creator: {localStorage.getItem('username')}</p>
            </div>
            <div className='action'>
              <i className='fas fa-tags'> </i>
              <p>Creator: {localStorage.getItem('username')}</p>
            </div>
            <div className='action'>
              <i className='far fa-clock'> </i>
              <p>Created: {new Date(card.created).toLocaleString()}</p>
              <p>Updated: {new Date(card.updated).toLocaleString()}</p>
            </div>
            <h4>Actions</h4>
            <div className='action'>
              <i className='fas fa-archive'> </i>
              <p>Archive</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
