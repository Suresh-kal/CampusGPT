# 🎓 CampusGPT AI Service

<p align="center">
  <b>AI & RAG Microservice for the CampusGPT University Assistant</b>
</p>

<p align="center">
  FastAPI · LangChain · ChromaDB · Ollama · Qwen3 4B
</p>

---

## 📌 Overview

**CampusGPT AI Service** is the AI and Retrieval-Augmented Generation (RAG) microservice for the CampusGPT university assistant.

It processes college documents, understands user queries, retrieves relevant information, and generates grounded answers using a local Large Language Model (LLM).

The service is designed to work with the existing **Node.js / Express backend** rather than replacing it.

### Core Responsibilities

- 📄 Document ingestion and processing
- 🧹 Text cleaning and chunking
- 🧠 NLP-based query analysis
- 🔎 Semantic document retrieval
- 🗓️ Structured timetable retrieval
- 🔐 Document-level access control
- 📚 Retrieval-Augmented Generation
- 💬 Conversation context handling
- 🤖 Local LLM answer generation
- 🧩 Source metadata and citations
- 🛡️ Grounding and fallback handling

---

# ✨ Features

| Feature | Description |
|---|---|
| 📄 Document Ingestion | Load and process PDF and DOCX documents |
| 🧹 Text Processing | Clean and split documents into retrieval chunks |
| 🧠 NLP | Query normalization, classification, and entity extraction |
| 🔎 Semantic Search | Retrieve relevant documents using vector similarity |
| 🗓️ Timetable Retrieval | Structured timetable parsing and metadata filtering |
| 📚 RAG | Generate answers using retrieved college documents |
| 🤖 Local AI | Qwen3 4B through Ollama |
| 🔤 Embeddings | `nomic-embed-text` embeddings |
| 🗃️ Vector Database | ChromaDB |
| 💬 Conversations | Supports contextual follow-up questions |
| 🔐 Access Control | Restrict retrieval using document IDs |
| 🛡️ Grounding | Prevent unsupported answers |
| 🌐 REST API | FastAPI endpoints |
| 🧪 Testing | Pytest and development test scripts |

---

# 🏗️ Architecture

```text
                         ┌─────────────────────┐
                         │      CampusGPT      │
                         │     Frontend/UI     │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  Node / Express     │
                         │      Backend        │
                         └──────────┬──────────┘
                                    │
                              HTTP / REST
                                    │
                                    ▼
              ┌────────────────────────────────────────┐
              │          CampusGPT AI Service           │
              │                FastAPI                  │
              └────────────────────┬───────────────────┘
                                   │
                  ┌────────────────┴────────────────┐
                  │                                 │
                  ▼                                 ▼
          ┌─────────────────┐              ┌─────────────────┐
          │    NLP Layer    │              │    RAG Layer    │
          ├─────────────────┤              ├─────────────────┤
          │ Normalization   │              │ Retrieval       │
          │ Classification  │              │ Metadata Filter │
          │ Entity Extract  │              │ Context Builder │
          │ Query Routing   │              │ Grounding       │
          └────────┬────────┘              └────────┬────────┘
                   │                                │
                   │                                ▼
                   │                       ┌─────────────────┐
                   │                       │    ChromaDB     │
                   │                       │  Vector Store   │
                   │                       └────────┬────────┘
                   │                                │
                   │                                ▼
                   │                       ┌─────────────────┐
                   │                       │     Ollama      │
                   │                       │    Qwen3 4B     │
                   │                       └────────┬────────┘
                   │                                │
                   └────────────────┬───────────────┘
                                    ▼
                              Grounded Answer
```

---

# 🔄 RAG Pipeline

```text
User Query
    │
    ▼
Query Normalization
    │
    ▼
NLP Classification
    │
    ▼
Entity Extraction
    │
    ▼
Query Routing
    │
    ▼
Metadata Filtering
    │
    ▼
Vector Similarity Search
    │
    ▼
Relevant Documents
    │
    ▼
Context Builder
    │
    ▼
Prompt Construction
    │
    ▼
Ollama / Qwen3 4B
    │
    ▼
Grounded Answer
```

