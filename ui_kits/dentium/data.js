// Realistic Dentium fake data — Indian names, ₹ amounts, dental procedures.
// Used by every screen in the kit.

const DOCTORS = [
  { id: 'D1', name: 'Dr. Arjun Mehta',  initials: 'DA', color: '#9747FF', dept: 'General Dentistry', chair: 'Chair 1' },
  { id: 'D2', name: 'Dr. Priya Sharma', initials: 'DP', color: '#373C47', dept: 'Orthodontics',      chair: 'Chair 2' },
  { id: 'D3', name: 'Dr. Rohan Kapoor', initials: 'DR', color: '#1E54B7', dept: 'Endodontics',       chair: 'Chair 3' },
  { id: 'D4', name: 'Dr. Sneha Iyer',   initials: 'DS', color: '#DB7600', dept: 'Periodontics',      chair: 'Chair 4' },
  { id: 'D5', name: 'Dr. Vikram Nair',  initials: 'DV', color: '#1E54B7', dept: 'Oral Surgery',      chair: 'Chair 5' },
];

const PATIENTS = [
  { id: 'PAT-00009', initials: 'VS', color: '#1E54B7', name: 'Venkat Subramanian', sex: 'Male',   age: 71, blood: 'O+', phone: '9899001122', email: 'vs.subramanian@yahoo.in', allergies: ['Aspirin — bronchospasm'], conditions: [{ name: 'Asthma', note: 'On Salbutamol inhaler', since: '01 Jan 1990' }, { name: 'Osteoporosis', note: 'On Alendronate — caution for extractions', since: '10 Nov 2018' }] },
  { id: 'PAT-00001', initials: 'RK', color: '#D46C84', name: 'Rajesh Kumar',       sex: 'Male',   age: 42, blood: 'A+', phone: '9810022115', email: 'rajesh.k@gmail.com',  allergies: [], conditions: [] },
  { id: 'PAT-00003', initials: 'AJ', color: '#CC1414', name: 'Amit Joshi',         sex: 'Male',   age: 50, blood: 'A+', phone: '9833445566', email: 'amit.joshi@hotmail.com', allergies: ['NSAIDs — gastric bleeding history'], conditions: [{ name: 'GERD', note: 'Avoid aspirin and ibuprofen', since: '20 Mar 2020' }] },
  { id: 'PAT-00006', initials: 'KM', color: '#373C47', name: 'Kavya Menon',        sex: 'Female', age: 28, blood: 'B+', phone: '9988443322', email: 'kavya.menon@outlook.com', allergies: [], conditions: [] },
  { id: 'PAT-00008', initials: 'AS', color: '#9747FF', name: 'Ananya Singh',       sex: 'Female', age: 34, blood: 'O−', phone: '9876523109', email: 'a.singh@protonmail.com', allergies: [], conditions: [] },
  { id: 'PAT-00010', initials: 'DP', color: '#DB7600', name: 'Deepika Patel',      sex: 'Female', age: 45, blood: 'AB+',phone: '9090909011', email: 'deepika.p@gmail.com',   allergies: [], conditions: [] },
  { id: 'PAT-00012', initials: 'MK', color: '#622244', name: 'Meera Krishnan',     sex: 'Female', age:  8, blood: 'O+', phone: '9876000001', email: 'parent.mk@gmail.com',  allergies: [], conditions: [] },
  { id: 'PAT-00005', initials: 'MF', color: '#10973E', name: 'Mohammed Farhan',    sex: 'Male',   age: 31, blood: 'A−', phone: '9988100200', email: 'm.farhan@gmail.com',   allergies: [], conditions: [] },
  { id: 'PAT-00007', initials: 'SG', color: '#1E54B7', name: 'Sanjay Gupta',       sex: 'Male',   age: 58, blood: 'B+', phone: '9123456701', email: 's.gupta@yahoo.in',    allergies: [], conditions: [] },
  { id: 'PAT-00013', initials: 'RS', color: '#D46C84', name: 'Rohit Sharma',       sex: 'Male',   age: 22, blood: 'O+', phone: '9876333222', email: 'rohit.s@gmail.com',   allergies: [], conditions: [] },
  { id: 'PAT-00015', initials: 'NA', color: '#CC1414', name: 'Nitin Agarwal',      sex: 'Male',   age: 67, blood: 'A+', phone: '9999998888', email: 'nitin.agarwal@gmail.com', allergies: [], conditions: [] },
];

