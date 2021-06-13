import axios from 'axios'
import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const CreatePage = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('None')
  const [subcategory, setSubcategory] = useState('None')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [fileName, setFileName] = useState('')
  const { userId, token } = useContext(AuthContext)

  var subchoice = (
    <select onChange={(event) => setSubcategory(event.target.value)}>
      <option value='None'>None</option>{' '}
    </select>
  )
  switch (category) {
    case 'Tech':
      subchoice = (
        <select onChange={(event) => setSubcategory(event.target.value)}>
          <option value='Phones'>Phones</option>
          <option value='TV'>TV</option>
          <option value='Laptop'>Laptop</option>
        </select>
      )
      break
    case 'Properties':
      subchoice = (
        <select onChange={(event) => setSubcategory(event.target.value)}>
          <option value='SaleHA'>For Sale: Houses and Apartments</option>
          <option value='RentHA'>For Rent: Houses and Apartments</option>
          <option value='SaleSOS'>For Sale: Shops, Offices, Storerooms</option>
          <option value='RentSOS'>For Rent: Shops, Offices, Storerooms</option>
        </select>
      )
      break
    case 'Clothes':
      subchoice = (
        <select onChange={(event) => setSubcategory(event.target.value)}>
          <option value='MenClothes'>Men Clothes</option>
          <option value='WomenClothes'>Women Clothes</option>
          <option value='MenShoes'>Men Shoes</option>
          <option value='WomenShoes'>Women Shoes</option>
          <option value='MenUnderwear'>Men Underwear</option>
          <option value='WomenUnderwear'>Women Underwear</option>
          <option value='MenAccessories'>Men Accessories</option>
          <option value='WomenAccessories'>Women Accessories</option>
          <option value='Hats'>Hats</option>
        </select>
      )
      break
    default:
      break
  }

  const onChangeFile = (event) => {
    setFileName(event.target.files)
  }

  const SubmissionHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('category', category)
    formData.append('subcategory', subcategory)
    for (let i = 0; i < fileName.length; i++) {
      formData.append('MultipleImages', fileName[i])
    }
    formData.append('owner', userId)
    console.log(token)
    await axios
      .post('/api/classified/generate', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))

    setTitle('')
    setDescription('')
    setCategory('None')
    setPrice(0)
    setFileName('')
  }

  return (
    <div class='searchbar'>
    
    <form onSubmit={SubmissionHandler} encType='multipart/form-data'>
      <br></br>
      <br></br>
      <br></br>
      <input
        placeholder='title'
        name='title'
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        type='text'
      />
      <input
        placeholder='description'
        name='description'
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        type='text'
      />
      <input
        placeholder='price'
        name='price'
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        type='number'
      />
      Category
      <select onChange={(event) => setCategory(event.target.value)}>
        <option value='None'>None</option>
        <option value='Tech'>Tech</option>
        <option value='Properties'>Properties</option>
        <option value='Clothes'>Clothes</option>
        <option value='Pets'>Pets</option>
        <option value='Services'>Services</option>
        <option value='Home'>Home</option>
        <option value='Sport/Hobby'>Sport/Hobby</option>
        <option value='Transport'>Transport</option>
      </select>
      Subcategory
      {subchoice}
      <br></br>
      Images
      <input
        type='file'
        multiple='multiple'
        filename='classifiedImage'
        onChange={onChangeFile}
      />

      <button class='btn btn-primary'type='submit'>submit</button>
    </form>
    </div>
  )
  }