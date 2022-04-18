import React, {useState} from 'react'
import Modal from 'react-modal'

export default function CardNameModal({card, cardIndex, columnIndex, appState, setAppState,  cardNameModalIsOpen, setCardNameModalOpen}) {

    Modal.setAppElement('#root');

    const [cardName, setCardName] = useState(card.name);
    function changeName(){
        let boards = [...appState.boards];
        boards[appState.current_board].columns[columnIndex].cards[cardIndex].name = cardName;
        console.log('New name must be: ', cardName)
        setAppState({ ...appState, boards });
    }


    return (
            <Modal isOpen={cardNameModalIsOpen} shouldCloseOnOverlayClick={false} onRequestClose={()=>setCardNameModalOpen(false)}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <h1>{card.name}</h1>
                    <i className="fas fa-times" onClick={() => setCardNameModalOpen(false)}></i>
                </div>
                <h4>From list {appState.boards[appState.current_board].columns[columnIndex].name} in board {appState.boards[appState.current_board].name}</h4>
                    <input onChange={(event)=>setCardName(event.target.value)} value={cardName} style={{
                        width: "100%",
                        padding: "12px 20px",
                        margin: "8px 0",
                        display: "inline-block",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        boxSizing: "border-box"
                    }}/>
                <br/>
                    <button type="button" className="btn btn-outline-secondary btn-lg px-5 text-light" onClick={()=>{
                        changeName();
                        setCardNameModalOpen(false);
                    }} style={{backgroundColor: "#4126ab"}}>
                        Change Card name
                    </button>
            </Modal>
  )
}
