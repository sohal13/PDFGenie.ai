// App.jsx
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Auth/Login/Login';
import Layout from './Layout';
import Register from './Pages/Auth/Register/Register';
import useUserStore from './store/useUserStore';
import { useEffect } from 'react';
import GoogleCallback from './Pages/Auth/Login/GoogleCallback';
import Home from './Pages/Home/Home';

function App() {
  const { setUser } = useUserStore();

  // Check for user in localStorage on component mount (if using JWT)
  useEffect(() => {
    const userData = localStorage.getItem('pdfgenieai_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [setUser]);

  return (
    <Layout>
      <Routes>
      <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* Route to handle Google Login Callback */}
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Layout>
  );
}

export default App;
