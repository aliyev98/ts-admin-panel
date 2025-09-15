import { Bell } from 'lucide-react'
import React from 'react'

const NotificationsButton = () => {
    return (
        <button className='notifications-button-container'>

            <Bell />

            <div className="count-bar"><span>99+</span></div>

        </button>
    )
}

export default NotificationsButton