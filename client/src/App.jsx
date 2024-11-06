// App.jsx
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Auth/Login/Login';
import Layout from './Layout';
import Register from './Pages/Auth/Register/Register';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Add more routes here as needed */}
      </Routes>
    </Layout>
  );
}

export default App;
