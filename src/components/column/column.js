import React from 'react';
import Card from "../card/card";

export default function Column({ column, columnIndex, appState, setAppState }) {

    function ShowCardInput(bool, index) {
        if (bool) {
            document.getElementById('addList' + index).style.display = "block";
            document.getElementById('addColumn' + index).style.display = "none";
        }
        else {
            document.getElementById('addList' + index).style.display = "none";
            document.getElementById('addColumn' + index).style.display = "flex";
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
            element.value='';
        }
    }

    return (
        <div className="js-column js-list list" id="column">
            <h2>{column.name}</h2>
            <div id="cards">
                {column.cards.map((card, index) =>
                    <Card content={card}  key={index}/>
                )}
            </div>
            <div className="js-column">
                <div id={`addColumn${columnIndex}`} className=" addColumn" onClick={() => ShowCardInput(true, columnIndex)}>
                    <i className="fas fa-plus"></i>
                    <p>Add another list</p>
                </div>
                <div id={`addList${columnIndex}`} className="addList">
                    <input type="text" id="name" placeholder="Enter list title..." />
                    <div className="js-list ">
                        <button className="btn btn-primary" onClick={(event) => AddCard(event.target.parentElement.previousSibling, columnIndex)}>Add card</button>
                        <i className="fas fa-times icon" onClick={() => ShowCardInput(false, columnIndex)}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
