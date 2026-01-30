# SkyAccess ☁️🔐

SkyAccess is a secure cloud storage web application that allows users to upload, manage, and access their files safely. The platform is built using **Firebase** for authentication and database management, and **Cloudinary** for high‑performance media storage and delivery.

🔗 **Live Demo:** [https://sky-access.vercel.app/index.html](https://sky-access.vercel.app/index.html)

---

## 🚀 Features

* 🔐 **Secure Authentication**

  * Email & password based **sign‑up and login** using Firebase Authentication
  * Protected routes to prevent unauthorized access

* ☁️ **Cloud File Storage**

  * Media files hosted on **Cloudinary** for fast and reliable access
  * Supports uploading and viewing user files

* 🗂️ **User‑Isolated Data Access**

  * Each user can only see and manage **their own files**
  * Files are filtered using the authenticated user’s **UID**

* ⚡ **Real‑Time Database**

  * File metadata (name, size, URL, owner) stored in **Firebase Firestore**
  * Real‑time updates on upload and delete actions

* 🖥️ **Responsive Dashboard**

  * Clean and simple UI for managing uploaded files
  * Delete and view options available per file

---

## 🛠️ Tech Stack

**Frontend**

* HTML
* CSS
* JavaScript

**Backend / Services**

* Firebase Authentication
* Firebase Firestore
* Cloudinary

**Hosting**

* Vercel

---

## 📁 Project Structure

```
SkyAccess/
│── index.html        # Landing page
│── login.html        # Login page
│── signup.html       # Signup page
│── dashboard.html    # User dashboard
│
│── css/
│   └── style.css
│
│── js/
│   ├── firebase.js   # Firebase configuration
│   ├── auth.js       # Login & signup logic
│   ├── upload.js     # File upload logic
│   └── dashboard.js  # File rendering & delete logic
│
└── assets/
```

---

## ⚙️ Setup & Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/skyaccess.git
   ```

2. **Open the project**

   * Simply open `index.html` in your browser
   * Or use a local server like Live Server (VS Code)

3. **Firebase Configuration**

   * Create a Firebase project
   * Enable **Authentication (Email/Password)**
   * Enable **Firestore Database**
   * Replace Firebase config values in `firebase.js`

4. **Cloudinary Configuration**

   * Create a Cloudinary account
   * Add your Cloudinary upload preset and credentials

---

## 🔒 Security Implementation

* Firebase Auth ensures only verified users can log in
* Firestore rules restrict access based on `request.auth.uid`
* User‑specific file access prevents data leakage

---

## 📌 Future Improvements

* 📦 Folder support
* 📥 Download files option
* 🗑️ Bulk delete
* 🔍 Search and filter files
* 📊 Storage usage analytics

---

## 👨‍💻 Author

**Shivam Sharma**

If you found this project helpful, don’t forget to ⭐ the repository!

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use and modify it.