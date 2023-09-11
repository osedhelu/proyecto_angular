import React, { useContext } from 'react'
import { useLocalization } from '../../hook/locatization'
import { AuthContext } from '../../provider/auth/AuthContext'
import { useRouter } from '../../hook/useRouter'
import { NavbarLink } from './NavbarLink'
export const Navbar = () => {
    const { openTab, activeTab, hasPermission } = useContext(AuthContext)
    const { router } = useRouter()
    const { location } = useLocalization()




    return (<>
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion " id="accordionSidebar">

            <a class="sidebar-brand d-flex align-items-center justify-content-center" style={{
                height: '9rem'
            }} href="#/">

                <div class="text-center">
                    <div class="login-logo " ><img src="images/logo4.png" /></div>
                </div>
            </a>

            <hr class="sidebar-divider my-0" />

            <NavbarLink active={router === '#/'} icon='fa-tachometer-alt' path='/' region='tab.devices' />

            {
                hasPermission('applications') && <>
                    <NavbarLink active={router === '#/applications'} icon='fa-monument' path='/applications' region='tab.applications' />
                </>
            }

            <NavbarLink active={router === '#/configurations'} icon='fa-tachometer-alt' path='/configurations' region='tab.configurations' />
            <NavbarLink active={router === '#/files'} icon='fa-tachometer-alt' path='/files' region='tab.files' />



            <hr class="sidebar-divider mt-3" />

            <div class="sidebar-heading">

            </div>

            <li class="nav-item">
                <a class="nav-link collapsed pointer" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i class="fas fa-fw fa-cog"></i>
                    <span>{
                        location['menu.settings']
                    }</span>
                </a>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Custom Components:</h6>
                        <a class="collapse-item active" onClick={() => { openTab('DESIGN') }}>{
                            location['tab.default.design']
                        }</a>
                        <a class="collapse-item" href="cards.html">Cards</a>



                        {/* 
                <div className="dropdown-menu dropdown-menu-right">
                    <a ng-className="{'dropdown-item': true,  'active': activeTab === 'DESIGN'}"
                        ng-click="" localized-change-tracking></a>
                    <a ng-className="{'dropdown-item': true,  'active': activeTab === 'COMMON'}"
                        ng-click="openTab('COMMON')" localized-change-tracking>tab.common.settings</a>
                    <a ng-className="{'dropdown-item': true,  'active': activeTab === 'USERS'}" ng-click="openTab('USERS')"
                        localized-change-tracking>tab.users</a>
                    <a ng-className="{'dropdown-item': true,  'active': activeTab === 'GROUPS'}"
                        ng-click="openTab('GROUPS')" localized-change-tracking>tab.groups</a>
                    <a ng-className="{'dropdown-item': true,  'active': activeTab === 'LANG'}" ng-click="openTab('LANG')"
                        localized-change-tracking>tab.language</a>
                    <a ng-className="{'dropdown-item': true,  'active': activeTab === 'HINTS'}" ng-click="openTab('HINTS')"
                        localized-change-tracking>tab.hints</a>
                    <a ng-className="{'dropdown-item': true,  'active': activeTab === 'PLUGINS'}"
                        ng-click="openTab('PLUGINS')" localized-change-tracking>tab.plugins</a>

                    <a ng-repeat="plugin in settingsPlugins"
                        ng-className="{'dropdown-item': true, 'active': activeTab === 'plugin-settings-' + plugin.identifier }"
                        active="act['plugin-settings-' + plugin.identifier]"
                        ng-if="!plugin.settingsPermission || hasPermission(plugin.settingsPermission)"
                        ng-click="openTab('plugin-settings-' + plugin.identifier)">
                        {{localization.localize(plugin.nameLocalizationKey)}}</a>

 */}







                    </div>
                </div>
            </li>

            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i class="fas fa-fw fa-wrench"></i>
                    <span>Utilities</span>
                </a>
                <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Custom Utilities:</h6>
                        <a class="collapse-item" href="utilities-color.html">Colors</a>
                        <a class="collapse-item" href="utilities-border.html">Borders</a>
                        <a class="collapse-item" href="utilities-animation.html">Animations</a>
                        <a class="collapse-item" href="utilities-other.html">Other</a>
                    </div>
                </div>
            </li>

            <hr class="sidebar-divider" />

            <div class="sidebar-heading">
                Addons
            </div>

            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                    aria-expanded="true" aria-controls="collapsePages">
                    <i class="fas fa-fw fa-folder"></i>
                    <span>Pages</span>
                </a>
                <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Login Screens:</h6>
                        <a class="collapse-item" href="login.html">Login</a>
                        <a class="collapse-item" href="register.html">Register</a>
                        <a class="collapse-item" href="forgot-password.html">Forgot Password</a>
                        <div class="collapse-divider"></div>
                        <h6 class="collapse-header">Other Pages:</h6>
                        <a class="collapse-item" href="404.html">404 Page</a>
                        <a class="collapse-item" href="blank.html">Blank Page</a>
                    </div>
                </div>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="charts.html">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Charts</span></a>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="tables.html">
                    <i class="fas fa-fw fa-table"></i>
                    <span>Tables</span></a>
            </li>

            <hr class="sidebar-divider d-none d-md-block" />

            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

            <div class="sidebar-card d-none d-lg-flex">
                <img class="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..." />
                <p class="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components,
                    and
                    more!</p>
                <a class="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to
                    Pro!</a>
            </div>
            {/* #endregion */}
        </ul >




    </>

    )
}
{/* <div className="container-fluid">
    <ul className="nav nav-tabs" role="tablist">
     
      

       

        <li className="nav-item cursor-pointer" style="cursor: pointer;"><a
                ng-className="{'nav-link': true, 'active': activeTab === 'FILES'}" ng-click=""
                localized-change-tracking></a></li>

        <li className="nav-item cursor-pointer" style="cursor: pointer;">

            <div className="dropdown">
                <span
                    ng-className="{'text-primary': true, 'nav-link': true, 'dropdown-toggle': true, 'active':  settingsTabActive}"
                    data-toggle="dropdown" localized-change-tracking></span>





                </div>
            </div>
        </li>
        <li className="nav-item cursor-pointer" style="cursor: pointer;">

            <div className="dropdown">
                <span
                    ng-className="{'text-primary': true, 'nav-link': true, 'dropdown-toggle': true, 'active':  pluginsTabActive}"
                    data-toggle="dropdown" localized-change-tracking>menu.functions</span>
                <div className="dropdown-menu dropdown-menu-right">

                    <a ng-repeat="plugin in functionsPlugins"
                        ng-className="{'dropdown-item': true, 'active': activeTab === 'plugin-' + plugin.identifier }"
                        ng-if="!plugin.functionsPermission || hasPermission(plugin.functionsPermission)"
                        ng-click="openTab('plugin-' + plugin.identifier)">

                        {{localization.localize(plugin.nameLocalizationKey)}}</a>

                </div>
            </div>
        </li>
    </ul>

    <div>
        <div>
            <ng-include src="'app/components/main/view/devices.html'" ng-if="activeTab === 'DEVICES'"></ng-include>
        </div>
        <div ng-if="hasPermission('applications')">
            <ng-include src="'app/components/main/view/applications.html'" ng-if="activeTab === 'APPS'"></ng-include>
        </div>

        <div ng-if="hasPermission('configurations')">
            <ng-include src="'app/components/main/view/configurations.html'" ng-if="activeTab === 'CONFS'"></ng-include>
        </div>
        <div ng-if="hasPermission('files')">
            <ng-include src="'app/components/main/view/files.html'" ng-if="activeTab === 'FILES'"></ng-include>
        </div>
        <div ng-if="hasPermission('settings')">
            <ng-include src="'app/components/main/view/settings/design.html'"
                ng-if="activeTab === 'DESIGN'"></ng-include>
            <ng-include src="'app/components/main/view/settings/common.html'"
                ng-if="activeTab === 'COMMON'"></ng-include>

            <ng-include src="'app/components/main/view/settings/users.html'" ng-if="activeTab === 'USERS'"></ng-include>
            <ng-include src="'app/components/main/view/settings/groups.html'"
                ng-if="activeTab === 'GROUPS'"></ng-include>
            <ng-include src="'app/components/main/view/settings/language.html'"
                ng-if="activeTab === 'LANG'"></ng-include>
            <ng-include src="'app/components/main/view/settings/hints.html'" ng-if="activeTab === 'HINTS'"></ng-include>
            <ng-include src="'app/components/main/view/settings/plugins.html'"
                ng-if="activeTab === 'PLUGINS'"></ng-include>
            <div ng-if="hasPermission('plugins_customer_access_management')">
                <ng-include ng-repeat="plugin in settingsPlugins" src="plugin.settingsViewTemplate"
                    ng-if="activeTab === ('plugin-settings-' + plugin.identifier)"></ng-include>
            </div>
            <div ng-if="!plugin.functionsPermission || hasPermission(plugin.functionsPermission)">
                <ng-include ng-repeat="plugin in functionsPlugins" src="plugin.functionsViewTemplate"
                    ng-if="activeTab === ('plugin-' + plugin.identifier)"></ng-include>
            </div>
        </div>
    </div>
</div> */}