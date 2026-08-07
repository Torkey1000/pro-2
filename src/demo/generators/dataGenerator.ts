/**
 * مولد البيانات الوهمية لشركة الابداع المميز المحدودة
 * ينشئ 3 سنوات من البيانات التاريخية
 */

import {
  Employee,
  Project,
  AttendanceRecord,
  LeaveRequest,
  PayrollRecord,
  Invoice,
  Expense,
  CompanyProfile
} from './companyData';
import {
  DEPARTMENTS,
  POSITIONS,
  PROJECT_TYPES,
  CLIENTS
} from './companyData';

// دوال مساعدة
const generateId = () => Math.random().toString(36).substring(2, 15);

const randomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const formatCurrency = (amount: number): number => Math.round(amount * 100) / 100;

// أسماء الموظفين
const FIRST_NAMES = [
  'محمد', 'أحمد', 'خالد', 'عبدالله', 'سعد', 'فيصل', 'تركي', 'نايف',
  'سلطان', 'بدر', 'عمر', 'علي', 'حسن', 'حسين', 'إبراهيم', 'يوسف',
  'ماجد', 'وليد', 'طارق', 'زياد', 'سامي', 'فهد', 'مشعل', 'نواف'
];

const LAST_NAMES = [
  'القاhtani', 'السعيد', 'العتيبي', 'الحربي', 'المطيري', 'الشمري', 'الدوسري',
  'القحطاني', 'الزهراني', 'غامدي', 'الثقفي', 'السبيعي', 'الخضيري', 'المنصور',
  'الراجحي', 'الكليب', 'السويلم', 'العبikan', 'الفهد', 'الrashid', 'المهنا'
];

/**
 * إنشاء ملف تعريف الشركة
 */
export function generateCompanyProfile(): CompanyProfile {
  const establishmentDate = new Date();
  establishmentDate.setFullYear(establishmentDate.getFullYear() - 3);
  
  return {
    name: 'شركة الابداع المميز المحدودة',
    nameEn: 'Distinctive Creativity Co. Ltd.',
    crNumber: '1010' + Math.floor(Math.random() * 900000).toString().padStart(6, '0'),
    taxNumber: '300' + Math.floor(Math.random() * 900000000).toString().padStart(9, '0'),
    establishmentDate: establishmentDate.toISOString().split('T')[0],
    address: 'شارع الملك فهد، حي العليا',
    city: 'الرياض',
    phone: '+966 11 ' + Math.floor(Math.random() * 9000000).toString().padStart(7, '0'),
    email: 'info@creativityco.sa',
    activities: [
      'تطوير البرمجيات',
      'الاستشارات التقنية',
      'حلول التحول الرقمي',
      'خدمات السحابة الإلكترونية'
    ]
  };
}

/**
 * إنشاء قائمة الموظفين (15 موظف)
 */
