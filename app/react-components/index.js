// import '/lib/angular-resource/angular-resource.js'
// import '/lib/angular-cookies/angular-cookies.js'
// import '/lib/angular-bootstrap/ui-bootstrap-tpls.js'
// import '/lib/angular-ui-router/angular-ui-router.js'
// import '/lib/angular-bootstrap-colorpicker/bootstrap-colorpicker-module.js'
// import '/lib/angular-ui-mask/mask.js'
// import '/lib/angular-breadcrumb/angular-breadcrumb.js'
// import '/lib/angular-animate/angular-animate.js'
// import '/lib/angular-sanitize/angular-sanitize.js'
// import '/lib/blueimp-md5/md5.js'
// import '/lib/ng-tags-input/ng-tags-input.js'
// import '/lib/angular-css/angular-css.js'
// import '/lib/oclazyload/ocLazyLoad.js'
// import '/lib/myforce-angularjs-dropdown-multiselect/angularjs-dropdown-multiselect.js'
// import '/lib/jsencrypt/bin/jsencrypt.min.js'

import '/app/app.js'
import '/app/spinner.js'
import '/app/components/header/header.controller.js'
import '/app/components/about/about.controller.js'
import '/app/components/main/controller/devices.controller.js'
import '/app/components/main/controller/applications.controller.js'
import '/app/components/main/controller/configurations.controller.js'
import '/app/components/main/controller/files.controller.js'
import '/app/components/main/controller/groups.controller.js'
import '/app/components/main/controller/settings.controller.js'
import '/app/components/main/controller/plugins.controller.js'
import '/app/components/main/controller/login.controller.js'
import '/app/components/main/controller/qr.controller.js'
import '/app/components/main/controller/profile.controller.js'
import '/app/components/main/controller/updates.controller.js'
import '/app/components/main/controller/users.controller.js'
import '/app/components/main/controller/tabs.controller.js'
import '/app/components/main/controller/passwordreset.controller.js'
import '/app/components/main/controller/passwordrecovery.controller.js'
import '/app/components/main/controller/signup.controller.js'
import '/app/components/main/controller/signupcomplete.controller.js'
import '/app/components/control-panel/controller/panel.controller.js'

import '/app/components/main/service/main.service.js'
import '/app/shared/service/auth.service.js'
import '/app/shared/service/user.service.js'
import '/app/shared/service/confirm.service.js'
import '/app/shared/service/alert.service.js'
import '/app/shared/service/progress.service.js'
import '/app/shared/service/pagination.service.js'
import '/app/shared/service/locale.service.js'
import '/app/shared/service/hint.service.js'
import '/app/shared/service/map.service.js'
import '/app/shared/service/rebranding.service.js'
import '/app/shared/service/password.service.js'
import '/app/shared/service/utils.service.js'
import '/app/components/plugins/apuppet/apuppet.module.js'


import '/app/shared/filters.js'
import '/app/shared/directives.js'
import '/app/shared/angular-upload.js'


// console.log("🚀 ~ file: index.js:2 ~ angular:", angular)

import React from 'react'
import ReactDOM from 'react-dom'
import { validateElementCreation } from "./utils/validElementCreation";
import { AuthProvider } from "./provider/auth/AuthContext";
import { Header } from './shared/Header';







const initREact = () => {
    validateElementCreation('header-react', (element) => {
        ReactDOM.render(<AuthProvider><Header /></AuthProvider>, element);
    });
}
console.log("🚀 ~ file: index.js:12 ~ desde:xxxxx")
initREact()