const APPOINTMENTS = [
  { id: 'A01', time: '8:30 AM',  duration: 30, patient: 'PAT-00009', doctor: 'D1', dept: 'General Dentistry', purpose: 'Dental cleaning consultation',           status: 'missed' },
  { id: 'A02', time: '9:00 AM',  duration: 30, patient: 'PAT-00001', doctor: 'D1', dept: 'General Dentistry', purpose: 'Routine check-up and cleaning',          status: 'completed' },
  { id: 'A03', time: '9:30 AM',  duration: 60, patient: 'PAT-00003', doctor: 'D3', dept: 'Endodontics',        purpose: 'Root canal — molar 36',                  status: 'completed' },
  { id: 'A04', time: '10:00 AM', duration: 30, patient: 'PAT-00006', doctor: 'D2', dept: 'Orthodontics',       purpose: 'Braces adjustment — monthly visit',      status: 'in-progress' },
  { id: 'A05', time: '10:30 AM', duration: 30, patient: 'PAT-00008', doctor: 'D1', dept: 'General Dentistry', purpose: 'Tooth sensitivity consultation',         status: 'checked-in' },
  { id: 'A06', time: '11:00 AM', duration: 30, patient: 'PAT-00010', doctor: 'D4', dept: 'Periodontics',       purpose: 'Gum disease follow-up',                  status: 'billing-pending' },
  { id: 'A07', time: '11:30 AM', duration: 30, patient: 'PAT-00012', doctor: 'D1', dept: 'Pediatric Dentistry',purpose: 'Dental check-up (pediatric)',            status: 'checked-in' },
  { id: 'A08', time: '2:00 PM',  duration: 60, patient: 'PAT-00005', doctor: 'D5', dept: 'Oral Surgery',       purpose: 'Wisdom tooth extraction',                status: 'scheduled' },
  { id: 'A09', time: '2:30 PM',  duration: 60, patient: 'PAT-00007', doctor: 'D3', dept: 'Endodontics',        purpose: 'Root canal — premolar 24',               status: 'scheduled' },
  { id: 'A10', time: '3:30 PM',  duration: 30, patient: 'PAT-00013', doctor: 'D2', dept: 'Orthodontics',       purpose: 'Aligner fitting — upper arch',           status: 'scheduled' },
  { id: 'A11', time: '4:00 PM',  duration: 45, patient: 'PAT-00015', doctor: 'D4', dept: 'Periodontics',       purpose: 'Scaling and deep cleaning',              status: 'scheduled' },
];

