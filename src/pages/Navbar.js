import React, {useContext, useState, useEffect} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import axios from 'axios'
import "./navbar.css"

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const [search, setSearch] = useState("")
  const users = auth.users

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  
useEffect(() => {
auth.getUsers()
console.log("Users: ", users)
}, []);

  const handleChange = (event) => {
    setSearch(event.target.value)
  }
  const delSearch = () => {
    setSearch("")
  }
  const redirect = async (id, name) => {
    await auth.setMyUser(id)
    await auth.setName(name)
    history.push('/trader')
    setSearch('')
    
  }

  const userFilter = Object.values(users).filter(user =>
    user.email.includes(search)
  )

  return (
   <div>
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <div><span className="brand-logo">Crypto Organizer</span></div>
           
    <nav className="blue darken-1 search">
    <div className="nav-wrapper blue darken-1">
      <form>
        <div class="input-field">
          <input onChange={handleChange} value={search} id="search" type="search" required />
          <label class="label-icon" for="search"><i className="icon material-icons">search</i></label>
          <i onClick={delSearch} className="icon material-icons">close</i>
        </div>
        {search.length > 1 ? (userFilter.slice(0, 3).map(info => (
                    <div  className="display">
                      <ul>
                       <span onClick={() => redirect(info._id, info.name)} value={info._id} className="role li">{info.email}</span>
                      </ul>
                    </div>
                ))) : (null) }
      </form>
    </div>
  </nav>

        <ul id="nav-mobile" className="menu hide-on-med-and-down">
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/Info">Info</NavLink></li>
          <li><NavLink to="/trading/:id">Trading</NavLink></li>
          <li><NavLink to="/profile"><i class="material-icons">account_circle</i></NavLink></li>
          <li><a href="/" onClick={logoutHandler}>LogOut</a></li>
        </ul>
      </div>
    </nav>
    </div>
  )
}
