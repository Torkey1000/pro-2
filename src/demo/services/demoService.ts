/**
 * خدمة إنشاء بيانات العرض التوضيحي لشركة الابداع المميز المحدودة
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
} from '../data/companyData';
import {
  generateCompanyProfile as genCompany,
  generateEmployees as genEmployees,
  generateProjects as genProjects,
  generateAttendanceRecords as genAttendance,
  generateLeaveRequests as genLeaves,
  generatePayrollRecords as genPayroll,
  generateInvoices as genInvoices,
  generateExpenses as genExpenses
} from '../generators/dataGenerator';

export class DemoDataService {
  private static instance: DemoDataService;
  private data: {
    company: CompanyProfile | null;
    employees: Employee[];
    projects: Project[];
    attendance: AttendanceRecord[];
    leaves: LeaveRequest[];
    payroll: PayrollRecord[];
    invoices: Invoice[];
    expenses: Expense[];
  } | null = null;

  private constructor() {
    this.data = null;
  }

  static getInstance(): DemoDataService {
    if (!DemoDataService.instance) {
      DemoDataService.instance = new DemoDataService();
    }
    return DemoDataService.instance;
  }

  /**
   * إنشاء جميع بيانات العرض التوضيحي
   */
  async generateDemoData(): Promise<{
    company: CompanyProfile;
    employees: Employee[];
    projects: Project[];
    attendance: AttendanceRecord[];
    leaves: LeaveRequest[];
    payroll: PayrollRecord[];
    invoices: Invoice[];
    expenses: Expense[];
  }> {
    if (this.data) {
      return this.data as any;
    }

    console.log('🏢 جاري إنشاء بيانات شركة الابداع المميز المحدودة...');

    const company = genCompany();
    console.log('✓ تم إنشاء ملف تعريف الشركة');

    const employees = genEmployees();
    console.log(`✓ تم إنشاء ${employees.length} موظف`);

    const projects = genProjects(employees);
    console.log(`✓ تم إنشاء ${projects.length} مشروع`);

    const attendance = genAttendance(employees);
    console.log(`✓ تم إنشاء ${attendance.length} سجل حضور وانصراف`);

    const leaves = genLeaves(employees);
    console.log(`✓ تم إنشاء ${leaves.length} طلب إجازة`);

    const payroll = genPayroll(employees);
    console.log(`✓ تم إنشاء ${payroll.length} سجل رواتب`);

    const invoices = genInvoices(projects);
    console.log(`✓ تم إنشاء ${invoices.length} فاتورة`);

    const expenses = genExpenses(employees, projects);
    console.log(`✓ تم إنشاء ${expenses.length} مصروف`);

    this.data = {
      company,
      employees,
      projects,
      attendance,
      leaves,
      payroll,
      invoices,
      expenses
    };

    return this.data;
  }

  /**
   * الحصول على بيانات الشركة
   */
  getCompany(): CompanyProfile | null {
    return this.data?.company || null;
  }

  /**
   * الحصول على جميع الموظفين
   */
  getEmployees(): Employee[] {
    return this.data?.employees || [];
  }

  /**
   * الحصول على موظف حسب المعرف
   */
  getEmployeeById(id: string): Employee | undefined {
    return this.data?.employees.find(e => e.id === id);
  }

  /**
   * الحصول على جميع المشاريع
   */
  getProjects(): Project[] {
    return this.data?.projects || [];
  }

  /**
   * الحصول على مشروع حسب المعرف
   */
  getProjectById(id: string): Project | undefined {
    return this.data?.projects.find(p => p.id === id);
  }

  /**
   * الحصول على سجلات الحضور
   */
  getAttendanceRecords(employeeId?: string, startDate?: string, endDate?: string): AttendanceRecord[] {
    let records = this.data?.attendance || [];
    
    if (employeeId) {
      records = records.filter(r => r.employeeId === employeeId);
    }
    
    if (startDate) {
      records = records.filter(r => r.date >= startDate);
    }
    
    if (endDate) {
      records = records.filter(r => r.date <= endDate);
    }
    
    return records;
  }

  /**
   * الحصول على طلبات الإجازات
   */
  getLeaveRequests(employeeId?: string): LeaveRequest[] {
    let requests = this.data?.leaves || [];
    
    if (employeeId) {
      requests = requests.filter(r => r.employeeId === employeeId);
    }
    
    return requests;
  }

  /**
   * الحصول على سجلات الرواتب
   */
  getPayrollRecords(employeeId?: string, month?: string): PayrollRecord[] {
    let records = this.data?.payroll || [];
    
    if (employeeId) {
      records = records.filter(r => r.employeeId === employeeId);
    }
    
    if (month) {
      records = records.filter(r => r.month === month);
    }
    
    return records;
  }

  /**
   * الحصول على الفواتير
   */
  getInvoices(projectId?: string, status?: Invoice['status']): Invoice[] {
    let invoices = this.data?.invoices || [];
    
    if (projectId) {
      invoices = invoices.filter(i => i.projectId === projectId);
    }
    
    if (status) {
      invoices = invoices.filter(i => i.status === status);
    }
    
    return invoices;
  }

  /**
   * الحصول على المصروفات
   */
  getExpenses(projectId?: string, category?: string): Expense[] {
    let expenses = this.data?.expenses || [];
    
    if (projectId) {
      expenses = expenses.filter(e => e.projectId === projectId);
    }
    
    if (category) {
      expenses = expenses.filter(e => e.category === category);
    }
    
    return expenses;
  }

  /**
   * الحصول على إحصائيات النظام
   */
  getStatistics() {
    if (!this.data) {
      return null;
    }

    const totalRevenue = this.data.invoices
      .filter(i => i.status === 'paid')
      .reduce((sum, inv) => sum + inv.amount, 0);

    const totalExpenses = this.data.expenses
      .filter(e => e.status === 'approved')
      .reduce((sum, exp) => sum + exp.amount, 0);

    const activeProjects = this.data.projects.filter(p => p.status === 'active').length;
    const completedProjects = this.data.projects.filter(p => p.status === 'completed').length;

    const activeEmployees = this.data.employees.filter(e => e.status === 'active').length;

    const pendingInvoices = this.data.invoices.filter(i => i.status === 'pending').length;
    const overdueInvoices = this.data.invoices.filter(i => i.status === 'overdue').length;

    return {
      totalRevenue,
      totalExpenses,
      profit: totalRevenue - totalExpenses,
      activeProjects,
      completedProjects,
      totalProjects: this.data.projects.length,
      activeEmployees,
      totalEmployees: this.data.employees.length,
      pendingInvoices,
      overdueInvoices,
      totalInvoices: this.data.invoices.length,
      totalAttendanceRecords: this.data.attendance.length,
      totalLeaveRequests: this.data.leaves.length
    };
  }

  /**
   * تصدير البيانات إلى JSON
   */
  exportToJson(): string {
    return JSON.stringify(this.data, null, 2);
  }

  /**
   * إعادة تعيين البيانات
   */
  reset() {
    this.data = null;
  }
}

// تصدير مثيل Singleton
export const demoDataService = DemoDataService.getInstance();
