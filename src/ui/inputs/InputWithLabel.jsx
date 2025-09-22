import React from 'react'

const InputWithLabel = ({ label, lang, placeholder, htmlFor, register, activeLanguage, baseLanguage }) => {
    return (
        <div className='input-with-label'>

            <label htmlFor={htmlFor}>
                <span>{label}</span>
                <span>({lang})</span>
            </label>

            <input type="text" placeholder={placeholder}
                {...register(`title.${activeLanguage}`, { required: activeLanguage === baseLanguage })}
            />

        </div>
    )
}

export default InputWithLabel