import axios from 'axios'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './MainPage.css'

export const MainPage = () => {
  const [classifieds, setClassifieds] = useState([])
  const [searchItem, setSearchItem] = useState('')
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(999999999)
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [sort, setSort] = useState('-date')
  const [currentPage, setCurrentPage] = useState(1)
  const [classifiedsPerPage, setClassifiedsPerPage] = useState(5)
  const { userId } = useContext(AuthContext)

  var subchoice = (
    <select onChange={(event) => setSubcategory(event.target.value)}>
      <option value='None'>None</option>{' '}
    </select>
  )
  switch (category) {
    case 'Tech':
      subchoice = (
        <select onChange={(event) => setSubcategory(event.target.value)}>
          <option value='None'>None</option>
          <option value='Phones'>Phones</option>
          <option value='TV'>TV</option>
          <option value='Laptop'>Laptop</option>
        </select>
      )
      break
    case 'Properties':
      subchoice = (
        <select onChange={(event) => setSubcategory(event.target.value)}>
          <option value='None'>None</option>
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
          <option value='None'>None</option>
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

  const fetchClassifieds = useCallback(async () => {
    try {
      const fetched = await axios.get(`api/classified/?sort=${sort}&page=${currentPage}`)
      setClassifieds(fetched.data)
    } catch (e) {}
  }, [sort, currentPage])
  
  const saveClassified = async classId => {
    console.log(classId)
    try {
      await axios.put(`api/user/${classId}/${userId}`)
    } catch (e) {}
  } 

  useEffect(() => {
    fetchClassifieds()
  }, [fetchClassifieds])


  const pageNumbers = []
  for (
    let i = 1;
    i <= Math.ceil(classifieds.length / classifiedsPerPage);
    i++
  ) {
    pageNumbers.push(i)
  }
  return (
    <div>
      <div id="demo" class="carousel slide" data-ride="carousel">
  <ul class="carousel-indicators">
    <li data-target="#demo" data-slide-to="0" class="active"></li>
    <li data-target="#demo" data-slide-to="1"></li>
    <li data-target="#demo" data-slide-to="2"></li>
  </ul>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://motive.kz/wp-content/uploads/2015/10/contextual-advertising-astana.jpg" alt="Los Angeles" width="1100" height="500"/>
      <div class="carousel-caption">
        <h3>Post your classifieds</h3>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://o-es.ru/wp-content/uploads/2018/09/target.jpg" alt="Chicago" width="1100" height="500"/>
      <div class="carousel-caption">
      <h3 style={{color: 'yellow'}} >View other's classifieds</h3>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://alladvertising.ru/porridge/146/h_3a630b4ea6fd1c9d96fabdb6fb2721f1" alt="New York" width="1100" height="500"/>
      <div class="carousel-caption">
      </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#demo" data-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </a>
  <a class="carousel-control-next" href="#demo" data-slide="next">
    <span class="carousel-control-next-icon"></span>
  </a>
</div>
      <div className='searchbar'>
    <div class="categories">
    <h6>Category</h6>
      <span class="rounded-circle"><a href="#"><img src="https://st2.depositphotos.com/4397063/10602/v/450/depositphotos_106027450-stock-illustration-paint-brush-and-roller.jpg" class="rounded-circle img-fluid" alt="Услуги"/></a></span>
      <span class="rounded-circle"><a href="#"><img src="https://www.iconninja.com/files/723/852/1010/mac-imac-desktop-screen-computer-icon.svg" class="rounded-circle img-fluid" alt="Услуги"/></a></span>
      <span class="rounded-circle"><a href="#"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREQA__l2abtp7WwYFmp7jKSglSYiln_KsAAxOsSXDR2F4XxO7opjSTYcSmFE2hTqpg_w8&amp;usqp=CAU" class="rounded-circle img-fluid" alt="Услуги"/></a></span>
      <span class="rounded-circle"><a href="#"><img src="https://image.freepik.com/free-vector/suitcase-portfolio-document-business-shadow_18591-14809.jpg" class="rounded-circle img-fluid" alt="Услуги"/></a></span>
      <span class="rounded-circle"><a href="#"><img src="https://image.flaticon.com/icons/png/512/1856/1856030.png" class="rounded-circle img-fluid" alt="Услуги"/></a></span>
      <span class="rounded-circle"><a href="#"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdACt6JONjOzXem4mf6WerKEwiKAQhM1MVdw&amp;usqp=CAU" class="rounded-circle img-fluid" alt="Услуги"/></a></span>
      <span class="rounded-circle"><a href="#"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxAHAUPvO1vVMiuAKgnWBjr1Oz5qLwpMgRCg&amp;usqp=CAU" class="rounded-circle img-fluid" alt="Услуги"/></a></span>
      <br></br>
      <span class="rounded-circle cc"><a href="#"><img src="https://icon-library.com/images/laundry-icon/laundry-icon-3.jpg" class="rounded-circle img-fluid" alt="Услуги"/></a></span>
      <span class="rounded-circle cc"><a href="#"><img src="https://png.pngtree.com/png-vector/20191027/ourmid/pngtree-basketball-ball-vector-sport-game-fitness-symbol-illustration-png-image_1880316.jpg" class="rounded-circle img-fluid" alt="Услуги"/></a></span>
      <span class="rounded-circle cc"><a href="#"><img src="https://icons-for-free.com/iconfiles/png/512/food+icon-1320184414775447246.png" class="rounded-circle img-fluid" alt="Услуги" /></a></span>
      <span class="rounded-circle cc"><a href="#"><img src="https://image.freepik.com/free-vector/piano-guitar-music-cartoon-illustration_123553-290.jpg" class="rounded-circle img-fluid" alt="Услуги"/></a></span>
      <span class="rounded-circle cc"><a href="#"><img src="https://cdn3.iconfinder.com/data/icons/badger-s-christmas/300/toy-train-512.png" class="rounded-circle img-fluid" alt="Услуги"/></a></span>
      </div>
      
      <div style={{backgroundColor:'#5CE1FE', height: '300px', minHeight:'300px'}} class="container shadow-sm cc">
      <label>Search</label>
      <input
        type='text'
        onChange={(event) => setSearchItem(event.target.value)}
      />
      <div className='priceRange'></div>
      <label className='priceInput'>Price-min</label>
      <input className='priceInput'
        type='number'
        onChange={(event) => setPriceMin(event.target.value)}
      />
      <label className='priceInput'>Price-max</label>
      <input
      className='priceInput'
        type='number'
        onChange={(event) => setPriceMax(event.target.value)}
      />
      <label>Category</label>
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
      {subchoice}
      <span>Sort By: </span>
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value='-date'>Newest</option>
        <option value='oldest'>Oldest</option>
        <option value='-price'>Price: Hight-Low</option>
        <option value='price'>Price: Low-Hight</option>
      </select>
      </div>
      <br></br>
      <div className='pageee'>

      </div>
      <br></br>
      <div style={{backgroundColor:'#D5F5FC'}} class="container shadow-sm obvl" >
  <ul class="pagination-sm pagination">
  <li class="page-item"><a class="page-link" onClick={() => setCurrentPage(currentPage-1)}>Previous</a></li>
    {pageNumbers.map(number => {
      <li class="page-item"><a class="page-link"  onClick={() => setCurrentPage(number)}>{number}</a></li>
    })}
    <li class="page-item"><a class="page-link" onClick={() => setCurrentPage(currentPage+1)}>Next</a></li>
  </ul>

      {classifieds
        .filter((classifieds) => {
          return classifieds.price >= priceMin
        })
        .filter((classifieds) => {
          if (priceMax == '') {
            return setPriceMax(99999999)
          } else {
            return classifieds.price <= priceMax
          }
        })
        .filter((classifieds) => {
          if (category == 'None' || category == '') {
            return classifieds
          } else {
            return classifieds.category == category
          }
        })
        .filter((classifieds) => {
          if (subcategory == 'None' || subcategory == '') {
            return classifieds
          } else {
            return classifieds.subcategory == subcategory
          }
        })
        .filter((classifieds) => {
          if (searchItem == '') {
            return classifieds
          } else if (
            classifieds.title.toLowerCase().includes(searchItem.toLowerCase())
          ) {
            return classifieds
          }
        })
        .map((classified, key) => (
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
            <button className='btn btn-outline-info'>
            <Link  to={`/detail/${classified._id}`}>Details</Link>
            </button>
            <button className='btn btn-outline-primary' onClick={() => saveClassified(classified._id)}>Save</button>
            </div>
            
          </div>
          <hr style={{ borderColor:'red'}}></hr>
        
          </div>
        ))}
    </div>
    </div>
    </div>
  )
}