---

# 🧠 NLP Pipeline

```text
Raw Query
    ↓
Normalization
    ↓
Classification
    ↓
Entity Extraction
    ↓
Query Routing
```

### Query Types

```text
GREETING
DOCUMENT
UNSUPPORTED
```

### Language Support

The NLP layer supports:

- English
- Hindi
- Hinglish
- Mixed language patterns

Example:

```text
Raksha Bandhan ki chutti kab hai?
```

---

# 🗓️ Timetable Intelligence

Timetable PDFs are processed separately from normal text documents.

The timetable parser extracts structured information such as:

```text
Class
Session
Day
Period
Time
Subject
Course Code
Faculty
Room
```

Example:

```text
class_name: B.Tech-V(B)
day: Monday
period_start: 1
period_end: 2
time_range: 9:20 - 11:00
subject: TOC
course_code: CSL0502
faculty: Dr. Aravendra Kumar Sharma
room: MG-513 Lab
```

This supports structured queries such as:

```text
What is my TOC class on Monday?

Who teaches Cryptography?

What do I have in period 5 on Monday?
```

---

# 📚 Document Processing

The ingestion pipeline is:

```text
Document
    ↓
File Type Detection
    ↓
Document Loader
    ↓
Text / Record Extraction
    ↓
Metadata Enrichment
    ↓
Cleaning
    ↓
Chunking
    ↓
Embeddings
    ↓
ChromaDB
```

### Supported Formats

- PDF
- DOCX

### Document Processing Libraries

- PyPDF
- pypdfium2
- python-docx
- docx2txt
- pdfplumber

---

# 🔤 Embeddings

### Embedding Model

```text
nomic-embed-text
```

### Embedding Dimension

```text
768
```

Embeddings are stored in ChromaDB and used for semantic similarity search.

---

# 🤖 Local LLM

CampusGPT uses a local LLM through Ollama.

### Generation Model

```text
Qwen3 4B
```

### Ollama Endpoint

```text
http://127.0.0.1:11434
```

The RAG prompt instructs the model to:

- Use retrieved college documents as the factual source
- Avoid outside knowledge
- Avoid inventing information
- Preserve document facts
- Answer only the current question
- Avoid unrelated information
- Clearly indicate when information is unavailable

---

# 🔐 Access-Controlled Retrieval

The AI service supports document-level access control.

The backend can provide:

```json
{
  "accessible_document_ids": [
    "document-001",
    "document-002"
  ]
}
```

The retriever restricts vector search to documents the user is allowed to access.

```text
User
 ↓
Backend Authorization
 ↓
Allowed Document IDs
 ↓
AI Service
 ↓
Filtered ChromaDB Retrieval
 ↓
RAG
```

---

# 💬 Conversation Context

The chat API supports conversation history.

Example:

```json
{
  "message": "Who teaches it?",
  "conversation": [
    {
      "role": "user",
      "content": "Who teaches Cryptography?"
    },
    {
      "role": "assistant",
      "content": "Cryptography is taught by ..."
    }
  ]
}
```

Conversation history helps understand references such as:

```text
it
they
that subject
there
this
```

Previous assistant responses are **not treated as factual evidence**. Retrieved college documents remain the factual source for RAG answers.

---

# 🛡️ Grounding & Fallbacks

The service checks whether retrieved documents are relevant to the detected intent and entities before generating an answer.

If the required information cannot be grounded in the available college documents, the service returns a fallback instead of generating unsupported information.

Example:

```text
I couldn't find this information in the available
college documents.
```

---

# 🛠️ Technology Stack

### Backend

- Python
- FastAPI
- Pydantic
- Uvicorn

### AI / RAG

- LangChain
- LangChain Ollama
- LangChain Chroma
- ChromaDB
- Ollama

### LLM

```text
Qwen3 4B
```

### Embeddings

```text
nomic-embed-text
```

### Testing

- Pytest
- HTTPX

---

# 📁 Project Structure

