# GoTogether - Smart Transportation for Children with Special Needs

**GoTogether** is an intelligent transportation coordination system for children with special needs. It provides optimal scheduling and ride assignments to educational institutions, with a strong focus on efficiency, accessibility, and real-time visibility for all stakeholders.

---

## 🎯 Key Features

- 🧠 **Core Algorithm: Ride Assignment** *(Coming Soon!)*
    Want to help? Suggestions for implementing/improving the ride assignment algorithm are welcome!  
    Feel free to contribute via Pull Request or open an Issue.
  - Assigns children to rides based on:
    - Distance between children
    - Maximum allowed travel time (predefined)
    - Maximum number of children per vehicle
    - 🎯 **Objective: Minimize total number of vehicles and total travel time**
  - 🚗 The shortest driving route for each assigned ride is calculated using **Google Maps Directions API** .

- 🕓 Daily scheduling of rides to educational institutions
- 🚌 Assignment of children to transportation
- 👨‍👩‍👧‍👦 **Parents can report child absences**, which update ride assignments accordingly
- 📍 Google Maps integration to display ride routes
- 🔄 Daily background job (using **Quartz.NET** in C#) automatically updates attendance status for each child
- 👥 Role-based access: Admin / Driver / Parent
- 📲 SMS and voice message notifications

---

## 🧱 Technologies Used

### 🔹 Client Side
- React + Vite
- Axios
- Google Maps JavaScript API

### 🔹 Server Side
- ASP.NET Core (C#)
- SQL Server
- RESTful API
- Background task scheduling using **Quartz.NET**
- Messaging and notifications via **Twilio .NET library**

---

## 🗂 Project Structure

```
GoTogether/
├── client/                # React frontend
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
├── server/                # .NET backend
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   ├── Jobs/              # Background task logic
│   └── Program.cs
├── database/              # SQL scripts and seed data
├── README.md
└── goTogether.sln
```

---

## ⚙️ Running Locally

### Server (C#):

```bash
cd C#
dotnet restore
dotnet run
```

### Client (React):

```bash
cd REACT/vite-project
npm install
npm run dev
```

---

## 🔐 User Roles

- **Admin**: Manage users, rides, schedules, and institutions.
- **Driver**: View assigned routes and schedules.
- **Parent**: View ride times and report child absence.

---

## 🚀 Upcoming Features

- Real-time push notifications
- Waze integration and built-in navigation
- Live GPS tracking for rides

---

## 👩‍💻 Developed by: [Tamar](https://github.com/tamar2791) and [Tehila](https://github.com/tehilamiller)

Final project for Software Development Program, 2025.


---


## 🙋‍♀️ Used this project?

If this code helped you or was useful in any way — I’d really appreciate it if you could give it a ⭐ star, open an issue, or just let me know!
It means a lot to know the project is being used and helps me improve it further. Thanks! 💙

