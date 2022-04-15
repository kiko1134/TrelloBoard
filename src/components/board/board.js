import React from "react";
import Card from "../card/card";

function Board({ appState, setAppState }) {
  // localStorage.clear()

  let board = appState.boards[appState.current_board]

  function ShowListInput(bool, index) {
    if (bool) {
      document.getElementById('addList' + index).style.display = "block";
      document.getElementById('addColumn' + index).style.display = "none";
    }
    else {
      document.getElementById('addList' + index).style.display = "none";
      document.getElementById('addColumn' + index).style.display = "flex";
    }
  }

  function addColumn(element) {
    if (element.value.trim()) {
      let column = {};
      column.name = element.value;
      column.cards = [];

      let boards = [...appState.boards];
      boards[appState.current_board].columns.push(column);
      setAppState({ ...appState, boards });
    }
  }

  function AddCard(element, index) {
    if (element.value.trim()) {
      let card = {}
      card.name = element.value;
      card.description = '';

      let boards = [...appState.boards];
      boards[appState.current_board].columns[index].cards.push(card);
      setAppState({ ...appState, boards });
    }
  }

  return (
    <div id="columnsHolder">

      <div id="columns">
        {appState.boards[appState.current_board] ?
          appState.boards[appState.current_board].columns.map((element, index) =>
            <div className="js-column js-list list" id="column">
              <h2>{element.name}</h2>
              <div id="cards">
                {element.cards.map((card) => 
                  <Card content={card} />
                )}
              </div>
              <div className="js-column">
                <div id={`addColumn${index + 1}`} className=" addColumn" onClick={() => ShowListInput(true, index + 1)}>
                  <i className="fas fa-plus"></i>
                  <p>Add another list</p>
                </div>
                <div id={`addList${index + 1}`} className="addList">
                  <input type="text" id="name" placeholder="Enter list title..." />
                  <div className="js-list ">
                    <button className="btn btn-primary" onClick={(event) => AddCard(event.target.parentElement.previousSibling, index)}>Add card</button>
                    <i className="fas fa-times icon" onClick={() => ShowListInput(false, index + 1)}></i>
                  </div>
                </div>
              </div>
            </div>
          ) :
          <p>form</p>
        }
      </div>
      <div className="js-column">
        <div id="addColumn0" className="js-list addColumn" onClick={() => ShowListInput(true, 0)}>
          <i className="fas fa-plus"></i>
          <p>Add another list</p>
        </div>
        <div id="addList0" className="js-list addList">
          <input type="text" id="name" placeholder="Enter list title..." />
          <div className="js-list ">
            <button className="btn btn-primary" onClick={(event) => addColumn(event.target.parentElement.previousSibling)}>Add list</button>
            <i className="fas fa-times icon" onClick={() => ShowListInput(false, 0)}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;