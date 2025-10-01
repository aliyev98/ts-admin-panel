import React from 'react'
import { OrbitProgress } from 'react-loading-indicators'

const Loading = () => {
    return (
        <div className='loading-container '>
            <OrbitProgress className color="#000" speedPlus='2' size="large" text="Yükənir..." textColor="#000" />
        </div>
    )
}

export default Loading