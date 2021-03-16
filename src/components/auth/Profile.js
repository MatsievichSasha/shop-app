import React, { useState } from 'react'
import Alert from '../Alert'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function Profile() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError('')
    try {
      await logout()
      history.push('/login')
    } catch {
      setError('Failed to log out')
    }
  }
  return (
    <>
      <div className="container">
        <div className="row profile justify-content-center text-center">
          <div className="col-sm-12 col-md-12">
            <h2 className="text-center">Profile</h2>
            {error && <Alert value={{
              text: error,
              type: 'danger'
            }}></Alert>}
          </div>
          <div className="col-sm-12 col-md-12">
            <strong>Email:&nbsp;</strong><span>{currentUser.email}</span>
          </div>
          <div className="col-sm-12 col-md-12 p-4">
            <Link to="/update-profile" className="btn btn-primary">Update profile</Link>
          </div>
          <div className="col-sm-12 col-md-12">
            <button className="btn btn-sm btn-link" onClick={handleLogout}>Log out</button>
          </div>
        </div>

      </div>
    </>
  )
}
