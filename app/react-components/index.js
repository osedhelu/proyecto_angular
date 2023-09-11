import '../app.js'
import '../spinner.js'
import HeaderController from '../components/header/header.controller.js'
import AboutController from '../components/about/about.controller.js'
import devicesController from '../components/main/controller/devices.controller.js'
import '../components/main/controller/applications.controller.js'
import '../components/main/controller/configurations.controller.js'
import '../components/main/controller/files.controller.js'
import '../components/main/controller/groups.controller.js'
import '../components/main/controller/settings.controller.js'
import '../components/main/controller/plugins.controller.js'
import '../components/main/controller/login.controller.js'
import '../components/main/controller/qr.controller.js'
import '../components/main/controller/profile.controller.js'
import '../components/main/controller/updates.controller.js'
import '../components/main/controller/users.controller.js'
import tabsController from '../components/main/controller/tabs.controller.js'
import '../components/main/controller/passwordreset.controller.js'
import '../components/main/controller/passwordrecovery.controller.js'
import '../components/main/controller/signup.controller.js'
import '../components/main/controller/signupcomplete.controller.js'
import '../components/control-panel/controller/panel.controller.js'
import '../components/main/service/main.service.js'
import '../shared/service/auth.service.js'
import '../shared/service/user.service.js'
import '../shared/service/confirm.service.js'
import '../shared/service/alert.service.js'
import '../shared/service/progress.service.js'
import '../shared/service/pagination.service.js'
import '../shared/service/locale.service.js'
import '../shared/service/hint.service.js'
import '../shared/service/map.service.js'
import '../shared/service/rebranding.service.js'
import '../shared/service/password.service.js'
import '../shared/service/utils.service.js'
import '../components/plugins/apuppet/apuppet.module.js'


import '../shared/filters.js'
import '../shared/directives.js'
import '../shared/angular-upload.js'


// console.log("🚀 ~ file: index.js:2 ~ angular:", angular)


import React from 'react'
import ReactDOM from 'react-dom'
import { validateElementCreation } from "./utils/validElementCreation";
import { AuthProvider } from "./provider/auth/AuthContext";
import { Header } from './shared/Header';
import { Navbar } from './shared/Navbar/index.js'

const initReactComponent = () => {
    validateElementCreation('deoslv_sidebar', (element) => {
        HeaderController.then(({ context, contextRoot }) => {
            ReactDOM.render(<AuthProvider context={context} contextRoot={contextRoot}><Header /></AuthProvider>, element);
        });
    })

    validateElementCreation('deoslv_navbar', (element) => {
        tabsController.then(({ context, contextRoot }) => {
            ReactDOM.render(<AuthProvider context={context} contextRoot={contextRoot}><Navbar /></AuthProvider>, element);
        });
    })
}



setInterval(function () {
    const { location: { hash } } = document
    if (document.getElementById('deoslv_navbar') === null) {
        initReactComponent()
    }
}, 1000);
initReactComponent()