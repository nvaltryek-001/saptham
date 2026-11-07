import React, { useMemo, useState } from "react";
import {
  LayoutDashboard, Users, GraduationCap, UserRound, ClipboardCheck,
  CalendarDays, BookOpen, Wallet, Bus, BedDouble, BriefcaseBusiness,
  BarChart3, Settings, Bell, Search, Plus, Download, Pencil, Trash2,
  Menu, X, ChevronDown, ArrowUpRight, Clock, IndianRupee, FileText,
  ShieldCheck, School, LogOut, Filter, Eye, CheckCircle, AlertCircle,
  BookMarked, UserCheck
} from "lucide-react";
import "./style.css";

const initialStudents = [
  { id:"SPU001", name:"Aarav Shetty", year:"First PUC", stream:"Science", combination:"PCMB", section:"A", phone:"9876543210", parent:"Ramesh Shetty", attendance:96, status:"Active" },
  { id:"SPU002", name:"Ananya Rao", year:"Second PUC", stream:"Commerce", combination:"HEBA", section:"A", phone:"9876543211", parent:"Suresh Rao", attendance:92, status:"Active" },
  { id:"SPU003", name:"Kiran Poojary", year:"First PUC", stream:"Science", combination:"PCMC", section:"B", phone:"9876543212", parent:"Mohan Poojary", attendance:88, status:"Active" },
  { id:"SPU004", name:"Priya Naik", year:"Second PUC", stream:"Arts", combination:"HEPP", section:"A", phone:"9876543213", parent:"Ganesh Naik", attendance:97, status:"Active" },
  { id:"SPU005", name:"Rohan Kumar", year:"First PUC", stream:"Commerce", combination:"CEBA", section:"B", phone:"9876543214", parent:"Srinivas Kumar", attendance:84, status:"Active" },
  { id:"SPU006", name:"Sneha Bhat", year:"Second PUC", stream:"Science", combination:"PCMB", section:"A", phone:"9876543215", parent:"Prakash Bhat", attendance:95, status:"Active" },
  { id:"SPU007", name:"Aditya Rao", year:"First PUC", stream:"Arts", combination:"HEPS", section:"A", phone:"9876543216", parent:"Ravi Rao", attendance:90, status:"Active" },
  { id:"SPU008", name:"Divya Shetty", year:"Second PUC", stream:"Commerce", combination:"SEBA", section:"B", phone:"9876543217", parent:"Mahesh Shetty", attendance:93, status:"Active" }
];

const initialLecturers = [
  { id:"LEC001", name:"Dr. Meera Rao", subject:"Physics", qualification:"M.Sc, B.Ed", phone:"9876500001", classes:"I PUC Science", status:"Active" },
  { id:"LEC002", name:"Suresh Kumar", subject:"Mathematics", qualification:"M.Sc, B.Ed", phone:"9876500002", classes:"I & II PUC", status:"Active" },
  { id:"LEC003", name:"Anitha Shetty", subject:"Accountancy", qualification:"M.Com, B.Ed", phone:"9876500003", classes:"II PUC Commerce", status:"Active" },
  { id:"LEC004", name:"Ramesh Naik", subject:"English", qualification:"M.A, B.Ed", phone:"9876500004", classes:"All Sections", status:"Active" }
];

const initialAdmissions = [
  { id:"ADM001", name:"Rahul Acharya", year:"First PUC", stream:"Science", previousSchool:"Government High School", phone:"9988776601", status:"Pending" },
  { id:"ADM002", name:"Pooja Nayak", year:"First PUC", stream:"Commerce", previousSchool:"National High School", phone:"9988776602", status:"Approved" },
  { id:"ADM003", name:"Vikas Shetty", year:"First PUC", stream:"Arts", previousSchool:"St. Mary's School", phone:"9988776603", status:"Under Review" }
];

const initialFees = [
  { id:"FEE001", student:"Aarav Shetty", category:"Tuition Fee", total:25000, paid:20000, due:5000, status:"Partial" },
  { id:"FEE002", student:"Ananya Rao", category:"Tuition Fee", total:22000, paid:22000, due:0, status:"Paid" },
  { id:"FEE003", student:"Kiran Poojary", category:"Tuition Fee", total:25000, paid:10000, due:15000, status:"Pending" },
  { id:"FEE004", student:"Priya Naik", category:"Tuition Fee", total:20000, paid:20000, due:0, status:"Paid" }
];

const initialBooks = [
  { id:"LIB001", title:"Concepts of Physics", author:"H.C. Verma", category:"Science", copies:12, issued:4, status:"Available" },
  { id:"LIB002", title:"Accountancy Fundamentals", author:"T.S. Grewal", category:"Commerce", copies:10, issued:3, status:"Available" },
  { id:"LIB003", title:"English Grammar", author:"Wren & Martin", category:"Language", copies:15, issued:8, status:"Available" },
  { id:"LIB004", title:"Indian History", author:"Bipin Chandra", category:"Arts", copies:8, issued:8, status:"Fully Issued" }
];

const initialAttendance = [
  { id:"ATT001", student:"Aarav Shetty", class:"I PUC Science A", date:"2026-11-06", status:"Present" },
  { id:"ATT002", student:"Ananya Rao", class:"II PUC Commerce A", date:"2026-11-06", status:"Present" },
  { id:"ATT003", student:"Kiran Poojary", class:"I PUC Science B", date:"2026-11-06", status:"Absent" },
  { id:"ATT004", student:"Priya Naik", class:"II PUC Arts A", date:"2026-11-06", status:"Present" }
];

const timetable = [
  ["09:00 - 09:50","English","Physics","Accountancy","History","Mathematics","Kannada"],
  ["09:50 - 10:40","Mathematics","Chemistry","Economics","Political Science","Physics","English"],
  ["10:40 - 11:00","BREAK","BREAK","BREAK","BREAK","BREAK","BREAK"],
  ["11:00 - 11:50","Physics","Mathematics","Business Studies","History","Chemistry","Economics"],
  ["11:50 - 12:40","Chemistry","English","Statistics","English","Biology","Accountancy"],
  ["12:40 - 01:30","LUNCH","LUNCH","LUNCH","LUNCH","LUNCH","LUNCH"],
  ["01:30 - 02:20","Biology","Computer Science","Economics","Sociology","English","Physical Education"]
];

