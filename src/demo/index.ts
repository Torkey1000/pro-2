/**
 * نقطة الدخول الرئيسية لنظام العرض التوضيحي
 * شركة الابداع المميز المحدودة
 */

export { demoDataService, DemoDataService } from './services/demoService';
export { generateAllDemoData } from './generators/dataGenerator';

export type {
  Employee,
  Project,
  AttendanceRecord,
  LeaveRequest,
  PayrollRecord,
  Invoice,
  InvoiceItem,
  Expense,
  CompanyProfile
} from './data/companyData';

export {
  DEPARTMENTS,
  POSITIONS,
  PROJECT_TYPES,
  CLIENTS
} from './data/companyData';

// تصدير مكون Dashboard للاستخدام المباشر
// export { default as DemoDashboard } from './components/DemoDashboard';

/**
 * دالة مساعدة سريعة لإنشاء البيانات وعرض الإحصائيات
 */
export async function quickDemo() {
  const { demoDataService } = await import('./services/demoService');
  
  console.log('🏢 جاري إنشاء بيانات العرض التوضيحي...\n');
  
  const data = await demoDataService.generateDemoData();
  const stats = demoDataService.getStatistics();
  
  console.log('\n✅ تم إنشاء البيانات بنجاح!\n');
  console.log('📊 إحصائيات الشركة:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🏢 الشركة: ${data.company.name}`);
  console.log(`📅 تاريخ التأسيس: ${data.company.establishmentDate}`);
  console.log(`👥 الموظفون: ${stats.activeEmployees}/${stats.totalEmployees} نشط`);
  console.log(`📁 المشاريع: ${stats.activeProjects} نشط، ${stats.completedProjects} مكتمل`);
  console.log(`💰 الإيرادات: ${formatCurrency(stats.totalRevenue)} ر.س`);
  console.log(`💸 المصروفات: ${formatCurrency(stats.totalExpenses)} ر.س`);
  console.log(`📈 الربح: ${formatCurrency(stats.profit)} ر.س`);
  console.log(`📄 الفواتير: ${stats.totalInvoices} فاتورة (${stats.pendingInvoices} قيد الانتظار)`);
  console.log(`📋 الحضور: ${stats.totalAttendanceRecords} سجل`);
  console.log(`🏖️ الإجازات: ${stats.totalLeaveRequests} طلب`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  return { data, stats };
}

function formatCurrency(amount: number): string {
  return amount.toLocaleString('ar-SA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}
