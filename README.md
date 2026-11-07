# Saptham PU College ERP (demo frontend)

React + Vite frontend with sample data (localStorage). No backend, no real payments/messages. Roles are a frontend preview, not security.

    npm install
    npm run dev            # http://127.0.0.1:5173
    npm run build
    npx playwright install chromium
    npm test               # 16 end-to-end tests

Modules: 24 (Admissions, Students, Lecturers, Streams & Classes, Academic Management, Subjects, Timetable, Study Materials, Attendance, Examinations, Internal Assessment, Results, Fees, Library, Transport, Hostel, HR & Staff, Parents Portal, Notifications, Grievances, Reports, Users & Roles, Role Portals, Settings) + Dashboard. 12 switchable roles.
Streams/combinations: Science PCMB/PCMC/PCME/PCMS, Commerce CEBA/SEBA/HEBA/HEPS, Arts HEPP/HEPS/HEBA.
Backend later: replace the readStore/saveStore calls in src/main.jsx with API services; keep URLs in .env (see .env.example).
