import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Alert from '../components/Alert'
import { Link, useHistory } from "react-router-dom"

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

export default function SignUp() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }
    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch {
      setError('Failed to create an account')
    }
    setLoading(false)
  }

  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.loginForm}>
          <form onSubmit={handleSubmit}>
            <h2 className="text-center">Sign Up</h2>
            {/* {currentUser && currentUser.email} */}
            {/* {currentUser.email} */}
            {error && <Alert value={{
              text: error,
              type: 'danger'
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
              <input
                ref={passwordRef}
                type="password"
                className="form-control"
                placeholder="Password"
                required="required"
              />
            </div>
            <div className="form-group">
              <input
                ref={passwordConfirmRef}
                type="password"
                className="form-control"
                placeholder="Password Confirmation"
                required="required"
              />
            </div>
            <div className="form-group">
              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary btn-block"
              >
                Sign up
            </button>
            </div>
            <div className="clearfix">
              {/*              <label className="pull-left checkbox-inline">
                <input type="checkbox" /> Remember me
            </label> */}
            </div>
          </form>
          <p className="text-center">
            <Link to="/login">Already have an account?</Link>
          </p>
        </div>
      </div>
    </>
  )
}
