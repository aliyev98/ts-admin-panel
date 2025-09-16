import { Section, SquareDashed, Table } from 'lucide-react'
import React from 'react'

const LayoutDropdown = ({ layout, setLayout }) => {

    const buttons = [
        { id: 1, content: 'Table', img: <Table /> },
        { id: 2, content: 'Card', img: <SquareDashed /> },
    ]

    const changeLayout = () => {
        if (layout === "card") {
            setLayout("table")
        }
        if(layout === "table"){
            setLayout("card")
        }
    }

    return (
        <div className='custom-dropdown layout-dropdown'>

            {
                buttons.map((btn) => (
                    <button key={btn.id} onClick={changeLayout}>
                        {btn.img}
                        <span>{btn.content}</span>
                    </button>
                ))
            }


        </div>
    )
}

export default LayoutDropdown