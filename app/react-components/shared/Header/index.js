import React from 'react';
import { HeaderMenu } from './HeaderMenu';

export const Header = ({ }) => {
    return (
        <nav
            className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">


            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
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

            <ul className="navbar-nav ml-auto">

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

    )
}



{/* 
// <nav className="navbar navbar-expand-lg">
//     <div className="container-fluid d-flex ">
//         <div className="p-2 mr-auto ">
//             <a ng-click='()'>
//                 <img src='' alt='Logo' style='width: 100%;'>
//             </a>
//         </div>
//         <div className="p-2 "> <a id='headerExpiryWarning' ng-if="expiryWarning" className="expiry-warning"
//             localized-change-tracking>account.expired.short</a>
//             <div className="mr-3" id='headerDateTime'>
//                 <i className="far fa-calendar-alt"></i>
//                 {{ dateTime }}
//             </div>
//         </div>
//         <div className="p-2 ">

//             <div className="dropdown">

//                 <button type="button" className="btn btn-outline-black dropdown-toggle" data-toggle="dropdown">
//                     <i className="fas fa-user"></i>
//                     {{ getUserName() }}
//                 </button>
//                 <div className="dropdown-menu dropdown-menu-right">
//                     <a className="dropdown-item" ng-click="about()" localized-change-tracking>
//                         Información
//                     </a>
//                     <a ui-sref='profile' className="dropdown-item" localized-change-tracking>
//                         Perfil
//                     </a>



//                     <a className="dropdown-item" ng-if="updatesAllowed() " localized-change-tracking
//                         ng-style='color'>Actualizaciones</a>



//                     <a className="dropdown-item" ng-if="authService.isSuperAdmin() && !isControlPanel"
//                         ng-click='controlPanel()' localized-change-tracking>
//                         Panel Maestro
//                     </a>



//                     <a className="dropdown-item" ng-click='mainPanel()' ng-if="authService.isSuperAdmin() && isControlPanel"
//                         localized-change-tracking>
//                         Panel Principal
//                     </a>




//                     <a className="dropdown-item" ng-click='logout()' localized-change-tracking>
//                         Salir
//                     </a>

//                 </div>
//             </div>


//         </div>
//     </div>


// </nav>
 */}
