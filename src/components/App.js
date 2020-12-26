import React from 'react'
import AuthProvider from '../contexts/AuthContext';
import SignUp from './SignUp';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import Privetroute from './Privetroute';
import ForgotPassword from './ForgorPassword'
import UpdateProfile from './UpdateProfile';



function App() {
  return (
    <Router>
    <AuthProvider>
      <Switch>
      <Privetroute exact path ='/' component = {Dashboard}/>
      <Privetroute path ='/update-profile' component = {UpdateProfile}/>
      <Route path ='/signup' component = {SignUp}/>
      <Route path ='/login' component = {Login}/>
      <Route path ='/forgot-password' component = {ForgotPassword}/>
      </Switch>
    </AuthProvider>


    </Router>
    
  )
}

export default App;
