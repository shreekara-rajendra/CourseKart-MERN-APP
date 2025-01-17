import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import {BookBookmark} from 'phosphor-react'
import { useAuthContext } from '../../context/auth'
import  {toast} from 'react-hot-toast'
import { useCart } from '../../context/cart'
import {Badge} from "antd"
import SearchInput from '../Form/SearchInput'


const Header = () => {
  const [auth,setAuth]=useAuthContext()
  const [cart] = useCart()

  //handelling Logout Action
  //auth may contain other items othe rthan user and token
  const handleLogout = ()=>{
    setAuth({
      ...auth,
      user:null,
      token:""
    })

    localStorage.removeItem('auth')
    toast.success('User Logged Out Successfully')
  }

  return (
    <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to='/' className="navbar-brand" href="#">
        <BookBookmark size={32} /> CourseKart
      </Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <SearchInput/>
        <li className="nav-item">
          <NavLink to='/' className="nav-link" aria-current="page" href="#">Home</NavLink>
        </li>

        

        {!auth.user?(<><li className="nav-item">
          <NavLink to='/register' className="nav-link" href="#">SignUp</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/login' className="nav-link" href="#">Login</NavLink>
        </li></>):(<>
          <li className="nav-item dropdown">

          <NavLink href="#" className="nav-link dropdown-toggle"        data-bs-toggle="dropdown" aria-expanded="false">
            {auth?.user?.name}
          </NavLink>

          <ul className="dropdown-menu">

            <li><NavLink to={`/dashboard/${auth?.user?.role===1?'admin':'user'} `} className="dropdown-item">DashBoard</NavLink></li>

            <li><NavLink onClick={handleLogout} to='/login' className="dropdown-item" href="#">Logout</NavLink></li>

          </ul>
        </li></>)}
        <li className="nav-item">
        <Badge count={cart?.length} showZero>
          <NavLink to='/cart' className="nav-link" href="#">Cart </NavLink>
        </Badge>
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>

    </>
  )
}

export default Header