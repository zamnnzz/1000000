# من أنا؟ — Firebase

الملفات:
- `host.html` واجهة المقدم.
- `buzzer.html` واجهة الجرس للمتسابقين.
- `firebase-config.js` إعداد Firebase.

## التشغيل
لا تفتح الملفات مباشرة باستخدام `file://` في بعض المتصفحات. شغّلها من أي استضافة Static أو localhost.

مثال سريع:
```bash
python -m http.server 8080
```
ثم:
- http://localhost:8080/host.html
- http://localhost:8080/buzzer.html

## Firebase Realtime Database
المسار المستخدم:
`/mn_ana`

تحتاج قواعد Realtime Database تسمح للأجهزة المستخدمة بالقراءة والكتابة.
للتجربة الخاصة فقط يمكن استخدام قواعد مفتوحة مؤقتًا، لكن لا تستخدمها في إنتاج عام.
الأفضل لاحقًا إضافة Firebase Authentication وقواعد مقيّدة للمقدم والمتسابقين.

## ملاحظة مهمة
الـ apiKey الموجود في الملف مطابق للنص الذي أرسلته. إذا كنت قد أخفيت جزءًا منه بـ `xxxxxxxx` فلن يتصل Firebase حتى تضع المفتاح الحقيقي.
