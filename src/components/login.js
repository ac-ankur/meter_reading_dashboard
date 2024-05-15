import React, { useState } from "react";
// import "../style/login.css";
import '../assets/css/login.css'
// import { apiLogin } from "../api/Api.login";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import NavBarLogin from "./navbarlogin";
import { Helmet } from "react-helmet";
import { useAuth } from "../utils/userauth";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [error,setError]=useState(null)
  const { login } = useAuth();
  const [severity, setSeverity] = useState("success")

  const navigate=useNavigate()
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSeverity(severity); 
    setOpenSnackbar(true);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://api.consultit.world/metcap/logIn", {
        email: username,
        password: password,
        loginfrom: 'W',
        fcmtoken: 'asfasfasf'
      });
  
      console.log("response", response.data);
  
      if (response.data.statuscode === 1) {
        const userData = {
          token: response.data.token,
          roleid: response.data.roleid,
          customer_id: response.data.customer_id
        };
  
        // Save user data to local storage or state
        localStorage.setItem('token', userData.token);
  
        // Use the 'login' function from useAuth to set authenticated user
        login(userData);
  
        // Redirect to '/home' after successful login
        if (userData.roleid === 'A') {
          navigate('/reports');
        } else if (userData.roleid === 'Z') {
          navigate('/home');
        } else {
          
        }
      } else {
        handleSnackbarOpen("Invalid credentials. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      handleSnackbarOpen("Error logging in. Please try again.", "error");
    }
  };

  return (
    <div>
       <Helmet>
          <title>Admin Dashboard</title>
        </Helmet><NavBarLogin/>
    <div className="form-bg">
      <div className="container" style={{marginTop:'90px',marginBottom:'70px'}}>
        <div className="row">
          <div className="col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6">
            <div className="form-container">
              <div className="right-content">
                <h3 className="form-title">Login</h3>
                <form className="form-horizontal" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={handleUsernameChange}
                      placeholder="Enter Username"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Enter your password"
                    />
                  </div>
                  {/* <div className="remember-me">
                    <input type="checkbox" className="checkbox" />
                    <span className="check-label">Remember Me</span>
                  </div> */}
                  <a href="" className="forgot">
                    Forgot Password
                  </a>
                  <button type="submit" className="btn signin signinpointer">
                    Login
                  </button>
                  
                </form>
               
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
  open={openSnackbar}
  autoHideDuration={6000}
  className="snackbar-right"
  onClose={() => setOpenSnackbar(false)}
>
  <MuiAlert
    onClose={() => setOpenSnackbar(false)}
    severity={severity} 
    sx={{ width: '100%' }}
  >
    {snackbarMessage}
  </MuiAlert>
</Snackbar>
    </div>
    </div>
  );
}