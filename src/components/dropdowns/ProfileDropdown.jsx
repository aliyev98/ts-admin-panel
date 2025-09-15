import { LogOut, UserRound } from 'lucide-react'
import React from 'react'

const ProfileDropdown = ({ref}) => {

    const buttons = [
        { id: 1, content: 'Profile', img: <UserRound /> },
        { id: 2, content: 'Logout', img: <LogOut /> },
    ]

    return (
        <div ref={ref} className='custom-dropdown profile-dropdown'>

            {
                buttons.map((btn) => (
                    <button key={btn.id}>
                        {btn.img}
                        <span>{btn.content}</span>
                    </button>
                ))
            }

        </div>
    )
}

export default ProfileDropdown