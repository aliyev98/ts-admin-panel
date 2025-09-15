import React from 'react'
import HeaderSearchBar from '../ui/inputs/HeaderSearchBar'
import NotificationsButton from '../ui/buttons/NotificationsButton'
import ShoppingCardButton from '../ui/buttons/ShoppingCardButton'
import Profile from '../ui/buttons/Profile'

const Header = () => {
    return (

        <div className='header-container'>

            <HeaderSearchBar />

            <div className="header-actions">

                <NotificationsButton />

                <ShoppingCardButton />

                <Profile />

            </div>

        </div>
    )
}

export default Header