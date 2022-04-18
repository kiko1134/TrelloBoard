import React from 'react'
import Modal from 'react-modal'

export default function CardModal({ card, cardIndex, columnIndex, appState, setAppState, cardModalIsOpen, setCardModalOpen }) {

  function showLabelInout(bool) {
    if (bool) {
      document.getElementById('inputLabel').style.display = "flex";
      document.getElementById('showInputLabelIcon').style.display = "none";
    }
    else {
      document.getElementById('inputLabel').style.display = "none";
      document.getElementById('showInputLabelIcon').style.display = "";
    }
  }

  function showDescriptionInout(element, bool) {
    if (bool) {
      element.style.display = "none";
      document.getElementById('descriptionInput').style.display = "flex";
      document.getElementById('descriptionInput').firstChild.focus();
    }
    else {
      element.style.display = "";
      document.getElementById('descriptionInput').style.display = "none";
      document.getElementById('descriptionInput').firstChild.focus();
    }
  }

  function addLabel(labelName) {
    if (labelName) {
      if (!appState.boards[appState.current_board].columns[columnIndex].cards[cardIndex].labels.includes(labelName)) {
        let boards = [...appState.boards];
        boards[appState.current_board].columns[columnIndex].cards[cardIndex].labels.push(labelName);
        setAppState({ ...appState, boards });
      }
    }
  }

  function addDescription(description) {
    if (description) {
      let boards = [...appState.boards];
      boards[appState.current_board].columns[columnIndex].cards[cardIndex].description = description;
      setAppState({ ...appState, boards })
      showDescriptionInout(document.getElementById('descriptionText'), false)
    }
  }

  function showLabels(element) {
    if (element.style.display === 'none')
      element.style.display = 'flex';
    else
      element.style.display = 'none';
  }

  function removeLabel(label) {
    let boards = [...appState.boards];
    boards[appState.current_board].columns[columnIndex].cards[cardIndex].labels = boards[appState.current_board].columns[columnIndex].cards[cardIndex].labels.filter(currentLabel => currentLabel !== label);
    setAppState({ ...appState, boards })
  }

  Modal.setAppElement('#root');

    function archiveCard() {
        let boards = [...appState.boards]
        boards[appState.current_board].columns[columnIndex].cards = boards[appState.current_board].columns[columnIndex].cards.filter((currentCard) => currentCard !== card);
        boards[appState.current_board].archive.push(card);
        setAppState({...appState, boards});
        console.log(appState.boards[appState.current_board].archive);
    }

    function moveCard(columnToMove) {
        let boards = [...appState.boards]
        boards[appState.current_board].columns[columnIndex].cards = boards[appState.current_board].columns[columnIndex].cards.filter((currentCard) => currentCard !== card);
        boards[appState.current_board].columns[columnToMove].cards.push(card);
        setAppState({...appState, boards});
    }

    return (
        <Modal isOpen={cardModalIsOpen} shouldCloseOnOverlayClick={false}
               onRequestClose={() => setCardModalOpen(false)}>
            <div className='CardModal'>
                <div className='title'>
                    <div className='headers'>
                        <h1><i className='far fa-list-alt'></i> {card.name}</h1>
                        <p>form list {appState.boards[appState.current_board].columns[columnIndex].name} in
                            board {appState.boards[appState.current_board].name}</p>
                    </div>
                    <i className='fas fa-times' onClick={() => {
                        setCardModalOpen(false)
                    }}></i>
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
                            <p onClick={archiveCard}>Archive</p>
                        </div>
                        <div className="dropdown show action">
                            <a className="btn btn-secondary dropdown-toggle" href="#" role="button"
                               id="dropdownMenuLink"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Move
                            </a>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                {
                                    appState.boards[appState.current_board].columns.map((column, index) =>
                                        <a className="dropdown-item" key={index}
                                           onClick={() => moveCard(index)}>{column.name}</a>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
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
            <h4>Labels:</h4>
            <div className='labels'>
              {
                card.labels.map(label => <p>{label}</p>)
              }
              <i className="fas fa-plus" id="showInputLabelIcon" onClick={() => showLabelInout(true)}></i>
              <div className='show-label-input' id='inputLabel'>
                <input type="text" placeholder='Enter labels name:' />
                <button className="btn btn-primary" onClick={(event) => addLabel(event.target.previousSibling.value)}>Add</button>
                <i className='fas fa-times icon' onClick={() => showLabelInout(false)}></i>
              </div>
            </div>
            <div className='descriptionTitle'>
              <h2><i className='fas fa-indent'></i> Description</h2>
              {card.description ?
                <button onClick={(event) => showDescriptionInout(event.target.parentElement.nextSibling, true)}>Edit</button>
                : <></>
              }
            </div>
            {card.description.trim() ?
              <h5 id='descriptionText' onClick={(event) => showDescriptionInout(event.target, true)}>{card.description}</h5>
              : <h5 className='fakeInput' onClick={(event) => showDescriptionInout(event.target, true)}>Add a more detailed description…</h5>
            }
            <div className='descriptionInput' id='descriptionInput'>
              <textarea defaultValue={card.description}></textarea>
              <div className='buttons'>
                <button className="btn btn-primary" onClick={(event) => { addDescription(event.target.parentElement.previousSibling.value) }}>Save</button>
                <i className='fas fa-times' onClick={(event) => showDescriptionInout(event.target.parentElement.parentElement.previousSibling, false)}></i>
              </div>
            </div>
          </div>
          <div className='actions'>
            <h4>Add to card</h4>
            <div className='action'>
              <i className='far fa-user'> </i>
              <p>Creator: {localStorage.getItem('username')}</p>
            </div>
            <div className='action' onClick={(event) => showLabels(event.target.nextSibling)}>
              <i className='fas fa-tags'> </i>
              <p>Labels</p>
            </div>
            <div id='labels'>
              {card.labels ?
                card.labels.map((label, index) =>
                  <div className='actionsLabels' key={index}>
                    <p2>{label}</p2>
                    <i className='fas fa-trash' onClick={() => removeLabel(label)}></i>
                  </div>)
                : <></>
              }
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
