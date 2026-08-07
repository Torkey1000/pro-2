/**
 * بيانات شركة الابداع المميز المحدودة
 * شركة تأسست قبل 3 سنوات ولديها 15 موظف و20 مشروع
 */

export interface Employee {
  id: string;
  employeeNumber: string;
  name: string;
  nameEn: string;
  position: string;
  department: string;
  joinDate: string;
  salary: number;
  email: string;
  phone: string;
  nationality: string;
  iqama?: string;
  status: 'active' | 'on_leave' | 'terminated';
}

export interface Project {
  id: string;
  projectNumber: string;
  name: string;
  nameEn: string;
  client: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: 'active' | 'completed' | 'on_hold' | 'planning';
  managerId: string;
  teamMemberIds: string[];
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: 'present' | 'absent' | 'late' | 'early_leave' | 'on_leave' | 'weekend';
  lateMinutes: number;
  notes?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'annual' | 'sick' | 'emergency' | 'unpaid' | 'maternity' | 'pilgrimage';
  startDate: string;
  endDate: string;
  days: number;
  status: 'approved' | 'pending' | 'rejected';
  reason: string;
  approvedBy?: string;
  requestDate: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  month: string; // YYYY-MM
  baseSalary: number;
  allowances: number;
  overtime: number;
  deductions: number;
  bonus: number;
  netSalary: number;
  paymentDate: string;
  status: 'paid' | 'pending' | 'processing';
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId: string;
  clientId: string;
  amount: number;
  vat: number;
  total: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Expense {
  id: string;
  expenseNumber: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  projectId?: string;
  employeeId?: string;
  status: 'approved' | 'pending' | 'rejected';
  receiptNumber?: string;
}

export interface CompanyProfile {
  name: string;
  nameEn: string;
  crNumber: string;
  taxNumber: string;
  establishmentDate: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  logo?: string;
  activities: string[];
}

// ثوابت النظام
export const DEPARTMENTS = [
  'الإدارة العامة',
  'تقنية المعلومات',
  'المحاسبة والمالية',
  'الموارد البشرية',
  'المشاريع',
  'المبيعات والتسويق',
  'الدعم الفني',
  'الجودة'
];

export const POSITIONS = [
  'مدير عام',
  'مدير مشاريع',
  'مطور برمجيات أول',
  'مطور برمجيات',
  'محلل نظم',
  'محاسب',
  'أخصائي موارد بشرية',
  'مدير مبيعات',
  'مندوب مبيعات',
  'أخصائي دعم فني',
  'مدير جودة',
  'مهندس مشاريع',
  'مصمم جرافيك',
  'كاتب إداري',
  'مساعد إداري'
];

export const PROJECT_TYPES = [
  'تطوير تطبيقات ويب',
  'تطوير تطبيقات جوال',
  'استشارات تقنية',
  'تكامل أنظمة',
  'حلول سحابية',
  'أمن سيبراني',
  'تحول رقمي',
  'دعم وصيانة'
];

export const CLIENTS = [
  'وزارة التعليم',
  'وزارة الصحة',
  'أرامكو السعودية',
  'سابك',
  'الراجحي المالية',
  'مجموعة الطيار للسفر',
  'شركة الاتصالات السعودية',
  'بنك الرياض',
  'مدينة الملك عبدالله الطبية',
  'جامعة الملك سعود',
  'هيئة الطيران المدني',
  'صندوق الاستثمارات العامة',
  'نيوم',
  'الخطوط الجوية السعودية',
  'مجموعة عبداللطيف جميل'
];
