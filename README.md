# 👻 Ghost-Right: Content Synthesis Engine
**A professional AI-driven platform for personal branding and automated content orchestration.**

Ghost-Right is a modular system designed to bridge the gap between raw information and high-fidelity, style-aligned content. Built during Semester 1 at VIT Bhopal, this project explores the intersection of **High-Code (React)** and **No-Code (n8n)** architectures.

---

## 🏛️ System Architecture
The platform follows a "Brain and Body" architecture:
- **The Body (Frontend):** A React.js application styled with Tailwind CSS and Framer Motion, providing a terminal-inspired "Creator Studio" interface.
- **The Brain (Backend):** Orchestrated via **n8n** (hosted on WSL), handling multi-step AI workflows, YouTube transcript extraction, and data persistence.
- **Database Layer:** Uses the Google Sheets API for real-time storage of "Writing DNA" and content archives.



---

## 🚀 Key Features
* **Neural Identity Protocol:** Analyzes raw writing samples to generate a persistent "Style Guide" for AI consistency.
* **Content Synthesis:** Converts URLs into platform-specific content (LinkedIn/Twitter) while maintaining the user's unique voice.
* **Ghost Archives:** A persistent history layer that allows users to filter and retrieve past generations via the n8n-Google Sheets bridge.

---

## 📂 Repository Structure
- `/ui`: The React frontend source code (Vite-powered).
- `/backend`: JSON blueprints of the n8n logic. 

---

## 🛠️ Setup & Installation

### 1. Frontend
```bash
cd ui
npm install
npm run dev
