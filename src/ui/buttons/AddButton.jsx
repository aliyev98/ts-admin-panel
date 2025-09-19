import { Plus } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setSidebarSelection } from '../../redux/sidebarSlice'

const AddButton = ({content, route}) => {

    const dispatch = useDispatch();

    return (
        <button className='add-button' onClick={()=> dispatch(setSidebarSelection(route))}>
            <Plus />
            <span>{content}</span>
        </button>
    )
}

export default AddButton