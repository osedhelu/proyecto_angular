import React from 'react'
import { useClock } from '../../hook/useClock'
export const HeaderTimeRealTime = () => {
    const time = useClock()
    return (
        <div className="p-2 ">

            <div className="mr-3" id='headerDateTime'>
                <i className="far fa-calendar-alt"></i>
                <span className='m-1'>                    {time.toLocaleString()}</span>
            </div>
        </div>
    )
}