الجواب المجهول - نسخة Firebase

1) ثبّت Firebase CLI إن لم يكن موجوداً:
   npm install -g firebase-tools
2) سجّل الدخول:
   firebase login
3) من داخل هذا المجلد:
   firebase deploy --only hosting,database

مهم: database.rules.json قواعد مؤقتة للاختبار. يجب تشديدها قبل النشر العام.
