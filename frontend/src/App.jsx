import Navbar from "./components/navbar.component";
import { BrowserRouter as Router ,Routes,Route} from "react-router-dom";
import { useState } from "react";
const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navbar />}>
                <Route path="signin" element={<h1>SignIn</h1>}/>
                <Route path="signup" element={<h1>SignUp</h1>}/>
            </Route>
            
        </Routes>
        
    )
}

export default App;