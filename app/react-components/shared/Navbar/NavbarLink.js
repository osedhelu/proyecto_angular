import React, { useContext } from 'react'
import { AuthContext } from '../../provider/auth/AuthContext'
export const NavbarLink = ({
    path = "",
    icon = "",
    region = "tab.configurations",
    active = false
}) => {
    const { localization } = useContext(AuthContext)
    return (
        <li className={`nav-item ${active ? 'active' : ''}`} >
            <a className="nav-link pointer" href={`#${path}`}>
                <i className={`fas fa-fw ${icon}`}></i>
                <span>{localization.localize(region)}</span></a>
        </li>
    )
}