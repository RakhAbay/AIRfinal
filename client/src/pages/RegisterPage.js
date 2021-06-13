import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [phone, setPhone] = useState('')

  const registerHandler = async (e) => {
    e.preventDefault()
    const form = { email: email, password: password, 
      name: name, surname: surname, phone: phone }
    await axios.post('api/auth/register', form)
  }

  return (
    <div className='form-container'>
      <form onSubmit={registerHandler}>
      <h1>Register</h1>
      <input
          placeholder='Name'
          type='text'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
        placeholder='Surname'
        type='text'
        value={surname}
        onChange={(event) => setSurname(event.target.value)}
      />
      <input
          placeholder='Phone number'
          type='phone'
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <input
          placeholder='Email'
          type='text'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          placeholder='Password'
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className='btn'>Register</button>
      </form>
      <Link to='/login'>Switch to login</Link>
    </div>
  )
}
