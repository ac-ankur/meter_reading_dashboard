import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import MyTask from "./home";
import VerifiedTask from "./verifiedtask";
import NavBar from "./navbar";
import { useAuth } from "../utils/userauth";
import { Home } from "@mui/icons-material";
import UserTask from "./usertask";
import PendingTask from "./pendingtask";

function MyRoutes() {
   const { user } = useAuth();
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="" element={<Login />} />
       {user?.roleid === 'Z' && (
          <Route path="/verifiedtask" element={<VerifiedTask />} />
        )}
          {user?.roleid === 'Z' && (
          <Route path="/home" element={<MyTask />} />
        )}
        {user?.roleid === 'A' && (
          <Route path="/reports" element={<UserTask />} />
        )}
         {user?.roleid === 'A' && (
         <Route path="/ocrpt" element={<PendingTask />} />
        )}
      </Routes>
    </Router>
  );
}

export default MyRoutes;
