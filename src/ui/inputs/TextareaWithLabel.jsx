import React from 'react'

const TextareaWithLabel = ({ label, lang }) => {
    return (
        <div className='textarea-with-label'>

            <label htmlFor="">
                <span>{label}</span>
                <span>{lang}</span>
            </label>

            <textarea name="" id=""></textarea>

        </div>
    )
}

export default TextareaWithLabel