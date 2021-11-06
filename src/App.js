// import logo from './logo.svg';
import 'styles/styles.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Users from 'pages/Users';
import PublicLayout from 'layouts/PublicLayout';
import  NotFoundPage  from 'pages/NotFoundPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <PublicLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PublicLayout>
      </BrowserRouter>
    </div>

  );
}

export default App;
