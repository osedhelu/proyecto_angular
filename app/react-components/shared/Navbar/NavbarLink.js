import React from 'react'
import { useRouter } from '../../hook/useRouter'
import { useLocalization } from '../../hook/locatization'
export const NavbarLink = ({
    path = "",
    icon = "",
    region = "tab.configurations",
    active = false

}) => {
    const { location } = useLocalization()
    return (
        <li className={`nav-item ${active ? 'active' : ''}`} >
            <a className="nav-link pointer" href={`#${path}`}>
                <i className={`fas fa-fw ${icon}`}></i>
                <span>{location[region]}</span></a>
        </li>

    )
}