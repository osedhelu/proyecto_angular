import React, { useContext, useEffect, useState } from 'react'
import { useLocalization } from '../../hook/locatization'
import { AuthContext } from '../../provider/auth/AuthContext'
import { HeaderTimeRealTime } from './HeaderTimeRealTime'

export const HeaderMenu = () => {
    const { getUserName, loadding, logout, controlPanel, authService, isControlPanel, updatesAllowed, mainPanel, contextRoot } = useContext(AuthContext)
    const { expiryWarning, setexpiryWarning } = useState(false)
    const { location } = useLocalization()
    useEffect(() => {
        if (loadding) {
            contextRoot.$on('SHOW_EXPIRY_WARNING', function () {
                setexpiryWarning(true)
            });
        }
    }, [loadding])

    console.log("init Compoinet")
    return (
        <>
            {expiryWarning && <div>
                <a id='headerExpiryWarning' className="expiry-warning"
                >{location['account.expired.short']}</a>
            </div>}
            <HeaderTimeRealTime expiryWarning={expiryWarning} />
            <div className="p-2 ">
                <div className="dropdown">
                    <button data-custom-attribute type="button" className="btn btn-outline-black dropdown-toggle" data-toggle="dropdown">
                        <i className="fas fa-user"></i>
                        {
                            loadding ? getUserName() : '...cargando'
                        }

                    </button>
                    {
                        loadding && <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" data-toggle="modal" data-target="#AboutController" >
                                {
                                    location['menu.about']
                                }
                            </a>
                            <a href="#/profile" className="dropdown-item" >
                                {
                                    location['menu.profile']
                                }

                            </a>
                            {
                                updatesAllowed && <a className="dropdown-item"
                                >{location['updates.title']}</a>
                            }
                            {
                                authService.isSuperAdmin() && !isControlPanel && (
                                    <>
                                        <a class="dropdown-item"
                                            onClick={controlPanel} >
                                            {
                                                location['menu.panel.master']
                                            }
                                        </a>



                                        <a class="dropdown-item" onClick={mainPanel}
                                        >
                                            {
                                                location['menu.panel.main']

                                            }
                                        </a>


                                    </>


                                )
                            }

                            <a className="dropdown-item" onClick={() => logout()} >
                                {
                                    location['menu.logout']
                                }
                            </a>


                        </div>
                    }

                </div>
            </div >
        </>

    )
}