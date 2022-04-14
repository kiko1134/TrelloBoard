import React from "react";
import Card from "../card/card";

function Board({ appState, setAppState }) {
  // localStorage.clear()

  let board = appState.boards[appState.current_board]

  function ShowListInput(bool) {
    if (bool) {
      document.getElementById("addList").style.display = "block";
      document.getElementById("addColumn").style.display = "none";
    }
    else {
      document.getElementById("addList").style.display = "none";
      document.getElementById("addColumn").style.display = "flex";
    }
  }

  function AddList(element) {
    if (element.value.trim()) {
      let column = {};
      column.name = element.value;
      column.cards = [];

      let boards = [...appState.boards];
        // for (let i = 0; i < appState.boards.length; i++) {
        //   boards[i] = appState.boards[i];
        // }
      boards[appState.current_board].columns.push(column);
      setAppState({ ...appState, boards});
    }
  }

  return (
    <div id="columnsHolder">

      <div id="columns">
        {appState.boards[appState.current_board] ?
          appState.boards[appState.current_board].columns.map((element) =>
            <div className="js-column js-list list" id="column">
              <h2>{element.name}</h2>
              <div className="js-list" id="cards">
                {element.cards.map((card) => {
                  <Card content={card} />
                })}
              </div>
            </div>
          ) :
            <p>form</p>
        }
      </div>
      <div className="js-column">
        <div id="addColumn" className="js-list" onClick={() => ShowListInput(true)}>
          <i className="fas fa-plus"></i>
          <p>Add another list</p>
        </div>
        <div id="addList" className="js-list">
          <input type="text" id="name" placeholder="Enter list title..." />
          <div className="js-list ">
            <button className="btn btn-primary" onClick={(event) => AddList(event.target.parentElement.previousSibling)}>Add list</button>
            <i className="fas fa-times icon" onClick={() => ShowListInput(false)}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;