# من أنا؟ — النسخة 21

مبنية على النسخة 20 فقط.

التغيير الوحيد الكبير داخليًا: عزل كل لعبة في Session مستقل.

كل بداية لعبة جديدة تنشئ gameSessionId جديد، وتصبح بياناتها تحت:
mn_ana_sessions/{gameSessionId}

داخل الجلسة نفسها:
- teams
- settings
- round / question
- buzzer
- players
- history
- display
- presence/host
- results / progression state

روابط QR:
- host.html?session=...
- buzzer.html?session=...
- game.html?session=...

النتيجة:
- لعبة قديمة لا تؤثر على لعبة جديدة.
- هوست قديم لا يؤثر على الجلسة الحالية.
- جرس من جلسة قديمة لا يسجل داخل الجلسة الجديدة.
- اللاعب نفسه يمكنه الدخول لجلسة جديدة بدون اختلاط بياناته القديمة.
- QR الإعدادات داخل شاشة اللعبة يحتفظ بنفس Session.

لم يتم تغيير التصميم أو النقاط أو x2 أو الفقرات أو النتائج أو طريقة اللعب.
