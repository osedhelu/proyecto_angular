import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../provider/auth/AuthContext'
export const NabvarCollapseLink = ({ title, active, router }) => {
    const [text, setText] = useState('')
    const { localization } = useContext(AuthContext)
    useEffect(() => {
        setInterval(() => {
            setText(localization.localize(title))
        }, 3000)
    }, [])
    return (
        <a className={`collapse-item ${active ? 'active' : ''}`} href={`#/${router}`} >{
            text
        }</a>
    )
}