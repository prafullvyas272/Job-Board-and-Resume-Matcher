#  Job Board + Resume Matcher

A full-stack Job Board application where:

- 👔 Employers can register, login, and manage job postings
- 👩‍💻 Candidates can upload resumes (PDF)
- 🧠 System extracts skills from resume
- 📊 Jobs are matched based on skill overlap percentage

---

##  Features

### 👤 Authentication
- Register (Employer / Candidate)
- Login
- JWT-based authentication
- Role-based access control

### 👔 Employer
- Create job
- Edit job
- Delete job
- View posted jobs

### 👩‍💻 Candidate
- Upload resume (PDF)
- Automatic skill extraction
- View matched jobs
- Match score percentage
- View matched skills

### 📄 Resume Parsing
- Extract text from PDF using `pdf-parse`
- Keyword-based skill detection
- Case-insensitive matching

### 📊 Matching Logic
Match Score = (Number of matching skills / Total job skills) * 100


Jobs are sorted by highest match first.

---

# 🛠 Tech Stack

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- pdf-parse

## Frontend
- Next.js (App Router)
- React
- Axios

---

# 🛠 Tech Stack

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- pdf-parse

## Frontend
- Next.js (App Router)
- React
- Axios

---

# 📁 Project Structure
job/
├── backend/
└── frontend/


---

# ⚙️ Setup Instructions

---

## 1️. Clone Repository

```bash
git clone <your-repo-url>
cd job

2️. Backend Setup
cd backend
npm install

2️⃣ Backend Setup
cd backend
npm install

Create .env file inside backend:
PORT=5000
MONGO_URI=mongodb+srv://----
JWT_SECRET=your_secret_key

-- Run Backend
npm run dev

-- Backend runs on:
http://localhost:5000


3️. Frontend Setup
cd frontend
npm install

-- Run Frontend
npm run dev


--Frontend runs on:
http://localhost:3000

API Endpoints
Auth

POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

Jobs

POST /api/jobs

GET /api/jobs

GET /api/jobs/:id

PUT /api/jobs/:id

DELETE /api/jobs/:id

Resume

POST /api/resumes/upload

GET /api/resumes/:id

Matching

GET /api/match/jobs

🎥 Demo Flow

Employer Register → Login → Create Job → Logout

Candidate Register → Login → Upload Resume → View Matched Jobs
