import logo from './logo.svg';
import './App.css';
import MyTask from './components/home';
import NavBar from './components/navbar';
import Footer from './components/footer';
import MyRoutes from './components/routes';

function App() {
  return (<div>
   <NavBar/>
  <MyRoutes/>
   <Footer/>
   </div>
  );
}

export default App;
