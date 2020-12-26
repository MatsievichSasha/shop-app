import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Alert from '../components/Alert'
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

export default function UpdateProfile() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updateEmail, updatePassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    const promises = []
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }
    Promise.all(promises)
      .then(() => {
        history.push('./')
      })
      .catch(() => {
        setError('Failed to update accaunt')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.loginForm}>
          <form onSubmit={handleSubmit}>
            <h2 className="text-center">Update Profile</h2>
            {error && <Alert value={{
              text: error,
              type: 'danger'
            }}></Alert>}
            <div className="form-group">
              <input
                ref={emailRef}
                type="email"
                className="form-control"
                required="required"
                defaultValue={currentUser.email}
              />
            </div>
            <div className="form-group">
              <input
                ref={passwordRef}
                type="password"
                className="form-control"
                placeholder="Leave blank to keep the same"
              />
            </div>

            <div className="form-group">
              <input
                ref={passwordConfirmRef}
                type="password"
                className="form-control"
                placeholder="Leave blank to keep the same"
              />
            </div>

            <div className="form-group">
              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary btn-block"
              >
                Update
            </button>
            </div>
          </form>
          <p className="text-center">
            <Link to="/">Cancel</Link>
          </p>
        </div>
      </div>
    </>
  )
}
