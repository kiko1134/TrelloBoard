import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PreHomepage from "./components/beforeHomepage/preHome";
import Board from "./components/board/board";
import CreateBoard from "./components/createBoard/createBoard";
import Navbar from "./components/navbar/navbar";

function App() {
    let [appState, setAppState] = useState(
        localStorage.getItem('boards') ?
            JSON.parse(localStorage.getItem('boards'))
            :
            {
                boards: [],
                current_board: 0,
                selectedCardForEdit: null
            }
    )

    useEffect(() => {
        localStorage.setItem('boards', JSON.stringify(appState))
        console.log(appState.boards[appState.current_board]);
    }
        , [appState]);

    // boards: [
    //   {
    //     name: "name",
    //     colunms: [
    //       {
    //         name: "name",
    //         cards: [
    //           {}
    //         ]
    //       }
    //     ]
    //   }
    // ],
    // current_board: 0,
    // selectedCardForEdit: null

    // appState.boards[appState.current_board]
    // setAppState({ ...appState, current_board: 3 })
    // setList({...lists, foo:{...lists.foo, foo1:"a"}})
    // localStorage.clear()

    return (

        <div className="App">
            <Navbar appState={appState} setAppState={setAppState} />
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<PreHomepage appState={appState} setAppState={setAppState} />} />
                    {localStorage.getItem('username') ?
                        <>
                            <Route path="/home" element={<Board appState={appState} setAppState={setAppState} />} />
                            <Route path="/createBoard"
                                element={<CreateBoard appState={appState} setAppState={setAppState} />} />
                            <Route path="/contact" element={<h1>Contact</h1>} />
                        </>
                        :
                        <></>
                    }
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
