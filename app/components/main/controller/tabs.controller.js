import React from 'react'
import ReactDOM from 'react-dom'
import { AuthProvider } from "../../../react-components/provider/auth/AuthContext"
import { Navbar } from "../../../react-components/shared/Navbar"
import { validateElementCreation } from "../../../react-components/utils/validElementCreation"

// Localization completed
export default (({ angular, ComponetReact }) => {
    let initComponentReact = ({ context, contextRoot }) => {
        validateElementCreation('deoslv_navbar', (element) => {
            ComponetReact({ context, contextRoot, element })
        })

    }
    angular.module('headwind-kiosk')
        .controller('TabController', function ($scope, $rootScope, $timeout, userService, authService, openTab, $state,
            pluginService, localization, hintService) {

            $scope.localization = localization;

            var routes = {
                DEVICES: 'main',
                APPS: 'applications',
                CONFS: 'configurations',
                FILES: 'files',
                DESIGN: 'designSettings',
                COMMON: 'commonSettings',
                USERS: 'users',
                GROUPS: 'groups',
                LANG: 'langSettings',
                HINTS: 'hints',
                PLUGINS: 'pluginSettings',
            };

            var loadData = function () {
                return new Promise((__resolve, reject) => {
                    var settingsPlugins = []
                    var functionsPlugins = []
                    pluginService.getAvailablePlugins(function (response) {

                        if (response.status === 'OK') {
                            if (response.data) {
                                // Plugins available for Functions tab
                                functionsPlugins = response.data.filter(function (plugin) {
                                    return plugin.functionsViewTemplate !== undefined && plugin.functionsViewTemplate !== null;
                                });
                                functionsPlugins.forEach(function (plugin) {
                                    let ID = 'plugin-' + plugin.identifier;
                                    routes[ID] = ID;
                                });

                                // Plugins available for Settings tab
                                settingsPlugins = response.data.filter(function (plugin) {
                                    return plugin.settingsViewTemplate !== undefined && plugin.settingsViewTemplate !== null;
                                });
                                settingsPlugins.forEach(function (plugin) {
                                    let ID = 'plugin-settings-' + plugin.identifier;
                                    routes[ID] = ID;
                                });

                                $scope.settingsPlugins = settingsPlugins
                                $scope.functionsPlugins = functionsPlugins
                                __resolve({ settingsPlugins, functionsPlugins })
                            }
                        } else {
                            $scope.functionsPlugins = [];
                            $scope.settingsPlugins = [];
                            __resolve({ settingsPlugins, functionsPlugins })
                        }
                    });
                })
            };
            $scope.currentUser = {};
            $scope.hasPermission = authService.hasPermission;

            $scope.activeTab = openTab;

            $scope.act = {};
            $scope.act[openTab] = true;

            $scope.functionsPlugins = [];
            $scope.settingsPlugins = [];

            $scope.openTab = function (tabName) {
                if (tabName === $scope.activeTab) {
                    return;
                }
                if (routes[tabName]) {
                    $state.transitionTo(routes[tabName]);
                }
            };

            var listener = $scope.$on('aero_PLUGINS_UPDATED', loadData);
            $scope.$on('$destroy', listener);

            userService.getCurrent(function (response) {
                if (response.data) {
                    $scope.currentUser = response.data;
                }
            });

            // hintService start is fired by the controllers themselves after they are loaded all required content
            //        $timeout(function () {
            //            hintService.onStateChangeSuccess();
            //        }, 100);



            loadData();

            initComponentReact(
                {
                    context: { ...$scope, loadData, pluginService }, contextRoot: { ...$rootScope }
                }
            )

        })

}
)({
    angular,
    ComponetReact: ({ context, contextRoot, element }) => {
        ReactDOM.render(<AuthProvider context={context} contextRoot={contextRoot}><Navbar /></AuthProvider>, element);
    }
})
