import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

export default function UpdateCon() {  
    const { userId } = useContext(AuthContext)
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [phone, setPhone] = useState('')

  const updateHandler = async (e) => {
    e.preventDefault()
    const form = { password: password, 
      name: name, surname: surname, phone: phone }
    await axios.update(`api/user/${userId}`, form)
  }

  return (
    <div className='form-container'>
      <form onSubmit={updateHandler}>
      <h1>Update contact info</h1>
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
        <button className='btn'>Update</button>
      </form>
    </div>
  )
}
