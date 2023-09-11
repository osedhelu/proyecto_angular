import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from "../../react-components/provider/auth/AuthContext";
import { Header } from "../../react-components/shared/Header";
import { validateElementCreation } from '../../react-components/utils/validElementCreation';

export default (({ angular, ComponetReact }) => {
    let initComponentReact = ({ context, contextRoot }) => {
        validateElementCreation('deoslv_sidebar', (element) => {
            ComponetReact({ context, contextRoot, element })
        })

    }


    angular.module('headwind-kiosk')
        .controller('HeaderController', function ($scope, $rootScope, $state, $modal, $timeout, $interval, $filter, $window,
            authService, localization, hintService, rebranding) {
            let iniStateInit = 0
            $scope.isControlPanel = false;
            $scope.authService = authService;
            $scope.showExitReportMode = false;
            $scope.$on('START_REPORT_MODE', function () {
                console.log("🚀 ~ file: header.controller.js:23 ~ START_REPORT_MODE:")


                $scope.showExitReportMode = true;
            });

            $scope.$on('HIDE_REPORT_MODE', function () {
                console.log("🚀 ~ file: header.controller.js:30 ~ HIDE_REPORT_MODE:")
                $scope.showExitReportMode = false;
            });

            $scope.$on('HIDE_ADDRESS', function () {
                console.log("🚀 ~ file: header.controller.js:35 ~ HIDE_ADDRESS:")
                $scope.mapToolsConfig.showDeviceAddress = false;
            });

            $scope.$on('SHOW_CHECKLIST_INFO', function (event, checklistId) {
                console.log("🚀 ~ file: header.controller.js:40 ~ SHOW_CHECKLIST_INFO:")
                showWorkResultsContent(checklistId);
            });

            $scope.$on('SHOW_DATA_LOADING_MODAL', function () {
                console.log("🚀 ~ file: header.controller.js:45 ~ SHOW_DATA_LOADING_MODAL:")
                $scope.dataLoadingWait = true;
            });

            $scope.$on('HIDE_DATA_LOADING_MODAL', function () {
                console.log("🚀 ~ file: header.controller.js:50 ~ HIDE_DATA_LOADING_MODAL:",)
                $scope.dataLoadingWait = false;
            });

            $rootScope.$on('SHOW_EXPIRY_WARNING', function () {
                console.log("🚀 ~ file: header.controller.js:55 ~ SHOW_EXPIRY_WARNING:")
                $scope.expiryWarning = true;
            });

            rebranding.query(function (value) {
                $scope.appName = value.appName;
            });

            var updateDateTime = function () {
                $scope.dateTime = $filter('date')(new Date(), localization.localize('format.date.header'));
            };
            updateDateTime();

            var interval = $interval(updateDateTime, 10000);
            $scope.$on('$destroy', function () { $interval.cancel(interval) });

            $scope.getUserName = function () { return authService.getUserName(); };
            $scope.isAuth = function () {
                const state = authService.isLoggedIn() && document.URL.indexOf('invoice') === -1;
                console.log("🚀 ~ file: header.controller.js:75 ~ state:", state)
                return state
            };
            $scope.isHidden = function () {
                return $state.current.name === 'qr' || $state.current.name === 'passwordReset';
            };

            $scope.isSuperAdmin = function () {
                return authService.isSuperAdmin();
            };
            $scope.updatesAllowed = function () {
                return (authService.isSingleCustomer() || authService.isSuperAdmin()) && authService.hasPermission('get_updates');
            };

            $scope.logout = function () {
                authService.logout();
                hintService.onLogout();
                $state.transitionTo('login');
                $rootScope.$emit('aero_USER_LOGOUT');
            };

            $scope.isActive = function (state) {
                console.log("🚀 ~ file: header.controller.js:83 ~ state:", state)
                return $state.$current.self.name === state;
            };

            $scope.controlPanel = function () {
                $state.transitionTo('control-panel');
                $scope.isControlPanel = true;
            };

            $scope.mainPanel = function () {
                $state.transitionTo('main');
                $scope.isControlPanel = false;
            };

            $scope.about = function () {
                $modal.open({
                    templateUrl: 'app/components/about/about.html',
                    controller: 'AboutController'
                });
            };
            $scope.isAuth = function () {
                const state = authService.isLoggedIn() && document.URL.indexOf('invoice') === -1;
                if (iniStateInit === 0) {
                    initComponentReact({
                        context: { ...$scope, localization },
                        contextRoot: $rootScope
                    })
                }
                iniStateInit = iniStateInit + 1
                if (!state) {
                    iniStateInit = 0
                }
                return state
            };
        });
})({
    angular: window.angular, ComponetReact: ({ context, contextRoot, element }) => {
        ReactDOM.render(<AuthProvider context={context} contextRoot={contextRoot}><Header /></AuthProvider>, element);
    }
}) 