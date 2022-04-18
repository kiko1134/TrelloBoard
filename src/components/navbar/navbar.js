import ReactDOM from "react-dom";
import CardModal from "../modals/cardModal";
import React, {useState} from "react";

export default function Navbar({appState, setAppState}) {

    const [cardModalIsOpen, setCardModalOpen] = useState(false)

    function isCardRecent(card, index, columnIndex) {
        console.log('Column Index is: ' + columnIndex);
        let curr_time = Date.now();
        let card_time = card.updated;
        console.log(card_time);
        if (curr_time - card_time < 300000) {
            return(
                <div>
                    <a className="dropdown-item" key={index} onClick={() => setCardModalOpen(true)}>{card.name}</a>
                    <CardModal card={card} cardIndex={index} columnIndex={columnIndex} appState={appState}
                               setAppState={setAppState} cardModalIsOpen={cardModalIsOpen} setCardModalOpen={setCardModalOpen} />
                </div>
            )
        }
    }

    return ReactDOM.createPortal(
        <>
            <a className="navbar-brand"><strong>Trello icon</strong></a>


            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent-6"
                    aria-controls="navbarSupportedContent-6" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            {localStorage.getItem('username') ?
                <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent-6">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
                               aria-haspopup="true" aria-expanded="false">
                                Boards
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <p>Boards</p>
                                <div className="hr">
                                    <hr/>
                                </div>
                                {appState.boards?
                                    appState.boards.map((board, index) => (
                                        <a className="dropdown-item" href="/home" key={index} onClick={() => {
                                            setAppState({...appState, current_board: index})
                                        }}>{board.name}</a>
                                    )) : <></>

                                }
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
                               aria-haspopup="true" aria-expanded="false">
                                Recent
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <p>Recent Cards</p>
                                <hr/>
                                {appState.boards[appState.current_board].columns?
                                    appState.boards[appState.current_board].columns.map((column, columnIndex) => (
                                        column.cards?
                                            column.cards.map((card, index) => (
                                                isCardRecent(card, index, columnIndex)
                                            )):<></>
                                    ))
                                    :<></>
                                }
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/createBoard">Create</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
                : <></>
            }
        </>,
        document.getElementById('navbar')
    );
}
