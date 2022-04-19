import Form from 'react-bootstrap/Form'
import {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function CreateBoard({appState, setAppState}) {
    let navigate = useNavigate();

    const [boardName, setBoardName] = useState('');

    function createBoard() {
        if(boardName.trim()){
            const board = {
                name: boardName,
                columns: [],
                archive: [],
            };
            setAppState({...appState, boards: appState.boards.concat([board]), current_board: appState.boards.length});
            navigate('/home');
        }
    }

    return (
        <section className="gradient-custom" >
            <div className="container py-5" style={{marginTop: "12rem"}}>
            <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
                className="card text-secondary"
                style={{
                    borderRadius: "15px",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    boxShadow: "0 0 .25em rgba(0, 0, 0, .25)",
                    boxSizing: "border-box",
                    width: "100%"
                }}>
                <div className="card-body text-dark p-5 text-center">
                <h2 className="fw-bold py-3">Create a Board</h2>
                <Form className='container py-5'>
                    <Form.Group className="form-outline form-white mb-4" controlId="boardInputName">
                        <Form.Control type="text" placeholder="Board name" onChange={(event)=>setBoardName(event.target.value)} value={boardName}/>
                    </Form.Group>
                    <button type="button" className="btn btn-outline-secondary btn-lg px-5 text-light" style={{backgroundColor: "#4126ab"}} onClick={()=>createBoard()}>
                        Create
                    </button>
                </Form>
                </div>
            </div>
            </div>
            </div>
            </div>
        </section>
    )
}