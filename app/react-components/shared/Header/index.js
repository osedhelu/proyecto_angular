import React, { useEffect } from 'react';
import { HeaderLogo } from "./HeaderLogo"
import { HeaderMenu } from './HeaderMenu';

export const Header = ({ }) => {
    return (<nav className="navbar navbar-expand-lg">
        <div className="container-fluid d-flex ">
            <HeaderLogo />
            <HeaderMenu />
        </div>
    </nav>)
}




// <nav class="navbar navbar-expand-lg">
//     <div class="container-fluid d-flex ">
//         <div class="p-2 mr-auto ">
//             <a ng-click='()'>
//                 <img src='/images/logo5.png' alt='Logo' style='width: 100%;'>
//             </a>
//         </div>
//         <div class="p-2 "> <a id='headerExpiryWarning' ng-if="expiryWarning" class="expiry-warning"
//             localized-change-tracking>account.expired.short</a>
//             <div class="mr-3" id='headerDateTime'>
//                 <i class="far fa-calendar-alt"></i>
//                 {{ dateTime }}
//             </div>
//         </div>
//         <div class="p-2 ">

//             <div class="dropdown">

//                 <button type="button" class="btn btn-outline-black dropdown-toggle" data-toggle="dropdown">
//                     <i class="fas fa-user"></i>
//                     {{ getUserName() }}
//                 </button>
//                 <div class="dropdown-menu dropdown-menu-right">
//                     <a class="dropdown-item" ng-click="about()" localized-change-tracking>
//                         Información
//                     </a>
//                     <a ui-sref='profile' class="dropdown-item" localized-change-tracking>
//                         Perfil
//                     </a>



//                     <a class="dropdown-item" ng-if="updatesAllowed() " localized-change-tracking
//                         ng-style='color'>Actualizaciones</a>



//                     <a class="dropdown-item" ng-if="authService.isSuperAdmin() && !isControlPanel"
//                         ng-click='controlPanel()' localized-change-tracking>
//                         Panel Maestro
//                     </a>



//                     <a class="dropdown-item" ng-click='mainPanel()' ng-if="authService.isSuperAdmin() && isControlPanel"
//                         localized-change-tracking>
//                         Panel Principal
//                     </a>




//                     <a class="dropdown-item" ng-click='logout()' localized-change-tracking>
//                         Salir
//                     </a>

//                 </div>
//             </div>


//         </div>
//     </div>


// </nav>

