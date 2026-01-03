# 📇 Contact Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing contacts with a modern, responsive UI and Docker-based database setup.

## ✨ Features

- ✅ **Create Contacts**: Add new contacts with name, email, phone, and optional message
- ✅ **View Contacts**: Display all contacts in a clean, organized list
- ✅ **Delete Contacts**: Remove contacts with a single click
- ✅ **Real-time Validation**: Client-side form validation with error messages
- ✅ **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- ✅ **Auto-refresh**: Contact list updates without page reload
- ✅ **Success Notifications**: Visual feedback for successful operations
- ✅ **Docker Integration**: MongoDB running in containerized environment

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with gradient designs

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Mongoose** - MongoDB object modeling

### Database
- **MongoDB** - NoSQL database (Dockerized)
- **Mongo Express** - Web-based MongoDB admin interface

### DevOps
- **Docker** - Containerization platform
- **Docker Compose** - Multi-container orchestration

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/adarsh-ops/contact-management-app.git
cd contact-management-app
```

### 2. Setup MongoDB with Docker

Start the MongoDB container using Docker Compose:

```bash
docker-compose up -d
```

This will start:
- MongoDB on `http://localhost:27017`
- Mongo Express (Web UI) on `http://localhost:8081`

Verify containers are running:
```bash
docker-compose ps
```

### 3. Setup Backend

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://admin:password@localhost:27017/contactdb?authSource=admin
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 4. Setup Frontend

Open a new terminal, navigate to the frontend directory:

```bash
cd frontend
npm install
```

Start the React development server:

```bash
npm start
```

The frontend will automatically open at `http://localhost:3000`

## 📁 Project Structure

```
contact-management-app/
├── backend/
│   ├── models/
│   │   └── Contact.js          # Mongoose schema for contacts
│   ├── routes/
│   │   └── contacts.js         # API routes (GET, POST, DELETE)
│   ├── .env                    # Environment variables
│   ├── server.js               # Express server setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js              # Main React component
│   │   ├── App.css             # Application styles
│   │   ├── index.js            # React entry point
│   │   └── index.css           # Global styles
│   └── package.json
├── docker-compose.yml          # Docker Compose configuration
└── README.md
```

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api/contacts`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/` | Get all contacts | - |
| POST | `/` | Create new contact | `{ name, email, phone, message }` |
| DELETE | `/:id` | Delete contact by ID | - |

### Example API Requests

**Get all contacts:**
```bash
curl http://localhost:5000/api/contacts
```

**Create a contact:**
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "message": "Hello!"
  }'
```

**Delete a contact:**
```bash
curl -X DELETE http://localhost:5000/api/contacts/{contact_id}
```

## 🗄️ Database Schema

### Contact Model

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    trim: true,
    default: ''
  },
  timestamps: true  // createdAt, updatedAt
}
```

## 🐳 Docker Management

### Useful Docker Commands

```bash
# Start containers
docker-compose up -d

# Stop containers
docker-compose down

# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# Restart containers
docker-compose restart

# Stop and remove all data (fresh start)
docker-compose down -v

# Access MongoDB shell
docker exec -it contact-app-mongodb mongosh -u admin -p password
```

### MongoDB Web Interface

Access Mongo Express at `http://localhost:8081` to:
- View databases and collections
- Browse contact documents
- Run queries
- Monitor database statistics

## ✅ Form Validation Rules

- **Name**: Required, cannot be empty
- **Email**: Required, must be valid email format
- **Phone**: Required, must be 10 digits
- **Message**: Optional field
- **Submit Button**: Disabled until all required fields are valid

## 🎨 Screenshots

### Main Interface
```
┌─────────────────────────────────────────────────┐
│         📇 Contact Management System            │
│         Manage your contacts efficiently        │
├─────────────────┬───────────────────────────────┤
│  Add Contact    │      Contacts List (5)        │
│  ┌───────────┐  │  ┌─────────────────────────┐ │
│  │ Name      │  │  │ John Doe          [Del] │ │
│  │ Email     │  │  │ john@example.com        │ │
│  │ Phone     │  │  │ 1234567890              │ │
│  │ Message   │  │  └─────────────────────────┘ │
│  │[Add]      │  │  ┌─────────────────────────┐ │
│  └───────────┘  │  │ Jane Smith        [Del] │ │
│                 │  │ jane@example.com        │ │
└─────────────────┴───────────────────────────────┘
```

## 🧪 Testing the Application

### Manual Testing Checklist

1. **Add Contact**
   - Fill out the form with valid data
   - Click "Add Contact"
   - Verify contact appears in the list

2. **Validation**
   - Try submitting empty form (should show errors)
   - Enter invalid email (should show error)
   - Enter phone with letters (should show error)
   - Verify submit button is disabled when form is invalid

3. **Delete Contact**
   - Click delete button on any contact
   - Verify contact is removed from list

4. **Responsive Design**
   - Resize browser window
   - Test on mobile device
   - Verify layout adapts correctly

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check if MongoDB container is running
docker-compose ps

# Check MongoDB logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb
```

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check for CORS errors in browser console
- Ensure `axios` requests use correct URL (`http://localhost:5000`)

### Port already in use
```bash
# For backend (change PORT in .env)
PORT=5001

# For MongoDB (change in docker-compose.yml)
ports:
  - "27018:27017"

# Update MONGODB_URI in .env accordingly
```

### Data not persisting
```bash
# Check Docker volume
docker volume ls
docker volume inspect contact-management-app_mongodb_data

# If needed, recreate volume
docker-compose down -v
docker-compose up -d
```

## Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Set environment variables:
   ```
   MONGODB_URI=your_production_mongodb_uri
   PORT=5000
   ```

2. Update CORS settings in `server.js`:
   ```javascript
   app.use(cors({
     origin: 'https://your-frontend-domain.com'
   }));
   ```

### Frontend Deployment (Vercel/Netlify)

1. Update API URL in `App.js`:
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/contacts';
   ```

2. Set environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-domain.com/api/contacts
   ```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://admin:password@localhost:27017/contactdb?authSource=admin
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api/contacts
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Adarsh Nagar**
- GitHub: [@adarsh-ops](https://github.com/adarsh-ops)
- LinkedIn: [Adarsh Nagar](https://www.linkedin.com/in/adarsh-nagar-37a562316)
- X(Twitter): [@AdarshN10490396](https://x.com/AdarshN10490396)

## 🙏 Acknowledgments

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Docker Documentation](https://docs.docker.com/)

## 📞 Support

For support, email adarshnagar247@gmail.com or open an issue in the repository.

---

**Happy Coding! 🚀**