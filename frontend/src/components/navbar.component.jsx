import React from 'react'
import logo from '../imgs/logo.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const Navbar = () => {
    const [searchBoxVisibility,setSearchBoxVisibility]=useState(false);
  return (
    <nav className="navbar flex">
        <Link to="/" className="flex-none w-10">
            <img src={logo} className='w-full'/>
        </Link>
        <div className="absolute bg-white left-0 top-full w-full mt-0 border-b border-gray py-4 px-[5vw]
        md:inset-0 md:flex md:flex-1 md:relative md:border-none md:p-0 md:w-auto">
            <input 
                type="text"
                placeholder='Search'
                className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-gray-500 placeholder:font-light text-gray-700 font-light focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent md:pl-12"
            />
            <i className ="fi fi-br-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2"/>
            <div className="flex-grow flex items-center justify-end gap-4 ">
                <div className="relative inline-flex items-center ml-auto md:gap-6 right-1 ">
                    <Link to="/editor" className="hidden md:flex gap-2 link">
                        <i className="fi fi-rr-file-edit "/>
                        <p>Create</p>
                    </Link>
                </div>
                <Link className='btn-dark' to="/signup">Sign Up</Link>
                <Link className='btn-light' to="signin">Sign In</Link>
            </div>
        </div>
    </nav>
  )
}

export default Navbar