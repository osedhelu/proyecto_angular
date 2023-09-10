import React, { useContext } from 'react'
import { AuthContext } from '../../provider/auth/AuthContext'
export const HeaderLogo = () => {
    const { mainPanel } = useContext(AuthContext)
    return (
        <div className="p-2 mr-auto ">
            <a onClick={() => mainPanel()}>
                <img src='/images/logo5.png' alt='Logo' style={{
                    width: " 100%"
                }} />
            </a>
        </div>

    )
}

