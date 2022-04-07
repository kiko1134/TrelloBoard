function Navbar() {
    return (
        <>
            <a className="navbar-brand"><strong>Trello icon</strong></a>


            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent-6"
                    aria-controls="navbarSupportedContent-6" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            {localStorage.getItem('username') ?
                <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent-6">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Boards
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <p>Boards</p>
                                <div className="hr">
                                    <hr />
                                </div>
                                <a className="dropdown-item" href="/">Some reent boards...</a>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Recent
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <p>Recent Boards</p>
                                <hr />
                                <a className="dropdown-item" href="/">Some recent boards...</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/">Create</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
                : <></>
            }
        </>
    );
}

export default Navbar;