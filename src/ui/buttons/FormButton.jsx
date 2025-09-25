import React from 'react'

const FormButton = ({content, isActive, onClick}) => {


  return (
    <button onClick={onClick} disabled={!isActive ? true : false} className={`form-button ${isActive === false ? "deactive" : ""}`}>
        {content}
    </button>
  )
}

export default FormButton