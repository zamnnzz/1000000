# تقرير تحسين SEO — ألعاب زامن

## التعديلات المنفذة

- إزالة canonical الثابت للرئيسية من HTML المشترك لتجنب تعارضه مع صفحات الألعاب والمدونة.
- إنشاء canonical الصحيح لكل مسار بواسطة JavaScript.
- إضافة وسوم Open Graph وTwitter كاملة وتحديثها حسب اللعبة أو المقال.
- إضافة `og:locale` و`og:site_name` وسياسة robots موسعة.
- إزالة تحميل Tailwind المكرر.
- إضافة محتوى وروابط داخل `<noscript>` لتحسين قابلية الاكتشاف عند تعذر JavaScript.
- جعل Structured Data مختلفًا حسب الصفحة:
  - الصفحة الرئيسية: WebSite + Organization + ItemList + FAQPage.
  - اللعبة: Product + BreadcrumbList.
  - المقال: Article.
  - المدونة: Blog.
- إضافة مسارات `/blog` و`/blog/:slug` إلى Vercel rewrites.
- تحديث sitemap ليشمل الألعاب والمدونة والمقالات مع `lastmod`.
- تحديث robots.txt وربطه بخريطة الموقع.

## أهم ملاحظة

هذه النسخة تحسن الوضع الحالي، لكنها ما زالت Client-Side Rendered. الأفضل على المدى الجاد هو إنشاء HTML ثابت مسبقًا لكل رابط لعبة ومقال (SSG/SSR)، لأن ذلك يجعل العنوان والوصف والمحتوى وبيانات المشاركة موجودة في الاستجابة الأولى بدون انتظار JavaScript.

## النشر

ارفع الملفات كما يلي في مشروع Vercel:

- `index.html`
- `script.js`
- `vercel.json`
- `sitemap.xml` داخل مجلد `public` أو جذر النشر بحسب إعداد مشروعك.
- `robots.txt` داخل مجلد `public` أو جذر النشر بحسب إعداد مشروعك.

بعد النشر:

1. افتح كل رابط لعبة مباشرة وتأكد أنه يعمل.
2. أرسل sitemap في Google Search Console.
3. اختبر الصفحة الرئيسية وصفحة لعبة وصفحة مقال في URL Inspection وRich Results Test.
4. اطلب إعادة الفهرسة للصفحات المهمة.
