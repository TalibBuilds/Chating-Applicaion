import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { IoArrowBack, IoSend, IoCamera, IoDocumentText, IoMic } from 'react-icons/io5'
import CompanyNameLoader from './CompanyNameLoader'

const ConversassionUI = () => {
    const navigate = useNavigate()
    const { selectedUser } = useSelector((state) => state.chat)
    const { user } = useSelector((state) => state.user) // current logged-in user

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [text, setText] = useState('')
    const [sending, setSending] = useState(false)

    const messagesEndRef = useRef(null)
    const imageInputRef = useRef(null)
    const documentInputRef = useRef(null)

    //** */ message fetching***

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser) return
            setLoading(true)
            try {
                const res = await axios.get(
                    `http://localhost:3000/api/message/${selectedUser._id}`,
                    { withCredentials: true }
                )
                setMessages(res.data.data)
            } catch (err) {
                console.error('Error fetching messages', err?.response?.data || err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchMessages()
    }, [selectedUser])

    // ***new message auto scroll bottom****
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Message send karna****
    const handleSend = async () => {
        if (!text.trim() || !selectedUser) return
        setSending(true)
        try {
            const res = await axios.post(
                `http://localhost:3000/api/message/send/${selectedUser._id}`,
                { text },
                { withCredentials: true }
            )
            setMessages((prev) => [...prev, res.data.data])
            setText('')
        } catch (err) {
            console.error('Error sending message', err?.response?.data || err.message)
        } finally {
            setSending(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleFileSelect = (file, type) => {
        if (!file) return
        console.log(`${type} selected:`, file)
        // TODO: upload file or attach to message
    }

    const handleDocumentChange = (e) => {
        handleFileSelect(e.target.files?.[0], 'document')
    }

    const handleImageChange = (e) => {
        handleFileSelect(e.target.files?.[0], 'image')
    }

    const handleVoiceClick = () => {
        console.log('Voice-to-text action triggered')
        // TODO: integrate speech recognition
    }

    //***// Agar koi user select nahi hua to *****
    // lekin only desktop
    if (!selectedUser) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <CompanyNameLoader />
            </div>
        )
    }

    return (
        <div className='w-full h-full flex flex-col min-h-0'>

            <div className='flex items-center gap-2 p-2 sm:p-3 border-b border-gray-200 bg-white flex-shrink-0'>
                <button
                    onClick={() => navigate('/')}
                    className='md:hidden text-xl text-gray-700 flex-shrink-0'
                >
                    <IoArrowBack />
                </button>
                <img
                    src={selectedUser.avtar || "/images/blanck-profile.jpg"}
                    alt={selectedUser.userName}
                    className='h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover flex-shrink-0'
                />
                <h1 className='font-medium text-gray-900 truncate'>{selectedUser.userName}</h1>
            </div>

            {/* Messages area */}
            <div className='flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 p-2 sm:p-3'>
                {loading ? (
                    <p className='text-center text-gray-400 text-sm'>Loading messages...</p>
                ) : messages.length === 0 ? (
                    <p className='text-center text-gray-400 text-sm'>No messages yet. Say hi!</p>
                ) : (
                    messages.map((msg) => {
                        const isMyMessage = msg.senderId === user._id
                        return (
                            <div
                                key={msg._id}
                                className={`flex gap-2 max-w-[85%] sm:max-w-[70%] px-3 py-2 rounded-2xl text-sm break-words ${isMyMessage
                                        ? 'text-white self-end jelly-btn2'
                                        : 'text-white jelly-btn self-start'
                                    }`}
                            >
                                <p className='min-w-0 break-words'>{msg.text}</p>
                                <span className='text-[10px] opacity-70 block text-right mt-1 flex-shrink-0'>
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        )
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input box */}
            <div className='flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 border-t border-gray-200 flex-shrink-0 flex-wrap sm:flex-nowrap'>

                <input
                    ref={documentInputRef}
                    type='file'
                    accept='.pdf,.doc,.docx,.txt'
                    onChange={handleDocumentChange}
                    className='hidden'
                />

                <input
                    ref={imageInputRef}
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='hidden'
                />

                <button
                    type='button'
                    onClick={() => documentInputRef.current?.click()}
                    className='h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition'
                    title='Attach document'
                >
                    <IoDocumentText />
                </button>

                <button
                    type='button'
                    onClick={() => imageInputRef.current?.click()}
                    className='h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition'
                    title='Upload photo'
                >
                    <IoCamera />
                </button>

                <input
                    type='text'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='Type a message...'
                    className='flex-1 min-w-0 rounded-full px-3 sm:px-4 py-2 bg-white outline-none text-sm'
                />



                <button
                    type='button'
                    onClick={handleVoiceClick}
                    className='h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition'
                    title='Voice to text'
                >
                    <IoMic />
                </button>

                <button
                    onClick={handleSend}
                    disabled={sending || !text.trim()}
                    className='h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 flex items-center justify-center rounded-full jelly-btn2 text-white'
                >
                    <IoSend />
                </button>
            </div>
        </div>
    )
}

export default ConversassionUI