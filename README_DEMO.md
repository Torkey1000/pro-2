# 🏢 نظام العرض التوضيحي - شركة الابداع المميز المحدودة

## نظرة عامة

تم إنشاء نظام عرض توضيحي كامل لشركة وهمية باسم **"شركة الابداع المميز المحدودة"** لتجربة جميع وظائف نظام إدارة الشركات بشكل واقعي.

### 📊 بيانات الشركة

- **اسم الشركة**: شركة الابداع المميز المحدودة
- **الاسم الإنجليزي**: Distinctive Creativity Co. Ltd.
- **تاريخ التأسيس**: قبل 3 سنوات من التاريخ الحالي
- **المقر**: الرياض، المملكة العربية السعودية
- **عدد الموظفين**: 15 موظف
- **عدد المشاريع**: 20 مشروع
- **سجل الحضور والانصراف**: 3 سنوات كاملة
- **الفواتير والمصروفات**: بيانات مالية شاملة

---

## 🗂️ هيكلية البيانات

### 1. ملف تعريف الشركة (`companyData.ts`)
```typescript
interface CompanyProfile {
  name: string;              // اسم الشركة
  nameEn: string;            // الاسم بالإنجليزية
  crNumber: string;          // الرقم التجاري
  taxNumber: string;         // الرقم الضريبي
  establishmentDate: string; // تاريخ التأسيس
  address: string;           // العنوان
  city: string;              // المدينة
  phone: string;             // الهاتف
  email: string;             // البريد الإلكتروني
  activities: string[];      // الأنشطة
}
```

### 2. الموظفون (15 موظف)
```typescript
interface Employee {
  id: string;
  employeeNumber: string;    // EMP0001, EMP0002...
  name: string;              // الاسم بالعربية
  nameEn: string;            // الاسم بالإنجليزية
  position: string;          // المنصب
  department: string;        // القسم
  joinDate: string;          // تاريخ التعيين
  salary: number;            // الراتب الأساسي
  email: string;             // البريد الإلكتروني
  phone: string;             // رقم الهاتف
  nationality: string;       // الجنسية
  iqama?: string;            // رقم الإقامة
  status: 'active' | 'on_leave' | 'terminated';
}
```

#### توزيع الموظفين:
| المنصب | العدد | الراتب التقريبي |
|--------|-------|-----------------|
| مدير عام | 1 | 45,000 ر.س |
| مدير مشاريع | 2 | 28,000 ر.س |
| مطور برمجيات أول | 3 | 22,000 ر.س |
| مطور برمجيات | 4 | 15,000 ر.س |
| محاسب | 2 | 12,000 ر.س |
| أخصائي موارد بشرية | 1 | 11,000 ر.س |
| مدير مبيعات | 1 | 18,000 ر.س |
| أخصائي دعم فني | 1 | 9,000 ر.س |

### 3. المشاريع (20 مشروع)
```typescript
interface Project {
  id: string;
  projectNumber: string;     // PRJ0001, PRJ0002...
  name: string;              // اسم المشروع
  nameEn: string;            // الاسم بالإنجليزية
  client: string;            // اسم العميل
  startDate: string;         // تاريخ البداية
  endDate: string;           // تاريخ النهاية
  budget: number;            // الميزانية
  status: 'active' | 'completed' | 'on_hold' | 'planning';
  managerId: string;         // معرف مدير المشروع
  teamMemberIds: string[];   // أعضاء الفريق
}
```

#### أنواع المشاريع:
- تطوير تطبيقات ويب
- تطوير تطبيقات جوال
- استشارات تقنية
- تكامل أنظمة
- حلول سحابية
- أمن سيبراني
- تحول رقمي
- دعم وصيانة

#### العملاء:
وزارة التعليم، وزارة الصحة، أرامكو السعودية، سابك، الراجحي المالية، مجموعة الطيار للسفر، شركة الاتصالات السعودية، بنك الرياض، مدينة الملك عبدالله الطبية، جامعة الملك سعود، هيئة الطيران المدني، صندوق الاستثمارات العامة، نيوم، الخطوط الجوية السعودية، مجموعة عبداللطيف جميل

### 4. الحضور والانصراف
```typescript
interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;              // YYYY-MM-DD
  checkIn: string | null;    // وقت الدخول
  checkOut: string | null;   // وقت الخروج
  status: 'present' | 'absent' | 'late' | 'early_leave' | 'on_leave' | 'weekend';
  lateMinutes: number;       // دقائق التأخير
  notes?: string;
}
```

**إجمالي السجلات**: حوالي 11,700 سجل حضور (15 موظف × ~780 يوم عمل على مدى 3 سنوات)

### 5. طلبات الإجازات
```typescript
interface LeaveRequest {
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
```

