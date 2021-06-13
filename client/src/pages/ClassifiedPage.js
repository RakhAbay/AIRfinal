import axios from 'axios'
import React, { useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const ClassifiedPage = () => {
  const [classified, setClassified] = useState('')
  const [user, setUser] = useState('')
  const classifiedId = useParams().id

  
  const getUser = useCallback(async () => {
    try {
      const fetchedUser = await axios.get(`/api/user/${classified.owner}`)
      setUser(fetchedUser.data)
    } catch (e) {
      console.log(e)
    }
  }, [classifiedId, user, classified.owner])

  useEffect(() => {
    getUser()
    const foo = async () => {
      try {
        const fetched = await axios.get(`/api/classified/${classifiedId}`)
        setClassified(fetched.data)
        const fetchedUser = await axios.get(`/api/user/${classified.owner}`)
        setUser(fetchedUser.data)
        getUser()
      } catch (e) {
        console.log(e)
      }
    }
     foo()
     getUser()
},[])





  return (
    <div> 
      <div className='container conClass'>
        {classified.MultipleImages.map(img => {
          <img style={{margin:'5px'}}
              src={`/uploads/${img}`}
              alt='...'
              style={{ width: '150px', height: '150px' }}
            />
        })}

      <h2>{classified.title}</h2>
      <h3>Description: <span style={{fontSize: '20px'}} >{classified.description}</span> </h3>
      <h3>Price: <span style={{fontSize: '20px'}} >{classified.price} tg</span> </h3>
      <h3>Posted date: <span style={{fontSize: '20px'}} >{classified.date}</span> </h3>
      
      <h2>Contact</h2>
      <h3>Full name: <span style={{fontSize: '20px'}} >{user.name} {user.surname}</span> </h3>
      <h3>Email: <span style={{fontSize: '20px'}} >{user.email}</span> </h3>
      <h3>Phone: <span style={{fontSize: '20px'}} >{user.phone}</span> </h3>
      <p></p>
      </div>
    </div>
  )
}
