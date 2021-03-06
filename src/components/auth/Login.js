import React, { useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Alert from '../Alert'
import { Link, useHistory } from 'react-router-dom'

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

export default function Login() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch {
      setError('Failed to log in')
    }
    setLoading(false)
  }

  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.loginForm}>
          <form onSubmit={handleSubmit}>
            <h2 className="text-center">Log In</h2>
            {error && <Alert value={
              {
                text: error,
                type: 'danger'
              }
            }></Alert>}
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
              <input
                ref={passwordRef}
                type="password"
                className="form-control"
                placeholder="Password"
                required="required"
              />
            </div>

            <div className="form-group">
              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary btn-block"
              >
                Log In
            </button>
            </div>
          </form>
          <p className="text-center">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
          <p className="text-center">
            <Link to="/signup">Create an Account</Link>
          </p>
        </div>
      </div>
    </>
  )
}
