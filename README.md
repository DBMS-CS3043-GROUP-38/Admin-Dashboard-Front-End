# Admin Dashboard (React Application)

The **Admin Dashboard** is a React-based user interface designed to manage and monitor the Supply Chain Management Platform effectively. This front-end application enables administrators to oversee system operations, manage orders, monitor shipments, and configure key settings.

---

## 🛠 Setup Instructions

### Prerequisites
- Ensure **Node.js** and **npm** are installed on your machine.

### Steps

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Application**:
   ```bash
   npm start
   ```

3. **API Connectivity**:
   - First, follow the guide on the API repository [here](https://github.com/DBMS-CS3043-GROUP-38/SCMS-API) to set up the API server.
   - Ensure the **API server** and the hosting machine for this application are on the same network.
   - The application is configured to connect to the API server via the following code in `src\services\apiService.js`:
     ```javascript
     import axios from "axios";

     const BASE_URL = `http://${window.location.hostname}:3000/admin`;
     ```
   - If the API server runs on a different port or IP address, update this setting accordingly.

4. **Access the Application**:
    - Open a web browser and navigate to `http://localhost:PORT` to access the application.
    - The default port is `3002`.
    - If changed it will be displayed in the terminal after running `npm start`.

5. **Login Credentials**:
    - Use the following credentials to log in:
        - **Admin Hub**: username: `{Might need to check mannually on the database if you added dummy users}`, password: `Password@Admin`
        - **Store Manager**: username: `{Might need to check mannually on the database if you added dummy users}`, password: `Password@StoreManager`

6. **Serve the Application**:
    - To serve the application for production, run:
      ```bash
      npm run build
      ```
    - This will create a production build in the `build` directory.

7. **Deploy the Application**:
    - Deploy the contents of the `build` directory to a web server to host the application.
---

## 🔧 Troubleshooting

### API Connection Issues
- If the application cannot connect to the API server:
  1. Verify that the API server is running.
  2. Ensure the port and hostname in `src\services\apiService.js` are correct.
  3. If the API and application are on different networks, adjust the **CORS settings** in the backend API to allow cross-origin requests.

### CORS Adjustments (Backend)
- Update the backend API CORS configuration to allow secure connections:
  ```javascript
  const cors = require("cors");

  app.use(cors({
      origin: '*', // Replace with specific origin(s) for better security in production
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
  }));
  ```

---

## 🎨 User Interface Overview

### Dashboard Page
- View overall statistics and monitor system operations in a single glance.
![Dashboard Page](/images/Screenshot%202024-12-11%20170823.png)

### Order Tracking
- View and manage orders in different states.
![Order Tracking Page](/images/Screenshot%202024-12-11%20171045.png)

### Store Management
- Manage store details
![Store Management Page](/images/Screenshot%202024-12-11%20171116.png)

### Manage Shipments
- Monitor and manage shipments in the system.
![Manage Shipments Page](/images/Screenshot%202024-12-11%20171231.png)

### More images
- [View more screenshots](/images/).

## Default Passwords
- The default passwords for dummy data are:
  - **Admin Hub**: `Password@Admin`
  - **Store Manager**: `Password@StoreManager`

### Additional Media
- [Watch a walkthrough video](https://youtu.be/-bgOPcxjmuA).

---

## 🧩 Contribution Guidelines

We welcome contributions to this React application. Please ensure you:
- Follow React and JavaScript best practices.
- Test your changes locally before submitting a pull request.
- Document any new features or components.

---