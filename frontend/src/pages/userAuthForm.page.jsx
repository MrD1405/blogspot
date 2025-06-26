import React from 'react'
import InputBox from '../components/input.component'
import { Link } from 'react-router-dom'
import AnimationWrapper from '../common/page-animation.jsx'
const UserAuthForm = ({type}) => {
    console.log(type)
  return (
    <>
        <AnimationWrapper key={type}>
            <section className="h-cover flex items-center justify-center">
                <form className="w-[80%] max-w-[400px]">
                    <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
                        { type ==="signin"? "Welcome Back!":"Create An Account"}
                    </h1>
                    
                    {
                        type==="signup"?
                        <InputBox name="FullName" type="text" id="fullName" 
                        placeholder="Enter Your Full Name" icon="fi-rr-user" />
                        :""
                    }
                    <InputBox name="Email" type="email" id="email" 
                        placeholder="Enter Your Email" icon="fi-rr-envelope" />
                    <InputBox name="Password" type="password" id="password" placeholder="Password"icon="fi-rr-key"/>
                    <button className="btn-dark center mt-14" type="submit">
                        {type}
                    </button>
                    <div className="w-full flex items-center mt-10 opacity-15 uppercase px-1">
                        <hr className='w-1/2 border-black'/>
                        <p>OR</p>
                        <hr className='w-1/2 border-black'/>
                    </div>
                    <button className="btn-dark flex items-center justify-center my-10 w-[90%] center" >Continue with Google</button>

                    {
                        type==="signin"?
                        <p className="text-center ">Don't have an account? 
                            <Link className="mx-1 underline"to="/signup">
                            Sign Up
                            </Link>
                        </p>
                        :
                        <p className="text-center text-sm">Already have an account? 
                            <Link className="mx-1 underline" to="/signin">
                            Sign In
                            </Link>
                        </p>
                        
                    }
                </form>

            </section>
        </AnimationWrapper>
    
    </>  
    
    
  )
}

export default UserAuthForm