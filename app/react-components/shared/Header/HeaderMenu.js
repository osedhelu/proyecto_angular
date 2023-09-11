import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../provider/auth/AuthContext'
import { HeaderTimeRealTime } from './HeaderTimeRealTime'

export const HeaderMenu = () => {
    const { getUserName, loadding, logout, controlPanel, authService, isControlPanel, updatesAllowed, mainPanel, contextRoot, localization } = useContext(AuthContext)
    const { expiryWarning, setexpiryWarning } = useState(false)
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
            <li className="nav-item dropdown no-arrow mx-1">
                {
                    expiryWarning && <div>
                        <a id='headerExpiryWarning' className="expiry-warning"
                        >{localization.localize('account.expired.short')}</a>
                    </div>
                }

            </li>

            <li className="nav-item dropdown no-arrow mx-1">
                <span className='nav-link'>
                    <HeaderTimeRealTime expiryWarning={expiryWarning} />
                </span>

            </li>
            <div className="topbar-divider d-none d-sm-block"></div>

            <li className="nav-item dropdown no-arrow">
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                        {
                            loadding ? getUserName() : '...cargando'
                        }
                    </span>
                    {/* <img className="" src="img/undraw_profile.svg" /> */}
                    <i className="img-profile   rounded-circle fas fa-user" style={{
                        fontSize: '1.7rem'
                    }}></i>

                </a>
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown">
                    {
                        loadding && <>
                            <a className="dropdown-item " data-toggle="modal" data-target="#AboutController">
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                {
                                    localization.localize('menu.about')
                                }
                            </a>
                            <a className="dropdown-item" href="#/profile">
                                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                {
                                    localization.localize('menu.profile')
                                }
                            </a>



                            {
                                updatesAllowed && <a className="dropdown-item"
                                >
                                    <i className="fas fa-tools fa-sm fa-fw mr-2 text-gray-400"></i>
                                    {localization.localize('updates.title')}</a>
                            }
                            {
                                authService.isSuperAdmin() && !isControlPanel && (
                                    <>
                                        <a className="dropdown-item" onClick={controlPanel}>
                                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                            {
                                                localization.localize('menu.panel.master')
                                            }
                                        </a>


                                        <a className="dropdown-item" onClick={mainPanel}>
                                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                            {
                                                localization.localize('menu.panel.main')

                                            }
                                        </a>

                                    </>


                                )
                            }

                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" onClick={() => logout()} >
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                {
                                    localization.localize('menu.logout')
                                }
                            </a>

                        </>
                    }

                </div>
            </li >


        </>

    )
}