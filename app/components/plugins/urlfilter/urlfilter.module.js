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

angular.module('plugin-urlfilter', ['ngResource', 'ui.bootstrap', 'ui.router', 'ngTagsInput', 'ncy-angular-breadcrumb'])
    .config(function ($stateProvider) {

        try {
            $stateProvider.state('plugin-urlfilter', {
                url: "/" + 'plugin-urlfilter',
                templateUrl: 'app/components/main/view/content.html',
                controller: 'TabController',
                ncyBreadcrumb: {
                    label: '{{"breadcrumb.plugin.urlfilter.rules" | localize}}', //label to show in breadcrumbs
                },
                resolve: {
                    openTab: function () {
                        return 'plugin-urlfilter'
                    }
                },
            });
        } catch (e) {
            console.log('An error when adding state ' + 'plugin-rules-urlfilter', e);
        }

        try {
            $stateProvider.state('plugin-settings-urlfilter', {
                url: "/" + 'plugin-settings-urlfilter',
                templateUrl: 'app/components/main/view/content.html',
                controller: 'TabController',
                ncyBreadcrumb: {
                    label: '{{"breadcrumb.plugin.urlfilter.lists" | localize}}', //label to show in breadcrumbs
                },
                resolve: {
                    openTab: function () {
                        return 'plugin-settings-urlfilter'
                    }
                },
            });
        } catch (e) {
            console.log('An error when adding state ' + 'plugin-lists-urlfilter', e);
        }
    })
    .factory('pluginUrlfilterService', function ($resource) {
        return $resource('', {}, {
            getRules: {url: 'rest/plugins/urlfilter/private/rule/search/:value', method: 'GET'},
            saveRule: {url: 'rest/plugins/urlfilter/private/rule', method: 'PUT'},
            copyRule: {url: 'rest/plugins/urlfilter/private/rule/copy/:srcId/:dstId', method: 'GET'},
            getLists: {url: 'rest/plugins/urlfilter/private/list/search', method: 'POST'},
            getList:  {url: 'rest/plugins/urlfilter/private/list/:id', method: 'GET'},
            saveList: {url: 'rest/plugins/urlfilter/private/list', method: 'PUT'},
            deleteList: {url: 'rest/plugins/urlfilter/private/list/:id', method: 'DELETE'}
        });
    })

    .controller('PluginUrlfilterRulesController', function ($scope, $rootScope, $modal, pluginUrlfilterService, localization) {
        $scope.successMessage = undefined;
        $scope.errorMessage = undefined;

        $scope.localization = localization;

        $scope.paging = {
            pageNum: 1,
            pageSize: 50,
            currentPage: 1,
            totalItems: 0,
            searchValue: null
        };

        $rootScope.settingsTabActive = false;
        $rootScope.pluginsTabActive = true;

        $scope.search = function () {
            pluginUrlfilterService.getRules({value: $scope.paging.searchValue},
                function (response) {
                    $scope.rules = response.data;
                    $scope.rules.forEach(function(item) {
                        item.activeText = item.active ? localization.localize('yes') : '-';
                        item.blockAdsText = item.blockAds ? localization.localize('yes') : '-';
                    });
                });
        };

        $scope.editProfile = function(rule) {
            var modalInstance = $modal.open({
                templateUrl: 'app/components/plugins/urlfilter/views/rules.modal.html',
                controller: 'PluginUrlfilterEditProfileController',
                resolve: {
                    rule: function () {
                        return rule;
                    }
                }
            });

            modalInstance.result.then(function (saved) {
                if (saved) {
                    $scope.search();
                }
            });
        };

        $scope.copyProfile = function (rule) {
            var modalInstance = $modal.open({
                templateUrl: 'app/components/plugins/urlfilter/views/copy.modal.html',
                controller: 'PluginUrlfilterCopyProfileController',
                resolve: {
                    request: function () {
                        return {
                            srcId: rule.configurationId,
                            dstId: rule.configurationId
                        };
                    }
                }
            });

            modalInstance.result.then(function (error) {
                if (error) {
                    $scope.successMessage = undefined;
                    $scope.errorMessage = error;
                } else {
                    $scope.successMessage = localization.localize("plugin.urlfilter.update.successful");
                    $scope.errorMessage = undefined;
                    $scope.search();
                }
            });
        };

        $scope.search();
    })

    .controller('PluginUrlfilterListsController', function ($scope, $rootScope, $modal, confirmModal,
                                                            pluginUrlfilterService, localization) {
        $scope.successMessage = undefined;
        $scope.errorMessage = undefined;

        $scope.localization = localization;

        $scope.paging = {
            pageNum: 1,
            pageSize: 50,
            currentPage: 1,
            totalItems: 0,
            filter: null
        };

        $rootScope.settingsTabActive = true;
        $rootScope.pluginsTabActive = false;

        $scope.search = function () {
            pluginUrlfilterService.getLists($scope.paging,
                function (response) {
                    $scope.lists = response.data.items;
                    $scope.paging.totalItems = response.data.totalItemsCount;
                });
        };

        var editList = function(list) {
            var modalInstance = $modal.open({
                templateUrl: 'app/components/plugins/urlfilter/views/list.modal.html',
                controller: 'PluginUrlfilterEditListController',
                resolve: {
                    list: function () {
                        return list;
                    }
                }
            });

            modalInstance.result.then(function (saved) {
                if (saved) {
                    $scope.search();
                }
            });
        };

        $scope.editList = function(list) {
            if (list.id) {
                pluginUrlfilterService.getList({id: list.id},
                    function (response) {
                        list.list = response.data.list;
                        editList(list);
                    });
            } else {
                editList(list);
            }
        };

        $scope.deleteList = function (list) {
            var localizedText = localization.localize('plugin.urlfilter.question.delete.list').replace('${listname}', list.name);
            confirmModal.getUserConfirmation(localizedText, function () {
                pluginUrlfilterService.deleteList({id: list.id}, function (response) {
                    if (response.status === 'OK') {
                        $scope.search();
                    } else {
                        $scope.errorMessage = localization.localize('error.internal.server');
                    }
                });
            });
        };


        $scope.search();
    })

    .controller('PluginUrlfilterEditListController', function ($scope, $modal, $modalInstance,
                                                          localization, pluginUrlfilterService, list) {

        var listCopy = {};
        for (var p in list) {
            if (list.hasOwnProperty(p)) {
                listCopy[p] = list[p];
            }
        }

        $scope.list = listCopy;
        $scope.saving = false;

        $scope.closeModal = function () {
            $modalInstance.dismiss();
        };

        $scope.save = function () {
            // Validate form
            if (!$scope.list.name || $scope.list.name.length === 0) {
                $scope.errorMessage = localization.localize('plugin.urlfilter.error.empty.list.name');
            } else if (!$scope.list.list || $scope.list.list.length === 0) {
                $scope.errorMessage = localization.localize('plugin.urlfilter.error.empty.list.content');
            } else {
                $scope.saving = true;
                pluginUrlfilterService.saveList($scope.list, function (response) {
                    $scope.saving = false;
                    if (response.status === 'OK') {
                        $modalInstance.close(true);
                    } else {
                        $scope.errorMessage = localization.localize(response.message);
                    }
                }, function () {
                    $scope.saving = false;
                    $scope.errorMessage = localization.localize('error.request.failure');
                });
            }
        };

    })

    .controller('PluginUrlfilterEditProfileController', function ($scope, $modal, $modalInstance,
                                                               localization, pluginUrlfilterService, rule) {

        var ruleCopy = { };
        for (var p in rule) {
            if (rule.hasOwnProperty(p)) {
                ruleCopy[p] = rule[p];
            }
        }

        pluginUrlfilterService.getLists({},
            function (response) {
                $scope.lists = [];
                $scope.lists.push({ key: 'no_list', name: localization.localize('plugin.urlfilter.no.list')});
                response.data.items.forEach(function(item) {
                    $scope.lists.push(item);
                });
            });

        $scope.rule = ruleCopy;
        $scope.saving = false;

        $scope.closeModal = function () {
            $modalInstance.dismiss();
        };

        $scope.save = function () {
            $scope.saving = true;
            if ($scope.rule.blacklistKey === 'no_list') {
                $scope.rule.blacklistKey = null;
            }
            if ($scope.rule.whitelistKey === 'no_list') {
                $scope.rule.whitelistKey = null;
            }
            pluginUrlfilterService.saveRule($scope.rule, function (response) {
                $scope.saving = false;
                if (response.status === 'OK') {
                    $modalInstance.close(true);
                } else {
                    $scope.errorMessage = localization.localize(response.message);
                }
            }, function () {
                $scope.saving = false;
                $scope.errorMessage = localization.localize('error.request.failure');
            });
        }
    })

    .controller('PluginUrlfilterCopyProfileController', function ($scope, $modal, $modalInstance, localization,
                                                             pluginUrlfilterService, configurationService, request) {

        $scope.request = request;

        configurationService.getAllConfigurations({},
            function (response) {
                $scope.configurations = response.data;
            });

        $scope.closeModal = function () {
            $modalInstance.dismiss();
        };

        $scope.copy = function () {
            $scope.saving = true;
            pluginUrlfilterService.copyRule($scope.request, function (response) {
                $scope.saving = false;
                $modalInstance.close(response.status === 'OK' ? false : localization.localize('error.request.failure'));
            }, function () {
                $scope.saving = false;
                $modalInstance.close(localization.localize('error.request.failure'));
            });
        };

    })

    .run(function ($rootScope, $location, localization) {
        localization.loadPluginResourceBundles("urlfilter");
    });


