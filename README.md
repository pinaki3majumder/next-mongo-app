# 🔐 Next.js Authentication App

A full-stack authentication system built using **Next.js**, **TypeScript**, **MongoDB**, **Tailwind CSS v4**, **Nodemailer**, and **Mailtrap**.

## 🚀 Live Demo

🔗 [View on Vercel](https://next-auth-mongo-app.vercel.app/login)

---

## 🚀 Features

1. **User Signup with Email Verification**

   - Sends a verification email after signup
   - Verifies user via token before allowing login

2. **Secure Password Hashing**

   - Passwords are hashed using `bcrypt` before saving in MongoDB

3. **JWT-Based Authentication**

   - Login issues a JWT token
   - Authenticated users can access the profile page

4. **Dynamic Layouts**

   - Public layout for unauthenticated users
   - Private layout for logged-in users

5. **Forgot Password Flow**
   - Enter email → Receive reset link → Verify token → Show password reset form → Save new password

---

## ⚙️ Tech Stack

- **Frontend**: Next.js + TypeScript
- **Backend**: Next.js API Routes + MongoDB
- **Styling**: Tailwind CSS v4
- **Email**: Nodemailer + Mailtrap
- **Authentication**: JWT, bcrypt

---

## 📁 Project Structure

```
src/
├── app/                # Pages and routes
├── components/         # Reusable components
├── dbConfig/           # MongoDB connection setup
├── helpers/            # Token and utility functions
├── models/             # Mongoose models
├── types/              # TypeScript type definitions
└── styles/             # Tailwind and global styles
```

---

## 📄 Environment Variables

Create a `.env.local` file in the root of your project:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BASE_URL=http://localhost:3000
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your_mailtrap_username
MAIL_PASS=your_mailtrap_password
```

---

## 🧪 How to Run

```bash
npm install
npm run dev
```

Go to: [http://localhost:3000](http://localhost:3000)

---

## 💌 Mailtrap (Email Testing)

- Emails are sent to your [Mailtrap](https://mailtrap.io) inbox during development.
- No real emails are sent.
- Useful for signup verification and password reset flows.

---

## 🧠 Authentication Flow

### ➤ Signup

- User signs up → Email sent with token → Click to verify → Redirect to login

### ➤ Login

- Enter email + password → Validated → JWT saved → Redirect to profile

### ➤ Forgot Password

- Enter email → Token sent via email → Validate token → Show password fields → Submit new password

---

## 📌 Notes

- Passwords are securely hashed with `bcrypt`
- JWT tokens are stored in cookies for session management
- MongoDB is connected using a singleton pattern to avoid memory leak warnings
- Form validation is handled using `react-hook-form`

---

## 📜 License

MIT – Free to use and modify

---

## 👨‍💻 Author

Made with ❤️ by Pinaki Majumder
