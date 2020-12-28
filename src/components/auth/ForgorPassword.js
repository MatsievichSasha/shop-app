import React, { useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Alert from '../Alert'
import { Link } from 'react-router-dom'

let styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
  },

  loginForm: {
    width: "300px",
    margin: '20px 0px 0px'
  },
};

export default function ForgotPassword() {

  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage('')
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox further instructions')
    } catch {
      setError('Failed to reset password')
    }
    setLoading(false)
  }

  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.loginForm}>
          <form onSubmit={handleSubmit}>
            <h2 className="text-center">Password Reset</h2>
            {error && <Alert value={{
              text: error,
              type: 'danger'
            }}></Alert>}
            {message && <Alert value={
              {
                text: message,
                type: 'success'
              }}></Alert>}
            <div className="form-group">
              <input
                ref={emailRef}
                type="email"
                className="form-control"
                placeholder="email"
                required="required"
              />
            </div>

            <div className="form-group">
              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary btn-block"
              >
                Reset Password
            </button>
            </div>
          </form>
          <p className="text-center">
            <Link to="/login">Log In</Link>
          </p>
          <p className="text-center">
            <Link to="/signup">Create an Account</Link>
          </p>
        </div>
      </div>
    </>
  )
}
