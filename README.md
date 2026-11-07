 # 🎓 Saptham PU College ERP

<p align="center">
  <strong>🚀 Smart • Modern • Digital Campus Management</strong>
</p>

<p align="center">
  A responsive React-based PU College ERP frontend with 24 modules, role-based previews and interactive dashboards.
</p>

---

## ✨ Features

- 📊 **Dashboard** – College overview and analytics
- 🎓 **Academics** – Admissions, students, lecturers, subjects and timetable
- 📝 **Examinations** – Attendance, internal assessments and results
- 💰 **Administration** – Fees, library, transport, hostel and HR
- 👨‍👩‍👧 **Communication** – Parents portal, notifications and grievances
- 🔐 **12 Switchable Roles** – Frontend role previews
- 📈 **Reports & Settings** – Management reports and configuration

## 🧩 Academic Combinations

| Stream | Combinations |
|---|---|
| 🔬 Science | PCMB, PCMC, PCME, PCMS |
| 💼 Commerce | CEBA, SEBA, HEBA, HEPS |
| 🎨 Arts | HEPP, HEPS, HEBA |

## 🛠️ Tech Stack

- ⚛️ React 19
- ⚡ Vite
- 🎨 CSS
- 💾 Browser localStorage
- 🧪 Playwright

## 🚀 Getting Started

```bash
# Clone repository
git clone https://github.com/nvaltryek-001/saptham.git

# Enter project
cd saptham

# Install dependencies
npm install

# Install Playwright Chromium
npx playwright install chromium

# Start development server
npm run dev
```

Open: `http://127.0.0.1:5173`

## 🧪 Testing & Build

```bash
# Run 16 end-to-end tests
npm test

# Production build
npm run build
```

## ⚠️ Demo Disclaimer

- This is currently a **frontend-only demo**.
- Uses sample data stored in browser localStorage.
- No backend, real payments or messaging integration.
- Role switching is only a frontend preview, not actual security.

## 🔮 Future Backend Integration

Replace `readStore` and `saveStore` calls in `src/main.jsx` with API services. Configure backend URLs using `.env` variables. Refer to `.env.example`.

## 📁 Project Structure

```text
saptham/
├── public/
├── src/
│   ├── demo-data/
│   ├── main.jsx
│   └── style.css
├── tests/
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

## 👨‍💻 Developer

**NIKESH**

🔗 GitHub: [@nvaltryek-001](https://github.com/nvaltryek-001)

---

<p align="center">
  ⭐ If you find this project useful, consider giving it a star!
</p>
