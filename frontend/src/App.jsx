import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile || !jobDescription) {
      alert("Please provide both a job description and a resume file.");
      return;
    }

    const formData = new FormData();
    formData.append("job_description", jobDescription);
    formData.append("resume", resumeFile);

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/rank", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data.evaluation);
    } catch (err) {
      console.error(err);
      alert("Error uploading resume or contacting backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="glass-card">
        <h1 className="app-title">
          <span className="title-gradient">AI Resume Ranker</span>
        </h1>
        <p className="app-subtitle">Get instant feedback on your resume's match with any job</p>

        <form onSubmit={handleSubmit} className="app-form">
          <div className="form-group">
            <label className="form-label">Job Description</label>
            <textarea
              className="form-textarea"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Upload Your Resume</label>
            <div className="file-upload-container">
              <input 
                type="file" 
                id="resume-upload"
                className="file-input"
                accept=".pdf,.docx" 
                onChange={handleFileChange} 
              />
              <label htmlFor="resume-upload" className="file-upload-label">
                <div className="upload-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <div className="upload-text">
                  {fileName || "Click to upload (PDF or DOCX)"}
                </div>
              </label>
            </div>
            {fileName && <div className="file-name">{fileName}</div>}
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? (
              <div className="button-loading">
                <span className="spinner"></span>
                Analyzing...
              </div>
            ) : (
              "Evaluate My Resume"
            )}
          </button>
        </form>

        {result && (
          <div className="result-container">
            <div className="result-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <h3>Evaluation Results</h3>
            </div>
            <div className="result-content">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;