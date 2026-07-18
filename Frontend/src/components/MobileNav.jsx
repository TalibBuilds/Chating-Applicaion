import React, { useState, useRef, useEffect } from 'react'
import { CiMenuFries } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
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
        <div className='bg-[#344E41] px-4 py-4 md:px-6 md:py-3 flex flex-col gap-3 md:gap-2 w-full z-50 sticky top-0 left-0'>
            <div className='flex items-center justify-between px-1 py-2 md:py-3'>
                <div className='flex items-center gap-3'>
                    <img
                        src={avtar ? avtar : "/images/profileimage.png"}
                        alt="avtar"
                        className='h-15 w-15 md:h-10 md:w-10 rounded-full object-cover'
                    />
                    <h1 className='font-medium text-[#DAD7CD] text-2xl md:text-xl'>{name}</h1>
                </div>

                <div
                    onClick={() => setMenu(prev => !prev)}
                    className='cursor-pointer p-2 text-3xl md:text-xl text-[#dad7cd]'
                >
                    <CiMenuFries />
                </div>

                {logout && menu && (
                    <div className='absolute top-14 right-4 z-[60] bg-white p-3 shadow-md rounded-lg'>
                        <p className='mb-2 text-sm'>Are you sure you want to logout?</p>
                        <div className='flex gap-2'>
                            <button onClick={HandleLogout} className='px-3 py-1 text-sm bg-red-500 text-white rounded'>Yes</button>
                            <button onClick={() => setLogout(false)} className='px-3 py-1 text-sm bg-gray-200 rounded'>No</button>
                        </div>
                    </div>
                )}

                {menu && (
                    <div className='absolute min-h-screen h-full w-full top-0 right-0 pt-14 pr-4 bg-[#344E41] text-[#DAD7CD] z-50'>
                        <ul className='flex flex-col items-end gap-6 md:gap-4 text-xl md:text-base'>
                            <li onClick={() => setMenu(prev => !prev)} className='bg-white font-bold rounded-full text-black p-2 cursor-pointer'>
                                <IoCloseSharp />
                            </li>
                            <Link to={'/complete-profile'}><li className='font-medium'>Edit Profile</li></Link>
                            <Link to={'/invite'}><li className='font-medium'>Invite</li></Link>
                            <li onClick={() => setLogout(true)} className='font-medium cursor-pointer'>Logout</li>
                            <Link to={'/share'}><li className='font-medium'>Share Id</li></Link>
                        </ul>
                    </div>
                )}
            </div>

            <div className='flex items-center justify-center border-2 border-white rounded-full'>
                <input
                    onChange={HandleSerchUser}
                    type="text"
                    placeholder='Search'
                    className='w-full glass-effect rounded-full text-2xl px-4 py-2 md:py-1.5 md:text-sm  text-[#DAD7CD] outline-none'
                />
            </div>
        </div>
    )
}

export default MobileNav