# من أنا؟ — Firebase الجديد

المشروع مربوط الآن على:
`mn-ana-game-19256`

الصفحات:
- `/` أو `index.html` — شاشة البداية وإدخال أسماء الفرق.
- `/game.html` — شاشة اللعبة الرئيسية.
- `/host.html` — واجهة المقدم.
- `/buzzer.html` — واجهة الجرس.

قاعدة البيانات:
`https://mn-ana-game-19256-default-rtdb.europe-west1.firebasedatabase.app`

## للتجربة
تأكد أن Realtime Database Rules تسمح بالقراءة والكتابة أثناء الاختبار.

مثال مؤقت:
{
  "rules": {
    ".read": true,
    ".write": true
  }
}

لا تستخدم القواعد المفتوحة في النسخة العامة النهائية.
