// Localization completed
angular.module('headwind-kiosk')
    .factory('authService', function ($cookies, serverAuthService) {
        var user;
        if ($cookies.get('user')) {
            user = JSON.parse($cookies.get('user'));
        }

        return {
            login: function (login, password, successCallback) {
                serverAuthService.login({ login: login, password: password }, function (response) {
                    if (response.status === "OK") {
                        // const reejecutarArchivo = () => {
                        //     const script = document.createElement('script');
                        //     script.src = 'dist/app/react-components/react-webpack.js';
                        //     script.id = 'id_etiqueta_script';
                        //     const oldScript = document.getElementById('id_etiqueta_script');
                        //     oldScript.parentNode.replaceChild(script, oldScript);
                        // };
                        user = response.data;
                        var userStr = JSON.stringify(user);
                        $cookies.put('user', JSON.stringify(user));
                        // reejecutarArchivo()
                    }

                    successCallback(response);

                });
            },

            options: function (successCallback) {
                serverAuthService.options(successCallback);
            },

            hasPermission: function (permission) {
                if (user) {
                    if (user.userRole) {
                        if (user.userRole.superAdmin) {
                            return true;
                        } else {
                            if (user.userRole.permissions) {
                                return user.userRole.permissions.find(function (p) {
                                    return p.name === permission;
                                }) !== undefined;
                            }
                        }
                    }
                }

                return false;
            },

            logout: function () {
                serverAuthService.logout();

                user = undefined;
                $cookies.remove('user');
                $cookies.remove('deviceSearch');
            },

            update: function (newUser) {
                user = newUser;
                $cookies.put('user', JSON.stringify(newUser))
            },

            isLoggedIn: function () {
                return user !== undefined;
            },

            isSuperAdmin: function () {
                return (user && user.userRole.superAdmin);
            },

            isSingleCustomer: function () {
                return (user && user.singleCustomer);
            },

            getUserName: function () {
                return user ? user.name : undefined;
            },
            getUserLogin: function () {
                return user ? user.login : undefined;
            },
            getId: function () {
                return user ? user.id : undefined;
            },
            getUser: function () {
                var result = {};
                for (var p in user) {
                    if (user.hasOwnProperty(p)) {
                        result[p] = user[p];
                    }
                }

                return result;
            }
        }
    })
    .factory('serverAuthService', function ($resource) {
        return $resource('rest/public/auth/', {}, {
            login: { url: 'rest/public/auth/login', method: 'POST' },
            logout: { url: 'rest/public/auth/logout', method: 'POST' },
            options: { url: 'rest/public/auth/options', method: 'GET' }
        });
    });