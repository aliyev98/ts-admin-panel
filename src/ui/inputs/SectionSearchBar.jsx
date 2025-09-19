import { Search } from 'lucide-react'
import React from 'react'

const SectionSearchBar = () => {
    return (
        <div className='section-search-bar-container'>

            <button>
                <Search className='search-icon' />
            </button>

            <input type="text" placeholder='Axtar' />
        </div>
    )
}

export default SectionSearchBar