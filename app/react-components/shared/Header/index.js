import React from 'react';
import { HeaderMenu } from './HeaderMenu';
import { AboutModal } from './modal/AboutModal';

export const Header = ({ }) => {
    return (
        <>

            <nav
                className="navbar navbar-expand-sm  fixed-top bg-white topbar    shadow">
                <a className="sidebar-brand d-flex align-items-center justify-content-center" style={{
                    height: '9rem'
                }} href="#/">

                    <div className="text-center">
                        <div className="login-logo" ><img style={{ width: '3rem' }} src="images/logo4.png" /></div>
                    </div>
                </a>

                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3 text-black">
                    <i className="fa fa-bars"></i>
                </button>

                <form
                    className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                            aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <i className="fas fa-search fa-sm"></i>
                            </button>
                        </div>
                    </div>
                </form>

                <ul className="navbar-nav ml-auto text-black">

                    <li className="nav-item dropdown no-arrow d-sm-none">
                        <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-search fa-fw"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                            aria-labelledby="searchDropdown">
                            <form className="form-inline mr-auto w-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-0 small"
                                        placeholder="Search for..." aria-label="Search"
                                        aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>





                    <HeaderMenu />


                </ul>

            </nav>
            <AboutModal />
        </>


    )
}