export function generateEmployees(): Employee[] {
  const employees: Employee[] = [];
  const companyStart = new Date();
  companyStart.setFullYear(companyStart.getFullYear() - 3);
  const now = new Date();
  
  // توزيع المناصب والإدارات
  const employeeConfigs = [
    { position: 'مدير عام', department: 'الإدارة العامة', salary: 45000, count: 1 },
    { position: 'مدير مشاريع', department: 'المشاريع', salary: 28000, count: 2 },
    { position: 'مطور برمجيات أول', department: 'تقنية المعلومات', salary: 22000, count: 3 },
    { position: 'مطور برمجيات', department: 'تقنية المعلومات', salary: 15000, count: 4 },
    { position: 'محاسب', department: 'المحاسبة والمالية', salary: 12000, count: 2 },
    { position: 'أخصائي موارد بشرية', department: 'الموارد البشرية', salary: 11000, count: 1 },
    { position: 'مدير مبيعات', department: 'المبيعات والتسويق', salary: 18000, count: 1 },
    { position: 'أخصائي دعم فني', department: 'الدعم الفني', salary: 9000, count: 1 }
  ];
  
  let employeeNum = 1;
  
  employeeConfigs.forEach(config => {
    for (let i = 0; i < config.count; i++) {
      const firstName = randomElement(FIRST_NAMES);
      const lastName = randomElement(LAST_NAMES);
      const joinDate = randomDate(companyStart, new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000));
      
      employees.push({
        id: generateId(),
        employeeNumber: 'EMP' + employeeNum.toString().padStart(4, '0'),
        name: `${firstName} ${lastName}`,
        nameEn: `${firstName} ${lastName}`,
        position: config.position,
        department: config.department,
        joinDate: joinDate,
        salary: config.salary + Math.floor(Math.random() * 3000),
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@creativityco.sa`,
        phone: '+966 5' + Math.floor(Math.random() * 90000000).toString().padStart(8, '0'),
        nationality: 'سعودي',
        iqama: '1' + Math.floor(Math.random() * 900000000).toString().padStart(9, '0'),
        status: Math.random() > 0.1 ? 'active' : 'on_leave'
      });
      
      employeeNum++;
    }
  });
  
  return employees;
}

/**
 * إنشاء المشاريع (20 مشروع)
 */
export function generateProjects(employees: Employee[]): Project[] {
  const projects: Project[] = [];
  const companyStart = new Date();
  companyStart.setFullYear(companyStart.getFullYear() - 3);
  const now = new Date();
  
  const managers = employees.filter(e => e.position.includes('مدير'));
  const activeEmployees = employees.filter(e => e.status === 'active');
  
  for (let i = 1; i <= 20; i++) {
    const startDate = randomDate(companyStart, new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000));
    const duration = Math.floor(Math.random() * 12) + 3; // 3-15 شهر
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + duration);
    
    const budget = Math.floor(Math.random() * 2000000) + 300000;
    const statusRoll = Math.random();
    let status: Project['status'];
    if (endDate < now && statusRoll > 0.3) {
      status = 'completed';
    } else if (statusRoll > 0.8) {
      status = 'on_hold';
    } else if (startDate > new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)) {
      status = 'planning';
    } else {
      status = 'active';
    }
    
    const manager = randomElement(managers);
    const teamSize = Math.floor(Math.random() * 5) + 2;
    const teamMemberIds = activeEmployees
      .filter(e => e.id !== manager.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, teamSize)
      .map(e => e.id);
    
    projects.push({
      id: generateId(),
      projectNumber: 'PRJ' + i.toString().padStart(4, '0'),
      name: `مشروع ${randomElement(PROJECT_TYPES)} - ${randomElement(CLIENTS)}`,
      nameEn: `Project ${i}: ${randomElement(PROJECT_TYPES)}`,
      client: randomElement(CLIENTS),
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      budget: budget,
      status,
      managerId: manager.id,
      teamMemberIds
    });
  }
  
  return projects;
}

/**
 * إنشاء سجلات الحضور والانصراف (3 سنوات)
 */
export function generateAttendanceRecords(employees: Employee[]): AttendanceRecord[] {
  const records: AttendanceRecord[] = [];
  const companyStart = new Date();
  companyStart.setFullYear(companyStart.getFullYear() - 3);
  const now = new Date();
  
  const workDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
  
  for (let d = new Date(companyStart); d <= now; d.setDate(d.getDate() + 1)) {
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dateStr = d.toISOString().split('T')[0];
    
    // تخطي عطلات نهاية الأسبوع
    if (!workDays.includes(dayName)) {
      continue;
    }
    
    employees.forEach(employee => {
      // محاكاة حالات مختلفة
      const rand = Math.random();
      let status: AttendanceRecord['status'] = 'present';
      let checkIn: string | null = null;
      let checkOut: string | null = null;
      let lateMinutes = 0;
      
      if (employee.status === 'on_leave' && rand > 0.7) {
        status = 'on_leave';
      } else if (rand < 0.02) {
        status = 'absent';
      } else if (rand < 0.1) {
        status = 'late';
        checkIn = `09:${Math.floor(Math.random() * 30) + 30}`.padStart(5, '0');
        lateMinutes = Math.floor(Math.random() * 60) + 1;
        checkOut = '17:00';
      } else if (rand < 0.15) {
        status = 'early_leave';
        checkIn = '08:30';
        checkOut = '14:00';
      } else {
        status = 'present';
        checkIn = '08:' + Math.floor(Math.random() * 30).toString().padStart(2, '0');
        checkOut = '17:' + Math.floor(Math.random() * 30).toString().padStart(2, '0');
      }
      
      records.push({
        id: generateId(),
        employeeId: employee.id,
        date: dateStr,
        checkIn,
        checkOut,
        status,
        lateMinutes
      });
    });
  }
  
  return records;
}

/**
 * إنشاء طلبات الإجازات
 */
export function generateLeaveRequests(employees: Employee[]): LeaveRequest[] {
  const requests: LeaveRequest[] = [];
  const companyStart = new Date();
  companyStart.setFullYear(companyStart.getFullYear() - 3);
  const now = new Date();
  
  employees.forEach(employee => {
    // كل موظف لديه 2-5 طلبات إجازة في 3 سنوات
    const numRequests = Math.floor(Math.random() * 4) + 2;
    
    for (let i = 0; i < numRequests; i++) {
      const requestDate = randomDate(companyStart, new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000));
      const days = Math.floor(Math.random() * 10) + 1;
      const startDate = new Date(requestDate);
      startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + days);
      
      const types: LeaveRequest['type'][] = ['annual', 'sick', 'emergency', 'unpaid'];
      const type = randomElement(types);
      
      const statusRoll = Math.random();
      let status: LeaveRequest['status'] = statusRoll > 0.15 ? 'approved' : (statusRoll > 0.05 ? 'pending' : 'rejected');
      
      requests.push({
        id: generateId(),
        employeeId: employee.id,
        type,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        days,
        status,
        reason: type === 'annual' ? 'إجازة سنوية' : (type === 'sick' ? 'ظرف صحي' : 'ظرف طارئ'),
        approvedBy: status === 'approved' ? employees[0].id : undefined,
        requestDate: requestDate.toISOString().split('T')[0]
      });
    }
  });
  
  return requests;
}

/**
 * إنشاء سجلات الرواتب (3 سنوات)
 */
export function generatePayrollRecords(employees: Employee[]): PayrollRecord[] {
  const records: PayrollRecord[] = [];
  const companyStart = new Date();
  companyStart.setFullYear(companyStart.getFullYear() - 3);
  const now = new Date();
  
  for (let d = new Date(companyStart); d <= now; d.setMonth(d.getMonth() + 1)) {
    const month = d.toISOString().slice(0, 7); // YYYY-MM
    
    employees.forEach(employee => {
      if (employee.status === 'terminated') return;
      
      const baseSalary = employee.salary;
      const allowances = Math.floor(baseSalary * 0.2); // 20% بدلات
      const overtime = Math.floor(Math.random() * 3) === 0 ? Math.floor(Math.random() * 5000) : 0;
      const bonus = Math.floor(Math.random() * 5) === 0 ? Math.floor(Math.random() * 10000) : 0;
      const deductions = Math.floor(baseSalary * 0.02); // خصومات بسيطة
      
      const netSalary = baseSalary + allowances + overtime + bonus - deductions;
      
      records.push({
        id: generateId(),
        employeeId: employee.id,
        month,
        baseSalary,
        allowances,
        overtime,
        deductions,
        bonus,
        netSalary,
        paymentDate: new Date(d.getFullYear(), d.getMonth() + 1, 25).toISOString().split('T')[0],
        status: 'paid'
      });
    });
  }
  
  return records;
}

/**
 * إنشاء الفواتير
 */
export function generateInvoices(projects: Project[]): Invoice[] {
  const invoices: Invoice[] = [];
  const now = new Date();
  
  projects.forEach(project => {
    const numInvoices = Math.floor(project.budget / 100000) + 1;
    
    for (let i = 0; i < numInvoices; i++) {
      const issueDate = randomDate(new Date(project.startDate), now);
      const dueDate = new Date(issueDate);
      dueDate.setDate(dueDate.getDate() + 30);
      
      const amount = Math.floor(project.budget / numInvoices);
      const vat = Math.floor(amount * 0.15);
      const total = amount + vat;
      
      const statusRoll = Math.random();
      let status: Invoice['status'];
      if (dueDate < now && statusRoll > 0.2) {
        status = 'paid';
      } else if (dueDate < now) {
        status = 'overdue';
      } else {
        status = 'pending';
      }
      
      invoices.push({
        id: generateId(),
        invoiceNumber: `INV-${project.projectNumber}-${(i + 1).toString().padStart(3, '0')}`,
        projectId: project.id,
        clientId: project.client,
        amount,
        vat,
        total,
        issueDate: issueDate.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        status,
        items: [
          {
            description: `خدمات ${project.name}`,
            quantity: 1,
            unitPrice: amount,
            amount
          }
        ]
      });
    }
  });
  
  return invoices;
}

/**
 * إنشاء المصروفات
 */
export function generateExpenses(employees: Employee[], projects: Project[]): Expense[] {
  const expenses: Expense[] = [];
  const companyStart = new Date();
  companyStart.setFullYear(companyStart.getFullYear() - 3);
  const now = new Date();
  
  const categories = ['رواتب', 'إيجار', 'مرافق', 'معدات', 'سفر', 'تدريب', 'صيانة', 'تسويق', 'أخرى'];
  const activeEmployees = employees.filter(e => e.status === 'active');
  
  for (let d = new Date(companyStart); d <= now; d.setDate(d.getDate() + Math.floor(Math.random() * 3) + 1)) {
    const category = randomElement(categories);
    const amount = Math.floor(Math.random() * 50000) + 500;
    
    expenses.push({
      id: generateId(),
      expenseNumber: `EXP-${d.getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}`,
      category,
      description: `${category} - عملية روتينية`,
      amount,
      date: d.toISOString().split('T')[0],
      projectId: Math.random() > 0.5 ? randomElement(projects).id : undefined,
      employeeId: Math.random() > 0.7 ? randomElement(activeEmployees).id : undefined,
      status: Math.random() > 0.1 ? 'approved' : 'pending',
      receiptNumber: `RCP-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`
    });
  }
  
  return expenses;
}

/**
 * إنشاء جميع بيانات النظام
 */
export function generateAllDemoData() {
  console.log('🏢 جاري إنشاء بيانات شركة الابداع المميز المحدودة...');
  
  const company = generateCompanyProfile();
  console.log('✓ تم إنشاء ملف تعريف الشركة');
  
  const employees = generateEmployees();
  console.log(`✓ تم إنشاء ${employees.length} موظف`);
  
  const projects = generateProjects(employees);
  console.log(`✓ تم إنشاء ${projects.length} مشروع`);
  
  const attendance = generateAttendanceRecords(employees);
  console.log(`✓ تم إنشاء ${attendance.length} سجل حضور وانصراف`);
  
  const leaves = generateLeaveRequests(employees);
  console.log(`✓ تم إنشاء ${leaves.length} طلب إجازة`);
  
  const payroll = generatePayrollRecords(employees);
  console.log(`✓ تم إنشاء ${payroll.length} سجل رواتب`);
  
  const invoices = generateInvoices(projects);
  console.log(`✓ تم إنشاء ${invoices.length} فاتورة`);
  
  const expenses = generateExpenses(employees, projects);
  console.log(`✓ تم إنشاء ${expenses.length} مصروف`);
  
  return {
    company,
    employees,
    projects,
    attendance,
    leaves,
    payroll,
    invoices,
    expenses
  };
}
