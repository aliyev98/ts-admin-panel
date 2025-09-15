import React from 'react'
import { Search } from 'lucide-react'

const HeaderSearchBar = () => {
    return (
        <div className='header-search-bar-container'>

            <button>
                <Search />
            </button>

            <input type="text" placeholder='Search' />



        </div>
    )
}

export default HeaderSearchBar