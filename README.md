# Airtable App

This project is a Project Management application connected to Airtable.

## 🚀 Setup

### 1. Backend
```bash
cd server
npm install
node index.js
```

Create a `.env` file inside `server` with:

```
AIRTABLE_API_KEY=your_api_key
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_TABLE_NAME=Projects
PORT=4000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file inside `frontend` with:

```
VITE_API_BASE=http://localhost:4000
```

### Features
- Add new projects via form
- Display projects in cards with status
- Update project status inline
- Data synced with Airtable in real-time
