import React from "react";
import Column from "../column/column";

export default function Board({ appState, setAppState }) {

  function ShowListInput(bool) {
    if (bool) {
      document.getElementById('addList').style.display = "block";
      document.getElementById('addColumn').style.display = "none";
    }
    else {
      document.getElementById('addList').style.display = "none";
      document.getElementById('addColumn').style.display = "flex";
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
      element.value='';
      element.focus();
    }
  }

  return (
    <div id="columnsHolder">

      <div id="columns">
        {appState.boards[appState.current_board] ?
          appState.boards[appState.current_board].columns.map((column, index) =>
            <Column column={column} columnIndex={index} appState={appState} setAppState={setAppState} key={index} />
          ) :
          <></>
        }
      </div>
      <div className="js-column">
        <div id="addColumn" className="js-list addColumn" onClick={() => ShowListInput(true)}>
          <i className="fas fa-plus"></i>
          <p>Add another list</p>
        </div>
        <div id="addList" className="js-list addList">
          <input type="text" id="name" placeholder="Enter list title..." />
          <div className="js-list ">
            <button className="btn btn-primary" onClick={(event) => addColumn(event.target.parentElement.previousSibling)}>Add list</button>
            <i className="fas fa-times icon" onClick={() => ShowListInput(false)}></i>
          </div>
        </div>
      </div>
    </div>
  );
}