### 6. سجلات الرواتب
```typescript
interface PayrollRecord {
  id: string;
  employeeId: string;
  month: string;             // YYYY-MM
  baseSalary: number;        // الراتب الأساسي
  allowances: number;        // البدلات (20%)
  overtime: number;          // ساعات إضافية
  deductions: number;        // الخصومات
  bonus: number;             // المكافآت
  netSalary: number;         // صافي الراتب
  paymentDate: string;
  status: 'paid' | 'pending' | 'processing';
}
```

**إجمالي السجلات**: حوالي 540 سجل رواتب (15 موظف × 36 شهر)

### 7. الفواتير
```typescript
interface Invoice {
  id: string;
  invoiceNumber: string;     // INV-PRJ0001-001
  projectId: string;
  clientId: string;
  amount: number;            // المبلغ قبل الضريبة
  vat: number;               // ضريبة القيمة المضافة (15%)
  total: number;             // الإجمالي
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  items: InvoiceItem[];
}
```

### 8. المصروفات
```typescript
interface Expense {
  id: string;
  expenseNumber: string;     // EXP-2024-00001
  category: string;          // رواتب، إيجار، مرافق، معدات...
  description: string;
  amount: number;
  date: string;
  projectId?: string;
  employeeId?: string;
  status: 'approved' | 'pending' | 'rejected';
  receiptNumber?: string;
}
```

---

## 🚀 كيفية الاستخدام

### 1. تثبيت المكتبات المطلوبة

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom happy-dom
```

### 2. إنشاء بيانات العرض التوضيحي

```typescript
import { demoDataService } from './src/demo/services/demoService';

// إنشاء جميع البيانات
const data = await demoDataService.generateDemoData();

console.log('الشركة:', data.company);
console.log('الموظفين:', data.employees.length);
console.log('المشاريع:', data.projects.length);
console.log('سجلات الحضور:', data.attendance.length);
```

### 3. الوصول إلى البيانات

```typescript
// الحصول على الموظفين
const employees = demoDataService.getEmployees();

// الحصول على موظف معين
const employee = demoDataService.getEmployeeById('employee-id');

// الحصول على المشاريع
const projects = demoDataService.getProjects();

// الحصول على سجلات الحضور لموظف معين
const attendance = demoDataService.getAttendanceRecords(employeeId, startDate, endDate);

// الحصول على الفواتير
const invoices = demoDataService.getInvoices(projectId, status);

// الحصول على الإحصائيات
const stats = demoDataService.getStatistics();
console.log(stats);
// {
//   totalRevenue: 15000000,
//   totalExpenses: 8000000,
//   profit: 7000000,
//   activeProjects: 12,
//   completedProjects: 6,
//   activeEmployees: 14,
//   ...
// }
```

### 4. استخدام مكون Dashboard

```tsx
import DemoDashboard from './src/demo/components/DemoDashboard';

function App() {
  return <DemoDashboard />;
}
```

---

## 📱 واجهة العرض التوضيحي

### التبويبات الرئيسية:

#### 1. نظرة عامة 📊
- بطاقات الإحصائيات الرئيسية
- معلومات الشركة
- أحدث المشاريع

#### 2. الموظفين 👥
- جدول بجميع الموظفين (15 موظف)
- تفاصيل كل موظف (المنصب، القسم، الراتب، الحالة)

#### 3. المشاريع 📁
- قائمة بجميع المشاريع (20 مشروع)
- تفاصيل المشروع (العميل، الميزانية، الفريق، الفترة)

#### 4. المالية 💰
- **الفواتير**: سجل الفواتير مع حالة الدفع
- **المصروفات**: تصنيفات المصروفات المختلفة
- **الرواتب**: كشوف الرواتب الشهرية

---

## 🔧 الخدمات المتاحة

### DemoDataService

```typescript
class DemoDataService {
  // إنشاء البيانات
  generateDemoData(): Promise<DemoData>;
  
  // الحصول على البيانات
  getCompany(): CompanyProfile | null;
  getEmployees(): Employee[];
  getEmployeeById(id: string): Employee | undefined;
  getProjects(): Project[];
  getProjectById(id: string): Project | undefined;
  getAttendanceRecords(employeeId?, startDate?, endDate?): AttendanceRecord[];
  getLeaveRequests(employeeId?): LeaveRequest[];
  getPayrollRecords(employeeId?, month?): PayrollRecord[];
  getInvoices(projectId?, status?): Invoice[];
  getExpenses(projectId?, category?): Expense[];
  
  // الإحصائيات
  getStatistics(): Statistics;
  
  // تصدير البيانات
  exportToJson(): string;
  
