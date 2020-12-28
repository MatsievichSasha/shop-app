import React, { useState } from 'react'
import Alert from './Alert'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import Cards from './cards/Cards'

export default function Dashboard() {

  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <a className="nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Все товары</a>
          <Link to='/create-card' className="nav-link" data-toggle="tab" role="tab" aria-controls="nav-profile" aria-selected="false">Добавить товар</Link>
          <a className="nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Редактировать товар</a>
          <Link to="/profile" className="nav-link" data-toggle="tab" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</Link>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
      <Cards></Cards>
      </div>
    </>
  )
}
