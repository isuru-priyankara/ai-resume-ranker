from dotenv import load_dotenv
import openai
import os

load_dotenv()  # Load .env file
openai.api_key = os.getenv("OPENAI_API_KEY")


def score_resume(job_description: str, resume_text: str) -> dict:
    prompt = f"""
Compare the resume below with the job description and rate it from 0 to 100.
Explain your reasoning in brief.

Job Description:
{job_description}

Resume:
{resume_text}

Respond in this format:
- Score: <number>
- Strengths: ...
- Gaps: ...
"""

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # or gpt-3.5-turbo
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )

    content = response["choices"][0]["message"]["content"]
    return {"evaluation": content}

