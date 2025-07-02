# 🧠 AI Resume Ranker

AI-powered Resume Ranker that compares resumes to job descriptions using OpenAI's GPT. Built with **FastAPI** (backend) and **React** (frontend).

![App Screenshot](https://github.com/isuru-priyankara/ai-resume-ranker/raw/f360e3fa064503fbd373b4c13ce184b8dc71ff9e/Screenshot%20(110).png)

## 🚀 Features

- 📝 Upload resume files (.pdf or .docx)
- 📄 Paste job descriptions
- 🤖 GPT analyzes and scores resumes
- 📊 Returns score and reasoning
- 🔄 Full-stack: React + FastAPI

---


## ⚙️ Setup Instructions

### ✅ Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate


# Set your OpenAI API key
export OPENAI_API_KEY=your-key-here   # On Windows: set OPENAI_API_KEY=your-key-here

# Run the server
uvicorn app:app --reload

✅ Frontend (React)

cd frontend
npm install
npm start

🛡️ Environment Variables
Create a .env file (optional) in backend/:

bash
Copy
Edit

OPENAI_API_KEY=your-openai-key

🛠️ Tech Stack
Backend: FastAPI, OpenAI GPT

Frontend: React, Axios

Resume Parsing: PyMuPDF, python-docx

📌 TODO
 Multi-resume upload

 CSV export of results

 User login / dashboard

📄 License
MIT License — free for personal and commercial use.
