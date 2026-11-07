// Alya's ERP demo dataset. This folder can be removed/replaced when live APIs are connected.
// All records are fictional examples for frontend testing only.
export const departments = [
  { name: 'CSE', attendance: 84.1, students: 1020, courses: 52, submitted: 50, locked: 41 },
  { name: 'ISE', attendance: 82.7, students: 780, courses: 44, submitted: 43, locked: 35 },
  { name: 'AI and ML', attendance: 86.3, students: 420, courses: 38, submitted: 37, locked: 32 },
  { name: 'ECE', attendance: 79.5, students: 520, courses: 46, submitted: 41, locked: 30 },
  { name: 'EEE', attendance: 74.2, students: 310, courses: 38, submitted: 33, locked: 24 },
  { name: 'Mechanical', attendance: 71.8, students: 360, courses: 45, submitted: 39, locked: 28 },
  { name: 'Civil', attendance: 76.9, students: 200, courses: 38, submitted: 33, locked: 24 },
];

export const exams = [
  { date: 'Mon 2 Nov', time: '10:00–11:00', course: 'CS501 · Operating Systems', department: 'CSE', rooms: 'A-201 to A-206', status: 'Scheduled' },
  { date: 'Mon 2 Nov', time: '14:00–15:00', course: 'EC503 · Digital Signal Processing', department: 'ECE', rooms: 'B-101 to B-105', status: 'Scheduled' },
  { date: 'Tue 3 Nov', time: '10:00–11:00', course: 'ME501 · Heat Transfer', department: 'Mechanical', rooms: 'C-102 to C-104', status: 'Paper pending' },
  { date: 'Tue 3 Nov', time: '14:00–15:00', course: 'CV501 · Structural Analysis', department: 'Civil', rooms: 'C-201 to C-203', status: 'Scheduled' },
  { date: 'Wed 4 Nov', time: '10:00–11:00', course: 'IS503 · Software Engineering', department: 'ISE', rooms: 'A-301 to A-304', status: 'Duty roster draft' },
  { date: 'Wed 4 Nov', time: '14:00–15:00', course: 'AM502 · Machine Learning', department: 'AI and ML', rooms: 'A-205, A-206', status: 'Rooms unconfirmed' },
  { date: 'Thu 5 Nov', time: '10:00–11:00', course: 'CS502 · Database Systems', department: 'CSE', rooms: 'A-101 to A-104', status: 'Scheduled' },
  { date: 'Thu 5 Nov', time: '14:00–15:00', course: 'IS504 · Computer Networks', department: 'ISE', rooms: 'B-201 to B-204', status: 'Scheduled' },
];

const studentNames = [
  ['Aarav Shetty','CSE','5','A'],['Ananya Rao','ISE','5','B'],['Rohan Kumar','AI and ML','3','A'],
  ['Diya Bhat','ECE','7','A'],['Kiran Poojary','CSE','5','C'],['Meera Hegde','Mechanical','3','B'],
  ['Nikhil Rao','Civil','7','A'],['Sana Ahmed','EEE','5','B'],['Aditya Pai','CSE','3','A'],
  ['Isha Nayak','ISE','7','B'],['Vikram Shetty','AI and ML','5','A'],['Pooja Acharya','ECE','3','C'],
  ['Rahul Devadiga','Mechanical','7','A'],['Sneha Kamath','Civil','5','B'],['Arjun Rao','EEE','3','A'],
  ['Tanvi Bhat','CSE','7','B'],['Siddharth Naik','ISE','3','A'],['Aditi Kulal','AI and ML','7','C'],
  ['Varun Hegde','ECE','5','A'],['Nisha Shetty','Mechanical','5','B'],['Manoj Poojary','Civil','3','A'],
  ['Keerthi Rao','EEE','7','B'],['Pranav Bhat','CSE','1','A'],['Shreya Pai','ISE','1','B'],
  ['Yash Nayak','AI and ML','1','A'],['Riya Acharya','ECE','1','C'],['Dhanush Kamath','Mechanical','1','A'],
  ['Maya Devadiga','Civil','1','B'],['Joel Dsouza','EEE','1','A'],['Asha Naik','CSE','5','B'],
  ['Naveen Shetty','ISE','5','A'],['Bhavana Rao','AI and ML','3','B'],['Harish Bhat','ECE','7','C'],
  ['Sanjana Poojary','Mechanical','3','A'],['Tejas Kamath','Civil','7','B'],['Anil Pai','EEE','5','C']
];
export const initialStudents = studentNames.map(([name, dept, semester, section], i) => ({
  id: `SV${2401 + i}`, name, dept, semester, section,
  email: `${name.toLowerCase().replace(/[^a-z ]/g,'').trim().replace(/\s+/g,'.')}@svit.edu`,
  status: i === 3 ? 'Pending' : i === 5 ? 'Inactive' : 'Active'
}));

