import React, {useState, useCallback, useEffect} from 'react'
import axios from 'axios'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { CreatePage } from './pages/CreatePage'
import { LoginPage } from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import UpdateCon from './pages/UpdateCon'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth.hook'
import Navbar from './components/Navbar'
import './App.css'
import { ClassifiedPage } from './pages/ClassifiedPage'

function App() {
  const { login, logout, token, userId, ready } = useAuth()
  const isAuthenticated = !!token


  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, isAuthenticated }}
    >
      <div className='App'>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path='/main'>
              <MainPage />
            </Route>
            <Route path='/login'>
              <LoginPage />
            </Route>
            <Route path='/register'>
              <RegisterPage />
            </Route>
            <Route path='/create'>
              <CreatePage />
            </Route>
            <Route path='/profile'>
              <ProfilePage />
            </Route>
            <Route path='/detail/:id'>
              <ClassifiedPage />
            </Route>
            <Route path='/update'>
              <UpdateCon />
            </Route>

            <Redirect to='/main' />
          </Switch>
       
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  )
}

export default App
