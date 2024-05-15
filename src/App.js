import "./App.css";
import Footer from "./components/footer";
import MyRoutes from "./components/routes";
import { AuthProvider } from "./utils/userauth";

function App() {
  return (
    <div>
      <AuthProvider>
        <MyRoutes />
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