const navGroups = [
  { title:"OVERVIEW", items:[["Dashboard",LayoutDashboard]] },
  { title:"ACADEMIC MANAGEMENT", items:[
    ["Admissions",FileText],["Students",Users],["Lecturers",GraduationCap],
    ["Streams & Classes",School],["Subjects",BookOpen],["Timetable",CalendarDays],
    ["Academic Management",CalendarDays],["Study Materials",BookOpen],["Attendance",ClipboardCheck],["Examinations",BookMarked],["Internal Assessment",ClipboardCheck],["Results",BarChart3]
  ]},
  { title:"ADMINISTRATION", items:[
    ["Fees",Wallet],["Library",BookMarked],["Transport",Bus],
    ["Hostel",BedDouble],["HR & Staff",BriefcaseBusiness]
  ]},
  { title:"MANAGEMENT", items:[
    ["Reports",BarChart3],["Notifications",Bell],["Grievances",AlertCircle],["Parents Portal",UserCheck],["Users & Roles",Users],["Role Portals",ShieldCheck],["Settings",Settings]
  ]}
];

const moduleData = {
  "Streams & Classes": [
    {id:"CLS001",name:"First PUC Science A",stream:"Science",year:"First PUC",students:42,mentor:"Dr. Meera Rao"},
    {id:"CLS002",name:"First PUC Commerce A",stream:"Commerce",year:"First PUC",students:38,mentor:"Anitha Shetty"},
    {id:"CLS003",name:"Second PUC Science A",stream:"Science",year:"Second PUC",students:40,mentor:"Dr. Meera Rao"},
    {id:"CLS004",name:"Second PUC Arts A",stream:"Arts",year:"Second PUC",students:32,mentor:"Ramesh Naik"}
  ],
  "Subjects": [
    {id:"SUB001",name:"Physics",code:"PHY",stream:"Science",lecturer:"Dr. Meera Rao"},
    {id:"SUB002",name:"Chemistry",code:"CHE",stream:"Science",lecturer:"Suresh Kumar"},
    {id:"SUB003",name:"Accountancy",code:"ACC",stream:"Commerce",lecturer:"Anitha Shetty"},
    {id:"SUB004",name:"Economics",code:"ECO",stream:"Commerce",lecturer:"Anitha Shetty"},
    {id:"SUB005",name:"History",code:"HIS",stream:"Arts",lecturer:"Ramesh Naik"}
  ],
  "Examinations": [
    {id:"EXM001",name:"First Internal Assessment",year:"First PUC",date:"2026-11-15",type:"Internal",status:"Scheduled"},
    {id:"EXM002",name:"Second Internal Assessment",year:"Second PUC",date:"2026-11-20",type:"Internal",status:"Scheduled"},
    {id:"EXM003",name:"Preparatory Examination",year:"Second PUC",date:"2027-01-10",type:"Preparatory",status:"Planned"}
  ],
  "Results": [
    {id:"RES001",student:"Aarav Shetty",exam:"First Internal",subject:"Physics",marks:88,maxMarks:100,grade:"A"},
    {id:"RES002",student:"Ananya Rao",exam:"First Internal",subject:"Accountancy",marks:92,maxMarks:100,grade:"A+"},
    {id:"RES003",student:"Kiran Poojary",exam:"First Internal",subject:"Mathematics",marks:76,maxMarks:100,grade:"B+"},
    {id:"RES004",student:"Priya Naik",exam:"First Internal",subject:"History",marks:85,maxMarks:100,grade:"A"}
  ],
  "Transport": [
    {id:"TRN001",vehicle:"KA-20-AB-1234",route:"Kundapura Route",driver:"Ravi",capacity:40,status:"Active"},
    {id:"TRN002",vehicle:"KA-20-CD-5678",route:"Byndoor Route",driver:"Mahesh",capacity:35,status:"Active"}
  ],
  "Hostel": [
    {id:"HST001",name:"Boys Hostel - Room 101",capacity:4,occupied:3,warden:"Ramesh",status:"Available"},
    {id:"HST002",name:"Girls Hostel - Room 201",capacity:4,occupied:4,warden:"Meera",status:"Full"}
  ],
  "HR & Staff": [
    {id:"HR001",name:"Ramesh Naik",role:"Office Administrator",phone:"9876500101",department:"Administration",status:"Active"},
    {id:"HR002",name:"Meera Rao",role:"Senior Lecturer",phone:"9876500102",department:"Science",status:"Active"}
  ],
  "Academic Management": [
    {id:"ACA001",title:"Annual Day",type:"Event",startDate:"2026-12-12",endDate:"2026-12-12"},
    {id:"ACA002",title:"Deepavali Holidays",type:"Holiday",startDate:"2026-11-08",endDate:"2026-11-11"},
    {id:"ACA003",title:"Second PUC Preparatory Examination",type:"Exam",startDate:"2027-01-10",endDate:"2027-01-20"}
  ],
  "Study Materials": [
    {id:"MAT001",title:"Kinematics Notes",subject:"Physics",year:"First PUC",type:"Notes",uploadedOn:"2026-10-28"},
    {id:"MAT002",title:"Journal Entries Practice Set",subject:"Accountancy",year:"Second PUC",type:"Question Paper",uploadedOn:"2026-10-30"},
    {id:"MAT003",title:"Indian Freedom Movement",subject:"History",year:"Second PUC",type:"Video",uploadedOn:"2026-11-02"}
  ],
  "Internal Assessment": [
    {id:"INT001",student:"Aarav Shetty",subject:"Physics",marks:26,term:"IA-1"},
    {id:"INT002",student:"Ananya Rao",subject:"Accountancy",marks:28,term:"IA-1"},
    {id:"INT003",student:"Kiran Poojary",subject:"Mathematics",marks:22,term:"IA-1"}
  ],
  "Notifications": [
    {id:"NOT001",title:"Internal Assessment timetable published",audience:"All",message:"See the Examinations page.",date:"2026-11-05"},
    {id:"NOT002",title:"Fee instalment reminder",audience:"Parents",message:"Second instalment is due this month.",date:"2026-11-04"},
    {id:"NOT003",title:"Parent-Teacher Meeting",audience:"Parents",message:"Scheduled for the last Saturday.",date:"2026-11-03"}
  ],
  "Grievances": [
    {id:"GRV001",title:"Bus timing issue",student:"Aarav Shetty",category:"Transport",status:"Open",date:"2026-11-03"},
    {id:"GRV002",title:"Fee receipt correction",student:"Ananya Rao",category:"Fees",status:"In Progress",date:"2026-11-02"}
  ],
  "Users & Roles": [
    {id:"USR001",name:"College Administrator",role:"Admin",username:"admin",status:"Active"},
    {id:"USR002",name:"Principal",role:"Principal",username:"principal",status:"Active"},
    {id:"USR003",name:"Dr. Meera Rao",role:"Lecturer",username:"meera.rao",status:"Active"}
  ],
  "Parents Portal": [
    {id:"PAR001",student:"Aarav Shetty",guardian:"Ramesh Shetty",phone:"9876543210",relation:"Father"},
    {id:"PAR002",student:"Ananya Rao",guardian:"Suresh Rao",phone:"9876543211",relation:"Father"},
    {id:"PAR003",student:"Kiran Poojary",guardian:"Mohan Poojary",phone:"9876543212",relation:"Father"}
  ]
};

