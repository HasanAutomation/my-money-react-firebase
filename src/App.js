import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import GuestRoute from './components/routes/GuestRoute';
import PrivateRoute from './components/routes/PrivateRoute';
import { useAuth } from './context/AuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Test from './pages/Test';

function App() {
  const { authIsReady } = useAuth();

  if (!authIsReady) return <div className='loading'>Loading....</div>;

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path='/login'
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />
        <Route
          path='/test/:id'
          element={
            <PrivateRoute>
              <Test />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
