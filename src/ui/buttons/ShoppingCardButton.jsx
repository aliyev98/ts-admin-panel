import { ShoppingCart } from 'lucide-react'
import React from 'react'

const ShoppingCardButton = () => {
    return (
        <button className="shopping-card-btn">

            <ShoppingCart />
            
            <div className="count-bar"><span>99+</span></div>

        </button>
    )
}

export default ShoppingCardButton