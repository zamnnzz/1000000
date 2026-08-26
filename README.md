# من أنا؟ — النسخة 27

مبنية على النسخة 26 فقط.

إضافة Cache Busting:
- منع تخزين الصفحات والملفات في الكاش عبر vercel.json.
- إضافة no-cache / no-store داخل جميع صفحات HTML.
- firebase-config.js يحمل رقم إصدار ?v=27.
- روابط host/game/buzzer تحمل ?v=27 مع Session الحالي.
- لم يتم تغيير منطق اللعبة أو التصميم أو Firebase data model.

بعد رفع هذه النسخة على Vercel، افتح رابط المشروع من جديد.
