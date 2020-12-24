import React from 'react'

export default function Alert({ value }) {
  return (
    < div className="alert alert-danger" role="alert" >
      { value}
    </div >
  )
}
