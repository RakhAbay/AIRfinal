import React, { useState, useContext, useCallback, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function ProfilePage() {
  const { userId } = useContext(AuthContext)
  const [user, setUser] = useState('')
  const [classifieds, setClassifieds] = useState([])
  const [saves, setSaves] = useState([])
  var savesArr = []

  const fetchUser = useCallback(async () => {
    const fetched = await axios.get('/api/user/' + userId)
    setUser(fetched.data)
    console.log(saves)
    for (let i = 0; i < fetched.data.saved.length; i++) {
      const fetchedClass = await axios.get(`api/classified/${fetched.data.saved[i]}`)
      savesArr.push(fetchedClass.data)
      console.log(savesArr[i])
    }
    setSaves(savesArr)
    console.log(saves)
  })
  const fetchClassifieds = useCallback(async () => {
    try {
      const fetched = await axios.get(`api/classified/own/${userId}`)
      setClassifieds(fetched.data)
    } catch (e) {}
  }, [])

  const deleteHandler = async (id) => {
    await axios.delete(`api/classified/${id}`)
  }
  const removeHandler = async (id) => {
    await axios.delete(`api/classified/${id}/${userId}`)
  }

  useEffect(() => {
      fetchUser()
    fetchClassifieds()
  }, [fetchUser])

  //
  return (
    <div className='container searchbar'>
      <h2>Contact info</h2>
      <h5>Name: <span style={{fontSize:'18px'}}>{user.name}</span></h5>
      <h5>Surname: <span style={{fontSize:'18px'}}>{user.surname}</span></h5>
      <h5>Phone: <span style={{fontSize:'18px'}}>{user.phone}</span></h5>
      <h5>Email: <span style={{fontSize:'18px'}}>{user.email}</span></h5>
      <button className='btn btn-outline-primary'>
      <Link  to={`/update`}>Update</Link>
      </button>
 
      <h2>Liked</h2>
      {saves.map((classified, key) => (
          <div>
          <div key={key} className='classified-container'>
            <div>
            <img
              src={`/uploads/${classified.MultipleImages[0]}`}
              alt='...'
              style={{ width: '150px', height: '150px' }}
            /></div>
            <div>
            <h3 style={{marginLeft: 20}}>{classified.title}</h3>
            <button  style={{marginLeft:'20px'}} className='btn btn-outline-info'>
            <Link  to={`/detail/${classified._id}`}>Details</Link>
            </button>
            <button style={{marginLeft:'20px'}} onClick={() => removeHandler(classified.id)} className='btn btn-outline-danger'>Remove</button>
            </div>
            <hr></hr>
          </div>
          <br></br>
          </div>
        ))}
      <h2>Own classifieds</h2>
      {classifieds.map((classified, key) => (
          <div>
          <div key={key} className='classified-container'>
            <div>
            <img
              src={`/uploads/${classified.MultipleImages[0]}`}
              alt='...'
              style={{ width: '150px', height: '150px' }}
            /></div>
            <div>
            <h3 style={{marginLeft: 20}}>{classified.title}</h3>
            <button  style={{marginLeft:'20px'}} className='btn btn-outline-info'>
            <Link  to={`/detail/${classified._id}`}>Details</Link>
            </button>
            <button style={{marginLeft:'20px'}} onClick={() => deleteHandler(classified.id)} className='btn btn-outline-danger'>Delete</button>
            </div>
          </div>
          <hr></hr>
          <br></br>
          
          </div>
        ))}

      
      </div> 
  )
}
