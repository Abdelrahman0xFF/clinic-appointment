<div align="center">
  <h1>🏥 Clinic Appointment Management System</h1>
  <p>A comprehensive MEAN stack application for clinic staff and patients to manage appointments, patients, and content.</p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  </p>
</div>

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Environment Variables](#environment-variables)
    - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [License](#license)

---

## 🌟 About the Project

The Clinic Appointment Management System is designed to bridge the gap between healthcare providers and patients. It offers two dedicated portals:

1. **User (Patient) Portal:** Allows patients to browse services, read clinic blogs, and securely book and track their appointments.
2. **Admin (Doctor & Staff) Portal:** Enables doctors and clinic staff to manage daily schedules, view patient details, approve appointments, and publish blog content.

---

## 💻 Tech Stack

This project is built using the robust **MEAN** stack along with several third-party services:

- **Frontend:** Angular (planned integration)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT) & bcrypt
- **File Uploads:** Cloudinary & Multer (for medical receipts and images)
- **SMS Notifications:** Twilio (for appointment updates and confirmations)

---

## 🚀 Features

### For Patients:

- **Appointment Booking:** Seamlessly schedule, reschedule, and track appointments.
- **Secure Authentication:** JWT-based login system for patient security.
- **Blog Access:** Read health tips and clinic updates from the dedicated blog section.
- **SMS Confirmations:** Receive SMS notifications for appointment status via Twilio.

### For Clinic Staff & Doctors:

- **Dashboard:** An interactive dashboard to get a birds-eye view of clinic activities.
- **Appointment Management:** View, accept, or cancel patient appointments.
- **Content Management:** Create and manage blog posts.
- **Secure Access:** Role-based access control to keep patient data secure.

---

## 📸 Screenshots

### User (Patient) Portal

| Home                                                   | Blogs                                                   |
| ------------------------------------------------------ | ------------------------------------------------------- |
| <img src="./UI/User%20(patient)/home.png" width="400"> | <img src="./UI/User%20(patient)/blogs.png" width="400"> |

| Appointment Booking                                             | Booking Confirmation                                                       |
| --------------------------------------------------------------- | -------------------------------------------------------------------------- |
| <img src="./UI/User%20(patient)/appointment-1.png" width="400"> | <img src="./UI/User%20(patient)/appointment-confirmation.png" width="400"> |

### Admin (Doctor, Staff) Portal

| Admin Dashboard                                                      | Manage Appointments                                                     |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| <img src="./UI/Admin%20(doctor,%20staff)/dashboard.png" width="400"> | <img src="./UI/Admin%20(doctor,%20staff)/appointments.png" width="400"> |

| Blog Management                                                           | Login                                                            |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| <img src="./UI/Admin%20(doctor,%20staff)/blog-managment.png" width="400"> | <img src="./UI/Admin%20(doctor,%20staff)/login.png" width="400"> |

---

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You need to have the following installed on your machine:

- **Node.js** (v18+ recommended)
- **MongoDB** (Local instance or MongoDB Atlas cluster)
- **Angular CLI** (For frontend, if applicable)

### Environment Variables

Create a `.env` file in the `backend/` directory and add the following configuration:

```env
# Server
PORT=3000

# Database
MONGO_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Twilio SMS Config
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Cloudinary (Image Uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/clinic-appointment.git
    cd clinic-appointment
    ```

2. **Setup the Backend:**

    ```bash
    cd backend
    npm install
    ```

3. **Setup the Frontend:** _(Once the Angular UI is fully integrated)_
    ```bash
    # In a new terminal tab
    cd UI
    npm install
    ```

---

## 💻 Usage

### Running the Backend (Development Mode)

Inside the `backend/` directory, run:

```bash
npm run start
```

The server will start using `nodemon` on `http://localhost:3000`.

### Running the Frontend

_(Upcomming)_

---

## 📂 Project Structure

```
clinic-appointment/
├── backend/                  # Node.js + Express backend
│   ├── config/               # DB, Twilio, Cloudinary configurations
│   ├── middlewares/          # JWT auth, Multer upload, Rate limiting
│   ├── routes/               # Express API routes
│   ├── utils/                # SMS helper, error handlers
│   ├── index.js              # Entry point
│   └── package.json          # Backend dependencies
├── UI/                       # Frontend folder
│   ├── Admin (doctor, staff)/ # Admin portal designs/code
│   └── User (patient)/       # Patient portal designs/code
└── README.md                 # Project documentation
```
