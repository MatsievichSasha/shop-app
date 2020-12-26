import React, { useState } from 'react'
import Alert from './Alert'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
export default function Dashboard() {
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
      <div>
        <h2 className="text-center">Profile</h2>
        {error && <Alert value={{
          text: error,
          type: 'danger'
        }}></Alert>}
        <strong>Email:</strong>{currentUser.email}
        <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update profile</Link>
      </div>
      <div>
        <button className="btn btn-link" onClick={handleLogout}>Log out</button>
      </div>

    </>
  )
}
