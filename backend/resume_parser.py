from io import BytesIO
import fitz  # PyMuPDF
import docx

def extract_text(filename: str, content: bytes) -> str:
    if filename.endswith(".pdf"):
        return extract_pdf_text(content)
    elif filename.endswith(".docx"):
        return extract_docx_text(content)
    else:
        return "Unsupported file format"

def extract_pdf_text(content: bytes) -> str:
    text = ""
    with fitz.open(stream=content, filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()
    return text

def extract_docx_text(content: bytes) -> str:
    file_stream = BytesIO(content)
    doc = docx.Document(file_stream)
    return "\n".join([para.text for para in doc.paragraphs])

