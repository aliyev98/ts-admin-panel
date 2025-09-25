import React from 'react'
import { useDispatch } from 'react-redux';
import { setSidebarSelection } from '../../redux/features/sidebarSlice'
import { ChevronRight } from 'lucide-react';

const PrimaryButton = ({ content, route }) => {

    const dispatch = useDispatch();

    return (
        <div className='primary-button' onClick={() => dispatch(setSidebarSelection(route))}>
            <span>{content}</span>
            <ChevronRight />
        </div>
    )
}

export default PrimaryButton