```text
ai-services/
│
├── app/
│   ├── api/
│   ├── core/
│   ├── models/
│   ├── nlp/
│   └── rag/
│       ├── loaders/
│       └── preprocessors/
│
├── data/
├── scripts/
├── tests/
│
├── requirements.txt
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/Suresh-kal/CampusGPT.git
cd CampusGPT/ai-services
```

## 2. Create Virtual Environment

### Windows PowerShell

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

### Linux / macOS

```bash
python3 -m venv .venv
source .venv/bin/activate
```

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 🦙 Ollama Setup

Start Ollama:

```bash
ollama serve
```

Pull the required models:

```bash
ollama pull qwen3:4b
ollama pull nomic-embed-text
```

Verify:

```bash
ollama list
```

Required models:

```text
qwen3:4b
nomic-embed-text
```

---

# ▶️ Run the AI Service

From:

```text
CampusGPT/ai-services
```

run:

```bash
uvicorn app.main:app --reload
```

Service:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

---

# 🔌 API Reference

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/health` | Service health |
| `POST` | `/v1/chat` | AI chat |
| `POST` | `/v1/documents/ingest` | Ingest document |
| `DELETE` | `/v1/documents/{document_id}` | Delete document |

## Chat

```http
POST /v1/chat
```

Request:

```json
{
  "message": "When is the Raksha Bandhan holiday?",
  "conversation": [],
  "user_context": null,
  "accessible_document_ids": []
}
```

Response:

```json
{
  "answer": "The Raksha Bandhan holiday is ...",
  "sources": [],
  "query_type": "DOCUMENT",
  "grounded": true
}
```

## Document Ingestion

```http
POST /v1/documents/ingest
```

Request:

```json
{
  "document_id": "document-001",
  "title": "B.Tech Timetable",
  "file_path": "data/B.Tech-V(B).pdf",
  "document_type": null,
  "department": "CSE",
  "semester": 5,
  "visibility": "PUBLIC",
  "tags": [
    "timetable",
    "cse"
  ]
}
```

Response:

```json
{
  "success": true,
  "document_id": "document-001",
  "chunks_created": 20
}
```

## Delete Document

```http
DELETE /v1/documents/{document_id}
```

Response:

```json
{
  "success": true,
  "document_id": "document-001",
  "chunks_deleted": 20
}
```

---

# 🧪 Testing

Run the complete test suite:

```powershell
python -m pytest -v
```

Current verified result:

```text
8 passed
```

Tests cover:

- Health endpoint
- Greeting handling
- Unsupported queries
- Timetable retrieval
- Authorized document retrieval
- Unauthorized document retrieval
- Multiple authorized documents
- Empty access list
- Empty message validation

### Development Tests

```powershell
python scripts/test_nlp.py
python scripts/test_retrieval.py
python scripts/test_timetable_parser.py
python scripts/test_ingestion.py
python scripts/test_conversation.py
python scripts/test_rag.py
```

---

# 📦 Vector Database

ChromaDB is used as the local vector database.

### Database Directory

```text
chroma_db/
```

### Collection

```text
campusgpt
```

The vector database is generated locally and excluded from Git.

Documents use deterministic IDs based on their source and content, helping repeated ingestion remain idempotent and reducing duplicate vector records.

---

# 📄 Sample Documents

The `data/` directory contains sample college documents used for development and RAG testing.

Examples include:

```text
B.Tech-V(B).pdf
Notice_.pdf
Notice_for_emedial_Classes-2.pdf
Office_Order___Raksha_Bandan_Holiday.pdf
Orientation_Programme_Notice.pdf
Student_Notice_15.08.2026.pdf
Uniform_Notice_2026 .pdf
syllabus_updated_DSA.pdf
```

> **Note:** Only include documents in a public repository if the project team has permission to redistribute them.

---

# 🔗 Backend Integration

```text
Frontend
   │
   ▼
Node / Express Backend
   │
   │ HTTP / REST
   ▼
FastAPI AI Service
   │
   ├── NLP
   ├── Retrieval
   ├── RAG
   └── Local LLM
