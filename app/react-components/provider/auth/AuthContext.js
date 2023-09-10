import React, { createContext, useEffect, useReducer, useState } from 'react';


// Create context
export const AuthContext = createContext();

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
    "about": null
}
const initContextRoot = { "$id": null, "$$childTail": null, "$$childHead": null, "$$prevSibling": null, "$$nextSibling": null, "$$watchers": null, "$parent": null, "$$phase": null, "$root": null, "$$destroyed": null, "$$listeners": null, "$$listenerCount": null, "$$watchersCount": null, "$$isolateBindings": null, "$$asyncQueue": null, "$$postDigestQueue": null, "$$applyAsyncQueue": null, "stylesheets": null, "$state": null, "$stateParams": null, "$$ChildScope": null, "settingsTabActive": null, "pluginsTabActive": null }
// Provider component
export const AuthProvider = ({ children }) => {
    const [loadding, setLoadding] = useState(false)
    const [context, setContext] = useState(initContext)
    const [contextRoot, setContextRoot] = useState(initContextRoot)

    useEffect(() => {
        const observer = new MutationObserver((mutationsList, observer) => {
            try {
                const { deoslv } = document
                if (!!deoslv) {
                    const { 'header-controller': AngulaContext, 'header-controller-root': AngulaContextRoot } = deoslv
                    setContext(AngulaContext)
                    setContextRoot(AngulaContextRoot)
                    setLoadding(true)
                    observer.disconnect();
                }

            } catch (error) {
                setLoadding(false)
            }
        });
        observer.observe(document, { childList: true, subtree: true });
        return () => {
            observer.disconnect();
        };
    }, []);




    // let aa = {}
    // const keys = Object.keys(AngulaContextRoot);
    // for (let i = 0; i < keys.length; i++) {
    //     const key = keys[i];
    //     aa[key] = null
    // }
    return (
        <AuthContext.Provider value={{ ...context, contextRoot, loadding }}>
            {children}
        </AuthContext.Provider>

    );
};
