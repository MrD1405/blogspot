import React from 'react'
import logo from '../imgs/logo.png'
import { Link ,Outlet} from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../App'
import UserNavigationPanel from './user-navigation.component'
const Navbar = () => {
    const [searchBoxVisibility,setSearchBoxVisibility]=useState(false);
    const [userNavPanel,setUserNavPanel]=useState(false);
    const {userAuth,userAuth:{accessToken,profile_img}}=useContext(UserContext);

    const handleNavPanelBlur=(e)=>{
        setTimeout(()=>{
            setUserNavPanel(false);
        },200);
    }
  return (

    <>
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
                {
                    accessToken?
                    <>
                        <Link to="/dashboard/notification">
                            <button className="w-12 h-12 flex rounded-full  bg-grey relative hover:bg-black/10">
                            <i className="fi fi-rr-bell  relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3  text-2xl text-gray-500"/>
                            </button>
                        </Link>
                        <div className="relative" onClick={()=>{
                            setUserNavPanel(!userNavPanel);
                        }}
                        onBlur={handleNavPanelBlur}
                        >
                            <button className="w-12 h-12 mt-1" >
                                <img src={profile_img}
                                 className="w-full h-full object-cover rounded-full"
                                />
                            </button>
                           {userNavPanel?<UserNavigationPanel />:""} 
                        </div>
                        
                    </>
                    :
                    <>
                        <Link className='btn-dark' to="/signup">Sign Up</Link>
                        <Link className='btn-light' to="signin">Sign In</Link>
                    </>

                
    }
            </div>
        </div>
    </nav>
    <Outlet />
    </>
  )
}

export default Navbar