import { Plus } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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