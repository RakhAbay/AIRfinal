import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import css from './LoginPage.css'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)

  const loginHandler = async (event) => {
    event.preventDefault()
    const form = { email: email, password: password }
    await axios
      .post('api/auth/login', form)
      .then((res) => login(res.data.token, res.data.userId))
  }

  return (
    <div className='form-container'>
		<form onSubmit={loginHandler}>
			<h1>Sign in</h1>
			<input
          placeholder='Email'
          type='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
			<input
          placeholder='Password'
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
			<button className='btn'>Sign In</button>
		</form>
    <Link to='/register'>Switch to register</Link>
	</div>
  )
}