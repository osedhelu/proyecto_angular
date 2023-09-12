import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from '../../hook/useRouter'
import { AuthContext } from '../../provider/auth/AuthContext'
import { NabvarCollapseLink } from './NabvarCollapseLink'
import { NavbarLink } from './NavbarLink'
export const Navbar = () => {
    const { hasPermission, loadData, localization } = useContext(AuthContext)
    const [dataMenu, setDataMenu] = useState({ functionsPlugins: [], settingsPlugins: [] })
    const { router } = useRouter()
    useEffect(() => {
        loadData().then((resp) => {
            setDataMenu(resp)
        })
    }, [])


    return (<>

        {/* <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion " id="accordionSidebar"></ul> */}

        <ul className="col-md-2 d-none  bg-gradient-primary d-md-block  sidebar position-fixed sidebar-dark accordion" id="accordionSidebar">
            <div className='' style={{
                width: '100%',
                height: '6rem'
            }}></div>
            <NavbarLink active={router === '#/'} icon='fa-tachometer-alt' path='/' region='tab.devices' />

            {
                hasPermission('applications') && <>
                    <NavbarLink active={router === '#/applications'} icon='fa-monument' path='/applications' region='tab.applications' />
                </>
            }

            <NavbarLink active={router === '#/configurations'} icon='fa-tachometer-alt' path='/configurations' region='tab.configurations' />
            <NavbarLink active={router === '#/files'} icon='fa-tachometer-alt' path='/files' region='tab.files' />



            <hr className="sidebar-divider mt-3" />

            <div className="sidebar-heading">

            </div>

            <li className="nav-item">
                <a className="nav-link collapsed pointer" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>{
                        localization.localize('menu.settings')
                    }</span>
                </a>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Components:</h6>
                        <NabvarCollapseLink active={router === '#/designSettings'} router='designSettings' title='tab.default.design' />
                        <NabvarCollapseLink active={router === '#/commonSettings'} router='commonSettings' title='tab.common.settings' />
                        <NabvarCollapseLink active={router === '#/users'} router='users' title='tab.users' />
                        <NabvarCollapseLink active={router === '#/groups'} router='groups' title='tab.groups' />
                        <NabvarCollapseLink active={router === '#/langSettings'} router='langSettings' title='tab.language' />
                        {
                            dataMenu.settingsPlugins.map((plugin) => !plugin.settingsPermission || hasPermission(plugin.settingsPermission) && (
                                <NabvarCollapseLink key={plugin.nameLocalizationKey} active={router === `#/plugin-settings-${plugin.identifier}`} router={`plugin-settings-${plugin.identifier}`} title={plugin.nameLocalizationKey} />

                            ))
                        }
                    </div>
                </div>
            </li>

            <li className="nav-item">
                <a className="nav-link collapsed pointer" data-toggle="collapse" data-target="#collapseUtilities"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-fw fa-wrench"></i>
                    <span>{localization.localize('menu.functions')}</span>
                </a>
                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Utilities:</h6>
                        {

                            dataMenu.functionsPlugins.map((plugin) => (!plugin.functionsPermission || hasPermission(plugin.functionsPermission)) &&
                                <NabvarCollapseLink
                                    key={plugin.nameLocalizationKey}
                                    active={router === `#/plugin-${plugin.identifier}`}
                                    router={`plugin-${plugin.identifier}`}
                                    title={plugin.nameLocalizationKey} />
                            )

                        }

                    </div>
                </div>
            </li>

        </ul >
    </>
    )
}




