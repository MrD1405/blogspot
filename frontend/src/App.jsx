import Navbar from "./components/navbar.component";
import { BrowserRouter as Router ,Routes,Route} from "react-router-dom";
import { createContext, useState ,useEffect} from "react";
import UserAuthForm from "./pages/userAuthForm.page";
import { lookInSession } from "./common/session";



export const UserContext=createContext({});
const App = () => {

    const [userAuth,setUserAuth]=useState(()=>{
        let userInSession=lookInSession("user");
        return userInSession ? (JSON.parse(userInSession)):{};
    });
    // useEffect(()=>{
    //     let userInSession=lookInSession("user");
    //     userInSession?setUserAuth(JSON.parse(userInSession)):setUserAuth({access_token: null});
    // },[])

    return (
        <UserContext.Provider value={{userAuth,setUserAuth}}>
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route path="signin" element={<UserAuthForm type="signin" />}/>
                    <Route path="signup" element={<UserAuthForm type="signup" />}/>
                </Route>
                
            </Routes>
        </UserContext.Provider>
        
    )
}

export default App;