export const facultyRecords = [
  {id:'FAC101',name:'Dr. Kavitha Rao',dept:'CSE',semester:'',section:'',email:'kavitha.rao@svit.edu',status:'Active'},
  {id:'FAC102',name:'Prof. Suresh Bhat',dept:'ISE',semester:'',section:'',email:'suresh.bhat@svit.edu',status:'Active'},
  {id:'FAC103',name:'Dr. Meenal Pai',dept:'AI and ML',semester:'',section:'',email:'meenal.pai@svit.edu',status:'Active'},
  {id:'FAC104',name:'Prof. Raghav Shetty',dept:'ECE',semester:'',section:'',email:'raghav.shetty@svit.edu',status:'Active'},
  {id:'FAC105',name:'Dr. Anita Hegde',dept:'EEE',semester:'',section:'',email:'anita.hegde@svit.edu',status:'Active'},
  {id:'FAC106',name:'Prof. Naveen Acharya',dept:'Mechanical',semester:'',section:'',email:'naveen.acharya@svit.edu',status:'Pending'},
  {id:'FAC107',name:'Dr. Shalini Kamath',dept:'Civil',semester:'',section:'',email:'shalini.kamath@svit.edu',status:'Active'},
  {id:'FAC108',name:'Prof. Vinay Nayak',dept:'CSE',semester:'',section:'',email:'vinay.nayak@svit.edu',status:'Active'},
  {id:'FAC109',name:'Dr. Farah Ahmed',dept:'ISE',semester:'',section:'',email:'farah.ahmed@svit.edu',status:'Active'},
  {id:'FAC110',name:'Prof. Mahesh Kulal',dept:'AI and ML',semester:'',section:'',email:'mahesh.kulal@svit.edu',status:'Inactive'},
  {id:'FAC111',name:'Dr. Ritu Dsouza',dept:'ECE',semester:'',section:'',email:'ritu.dsouza@svit.edu',status:'Active'},
  {id:'FAC112',name:'Prof. Ajay Devadiga',dept:'Mechanical',semester:'',section:'',email:'ajay.devadiga@svit.edu',status:'Active'},
];

export const courses = [
  {id:'CS501',title:'Operating Systems',dept:'CSE',semester:'5',credits:4,faculty:'Dr. Kavitha Rao'},
  {id:'CS502',title:'Database Systems',dept:'CSE',semester:'5',credits:4,faculty:'Prof. Vinay Nayak'},
  {id:'CS503',title:'Computer Networks',dept:'CSE',semester:'5',credits:3,faculty:'Dr. Kavitha Rao'},
  {id:'IS503',title:'Software Engineering',dept:'ISE',semester:'5',credits:4,faculty:'Prof. Suresh Bhat'},
  {id:'IS504',title:'Computer Networks',dept:'ISE',semester:'5',credits:3,faculty:'Dr. Farah Ahmed'},
  {id:'AM502',title:'Machine Learning',dept:'AI and ML',semester:'5',credits:4,faculty:'Dr. Meenal Pai'},
  {id:'AM503',title:'Data Visualization',dept:'AI and ML',semester:'5',credits:3,faculty:'Prof. Mahesh Kulal'},
  {id:'EC503',title:'Digital Signal Processing',dept:'ECE',semester:'5',credits:4,faculty:'Prof. Raghav Shetty'},
  {id:'EC504',title:'Embedded Systems',dept:'ECE',semester:'5',credits:3,faculty:'Dr. Ritu Dsouza'},
  {id:'EE501',title:'Power Systems',dept:'EEE',semester:'5',credits:4,faculty:'Dr. Anita Hegde'},
  {id:'ME501',title:'Heat Transfer',dept:'Mechanical',semester:'5',credits:4,faculty:'Prof. Ajay Devadiga'},
  {id:'ME502',title:'Manufacturing Technology',dept:'Mechanical',semester:'5',credits:3,faculty:'Prof. Naveen Acharya'},
  {id:'CV501',title:'Structural Analysis',dept:'Civil',semester:'5',credits:4,faculty:'Dr. Shalini Kamath'},
  {id:'CV502',title:'Geotechnical Engineering',dept:'Civil',semester:'5',credits:3,faculty:'Dr. Shalini Kamath'},
  {id:'CS301',title:'Data Structures',dept:'CSE',semester:'3',credits:4,faculty:'Prof. Vinay Nayak'},
  {id:'IS301',title:'Algorithms',dept:'ISE',semester:'3',credits:4,faculty:'Prof. Suresh Bhat'},
  {id:'AM301',title:'Python for Data Science',dept:'AI and ML',semester:'3',credits:4,faculty:'Dr. Meenal Pai'},
  {id:'EC301',title:'Signals and Systems',dept:'ECE',semester:'3',credits:4,faculty:'Prof. Raghav Shetty'},
  {id:'ME301',title:'Thermodynamics',dept:'Mechanical',semester:'3',credits:4,faculty:'Prof. Ajay Devadiga'},
  {id:'CV301',title:'Surveying',dept:'Civil',semester:'3',credits:3,faculty:'Dr. Shalini Kamath'},
];

