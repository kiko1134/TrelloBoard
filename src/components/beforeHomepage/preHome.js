import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function PreHomepage() {

    let navigate = useNavigate();
    const [username, setUsername] = useState('');

    function handleChange(event) {
        setUsername(event.target.value);
    }

    useEffect(() => {

        async function DidMount() {
            if (localStorage.getItem('username') !== null) {
                navigate('/home');
            }
        }

        DidMount();

    }, []);

    function saveUser(event) {
        event.preventDefault();
        localStorage.setItem('username', username);
        console.log(username);
        window.location.href = '/home';
        // navigate('/home');
    }

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div
                            className="card text-secondary"
                            style={{borderRadius: "15px", backgroundColor: "rgba(255, 255, 255, 0.8)", boxShadow: "0 0 .25em rgba(0, 0, 0, .25)",
                            boxSizing:"border-box"}}>

                            <div className="card-body text-dark p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2">
                                        Enter Username
                                    </h2>
                                    <br/>
                                    <br/>

                                    <div className="form-outline form-white mb-4">
                                        <input
                                            type="email"
                                            id="typeEmailX"
                                            className="form-control form-control-lg"
                                            value={username}
                                            onChange={handleChange}
                                        />
                                        <label className="form-label text-secondary" htmlFor="typeEmailX">
                                            Enter Username
                                        </label>
                                    </div>

                                    <button
                                        className="btn btn-outline-secondary btn-lg px-5 text-light"
                                        type="submit"
                                        style = {{backgroundColor:"#4126ab"}}
                                        onClick={saveUser}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PreHomepage