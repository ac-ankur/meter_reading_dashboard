import { BrowserRouter as Router,Routes,Route, } from "react-router-dom";
import Login from "./login";
import MyTask from "./home";
function MyRoutes(){
    return(
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/home" element={<MyTask/>}/>
            </Routes>
        </Router>
    )
}

export default MyRoutes