import ReactDOM from "react-dom";
import CardModal from "../modals/cardModal";
import React, {useState} from "react";

export default function Navbar({ appState, setAppState }) {
  let boards = [...appState.boards];
  const [cardModalIsOpen, setCardModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardIndex, setCardIndex] = useState();
  const [columnIndex, setColumnIndex] = useState();

  const filterCards = (columns, query) => {
    let result = [];
    columns.forEach((element) => {
      element.cards.forEach((card) => {
        const name = card.name.toLowerCase();
        const description = card.description.toLowerCase();

        if (
          name.includes(query.toLowerCase()) ||
          description.includes(query.toLowerCase())
        )
          result.push(card.name);
      });
    });
    return result;
  };

  const findByName = (name) => {
      console.log(name);
    boards[appState.current_board].columns.forEach((element, index) => {
      element.cards.forEach((card, card_index) => {
        if (card.name === name) {
            setCardModalOpen(true);
            setSelectedCard(card);
            setColumnIndex(index);
            setCardIndex(card_index);
        }
      });
    });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  console.log(boards[appState.current_board].columns);

  const result = filterCards(
    boards[appState.current_board].columns,
    searchQuery
  );
  console.log(result);

  const handleInput = (event) => {
    setSearchQuery(event.target.value);
    console.log(event.target.value);
    if (!event.target.value) {
      setDropdownVisible(false);
    } else {
      setDropdownVisible(true);
    }
  };

  function dropdowElement() {
    if (dropdownVisible) {
      return (
        <div
          id="searchedItems"
          style={{
            position: "absolute",
            height: "150px",
            width: "300px",
            marginTop: "13%",
            backgroundColor: "white",
            overflow: "auto",
          }}
        >
          <div style = {{display: "flex", flexDirection: "column"}}>
            {searchQuery !== "" ? (
              result.map((post) => (
                <p  onClick={() => findByName(post)} key={post.id}>
                  {post}
                </p>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      );
    }
  }

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
                    <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchQuery}
                        onChange={handleInput}
                    />

                    <button
                        className="btn btn-outline-success my-2 my-sm-0"
                        type="submit"
                    >
                        Search
                    </button>

                    {dropdowElement()}

                    <CardModal
                        card={selectedCard}
                        cardIndex={cardIndex}
                        columnIndex={columnIndex}
                        appState={appState}
                        setAppState={setAppState}
                        cardModalIsOpen={cardModalIsOpen}
                        setCardModalOpen={setCardModalOpen}
                    />
                </form>
                </div>
                 :
                <></>
                }
        </>,
        document.getElementById("navbar")
    );
}
