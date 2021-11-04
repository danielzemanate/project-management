// import logo from './logo.svg';
import 'styles/styles.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from 'pages/Home';
import Users from 'pages/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/users" element={<Users />}/>
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <div className='bg-indigo-500'>
    //     <p>HOLA MUNDO</p>
    //   </div>
    // </div>
  );
}

export default App;
