# 💬 ChatApp — Real-Time Chatting Web Application

A full-stack MERN chatting application with user authentication, profile management, user search, and one-on-one messaging — built with a responsive, mobile-first UI inspired by WhatsApp Web's layout.

---

## 🚀 Features

- **Authentication**
  - Secure registration & login with hashed passwords
  - Cookie-based JWT authentication (`httpOnly` cookies)
  - Persistent login sessions via token verification (`/me` route)

- **Profile Management**
  - Complete profile setup after registration (bio, avatar upload)
  - Image upload with preview (Multer/Cloudinary-based)

- **User Search**
  - Search users by **mobile number** or **email**
  - Debounced search input (optimized API calls)
  - Loading, error, and empty states handled gracefully

- **Messaging**
  - Send and receive text messages between users
  - Persistent conversation history (MongoDB)
  - Automatic conversation list — see everyone you've chatted with, without searching again
  - Chat bubbles styled by sender (left/right alignment)

- **Responsive UI**
  - **Mobile:** Full-screen chat list → tap a user → full-screen conversation view (with back navigation)
  - **Desktop:** WhatsApp Web-style split view — chat list on the left, conversation on the right, always visible
  - Built using React Router (`/chatting/:userId`) for clean navigation between views

- **State Management**
  - Redux Toolkit slices for `user`, `search`, and `chat` state
  - Clean separation between global state (Redux) and local UI state (`useState`)

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- React Router DOM
- Redux Toolkit
- Tailwind CSS
- Axios
- React Icons
- Lodash (debounce)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- Cookie-parser
- Multer / Cloudinary (image uploads)
- CORS

---

## 📁 Project Structure

```
chatting-web-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── user.controller.js
│   │   │   └── message.controller.js
│   │   ├── models/
│   │   │   ├── userModel.js
│   │   │   └── messageModel.js
│   │   ├── routes/
│   │   │   ├── user.routes.js
│   │   │   └── message.routes.js
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js
│   │   └── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ChatList.jsx
    │   │   ├── ConversassionUI.jsx
    │   │   ├── MobileNav.jsx
    │   │   └── MobileFooterNav.jsx
    │   ├── pages/
    │   │   ├── LoginUser.jsx
    │   │   ├── RegisterUser.jsx
    │   │   ├── Profile.jsx
    │   │   └── Home.jsx
    │   ├── redux/
    │   │   ├── store.js
    │   │   ├── userSlice.js
    │   │   ├── searchSlice.js
    │   │   └── chatSlice.js
    │   ├── custom-hooks/
    │   │   └── currentUser.js
    │   └── App.jsx
    └── package.json
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/TalibBuilds/Chating-Applicaion.git
cd chatting-web-app
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Run the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The app should now be running at `http://localhost:5173` (frontend) and `http://localhost:3000` (backend).

---

## 🔌 API Endpoints

### User Routes (`/api/user`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Login existing user |
| GET | `/logout` | Logout current user |
| GET | `/me` | Get current logged-in user |
| PATCH | `/profile` | Update profile (bio, avatar) |
| POST | `/finduser` | Search user by mobile/email |

### Message Routes (`/api/message`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/conversations` | Get list of all users you've chatted with |
| POST | `/send/:receiverId` | Send a message to a user |
| GET | `/:receiverId` | Get full conversation with a user |

---

## 🗺️ Roadmap / Future Improvements

- [ ] Real-time messaging with **Socket.io**
- [ ] Online/offline user status
- [ ] Message read receipts (seen/unseen)
- [ ] Media sharing (images, documents)
- [ ] Push notifications
- [ ] Group chats

---

## 👤 Author

Built by **[Mohd Talib]**
Feel free to connect or contribute!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
