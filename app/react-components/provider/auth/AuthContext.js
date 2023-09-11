import React, { createContext, useEffect, useState } from 'react';

// Create context

const initContext = {
    "$$childTail": null,
    "$$childHead": null,
    "$$nextSibling": null,
    "$$watchers": null,
    "$$listeners": null,
    "$$listenerCount": null,
    "$$watchersCount": null,
    "$id": null,
    "$$ChildScope": null,
    "$parent": null,
    "$$prevSibling": null,
    "isControlPanel": null,
    "authService": null,
    "showExitReportMode": null,
    "appName": null,
    "dateTime": null,
    "getUserName": null,
    "isAuth": null,
    "isHidden": null,
    "isSuperAdmin": null,
    "updatesAllowed": null,
    "logout": null,
    "isActive": null,
    "controlPanel": null,
    "mainPanel": null,
    "about": null,
    localization: {
        getLocale: () => null,
        loadPluginResourceBundles: (pluginId) => null,
        localize: (key) => null,
        localizeServerResponse: (response) => null,
        onLangSettingsChange: (newSettings, scope) => null,
        onLogin: (scope) => null
    }

}
const initContextRoot = { "$id": null, "$$childTail": null, "$$childHead": null, "$$prevSibling": null, "$$nextSibling": null, "$$watchers": null, "$parent": null, "$$phase": null, "$root": null, "$$destroyed": null, "$$listeners": null, "$$listenerCount": null, "$$watchersCount": null, "$$isolateBindings": null, "$$asyncQueue": null, "$$postDigestQueue": null, "$$applyAsyncQueue": null, "stylesheets": null, "$state": null, "$stateParams": null, "$$ChildScope": null, "settingsTabActive": null, "pluginsTabActive": null }
export const AuthContext = createContext({ ...initContext, contextRoot: initContext });

// Provider component
export const AuthProvider = ({ children, context = initContext, contextRoot = initContextRoot }) => {
    const [providerAngular, setProviderAngular] = useState({ ...context, contextRoot })
    const [loadding, setLoadding] = useState(false)
    useEffect(() => {
        setLoadding(true)
        setProviderAngular({ ...context, contextRoot })
    }, [])

    return (
        <AuthContext.Provider value={{ ...providerAngular, loadding }}>
            {children}
        </AuthContext.Provider>

    );
};