export const dashboardKpis = [
  ['Average attendance','79.4%','+1.2 pts vs last week','good'],
  ['Students below 75%','612','17.6% of 3,480 enrolled','bad'],
  ['IA-1 marks locked','71%','214 of 301 courses','warn'],
  ['Exams in next 7 days','18','3 need rooms confirmed','neutral'],
  ['Pending approvals','9','6 marks, 3 condonation','warn'],
];

export const attentionItems = [
  ['Approve','6 IA-1 mark sheets await HOD approval','Mechanical, ECE · oldest waiting 9 days','Review'],
  ['Decide','3 attendance condonation requests','Medical grounds · documents attached','Open'],
  ['Clash','Room B-204 double-booked Thu 10:00','ECE Sem 5 lab and Civil Sem 3 lecture','Resolve'],
  ['Cover','2 periods today have no substitute','Faculty on approved leave','Assign'],
  ['Info','Hall ticket generation opens in 5 days','Eligibility list needs final attendance lock','Preview'],
];

export const weeklyAttendance = [
  {week:'Wk 1', value:78.1},{week:'Wk 2',value:78.7},{week:'Wk 3',value:79.3},
  {week:'Wk 4',value:78.2},{week:'Wk 5',value:78.4},{week:'Wk 6',value:79.4},
];

export const attendanceRecords = initialStudents.map((s,i)=>({
  id:s.id, student:s.name, department:s.dept, semester:s.semester, section:s.section,
  present: [38,35,40,31,36,29,34,37][i%8], total: 42,
  percentage: Math.round(([38,35,40,31,36,29,34,37][i%8]/42)*1000)/10
}));

export const notifications = [
  {id:'N1',title:'IA-1 mark sheets await HOD approval',detail:'6 courses need review',type:'Approval'},
  {id:'N2',title:'Attendance condonation requests',detail:'3 requests have documents attached',type:'Attendance'},
  {id:'N3',title:'Room B-204 is double-booked',detail:'Thursday at 10:00',type:'Timetable'},
];

export const timetable = [
  {id:'T1',day:'Monday',period:'09:00–10:00',course:'CS501 · Operating Systems',department:'CSE',section:'A',room:'A-201',faculty:'Dr. Kavitha Rao'},
  {id:'T2',day:'Monday',period:'10:00–11:00',course:'CS502 · Database Systems',department:'CSE',section:'A',room:'A-202',faculty:'Prof. Vinay Nayak'},
  {id:'T3',day:'Tuesday',period:'09:00–10:00',course:'IS503 · Software Engineering',department:'ISE',section:'B',room:'B-101',faculty:'Prof. Suresh Bhat'},
  {id:'T4',day:'Wednesday',period:'11:00–12:00',course:'AM502 · Machine Learning',department:'AI and ML',section:'A',room:'A-205',faculty:'Dr. Meenal Pai'},
  {id:'T5',day:'Thursday',period:'10:00–11:00',course:'EC503 · Digital Signal Processing',department:'ECE',section:'C',room:'B-204',faculty:'Prof. Raghav Shetty'},
];

export const internalAssessments = departments.map(d=>({
  department:d.name, courses:d.courses, submitted:d.submitted, locked:d.locked,
  lockedShare:Math.round(d.locked/d.courses*100), status:Math.round(d.locked/d.courses*100)>=75?'On track':Math.round(d.locked/d.courses*100)>=63?'Behind':'Overdue'
}));
