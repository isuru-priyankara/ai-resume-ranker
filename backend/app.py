from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from resume_parser import extract_text
from gpt_scorer import score_resume
import uvicorn

app = FastAPI()

# Allow frontend (React) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/rank")
async def rank_resume(
    job_description: str = Form(...),
    resume: UploadFile = File(...)
):
    content = await resume.read()
    resume_text = extract_text(resume.filename, content)
    result = score_resume(job_description, resume_text)
    return result

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
 
