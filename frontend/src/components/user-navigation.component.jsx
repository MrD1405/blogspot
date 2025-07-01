import AnimationWrapper from "../common/page-animation"
import {Link} from "react-router-dom"
import {useContext} from "react"
import {UserContext} from "../App"
import { removeFromSession } from "../common/session"
const UserNavigationPanel=()=>{
    const {userAuth:{username},setUserAuth}=useContext(UserContext);

    const SignOutUser=()=>{
        removeFromSession("user");
        setUserAuth({accessToken:null});
    }

    return(
        <>
            <AnimationWrapper
            transition={{duration:0.2}}
            className="absolute right-0 z-50"
            >
                <div className="bg-white absolute right-0 border border-grey w-60 duration-200">


                    <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
                        <i className="fi fi-rr-file-edit"/>
                        <p>Create</p>
                    </Link>
                    <Link to={`/user/${username}`} className="link pl-8 py-4">Profile</Link>
                    <Link to="/dashboard/blogs" className="link pl-8 py-4">DashBoard</Link>
                    <Link to="/settings" className="link pl-8 py-4">Settings</Link>
                    <span className="absolute border-t border-grey  w-[100%]"></span>
                    <button className="text-left hover:bg-grey w-full pl-8 py-4" onClick={SignOutUser}>
                        <h1 className="font-bolf text-l mg-1">Sign-Out</h1>
                        <p className="text-dark-grey">@{username}</p>
                    </button>
                </div>
            </AnimationWrapper>

        </>
    )
}
export default UserNavigationPanel;