  // إعادة تعيين
  reset(): void;
}
```

---

## 📊 الإحصائيات المتوقعة

بناءً على البيانات المُنشأة:

| المؤشر | القيمة المتوقعة |
|--------|-----------------|
| إجمالي الإيرادات | 15-25 مليون ر.س |
| إجمالي المصروفات | 8-12 مليون ر.س |
| صافي الربح | 5-10 مليون ر.س |
| عدد الموظفين النشطين | 13-15 |
| المشاريع النشطة | 8-12 |
| المشاريع المكتملة | 6-10 |
| الفواتير المدفوعة | 60-80% |
| الفواتير المستحقة | 5-15 |
| سجلات الحضور | ~11,700 |
| طلبات الإجازات | 30-60 |
| سجلات الرواتب | ~540 |

---

## 🎯 حالات الاستخدام

### 1. اختبار وظائف الموارد البشرية
```typescript
// عرض جميع الموظفين
const employees = demoDataService.getEmployees();

// تصفية حسب القسم
const itDept = employees.filter(e => e.department === 'تقنية المعلومات');

// عرض سجلات الحضور لشهر معين
const attendance = demoDataService.getAttendanceRecords(
  undefined, 
  '2024-01-01', 
  '2024-01-31'
);

// حساب نسبة الحضور
const presentDays = attendance.filter(a => a.status === 'present').length;
const attendanceRate = (presentDays / attendance.length) * 100;
```

### 2. اختبار إدارة المشاريع
```typescript
// عرض المشاريع النشطة
const activeProjects = demoDataService.getProjects().filter(p => p.status === 'active');

// عرض مشاريع عميل معين
const aramcoProjects = projects.filter(p => p.client === 'أرامكو السعودية');

// حساب إجمالي ميزانيات المشاريع
const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
```

### 3. اختبار النظام المالي
```typescript
// عرض الفواتير المستحقة
const overdueInvoices = demoDataService.getInvoices(undefined, 'overdue');

// عرض المصروفات حسب التصنيف
const salaryExpenses = demoDataService.getExpenses(undefined, 'رواتب');

// حساب إجمالي الرواتب المدفوعة
const payroll = demoDataService.getPayrollRecords();
const totalSalaries = payroll.reduce((sum, p) => sum + p.netSalary, 0);
```

### 4. اختبار التقارير والإحصائيات
```typescript
const stats = demoDataService.getStatistics();

console.log(`
  تقرير أداء الشركة
  ==================
  الإيرادات: ${formatSalary(stats.totalRevenue)}
  المصروفات: ${formatSalary(stats.totalExpenses)}
  الربح: ${formatSalary(stats.profit)}
  هامش الربح: ${(stats.profit / stats.totalRevenue * 100).toFixed(2)}%
  
  المشاريع:
  - نشطة: ${stats.activeProjects}
  - مكتملة: ${stats.completedProjects}
  
  الموظفين: ${stats.activeEmployees}/${stats.totalEmployees}
  
  الفواتير:
  - قيد الانتظار: ${stats.pendingInvoices}
  - مستحقة: ${stats.overdueInvoices}
`);
```

---

## 🔄 إعادة إنشاء البيانات

يمكن إعادة إنشاء بيانات جديدة في أي وقت:

```typescript
// إعادة تعيين البيانات الحالية
demoDataService.reset();

// إنشاء بيانات جديدة عشوائية
const newData = await demoDataService.generateDemoData();
```

**ملاحظة**: البيانات تُولد بشكل عشوائي في كل مرة، لذا ستحصل على قيم مختلفة في كل تشغيل.

---

## 📝 ملاحظات هامة

1. **الأسماء والبيانات**: جميع الأسماء والبيانات المستخدمة هي بيانات وهمية لأغراض العرض فقط.

2. **التواريخ**: يتم إنشاء 3 سنوات كاملة من البيانات التاريخية تلقائياً.

3. **الأرقام المالية**: جميع المبالغ بالريال السعودي وتشمل ضريبة القيمة المضافة (15%).

4. **أيام العمل**: يتم إنشاء سجلات الحضور لأيام العمل فقط (الأحد - الخميس).

5. **العطلات**: يتم استبعاد عطلات نهاية الأسبوع تلقائياً من سجلات الحضور.

---

## 🎨 تخصيص البيانات

يمكن تعديل معاملات توليد البيانات في `dataGenerator.ts`:

```typescript
// تعديل عدد الموظفين
const employeeConfigs = [
  { position: 'مطور برمجيات', count: 10 }, // زيادة العدد
];

// تعديل الرواتب
const salary = config.salary + Math.floor(Math.random() * 5000);

// تعديل فترة البيانات
companyStart.setFullYear(companyStart.getFullYear() - 5); // 5 سنوات
```

---

## 📞 الدعم

لأي استفسارات حول نظام العرض التوضيحي، يرجى التواصل مع فريق التطوير.

**تم تطويره بواسطة**: فريق تطوير أنظمة إدارة الشركات
**الإصدار**: 1.0.0
**تاريخ آخر تحديث**: 2024
