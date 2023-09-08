/*
 *
 * Headwind MDM: Open Source Android MDM Software
 * https://h-mdm.com
 *
 * Copyright (C) 2019 Headwind Solutions LLC (http://h-sms.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

angular.module('plugin-apuppet', ['ngResource', 'ui.bootstrap', 'ui.router', 'ngTagsInput', 'ncy-angular-breadcrumb'])
    .config(function ($stateProvider) {
        try {
            $stateProvider.state('plugin-apuppet', {
                url: "/" + 'plugin-apuppet',
                templateUrl: 'app/components/main/view/content.html',
                controller: 'TabController',
                ncyBreadcrumb: {
                    label: '{{"breadcrumb.plugin.apuppet.main" | localize}}', //label to show in breadcrumbs
                },
                resolve: {
                    openTab: function () {
                        return 'plugin-apuppet';
                    }
                },
            });
        } catch (e) {
            console.log('An error when adding state ' + 'plugin-apuppet', e);
        }

        try {
            $stateProvider.state('plugin-settings-apuppet', {
                url: "/" + 'plugin-settings-apuppet',
                templateUrl: 'app/components/main/view/content.html',
                controller: 'TabController',
                ncyBreadcrumb: {
                    label: '{{"breadcrumb.plugin.apuppet.main" | localize}}', //label to show in breadcrumbs
                },
                resolve: {
                    openTab: function () {
                        return 'plugin-settings-apuppet'
                    }
                },
            });
        } catch (e) {
            console.log('An error when adding state ' + 'plugin-settings-apuppet', e);
        }
    })
    .factory('pluginApuppetService', function ($resource) {
        return $resource('', {}, {
            lookupDevices: {url: 'rest/private/devices/autocomplete', method: 'POST'},
            getSettings: {url: 'rest/plugins/apuppet/private/settings/configuration/:configId', method: 'GET'},
            getDeviceSettings: {url: 'rest/plugins/apuppet/private/settings/device/:deviceNumber', method: 'GET'},
            saveSettings: {url: 'rest/plugins/apuppet/private/settings', method: 'PUT'},
            getDefaultSettings: {url: 'rest/plugins/apuppet/private/settings/default', method: 'GET'},
            saveDefaultSettings: {url: 'rest/plugins/apuppet/private/settings/default', method: 'PUT'},
            initSession: {url: 'rest/plugins/apuppet/private/init/:deviceNumber', method: 'GET'},
            waitSession: {url: 'rest/plugins/apuppet/private/status/:deviceNumber', method: 'GET'},
            finalizeSession: {url: 'rest/plugins/apuppet/private/finalize/:deviceNumber', method: 'GET'}
        });
    })
    .controller('PluginApuppetController', function ($scope, $rootScope, $stateParams, $interval, $window,
                                                     $location, pluginApuppetService, localization) {
        $scope.successMessage = undefined;
        $scope.errorMessage = undefined;

        $rootScope.settingsTabActive = false;
        $rootScope.pluginsTabActive = true;

        var deviceNumber = $stateParams.deviceNumber;
        if (!deviceNumber) {
            deviceNumber = ($location.search()).deviceNumber;
        }
        $scope.formData = {
            deviceNumber: deviceNumber
        };

        var clearMessages = function () {
            $scope.errorMessage = undefined;
            $scope.successMessage = undefined;
        };

        var deviceLookupFormatter = function (v) {
            if (v) {
                var pos = v.indexOf('/');
                if (pos > -1) {
                    return v.substr(0, pos).trim();
                }
            }
            return v;
        };

        var getDeviceInfo = function( device ) {
            if ( device.info ) {
                try {
                    return JSON.parse( device.info );
                } catch ( e ) {}
            }

            return undefined;
        };

        var resolveDeviceField = function (serverData, deviceInfoData) {
            if (serverData === deviceInfoData) {
                return serverData;
            } else if (serverData.length === 0 && deviceInfoData.length > 0) {
                return deviceInfoData;
            } else if (serverData.length > 0 && deviceInfoData.length === 0) {
                return serverData;
            } else {
                return deviceInfoData;
            }
        };

        $scope.deviceLookupFormatter = deviceLookupFormatter;

        $scope.searchDevices = function (val) {
            return pluginApuppetService.lookupDevices(val)
                .$promise.then(function (response) {
                    if (response.status === 'OK') {
                        return response.data.map(function (device) {
                            var deviceInfo = getDeviceInfo(device);
                            var serverIMEI = device.imei || '';
                            var deviceInfoIMEI = deviceInfo ? (deviceInfo.imei || '') : '';
                            var resolvedIMEI = resolveDeviceField(serverIMEI, deviceInfoIMEI);

                            return device.name + (resolvedIMEI.length > 0 ? " / " + resolvedIMEI : "");
                        });
                    } else {
                        return [];
                    }
                });
        };

        $scope.loading = false;

        $scope.initSession = function () {
            if (!$scope.formData.deviceNumber) {
                $scope.errorMessage = localization.localize('plugin.apuppet.enter.device');
                return;
            }
            $scope.errorMessage = '';
            $scope.loading = true;

            $scope.deviceNumber = deviceLookupFormatter($scope.formData.deviceNumber);

            pluginApuppetService.initSession({"deviceNumber": $scope.deviceNumber}, function(response) {
                if (response.status === 'OK') {
                    $scope.autoUpdateInterval = $interval(checkSession, 5000);
                    $scope.dotCount = 0;
                    $scope.$on('$destroy', function () {
                        if ($scope.autoUpdateInterval) $interval.cancel($scope.autoUpdateInterval);
                    });
                    $scope.waitMessage = localization.localize('plugin.apuppet.session.requested');

                } else {
                    $scope.loading = false;
                    if (response.message == 'error.application.not.found') {
                        $scope.errorMessage = localization.localize('plugin.apuppet.application.not.found.configuration');
                    } else {
                        $scope.errorMessage = localization.localizeServerResponse(response);
                    }
                }
            });

        };

        var checkSession = function() {
            $scope.dotCount += 1;
            if ($scope.dotCount > 5) {
                $scope.dotCount = 1;
            }
            var waitMessage = localization.localize('plugin.apuppet.session.requested');
            for (var i = 0; i < $scope.dotCount; i++) {
                waitMessage = waitMessage + ".";
            }
            $scope.waitMessage = waitMessage;

            pluginApuppetService.waitSession({"deviceNumber": $scope.deviceNumber}, function(response) {
                if (response.status === 'OK') {
                    $scope.sessionId = response.data.sessionId;
                    $scope.pin = response.data.pin;
                    $scope.waitMessage = localization.localize('plugin.apuppet.session.ready');
                    if ($scope.autoUpdateInterval) {
                        $interval.cancel($scope.autoUpdateInterval);
                        $scope.autoUpdateInterval = null;
                    }
                }
            })
        };

        $scope.startSession = function() {
            pluginApuppetService.getDeviceSettings({"deviceNumber": $scope.deviceNumber}, function(response) {
                if (response.status === 'OK') {
                    pluginApuppetService.finalizeSession({"deviceNumber": $scope.deviceNumber});
                    var redirectUrl = response.data.serverUrl + "?session=" + $scope.sessionId + "&pin=" + $scope.pin;
                    $window.open(redirectUrl, '_blank');
                } else {
                    $scope.loading = false;
                    $scope.errorMessage = localization.localizeServerResponse(response);
                }
            });
        };
    })
    .controller('PluginApuppetSettingsController', function ($scope, $rootScope, pluginApuppetService,
                                                             configurationService, localization) {
        $scope.successMessage = undefined;
        $scope.errorMessage = undefined;

        $rootScope.settingsTabActive = true;
        $rootScope.pluginsTabActive = false;

        $scope.data = {
            configurationId: 0
        };

        pluginApuppetService.getDefaultSettings(function(response) {
            $scope.default = response.data;

            configurationService.getAllConfigurations(function (response) {
                $scope.configurations = response.data;
            });
        });

        $scope.onConfigSelect = function() {
            var configId = $scope.data.configurationId;
            pluginApuppetService.getSettings({"configId": configId}, function(response) {
                if (response.status === 'OK') {
                    $scope.data = response.data;
                    if ($scope.data.useDefault) {
                        $scope.data.serverUrl = $scope.default.serverUrl;
                        $scope.data.secret = $scope.default.secret;
                    }
                } else {
                    $scope.errorMessage = localization.localizeServerResponse(response);
                }
            })
        };

        $scope.saveButtonClass = function () {
            return $scope.data.unsaved ? 'btn-attention' : '';
        };

        $scope.saveDefault = function() {
            if (!$scope.default.secret) {
                $scope.errorMessage = localization.localize('plugin.apuppet.enter.secret');
            } else if (!$scope.default.serverUrl) {
                $scope.errorMessage = localization.localize('plugin.apuppet.enter.server.url');
            } else {
                pluginApuppetService.saveDefaultSettings($scope.default, function (response) {
                    if (response.status === 'OK') {
                        $scope.successMessage = localization.localize('success.plugin.apuppet.settings.saved');
                    } else {
                        $scope.errorMessage = localization.localizeServerResponse(response);
                    }
                });
            }
        };

        $scope.save = function () {
            $scope.successMessage = undefined;
            $scope.errorMessage = undefined;

            if (!$scope.data.useDefault && !$scope.data.secret) {
                $scope.errorMessage = localization.localize('plugin.apuppet.enter.secret');
            } else if (!$scope.data.useDefault && !$scope.data.serverUrl) {
                $scope.errorMessage = localization.localize('plugin.apuppet.enter.server.url');
            } else {
                pluginApuppetService.saveSettings($scope.data, function (response) {
                    if (response.status === 'OK') {
                        $scope.data.unsaved = false;
                        $scope.successMessage = localization.localize('success.plugin.apuppet.settings.saved');
                    } else {
                        if (response.message == 'error.application.not.found') {
                            $scope.errorMessage = localization.localize('plugin.apuppet.application.not.found');
                        } else {
                            $scope.errorMessage = localization.localizeServerResponse(response);
                        }
                    }
                });
            }
        }
    })
    .run(function ($rootScope, $location, localization) {
        $rootScope.$on('plugin-apuppet-device-selected', function (event, device) {
            $location.url('/plugin-apuppet?deviceNumber=' + device.number);
        });
        localization.loadPluginResourceBundles("apuppet");
    });


