import React, { useContext, useState} from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import './Navbar.css'

export default function Navbar() {
  const { isAuthenticated, logout, userId } = useContext(AuthContext)
  const [ema, setEma] = useState('')

  let history = useHistory()

  const logoutHandler = () => {
    logout()
    setEma('')
    history.push('/login')
  }
  var log, profile, emaa
  if (isAuthenticated) {
    const em = async () => {
      emaa = await axios.get(`/api/user/${userId}`)
      setEma(emaa.data)
    }
    em()
    log = <li class="nav-item" onClick={logoutHandler}><a className='ref'>Logout</a></li>
    profile = <li class="nav-item">
    <NavLink className='ref' to='/profile'>Profile</NavLink>
  </li>
  } else {
    log = (
      <li class="nav-item">
        <NavLink className='ref' to='/login'>Login</NavLink>
      </li>
    )
  }

  return (
    <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">AIR</a>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <NavLink className='ref' to='/create'>Create</NavLink>
        </li>
        <li class="nav-item">
          <NavLink className='ref' to='/main'>Main</NavLink>
        </li>
        <li class="nav-item">
          {profile}
        </li>
        <li class="nav-item">
          {log}
        </li>
        <li style={{marginLeft: '1000px'}} class="nav-item">
          {ema.email}
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}