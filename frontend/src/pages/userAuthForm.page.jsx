import React from 'react'
import { useRef ,useContext} from 'react'
import InputBox from '../components/input.component'
import { Link } from 'react-router-dom'
import AnimationWrapper from '../common/page-animation.jsx'
import {Toaster,toast} from 'react-hot-toast'
import axios from 'axios'
import { storeInSession } from '../common/session.jsx'
import { UserContext } from '../App.jsx' 
import { Navigate } from 'react-router-dom'

const UserAuthForm = ({type}) => {
    const authForm=useRef();
    let {userAuth,setUserAuth}=useContext(UserContext);
    
    
    
    let {accessToken}=userAuth;

    
    let serverRoute=type==="signin"?"/signin":"/signup";
    const userAuthThroughServer=async(serverRoute,formData)=>{
        axios.post(import.meta.env.VITE_SERVER_DOMAIN+serverRoute,formData)
        .then(({data})=>{//destructuring data from response
            storeInSession("user",JSON.stringify(data));
            setUserAuth(data);
        })
        .catch(({response})=>{
            toast.error(response.data.error ||"Something went wrong");
            
        });
    }


    const handleSubmit=(e)=>{
        e.preventDefault();
        let form=new FormData(authForm.current);
        let formData={};
        for(let [key,value] of form.entries()){
            formData[key]=value;
            console.log(key,value);
        }
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
        let {fullName,email,password}=formData;

        //validating user info
        if(fullName && fullName.length && fullName.trim().length){
            if(fullName.length<3){
                return toast.error("Full Name must be atleast 3 characters long");
            }
        }
        if(!email.length){
            return toast.error("Email is required");
        }
        if(!emailRegex.test(email)){
            return toast.error("Invalid Email Format");
        }
        if(!passwordRegex.test(password)){
            return toast.error("Password must be 6-20 characters long, contain at least one numeric digit, one uppercase and one lowercase letter");
        }

        userAuthThroughServer(serverRoute,formData);

    }
  return (
        accessToken?
            <Navigate to="/"/>
        :
            <>
                <AnimationWrapper key={type}>
                    <section className="h-cover flex items-center justify-center">
                        <Toaster />
                        <form className="w-[80%] max-w-[400px] " ref={authForm}>
                            <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
                                { type ==="signin"? "Welcome Back!":"Create An Account"}
                            </h1>
                            
                            {
                                type==="signup"?
                                <InputBox name="fullName" type="text" id="fullName" 
                                placeholder="Enter Your Full Name" icon="fi-rr-user" />
                                :""
                            }
                            <InputBox name="email" type="email" id="email" 
                                placeholder="Enter Your Email" icon="fi-rr-envelope" />
                            <InputBox name="password" type="password" id="password" placeholder="Password"icon="fi-rr-key"/>
                            <button className="btn-dark center mt-14" type="submit" onClick={handleSubmit}>
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