const today = new Date().toISOString().slice(0,10);
const ROLES = ["Admin","Principal","Vice Principal","Office Administrator","Lecturer","Student","Parent","Accountant","Examination Coordinator","Librarian","Transport Administrator","Hostel Warden"];
const ACCESS = {
  "Admin":"all","Principal":"all","Vice Principal":"all",
  "Office Administrator":"-Users & Roles,Settings",
  "Lecturer":"Students,Attendance,Timetable,Subjects,Study Materials,Examinations,Internal Assessment,Results,Notifications,Grievances",
  "Student":"Timetable,Study Materials,Attendance,Results,Fees,Library,Notifications,Grievances",
  "Parent":"Attendance,Results,Fees,Notifications,Grievances,Parents Portal",
  "Accountant":"Fees,HR & Staff,Reports,Notifications",
  "Examination Coordinator":"Examinations,Internal Assessment,Results,Timetable,Reports,Notifications",
  "Librarian":"Library,Notifications","Transport Administrator":"Transport,Notifications","Hostel Warden":"Hostel,Students,Notifications"
};
const COMBOS = {Science:["PCMB","PCMC","PCME","PCMS"],Commerce:["CEBA","SEBA","HEBA","HEPS"],Arts:["HEPP","HEPS","HEBA"]};
const OPTS = {
  "Admissions.status":["Pending","Under Review","Approved","Rejected"],"Attendance.status":["Present","Absent","Leave"],
  "Examinations.status":["Scheduled","Planned","Completed"],"Examinations.type":["Internal","Preparatory","Final"],
  "Grievances.status":["Open","In Progress","Resolved"],"Grievances.category":["Academic","Fees","Transport","Hostel","Other"],
  "Users & Roles.status":["Active","Disabled"],"Users & Roles.role":ROLES,"Parents Portal.relation":["Father","Mother","Guardian"],
  "Study Materials.type":["Notes","Question Paper","Video"],"Notifications.audience":["All","First PUC","Second PUC","Parents","Staff"],
  "Academic Management.type":["Holiday","Exam","Event","Meeting"],"Internal Assessment.term":["IA-1","IA-2","IA-3"],
  "Study Materials.year":["First PUC","Second PUC"]
};
const NUM = ["total","paid","capacity","occupied","copies","issued","marks","maxMarks","students"];
const PER_PAGE = 6;

function readStore(key, fallback) {
  try {
    const value = localStorage.getItem("saptham_v2_" + key);
    return value ? JSON.parse(value) : fallback;
  } catch { return fallback; }
}

function saveStore(key, value) {
  try { localStorage.setItem("saptham_v2_" + key, JSON.stringify(value)); }
  catch { /* Demo storage unavailable */ }
}

function money(value) {
  return "₹" + Number(value || 0).toLocaleString("en-IN");
}

function Status({value}) {
  const v = String(value || "Active").toLowerCase();
  const cls = v.includes("paid") || v.includes("present") || v.includes("active") || v.includes("approved") || v.includes("available")
    ? "success" : v.includes("absent") || v.includes("pending") || v.includes("partial") || v.includes("review")
    ? "warning" : "neutral";
  return <span className={"status " + cls}>{value}</span>;
}

