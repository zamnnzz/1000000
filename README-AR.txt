نسخة جاهزة للرفع المباشر على Vercel — لا تحتاج npm ولا Vite Build.

ارفع محتويات هذا المجلد كما هي:
index.html
styles.css
vercel.json
robots.txt
sitemap.xml
src/
screenshots/

هذه النسخة لا تستخدم Babel. React وFirebase يُحمّلان كنسخ Production من CDN، والكود مقسّم إلى ملفات ES Modules محلية.
