import React from 'react'
import './TextInputAuth.css'

function TextInputAuth({ icon, type, label, name, value, placeholder, onChange}) {
  return (
    <div className='text-input-auth-wrapper'>
        <div className="label-container">
        <img src={icon} alt="" />
        <label htmlFor={name}>{label}</label>
        </div>
        <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  )
}

export default TextInputAuth