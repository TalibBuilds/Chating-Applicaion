// custom-hooks/currentUser.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import { setUser, setLoading } from '../redux/userSlice';

const useCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axiosInstance.get('/api/user/me');
        dispatch(setUser(res.data.user));
      } catch (err) {
        dispatch(setUser(null));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchUser();
  }, [dispatch]);
};

export default useCurrentUser;