const INVOICES = [
  { id: 'INV-2026-0002', date: '17 May', patient: 'PAT-00003', items: 'Root Canal — Molar',                              billed:  6500, paid: 3000, balance: 3500, status: 'partial' },
  { id: 'INV-2026-0001', date: '17 May', patient: 'PAT-00001', items: 'Comprehensive Oral Exam, Dental Cleaning (Scaling)',billed: 2000, paid: 2000, balance: 0,    status: 'paid' },
  { id: 'INV-2026-0004', date: '16 May', patient: 'PAT-00009', items: 'Surgical Extraction',                              billed: 3500, paid: 3500, balance: 0,    status: 'paid' },
  { id: 'INV-2026-0005', date: '15 May', patient: 'PAT-00006', items: 'Dental Cleaning (Scaling)',                        billed: 1000, paid: 1000, balance: 0,    status: 'paid' },
  { id: 'INV-2026-0006', date: '14 May', patient: 'PAT-00005', items: 'Complete Denture',                                 billed:16000, paid:16000, balance: 0,    status: 'paid' },
  { id: 'INV-2026-0007', date: '14 May', patient: 'PAT-00008', items: 'Root Canal — Molar',                               billed: 7000, paid: 0,    balance: 7000, status: 'issued' },
  { id: 'INV-2026-0008', date: '12 May', patient: 'PAT-00010', items: 'Gum Flap Surgery',                                 billed:11000, paid: 5000, balance: 6000, status: 'partial' },
  { id: 'INV-2026-0009', date: '11 May', patient: 'PAT-00001', items: 'Root Canal — Premolar',                            billed: 5500, paid: 5500, balance: 0,    status: 'paid' },
  { id: 'INV-2026-0010', date: '10 May', patient: 'PAT-00005', items: 'Dental Cleaning (Scaling), Periapical X-ray',      billed: 1600, paid: 1600, balance: 0,    status: 'paid' },
  { id: 'INV-2026-0013', date: '03 May', patient: 'PAT-00007', items: 'Root Canal — Premolar',                            billed: 5500, paid: 0,    balance: 5500, status: 'issued' },
  { id: 'INV-2026-0014', date: '02 May', patient: 'PAT-00015', items: 'Implant Placement',                                billed:25000, paid:25000, balance: 0,    status: 'paid' },
];

const PRESCRIPTIONS = [
  { id: 'RX1', patientId: 'PAT-00003', diagnosis: 'Pulpitis — Molar 36 (ongoing RCT)', date: '17 May 2026', doctor: 'Dr. Rohan Kapoor', notes: 'Complete the full antibiotic course.', items: [
    { medicine: 'Amoxicillin 500mg',     dosage: '500mg', frequency: 'TDS', duration: '5 days', instructions: 'After food' },
    { medicine: 'Ibuprofen 400mg',        dosage: '400mg', frequency: 'BD',  duration: '3 days', instructions: 'After food. Avoid on empty stomach.' },
    { medicine: 'Chlorhexidine Mouthwash',dosage: '15ml',  frequency: 'BD',  duration: '5 days', instructions: 'Rinse for 30 seconds. Do not swallow.' },
  ]},
];

const TREATMENT_PLANS = [
  { id: 'TP1', patientId: 'PAT-00003', title: 'Root Canal Treatment — Tooth 36', doctor: 'Dr. Rohan Kapoor', est: 14500, paid: 6500, balance: 8000, status: 'Active',
    procedures: [
      { name: 'Diagnosis', done: true },
      { name: 'RCT sitting 1', done: true },
      { name: 'RCT sitting 2', done: false },
      { name: 'Crown', done: false },
    ]},
];

const TIMELINE = [
  { patientId: 'PAT-00009', items: [
    { date: '22 May 2026 · 11:00 AM', title: 'Extraction site review',       doctor: 'Dr. Vikram Nair · Oral Surgery',     status: 'scheduled' },
    { date: '17 May · 8:30 AM',       title: 'Dental cleaning consultation', doctor: 'Dr. Arjun Mehta · General Dentistry',status: 'missed' },
    { date: '16 May · 11:00 AM',      title: 'Surgical extraction — 38',     doctor: 'Dr. Vikram Nair · Oral Surgery',     status: 'completed' },
    { date: '07 May · 11:00 AM',      title: 'Scaling — periodontal',        doctor: 'Dr. Sneha Iyer · Periodontics',      status: 'completed' },
  ]},
];

const KPIS_TODAY = {
  collections: { value: '₹2,000', sub: 'Cash ₹2,000' },
  patients:    { value: '11',     sub: '10 Returning · +1 New' },
  noShows:     { value: '1',      sub: '1 missed slot' },
  occupancy:   { value: '3', denom: '/5', sub: '3 Occupied · 2 Free' },
};

window.DENTIUM_DATA = {
  DOCTORS, PATIENTS, APPOINTMENTS, INVOICES,
  PRESCRIPTIONS, TREATMENT_PLANS, TIMELINE, KPIS_TODAY,
  // helpers
  getPatient:  (id) => PATIENTS.find(p => p.id === id),
  getDoctor:   (id) => DOCTORS.find(d => d.id === id),
};
