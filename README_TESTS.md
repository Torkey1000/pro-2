# إعداد وتشغيل اختبارات الوحدة (Unit Tests)

تم إضافة اختبارات الوحدة للمشروع باستخدام Vitest و React Testing Library.

## المكتبات المطلوبة

لتثبيت المكتبات اللازمة للاختبار، قم بتشغيل:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom happy-dom
```

## تشغيل الاختبارات

### تشغيل جميع الاختبارات في وضع المراقبة (Watch Mode)
```bash
npm test
```

### تشغيل الاختبارات مرة واحدة دون مراقبة
```bash
npm test run
```

### تشغيل الاختبارات مع تغطية الكود (Coverage)
```bash
npm run test:coverage
```

### تشغيل واجهة المستخدم للاختبارات (UI)
```bash
npm run test:ui
```

### تشغيل اختبار محدد
```bash
npm test -- formatters.test.ts
```

## هيكل الملفات

```
src/
├── utils/
│   ├── formatters.ts          # الملف الأصلي
│   └── formatters.test.ts     # ملف الاختبار
└── test/
    └── setup.ts               # إعدادات الاختبار
```

## كتابة اختبارات جديدة

لإضافة اختبارات لملف جديد، اتبع النمط التالي:

1. أنشئ ملف اختبار بنفس الاسم مع لاحقة `.test.ts` بجانب الملف الأصلي
2. استخدم `describe` لتجميع الاختبارات ذات الصلة
3. استخدم `it` أو `test` لكتابة حالات الاختبار الفردية
4. استخدم `expect` للتحقق من النتائج

### مثال:

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from './myFile';

describe('myFunction', () => {
  it('should return expected value', () => {
    const result = myFunction(input);
    expect(result).toBe(expectedValue);
  });
});
```

## الاختبارات الموجودة حاليًا

تم إنشاء اختبارات للملف `src/utils/formatters.ts` وتشمل:

- `formatDate`: اختبار تنسيق التواريخ
- `formatSalary`: اختبار تنسيق الرواتب
- `formatNumber`: اختبار تنسيق الأرقام
- `formatPercentage`: اختبار تنسيق النسب المئوية
- `getStatusColor`: اختبار ألوان الحالات

## ملاحظات

- تعمل الاختبارات في بيئة `jsdom` لمحاكاة المتصفح
- تم إعداد `globals: true` لاستخدام `describe` و `it` و `expect` مباشرة دون استيراد
- يتم تحميل إعدادات الاختبار من `src/test/setup.ts`
