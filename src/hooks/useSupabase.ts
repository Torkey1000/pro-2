
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'x-my-custom-header': 'my-app-name',
    },
  },
});

// إضافة وظائف مساعدة للتعامل مع قاعدة البيانات
export const handleDatabaseError = (error: any) => {
  console.error('Database Error:', error);
  let errorMessage = 'حدث خطأ في قاعدة البيانات';
  
  if (error.message) {
    errorMessage = error.message;
  } else if (error.details) {
    errorMessage = error.details;
  }
  
  return errorMessage;
};

// التحقق من صحة البيانات قبل الإرسال
export const validateData = (data: any, requiredFields: string[]) => {
  const errors = [];
  
  for (const field of requiredFields) {
    if (!data[field] || data[field].toString().trim() === '') {
      errors.push(`الحقل ${field} مطلوب`);
    }
  }
  
  return errors;
};

// إنشاء دالة لإضافة خصائص للملف المرفق
export const addAttachmentMetadata = (journalEntry: any, attachmentUrl?: string) => {
  if (attachmentUrl) {
    // استخدام spread operator للحفاظ على البيانات الموجودة وإضافة خاصية جديدة
    return {
      ...journalEntry,
      attachment_url: attachmentUrl
    };
  }
  return journalEntry;
};
