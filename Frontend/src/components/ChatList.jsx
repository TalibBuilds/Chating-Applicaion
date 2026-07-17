import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'
import { setSelectedUser } from '../redux/chatSlice'

const ChatList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { searchResult, searchLoading, searchError } = useSelector((state) => state.search);

    const [conversations, setConversations] = useState([]);
    const [conversationsLoading, setConversationsLoading] = useState(true);

    // Component mount hote hi conversations fetch karo
    useEffect(() => {
        const fetchConversations = async () => {
            setConversationsLoading(true);
            try {
                const res = await axiosInstance.get(
                    '/api/message/conversations'
                );
                setConversations(res.data.data);
            } catch (err) {
                console.error('Error fetching conversations', err?.response?.data || err.message);
            } finally {
                setConversationsLoading(false);
            }
        };
        fetchConversations();
    }, []);

    const handleUserClick = (user) => {
        dispatch(setSelectedUser(user));
        navigate(`/chatting/${user._id}`);
    }

    return (
        <div className='w-full min-h-[80vh] md:h-[90vh] md:min-h-0 '>
            <div className='w-full h-full scrollbar-none overflow-y-auto py-3 flex flex-col gap-2'>

                {/* 1. Search Loading state */}
                {searchLoading && (
                    <div className='w-full flex items-center justify-center py-4'>
                        <p className='text-black font-medium'>Finding user...</p>
                    </div>
                )}

                {/* 2. Search Error state — user nahi mila */}
                {!searchLoading && searchError && (
                    <div className='w-full flex items-center justify-center py-4'>
                        <p className='text-black font-bold'>{searchError}</p>
                    </div>
                )}

                {/* 3. Search result mila */}
                {!searchLoading && searchResult && (
                    <div
                        onClick={() => handleUserClick(searchResult)}
                        className='w-full glass-effect py-2.5 px-1 flex items-center justify-between gap-2  cursor-pointer'
                    >
                        <div className='flex items-center gap-3 md:gap-4'>
                            <img
                                src={searchResult.avtar || "/images/blanck-profile.jpg"}
                                alt={searchResult.userName}
                                className='h-15 w-15 md:h-10 md:w-10 rounded-full object-cover'
                            />
                            <h1 className='text-xl md:text-md text-[#cac7cd] font-medium truncate'>{searchResult.userName}</h1>
                        </div>
                    </div>
                )}

                {/* 4. Koi search active nahi — real conversations list dikhao */}
                {!searchLoading && !searchResult && !searchError && (
                    <>
                        {conversationsLoading ? (
                            <p className='text-center text-gray-400 text-sm py-4'>Loading chats...</p>
                        ) : conversations.length === 0 ? (
                            <div className='w-full flex items-center justify-center py-10'>
                                <p className='text-gray-500 text-sm text-center px-4'>
                                    No conversations yet. Search a user to start chatting.
                                </p>
                            </div>
                        ) : (
                            conversations.map((conv) => (
                                <div
                                    key={conv.user._id}
                                    onClick={() => handleUserClick(conv.user)}
                                    className='w-full glass-effect py-2.5 px-1 flex items-center justify-between gap-2 cursor-pointer'
                                >
                                    <div className='flex items-center gap-3 md;gap-2'>
                                        <img
                                            src={conv.user.avtar || "/images/blanck-profile.jpg"}
                                            alt={conv.user.userName}
                                            className='h-15 w-15 md:h-10 md:w-10 rounded-full object-cover'
                                        />
                                        <h1 className='text-xl md:text-xs text-white font-medium truncate'>{conv.user.userName}</h1>
                                    </div>
                                    <div className='pr-2'>
                                        <h1 className='text-[10px] truncate max-w-[120px]'>{conv.lastMessage?.text}</h1>
                                        <p className='text-[10px] text-blue-800 text-right'>
                                            {new Date(conv.lastMessage?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default ChatList