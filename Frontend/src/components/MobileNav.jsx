import React, { useState, useRef, useEffect } from 'react'
import { CiMenuFries } from "react-icons/ci";
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../redux/userSlice';
import { setSearchResult, setSearchLoading, setSearchError, clearSearch } from '../redux/searchSlice';
import debounce from 'lodash/debounce';
import toast from 'react-hot-toast';

const MobileNav = () => {
    const { user } = useSelector((state) => state.user);
    const avtar = user.avtar
    const name = user.userName

    const [menu, setMenu] = useState(false)
    const [logout, setLogout] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Asli search function — ye backend ko call karta hai
    const searchUser = async (identifier) => {
        if (!identifier.trim()) {
            dispatch(clearSearch());
            return;
        }
        dispatch(setSearchLoading(true));
        try {
            const res = await axiosInstance.post(
                '/api/user/finduser',
                { identifier }
            );
            dispatch(setSearchResult(res.data.user));
        } catch (err) {
            dispatch(setSearchError(err.response?.data?.message || 'User not found'));
        } finally {
            dispatch(setSearchLoading(false));
        }
    };

    const debouncedSearch = useRef(debounce(searchUser, 500)).current;

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const HandleSerchUser = (e) => {
        const value = e.target.value;
        debouncedSearch(value);
    }

    const HandleLogout = async () => {
        try {
            await axiosInstance.get('/api/user/logout');
        } catch (err) {
            console.error('Logout error', err?.response?.data || err.message);
        } finally {
            dispatch(removeUser());
            setMenu(false);
            navigate('/login');
            toast.success('Logout Successfylly')
        }
    }

    return (
        <div className='bg-[#344E41]  md:py-5 md:px-6
          flex flex-col md:gap-4 gap-1 py-1 px-2 w-full z-99 sticky top-0 left-0'>
            <div className='flex items-center justify-between px-1'>
                <div className='flex items-center justify-center gap-2'>
                    <img src={avtar ? avtar : "/images/profileimage.png"} alt="avtar" className='h-10 w-10 rounded-full object-cover' />
                    <h1 className='font-medium text-[#DAD7CD] md:text-xl'>{name}</h1>
                </div>
                <div onClick={() => { setMenu(prev => !prev) }} className='font-bold p-3 text-[#dad7cd] '>
                    <CiMenuFries size={22} />
                </div>
                {logout && (
                    <div className='absolute top-50 right-30 z-122 p-3 shadow-md rounded'>
                        <p className='mb-2'>Are you sure you want to logout?</p>
                        <div className='flex gap-2'>
                            <button onClick={HandleLogout} className='px-3 py-1 bg-red-500 text-white rounded'>Yes</button>
                            <button onClick={() => setLogout(false)} className='px-3 py-1 bg-gray-200 rounded'>No</button>
                        </div>
                    </div>
                )}

                {
                    menu &&
                    <div className='absolute min-h-[90vh] z-99 h-full w-[30%] top-0 right-0 pt-5 pr-3 bg-[#344E41] text-[#DAD7CD] '>
                        <ul className='flex flex-col items-end gap-4.5 text-[12px]'>
                            <li onClick={() => { setMenu(prev => !prev) }} className='bg-white font-bold rounded-4xl text-black p-2'>CLOSE</li>
                            <Link to={'/'}><li className='font-medium '>Edit Profile</li></Link>
                            <Link to={'/invite'}><li className='font-medium '>Invite</li></Link>
                            <li onClick={() => setLogout(true)} className='font-medium cursor-pointer'>Logout</li>
                            <Link to={'/share'}><li className='font-medium '>Share Id</li></Link>
                        </ul>
                    </div>
                }
            </div>
            <div className='flex items-center justify-center border-2 border-white rounded-4xl'>
                <input onChange={HandleSerchUser} type="text" placeholder='Search' className='w-full glass-effect  rounded-4xl px-3 py-1  text-[#DAD7CD]  outline-none ' />
            </div>
        </div>
    )
}

export default MobileNav