```

### AI Service Responsibilities

```text
Document ingestion
Document parsing
Text cleaning
Chunking
Embeddings
Vector storage
Retrieval
Metadata filtering
RAG
Context building
Prompting
Local LLM generation
Grounding
Fallback handling
```

### Main Backend Responsibilities

The Node/Express backend remains responsible for the main application/backend layer, including application-level authorization and frontend integration.

The backend passes permitted document IDs to the AI service when access-controlled retrieval is required.

---

# 📊 Current Status

## Completed

- [x] FastAPI AI service
- [x] Health endpoint
- [x] Chat endpoint
- [x] Document ingestion endpoint
- [x] Document deletion endpoint
- [x] PDF document loading
- [x] DOCX document loading
- [x] Text cleaning
- [x] Recursive text chunking
- [x] Timetable parser
- [x] Metadata enrichment
- [x] ChromaDB vector store
- [x] Ollama embeddings
- [x] Qwen3 4B generation
- [x] NLP normalization
- [x] Query classification
- [x] Entity extraction
- [x] Query routing
- [x] Metadata-aware retrieval
- [x] Access-controlled retrieval
- [x] Conversation context
- [x] RAG grounding checks
- [x] Source metadata
- [x] API validation
- [x] Automated tests
- [x] Development scripts
- [x] Documentation

---

# 🚧 Roadmap

- [ ] Query rewriting for conversational follow-ups
- [ ] Better retrieval for generic document questions
- [ ] User-context based filtering
- [ ] Improved retrieval ranking
- [ ] RAG evaluation framework
- [ ] Retrieval quality metrics
- [ ] Improved citation handling
- [ ] Structured logging
- [ ] Production monitoring
- [ ] Performance optimization
- [ ] Expanded document type support

---

# 👨‍💻 AI Service Ownership

The AI Service focuses on the AI layer of CampusGPT.

```text
                    CampusGPT
                        │
           ┌────────────┴────────────┐
           │                         │
           ▼                         ▼
     Main Backend               AI Service
     Node / Express               FastAPI
           │                         │
           │                   ┌─────┴─────┐
           │                   │           │
           │                  NLP         RAG
           │                               │
           │                          Local LLM
           │
           └──────────── API ──────────────┘
```

### AI Service

Responsible for:

- NLP
- RAG
- Embeddings
- Retrieval
- Context handling
- Prompting
- Local LLM integration
- Grounding
- Citations
- Fallbacks
- AI evaluation

### Main Backend

Responsible for:

- Application backend
- Authentication
- Authorization
- User management
- Main application APIs
- Frontend integration
- Passing authorized document IDs to the AI service

---

# 📌 Important Development Notes

### Ollama

Ollama must be running before using the local LLM or embeddings:

```bash
ollama serve
```

Expected endpoint:

```text
http://127.0.0.1:11434
```

### Local Vector Database

The ChromaDB database is generated locally:

```text
chroma_db/
```

It should not be committed to Git.

### Environment Files

The repository excludes local and secret files such as:

```text
.env
.env.*
.venv/
chroma_db/
.idea/
__pycache__/
.pytest_cache/
```

---

# 🚀 Quick Start

```powershell
# Clone
git clone https://github.com/Suresh-kal/CampusGPT.git

# Enter AI service
cd CampusGPTi-services

# Create environment
python -m venv .venv

# Activate
.venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Start Ollama in another terminal
ollama serve

# Pull models
ollama pull qwen3:4b
ollama pull nomic-embed-text

# Start AI service
uvicorn app.main:app --reload
```

Open:

```text
http://127.0.0.1:8000/docs
```

---

# 🧪 Verification Checklist

```text
☑ Python environment created
☑ Dependencies installed
☑ Ollama running
☑ Qwen3 4B available
☑ nomic-embed-text available
☑ AI service starts successfully
☑ /health works
☑ Documents can be ingested
☑ Documents can be deleted
☑ Chat endpoint works
☑ NLP tests pass
☑ Retrieval tests pass
☑ Conversation tests pass
☑ API tests pass
```

---

# 📜 License

This project is developed as part of the **CampusGPT university project**.

---

<p align="center">
  <b>CampusGPT AI Service</b><br>
  Intelligent · Grounded · Local AI
</p>
