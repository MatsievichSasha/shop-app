
import React from 'react'

export default function Alert({ value }) {
  
  return (
    < div className = {`alert alert-${value.type}`} role="alert" >
      {value.text}
    </div >
  )
}