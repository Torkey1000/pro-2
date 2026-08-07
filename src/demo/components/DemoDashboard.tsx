/**
 * صفحة عرض توضيحي لشركة الابداع المميز المحدودة
 * تعرض جميع بيانات النظام بشكل تفاعلي
 */

import { useEffect, useState } from 'react';
import { demoDataService } from '../../demo/services/demoService';
import type { Employee, Project, CompanyProfile } from '../../demo/data/companyData';
import { formatDate, formatSalary, formatNumber } from '../../utils/formatters';

export default function DemoDashboard() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'employees' | 'projects' | 'finance'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        await demoDataService.generateDemoData();
        setCompany(demoDataService.getCompany());
        setEmployees(demoDataService.getEmployees());
        setProjects(demoDataService.getProjects());
        setStats(demoDataService.getStatistics());
      } catch (error) {
        console.error('Error loading demo data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">جاري تحميل بيانات العرض التوضيحي...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
      {/* رأس الصفحة */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {company?.name}
              </h1>
              <p className="text-gray-600">{company?.nameEn}</p>
              <div className="flex gap-4 mt-3 text-sm text-gray-500">
                <span>السجل التجاري: {company?.crNumber}</span>
                <span>الرقم الضريبي: {company?.taxNumber}</span>
                <span>تاريخ التأسيس: {formatDate(company?.establishmentDate || '')}</span>
              </div>
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-blue-600">عرض توضيحي</div>
              <div className="text-sm text-gray-500">نظام إدارة الشركات المتكامل</div>
            </div>
          </div>
        </div>
      </div>

      {/* تبويبات التنقل */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex border-b">
            {[
              { id: 'overview', label: 'نظرة عامة', icon: '📊' },
              { id: 'employees', label: 'الموظفين', icon: '👥' },
              { id: 'projects', label: 'المشاريع', icon: '📁' },
              { id: 'finance', label: 'المالية', icon: '💰' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-6 py-4 text-center transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="ml-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* محتوى التبويبات */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'overview' && (
          <OverviewTab stats={stats} company={company} employees={employees} projects={projects} />
        )}
        {activeTab === 'employees' && <EmployeesTab employees={employees} />}
        {activeTab === 'projects' && <ProjectsTab projects={projects} employees={employees} />}
        {activeTab === 'finance' && <FinanceTab />}
      </div>
    </div>
  );
}

// مكون نظرة عامة
function OverviewTab({ stats, company, employees, projects }: any) {
  const statCards = [
    { title: 'إجمالي الإيرادات', value: formatSalary(stats?.totalRevenue || 0), color: 'green', icon: '💵' },
    { title: 'إجمالي المصروفات', value: formatSalary(stats?.totalExpenses || 0), color: 'red', icon: '💸' },
    { title: 'صافي الربح', value: formatSalary(stats?.profit || 0), color: 'blue', icon: '📈' },
    { title: 'عدد الموظفين', value: stats?.activeEmployees.toString() + '/' + stats?.totalEmployees, color: 'purple', icon: '👥' },
    { title: 'المشاريع النشطة', value: stats?.activeProjects.toString() + '/' + stats?.totalProjects, color: 'orange', icon: '📁' },
    { title: 'الفواتير المستحقة', value: stats?.overdueInvoices.toString(), color: 'yellow', icon: '⚠️' }
  ];

  return (
    <div className="space-y-6">
      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{card.title}</p>
                <p className={`text-2xl font-bold text-${card.color}-600`}>{card.value}</p>
              </div>
              <div className="text-4xl">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* معلومات الشركة */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">معلومات الشركة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 text-sm">العنوان</p>
            <p className="font-medium">{company?.address}, {company?.city}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">الهاتف</p>
            <p className="font-medium">{company?.phone}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">البريد الإلكتروني</p>
            <p className="font-medium">{company?.email}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">النشاط</p>
            <p className="font-medium">{company?.activities?.join('، ')}</p>
          </div>
        </div>
      </div>

      {/* أحدث المشاريع */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">أحدث المشاريع</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">رقم المشروع</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">اسم المشروع</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">العميل</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">الميزانية</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {projects.slice(0, 5).map((project: Project) => (
                <tr key={project.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{project.projectNumber}</td>
                  <td className="px-4 py-3 text-sm font-medium">{project.name}</td>
                  <td className="px-4 py-3 text-sm">{project.client}</td>
                  <td className="px-4 py-3 text-sm">{formatSalary(project.budget)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={project.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// مكون قائمة الموظفين
function EmployeesTab({ employees }: { employees: Employee[] }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">قائمة الموظفين ({employees.length})</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">الرقم الوظيفي</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">الاسم</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">المنصب</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">القسم</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">تاريخ التعيين</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">الراتب</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-mono">{employee.employeeNumber}</td>
                <td className="px-4 py-3 text-sm font-medium">{employee.name}</td>
                <td className="px-4 py-3 text-sm">{employee.position}</td>
                <td className="px-4 py-3 text-sm">{employee.department}</td>
                <td className="px-4 py-3 text-sm">{formatDate(employee.joinDate)}</td>
                <td className="px-4 py-3 text-sm">{formatSalary(employee.salary)}</td>
                <td className="px-4 py-3">
                  <EmployeeStatusBadge status={employee.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// مكون قائمة المشاريع
function ProjectsTab({ projects, employees }: { projects: Project[]; employees: Employee[] }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">قائمة المشاريع ({projects.length})</h2>
      <div className="space-y-4">
        {projects.map(project => {
          const manager = employees.find(e => e.id === project.managerId);
          return (
            <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{project.name}</h3>
                  <p className="text-sm text-gray-600">{project.projectNumber}</p>
                </div>
                <StatusBadge status={project.status} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">العميل:</span>
                  <span className="mr-2 font-medium">{project.client}</span>
                </div>
                <div>
                  <span className="text-gray-600">مدير المشروع:</span>
                  <span className="mr-2 font-medium">{manager?.name || 'غير محدد'}</span>
                </div>
                <div>
                  <span className="text-gray-600">الميزانية:</span>
                  <span className="mr-2 font-medium">{formatSalary(project.budget)}</span>
                </div>
                <div>
                  <span className="text-gray-600">فترة المشروع:</span>
                  <span className="mr-2 font-medium">
                    {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t">
                <span className="text-gray-600 text-sm">فريق العمل ({project.teamMemberIds.length} أعضاء):</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.teamMemberIds.slice(0, 5).map(memberId => {
                    const member = employees.find(e => e.id === memberId);
                    return member ? (
                      <span key={memberId} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {member.name}
                      </span>
                    ) : null;
                  })}
                  {project.teamMemberIds.length > 5 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{project.teamMemberIds.length - 5} آخرين
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// مكون البيانات المالية
function FinanceTab() {
  const [selectedView, setSelectedView] = useState<'invoices' | 'expenses' | 'payroll'>('invoices');
  const invoices = demoDataService.getInvoices();
  const expenses = demoDataService.getExpenses();
  const payroll = demoDataService.getPayrollRecords();
  const employees = demoDataService.getEmployees();

  return (
    <div className="space-y-6">
      {/* اختيار العرض */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex gap-4">
          {[
            { id: 'invoices', label: 'الفواتير', count: invoices.length },
            { id: 'expenses', label: 'المصروفات', count: expenses.length },
            { id: 'payroll', label: 'الرواتب', count: Math.floor(payroll.length / 15) + ' شهر' }
          ].map(view => (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id as any)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedView === view.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {view.label} ({view.count})
            </button>
          ))}
        </div>
      </div>

      {/* عرض الفواتير */}
      {selectedView === 'invoices' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">سجل الفواتير ({invoices.length})</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">رقم الفاتورة</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">العميل</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">تاريخ الإصدار</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">تاريخ الاستحقاق</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">المبلغ</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">ضريبة VAT</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">الإجمالي</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {invoices.slice(0, 20).map(invoice => (
                  <tr key={invoice.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-mono">{invoice.invoiceNumber}</td>
                    <td className="px-4 py-3 text-sm">{invoice.clientId}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(invoice.issueDate)}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(invoice.dueDate)}</td>
                    <td className="px-4 py-3 text-sm">{formatSalary(invoice.amount)}</td>
                    <td className="px-4 py-3 text-sm">{formatSalary(invoice.vat)}</td>
                    <td className="px-4 py-3 text-sm font-bold">{formatSalary(invoice.total)}</td>
                    <td className="px-4 py-3">
                      <InvoiceStatusBadge status={invoice.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* عرض المصروفات */}
      {selectedView === 'expenses' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">سجل المصروفات ({expenses.length})</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">رقم المصروف</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">التصنيف</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">الوصف</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">التاريخ</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">المبلغ</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">رقم الإيصال</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {expenses.slice(0, 20).map(expense => (
                  <tr key={expense.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-mono">{expense.expenseNumber}</td>
                    <td className="px-4 py-3 text-sm">{expense.category}</td>
                    <td className="px-4 py-3 text-sm">{expense.description}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(expense.date)}</td>
                    <td className="px-4 py-3 text-sm font-bold">{formatSalary(expense.amount)}</td>
                    <td className="px-4 py-3 text-sm font-mono">{expense.receiptNumber}</td>
                    <td className="px-4 py-3">
                      <ExpenseStatusBadge status={expense.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* عرض الرواتب */}
      {selectedView === 'payroll' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">سجل الرواتب (آخر شهر)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">الشهر</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">الموظف</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">الراتب الأساسي</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">البدلات</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">الإضافي</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">المكافآت</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">الخصومات</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">صافي الراتب</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">حالة الدفع</th>
                </tr>
              </thead>
              <tbody>
                {payroll.slice(-15).map(record => {
                  const employee = employees.find(e => e.id === record.employeeId);
                  return (
                    <tr key={record.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{record.month}</td>
                      <td className="px-4 py-3 text-sm font-medium">{employee?.name}</td>
                      <td className="px-4 py-3 text-sm">{formatSalary(record.baseSalary)}</td>
                      <td className="px-4 py-3 text-sm">{formatSalary(record.allowances)}</td>
                      <td className="px-4 py-3 text-sm">{formatSalary(record.overtime)}</td>
                      <td className="px-4 py-3 text-sm">{formatSalary(record.bonus)}</td>
                      <td className="px-4 py-3 text-sm text-red-600">-{formatSalary(record.deductions)}</td>
                      <td className="px-4 py-3 text-sm font-bold">{formatSalary(record.netSalary)}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {record.status === 'paid' ? 'مدفوع' : record.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// مكونات الشارات
function StatusBadge({ status }: { status: string }) {
  const statusConfig: any = {
    active: { bg: 'bg-green-100', text: 'text-green-800', label: 'نشط' },
    completed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'مكتمل' },
    on_hold: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'معلق' },
    planning: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'تخطيط' }
  };

  const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };

  return (
    <span className={`px-2 py-1 ${config.bg} ${config.text} text-xs rounded-full`}>
      {config.label}
    </span>
  );
}

function EmployeeStatusBadge({ status }: { status: string }) {
  const statusConfig: any = {
    active: { bg: 'bg-green-100', text: 'text-green-800', label: 'نشط' },
    on_leave: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'في إجازة' },
    terminated: { bg: 'bg-red-100', text: 'text-red-800', label: 'منتهي' }
  };

  const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };

  return (
    <span className={`px-2 py-1 ${config.bg} ${config.text} text-xs rounded-full`}>
      {config.label}
    </span>
  );
}

function InvoiceStatusBadge({ status }: { status: string }) {
  const statusConfig: any = {
    paid: { bg: 'bg-green-100', text: 'text-green-800', label: 'مدفوعة' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'قيد الانتظار' },
    overdue: { bg: 'bg-red-100', text: 'text-red-800', label: 'متأخرة' },
    cancelled: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'ملغاة' }
  };

  const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };

  return (
    <span className={`px-2 py-1 ${config.bg} ${config.text} text-xs rounded-full`}>
      {config.label}
    </span>
  );
}

function ExpenseStatusBadge({ status }: { status: string }) {
  const statusConfig: any = {
    approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'موافق عليه' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'قيد الانتظار' },
    rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'مرفوض' }
  };

  const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };

  return (
    <span className={`px-2 py-1 ${config.bg} ${config.text} text-xs rounded-full`}>
      {config.label}
    </span>
  );
}
