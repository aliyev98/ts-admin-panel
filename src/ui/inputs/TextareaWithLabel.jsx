import React from 'react'

const TextareaWithLabel = ({ label, placeholder, lang, register, data, activeLanguage, baseLanguage }) => {
    return (
        <div className='textarea-with-label'>

            <label htmlFor="">
                <span>{label}</span>
                <span>({lang})</span>
            </label>

            <textarea
                placeholder={placeholder}
                {...register(`${data}.${activeLanguage}`, { required: activeLanguage === baseLanguage })}
            />

        </div>
    )
}

export default TextareaWithLabel