function App() {
  const [page,setPage] = useState("Dashboard");
  const [role,setRole] = useState("Admin");
  const [mobileOpen,setMobileOpen] = useState(false);
  const [query,setQuery] = useState("");
  const [modal,setModal] = useState(false);
  const [editing,setEditing] = useState(null);
  const [form,setForm] = useState({});
  const [notice,setNotice] = useState("");
  const [students,setStudents] = useState(()=>readStore("students",initialStudents));
  const [lecturers,setLecturers] = useState(()=>readStore("lecturers",initialLecturers));
  const [admissions,setAdmissions] = useState(()=>readStore("admissions",initialAdmissions));
  const [fees,setFees] = useState(()=>readStore("fees",initialFees));
  const [books,setBooks] = useState(()=>readStore("books",initialBooks));
  const [attendance,setAttendance] = useState(()=>readStore("attendance",initialAttendance));
  const [other,setOther] = useState(()=>readStore("other",moduleData));

  const [yearFilter,setYearFilter] = useState("All");
  const [streamFilter,setStreamFilter] = useState("All");
  const [pageNo,setPageNo] = useState(1);
  const [sort,setSort] = useState(null);
  const [confirmItem,setConfirmItem] = useState(null);
  const [activity,setActivity] = useState(()=>readStore("activity",[{text:"Demo data loaded",time:"Today"}]));
  const logAct = (text) => { const next=[{text,time:new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})},...activity].slice(0,20); setActivity(next); saveStore("activity",next); };

  const store = (key,value,setter) => {
    setter(value);
    saveStore(key,value);
  };

  const allData = {
    Students:students,
    Lecturers:lecturers,
    Admissions:admissions,
    Fees:fees,
    Library:books,
    Attendance:attendance,
    ...other
  };

  const configs = {
    Students:{title:"Student Management",desc:"Manage First PUC and Second PUC student records.",fields:[["name","Student Name"],["year","PUC Year"],["stream","Stream"],["combination","Combination"],["section","Section"],["phone","Phone"],["parent","Parent / Guardian"]]},
    Lecturers:{title:"Lecturer Management",desc:"Manage teaching staff and academic assignments.",fields:[["name","Lecturer Name"],["subject","Subject"],["qualification","Qualification"],["phone","Phone"],["classes","Assigned Classes"]]},
    Admissions:{title:"Admissions",desc:"Track applications and new student admissions.",fields:[["name","Applicant Name"],["year","PUC Year"],["stream","Preferred Stream"],["previousSchool","Previous School"],["phone","Phone"],["status","Application Status"]]},
    Fees:{title:"Fee Management",desc:"Monitor student fee collection and outstanding balances.",fields:[["student","Student Name"],["category","Fee Category"],["total","Total Fee"],["paid","Paid Amount"],["due","Due Amount"],["status","Payment Status"]]},
    Library:{title:"Library Management",desc:"Manage books, availability and circulation.",fields:[["title","Book Title"],["author","Author"],["category","Category"],["copies","Total Copies"],["issued","Issued Copies"]]},
    Attendance:{title:"Attendance Management",desc:"Record daily attendance and monitor student presence.",fields:[["student","Student Name"],["class","Class"],["date","Date"],["status","Attendance Status"]]},
    "Streams & Classes":{title:"Streams & Classes",desc:"Manage PU years, streams, sections and class strength.",fields:[["name","Class Name"],["stream","Stream"],["year","PUC Year"],["students","Student Strength"],["mentor","Class Mentor"]]},
    Subjects:{title:"Subject Management",desc:"Configure subjects and lecturer assignments.",fields:[["name","Subject"],["code","Subject Code"],["stream","Stream"],["lecturer","Lecturer"]]},
    Examinations:{title:"Examination Management",desc:"Schedule internal, preparatory and final examinations.",fields:[["name","Examination"],["year","PUC Year"],["date","Date"],["type","Exam Type"],["status","Status"]]},
    Results:{title:"Marks & Results",desc:"Review subject-wise performance and examination results.",fields:[["student","Student"],["exam","Examination"],["subject","Subject"],["marks","Marks Obtained"],["maxMarks","Maximum Marks"],["grade","Grade"]]},
    Transport:{title:"Transport Management",desc:"Manage college vehicles, routes and drivers.",fields:[["vehicle","Vehicle Number"],["route","Route"],["driver","Driver"],["capacity","Capacity"]]},
    Hostel:{title:"Hostel Management",desc:"Manage hostel rooms, occupancy and wardens.",fields:[["name","Room"],["capacity","Capacity"],["occupied","Occupied"],["warden","Warden"]]},
    "Academic Management":{title:"Academic Management",desc:"Academic year calendar, holidays and events.",fields:[["title","Title"],["type","Type"],["startDate","Start Date"],["endDate","End Date"]]},
    "Study Materials":{title:"Study Materials",desc:"Notes, question papers and videos shared with classes.",fields:[["title","Title"],["subject","Subject"],["year","PUC Year"],["type","Type"],["uploadedOn","Uploaded On"]]},
    "Internal Assessment":{title:"Internal Assessment",desc:"Internal marks out of 30 for each term.",fields:[["student","Student"],["subject","Subject"],["marks","Marks (out of 30)"],["term","Term"]]},
    "Notifications":{title:"Notifications",desc:"Announcements for students, parents and staff (simulated).",fields:[["title","Title"],["audience","Audience"],["message","Message"],["date","Date"]]},
    "Grievances":{title:"Grievances",desc:"Track and resolve student and parent grievances.",fields:[["title","Title"],["student","Student"],["category","Category"],["status","Status"],["date","Date"]]},
    "Users & Roles":{title:"Users & Roles",desc:"Demo users and their roles. Frontend-only permissions.",fields:[["name","Name"],["role","Role"],["username","Username"],["status","Status"]]},
    "Parents Portal":{title:"Parents Portal",desc:"Guardian records linked to students.",fields:[["student","Student"],["guardian","Guardian"],["phone","Phone"],["relation","Relation"]]},
    "HR & Staff":{title:"HR & Staff",desc:"Manage non-teaching staff and employee records.",fields:[["name","Employee Name"],["role","Designation"],["phone","Phone"],["department","Department"]]}
  };

  const data = allData[page] || [];
  const canSeeFor = (r,n) => { const a=ACCESS[r]; return n==="Dashboard"||a==="all"||(a[0]==="-"?!a.slice(1).split(",").includes(n):a.split(",").includes(n)); };
  const canSee = (n) => canSeeFor(role,n);
  const readOnly = ["Student","Parent"].includes(role) && page!=="Grievances";
  const switchRole = (r) => { setRole(r); if(!canSeeFor(r,page)) setPage("Dashboard"); setMobileOpen(false); };
  const me = students[0]?.name;
  const filtered = useMemo(()=>{
    const f = data.filter(item=>{
      const matches = Object.values(item).join(" ").toLowerCase().includes(query.toLowerCase());
      const yearOK = yearFilter==="All" || item.year===yearFilter;
      const streamOK = streamFilter==="All" || item.stream===streamFilter;
      const mine = !["Student","Parent"].includes(role) || !("student" in item) || item.student===me;
      return matches && yearOK && streamOK && mine;
    });
    return sort ? [...f].sort((a,b)=>String(a[sort.k]??"").localeCompare(String(b[sort.k]??""),undefined,{numeric:true})*sort.d) : f;
  },[data,query,yearFilter,streamFilter,sort,role,me]);
  const pages = Math.max(1,Math.ceil(filtered.length/PER_PAGE));
  const curPage = Math.min(pageNo,pages);
  const pageRows = filtered.slice((curPage-1)*PER_PAGE,curPage*PER_PAGE);
  const optsFor = (key,f) => {
    if(OPTS[page+"."+key]) return OPTS[page+"."+key];
    if(key==="year") return ["First PUC","Second PUC"];
    if(key==="stream") return ["Science","Commerce","Arts"];
    if(key==="section") return ["A","B","C"];
    if(key==="combination") return COMBOS[f.stream||"Science"];
    if(key==="student") return students.map(s=>s.name);
    return null;
  };
  const fieldInput = (key,label) => {
    const v = form[key]??"", set = (val)=>setForm(f=>({...f,[key]:val}));
    const o = optsFor(key,form);
    if(o) return <select aria-label={label} value={o.includes(v)?v:o[0]} onChange={e=>key==="stream"?setForm(f=>({...f,stream:e.target.value,combination:COMBOS[e.target.value][0]})):set(e.target.value)}>{o.map(x=><option key={x}>{x}</option>)}</select>;
    const isDate = key==="date"||/On$|^start|^end/.test(key), num = NUM.includes(key);
    return <input aria-label={label} required type={isDate?"date":num?"number":"text"} min={num?0:undefined} pattern={key==="phone"?"[0-9]{10}":undefined} title={key==="phone"?"Enter a 10-digit mobile number":undefined} value={v} placeholder={`Enter ${label.toLowerCase()}`} onChange={e=>set(e.target.value)}/>;
  };

  const totalFees = fees.reduce((s,f)=>s+Number(f.total||0),0);
  const collectedFees = fees.reduce((s,f)=>s+Number(f.paid||0),0);
  const presentCount = attendance.filter(a=>a.status==="Present").length;
  const attendanceRate = attendance.length ? Math.round(presentCount/attendance.length*100) : 0;

  const notify = (message) => {
    setNotice(message);
    setTimeout(()=>setNotice(""),2600);
  };

  const startAdd = () => {
    setEditing(null);
    setForm({});
    setModal(true);
  };

  const startEdit = (item) => {
    setEditing(item);
    setForm({...item});
    setModal(true);
  };

  const commit = (pg,list) => {
    if(pg==="Students") store("students",list,setStudents);
    else if(pg==="Lecturers") store("lecturers",list,setLecturers);
    else if(pg==="Admissions") store("admissions",list,setAdmissions);
    else if(pg==="Fees") store("fees",list,setFees);
    else if(pg==="Library") store("books",list,setBooks);
    else if(pg==="Attendance") store("attendance",list,setAttendance);
    else store("other",{...other,[pg]:list},setOther);
  };
  const LINKED = ["Results","Internal Assessment","Grievances","Parents Portal"];

  const saveRecord = (e) => {
    e.preventDefault();
    const keys = pageConfig.fields.map(([k])=>k).filter(k=>!(page==="Fees"&&["due","status"].includes(k)));
    const m = {...form};
    keys.forEach(k=>{ const o=optsFor(k,m); if(o&&!o.includes(m[k])) m[k]=o[0]; if(NUM.includes(k)) m[k]=Number(m[k]); });
    if(page==="Internal Assessment"&&m.marks>30) return notify("Internal marks cannot exceed 30");
    if(page==="Fees"&&m.paid>m.total) return notify("Paid amount cannot exceed total fee");
    if(page==="Library"&&m.issued>m.copies) return notify("Issued copies cannot exceed total copies");
    if(page==="Fees"){ m.due=Math.max(m.total-m.paid,0); m.status=m.due===0?"Paid":m.paid>0?"Partial":"Pending"; }
    const uid = Date.now().toString().slice(-6)+Math.floor(Math.random()*90+10);
    const id = editing?.id || `${page.replace(/[^A-Za-z]/g,"").slice(0,3).toUpperCase()}${uid}`;
    const record = {...editing,...m,id};
    commit(page, editing ? data.map(x=>x.id===editing.id?record:x) : [...data,record]);
    if(page==="Students"&&!editing){
      store("fees",[...fees,{id:"FEE"+uid,student:record.name,category:"Tuition + Lab",total:25000,paid:0,due:25000,status:"Pending"}],setFees);
      store("attendance",[...attendance,{id:"ATT"+uid,student:record.name,class:`${record.year} ${record.stream} ${record.section}`,date:today,status:"Present"}],setAttendance);
      store("other",{...other,"Parents Portal":[...(other["Parents Portal"]||[]),{id:"PAR"+uid,student:record.name,guardian:record.parent,phone:record.phone,relation:"Guardian"}]},setOther);
    }
    if(page==="Students"&&editing&&editing.name!==record.name){
      const ren = (list)=>list.map(r=>r.student===editing.name?{...r,student:record.name}:r);
      store("fees",ren(fees),setFees); store("attendance",ren(attendance),setAttendance);
      store("other",Object.fromEntries(Object.entries(other).map(([k,v])=>[k,LINKED.includes(k)?ren(v):v])),setOther);
    }
    logAct(`${editing?"Updated":"Added"} ${page} record: ${record.name||record.title||record.student||record.vehicle||id}`);
    setModal(false);
    notify(editing ? "Record updated successfully" : "New record added successfully");
  };

  const deleteRecord = (item) => setConfirmItem(item);
  const doDelete = () => {
    const item = confirmItem; setConfirmItem(null);
    commit(page, data.filter(x=>x.id!==item.id));
    if(page==="Students"){
      const keep = (list)=>list.filter(r=>r.student!==item.name);
      store("fees",keep(fees),setFees); store("attendance",keep(attendance),setAttendance);
      store("other",Object.fromEntries(Object.entries(other).map(([k,v])=>[k,LINKED.includes(k)?keep(v):v])),setOther);
    }
    logAct(`Deleted ${page} record: ${item.name||item.title||item.student||item.id}`);
    notify("Record deleted");
  };

  const exportCSV = () => {
    if(!filtered.length) return notify("No records to export");
    const keys = Object.keys(filtered[0]);
    const csv = [keys.join(","),...filtered.map(row=>keys.map(k=>`"${String(row[k]??"").replaceAll('"','""')}"`).join(","))].join("\n");
    const url = URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
    const a = document.createElement("a");
    a.href=url; a.download=`saptham-${page.toLowerCase().replace(/[^a-z]+/g,"-")}.csv`; a.click();
    URL.revokeObjectURL(url);
    notify("CSV export downloaded");
  };

  const go = (name) => {
    setPage(name);
    setQuery("");
    setYearFilter("All");
    setStreamFilter("All");
    setMobileOpen(false);
    setPageNo(1);
    setSort(null);
  };

  const pageIcon = (name) => {
    const found = navGroups.flatMap(g=>g.items).find(i=>i[0]===name);
    return found ? found[1] : FileText;
  };

  const PageIcon = pageIcon(page);
  const pageConfig = configs[page];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen?"mobile-visible":""}`}>
        <div className="brand">
          <div className="brand-logo">
            <img src="/saptham-logo.png" alt="Saptham PU College" onError={e=>{e.currentTarget.style.display="none";}} />
            <School size={26}/>
          </div>
          <div><strong>SAPTHAM</strong><span>PU COLLEGE ERP</span></div>
          <button className="mobile-close" onClick={()=>setMobileOpen(false)}><X/></button>
        </div>
        <div className="college-chip"><span className="live-dot"></span> Academic Portal <span className="chip-year">2026–27</span></div>
        <nav className="navigation">
          {navGroups.map(g=>({...g,items:g.items.filter(([n])=>canSee(n))})).filter(g=>g.items.length).map(group=><div className="nav-group" key={group.title}>
            <div className="nav-label">{group.title}</div>
            {group.items.map(([name,Icon])=><button key={name} className={`nav-item ${page===name?"active":""}`} onClick={()=>go(name)}>
              <Icon size={18}/><span>{name}</span>{page===name&&<span className="nav-indicator"/>}
            </button>)}
          </div>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="support-card"><ShieldCheck size={20}/><div><b>College workspace</b><span>Demo environment</span></div></div>
          <div className="user-mini"><div className="avatar">{role.slice(0,2).toUpperCase()}</div><div><b>{role}</b><span>Demo role</span></div><ChevronDown size={16}/></div>
        </div>
      </aside>

      {mobileOpen&&<div className="mobile-overlay" onClick={()=>setMobileOpen(false)}/>}

      <main className="main-area">
        <header className="topbar">
          <div className="top-left">
            <button className="menu-toggle" onClick={()=>setMobileOpen(true)}><Menu/></button>
            <div className="breadcrumb">Saptham PU College <span>/</span> <b>{page}</b></div>
          </div>
          <div className="top-actions">
            <div className="global-search"><Search size={17}/><input placeholder="Search this page..." value={query} onChange={e=>setQuery(e.target.value)}/><kbd>⌘ K</kbd></div>
            <select className="role-select" aria-label="Switch role" value={role} onChange={e=>switchRole(e.target.value)}>{ROLES.map(r=><option key={r}>{r}</option>)}</select>
            <button className="icon-button notification-button" title="Notifications" onClick={()=>notify("You are all caught up")}><Bell size={19}/><i/></button>
            <div className="top-user"><div className="avatar">{role.slice(0,2).toUpperCase()}</div><div><b>{role}</b><span>Demo user</span></div></div>
          </div>
        </header>

        <div className="page-content">
          {page==="Dashboard" ? (
            <>
              <div className="welcome-row">
                <div><div className="eyebrow">FRIDAY, 06 NOVEMBER 2026</div><h1>Welcome, {role}</h1><p>Here's what's happening at Saptham PU College today.</p></div>
                <button className="primary-button" onClick={()=>go("Admissions")}><Plus size={17}/> New Admission</button>
              </div>
              <div className="stats-grid">
                <Stat icon={Users} label="Total Students" value={students.length.toLocaleString("en-IN")} note="Across both PUC years" trend="Live"/>
                <Stat icon={GraduationCap} label="Teaching Staff" value={lecturers.length} note="Active lecturers" trend="Active"/>
                <Stat icon={ClipboardCheck} label="Today's Attendance" value={`${attendanceRate}%`} note={`${presentCount} present records`} trend="Live"/>
                <Stat icon={IndianRupee} label="Fees Collected" value={money(collectedFees)} note={`${money(Math.max(totalFees-collectedFees,0))} outstanding`} trend={`${totalFees?Math.round(collectedFees/totalFees*100):0}%`}/>
              </div>
              <div className="stats-grid">
                <Stat icon={Users} label="First PUC Strength" value={students.filter(x=>x.year==="First PUC").length} note="Students enrolled" trend="I PUC"/>
                <Stat icon={Users} label="Second PUC Strength" value={students.filter(x=>x.year==="Second PUC").length} note="Students enrolled" trend="II PUC"/>
                <Stat icon={FileText} label="Pending Admissions" value={admissions.filter(a=>["Pending","Under Review"].includes(a.status)).length} note="Awaiting decision" trend="Open"/>
                <Stat icon={BookMarked} label="Upcoming Examinations" value={(other.Examinations||[]).filter(x=>x.date>=today).length} note="Scheduled ahead" trend="Exams"/>
              </div>
              <div className="dashboard-grid">
                <section className="panel stream-panel">
                  <div className="panel-heading"><div><h3>Student Overview</h3><p>Distribution across academic streams</p></div><span className="subtle-tag">2026–27</span></div>
                  {["Science","Commerce","Arts"].map((stream,i)=>{
                    const count=students.filter(s=>s.stream===stream).length;
                    const pct=students.length?count/students.length*100:0;
                    return <div className="stream-row" key={stream}><div className={`stream-icon stream-${i}`}>{i===0?"S":i===1?"C":"A"}</div><div className="stream-info"><div><b>{stream}</b><span>{count} students</span></div><div className="progress-track"><div style={{width:`${pct}%`}} className={`progress-fill fill-${i}`}/></div></div><strong>{Math.round(pct)}%</strong></div>
                  })}
                  <div className="panel-foot"><span>Total enrolled</span><b>{students.length} students</b></div>
                </section>
                <section className="panel attendance-panel">
                  <div className="panel-heading"><div><h3>Attendance Snapshot</h3><p>Today's recorded attendance</p></div><span className="live-label"><i/> TODAY</span></div>
                  <div className="attendance-ring" style={{"--percentage":`${attendanceRate}%`}}><div><strong>{attendanceRate}%</strong><span>Present</span></div></div>
                  <div className="attendance-legend"><span><i className="dot-green"/> Present <b>{presentCount}</b></span><span><i className="dot-red"/> Absent <b>{attendance.length-presentCount}</b></span></div>
                  <button className="text-button" onClick={()=>go("Attendance")}>View attendance <ArrowUpRight size={15}/></button>
                </section>
                <section className="panel fee-panel">
                  <div className="panel-heading"><div><h3>Fee Collection</h3><p>Academic year 2026–27</p></div><Wallet size={20}/></div>
                  <div className="fee-total">{money(collectedFees)}</div><span className="muted">Collected out of {money(totalFees)}</span>
                  <div className="progress-track fee-progress"><div className="progress-fill" style={{width:`${totalFees?collectedFees/totalFees*100:0}%`}}/></div>
                  <div className="fee-split"><div><span>Collected</span><b>{totalFees?Math.round(collectedFees/totalFees*100):0}%</b></div><div><span>Outstanding</span><b>{money(Math.max(totalFees-collectedFees,0))}</b></div></div>
                  <button className="text-button" onClick={()=>go("Fees")}>View fee records <ArrowUpRight size={15}/></button>
                </section>
                <section className="panel activity-panel">
                  <div className="panel-heading"><div><h3>Recent Activity</h3><p>Latest college updates</p></div><Clock size={19}/></div>
                  {[...activity.slice(0,5).map(a=>[a.text,"Recent change",a.time,"blue"])].map((a,i)=><div className="activity-row" key={i}><div className={`activity-icon ${a[3]}`}><CheckCircle size={16}/></div><div><b>{a[0]}</b><span>{a[1]}</span></div><time>{a[2]}</time></div>)}
                </section>
              </div>
              <section className="panel quick-panel"><div className="panel-heading"><div><h3>Quick Access</h3><p>Frequently used college operations</p></div></div><div className="quick-grid">
                {[[Users,"Students","Manage student profiles"],[ClipboardCheck,"Attendance","Mark daily attendance"],[BookMarked,"Examinations","Manage examinations"],[Wallet,"Fees","Track fee payments"]].map(([Icon,name,desc])=><button className="quick-item" key={name} onClick={()=>go(name)}><span><Icon size={21}/></span><b>{name}</b><small>{desc}</small><ArrowUpRight size={15}/></button>)}
              </div></section>
            </>
          ) : page==="Timetable" ? (
            <>
              <PageHeading icon={CalendarDays} title="Class Timetable" desc="Weekly academic schedule for Saptham PU College." action={<button className="primary-button" onClick={()=>notify("Timetable demo is ready for editing in the next phase")}><Pencil size={16}/> Edit Timetable</button>}/>
              <div className="panel table-panel"><div className="table-toolbar"><b>First PUC · Science A</b><span className="subtle-tag">Monday – Saturday</span></div><div className="table-scroll"><table><thead><tr>{["Time","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(x=><th key={x}>{x}</th>)}</tr></thead><tbody>{timetable.map((row,i)=><tr key={i}>{row.map((v,j)=><td key={j}><span className={v==="BREAK"||v==="LUNCH"?"break-cell":""}>{v}</span></td>)}</tr>)}</tbody></table></div></div>
            </>
          ) : page==="Reports" ? (
            <>
              <PageHeading icon={BarChart3} title="Reports & Analytics" desc="College performance and administrative summaries."/>
              <div className="stats-grid"><Stat icon={Users} label="Student Strength" value={students.length} note="All streams"/><Stat icon={ClipboardCheck} label="Attendance Rate" value={`${attendanceRate}%`} note="Based on records"/><Stat icon={IndianRupee} label="Fee Collection" value={money(collectedFees)} note="Demo records"/><Stat icon={GraduationCap} label="Lecturers" value={lecturers.length} note="Active records"/></div>
              <section className="panel table-panel"><div className="panel-heading"><div><h3>Report exports</h3><p>Download available data as CSV files.</p></div></div><div className="report-actions">{["Students","Lecturers","Admissions","Attendance","Fees","Library"].map(n=><button key={n} className="report-card" onClick={()=>{go(n);setTimeout(exportCSV,100);}}><FileText/><b>{n} Report</b><span>Export CSV <Download size={14}/></span></button>)}</div></section>
            </>
          ) : page==="Role Portals" ? (
            <>
              <PageHeading icon={ShieldCheck} title="Role Portals" desc="Preview the application with different demo user roles."/>
              <section className="panel role-panel"><h3>Choose a demo role</h3><p>Switch the role preview to explore role-specific access. This is demo-only access control.</p><div className="role-grid">{ROLES.map((r,i)=><button key={r} onClick={()=>{switchRole(r);notify(`${r} demo view selected`);}} className={`role-card ${role===r?"role-selected":""}`}><div className="role-avatar">{r[0]}</div><b>{r}</b><span>{["Full demo access","College overview","Classes and marks","Academic profile","Child progress","Fee operations"][i]}</span>{role===r&&<CheckCircle size={17}/>}</button>)}</div><div className="role-current"><ShieldCheck size={19}/> Current demo role: <b>{role}</b></div></section>
            </>
          ) : page==="Settings" ? (
            <>
              <PageHeading icon={Settings} title="College Settings" desc="College identity and academic configuration."/>
              <section className="panel settings-panel"><h3>Institution profile</h3><div className="settings-form"><label>College name<input defaultValue="Saptham PU College"/></label><label>Academic year<input defaultValue="2026–2027"/></label><label>Institution type<input value="Pre-University College" readOnly/></label><label>Location<input placeholder="Enter college address"/></label><label>Contact email<input placeholder="office@saptham.edu.in"/></label><label>Contact number<input placeholder="Enter college phone number"/></label></div><button className="primary-button" onClick={()=>notify("Demo settings saved for this session")}>Save settings</button><p className="muted settings-note">Demo settings are not connected to a production server.</p></section>
            </>
          ) : page==="HR & Staff" || page==="Hostel" || page==="Transport" || page==="Streams & Classes" || page==="Subjects" || page==="Examinations" || page==="Results" || pageConfig ? (
            <>
              <PageHeading icon={PageIcon} title={pageConfig?.title||page} desc={pageConfig?.desc||"Manage college records and operations."} action={readOnly?null:<button className="primary-button" onClick={startAdd}><Plus size={17}/> Add New</button>}/>
              <div className="module-summary">
                <div className="summary-box"><span>Total Records</span><b>{data.length}</b></div>
                <div className="summary-box"><span>Academic Year</span><b>2026–27</b></div>
                <div className="summary-box"><span>Current Role</span><b>{role}</b></div>
              </div>
              <section className="panel table-panel">
                <div className="table-toolbar">
                  <div><b>{page} Records</b><span>{filtered.length} records found</span></div>
                  <div className="table-filters">
                    {(page==="Students"||page==="Admissions")&&<select value={yearFilter} onChange={e=>setYearFilter(e.target.value)}><option>All</option><option>First PUC</option><option>Second PUC</option></select>}
                    {(page==="Students"||page==="Admissions"||page==="Streams & Classes"||page==="Subjects")&&<select value={streamFilter} onChange={e=>setStreamFilter(e.target.value)}><option>All</option><option>Science</option><option>Commerce</option><option>Arts</option></select>}
                    <button className="secondary-button" onClick={exportCSV}><Download size={15}/> Export CSV</button>
                    <button className="secondary-button" onClick={()=>window.print()}>Print</button>
                  </div>
                </div>
                <div className="table-scroll">
                  <table>
                    <thead><tr><th>ID</th>{(pageConfig?.fields||[]).map(([key,label])=><th key={key} className="sortable" onClick={()=>setSort(s0=>s0&&s0.k===key?{k:key,d:-s0.d}:{k:key,d:1})}>{label}{sort?.k===key?(sort.d>0?" ▲":" ▼"):""}</th>)}<th>Actions</th></tr></thead>
                    <tbody>
                      {pageRows.map(item=><tr key={item.id}>
                        <td><span className="record-id">{item.id}</span></td>
                        {(pageConfig?.fields||[]).map(([key])=><td key={key}>{key==="status"?<Status value={item[key]}/>:key==="attendance"?`${item[key]}%`:key==="due"||key==="paid"||key==="total"?money(item[key]):item[key]??"—"}</td>)}
                        <td>{readOnly?<span className="muted">View only</span>:<div className="row-actions"><button title="Edit record" aria-label="Edit record" onClick={()=>startEdit(item)}><Pencil size={15}/></button><button title="Delete record" aria-label="Delete record" onClick={()=>deleteRecord(item)}><Trash2 size={15}/></button></div>}</td>
                      </tr>)}
                      {!filtered.length&&<tr><td colSpan={(pageConfig?.fields?.length||0)+2}><div className="empty-state"><Search size={25}/><b>No records found</b><span>Try changing your search or add a new record.</span></div></td></tr>}
                    </tbody>
                  </table>
                </div>
                <div className="pager"><span>Page {curPage} of {pages}</span><button className="secondary-button" aria-label="Previous page" disabled={curPage<=1} onClick={()=>setPageNo(curPage-1)}>Previous</button><button className="secondary-button" aria-label="Next page" disabled={curPage>=pages} onClick={()=>setPageNo(curPage+1)}>Next</button></div>
              </section>
            </>
          ) : (
            <div className="empty-module panel"><AlertCircle size={30}/><h2>Module not found</h2><p>Select a module from the sidebar.</p><button className="primary-button" onClick={()=>go("Dashboard")}>Back to dashboard</button></div>
          )}
          <footer className="footer"><span>© 2026 Saptham PU College</span><span>Smart Academic & Campus Management System <i/> Demo frontend</span></footer>
        </div>
      </main>

      {modal&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setModal(false);}}><form className="record-modal" onSubmit={saveRecord}>
        <div className="modal-head"><div><span className="eyebrow">{editing?"UPDATE RECORD":"CREATE RECORD"}</span><h2>{editing?"Edit":"Add"} {page.replace("Management","").replace("&","and")}</h2></div><button type="button" className="icon-button" onClick={()=>setModal(false)}><X/></button></div>
        <div className="modal-fields">{(pageConfig?.fields||[]).filter(([k])=>!(page==="Fees"&&["due","status"].includes(k))).map(([key,label])=><label key={key}>{label}{fieldInput(key,label)}</label>)}</div>
        <div className="modal-actions"><button type="button" className="secondary-button" onClick={()=>setModal(false)}>Cancel</button><button className="primary-button" type="submit"><CheckCircle size={16}/> Save Record</button></div>
      </form></div>}
      {confirmItem&&<div className="modal-backdrop"><div className="record-modal" role="dialog" aria-label="Confirm delete"><div className="modal-head"><div><span className="eyebrow">CONFIRM</span><h2>Delete this record?</h2></div></div><p>{confirmItem.name||confirmItem.title||confirmItem.student||confirmItem.id} will be removed{page==="Students"?" along with the linked fee, attendance, result and parent records":""}.</p><div className="modal-actions"><button className="secondary-button" onClick={()=>setConfirmItem(null)}>Cancel</button><button className="primary-button danger" onClick={doDelete}>Delete</button></div></div></div>}
      {notice&&<div className="toast"><CheckCircle size={17}/>{notice}</div>}
    </div>
  );
}

function Stat({icon:Icon,label,value,note,trend}) {
  return <div className="stat-card"><div className="stat-top"><span className="stat-icon"><Icon size={20}/></span><span className="stat-trend">{trend}</span></div><div className="stat-value">{value}</div><div className="stat-label">{label}</div><div className="stat-note">{note}</div></div>;
}

function PageHeading({icon:Icon,title,desc,action}) {
  return <div className="page-heading"><div className="page-heading-title"><span className="heading-icon"><Icon size={22}/></span><div><h1>{title}</h1><p>{desc}</p></div></div>{action}</div>;
}

export default App;

import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
