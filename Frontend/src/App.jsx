import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
const RegisterUser = lazy(() => import('./pages/RegisterUser'));
const LoginUser = lazy(() => import('./pages/LoginUser'));
const Home = lazy(() => import('./pages/Home'));
const Profile = lazy(() => import('./pages/Profile'));
const Landing = lazy(() => import('./pages/Landing'));
import useCurrentUser from './custom-hooks/CurrentUser';
import { useSelector } from 'react-redux';
import UniversalLoader from './components/UniversalLoader';

const App = () => {
  useCurrentUser();
  const { user } = useSelector((state) => state.user);

  return (
    <Suspense fallback={<div className=' flex justify-center items-center h-screen '><UniversalLoader /></div>}>
      <div>
        <Routes>
          <Route path='/' element={!user ? <Landing /> : <Navigate to='/me' />} />
          <Route path='/login' element={!user ? <LoginUser /> : <Navigate to='/me' />} />
          <Route path='/register' element={!user ? <RegisterUser /> : <Navigate to='/complete-profile' />} />
          <Route path='/complete-profile' element={user ? <Profile /> : <Navigate to='/login' />} />
          <Route path='/me' element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path='/chatting/:userId' element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path='/profile' element={user ? <Profile /> : <Navigate to='/login' />} />
          <Route path='*' element={<Navigate to={user ? '/me' : '/'} />} />
        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
