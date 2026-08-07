const firebaseConfig = {
    apiKey: "AIzaSyCzvg6chpSyNPGm_rS8F83Ig8WLhD3pxr8",
    authDomain: "zamn-games.firebaseapp.com",
    databaseURL: "https://zamn-games-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "zamn-games",
    storageBucket: "zamn-games.firebasestorage.app",
    messagingSenderId: "171536871956",
    appId: "1:171536871956:web:4a1a8c1986bf4ecd63ed01"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const games = [
    {
        id: 1,
        slug: "horof-bell",
        code: "1950",
        name: "حروف والوف مع جرس مدمج",
        image: "https://i.postimg.cc/HxwQWmFr/image-(1).jpg",
        screenshots: [
            "/screenshots/horof/1.webp",
            "/screenshots/horof/2.webp",
            "/screenshots/horof/3.webp",
            "/screenshots/horof/4.webp",
            "/screenshots/horof/5.webp",
        ],
        rating: "5",
        description: "لعبة حروف تفاعلية للمتصفح بدون تحميل. تنافس مع أصدقائك في تكوين الكلمات وتحقيق أعلى النقاط في جو مليء بالحماس والتحدي.",
        reviews: [
            { name: " علي الكاف ", stars: "⭐⭐⭐⭐⭐", comment: " " },
            { name: " عمار يحيى  ", stars: "⭐⭐⭐⭐⭐", comment: " " },
            { name: "  Lory Az ", stars: "⭐⭐⭐⭐⭐", comment: " " },
            { name: " salem bandr  ", stars: "⭐⭐⭐⭐⭐", comment: " " }
        ],
        players: "تدعم الجوال",
        category: "لعبة جماعية",
        questions: "أكثر من 2000 سؤال",
        badge: "جرس مدمج  ",
        status: "متاحة الآن",
        price: "12.99 ريال",
        priceValue: 12.99,
        priceCurrency: "SAR",
        buyLink: "https://zamn1.com/%D8%B3%D8%A8%D8%A7%D9%82-%D8%A7%D9%84%D8%AD%D8%B1%D9%88%D9%81-%D8%AD%D8%B1%D9%88%D9%81-%D9%85%D8%B9-%D8%B9%D8%B2%D9%8A%D8%B2-%D8%A7%D9%84%D9%86%D8%B3%D8%AE%D8%A9-%D8%A7%D9%84%D8%AC%D8%AF%D9%8A%D8%AF%D8%A9/p769912795",
        playLink: "https://asdfrrrr444.oneapp.dev/",
        trialKey: "trial_letters_1"
    },
    {
        id: 2,
        slug: "horof",
        code: "19050",
        name: "حروف والوف ",
        image: "https://i.postimg.cc/kgRSbkTC/2222222.webp",
        screenshots: [
            "/screenshots/horof-bell/1.webp",
            "/screenshots/horof-bell/2.webp",
            "/screenshots/horof-bell/3.webp",
            "/screenshots/horof-bell/4.webp"
        ],
        rating: "5",
        description: "الجزء الثاني من لعبة حروف والوف بتحديات جديدة وجو جماعي ممتع.",
        reviews: [
            { name: "R لمياء", stars: "⭐⭐⭐⭐⭐", comment: "تعاملهم جدا جميل وسرعين بالرد 👍🏻" },
            { name: " yomn Abodalkarem", stars: "⭐⭐⭐⭐⭐", comment: "لعبة رائعة ممتعة" },
            { name: "عبدالعزيز خلف خلف", stars: "⭐⭐⭐⭐⭐", comment: "جامد " },
            { name: "نسرين القحطاني", stars: "⭐⭐⭐⭐⭐", comment: "" },
            { name: "J***** A*****", stars: "⭐⭐⭐⭐⭐", comment: "" },
        ],
        category: "لعبة جماعية",
        players: "٢+ لاعبين",
        questions: "أكثر من 2000 سؤال",
        status: "متاحة الآن",
        price: "4.99 ريال",
        priceValue: 4.99,
        priceCurrency: "SAR",
        buyLink: "https://zamn1.com/%D8%AD%D8%B1%D9%88%D9%81-%D9%85%D8%B9-%D8%B9%D8%B2%D9%8A%D8%B2-%D8%A7%D9%88-%D8%AD%D8%B1%D9%88%D9%81-%D9%88-%D8%A7%D9%84%D9%88%D9%81/p967171060",
        playLink: "https://5rof.oneapp.dev/",
        trialKey: "trial_letters_2"
    },
    {
        id: 3,
        slug: "photos-1",
        code: "1950",
        name: "تحدي الصور الجزء الاول ",
        image: "https://i.postimg.cc/wMkRQmr5/alawl-bʿd-alatar.webp",
        rating: "4.6",
        description: "تقدر تجيب الحل بسرعة؟  تعرّف على الصور الغامضة وتحدَّ أصدقاءك في لعبة بصرية ممتعة. متعة ومنافسة تعتمد على دقة الملاحظة وسرعة البديهة.",
        reviews: [
            { name: "ابراهيم اليامي", stars: "⭐⭐⭐⭐⭐", comment: "امانه توي شريت والرجال جدا محترم و الالعاب جميله" },
            { name: "ابو سلطان", stars: "⭐⭐⭐⭐⭐", comment: "" },
            { name: " Basma Ahmed", stars: "⭐⭐⭐⭐⭐", comment: "" },
            { name: "احمد القحطاني ", stars: "⭐⭐⭐⭐⭐", comment: "" }
        ],
        category: "تحديات",
        players: "٢+ لاعبين",
        badge: "الغاز بصريه",
        status: "متاحة الآن",
        price: "4.99 ريال",
        priceValue: 4.99,
        priceCurrency: "SAR",
        buyLink: "https://zamn1.com/%D8%AA%D8%AD%D8%AF%D9%8A-%D8%AE%D9%85%D9%86-%D8%A7%D9%84%D8%B5%D9%88%D8%B1%D9%87-%D8%A7%D8%A8%D9%88-%D8%B9%D9%85%D8%B1/p1919105503",
        playLink: "https://tpvdhgwmn.oneapp.dev/",
        trialKey: "trial_photos_1"
    },
    {
        id: 4,
        slug: "photos-2",
        code: "1850",
        name: "تحدي الصور الجزء الثاني",
        image: "https://i.postimg.cc/rF8rFfdZ/althany-bʿd-alatar.webp",
        rating: "4.8",
        description: "تحدي الصور الجزء الثاني لعبة جماعية تحتوي على صور وألغاز جديدة لاختبار سرعة الملاحظة والتخمين، مناسبة للعائلة والأصدقاء وتعمل مباشرة من المتصفح.",
        reviews: [
            { name: "عمار يحيى", stars: "⭐⭐⭐⭐⭐", comment: "" },
            { name: " راكان عسيري", stars: "⭐⭐⭐⭐⭐", comment: "" }
        ],
        category: "تحديات",
        players: "2 - 15",
        badge: "الغاز بصريه",
        status: "متاحة الآن",
        price: "7.5 ريال",
        priceValue: 7.5,
        priceCurrency: "SAR",
        buyLink: "https://zamn1.com/%D8%AA%D8%AD%D8%AF%D9%8A-%D8%A7%D9%84%D8%B5%D9%88%D8%B1-%D8%A7%D9%84%D8%AC%D8%B2%D8%A1-%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A/p893537775",
        playLink: "https://191919jsjs.oneapp.dev/",
        trialKey: "trial_photos_2"
    },
    {
        id: 5,
        slug: "photos-3",
        code: "17007",
        name: "تحدي الصور الجزء الثالث",
        image: "https://i.postimg.cc/5NxCNsH7/althalth-bʿd-azalh-alatar.webp",
        rating: "4.9",
        description: "الجزء الثالث من تحدي الصور بتحديات أكثر وحماس أعلى.",
        reviews: [],
        category: "تحديات",
        players: "2 - 15",
        badge: "الغاز بصريه",
        status: "متاحة الآن",
        price: "9.99 ريال",
        priceValue: 9.99,
        priceCurrency: "SAR",
        buyLink: "https://zamn1.com/%D8%AA%D8%AD%D8%AF%D9%8A-%D8%A7%D9%84%D8%B5%D9%88%D8%B1-%D8%A7%D9%84%D8%AC%D8%B2%D8%A1-%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB/p130244934",
        playLink: "https://asddsafg.oneapp.dev/",
        trialKey: "trial_photos_3"
    },
    {
        id: 6,
        slug: "family-feud",
        code: "19009",
        name: "فاميلي فيود",
        image: "https://i.postimg.cc/PxsWkJVD/famyly.jpg",
        screenshots: [
            "/screenshots/family-feud/1.webp",
            "/screenshots/family-feud/2.webp"
        ],
        rating: "5.0",
        description: "لعبة فاميلي فيود التفاعلية للمتصفح بدون تحميل. تنافس مع عائلتك وأصدقائك في تخمين الإجابات الأكثر شيوعاً في جو مليء بالحماس والضحك.",
        reviews: [
            { name: "محمد", stars: "⭐⭐⭐⭐⭐", comment: "" },
            { name: "عبدالوهاب الوادعي", stars: "⭐⭐⭐⭐⭐", comment: "" },
            { name: "راكان عسيري", stars: "⭐⭐⭐⭐⭐", comment: "" },
            { name: "فارس البرغش", stars: "⭐⭐⭐⭐⭐", comment: "" },
        ],
        category: "عائلية",
        players: "٢+ لاعبين",
        badge: "تحدي التخمين",
        status: "متاحة الآن",
        price: "4.99 ريال",
        priceValue: 4.99,
        priceCurrency: "SAR",
        buyLink: "https://zamn1.com/%D9%81%D8%A7%D9%85%D9%8A%D9%84%D9%8A-%D9%81%D9%8A%D9%88%D8%AF/p1311241515",
        playLink: "https://familyfeud0.oneapp.dev/",
        trialKey: "trial_family_1"
    },
    {
        id: 7,
        slug: "fawazeer",
        code: "20026",
        name: "فوازير ",
        image: "https://i.postimg.cc/7PBx09tP/dwn-ʿnwan-(1280-x-960-byksl).webp",
        screenshots: [
            "/screenshots/fawazeer/1.webp",
            "/screenshots/fawazeer/2.webp",
            "/screenshots/fawazeer/3.webp"
        ],
        rating: "4.7",
        description: "لعبة فوازير تفاعلية للمتصفح بدون تحميل. تنافس مع أصدقائك في حل الفوازير والأسئلة الممتعة مع بطاقات خاصة وجو مليء بالحماس.",
        reviews: [
            { name: "مشاري التويم", stars: "⭐⭐⭐⭐⭐", comment: "اسئلة حلوة وخفيفه" },
            { name: "عبدالهادي الوادعي", stars: "⭐⭐⭐⭐⭐", comment: " " },
            { name: "عمار يحيى", stars: "⭐⭐⭐⭐⭐", comment: "" }
        ],
        category: "ثقافية",
        players: "فوازير وأسئلة",
        badge: "٢+ لاعبين",
        status: "متاحة الآن",
        price: "7.99 ريال",
        priceValue: 7.99,
        priceCurrency: "SAR",
        buyLink: "https://zamn1.com/%D9%81%D9%88%D8%A7%D8%B2%D9%8A%D8%B1-%D8%A7%D8%A8%D9%88-%D8%B9%D9%85%D8%B1/p1743830549",
        playLink: "https://fwazer.oneapp.dev/",
        trialKey: "trial_questions_1"
    },
    {
        id: 8,
        slug: "guess-link",
        code: "20066",
        name: "خمن الرابط",
        image: "https://i.postimg.cc/zBZC1v2v/rbt.jpg",
        screenshots: [
            "/screenshots/guess-link/1.webp",
            "/screenshots/guess-link/2.webp",
            "/screenshots/guess-link/3.webp",
            "/screenshots/guess-link/4.webp"
        ],
        rating: "4.9",
        description: "لعبة جماعية تعتمد على ربط الصور وتخمين الإجابة الصحيحة بأسرع وقت قبل الفريق المنافس.",
        reviews: [
            { name: "سلمان", stars: "⭐⭐⭐⭐⭐", comment: "فكرة اللعبة رهيبة وممتعة." },
            { name: "نورة", stars: "⭐⭐⭐⭐⭐", comment: "مناسبة للجلسات والتحديات." }
        ],
        category: "تحديات",
        players: "٢+ لاعبين",
        badge: "تجميع الصور",
        status: "متاحة الآن",
        price: "4.99 ريال",
        priceValue: 4.99,
        priceCurrency: "SAR",
        buyLink: "https://zamn1.com/%D8%AA%D8%AD%D8%AF%D9%8A-%D8%AE%D9%85%D9%86-%D8%A7%D9%84%D8%B1%D8%A7%D8%A8%D8%B7/p1190070368",
        playLink: "https://rb60.oneapp.dev/",
        trialKey: "trial_guess_link_1"
    },
    {
        id: 9,
        slug: "alatrash",
        code: "140004",
        name: "مين الأطرش في الزفة",
        image: "https://i.postimg.cc/7683yhtb/alatrsh-qbl-aldght.jpg",
        screenshots: [
            "/screenshots/alatrash/1.webp",
            "/screenshots/alatrash/2.webp",
            "/screenshots/alatrash/3.webp",
            "/screenshots/alatrash/4.webp",
            "/screenshots/alatrash/5.webp"
        ],
        rating: "5.0",
        description: "لعبة تحرٍ اجتماعية مليئة بالضحك والذكاء، وتُعد نسخة محسنة من فكرة “برا السالفة”. يحصل أحد اللاعبين على سؤال مختلف دون أن يعلم، بينما يحاول الجميع كشفه من خلال إجاباته وتصرفاته. مناسبة لـ 3 لاعبين فأكثر، وتضمن جلسات مليئة بالحماس والمواقف المضحكة.",
        reviews: [],
        category: "5 - 20 دقيقة",
        players: "٣+ لاعبين",
        badge: "كتابة ",
        status: "متاحة الآن",
        price: "7.99 ريال",
        priceValue: 7.99,
        priceCurrency: "SAR",
        buyLink: "https://zamn1.com/%D8%A7%D9%84%D8%A3%D8%B7%D8%B1%D8%B4-%D9%81%D9%8A-%D8%A7%D9%84%D8%B2%D9%81%D8%A9-%7C-%D9%84%D8%B9%D8%A8%D8%A9-%D8%AC%D9%85%D8%A7%D8%B9%D9%8A%D8%A9/p2017869223",
        playLink: "https://alatrash.oneapp.dev/",
        trialKey: "trial_new_game_9"
    }
];
const articles = [
    {
        id: 1,
        slug: "how-to-play-horof",
        title: "طريقة لعب حروف وألوف",
        description: "تعرف على طريقة لعب حروف وألوف، وتقسيم الفرق واحتساب النقاط وبدء التحدي مع العائلة والأصدقاء.",
        date: "2026-08-02",
        category: "شرح الألعاب",
        content: [
            "لعبة حروف وألوف من أشهر الألعاب الجماعية التي تعتمد على سرعة التفكير وسرعة الإجابة، وهي مناسبة للجلسات العائلية وتجمعات الأصدقاء.",
            "قبل بدء اللعب يتم تقسيم المشاركين إلى فريقين أو أكثر، ثم يختار كل فريق حرفًا ويحاول الإجابة عن السؤال المرتبط به خلال الوقت المحدد.",
            "كل إجابة صحيحة تمنح الفريق نقطة، ويستمر التحدي حتى انتهاء جميع الحروف أو الوصول إلى عدد النقاط المتفق عليه بين اللاعبين.",
            "يمكن تشغيل اللعبة مباشرة من المتصفح على الجوال أو الكمبيوتر، كما يمكن عرضها على شاشة التلفزيون لتكون التجربة أكثر متعة لجميع المشاركين.",
            "تحتوي اللعبة على مئات الأسئلة المتنوعة التي تجعل كل جولة مختلفة عن الأخرى، لذلك تبقى المنافسة ممتعة حتى مع تكرار اللعب.",
            "إذا كنت تبحث عن لعبة جماعية عربية تعمل بدون تحميل وتناسب جميع الأعمار، فإن لعبة حروف وألوف من ألعاب زامن تعد خيارًا مناسبًا للجلسات العائلية والمناسبات."
        ]
    },
    {
        id: 2,
        slug: "ramadan-games-2026",
        title: "أفضل ألعاب رمضان 2026 للجمعات العائلية",
        description: "تعرف على أفضل ألعاب رمضان 2026 المناسبة للجلسات العائلية وتجمعات الأصدقاء، وتعمل مباشرة من المتصفح دون تحميل.",
        date: "2026-02-28",
        category: "ألعاب رمضان",
        content: [
            "يعد شهر رمضان من أفضل الأوقات لاجتماع العائلة والأصدقاء، ولذلك يبحث الكثير عن ألعاب جماعية تضيف أجواء من المرح بعد الإفطار وأثناء السهرات.",
            "إذا كنت تبحث عن ألعاب تعمل مباشرة من المتصفح دون تحميل، فإليك أفضل 7 ألعاب مناسبة لجلسات رمضان 2026.",
            "1- حروف وألوف: لعبة تعتمد على سرعة التفكير والإجابة، وتعد من أشهر ألعاب التحدي الجماعية.",
            "2- تحدي الصور: لعبة تعتمد على سرعة الملاحظة وتخمين الصور، وتناسب جميع الأعمار.",
            "3- فاميلي فيود: حاول تخمين الإجابات الأكثر شيوعًا وتنافس مع فريقك في أجواء مليئة بالحماس.",
            "4- فوازير: مجموعة كبيرة من الأسئلة والألغاز المناسبة للسهرات الرمضانية.",
            "5- خمن الرابط: لعبة تعتمد على ربط الصور للوصول إلى الإجابة الصحيحة قبل الفريق المنافس.",
            "6- مين الأطرش في الزفة: لعبة اجتماعية مليئة بالضحك تعتمد على الذكاء والملاحظة وكشف اللاعب المختلف.",
            "7- جميع ألعاب زامن تعمل مباشرة من المتصفح ويمكن تشغيلها على الجوال أو الكمبيوتر أو شاشة التلفزيون دون الحاجة إلى تحميل أي تطبيق، مما يجعلها خيارًا مثاليًا لسهرات رمضان 2026."
        ]
    }
];
const faqItems = [
    {
        question: "كيف أبدأ ألعب الألعاب؟",
        answer: "كل ما عليك هو فتح رابط الموقع من أي جهاز، سواء كان جوالًا أو جهازًا لوحيًا أو كمبيوتر، ثم تبدأ اللعب مباشرة دون الحاجة إلى تحميل أي تطبيق."
    },
    {
        question: "هل الألعاب مجانية؟",
        answer: "يمكنك تجربة بعض الألعاب مجانًا لمدة محدودة، وبعد انتهاء الفترة التجريبية يمكنك شراء اللعبة أو الباقة المناسبة من متجرنا."
    },
    {
        question: "كم عدد اللاعبين المطلوب؟",
        answer: "معظم ألعابنا تحتاج إلى لاعبين على الأقل، بينما تتطلب بعض الألعاب عددًا أكبر، وكلما زاد عدد المشاركين أصبحت اللعبة أكثر حماسًا ومتعة."
    },
    {
        question: "هل أستطيع عرض اللعبة على التلفزيون؟",
        answer: "نعم، يمكنك تشغيل اللعبة على التلفزيون أو أي شاشة كبيرة، بينما يستخدم كل لاعب هاتفه للمشاركة حسب طريقة اللعبة."
    },
    {
        question: "ما الفرق بين شراء لعبة واحدة وشراء الباقة؟",
        answer: "عند شراء لعبة واحدة تحصل على اللعبة التي اخترتها فقط، أما الباقة فتضم عدة ألعاب بسعر أقل من شراء كل لعبة بشكل منفصل، مما يمنحك خيارات أكثر وتوفيرًا أكبر."
    },
    {
        question: "هل أحتاج إلى اشتراك شهري؟",
        answer: "لا، يتم الدفع مرة واحدة فقط عند شراء اللعبة، وبعدها تبقى متاحة في حسابك دون أي رسوم أو اشتراكات شهرية."
    },
    {
        question: "إذا غيرت هاتفي، هل سأفقد اللعبة؟",
        answer: "لا، يمكنك تسجيل الدخول من أي جهاز جديد باستخدام رقم الجوال الذي استخدمته عند الشراء، وستتمكن من الوصول إلى ألعابك."
    },
    {
        question: "كيف يمكنني التواصل مع الدعم الفني؟",
        answer: "يمكنك التواصل مع فريق الدعم بسهولة عبر زر واتساب الموجود أسفل الصفحة، وسنساعدك في أي استفسار أو مشكلة تواجهك."
    },
    {
        question: "هل لديكم لعبة حروف مع عزيز؟",
        answer: "لدينا لعبة حروف وألوف تعمل مباشرة من المتصفح دون الحاجة إلى تحميل أي تطبيق، ويمكن تشغيلها على التلفزيون واستخدامها في الجلسات والتحديات الجماعية. اللعبة مستقلة وليست إصدارًا رسميًا من برنامج حروف مع عزيز، ولا توجد أي علاقة أو شراكة بيننا وبين البرنامج أو مقدمه."
    }
];
const getGameSeoTitle = (game) => {
    const cleanName = game.name.trim();
    if (game.slug === "horof-bell") {
        return "لعبة حروف وألوف مع جرس | أكثر من 2000 سؤال - ألعاب زامن";
    }
    if (game.slug === "horof") {
        return "لعبة حروف وألوف أونلاين | أكثر من 1400 سؤال - ألعاب زامن";
    }
    if (game.slug === "photos-1") {
        return "تحدي الصور الجزء الأول | لعبة تخمين صور جماعية - ألعاب زامن";
    }
    if (game.slug === "photos-2") {
        return "تحدي الصور الجزء الثاني | ألغاز صور جماعية - ألعاب زامن";
    }
    if (game.slug === "photos-3") {
        return "تحدي الصور الجزء الثالث | لعبة صور وتخمين - ألعاب زامن";
    }
    if (game.slug === "family-feud") {
        return "لعبة فاميلي فيود أونلاين | تحدي عائلي جماعي - ألعاب زامن";
    }
    if (game.slug === "fawazeer") {
        return "لعبة فوازير وأسئلة أونلاين | ألعاب جماعية - ألعاب زامن";
    }
    if (game.slug === "guess-link") {
        return "لعبة خمن الرابط | تحدي تجميع الصور الجماعي - ألعاب زامن";
    }
    if (game.slug === "alatrash") {
        return "مين الأطرش في الزفة | لعبة جماعية مثل برا السالفة - ألعاب زامن";
    }
    return `${cleanName} | ألعاب جماعية أونلاين - ألعاب زامن`;
};
const getGameSeoDescription = (game) => {
    const cleanName = game.name.trim();
    if (game.slug === "horof-bell") {
        return "العب لعبة حروف وألوف مع جرس مدمج وأكثر من 2000 سؤال. لعبة جماعية عربية للعائلة والأصدقاء تعمل مباشرة من المتصفح بدون تحميل.";
    }
    if (game.slug === "horof") {
        return "العب لعبة حروف وألوف أونلاين مع أكثر من 1400 سؤال. لعبة جماعية مناسبة للعائلة والأصدقاء وتعمل من المتصفح بدون تحميل.";
    }
    if (game.slug === "photos-1") {
        return "تحدي الصور الجزء الأول لعبة جماعية لاختبار سرعة الملاحظة وتخمين الصور الغامضة مع الأصدقاء والعائلة مباشرة من المتصفح.";
    }
    if (game.slug === "photos-2") {
        return "تحدي الصور الجزء الثاني يقدم صورًا وألغازًا جديدة للمنافسة بين الأصدقاء والعائلة في لعبة جماعية ممتعة بدون تحميل.";
    }
    if (game.slug === "photos-3") {
        return "تحدي الصور الجزء الثالث يحتوي على تحديات بصرية جديدة وأصعب، مناسب للجمعات والمنافسات بين الأصدقاء والعائلة.";
    }
    if (game.slug === "family-feud") {
        return "العب فاميلي فيود أونلاين مع العائلة والأصدقاء وخمّن الإجابات الأكثر شيوعًا في لعبة جماعية مليئة بالحماس والضحك.";
    }
    if (game.slug === "fawazeer") {
        return "لعبة فوازير وأسئلة جماعية تعمل من المتصفح بدون تحميل، مناسبة للجلسات والتحديات الثقافية بين الأصدقاء والعائلة.";
    }
    if (game.slug === "guess-link") {
        return "لعبة خمن الرابط تحدي جماعي يعتمد على تجميع الصور ومعرفة الإجابة الصحيحة بسرعة قبل الفريق المنافس.";
    }
    if (game.slug === "alatrash") {
        return "مين الأطرش في الزفة لعبة تحرٍ اجتماعية شبيهة بفكرة برا السالفة، مناسبة لثلاثة لاعبين فأكثر ومليئة بالضحك والذكاء.";
    }
    return `اكتشف ${cleanName} من ألعاب زامن، لعبة جماعية عربية تعمل مباشرة من المتصفح ومناسبة للعائلة والأصدقاء.`;
};
// معرّف ثابت للمتصفح لمعرفة الزائر بدون تخزين معلومات حساسة
const getVisitorId = () => {
    let visitorId = localStorage.getItem("zamnVisitorId");
    if (!visitorId) {
        visitorId =
            "visitor_" +
                Date.now() +
                "_" +
                Math.random().toString(36).slice(2, 12);
        localStorage.setItem("zamnVisitorId", visitorId);
    }
    return visitorId;
};
// معرّف مختلف لكل تبويب/جلسة مفتوحة
const getSessionId = () => {
    let sessionId = sessionStorage.getItem("zamnSessionId");
    if (!sessionId) {
        sessionId =
            "session_" +
                Date.now() +
                "_" +
                Math.random().toString(36).slice(2, 12);
        sessionStorage.setItem("zamnSessionId", sessionId);
    }
    return sessionId;
};
const visitorId = getVisitorId();
const sessionId = getSessionId();
const presenceRef = db.ref("analytics/online/" + sessionId);
// تسجيل زيارة واحدة في كل جلسة متصفح
const registerSiteVisit = async () => {
    if (sessionStorage.getItem("zamnVisitRegistered"))
        return;
    const updates = {};
    updates["analytics/totalVisits"] =
        firebase.database.ServerValue.increment(1);
    updates["analytics/visitors/" + visitorId + "/lastVisit"] =
        firebase.database.ServerValue.TIMESTAMP;
    updates["analytics/visitors/" + visitorId + "/visits"] =
        firebase.database.ServerValue.increment(1);
    await db.ref().update(updates);
    sessionStorage.setItem("zamnVisitRegistered", "yes");
};
// تسجيل المستخدم ضمن المتصلين الآن
const startPresenceTracking = () => {
    const connectedRef = db.ref(".info/connected");
    connectedRef.on("value", async (snapshot) => {
        if (snapshot.val() !== true)
            return;
        // يُحذف المستخدم تلقائياً عند انقطاع الإنترنت أو إغلاق الصفحة
        await presenceRef.onDisconnect().remove();
        await presenceRef.set({
            visitorId,
            phone: localStorage.getItem("playerPhone") || null,
            playerName: null,
            currentGameId: null,
            currentGameName: null,
            connectedAt: firebase.database.ServerValue.TIMESTAMP,
            lastActivity: firebase.database.ServerValue.TIMESTAMP
        });
    });
};
const updateOnlinePlayer = async ({ phone = null, playerName = null, currentGameId = null, currentGameName = null } = {}) => {
    try {
        await presenceRef.update({
            phone: phone || null,
            playerName: playerName || null,
            currentGameId: currentGameId || null,
            currentGameName: currentGameName || null,
            lastActivity: firebase.database.ServerValue.TIMESTAMP
        });
    }
    catch (error) {
        console.error("Presence update error:", error);
    }
};
const registerGameEntry = async (game, phone, playerName, entryType) => {
    if (!game)
        return;
    const logRef = db.ref("analytics/gameEntryLogs").push();
    const updates = {};
    updates[`analytics/gameEntries/${game.id}/name`] = game.name;
    updates[`analytics/gameEntries/${game.id}/count`] =
        firebase.database.ServerValue.increment(1);
    updates[`analytics/gameEntries/${game.id}/lastEntryAt`] =
        firebase.database.ServerValue.TIMESTAMP;
    updates[`analytics/gameEntries/${game.id}/players/${sessionId}`] = {
        phone: phone || null,
        playerName: playerName || null,
        entryType: entryType || "owned",
        enteredAt: firebase.database.ServerValue.TIMESTAMP
    };
    updates[`analytics/gameEntryLogs/${logRef.key}`] = {
        gameId: game.id,
        gameName: game.name,
        phone: phone || null,
        playerName: playerName || null,
        visitorId,
        sessionId,
        entryType: entryType || "owned",
        enteredAt: firebase.database.ServerValue.TIMESTAMP
    };
    await db.ref().update(updates);
    await updateOnlinePlayer({
        phone,
        playerName,
        currentGameId: game.id,
        currentGameName: game.name
    });
};
const startBackgroundAnalytics = () => {
  registerSiteVisit().catch(console.error);
  startPresenceTracking();
};
if ("requestIdleCallback" in window) {
  requestIdleCallback(startBackgroundAnalytics, { timeout: 2500 });
} else {
  setTimeout(startBackgroundAnalytics, 1200);
}
function App() {
    var _a;
    const [previewImage, setPreviewImage] = React.useState(null);
    const getGameFromUrl = () => {
        const path = window.location.pathname;
        const match = path.match(/^\/game\/([^/]+)\/?$/);
        if (!match) {
            return null;
        }
        const slug = decodeURIComponent(match[1]);
        return games.find((game) => game.slug === slug) || null;
    };
    const getArticleFromUrl = () => {
        const path = window.location.pathname;
        const match = path.match(/^\/blog\/([^/]+)\/?$/);
        if (!match) {
            return null;
        }
        const slug = decodeURIComponent(match[1]);
        return articles.find((article) => article.slug === slug) || null;
    };
    const [selectedGame, setSelectedGame] = React.useState(getGameFromUrl);
    const [selectedArticle, setSelectedArticle] = React.useState(() => {
        const path = window.location.pathname;
        if (path === "/blog" || path === "/blog/") {
            return "blog-list";
        }
        return getArticleFromUrl();
    });
    React.useEffect(() => {
        const elements = document.querySelectorAll(".reveal-on-scroll");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });
        elements.forEach((element) => {
            observer.observe(element);
        });
        return () => {
            observer.disconnect();
        };
    }, [selectedGame, selectedArticle]);
    // تحديث عنوان الصفحة والوصف والأيقونة وروابط المشاركة
    React.useEffect(() => {
        const ensureMeta = (selector, attrs) => {
            let el = document.querySelector(selector);
            if (!el) {
                el = document.createElement(attrs.tag || "meta");
                Object.entries(attrs).forEach(([key, value]) => {
                    if (key !== "tag")
                        el.setAttribute(key, value);
                });
                document.head.appendChild(el);
            }
            return el;
        };
        const canonical = ensureMeta('link[rel="canonical"]', {
            tag: "link",
            rel: "canonical",
            href: window.location.href
        });
        const description = ensureMeta('meta[name="description"]', {
            name: "description",
            content: ""
        });
        const ogTitle = ensureMeta('meta[property="og:title"]', {
            property: "og:title",
            content: ""
        });
        const ogDescription = document.querySelector('meta[property="og:description"]');
        const ogUrl = document.querySelector('meta[property="og:url"]');
        const ogImage = ensureMeta('meta[property="og:image"]', {
            property: "og:image",
            content: ""
        });
        const ogType = ensureMeta('meta[property="og:type"]', {
            property: "og:type",
            content: "website"
        });
        const twitterTitle = ensureMeta('meta[name="twitter:title"]', {
            name: "twitter:title",
            content: ""
        });
        const twitterDescription = ensureMeta('meta[name="twitter:description"]', {
            name: "twitter:description",
            content: ""
        });
        const twitterImage = ensureMeta('meta[name="twitter:image"]', {
            name: "twitter:image",
            content: ""
        });
        const siteUrl = "https://zamn-games.vercel.app";
        const siteIcon = `${siteUrl}/favicon.png?v=10`;
        const siteImage = "https://i.postimg.cc/MKrfPPHy/s.png";
        const setSocialMeta = ({ title, descriptionText, url, image, type = "website" }) => {
            ogTitle.setAttribute("content", title);
            ogDescription === null || ogDescription === void 0 ? void 0 : ogDescription.setAttribute("content", descriptionText);
            ogUrl === null || ogUrl === void 0 ? void 0 : ogUrl.setAttribute("content", url);
            ogImage.setAttribute("content", image);
            ogType.setAttribute("content", type);
            twitterTitle.setAttribute("content", title);
            twitterDescription.setAttribute("content", descriptionText);
            twitterImage.setAttribute("content", image);
        };
        // حذف الأيقونة القديمة وإنشاء أيقونة جديدة
        // هذه الطريقة تجبر المتصفح على تحديثها
        const setIcon = (iconUrl) => {
            document
                .querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]')
                .forEach((link) => link.remove());
            const favicon = document.createElement("link");
            favicon.rel = "icon";
            favicon.href = iconUrl;
            document.head.appendChild(favicon);
            const shortcutIcon = document.createElement("link");
            shortcutIcon.rel = "shortcut icon";
            shortcutIcon.href = iconUrl;
            document.head.appendChild(shortcutIcon);
            const appleIcon = document.createElement("link");
            appleIcon.rel = "apple-touch-icon";
            appleIcon.href = iconUrl;
            document.head.appendChild(appleIcon);
        };
        // صفحة المقال
        if (selectedArticle && selectedArticle !== "blog-list") {
            const articleUrl = `${siteUrl}/blog/${selectedArticle.slug}`;
            const articleTitle = `${selectedArticle.title} | ألعاب زامن`;
            document.title = articleTitle;
            // شعار ألعاب زامن
            setIcon(siteIcon);
            description === null || description === void 0 ? void 0 : description.setAttribute("content", selectedArticle.description);
            canonical === null || canonical === void 0 ? void 0 : canonical.setAttribute("href", articleUrl);
            ogTitle === null || ogTitle === void 0 ? void 0 : ogTitle.setAttribute("content", articleTitle);
            ogDescription === null || ogDescription === void 0 ? void 0 : ogDescription.setAttribute("content", selectedArticle.description);
            ogUrl === null || ogUrl === void 0 ? void 0 : ogUrl.setAttribute("content", articleUrl);
            ogImage === null || ogImage === void 0 ? void 0 : ogImage.setAttribute("content", siteImage);
            setSocialMeta({
                title: articleTitle,
                descriptionText: selectedArticle.description,
                url: articleUrl,
                image: siteImage,
                type: "article"
            });
            return;
        }
        // صفحة المدونة
        if (selectedArticle === "blog-list") {
            const blogTitle = "مدونة ألعاب زامن | ألعاب جماعية وأفكار للجمعات";
            const blogDescription = "مقالات وأفكار عن الألعاب الجماعية والجلسات العائلية وتجمعات الأصدقاء من ألعاب زامن.";
            document.title = blogTitle;
            // شعار ألعاب زامن
            setIcon(siteIcon);
            canonical === null || canonical === void 0 ? void 0 : canonical.setAttribute("href", `${siteUrl}/blog`);
            description === null || description === void 0 ? void 0 : description.setAttribute("content", blogDescription);
            ogTitle === null || ogTitle === void 0 ? void 0 : ogTitle.setAttribute("content", blogTitle);
            ogDescription === null || ogDescription === void 0 ? void 0 : ogDescription.setAttribute("content", blogDescription);
            ogUrl === null || ogUrl === void 0 ? void 0 : ogUrl.setAttribute("content", `${siteUrl}/blog`);
            ogImage === null || ogImage === void 0 ? void 0 : ogImage.setAttribute("content", siteImage);
            setSocialMeta({
                title: blogTitle,
                descriptionText: blogDescription,
                url: `${siteUrl}/blog`,
                image: siteImage
            });
            return;
        }
        // صفحة اللعبة
        if (selectedGame) {
            const gameUrl = `${siteUrl}/game/${selectedGame.slug}`;
            const gameTitle = getGameSeoTitle(selectedGame);
            const gameDescription = getGameSeoDescription(selectedGame);
            const gameIcon = selectedGame.icon || selectedGame.image;
            document.title = gameTitle;
            // صورة اللعبة في تبويب المتصفح
            setIcon(gameIcon);
            description === null || description === void 0 ? void 0 : description.setAttribute("content", gameDescription);
            canonical === null || canonical === void 0 ? void 0 : canonical.setAttribute("href", gameUrl);
            ogTitle === null || ogTitle === void 0 ? void 0 : ogTitle.setAttribute("content", gameTitle);
            ogDescription === null || ogDescription === void 0 ? void 0 : ogDescription.setAttribute("content", gameDescription);
            ogUrl === null || ogUrl === void 0 ? void 0 : ogUrl.setAttribute("content", gameUrl);
            ogImage === null || ogImage === void 0 ? void 0 : ogImage.setAttribute("content", selectedGame.image);
            setSocialMeta({
                title: gameTitle,
                descriptionText: gameDescription,
                url: gameUrl,
                image: selectedGame.image,
                type: "product"
            });
            return;
        }
        // الصفحة الرئيسية
        const homeTitle = "ألعاب زامن | ألعاب جماعية وحروف وفوازير بدون تحميل";
        const homeDescription = "ألعاب زامن منصة ألعاب جماعية عربية تضم حروف وألوف، فاميلي فيود، الفوازير، تحدي الصور وألعاب الجمعات للعائلة والأصدقاء.";
        document.title = homeTitle;
        // إعادة شعار ألعاب زامن في الرئيسية
        setIcon(siteIcon);
        canonical === null || canonical === void 0 ? void 0 : canonical.setAttribute("href", `${siteUrl}/`);
        description === null || description === void 0 ? void 0 : description.setAttribute("content", homeDescription);
        ogTitle === null || ogTitle === void 0 ? void 0 : ogTitle.setAttribute("content", homeTitle);
        ogDescription === null || ogDescription === void 0 ? void 0 : ogDescription.setAttribute("content", homeDescription);
        ogUrl === null || ogUrl === void 0 ? void 0 : ogUrl.setAttribute("content", `${siteUrl}/`);
        ogImage === null || ogImage === void 0 ? void 0 : ogImage.setAttribute("content", siteImage);
        setSocialMeta({
            title: homeTitle,
            descriptionText: homeDescription,
            url: `${siteUrl}/`,
            image: siteImage
        });
    }, [selectedGame, selectedArticle]);
    // إضافة Structured Data مناسب لكل نوع صفحة
    React.useEffect(() => {
        var _a;
        (_a = document.getElementById("page-schema")) === null || _a === void 0 ? void 0 : _a.remove();
        const siteUrl = "https://zamn-games.vercel.app";
        let graph = [];
        if (selectedArticle && selectedArticle !== "blog-list") {
            graph = [{
                    "@type": "Article",
                    headline: selectedArticle.title,
                    description: selectedArticle.description,
                    datePublished: selectedArticle.date,
                    dateModified: selectedArticle.date,
                    inLanguage: "ar-SA",
                    mainEntityOfPage: `${siteUrl}/blog/${selectedArticle.slug}`,
                    author: { "@type": "Organization", name: "ألعاب زامن" },
                    publisher: {
                        "@type": "Organization",
                        name: "ألعاب زامن",
                        logo: { "@type": "ImageObject", url: `${siteUrl}/favicon.png` }
                    }
                }];
        }
        else if (selectedArticle === "blog-list") {
            graph = [{
                    "@type": "Blog",
                    name: "مدونة ألعاب زامن",
                    url: `${siteUrl}/blog`,
                    description: "مقالات وأفكار عن الألعاب الجماعية والجلسات العائلية.",
                    inLanguage: "ar-SA"
                }];
        }
        else if (!selectedGame) {
            graph = [
                {
                    "@type": "WebSite",
                    "@id": `${siteUrl}/#website`,
                    name: "ألعاب زامن",
                    url: `${siteUrl}/`,
                    inLanguage: "ar-SA"
                },
                {
                    "@type": "Organization",
                    "@id": `${siteUrl}/#organization`,
                    name: "ألعاب زامن",
                    url: `${siteUrl}/`,
                    logo: { "@type": "ImageObject", url: `${siteUrl}/favicon.png` }
                },
                {
                    "@type": "ItemList",
                    name: "ألعاب زامن الجماعية",
                    itemListElement: games.map((game, index) => ({
                        "@type": "ListItem",
                        position: index + 1,
                        url: `${siteUrl}/game/${game.slug}`,
                        name: game.name.trim()
                    }))
                },
                {
                    "@type": "FAQPage",
                    mainEntity: faqItems.map(item => ({
                        "@type": "Question",
                        name: item.question,
                        acceptedAnswer: { "@type": "Answer", text: item.answer }
                    }))
                }
            ];
        }
        if (!graph.length)
            return;
        const script = document.createElement("script");
        script.id = "page-schema";
        script.type = "application/ld+json";
        script.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@graph": graph
        });
        document.head.appendChild(script);
        return () => { var _a; return (_a = document.getElementById("page-schema")) === null || _a === void 0 ? void 0 : _a.remove(); };
    }, [selectedGame, selectedArticle]);
    // إضافة Product Schema و Breadcrumb لصفحة كل لعبة
    React.useEffect(() => {
        var _a, _b;
        (_a = document.getElementById("product-schema")) === null || _a === void 0 ? void 0 : _a.remove();
        if (!selectedGame) {
            return;
        }
        const numericPrice = (_b = selectedGame.priceValue) !== null && _b !== void 0 ? _b : parseFloat(String(selectedGame.price || "").replace(/[^\d.]/g, ""));
        const validReviews = (selectedGame.reviews || []).filter(review => String(review.comment || "").trim());
        const productSchema = {
            "@type": "Product",
            "@id": `https://zamn-games.vercel.app/game/${selectedGame.slug}#product`,
            name: selectedGame.name.trim(),
            description: getGameSeoDescription(selectedGame),
            image: [
                selectedGame.image,
                ...(selectedGame.screenshots || [])
            ],
            url: `https://zamn-games.vercel.app/game/${selectedGame.slug}`,
            sku: String(selectedGame.id),
            category: selectedGame.category,
            brand: {
                "@type": "Brand",
                name: "ألعاب زامن"
            },
            offers: {
                "@type": "Offer",
                url: `https://zamn-games.vercel.app/game/${selectedGame.slug}`,
                price: numericPrice,
                priceCurrency: selectedGame.priceCurrency || "SAR",
                availability: "https://schema.org/InStock",
                itemCondition: "https://schema.org/NewCondition"
            },
            ...(validReviews.length > 0
                ? {
                    aggregateRating: {
                        "@type": "AggregateRating",
                        ratingValue: Number(selectedGame.rating),
                        reviewCount: validReviews.length,
                        bestRating: 5,
                        worstRating: 1
                    },
                    review: validReviews.map(review => ({
                        "@type": "Review",
                        author: {
                            "@type": "Person",
                            name: String(review.name || "لاعب").trim()
                        },
                        reviewRating: {
                            "@type": "Rating",
                            ratingValue: 5,
                            bestRating: 5,
                            worstRating: 1
                        },
                        reviewBody: String(review.comment || "").trim()
                    }))
                }
                : {})
        };
        const breadcrumbSchema = {
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "الرئيسية",
                    item: "https://zamn-games.vercel.app/"
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: selectedGame.name.trim(),
                    item: `https://zamn-games.vercel.app/game/${selectedGame.slug}`
                }
            ]
        };
        const script = document.createElement("script");
        script.id = "product-schema";
        script.type =
            "application/ld+json";
        script.textContent =
            JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                    productSchema,
                    breadcrumbSchema
                ]
            });
        document.head.appendChild(script);
        return () => {
            var _a;
            (_a = document
                .getElementById("product-schema")) === null || _a === void 0 ? void 0 : _a.remove();
        };
    }, [selectedGame]);
    const [gameFrame, setGameFrame] = React.useState(null);
    const [gameEntryType, setGameEntryType] = React.useState(null);
    const gameIframeRef = React.useRef(null);
    const [showStats, setShowStats] = React.useState(false);
    const [statsClicks, setStatsClicks] = React.useState(0);
    const [statsCode, setStatsCode] = React.useState("");
    const [statsLoggedIn, setStatsLoggedIn] = React.useState(false);
    const [totalVisits, setTotalVisits] = React.useState(0);
    const [onlineUsers, setOnlineUsers] = React.useState([]);
    const [registeredCount, setRegisteredCount] = React.useState(0);
    const [gameStats, setGameStats] = React.useState([]);
    const [gameEntryLogs, setGameEntryLogs] = React.useState([]);
    const [customersList, setCustomersList] = React.useState([]);
    const [phone, setPhone] = React.useState(localStorage.getItem("playerPhone") || "");
    const [phoneInput, setPhoneInput] = React.useState("");
    const [playerName, setPlayerName] = React.useState("");
    const [needName, setNeedName] = React.useState(false);
    const [agreeTerms, setAgreeTerms] = React.useState(false);
    const [ownedGames, setOwnedGames] = React.useState([]);
    const [pendingPhone, setPendingPhone] = React.useState("");
    const [loadingPhone, setLoadingPhone] = React.useState(false);
    const [showLoginBox, setShowLoginBox] = React.useState(false);
    const [openFaq, setOpenFaq] = React.useState(0);
    const [showMoreFaq, setShowMoreFaq] = React.useState(false);
    const arabCountries = [
        { name: "السعودية", flag: "🇸🇦", code: "966", length: 9 },
        { name: "الإمارات", flag: "🇦🇪", code: "971", length: 9 },
        { name: "البحرين", flag: "🇧🇭", code: "973", length: 8 },
        { name: "الكويت", flag: "🇰🇼", code: "965", length: 8 },
        { name: "عمان", flag: "🇴🇲", code: "968", length: 8 },
        { name: "قطر", flag: "🇶🇦", code: "974", length: 8 },
        { name: "اليمن", flag: "🇾🇪", code: "967", length: 9 },
        { name: "الأردن", flag: "🇯🇴", code: "962", length: 9 },
        { name: "لبنان", flag: "🇱🇧", code: "961", length: 8 },
        { name: "سوريا", flag: "🇸🇾", code: "963", length: 9 },
        { name: "العراق", flag: "🇮🇶", code: "964", length: 10 },
        { name: "فلسطين", flag: "🇵🇸", code: "970", length: 9 },
        { name: "مصر", flag: "🇪🇬", code: "20", length: 10 },
        { name: "ليبيا", flag: "🇱🇾", code: "218", length: 9 },
        { name: "تونس", flag: "🇹🇳", code: "216", length: 8 },
        { name: "الجزائر", flag: "🇩🇿", code: "213", length: 9 },
        { name: "المغرب", flag: "🇲🇦", code: "212", length: 9 },
        { name: "موريتانيا", flag: "🇲🇷", code: "222", length: 8 },
        { name: "السودان", flag: "🇸🇩", code: "249", length: 9 },
        { name: "الصومال", flag: "🇸🇴", code: "252", length: 8 },
        { name: "جيبوتي", flag: "🇩🇯", code: "253", length: 8 },
        { name: "جزر القمر", flag: "🇰🇲", code: "269", length: 7 }
    ];
    const [hideOverlayButtons, setHideOverlayButtons] = React.useState(false);
    const [selectedCountry, setSelectedCountry] = React.useState(arabCountries[0]);
    const [showCountries, setShowCountries] = React.useState(false);
    const cleanPhone = (value) => {
        let p = value.replace(/\D/g, "");
        if (p.startsWith("966")) {
            p = p.slice(3);
        }
        if (p.startsWith("0")) {
            p = p.slice(1);
        }
        return p;
    };
    const loadOwnedGames = async (phoneNumber) => {
        const snap = await db.ref("customers/" + phoneNumber + "/games").get();
        const data = snap.val() || {};
        setOwnedGames(Object.keys(data));
    };
    const loginPhone = async () => {
        const localPhone = phoneInput.replace(/\D/g, "");
        if (localPhone.length !== selectedCountry.length) {
            showMessage(`رقم ${selectedCountry.name} يجب أن يكون ${selectedCountry.length} أرقام ❌`, "error");
            return;
        }
        const clean = selectedCountry.code + localPhone;
        setLoadingPhone(true);
        try {
            const nameSnap = await db.ref("customers/" + clean + "/name").get();
            if (nameSnap.exists() && String(nameSnap.val()).trim()) {
                setPlayerName(nameSnap.val());
                localStorage.setItem("playerPhone", clean);
                setPhone(clean);
                await db.ref("customers/" + clean + "/lastLogin").set(Date.now());
                await loadOwnedGames(clean);
                await updateOnlinePlayer({
                    phone: clean,
                    playerName: nameSnap.val(),
                    currentGameId: null,
                    currentGameName: null
                });
                setNeedName(false);
            }
            else {
                setPendingPhone(clean);
                setNeedName(true);
            }
        }
        catch (error) {
            console.log(error);
            showMessage(error.message, "error");
        }
        setLoadingPhone(false);
    };
    const savePlayerName = async () => {
        const name = playerName.trim();
        if (!name) {
            showMessage("اكتب اسم اللاعب ❌", "error");
            return;
        }
        if (!agreeTerms) {
            showMessage("يجب الموافقة على التعهد أولاً ❌", "error");
            return;
        }
        try {
            await db.ref("customers/" + pendingPhone + "/name").set(name);
            await db.ref("customers/" + pendingPhone + "/agreeTerms").set(true);
            await db.ref("customers/" + pendingPhone + "/agreeTermsAt").set(Date.now());
            await db.ref("customers/" + pendingPhone + "/lastLogin").set(Date.now());
            localStorage.setItem("playerPhone", pendingPhone);
            setPlayerName(name);
            setPhone(pendingPhone);
            await loadOwnedGames(pendingPhone);
            await updateOnlinePlayer({
                phone: pendingPhone,
                playerName: name,
                currentGameId: null,
                currentGameName: null
            });
            setNeedName(false);
            setPendingPhone("");
            setAgreeTerms(false);
        }
        catch (error) {
            showMessage(error.message, "error");
        }
    };
    const logoutPhone = async () => {
        await updateOnlinePlayer({
            phone: null,
            playerName: null,
            currentGameId: null,
            currentGameName: null
        });
        localStorage.removeItem("playerPhone");
        setPhone("");
        setPhoneInput("");
        setPlayerName("");
        setPendingPhone("");
        setNeedName(false);
        setAgreeTerms(false);
        setOwnedGames([]);
    };
    const saveGameToPhone = async (gameCode) => {
        await db.ref("customers/" + phone + "/games/" + String(gameCode)).set(true);
        await loadOwnedGames(phone);
    };
    const [showCodeBox, setShowCodeBox] = React.useState(false);
    const [codeInput, setCodeInput] = React.useState("");
    const [trialTime, setTrialTime] = React.useState(null);
    const [siteMessage, setSiteMessage] = React.useState(null);
    const messageTimer = React.useRef(null);
    const trialTimer = React.useRef(null);
    const overlayTimer = React.useRef(null);
    const showMessage = (text, type = "info") => {
        if (messageTimer.current) {
            clearTimeout(messageTimer.current);
            messageTimer.current = null;
        }
        setSiteMessage({
            text: String(text || ""),
            type
        });
        // رسالة التأكيد لا تُغلق تلقائيًا
        if (type === "confirm") {
            return;
        }
        messageTimer.current = setTimeout(() => {
            setSiteMessage(null);
            messageTimer.current = null;
        }, 4000);
    };
    const SiteMessageModal = () => {
        if (!siteMessage)
            return null;
        const closeMessage = () => {
            setSiteMessage(null);
            if (messageTimer.current) {
                clearTimeout(messageTimer.current);
                messageTimer.current = null;
            }
        };
        return (React.createElement("div", { className: "\n        fixed inset-0 z-[999999]\n        flex items-center justify-center\n        bg-[#1f122d]/85 backdrop-blur-md\n        p-4\n      ", onClick: () => {
                if (siteMessage.type !== "confirm") {
                    closeMessage();
                }
            } },
            React.createElement("div", { dir: "rtl", role: "dialog", "aria-modal": "true", onClick: (e) => e.stopPropagation(), className: "\n          relative w-full max-w-[390px]\n          overflow-hidden rounded-[26px]\n          border-[3px] border-[#d8cbea]\n          bg-white\n          shadow-[8px_8px_0_#9b8aaa,0_25px_70px_rgba(31,18,45,.45)]\n          animate-[codeBoxPop_.25s_ease-out]\n        " },
                React.createElement("span", { className: "absolute left-4 top-4 z-30 h-3 w-3 bg-yellow-300" }),
                React.createElement("span", { className: "absolute left-9 top-4 z-30 h-3 w-3 bg-white/50" }),
                React.createElement("span", { className: "absolute bottom-4 right-4 z-30 h-3 w-3 bg-purple-300" }),
                React.createElement("div", { className: `
            relative overflow-hidden
            border-b-[3px] px-6 py-7
            text-center text-white

            ${siteMessage.type === "error"
                        ? "border-[#991b1b] bg-gradient-to-br from-[#7f1d1d] via-[#dc2626] to-[#f87171]"
                        : siteMessage.type === "confirm"
                            ? "border-[#92400e] bg-gradient-to-br from-[#78350f] via-[#d97706] to-[#fbbf24]"
                            : "border-[#4c1d95] bg-gradient-to-br from-[#3b0764] via-[#6d28d9] to-[#8b5cf6]"}
          ` },
                    React.createElement("div", { className: "pointer-events-none absolute inset-0 opacity-20", style: {
                            backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
                            backgroundSize: "18px 18px"
                        } }),
                    React.createElement("div", { className: "relative z-10" },
                        React.createElement("div", { className: "\n                mx-auto mb-4 flex h-20 w-20\n                items-center justify-center\n                rounded-2xl\n                border-[3px] border-white/40\n                bg-white/15\n                text-5xl\n                shadow-[6px_6px_0_rgba(37,13,64,.45)]\n              " }, siteMessage.type === "error"
                            ? "❌"
                            : siteMessage.type === "confirm"
                                ? "⚠️"
                                : "✅"),
                        React.createElement("h2", { className: "text-2xl font-black" }, siteMessage.type === "error"
                            ? "تنبيه"
                            : siteMessage.type === "confirm"
                                ? "تأكيد العملية"
                                : "تم بنجاح"))),
                React.createElement("div", { className: "p-5 md:p-6", style: {
                        backgroundColor: "#faf8fc",
                        backgroundImage: "linear-gradient(rgba(124,58,237,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,.045) 1px, transparent 1px)",
                        backgroundSize: "24px 24px"
                    } },
                    React.createElement("p", { className: "mb-6 text-center text-lg font-black leading-8 text-[#3b0764]" }, siteMessage.text),
                    siteMessage.type === "confirm" ? (React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                        React.createElement("button", { type: "button", onClick: closeMessage, className: "\n                  cairo-btn min-h-[54px]\n                  rounded-xl\n                  border-[3px] border-[#b8afbd]\n                  bg-white\n                  font-black text-[#514957]\n                  shadow-[4px_4px_0_#99909f]\n                " }, "\u0625\u0644\u063A\u0627\u0621"),
                        React.createElement("button", { type: "button", onClick: async () => {
                                closeMessage();
                                setShowLoginBox(false);
                                await logoutPhone();
                            }, className: "\n                  cairo-btn min-h-[54px]\n                  rounded-xl\n                  border-[3px] border-[#991b1b]\n                  bg-[#ef4444]\n                  font-black text-white\n                  shadow-[4px_4px_0_#991b1b]\n                " }, "\u062A\u0623\u0643\u064A\u062F"))) : (React.createElement("button", { type: "button", onClick: closeMessage, className: `
                cairo-btn min-h-[56px] w-full
                rounded-xl border-[3px]
                text-lg font-black text-white

                ${siteMessage.type === "error"
                            ? "border-[#991b1b] bg-[#ef4444] shadow-[5px_5px_0_#991b1b]"
                            : "border-[#4c1d95] bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] shadow-[5px_5px_0_#4c1d95]"}
              ` }, "\u062D\u0633\u0646\u0627\u064B"))))));
    };
    const handleStatsSecretClick = () => {
        const newCount = statsClicks + 1;
        if (newCount >= 5) {
            setStatsClicks(0);
            setStatsCode("");
            setStatsLoggedIn(false);
            setShowStats(true);
            return;
        }
        setStatsClicks(newCount);
    };
    React.useEffect(() => {
        if (!statsLoggedIn)
            return;
        const visitsRef = db.ref("analytics/totalVisits");
        const onlineRef = db.ref("analytics/online");
        const customersRef = db.ref("customers");
        const gameEntriesRef = db.ref("analytics/gameEntries");
        const gameEntryLogsRef = db.ref("analytics/gameEntryLogs");
        visitsRef.on("value", (snap) => {
            setTotalVisits(snap.val() || 0);
        });
        onlineRef.on("value", (snap) => {
            const data = snap.val() || {};
            const users = Object.entries(data).map(([id, value]) => ({
                id,
                ...value
            }));
            setOnlineUsers(users);
        });
        customersRef.on("value", (snap) => {
            const data = snap.val() || {};
            setRegisteredCount(Object.keys(data).length);
            const list = Object.entries(data).map(([customerPhone, customer]) => {
                const ownedCodes = Object.keys(customer.games || {});
                const ownedGameNames = ownedCodes.map((code) => {
                    const foundGame = games.find((game) => String(game.code) === String(code));
                    return foundGame ? foundGame.name : "لعبة غير معروفة - " + code;
                });
                return {
                    phone: customerPhone,
                    name: customer.name || "بدون اسم",
                    games: ownedGameNames,
                    lastLogin: customer.lastLogin || null
                };
            });
            list.sort((a, b) => (b.lastLogin || 0) - (a.lastLogin || 0));
            setCustomersList(list);
        });
        gameEntriesRef.on("value", (snap) => {
            const data = snap.val() || {};
            const list = Object.entries(data)
                .map(([id, value]) => ({
                id: String(id),
                name: value.name || "لعبة",
                count: value.count || 0
            }))
                .sort((a, b) => b.count - a.count);
            setGameStats(list);
        });
        gameEntryLogsRef.on("value", (snap) => {
            const data = snap.val() || {};
            const logs = Object.entries(data).map(([id, value]) => ({
                id,
                gameId: String(value.gameId || ""),
                gameName: value.gameName || "لعبة",
                enteredAt: Number(value.enteredAt || 0),
                phone: value.phone || null,
                playerName: value.playerName || null,
                entryType: value.entryType || "owned"
            }));
            setGameEntryLogs(logs);
        });
        return () => {
            visitsRef.off();
            onlineRef.off();
            customersRef.off();
            gameEntriesRef.off();
            gameEntryLogsRef.off();
        };
    }, [statsLoggedIn]);
    const getGamePeriodStats = (gameId) => {
        const now = Date.now();
        const oneMinuteAgo = now - (60 * 1000);
        const oneHourAgo = now - (60 * 60 * 1000);
        const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const gameLogs = gameEntryLogs.filter(log => String(log.gameId) === String(gameId));
        return {
            minute: gameLogs.filter(log => log.enteredAt >= oneMinuteAgo).length,
            hour: gameLogs.filter(log => log.enteredAt >= oneHourAgo).length,
            today: gameLogs.filter(log => log.enteredAt >= startOfToday.getTime()).length,
            week: gameLogs.filter(log => log.enteredAt >= sevenDaysAgo).length,
            month: gameLogs.filter(log => log.enteredAt >= thirtyDaysAgo).length,
            total: gameLogs.length
        };
    };
    const resetOneGameStats = async (gameId, gameName) => {
        const accepted = window.confirm(`هل أنت متأكد من تصفير إحصائيات لعبة ${gameName}؟`);
        if (!accepted)
            return;
        try {
            const logsSnap = await db.ref("analytics/gameEntryLogs").get();
            const logsData = logsSnap.val() || {};
            const updates = {};
            Object.entries(logsData).forEach(([logId, log]) => {
                if (String(log.gameId) === String(gameId)) {
                    updates[`analytics/gameEntryLogs/${logId}`] = null;
                }
            });
            updates[`analytics/gameEntries/${gameId}/count`] = 0;
            updates[`analytics/gameEntries/${gameId}/players`] = null;
            updates[`analytics/gameEntries/${gameId}/lastEntryAt`] = null;
            await db.ref().update(updates);
            showMessage(`تم تصفير إحصائيات ${gameName} ✅`);
        }
        catch (error) {
            console.error(error);
            showMessage("حدث خطأ أثناء التصفير ❌", "error");
        }
    };
    const resetAllGameStats = async () => {
        const accepted = window.confirm("هل أنت متأكد من تصفير جميع إحصائيات دخول الألعاب؟");
        if (!accepted)
            return;
        try {
            const updates = {
                "analytics/gameEntryLogs": null
            };
            games.forEach(game => {
                updates[`analytics/gameEntries/${game.id}/count`] = 0;
                updates[`analytics/gameEntries/${game.id}/players`] = null;
                updates[`analytics/gameEntries/${game.id}/lastEntryAt`] = null;
                updates[`analytics/gameEntries/${game.id}/name`] = game.name;
            });
            await db.ref().update(updates);
            showMessage("تم تصفير جميع إحصائيات الألعاب ✅");
        }
        catch (error) {
            console.error(error);
            showMessage("حدث خطأ أثناء تصفير الإحصائيات ❌", "error");
        }
    };
    const openGame = async (game, entryType = "owned") => {
        if (!game || !game.playLink)
            return;
        if (overlayTimer.current) {
            clearTimeout(overlayTimer.current);
        }
        setHideOverlayButtons(false);
        setGameEntryType(entryType);
        setGameFrame(game.playLink);
        try {
            await registerGameEntry(game, phone || null, playerName || null, entryType);
        }
        catch (error) {
            console.error("Game analytics error:", error);
        }
        overlayTimer.current = setTimeout(() => {
            setHideOverlayButtons(true);
            overlayTimer.current = null;
        }, 3000);
    };
    React.useEffect(() => {
        const savedPhone = localStorage.getItem("playerPhone");
        if (!savedPhone)
            return;
        db.ref("customers/" + savedPhone + "/name")
            .get()
            .then((snap) => {
            if (snap.exists() && String(snap.val()).trim()) {
                const savedName = snap.val();
                setPlayerName(savedName);
                setPhone(savedPhone);
                loadOwnedGames(savedPhone).catch((error) => {
                    console.error(error);
                });
                updateOnlinePlayer({
                    phone: savedPhone,
                    playerName: savedName,
                    currentGameId: null,
                    currentGameName: null
                });
            }
            else {
                localStorage.removeItem("playerPhone");
                setPhone("");
                setPendingPhone(savedPhone);
                setNeedName(true);
                setShowLoginBox(true);
            }
        })
            .catch((error) => {
            console.error(error);
            showMessage(error.message, "error");
        });
    }, []);
    const normalizeCode = (value) => {
        return String(value || "")
            .replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)])
            .replace(/[۰-۹]/g, d => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)])
            .replace(/[^0-9]/g, "");
    };
    const checkCode = async () => {
        if (!phone || needName) {
            showMessage("سجل رقمك واسمك أولاً ❌", "error");
            setShowLoginBox(true);
            return;
        }
        const enteredCode = normalizeCode(codeInput);
        const realCode = normalizeCode(selectedGame.code);
        if (enteredCode === realCode) {
            await saveGameToPhone(selectedGame.code);
            setShowCodeBox(false);
            setCodeInput("");
            openGame(selectedGame, "owned");
        }
        else {
            showMessage("الرمز غير صحيح ❌", "error");
        }
    };
    const buyGame = () => {
        window.open(selectedGame.buyLink, "_blank");
    };
    const openGameDetails = (game) => {
        window.history.pushState({}, "", `/game/${game.slug}`);
        setSelectedGame(game);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    const closeGameDetails = () => {
        window.history.pushState({}, "", "/");
        setSelectedGame(null);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    React.useEffect(() => {
        const handleBrowserBack = () => {
            const path = window.location.pathname;
            setSelectedGame(getGameFromUrl());
            if (path === "/blog" || path === "/blog/") {
                setSelectedArticle("blog-list");
            }
            else {
                setSelectedArticle(getArticleFromUrl());
            }
        };
        window.addEventListener("popstate", handleBrowserBack);
        return () => {
            window.removeEventListener("popstate", handleBrowserBack);
        };
    }, []);
    const startTrial = () => {
        if (trialTimer.current) {
            clearInterval(trialTimer.current);
            trialTimer.current = null;
        }
        if (localStorage.getItem(selectedGame.trialKey)) {
            showMessage("انتهت التجربة المجانية لهذه اللعبة 🛑", "error");
            return;
        }
        localStorage.setItem(selectedGame.trialKey, "used");
        openGame(selectedGame, "trial");
        setTrialTime(45);
        let time = 45;
        trialTimer.current = setInterval(() => {
            time--;
            setTrialTime(time);
            if (time <= 0) {
                clearInterval(trialTimer.current);
                trialTimer.current = null;
                setGameFrame(null);
                setTrialTime(null);
                setGameEntryType(null);
                updateOnlinePlayer({
                    phone,
                    playerName,
                    currentGameId: null,
                    currentGameName: null
                });
                showMessage("انتهت التجربة المجانية ⏳", "error");
            }
        }, 1000);
    };
    const sendHostAccessToGame = () => {
        var _a;
        if (!((_a = gameIframeRef.current) === null || _a === void 0 ? void 0 : _a.contentWindow)) {
            console.log("iframe غير جاهز");
            return;
        }
        if (!gameFrame) {
            console.log("رابط اللعبة غير موجود");
            return;
        }
        const currentGame = games.find((game) => {
            try {
                return (new URL(game.playLink).origin ===
                    new URL(gameFrame).origin);
            }
            catch (_a) {
                return false;
            }
        });
        if (!currentGame) {
            console.log("لم يتم العثور على اللعبة");
            return;
        }
        if (Number(currentGame.id) !== 9) {
            return;
        }
        if (gameEntryType !== "owned") {
            console.log("الدخول ليس owned:", gameEntryType);
            return;
        }
        const message = {
            type: "ZAMN_GAME_ACCESS",
            gameId: "deaf_party",
            role: "host"
        };
        const gameOrigin = "https://alatrash.oneapp.dev";
        gameIframeRef.current.contentWindow.postMessage(message, gameOrigin);
        setTimeout(() => {
            var _a, _b;
            (_b = (_a = gameIframeRef.current) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage(message, gameOrigin);
        }, 500);
        setTimeout(() => {
            var _a, _b;
            (_b = (_a = gameIframeRef.current) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage(message, gameOrigin);
        }, 1500);
        console.log("تم إرسال صلاحية المضيف");
    };
    if (selectedArticle === "blog-list") {
        return (React.createElement("div", { className: "home-game-background page-enter" },
            React.createElement("div", { className: "bg-gradient-to-br from-[#3b0764] via-[#6d28d9] to-[#a855f7] text-white px-5 py-12" },
                React.createElement("div", { className: "max-w-6xl mx-auto" },
                    React.createElement("button", { onClick: () => {
                            window.history.pushState({}, "", "/");
                            setSelectedArticle(null);
                            setSelectedGame(null);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }, className: "bg-black/30 px-5 py-3 rounded-xl font-black mb-7" }, "\u2190 \u0627\u0644\u0631\u062C\u0648\u0639 \u0644\u0644\u0631\u0626\u064A\u0633\u064A\u0629"),
                    React.createElement("h1", { className: "text-4xl md:text-6xl font-black mb-4" }, "\u0645\u062F\u0648\u0646\u0629 \u0623\u0644\u0639\u0627\u0628 \u0632\u0627\u0645\u0646"),
                    React.createElement("p", { className: "text-lg md:text-xl text-white/85 leading-9" }, "\u0645\u0642\u0627\u0644\u0627\u062A \u0648\u0623\u0641\u0643\u0627\u0631 \u0639\u0646 \u0627\u0644\u0623\u0644\u0639\u0627\u0628 \u0627\u0644\u062C\u0645\u0627\u0639\u064A\u0629 \u0648\u0627\u0644\u062C\u0644\u0633\u0627\u062A \u0627\u0644\u0639\u0627\u0626\u0644\u064A\u0629 \u0648\u062A\u062C\u0645\u0639\u0627\u062A \u0627\u0644\u0623\u0635\u062F\u0642\u0627\u0621."))),
            React.createElement("div", { className: "max-w-6xl mx-auto px-5 py-10" },
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, articles.map((article) => (React.createElement("a", { key: article.id, href: `/blog/${article.slug}`, onClick: (e) => {
                        e.preventDefault();
                        window.history.pushState({}, "", `/blog/${article.slug}`);
                        setSelectedGame(null);
                        setSelectedArticle(article);
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });
                    }, className: "bg-white rounded-3xl p-6 shadow-xl border border-[#eadcff] hover:-translate-y-1 transition" },
                    React.createElement("div", { className: "flex items-center justify-between gap-3 mb-5" },
                        React.createElement("span", { className: "bg-purple-100 text-[#6d28d9] px-3 py-2 rounded-full text-sm font-black" }, article.category || "ألعاب جماعية"),
                        React.createElement("time", { className: "text-gray-500 text-sm font-bold" }, article.date || "2026-03-15")),
                    React.createElement("h2", { className: "text-2xl font-black text-[#3b0764] mb-3 leading-9" }, article.title),
                    React.createElement("p", { className: "text-gray-600 font-bold leading-7" }, article.description),
                    React.createElement("div", { className: "mt-5 text-[#7c3aed] font-black" }, "\u0627\u0642\u0631\u0623 \u0627\u0644\u0645\u0642\u0627\u0644 \u2190"))))))));
    }
    if (selectedArticle &&
        selectedArticle !== "blog-list") {
        return (React.createElement("div", { className: "home-game-background page-enter" },
            React.createElement("div", { className: "bg-gradient-to-br from-[#3b0764] via-[#6d28d9] to-[#a855f7] text-white px-5 py-12" },
                React.createElement("div", { className: "max-w-4xl mx-auto" },
                    React.createElement("button", { onClick: () => {
                            window.history.pushState({}, "", "/blog");
                            setSelectedArticle("blog-list");
                            setSelectedGame(null);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }, className: "bg-black/30 px-5 py-3 rounded-xl font-black mb-7" }, "\u2190 \u0627\u0644\u0631\u062C\u0648\u0639 \u0644\u0644\u0645\u062F\u0648\u0646\u0629"),
                    React.createElement("div", { className: "flex flex-wrap items-center gap-3 mb-5" },
                        React.createElement("span", { className: "bg-white/15 px-4 py-2 rounded-full font-black" }, selectedArticle.category || "ألعاب جماعية"),
                        React.createElement("time", { className: "text-white/80 font-bold" }, selectedArticle.date || "2026-03-15")),
                    React.createElement("h1", { className: "text-4xl md:text-6xl font-black leading-tight mb-5" }, selectedArticle.title),
                    React.createElement("p", { className: "text-lg md:text-xl text-white/85 leading-9" }, selectedArticle.description))),
            React.createElement("article", { className: "max-w-4xl mx-auto px-5 py-10" },
                React.createElement("div", { className: "bg-white rounded-3xl p-6 md:p-10 shadow-xl" }, selectedArticle.content.map((paragraph, index) => (React.createElement("p", { key: index, className: "text-gray-700 text-lg font-bold leading-10 mb-5" }, paragraph)))),
                React.createElement("hr", { className: "my-12 border-[#dce6bf]" }),
                React.createElement("div", { className: "bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-[#eadcff]" },
                    React.createElement("h2", { className: "text-4xl font-black text-center text-[#3b0764] mb-4" }, "\u0627\u0628\u062F\u0623 \u0627\u0644\u0622\u0646!"),
                    React.createElement("p", { className: "text-center text-lg md:text-xl text-gray-600 mb-8 leading-9" },
                        "\u062C\u0631\u0651\u0628",
                        " ",
                        React.createElement("span", { className: "font-black text-[#7c3aed]" }, "\u0623\u0644\u0639\u0627\u0628 \u0632\u0627\u0645\u0646"),
                        " ",
                        "\u0645\u062C\u0627\u0646\u064B\u0627 \u0648\u0627\u0643\u062A\u0634\u0641 \u0643\u064A\u0641 \u062A\u062D\u0648\u0651\u0644 \u0623\u064A \u062A\u062C\u0645\u0639 \u0625\u0644\u0649 \u062A\u062C\u0631\u0628\u0629 \u0645\u0645\u062A\u0639\u0629 \u0644\u0627 \u062A\u064F\u0646\u0633\u0649."),
                    React.createElement("h3", { className: "text-3xl font-black text-center text-[#3b0764] mb-6" }, "\u062C\u0631\u0651\u0628 \u0623\u0644\u0639\u0627\u0628\u0646\u0627"),
                    React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4" },
                        React.createElement("a", { href: "/game/horof", onClick: (e) => {
                                e.preventDefault();
                                const game = games.find(game => game.slug === "horof");
                                if (!game)
                                    return;
                                setSelectedArticle(null);
                                openGameDetails(game);
                            }, className: "bg-[#f4f0ff] hover:bg-[#eadcff] border border-[#d8b4fe] text-[#3b0764] rounded-2xl py-5 px-3 text-center font-black transition" }, "\uD83D\uDD24 \u0644\u0639\u0628\u0629 \u062D\u0631\u0648\u0641"),
                        React.createElement("a", { href: "/game/photos-1", onClick: (e) => {
                                e.preventDefault();
                                const game = games.find(game => game.slug === "photos-1");
                                if (!game)
                                    return;
                                setSelectedArticle(null);
                                openGameDetails(game);
                            }, className: "bg-[#f4f0ff] hover:bg-[#eadcff] border border-[#d8b4fe] text-[#3b0764] rounded-2xl py-5 px-3 text-center font-black transition" }, "\uD83D\uDDBC\uFE0F \u062A\u062D\u062F\u064A \u0627\u0644\u0635\u0648\u0631"),
                        React.createElement("a", { href: "/game/alatrash", onClick: (e) => {
                                e.preventDefault();
                                const game = games.find(game => game.slug === "alatrash");
                                if (!game)
                                    return;
                                setSelectedArticle(null);
                                openGameDetails(game);
                            }, className: "bg-[#f4f0ff] hover:bg-[#eadcff] border border-[#d8b4fe] text-[#3b0764] rounded-2xl py-5 px-3 text-center font-black transition" }, "\uD83D\uDD75\uFE0F \u0645\u064A\u0646 \u0627\u0644\u0623\u0637\u0631\u0634\u061F"),
                        React.createElement("a", { href: "/game/horof-bell", onClick: (e) => {
                                e.preventDefault();
                                const game = games.find(game => game.slug === "horof-bell");
                                if (!game)
                                    return;
                                setSelectedArticle(null);
                                openGameDetails(game);
                            }, className: "bg-[#f4f0ff] hover:bg-[#eadcff] border border-[#d8b4fe] text-[#3b0764] rounded-2xl py-5 px-3 text-center font-black transition" }, "\uD83D\uDD14 \u062D\u0631\u0648\u0641 \u0645\u0639 \u062C\u0631\u0633"))))));
    }
    if (selectedGame) {
        return (React.createElement(React.Fragment, null,
            React.createElement(SiteMessageModal, null),
            React.createElement("div", { className: "min-h-screen bg-[#f4f0ff] text-[#3b0764]", style: {
                    fontFamily: (selectedGame === null || selectedGame === void 0 ? void 0 : selectedGame.slug) === "horof-bell"
                        ? '"AA Galaxy", sans-serif'
                        : "inherit"
                } },
                selectedGame.slug === "horof-bell" ? (
                /* واجهة خاصة بلعبة حروف وألوف مع الجرس */
                React.createElement("section", { className: "game-details-hero relative overflow-hidden text-white" },
                    React.createElement("button", { onClick: closeGameDetails, className: "cairo-btn absolute top-4 right-4 md:top-5 md:right-5 z-20 bg-black/30 hover:bg-black/45 backdrop-blur-md px-4 py-2.5 md:px-5 md:py-3 rounded-2xl font-black flex items-center gap-2 text-white" },
                        React.createElement("i", { className: "fa-solid fa-house text-white" }),
                        React.createElement("span", null, "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629")),
                    React.createElement("div", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-5 pt-20 md:pt-24 pb-8 md:pb-10" },
                        React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center" },
                            React.createElement("div", { className: "text-center lg:text-right order-2 lg:order-1" },
                                React.createElement("h1", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-2" }, "\u062D\u0631\u0648\u0641 \u0648\u0623\u0644\u0648\u0641 \u0645\u0639 \u062C\u0631\u0633 \u0645\u062F\u0645\u062C"),
                                React.createElement("h2", { className: "text-lg sm:text-xl md:text-2xl font-black text-yellow-300 mb-3" }, "\u062A\u062D\u062F\u064A \u0627\u0644\u062E\u0644\u064A\u0629"),
                                React.createElement("p", { className: "max-w-2xl mx-auto lg:mx-0 text-sm md:text-base leading-7 text-white/90 font-bold mb-5" }, "\u0644\u0639\u0628\u0629 \u062D\u0631\u0648\u0641 \u062C\u0645\u0627\u0639\u064A\u0629 \u062A\u0639\u0645\u0644 \u0645\u0628\u0627\u0634\u0631\u0629 \u0645\u0646 \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0628\u062F\u0648\u0646 \u062A\u062D\u0645\u064A\u0644. \u062A\u0646\u0627\u0641\u0633 \u0645\u0639 \u0623\u0635\u062F\u0642\u0627\u0626\u0643 \u0641\u064A \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0639\u0646 \u0623\u0643\u062B\u0631 \u0645\u0646 2000 \u0633\u0624\u0627\u0644\u060C \u0648\u0627\u0636\u063A\u0637 \u0627\u0644\u062C\u0631\u0633 \u0642\u0628\u0644 \u0627\u0644\u0641\u0631\u064A\u0642 \u0627\u0644\u0645\u0646\u0627\u0641\u0633 \u0644\u062A\u062D\u0642\u064A\u0642 \u0623\u0639\u0644\u0649 \u0627\u0644\u0646\u0642\u0627\u0637."),
                                React.createElement("div", { className: "grid grid-cols-2 gap-2 max-w-md mx-auto lg:mx-0" },
                                    React.createElement("div", { className: "min-h-[60px] md:min-h-[68px] flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 bg-white/15 border border-white/25 backdrop-blur-md rounded-2xl px-2 py-2 text-center" },
                                        React.createElement("i", { className: "fa-solid fa-bell text-yellow-300 text-base md:text-lg" }),
                                        React.createElement("span", { className: "text-[11px] sm:text-xs md:text-sm font-black leading-5" }, "\u062C\u0631\u0633 \u0645\u062F\u0645\u062C")),
                                    React.createElement("div", { className: "min-h-[60px] md:min-h-[68px] flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 bg-white/15 border border-white/25 backdrop-blur-md rounded-2xl px-2 py-2 text-center" },
                                        React.createElement("i", { className: "fa-solid fa-users text-yellow-300 text-base md:text-lg" }),
                                        React.createElement("span", { className: "text-[11px] sm:text-xs md:text-sm font-black leading-5" }, "\u0644\u0627\u0639\u0628\u0627\u0646 \u0641\u0623\u0643\u062B\u0631")),
                                    React.createElement("div", { className: "min-h-[60px] md:min-h-[68px] flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 bg-white/15 border border-white/25 backdrop-blur-md rounded-2xl px-2 py-2 text-center" },
                                        React.createElement("i", { className: "fa-solid fa-question text-yellow-300 text-base md:text-lg" }),
                                        React.createElement("span", { className: "text-[11px] sm:text-xs md:text-sm font-black leading-5" }, "\u0623\u0643\u062B\u0631 \u0645\u0646 2000 \u0633\u0624\u0627\u0644")),
                                    React.createElement("div", { className: "min-h-[60px] md:min-h-[68px] flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 bg-white/15 border border-white/25 backdrop-blur-md rounded-2xl px-2 py-2 text-center" },
                                        React.createElement("i", { className: "fa-solid fa-mobile-screen-button text-yellow-300 text-base md:text-lg" }),
                                        React.createElement("span", { className: "text-[11px] sm:text-xs md:text-sm font-black leading-5" }, "\u0627\u0644\u062C\u0648\u0627\u0644 \u0648\u0627\u0644\u062A\u0644\u0641\u0632\u064A\u0648\u0646")))),
                            React.createElement("div", { className: "flex justify-center lg:justify-start items-center order-1 lg:order-2" },
                                React.createElement("img", { src: "https://i.postimg.cc/cLs9NqGk/shat.webp", alt: "\u0644\u0639\u0628\u0629 \u062D\u0631\u0648\u0641 \u0648\u0623\u0644\u0648\u0641 \u0645\u0639 \u062C\u0631\u0633 \u0645\u062F\u0645\u062C", width: "440", height: "440", loading: "eager", decoding: "async", className: "w-[230px] sm:w-[280px] md:w-[340px] lg:w-[430px] xl:w-[520px] h-auto object-contain drop-shadow-2xllg:-translate-x-24 xl:-translate-x-28" })))))) : (
                /* ضع هنا تصميم بقية الألعاب كما هو */
                /* الواجهة العادية لبقية الألعاب */
                React.createElement("section", { className: "game-details-hero relative overflow-hidden text-white" },
                    React.createElement("button", { onClick: closeGameDetails, className: "cairo-btn absolute top-4 right-4 md:top-5 md:right-5 z-20 bg-black/30 hover:bg-black/45 backdrop-blur-md px-4 py-2.5 md:px-5 md:py-3 rounded-2xl font-black flex items-center gap-2 text-white" },
                        React.createElement("i", { className: "fa-solid fa-house text-white" }),
                        React.createElement("span", null, "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629")),
                    React.createElement("div", { className: "relative z-10 max-w-7xl mx-auto px-5 pt-24 pb-14" },
                        React.createElement("h1", { className: "text-4xl md:text-7xl font-black mb-7" }, selectedGame.name),
                        React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mb-7" },
                            React.createElement("div", { className: "bg-white/15 backdrop-blur border border-white/20 rounded-2xl px-4 py-3 text-center" },
                                React.createElement("div", { className: "font-black" }, selectedGame.players)),
                            React.createElement("div", { className: "bg-white/15 backdrop-blur border border-white/20 rounded-2xl px-4 py-3 text-center" },
                                React.createElement("div", { className: "font-black" }, selectedGame.category)),
                            React.createElement("div", { className: "bg-white/15 backdrop-blur border border-white/20 rounded-2xl px-4 py-3 text-center" },
                                React.createElement("div", { className: "font-black text-green-400" }, selectedGame.status))),
                        React.createElement("div", { className: "max-w-3xl bg-white/15 backdrop-blur border border-white/20 rounded-3xl p-5 shadow-2xl" },
                            React.createElement("div", { className: "text-sm font-black text-yellow-300 mb-2" }, "\u2728 \u0648\u0635\u0641 \u0627\u0644\u0644\u0639\u0628\u0629"),
                            React.createElement("p", { className: "text-base md:text-xl leading-9 text-white font-bold" }, selectedGame.description))))),
                React.createElement("div", { className: "max-w-7xl mx-auto px-5 py-10" },
                    React.createElement("div", { className: "grid grid-cols-1 gap-8" },
                        React.createElement("div", { className: "md:col-span-2" },
                            React.createElement("div", { className: "game-details-action-card mb-8" },
                                React.createElement("button", { onClick: () => {
                                        if (!phone || needName) {
                                            showMessage("سجل رقمك واسمك أولاً ❌", "error");
                                            setShowLoginBox(true);
                                            return;
                                        }
                                        if (ownedGames.includes(String(selectedGame.code))) {
                                            openGame(selectedGame, "owned");
                                        }
                                        else {
                                            setShowCodeBox(true);
                                        }
                                    }, className: "cairo-btn game-details-btn game-details-play mb-4" }, "\u25B6 \u0627\u0644\u0639\u0628 \u0627\u0644\u0622\u0646"),
                                React.createElement("button", { onClick: buyGame, className: "cairo-btn game-details-btn game-details-buy mb-4" },
                                    "\uD83D\uDCB3 \u0627\u0634\u062A\u0631 \u0627\u0644\u0622\u0646 - ",
                                    selectedGame.price),
                                React.createElement("button", { onClick: startTrial, className: "cairo-btn game-details-btn game-details-trial" }, "\uD83C\uDFAE \u062C\u0631\u0651\u0628 \u0645\u062C\u0627\u0646\u0627\u064B 45 \u062B\u0627\u0646\u064A\u0629")),
                            selectedGame.slug === "horof-bell" && (React.createElement("section", { className: "bg-white border border-[#eadcff] rounded-3xl p-6 md:p-8 shadow-xl mb-10" },
                                React.createElement("div", { className: "text-center mb-8" },
                                    React.createElement("h2", { className: "text-3xl md:text-4xl font-black text-[#3b0764] mb-3" }, "\u0643\u064A\u0641 \u062A\u0644\u0639\u0628 \u062D\u0631\u0648\u0641 \u0648\u0623\u0644\u0648\u0641 \u0645\u0639 \u0627\u0644\u062C\u0631\u0633\u061F"),
                                    React.createElement("p", { className: "text-gray-500 text-base md:text-lg font-bold" }, "\u0627\u0628\u062F\u0623 \u0627\u0644\u062A\u062D\u062F\u064A \u0641\u064A \u062B\u0644\u0627\u062B \u062E\u0637\u0648\u0627\u062A \u0628\u0633\u064A\u0637\u0629")),
                                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5" },
                                    React.createElement("div", { className: "relative bg-[#faf7ff] border border-[#eadcff] rounded-3xl p-6 text-center shadow-sm" },
                                        React.createElement("span", { className: "absolute top-4 right-4 w-9 h-9 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-black" }, "1"),
                                        React.createElement("div", { className: "w-20 h-20 mx-auto mb-5 rounded-3xl bg-purple-100 text-[#7c3aed] flex items-center justify-center" },
                                            React.createElement("i", { className: "fa-solid fa-users text-4xl" })),
                                        React.createElement("h3", { className: "text-xl md:text-2xl font-black text-[#3b0764] mb-3" }, "\u0642\u0633\u0651\u0645 \u0627\u0644\u0644\u0627\u0639\u0628\u064A\u0646"),
                                        React.createElement("p", { className: "text-gray-600 font-bold leading-8" }, "\u0642\u0633\u0651\u0645 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646 \u0625\u0644\u0649 \u0641\u0631\u064A\u0642\u064A\u0646\u060C \u062B\u0645 \u0627\u062E\u062A\u0631 \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0641\u0631\u0642 \u0648\u0627\u0628\u062F\u0623 \u062C\u0648\u0644\u0629 \u062C\u062F\u064A\u062F\u0629.")),
                                    React.createElement("div", { className: "relative bg-[#faf7ff] border border-[#eadcff] rounded-3xl p-6 text-center shadow-sm" },
                                        React.createElement("span", { className: "absolute top-4 right-4 w-9 h-9 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-black" }, "2"),
                                        React.createElement("div", { className: "w-20 h-20 mx-auto mb-5 rounded-3xl bg-purple-100 text-[#7c3aed] flex items-center justify-center" },
                                            React.createElement("i", { className: "fa-solid fa-tv text-4xl" })),
                                        React.createElement("h3", { className: "text-xl md:text-2xl font-black text-[#3b0764] mb-3" }, "\u0627\u0639\u0631\u0636 \u0627\u0644\u0644\u0639\u0628\u0629"),
                                        React.createElement("p", { className: "text-gray-600 font-bold leading-8" }, "\u0627\u0639\u0631\u0636 \u0627\u0644\u0644\u0639\u0628\u0629 \u0639\u0644\u0649 \u0627\u0644\u062A\u0644\u0641\u0632\u064A\u0648\u0646 \u0623\u0648 \u0627\u0644\u0634\u0627\u0634\u0629 \u0627\u0644\u0643\u0628\u064A\u0631\u0629 \u0644\u064A\u0634\u0627\u0647\u062F \u0627\u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0631\u0648\u0641 \u0648\u0627\u0644\u0623\u0633\u0626\u0644\u0629.")),
                                    React.createElement("div", { className: "relative bg-[#faf7ff] border border-[#eadcff] rounded-3xl p-6 text-center shadow-sm" },
                                        React.createElement("span", { className: "absolute top-4 right-4 w-9 h-9 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-black" }, "3"),
                                        React.createElement("div", { className: "w-20 h-20 mx-auto mb-5 rounded-3xl bg-purple-100 text-[#7c3aed] flex items-center justify-center" },
                                            React.createElement("i", { className: "fa-solid fa-bell text-4xl" })),
                                        React.createElement("h3", { className: "text-xl md:text-2xl font-black text-[#3b0764] mb-3" }, "\u0627\u0636\u063A\u0637 \u0627\u0644\u062C\u0631\u0633 \u0648\u0623\u062C\u0628"),
                                        React.createElement("p", { className: "text-gray-600 font-bold leading-8" }, "\u0623\u0648\u0644 \u0641\u0631\u064A\u0642 \u064A\u0636\u063A\u0637 \u0627\u0644\u062C\u0631\u0633 \u064A\u062D\u0635\u0644 \u0639\u0644\u0649 \u0641\u0631\u0635\u0629 \u0627\u0644\u0625\u062C\u0627\u0628\u0629\u060C \u0648\u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0627\u0644\u0635\u062D\u064A\u062D\u0629 \u062A\u0645\u0646\u062D\u0647 \u0627\u0644\u0646\u0642\u0637\u0629."))))),
                            ((_a = selectedGame.screenshots) === null || _a === void 0 ? void 0 : _a.length) > 0 && (React.createElement("section", { className: "bg-white border border-[#eadcff] rounded-3xl p-5 md:p-8 shadow-xl mb-10" },
                                React.createElement("div", { className: "mb-6 text-center" },
                                    React.createElement("h2", { className: "text-2xl md:text-3xl font-black text-[#3b0764]" }, "\u0635\u0648\u0631 \u0645\u0646 \u0627\u0644\u062F\u0627\u062E\u0644")),
                                React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-5" }, selectedGame.screenshots.map((img, index) => (React.createElement("button", { type: "button", key: index, onClick: () => setPreviewImage(img), className: "group block w-full cursor-zoom-in overflow-hidden rounded-3xl border border-[#e5e7eb] shadow-sm hover:shadow-md transition" },
                                    React.createElement("img", { src: img, alt: `صورة ${index + 1} من داخل لعبة ${selectedGame.name}`, title: `لقطة من لعبة ${selectedGame.name}`, width: "1920", height: "1080", loading: index < 3 ? "eager" : "lazy", decoding: "async", className: "w-full aspect-[16/9] object-cover group-hover:scale-[1.03] transition duration-300" }))))))),
                            previewImage && (React.createElement("div", { role: "dialog", "aria-modal": "true", "aria-label": "\u0645\u0639\u0627\u064A\u0646\u0629 \u0635\u0648\u0631\u0629 \u0627\u0644\u0644\u0639\u0628\u0629", onClick: () => setPreviewImage(null), className: "fixed inset-0 z-[100000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm" },
                                React.createElement("button", { type: "button", "aria-label": "\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0635\u0648\u0631\u0629", onClick: () => setPreviewImage(null), className: "absolute top-4 right-4 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-4xl font-light text-white hover:bg-white/25 transition" }, "\u00D7"),
                                React.createElement("img", { src: previewImage, alt: `صورة مكبرة من داخل لعبة ${selectedGame.name}`, onClick: (e) => e.stopPropagation(), decoding: "async", fetchPriority: "high", className: "max-h-[90vh] max-w-[96vw] rounded-3xl object-contain shadow-2xl" }))),
                            selectedGame.reviews.length > 0 && (React.createElement(React.Fragment, null,
                                React.createElement("h2", { className: "text-3xl font-black mb-5" }, "\u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0644\u0627\u0639\u0628\u064A\u0646"),
                                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-12" }, selectedGame.reviews.map((review, index) => (React.createElement("div", { key: index, className: "bg-white border border-[#eadcff] rounded-3xl p-5 shadow" },
                                    React.createElement("div", { className: "font-black mb-2" },
                                        review.stars,
                                        " ",
                                        review.name),
                                    React.createElement("div", { className: "text-[#6b7280]" }, review.comment))))))),
                            React.createElement("section", { className: "mt-12 mb-6" },
                                React.createElement("h2", { className: "text-3xl font-black text-[#3b0764] mb-8 text-center" }, "\u0623\u0644\u0639\u0627\u0628 \u0623\u062E\u0631\u0649 \u0645\u0646 \u0632\u0627\u0645\u0646"),
                                React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" }, games
                                    .filter((game) => game.id !== selectedGame.id)
                                    .map((game) => (React.createElement("a", { key: game.id, href: `/game/${game.slug}`, onClick: (e) => {
                                        e.preventDefault();
                                        openGameDetails(game);
                                    }, className: "block text-center" },
                                    React.createElement("img", { src: game.image, alt: `${game.name} - لعبة جماعية من ألعاب زامن`, width: "245", height: "175", loading: "lazy", decoding: "async", className: "w-full aspect-[7/5] object-cover rounded-3xl hover:scale-[1.03] transition duration-300" }),
                                    React.createElement("h3", { className: "mt-3 text-lg md:text-xl font-black text-[#3b0764]" }, game.name)))))),
                            selectedGame.slug === "horof-bell" && (React.createElement("section", { className: "faq-section" },
                                React.createElement("div", { className: "faq-heading-wrap" },
                                    React.createElement("h2", { className: "faq-heading" }, "\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u062D\u0648\u0644 \u0644\u0639\u0628\u0629 \u062D\u0631\u0648\u0641")),
                                React.createElement("div", { className: "faq-list" }, [
                                    {
                                        question: "هل هذه لعبة حروف مع عزيز التابعة لفريق فالكونز؟",
                                        answer: "لا، هذه لعبة حروف إصدار مستقل أُطلق عام 2025، ولا ترتبط بأي علاقة رسمية ببرنامج «لعبة حروف مع عزيز» التابع لفريق فالكونز. تقدم اللعبة تجربة تخمين كلمات وصور ممتعة مستوحاة من هذا النوع من الألعاب، ويمكن لعبها مباشرة من المتصفح دون تحميل باستخدام الجوال أو الكمبيوتر أو شاشة التلفزيون."
                                    },
                                    {
                                        question: "ما الفرق بين حروف وألوف مع الجرس والنسخة العادية؟",
                                        answer: "تحتوي هذه النسخة على جرس مدمج داخل اللعبة لإضافة أجواء تنافسية وحماس أكبر أثناء اللعب."
                                    },
                                    {
                                        question: "كم عدد الأسئلة في اللعبة؟",
                                        answer: "تحتوي اللعبة على أكثر من 2000 سؤال متنوع يغطي جميع الحروف."
                                    },
                                    {
                                        question: "هل تعمل اللعبة بدون تحميل؟",
                                        answer: "نعم، تعمل مباشرة من المتصفح على الجوال أو الكمبيوتر بدون الحاجة إلى تحميل أي تطبيق."
                                    },
                                    {
                                        question: "هل يمكن تشغيل اللعبة على التلفزيون؟",
                                        answer: "نعم، يمكن عرض اللعبة على شاشة التلفزيون لتستمتع بها العائلة والأصدقاء."
                                    },
                                    {
                                        question: "كم عدد اللاعبين؟",
                                        answer: "يمكن لعبها بواسطة لاعبين أو أكثر، وكلما زاد عدد اللاعبين أصبحت المنافسة أكثر متعة."
                                    },
                                    {
                                        question: "هل توجد تجربة مجانية؟",
                                        answer: "نعم، يمكنك تجربة اللعبة مجانًا لمدة 45 ثانية قبل شراء النسخة الكاملة."
                                    }
                                ].map((item, index) => {
                                    const key = `horofbellfaq-${index}`;
                                    const isOpen = openFaq === key;
                                    return (React.createElement("div", { key: key, className: "faq-item" },
                                        React.createElement("button", { className: "faq-question", onClick: () => setOpenFaq(isOpen ? null : key) },
                                            React.createElement("span", { className: "faq-question-text" }, item.question),
                                            React.createElement("span", { className: `faq-icon ${isOpen ? "open" : ""}` })),
                                        React.createElement("div", { className: `faq-answer ${isOpen ? "open" : ""}` },
                                            React.createElement("div", { className: "faq-answer-inner" },
                                                React.createElement("p", { className: "faq-answer-text" }, item.answer)))));
                                }))))))),
                React.createElement("footer", { className: "mt-10 bg-gradient-to-r from-[#3b0764] via-[#6d28d9] to-[#7c3aed] text-white rounded-t-[40px]" },
                    React.createElement("div", { className: "max-w-6xl mx-auto px-6 py-12" },
                        React.createElement("div", { className: "grid md:grid-cols-3 gap-10 items-start" },
                            React.createElement("div", null,
                                React.createElement("h2", { className: "text-3xl font-black mb-4" }, "\u0623\u0644\u0639\u0627\u0628 \u0632\u0627\u0645\u0646"),
                                React.createElement("p", { className: "text-white/80 leading-8 text-base" }, "\u0645\u0646\u0635\u0629 \u0623\u0644\u0639\u0627\u0628 \u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u0639\u0631\u0628\u064A\u0629 \u062A\u062C\u0645\u0639 \u0627\u0644\u0639\u0627\u0626\u0644\u0629 \u0648\u0627\u0644\u0623\u0635\u062F\u0642\u0627\u0621 \u0641\u064A \u062A\u062C\u0631\u0628\u0629 \u0645\u0644\u064A\u0626\u0629 \u0628\u0627\u0644\u0645\u0631\u062D \u0648\u0627\u0644\u062A\u062D\u062F\u064A. \u062D\u0648\u0651\u0644 \u0623\u064A \u062C\u0644\u0633\u0629 \u0625\u0644\u0649 \u0644\u062D\u0638\u0627\u062A \u0644\u0627 \u062A\u064F\u0646\u0633\u0649 \u0645\u0639 \u0623\u0644\u0639\u0627\u0628 \u062C\u0645\u0627\u0639\u064A\u0629 \u0645\u062A\u0646\u0648\u0639\u0629 \u062A\u0639\u0645\u0644 \u0645\u0628\u0627\u0634\u0631\u0629 \u0645\u0646 \u0627\u0644\u0645\u062A\u0635\u0641\u062D.")),
                            React.createElement("div", null,
                                React.createElement("h2", { className: "text-3xl font-black mb-4" }, "\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629"),
                                React.createElement("div", { className: "flex flex-col gap-3" },
                                    React.createElement("a", { href: "/", onClick: (e) => {
                                            e.preventDefault();
                                            window.history.pushState({}, "", "/");
                                            setSelectedGame(null);
                                            setSelectedArticle(null);
                                            window.scrollTo({
                                                top: 0,
                                                behavior: "smooth"
                                            });
                                        }, className: "w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-4 rounded-2xl font-black transition" },
                                        React.createElement("i", { className: "fa-solid fa-gamepad text-lg" }),
                                        React.createElement("span", null, "\u0623\u0644\u0639\u0627\u0628\u0646\u0627")),
                                    React.createElement("a", { href: "/blog", onClick: (e) => {
                                            e.preventDefault();
                                            window.history.pushState({}, "", "/blog");
                                            setSelectedGame(null);
                                            setSelectedArticle("blog-list");
                                            window.scrollTo({
                                                top: 0,
                                                behavior: "smooth"
                                            });
                                        }, className: "w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-4 rounded-2xl font-black transition" },
                                        React.createElement("i", { className: "fa-solid fa-newspaper text-lg" }),
                                        React.createElement("span", null, "\u0627\u0644\u0645\u062F\u0648\u0646\u0629")),
                                    React.createElement("a", { href: "https://zamn1.com/", target: "_blank", rel: "noopener noreferrer", className: "w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-4 rounded-2xl font-black transition" },
                                        React.createElement("i", { className: "fa-solid fa-cart-shopping text-lg" }),
                                        React.createElement("span", null, "\u0627\u0644\u0645\u062A\u062C\u0631")))),
                            React.createElement("div", null,
                                React.createElement("h2", { className: "text-3xl font-black mb-6" }, "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627"),
                                React.createElement("div", { className: "flex gap-5" },
                                    React.createElement("a", { href: "https://zamn1.com/", target: "_blank", rel: "noopener noreferrer", "aria-label": "\u0632\u064A\u0627\u0631\u0629 \u0645\u062A\u062C\u0631 \u0623\u0644\u0639\u0627\u0628 \u0632\u0627\u0645\u0646", className: "w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition duration-300" },
                                        React.createElement("i", { className: "fa-solid fa-store text-4xl text-white" })),
                                    React.createElement("a", { href: "https://wa.me/message/ZDFHGX5MVYMOF1", target: "_blank", rel: "noopener noreferrer", "aria-label": "\u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628", className: "w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition duration-300" },
                                        React.createElement("i", { className: "fa-brands fa-whatsapp text-4xl text-white" }))))),
                        React.createElement("div", { className: "border-t border-white/20 mt-10 pt-6 text-center text-white/70 font-bold" },
                            "\u00A9 ",
                            new Date().getFullYear(),
                            " \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629 - \u0645\u062A\u062C\u0631 ZAMN")))),
            showCodeBox && (React.createElement("div", { className: "\n      fixed inset-0 z-[99999]\n      flex items-center justify-center\n      bg-[#1f122d]/90 backdrop-blur-md\n      p-4\n    ", onClick: () => {
                    setShowCodeBox(false);
                    setCodeInput("");
                } },
                React.createElement("div", { dir: "rtl", onClick: (e) => e.stopPropagation(), className: "\n        relative w-full max-w-md overflow-hidden\n        rounded-[26px]\n        border-[3px] border-[#d8cbea]\n        bg-white\n        shadow-[8px_8px_0_#a99ab8,0_25px_70px_rgba(31,18,45,.45)]\n        animate-[codeBoxPop_.25s_ease-out]\n      " },
                    React.createElement("span", { className: "absolute left-4 top-4 z-20 h-3 w-3 bg-yellow-300" }),
                    React.createElement("span", { className: "absolute left-9 top-4 z-20 h-3 w-3 bg-white/50" }),
                    React.createElement("span", { className: "absolute bottom-4 right-4 z-20 h-3 w-3 bg-purple-300" }),
                    React.createElement("div", { className: "\n          relative overflow-hidden\n          border-b-[3px] border-[#4c1d95]\n          bg-gradient-to-br\n          from-[#3b0764] via-[#6d28d9] to-[#8b5cf6]\n          px-6 py-8 text-center text-white\n        " },
                        React.createElement("div", { className: "pointer-events-none absolute inset-0 opacity-20", style: {
                                backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
                                backgroundSize: "18px 18px"
                            } }),
                        React.createElement("div", { className: "relative z-10" },
                            React.createElement("div", { className: "\n              mx-auto mb-4 flex h-20 w-20\n              items-center justify-center\n              rounded-2xl\n              border-[3px] border-white/40\n              bg-white/15\n              text-5xl\n              shadow-[6px_6px_0_rgba(37,13,64,.5)]\n            " }, "\uD83C\uDFAE"),
                            React.createElement("h2", { className: "text-3xl font-black" }, "\u062F\u062E\u0648\u0644 \u0627\u0644\u0644\u0639\u0628\u0629"),
                            React.createElement("p", { className: "mt-2 text-sm font-bold text-white/80 md:text-base" }, "\u0623\u062F\u062E\u0644 \u0631\u0645\u0632 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0644\u0628\u062F\u0621 \u0627\u0644\u0644\u0639\u0628"))),
                    React.createElement("div", { className: "p-5 md:p-6", style: {
                            backgroundColor: "#faf8fc",
                            backgroundImage: "linear-gradient(rgba(124,58,237,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,.04) 1px, transparent 1px)",
                            backgroundSize: "24px 24px"
                        } },
                        React.createElement("label", { className: "mb-2 block text-right text-sm font-black text-[#3b0764]" }, "\u0631\u0645\u0632 \u0627\u0644\u0644\u0639\u0628\u0629"),
                        React.createElement("input", { value: codeInput, onChange: (e) => setCodeInput(e.target.value), onKeyDown: (e) => {
                                if (e.key === "Enter") {
                                    checkCode();
                                }
                            }, inputMode: "numeric", autoComplete: "one-time-code", autoFocus: true, placeholder: "\u0627\u0643\u062A\u0628 \u0627\u0644\u0631\u0645\u0632 \u0647\u0646\u0627", className: "\n            mb-5 h-16 w-full\n            rounded-xl\n            border-[3px] border-[#d8cfe0]\n            bg-white px-4\n            text-center text-2xl font-black\n            text-[#3b0764]\n            outline-none\n            shadow-[4px_4px_0_#bfb3c9]\n            transition\n            focus:-translate-y-0.5\n            focus:border-[#7c3aed]\n            focus:shadow-[4px_4px_0_#4c1d95]\n          " }),
                        React.createElement("button", { type: "button", onClick: checkCode, className: "\n            cairo-btn mb-4 flex h-14 w-full\n            items-center justify-center gap-2\n            rounded-xl\n            border-[3px] border-[#15803d]\n            bg-[#22c55e]\n            text-lg font-black text-white\n            shadow-[5px_5px_0_#15803d]\n            transition\n            hover:-translate-y-1\n            hover:brightness-105\n            active:translate-x-1\n            active:translate-y-1\n            active:shadow-none\n          " },
                            React.createElement("i", { className: "fa-solid fa-play" }),
                            React.createElement("span", null, "\u062F\u062E\u0648\u0644 \u0627\u0644\u0644\u0639\u0628\u0629")),
                        React.createElement("a", { href: selectedGame.buyLink, target: "_blank", rel: "noopener noreferrer", className: "\n            cairo-btn mb-4 flex h-14 w-full\n            items-center justify-center gap-2\n            rounded-xl\n            border-[3px] border-[#4c1d95]\n            bg-gradient-to-r\n            from-[#6d28d9] to-[#8b5cf6]\n            text-lg font-black text-white\n            shadow-[5px_5px_0_#4c1d95]\n            transition\n            hover:-translate-y-1\n            hover:brightness-105\n            active:translate-x-1\n            active:translate-y-1\n            active:shadow-none\n          " },
                            React.createElement("i", { className: "fa-solid fa-key" }),
                            React.createElement("span", null, "\u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0631\u0645\u0632")),
                        React.createElement("button", { type: "button", onClick: () => {
                                setShowCodeBox(false);
                                setCodeInput("");
                            }, className: "\n            cairo-btn flex h-13 w-full\n            items-center justify-center\n            rounded-xl\n            border-[3px] border-[#cfc5d5]\n            bg-white\n            py-3\n            font-black text-[#52485a]\n            shadow-[5px_5px_0_#bfb4c6]\n            transition\n            hover:-translate-y-1\n            hover:bg-[#f3eff7]\n            active:translate-x-1\n            active:translate-y-1\n            active:shadow-none\n          " }, "\u0625\u063A\u0644\u0627\u0642"))))),
            gameFrame && (React.createElement("div", { className: "fixed inset-0 bg-black z-[999]" },
                trialTime !== null && (React.createElement("div", { className: "absolute top-4 left-4 bg-red-500 text-white px-5 py-3 rounded-2xl font-black z-[1000]" },
                    "\u0627\u0644\u062A\u062C\u0631\u0628\u0629: ",
                    trialTime)),
                !hideOverlayButtons && (React.createElement("button", { onClick: () => {
                        if (trialTimer.current) {
                            clearInterval(trialTimer.current);
                            trialTimer.current = null;
                        }
                        setGameFrame(null);
                        setTrialTime(null);
                        setHideOverlayButtons(false);
                        setGameEntryType(null);
                        updateOnlinePlayer({
                            phone,
                            playerName,
                            currentGameId: null,
                            currentGameName: null
                        });
                    }, className: "absolute top-4 right-4 bg-white text-black px-5 py-3 rounded-2xl font-black z-[1000]" }, "\u0625\u063A\u0644\u0627\u0642")),
                React.createElement("iframe", { ref: gameIframeRef, src: gameFrame, title: "\u0627\u0644\u0644\u0639\u0628\u0629", className: "w-full h-full border-0", onLoad: sendHostAccessToGame })))));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "home-game-background page-enter" },
            showStats && (React.createElement("div", { className: "fixed inset-0 z-[10000] bg-[#f4f0ff] overflow-y-auto" },
                React.createElement("div", { className: "sticky top-0 z-20 bg-gradient-to-r from-[#3b0764] to-[#7c3aed] text-white p-5 flex items-center justify-between" },
                    React.createElement("h2", { className: "text-2xl font-black" }, "\uD83D\uDCCA \u0644\u0648\u062D\u0629 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A"),
                    React.createElement("button", { onClick: () => setShowStats(false), className: "bg-white text-[#3b0764] px-5 py-2 rounded-xl font-black" }, "\u0625\u063A\u0644\u0627\u0642")),
                !statsLoggedIn ? (React.createElement("div", { className: "max-w-sm mx-auto p-5 mt-16" },
                    React.createElement("div", { className: "bg-white rounded-3xl p-6 shadow-xl" },
                        React.createElement("h3", { className: "text-2xl font-black text-[#3b0764] text-center mb-5" }, "\u062F\u062E\u0648\u0644 \u0627\u0644\u0625\u062F\u0627\u0631\u0629"),
                        React.createElement("input", { type: "password", value: statsCode, onChange: (e) => setStatsCode(e.target.value), placeholder: "\u0627\u0643\u062A\u0628 \u0631\u0645\u0632 \u0627\u0644\u0625\u062F\u0627\u0631\u0629", className: "w-full h-14 border-2 border-purple-200 rounded-2xl text-center text-xl font-black mb-4" }),
                        React.createElement("button", { onClick: () => {
                                if (statsCode === "7788") {
                                    setStatsLoggedIn(true);
                                }
                                else {
                                    showMessage("رمز الإدارة غير صحيح ❌", "error");
                                }
                            }, className: "w-full bg-[#7c3aed] text-white py-4 rounded-2xl font-black" }, "\u062F\u062E\u0648\u0644")))) : (React.createElement("div", { className: "max-w-7xl mx-auto p-5" },
                    React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" },
                        React.createElement("div", { className: "bg-white p-5 rounded-3xl shadow" },
                            React.createElement("div", { className: "text-gray-500 font-bold" }, "\u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A"),
                            React.createElement("div", { className: "text-4xl font-black text-purple-700 mt-2" }, totalVisits)),
                        React.createElement("div", { className: "bg-white p-5 rounded-3xl shadow" },
                            React.createElement("div", { className: "text-gray-500 font-bold" }, "\u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0645\u0633\u062C\u0644\u0629"),
                            React.createElement("div", { className: "text-4xl font-black text-purple-700 mt-2" }, registeredCount)),
                        React.createElement("div", { className: "bg-white p-5 rounded-3xl shadow" },
                            React.createElement("div", { className: "text-gray-500 font-bold" }, "\u0627\u0644\u0645\u062A\u0635\u0644\u0648\u0646 \u0627\u0644\u0622\u0646"),
                            React.createElement("div", { className: "text-4xl font-black text-green-600 mt-2" }, onlineUsers.length)),
                        React.createElement("div", { className: "bg-white p-5 rounded-3xl shadow" },
                            React.createElement("div", { className: "text-gray-500 font-bold" }, "\u062F\u062E\u0648\u0644 \u0627\u0644\u0623\u0644\u0639\u0627\u0628"),
                            React.createElement("div", { className: "text-4xl font-black text-orange-500 mt-2" }, gameStats.reduce((total, game) => total + game.count, 0)))),
                    React.createElement("h3", { className: "text-2xl font-black text-[#3b0764] mb-4" },
                        "\u0627\u0644\u0645\u062A\u0635\u0644\u0648\u0646 \u0627\u0644\u0622\u0646 (",
                        onlineUsers.length,
                        ")"),
                    React.createElement("div", { className: "bg-white rounded-3xl shadow overflow-x-auto mb-8" },
                        React.createElement("table", { className: "w-full min-w-[900px] text-right" },
                            React.createElement("thead", { className: "bg-[#3b0764] text-white" },
                                React.createElement("tr", null,
                                    React.createElement("th", { className: "p-4" }, "\u0627\u0644\u0627\u0633\u0645"),
                                    React.createElement("th", { className: "p-4" }, "\u0631\u0642\u0645 \u0627\u0644\u062C\u0648\u0627\u0644"),
                                    React.createElement("th", { className: "p-4" }, "\u0645\u0627\u0630\u0627 \u064A\u0641\u0639\u0644 \u0627\u0644\u0622\u0646\u061F"),
                                    React.createElement("th", { className: "p-4" }, "\u0648\u0642\u062A \u0627\u0644\u0627\u062A\u0635\u0627\u0644"),
                                    React.createElement("th", { className: "p-4" }, "\u0627\u0644\u062D\u0627\u0644\u0629"))),
                            React.createElement("tbody", null,
                                onlineUsers.map((user) => (React.createElement("tr", { key: user.id, className: "border-b hover:bg-purple-50" },
                                    React.createElement("td", { className: "p-4 font-black" }, user.playerName || "زائر غير مسجل"),
                                    React.createElement("td", { className: "p-4 font-bold", dir: "ltr" }, user.phone ? `+${user.phone}` : "لم يسجل رقمه"),
                                    React.createElement("td", { className: "p-4" }, user.currentGameName ? (React.createElement("span", { className: "inline-block bg-purple-100 text-purple-700 px-3 py-2 rounded-full font-black" },
                                        "\uD83C\uDFAE \u064A\u0644\u0639\u0628: ",
                                        user.currentGameName)) : (React.createElement("span", { className: "inline-block bg-gray-100 text-gray-600 px-3 py-2 rounded-full font-black" }, "\uD83D\uDC40 \u064A\u062A\u0635\u0641\u062D \u0627\u0644\u0645\u0648\u0642\u0639"))),
                                    React.createElement("td", { className: "p-4" }, user.connectedAt
                                        ? new Date(user.connectedAt).toLocaleString("ar-SA")
                                        : "غير معروف"),
                                    React.createElement("td", { className: "p-4" },
                                        React.createElement("span", { className: "inline-block bg-green-100 text-green-700 px-3 py-2 rounded-full font-black" }, "\uD83D\uDFE2 \u0645\u062A\u0635\u0644 \u0627\u0644\u0622\u0646"))))),
                                onlineUsers.length === 0 && (React.createElement("tr", null,
                                    React.createElement("td", { colSpan: "5", className: "p-8 text-center text-gray-500 font-bold" }, "\u0644\u0627 \u064A\u0648\u062C\u062F \u0623\u062D\u062F \u0641\u064A \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0622\u0646")))))),
                    React.createElement("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4" },
                        React.createElement("h3", { className: "text-2xl font-black text-[#3b0764]" }, "\u0639\u062F\u062F \u062F\u062E\u0648\u0644 \u0643\u0644 \u0644\u0639\u0628\u0629"),
                        React.createElement("button", { onClick: resetAllGameStats, className: "bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl font-black" }, "\uD83D\uDDD1\uFE0F \u062A\u0635\u0641\u064A\u0631 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0644\u0639\u0627\u0628")),
                    React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10" },
                        gameStats.map((game) => {
                            const periodStats = getGamePeriodStats(game.id);
                            return (React.createElement("div", { key: game.id, className: "bg-white rounded-3xl p-5 shadow border border-purple-100" },
                                React.createElement("div", { className: "flex items-center justify-between gap-3 mb-5" },
                                    React.createElement("div", { className: "font-black text-[#3b0764] text-xl" }, game.name),
                                    React.createElement("button", { onClick: () => resetOneGameStats(game.id, game.name), className: "bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-xl font-black text-sm" }, "\u062A\u0635\u0641\u064A\u0631")),
                                React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3" },
                                    React.createElement("div", { className: "bg-blue-50 rounded-2xl p-3 text-center" },
                                        React.createElement("div", { className: "text-gray-500 text-xs font-bold" }, "\u0622\u062E\u0631 \u062F\u0642\u064A\u0642\u0629"),
                                        React.createElement("div", { className: "text-2xl font-black text-blue-600 mt-1" }, periodStats.minute)),
                                    React.createElement("div", { className: "bg-cyan-50 rounded-2xl p-3 text-center" },
                                        React.createElement("div", { className: "text-gray-500 text-xs font-bold" }, "\u0622\u062E\u0631 \u0633\u0627\u0639\u0629"),
                                        React.createElement("div", { className: "text-2xl font-black text-cyan-600 mt-1" }, periodStats.hour)),
                                    React.createElement("div", { className: "bg-green-50 rounded-2xl p-3 text-center" },
                                        React.createElement("div", { className: "text-gray-500 text-xs font-bold" }, "\u0627\u0644\u064A\u0648\u0645"),
                                        React.createElement("div", { className: "text-2xl font-black text-green-600 mt-1" }, periodStats.today)),
                                    React.createElement("div", { className: "bg-orange-50 rounded-2xl p-3 text-center" },
                                        React.createElement("div", { className: "text-gray-500 text-xs font-bold" }, "\u0622\u062E\u0631 7 \u0623\u064A\u0627\u0645"),
                                        React.createElement("div", { className: "text-2xl font-black text-orange-600 mt-1" }, periodStats.week)),
                                    React.createElement("div", { className: "bg-pink-50 rounded-2xl p-3 text-center" },
                                        React.createElement("div", { className: "text-gray-500 text-xs font-bold" }, "\u0622\u062E\u0631 30 \u064A\u0648\u0645"),
                                        React.createElement("div", { className: "text-2xl font-black text-pink-600 mt-1" }, periodStats.month)),
                                    React.createElement("div", { className: "bg-purple-100 rounded-2xl p-3 text-center" },
                                        React.createElement("div", { className: "text-purple-600 text-xs font-bold" }, "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A"),
                                        React.createElement("div", { className: "text-2xl font-black text-purple-700 mt-1" }, periodStats.total)))));
                        }),
                        gameStats.length === 0 && (React.createElement("div", { className: "lg:col-span-2 bg-white rounded-3xl p-8 text-center text-gray-500 font-bold shadow" }, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u062F\u062E\u0648\u0644 \u062D\u062A\u0649 \u0627\u0644\u0622\u0646"))),
                    React.createElement("h3", { className: "text-2xl font-black text-[#3b0764] mb-4" }, "\u0643\u0644 \u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0648\u0627\u0644\u0623\u0644\u0639\u0627\u0628 \u0627\u0644\u0645\u0645\u0644\u0648\u0643\u0629"),
                    React.createElement("div", { className: "bg-white rounded-3xl shadow overflow-x-auto" },
                        React.createElement("table", { className: "w-full min-w-[850px] text-right" },
                            React.createElement("thead", { className: "bg-[#3b0764] text-white" },
                                React.createElement("tr", null,
                                    React.createElement("th", { className: "p-4" }, "\u0627\u0644\u0627\u0633\u0645"),
                                    React.createElement("th", { className: "p-4" }, "\u0631\u0642\u0645 \u0627\u0644\u062C\u0648\u0627\u0644"),
                                    React.createElement("th", { className: "p-4" }, "\u0627\u0644\u0623\u0644\u0639\u0627\u0628 \u0627\u0644\u0645\u0645\u0644\u0648\u0643\u0629"),
                                    React.createElement("th", { className: "p-4" }, "\u0622\u062E\u0631 \u062F\u062E\u0648\u0644"))),
                            React.createElement("tbody", null,
                                customersList.map((customer) => (React.createElement("tr", { key: customer.phone, className: "border-b" },
                                    React.createElement("td", { className: "p-4 font-black" }, customer.name),
                                    React.createElement("td", { className: "p-4 font-bold", dir: "ltr" },
                                        "+",
                                        customer.phone),
                                    React.createElement("td", { className: "p-4" }, customer.games.length > 0 ? (React.createElement("div", { className: "flex flex-wrap gap-2" }, customer.games.map((gameName, index) => (React.createElement("span", { key: index, className: "bg-purple-100 text-purple-700 px-3 py-2 rounded-full text-sm font-black" }, gameName))))) : (React.createElement("span", { className: "text-gray-400 font-bold" }, "\u0644\u0627 \u064A\u0645\u0644\u0643 \u0623\u0644\u0639\u0627\u0628"))),
                                    React.createElement("td", { className: "p-4" }, customer.lastLogin
                                        ? new Date(customer.lastLogin).toLocaleString("ar-SA")
                                        : "لا يوجد")))),
                                customersList.length === 0 && (React.createElement("tr", null,
                                    React.createElement("td", { colSpan: "4", className: "p-8 text-center text-gray-500 font-bold" }, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0631\u0642\u0627\u0645 \u0645\u0633\u062C\u0644\u0629")))))))))),
            React.createElement(SiteMessageModal, null),
            !gameFrame && (React.createElement("div", { className: "fixed top-2 left-2 z-[3000]" },
                React.createElement("button", { onClick: () => setShowLoginBox(true), className: "bg-white text-[#6d28d9] border-2 border-[#eadcff] shadow-xl px-5 py-3 rounded-full font-black" }, phone ? "🎮 ألعابي" : "👤 تسجيل دخول"))),
            React.createElement("div", { className: "relative overflow-hidden bg-gradient-to-br from-[#3b0764] via-[#5b21b6] to-[#7c3aed] text-white" },
                React.createElement("div", { className: "max-w-6xl mx-auto px-6 py-10 md:py-14" },
                    React.createElement("div", { className: "grid md:grid-cols-2 gap-10 items-center" },
                        React.createElement("div", { className: "text-center md:text-right hero-text-enter" },
                            React.createElement("h1", { onClick: handleStatsSecretClick, className: "text-4xl md:text-5xl font-black mb-4 cursor-default select-none" }, "\u0623\u0644\u0639\u0627\u0628 \u0627\u0644\u062C\u0645\u0639\u0627\u062A"),
                            React.createElement("p", { className: "text-base md:text-xl text-white/80 leading-8 mb-5" }, "          \u062A\u062C\u0627\u0648\u0632\u0646\u0627 \u0645\u0631\u062D\u0644\u0629 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0648\u062A\u0639\u0642\u064A\u062F \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A. \u0627\u0641\u062A\u062D \u0645\u062A\u0635\u0641\u062D\u0643\u060C \u0627\u0639\u0631\u0636 \u0627\u0644\u0644\u0639\u0628\u0629 \u0639\u0644\u0649 \u0634\u0627\u0634\u0629 \u0627\u0644\u062A\u0644\u0641\u0632\u064A\u0648\u0646\u060C"),
                            React.createElement("div", { className: "flex flex-wrap gap-2 justify-center md:justify-start mb-5" },
                                React.createElement("span", { className: "bg-white/15 px-4 py-2 rounded-full backdrop-blur text-sm font-bold" }, "\u0623\u0644\u0639\u0627\u0628 \u062A\u0641\u0627\u0639\u0644\u064A\u0629"),
                                React.createElement("span", { className: "bg-white/15 px-4 py-2 rounded-full backdrop-blur text-sm font-bold" }, "        \u0644\u0639\u0628\u0629 \u062D\u0631\u0648\u0641"),
                                React.createElement("span", { className: "bg-white/15 px-4 py-2 rounded-full backdrop-blur text-sm font-bold" }, "\u0627\u0644\u0639\u0628 \u0641\u0648\u0631\u0627\u064B"),
                                React.createElement("span", { className: "bg-white/15 px-4 py-2 rounded-full backdrop-blur text-sm font-bold" }, "\u0628\u062F\u0648\u0646 \u062A\u062D\u0645\u064A\u0644")),
                            React.createElement("button", { onClick: () => {
                                    document.getElementById("games-list").scrollIntoView({
                                        behavior: "smooth"
                                    });
                                }, className: "bg-orange-500 hover:bg-orange-600 px-7 py-3 rounded-full font-black text-base inline-flex items-center justify-center gap-2" },
                                React.createElement("i", { className: "fa-solid fa-play text-xs" }),
                                React.createElement("span", null, "\u0627\u0633\u062A\u0639\u0631\u0636 \u0627\u0644\u0623\u0644\u0639\u0627\u0628"))),
                        React.createElement("div", { className: "flex justify-center hero-logo-enter" },
                            React.createElement("img", { src: "https://i.postimg.cc/Y9T6ZMng/nqn.webp", alt: "\u0634\u0639\u0627\u0631 \u0623\u0644\u0639\u0627\u0628 \u0632\u0627\u0645\u0646", width: "256", height: "256", className: "w-52 md:w-72" })))),
                React.createElement("svg", { className: "block w-full -mt-8 -mb-[2px]", viewBox: "0 0 1440 120", preserveAspectRatio: "none" },
                    React.createElement("path", { fill: "#f4f0ff", d: "M0,80 C250,130 500,130 720,90 C950,50 1200,40 1440,80 L1440,120 L0,120 Z" }))),
            showLoginBox && (React.createElement("div", { className: "player-login-overlay" },
                React.createElement("div", { className: "player-login-page" },
                    React.createElement("div", { className: "player-login-header" },
                        React.createElement("div", { className: "player-login-pixels" },
                            React.createElement("span", null),
                            React.createElement("span", null),
                            React.createElement("span", null)),
                        React.createElement("button", { type: "button", onClick: () => setShowLoginBox(false), className: "player-login-back" },
                            React.createElement("i", { className: "fa-solid fa-house" }),
                            React.createElement("span", null, "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629")),
                        phone && (React.createElement("button", { type: "button", onClick: () => {
                                showMessage("هل أنت متأكد من تسجيل الخروج؟", "confirm");
                            }, className: "player-login-logout" },
                            React.createElement("i", { className: "fa-solid fa-right-from-bracket" }),
                            React.createElement("span", null, "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C"))),
                        React.createElement("div", { className: "player-login-header-grid" }),
                        React.createElement("div", { className: "player-login-header-content" },
                            React.createElement("div", { className: "player-login-icon" }, phone ? "🕹️" : "🎮"),
                            React.createElement("h2", { className: "player-login-title" }, phone ? "مكتبتي" : "دخول اللاعب"),
                            React.createElement("p", { className: "player-login-subtitle" }, phone
                                ? "ألعابك المحفوظة في مكان واحد"
                                : "سجّل رقمك للوصول إلى ألعابك"))),
                    React.createElement("div", { className: "player-login-content" }, !phone ? (React.createElement("div", { className: "player-login-card" },
                        React.createElement("label", { className: "player-login-label" }, "\u0631\u0642\u0645 \u0627\u0644\u062C\u0648\u0627\u0644"),
                        React.createElement("div", { className: "player-phone-row", dir: "ltr" },
                            React.createElement("div", { className: "player-country-wrap" },
                                React.createElement("button", { type: "button", onClick: () => setShowCountries(!showCountries), className: "player-country-button" },
                                    React.createElement("span", null, selectedCountry.flag),
                                    React.createElement("span", null,
                                        "+",
                                        selectedCountry.code),
                                    React.createElement("span", { className: "player-country-arrow" }, "\u2304")),
                                showCountries && (React.createElement("div", { className: "player-country-list" }, arabCountries.map((country) => (React.createElement("button", { key: country.code, type: "button", onClick: () => {
                                        setSelectedCountry(country);
                                        setShowCountries(false);
                                        setPhoneInput("");
                                    }, className: "player-country-item" },
                                    React.createElement("span", null, country.name),
                                    React.createElement("span", null,
                                        country.flag,
                                        " +",
                                        country.code))))))),
                            React.createElement("input", { value: phoneInput, onChange: (e) => setPhoneInput(e.target.value.replace(/\D/g, "")), placeholder: "\u0631\u0642\u0645 \u0627\u0644\u062C\u0648\u0627\u0644", maxLength: selectedCountry.length, inputMode: "numeric", className: "player-login-input" })),
                        needName && (React.createElement("div", { className: "player-name-section" },
                            React.createElement("div", { className: "player-login-notice" }, "\u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u0644\u0627\u0639\u0628 \u0623\u0648\u0644\u0627\u064B"),
                            React.createElement("input", { value: playerName, onChange: (e) => setPlayerName(e.target.value), placeholder: "\u0627\u0633\u0645 \u0627\u0644\u0644\u0627\u0639\u0628", className: "player-login-input player-name-input" }),
                            React.createElement("label", { className: "player-terms" },
                                React.createElement("input", { type: "checkbox", checked: agreeTerms, onChange: (e) => setAgreeTerms(e.target.checked) }),
                                React.createElement("span", null, "\u0623\u062A\u0639\u0647\u062F \u0628\u0639\u062F\u0645 \u0646\u0634\u0631 \u0627\u0644\u0623\u0644\u0639\u0627\u0628 \u0623\u0648 \u0631\u0645\u0648\u0632 \u0627\u0644\u062A\u0634\u063A\u064A\u0644 \u0623\u0648 \u0623\u064A \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0645\u0646 \u062F\u0627\u062E\u0644 \u0627\u0644\u0623\u0644\u0639\u0627\u0628\u060C \u0648\u0623\u062A\u062D\u0645\u0644 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0629 \u0639\u0646\u062F \u0645\u062E\u0627\u0644\u0641\u0629 \u0630\u0644\u0643.")))),
                        React.createElement("button", { type: "button", onClick: needName ? savePlayerName : loginPhone, disabled: loadingPhone, className: "player-login-main-button" },
                            React.createElement("i", { className: "fa-solid fa-play" }),
                            React.createElement("span", null, loadingPhone
                                ? "جاري الدخول..."
                                : needName
                                    ? "حفظ الاسم"
                                    : "دخول")),
                        React.createElement("p", { className: "player-login-help" }, "\u0623\u062F\u062E\u0644 \u0631\u0645\u0632 \u0627\u0644\u0644\u0639\u0628\u0629 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0648\u0633\u064A\u062A\u0645 \u062D\u0641\u0638\u0647\u0627 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627."))) : (React.createElement("div", { className: "player-library" },
                        React.createElement("div", { className: "player-account-card" },
                            React.createElement("div", null,
                                React.createElement("div", { className: "player-account-label" }, "\u062D\u0633\u0627\u0628 \u0627\u0644\u0644\u0627\u0639\u0628"),
                                React.createElement("div", { className: "player-account-name" }, playerName || "لا يوجد اسم"),
                                React.createElement("div", { className: "player-account-phone" },
                                    "+",
                                    phone)),
                            React.createElement("div", { className: "player-online-badge" },
                                React.createElement("span", null),
                                "\u0645\u062A\u0635\u0644")),
                        React.createElement("div", { className: "player-library-heading" },
                            React.createElement("div", null,
                                React.createElement("h3", null, "\u0623\u0644\u0639\u0627\u0628\u064A \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629"),
                                React.createElement("p", null, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0644\u0639\u0628\u0629 \u0627\u0644\u062A\u064A \u062A\u0631\u064A\u062F \u0641\u062A\u062D\u0647\u0627")),
                            React.createElement("div", { className: "player-library-count" }, ownedGames.length)),
                        ownedGames.length === 0 ? (React.createElement("div", { className: "player-empty-library" },
                            React.createElement("div", { className: "player-empty-icon" }, "\uD83D\uDD79\uFE0F"),
                            React.createElement("h3", null, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0644\u0639\u0627\u0628 \u0645\u062D\u0641\u0648\u0638\u0629"),
                            React.createElement("p", null, "\u0627\u062E\u062A\u0631 \u0644\u0639\u0628\u0629 \u0645\u0646 \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629\u060C \u062B\u0645 \u0623\u062F\u062E\u0644 \u0631\u0645\u0632\u0647\u0627 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629."),
                            React.createElement("button", { type: "button", onClick: () => setShowLoginBox(false), className: "player-empty-button" }, "\u0627\u0633\u062A\u0639\u0631\u0636 \u0627\u0644\u0623\u0644\u0639\u0627\u0628"))) : (React.createElement("div", { className: "player-games-list" }, games
                            .filter((game) => ownedGames.includes(String(game.code)))
                            .map((game) => (React.createElement("button", { key: game.id, type: "button", onClick: () => {
                                setShowLoginBox(false);
                                openGameDetails(game);
                            }, className: "player-library-game" },
                            React.createElement("div", { className: "player-library-image-wrap" },
                                React.createElement("img", { src: game.image, alt: `${game.name} - صورة اللعبة`, width: "74", height: "74", loading: "eager", decoding: "async", className: "player-library-image" })),
                            React.createElement("div", { className: "player-library-game-info" },
                                React.createElement("h4", null, game.name),
                                React.createElement("p", null,
                                    game.category,
                                    " \u2022 ",
                                    game.players),
                                React.createElement("div", { className: "player-library-tags" },
                                    game.badge && (React.createElement("span", null, game.badge)),
                                    game.questions && (React.createElement("span", null, game.questions)))),
                            React.createElement("div", { className: "player-library-open" }, "\u0641\u062A\u062D")))))))))))),
            gameFrame && (React.createElement("div", { className: "fixed inset-0 bg-black z-[999]" },
                trialTime !== null && (React.createElement("div", { className: "absolute top-4 left-4 bg-red-500 text-white px-5 py-3 rounded-2xl font-black z-[1000]" },
                    "\u0627\u0644\u062A\u062C\u0631\u0628\u0629: ",
                    trialTime)),
                !hideOverlayButtons && (React.createElement("button", { onClick: () => {
                        if (trialTimer.current) {
                            clearInterval(trialTimer.current);
                            trialTimer.current = null;
                        }
                        setGameFrame(null);
                        setTrialTime(null);
                        setHideOverlayButtons(false);
                        updateOnlinePlayer({
                            phone,
                            playerName,
                            currentGameId: null,
                            currentGameName: null
                        });
                    }, className: "absolute top-4 right-4 bg-white text-black px-5 py-3 rounded-2xl font-black z-[1000]" }, "\u0625\u063A\u0644\u0627\u0642")),
                React.createElement("iframe", { ref: gameIframeRef, src: gameFrame, title: "\u0627\u0644\u0644\u0639\u0628\u0629", className: "w-full h-full border-0", onLoad: sendHostAccessToGame }))),
            React.createElement("div", { id: "games-list", className: "max-w-6xl mx-auto px-5 py-8" },
                React.createElement("div", { className: "flex flex-col items-center mb-10 reveal-on-scroll" },
                    React.createElement("div", { className: "bg-white border border-[#f1e8ff] shadow-md rounded-full px-8 py-2" },
                        React.createElement("h2", { className: "text-2xl md:text-3xl font-black text-[#3b0764] text-center" }, "\u0623\u0644\u0639\u0627\u0628\u0646\u0627")),
                    React.createElement("p", { className: "mt-5 text-center text-gray-500 text-base md:text-lg font-bold leading-8 max-w-2xl" }, "\u0627\u062E\u062A\u0631 \u0644\u0639\u0628\u062A\u0643 \u0627\u0644\u0645\u0641\u0636\u0644\u0629 \u0648\u0627\u0628\u062F\u0623 \u0627\u0644\u062A\u062D\u062F\u064A \u0645\u0639 \u0623\u0635\u062F\u0642\u0627\u0626\u0643.")),
                [
                    {
                        title: " حروف والوف",
                        items: games.filter(game => game.name.includes("حروف والوف"))
                    },
                    {
                        title: " تحدي الصور",
                        items: games.filter(game => game.name.includes("تحدي الصور"))
                    },
                    {
                        title: " ألعاب أخرى",
                        items: games.filter(game => !game.name.includes("حروف والوف") &&
                            !game.name.includes("تحدي الصور"))
                    }
                ].map(section => (section.items.length > 0 && (React.createElement("div", { key: section.title, className: "mb-12" },
                    React.createElement("div", { className: "flex items-center gap-3 mb-5" },
                        React.createElement("div", { className: "w-2 h-9 rounded-full bg-[#7c3aed]" }),
                        React.createElement("h2", { className: "text-2xl font-black text-[#3b0764]" }, section.title)),
                    React.createElement("div", { className: "games-grid" }, section.items.map((game, index) => (React.createElement("a", { key: game.id, href: `/game/${game.slug}`, onClick: (e) => {
                            e.preventDefault();
                            openGameDetails(game);
                        }, className: `game-card reveal-on-scroll reveal-delay-${(index % 4) + 1}` },
                        React.createElement("div", { className: "game-image-box" },
                            React.createElement("img", { src: game.image, alt: `${game.name} - لعبة جماعية من ألعاب زامن`, width: "245", height: "175", loading: "lazy", decoding: "async", fetchpriority: "low", className: "game-image" })),
                        React.createElement("div", { className: "game-content" },
                            React.createElement("h3", { className: "game-title" }, game.name),
                            false && (React.createElement("p", { className: "game-desc" }, game.description)),
                            React.createElement("div", { className: "game-tags" },
                                game.slug !== "horof-bell" && (React.createElement("span", { className: "game-tag" }, game.players)),
                                game.questions && (React.createElement("span", { className: "game-tag" }, game.questions)),
                                (game.slug === "horof-bell" || !game.questions) && (React.createElement("span", { className: "game-tag" }, game.badge))),
                            React.createElement("span", { className: "game-btn flex items-center justify-center" }, "\u0639\u0631\u0636 \u0627\u0644\u0644\u0639\u0628\u0629")))))))))),
                React.createElement("section", { className: "py-20 px-5 bg-white/35" },
                    React.createElement("div", { className: "text-center mb-12" },
                        React.createElement("span", { className: "inline-block bg-[#3b0764] text-white px-8 py-3 rounded-full text-xl font-black" }, "\u0627\u0644\u0628\u0627\u0642\u0627\u062A"),
                        React.createElement("h2", { className: "text-4xl font-black text-[#3b0764] mt-6" }, "\u0648\u0641\u0631 \u0623\u0643\u062B\u0631 \u0645\u0639 \u0627\u0644\u0628\u0627\u0642\u0627\u062A"),
                        React.createElement("p", { className: "text-gray-600 text-lg mt-3 font-bold" }, "\u0627\u0634\u062A\u0631 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0644\u0639\u0628\u0629 \u0648\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0623\u0641\u0636\u0644 \u0633\u0639\u0631.")),
                    React.createElement("div", { className: "max-w-6xl mx-auto grid md:grid-cols-2 gap-8" },
                        React.createElement("div", { className: "package-card reveal-on-scroll reveal-delay-1 relative bg-white rounded-[30px] border-4 border-[#7c3aed] shadow-2xl p-8 overflow-hidden" },
                            React.createElement("div", { className: "absolute top-4 left-4 bg-[#7c3aed] text-white px-4 py-2 rounded-full text-sm font-black rotate-[-8deg]" }, "\u0627\u0644\u0623\u0643\u062B\u0631 \u062A\u0648\u0641\u064A\u0631\u064B\u0627"),
                            React.createElement("div", { className: "text-6xl text-center mb-4" }, "\uD83D\uDC51"),
                            React.createElement("h3", { className: "text-3xl text-center font-black text-[#3b0764]" }, "\u0628\u0627\u0642\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0644\u0639\u0627\u0628"),
                            React.createElement("p", { className: "text-center text-gray-500 mt-4 leading-8 font-bold" }, "\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u062C\u0645\u064A\u0639 \u0623\u0644\u0639\u0627\u0628 \u0632\u0627\u0645\u0646 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0648\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0644\u0639\u0627\u0628 \u0627\u0644\u062A\u064A \u0633\u062A\u0635\u062F\u0631 \u0644\u0627\u062D\u0642\u064B\u0627 \u0636\u0645\u0646 \u0627\u0644\u0628\u0627\u0642\u0629."),
                            React.createElement("a", { href: "https://zamn1.com/%D8%A8%D9%83%D8%AC-%D8%A7%D9%84%D8%A3%D9%84%D8%B9%D8%A7%D8%A8-%D8%A7%D9%84%D8%A3%D9%83%D8%A8%D8%B1-%D8%A8%D8%A7%D9%84%D8%AA%D8%A7%D8%B1%D9%8A%D8%AE!/p1077969731", target: "_blank", rel: "noopener noreferrer", className: "mt-8 flex justify-center items-center bg-gradient-to-r from-[#7c3aed] to-[#9333ea] text-white h-14 rounded-full font-black text-lg transition hover:scale-105" }, "\u0634\u0631\u0627\u0621 \u0627\u0644\u0628\u0627\u0642\u0629 \uD83D\uDC51")),
                        React.createElement("div", { className: "package-card reveal-on-scroll reveal-delay-2 relative bg-white rounded-[30px] border-2 border-[#eadcff] shadow-xl p-6 md:p-7 md:scale-95" },
                            React.createElement("div", { className: "text-6xl text-center mb-4" }, "\uD83C\uDF81"),
                            React.createElement("h3", { className: "text-3xl text-center font-black text-[#3b0764]" }, "\u0628\u0627\u0642\u0629 4 \u0623\u0644\u0639\u0627\u0628"),
                            React.createElement("p", { className: "text-center text-gray-500 mt-4 leading-8 font-bold" }, "\u062A\u0636\u0645 \u0627\u0644\u0628\u0627\u0642\u0629: \u062D\u0631\u0648\u0641 \u0645\u0639 \u0639\u0632\u064A\u0632 + \u062A\u062D\u062F\u064A \u0627\u0644\u0635\u0648\u0631 + \u0641\u0648\u0627\u0632\u064A\u0631 + \u0641\u0627\u0645\u064A\u0644\u064A \u0641\u064A\u0648\u062F \u0628\u0633\u0639\u0631 \u0623\u0648\u0641\u0631 \u0645\u0646 \u0634\u0631\u0627\u0621 \u0643\u0644 \u0644\u0639\u0628\u0629 \u0628\u0634\u0643\u0644 \u0645\u0646\u0641\u0635\u0644."),
                            React.createElement("a", { href: "https://zamn1.com/%D8%AD%D8%B1%D9%88%D9%81-%D9%85%D8%B9-%D8%B9%D8%B2%D9%8A%D8%B2-+%D8%AA%D8%AD%D8%AF%D9%8A-%D8%A7%D9%84%D8%B5%D9%88%D8%B1-+%D9%81%D9%88%D8%A7%D8%B2%D9%8A%D8%B1/p1476560404", target: "_blank", rel: "noopener noreferrer", className: "mt-8 flex justify-center items-center bg-gradient-to-r from-[#7c3aed] to-[#9333ea] text-white h-14 rounded-full font-black text-lg transition hover:scale-105" }, "\u0634\u0631\u0627\u0621 \u0627\u0644\u0628\u0627\u0642\u0629 \uD83C\uDF81")))),
                React.createElement("section", { className: "max-w-6xl mx-auto px-5 py-14" },
                    React.createElement("div", { className: "flex justify-center mb-10" },
                        React.createElement("div", { className: "bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white px-10 py-3 rounded-full shadow-lg" },
                            React.createElement("h2", { className: "text-3xl font-black" }, "\u0644\u0645\u0627\u0630\u0627 \u0623\u0644\u0639\u0627\u0628 \u0632\u0627\u0645\u0646\u061F"))),
                    React.createElement("div", { className: "grid md:grid-cols-2 gap-6" },
                        React.createElement("div", { className: "feature-card reveal-on-scroll reveal-delay-1 bg-white rounded-3xl border border-purple-100 shadow-lg p-8 text-center" },
                            React.createElement("div", { className: "w-20 h-20 rounded-3xl bg-purple-100 flex items-center justify-center mx-auto mb-5" },
                                React.createElement("i", { className: "fa-solid fa-language text-4xl text-[#7c3aed]" })),
                            React.createElement("h3", { className: "text-2xl font-black text-[#3b0764] mb-3" }, "\u0645\u062D\u062A\u0648\u0649 \u0639\u0631\u0628\u064A"),
                            React.createElement("p", { className: "text-gray-600 leading-8 font-bold" }, "\u0623\u0644\u0639\u0627\u0628 \u0645\u0635\u0645\u0645\u0629 \u0628\u0627\u0644\u0643\u0627\u0645\u0644 \u0628\u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0648\u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0644\u062B\u0642\u0627\u0641\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629.")),
                        React.createElement("div", { className: "feature-card reveal-on-scroll reveal-delay-2 bg-white rounded-3xl border border-purple-100 shadow-lg p-8 text-center" },
                            React.createElement("div", { className: "w-20 h-20 rounded-3xl bg-purple-100 flex items-center justify-center mx-auto mb-5" },
                                React.createElement("i", { className: "fa-solid fa-bolt text-4xl text-[#7c3aed]" })),
                            React.createElement("h3", { className: "text-2xl font-black text-[#3b0764] mb-3" }, "\u0627\u0644\u0639\u0628 \u0641\u0648\u0631\u064B\u0627"),
                            React.createElement("p", { className: "text-gray-600 leading-8 font-bold" }, "\u0628\u062F\u0648\u0646 \u062A\u062D\u0645\u064A\u0644 \u062A\u0637\u0628\u064A\u0642\u0627\u062A\u060C \u0627\u0641\u062A\u062D \u0627\u0644\u0631\u0627\u0628\u0637 \u0648\u0627\u0644\u0639\u0628 \u0645\u0628\u0627\u0634\u0631\u0629 \u0645\u0646 \u0623\u064A \u062C\u0647\u0627\u0632.")),
                        React.createElement("div", { className: "feature-card reveal-on-scroll reveal-delay-3 bg-white rounded-3xl border border-purple-100 shadow-lg p-8 text-center" },
                            React.createElement("div", { className: "w-20 h-20 rounded-3xl bg-purple-100 flex items-center justify-center mx-auto mb-5" },
                                React.createElement("i", { className: "fa-solid fa-tv text-4xl text-[#7c3aed]" })),
                            React.createElement("h3", { className: "text-2xl font-black text-[#3b0764] mb-3" }, "\u0634\u0627\u0634\u0629 \u0643\u0628\u064A\u0631\u0629"),
                            React.createElement("p", { className: "text-gray-600 leading-8 font-bold" }, "\u0627\u0639\u0631\u0636 \u0627\u0644\u0644\u0639\u0628\u0629 \u0639\u0644\u0649 \u0627\u0644\u062A\u0644\u0641\u0632\u064A\u0648\u0646 \u0648\u0643\u0644 \u0644\u0627\u0639\u0628 \u064A\u0633\u062A\u062E\u062F\u0645 \u062C\u0648\u0627\u0644\u0647 \u0643\u062C\u0647\u0627\u0632 \u062A\u062D\u0643\u0645.")),
                        React.createElement("div", { className: "feature-card reveal-on-scroll reveal-delay-4 bg-white rounded-3xl border border-purple-100 shadow-lg p-8 text-center" },
                            React.createElement("div", { className: "w-20 h-20 rounded-3xl bg-purple-100 flex items-center justify-center mx-auto mb-5" },
                                React.createElement("i", { className: "fa-solid fa-users text-4xl text-[#7c3aed]" })),
                            React.createElement("h3", { className: "text-2xl font-black text-[#3b0764] mb-3" }, "\u062A\u062C\u0645\u0639\u0627\u062A \u0623\u062D\u0644\u0649"),
                            React.createElement("p", { className: "text-gray-600 leading-8 font-bold" }, "\u062D\u0648\u0651\u0644 \u0623\u064A \u062C\u0644\u0633\u0629 \u0625\u0644\u0649 \u062A\u062D\u062F\u064D \u0645\u0645\u062A\u0639 \u0648\u0645\u0646\u0627\u0641\u0633\u0629 \u062D\u0645\u0627\u0633\u064A\u0629 \u0628\u064A\u0646 \u0627\u0644\u0639\u0627\u0626\u0644\u0629 \u0648\u0627\u0644\u0623\u0635\u062F\u0642\u0627\u0621.")))),
                React.createElement("section", { className: "faq-section" },
                    React.createElement("div", { className: "faq-heading-wrap" },
                        React.createElement("h2", { className: "faq-heading" }, "\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629")),
                    React.createElement("div", { className: "faq-list" }, faqItems
                        .slice(0, showMoreFaq ? faqItems.length : 4)
                        .map((item, index) => {
                        const isOpen = openFaq === index;
                        return (React.createElement("div", { key: index, className: "faq-item" },
                            React.createElement("button", { type: "button", className: "faq-question", onClick: () => {
                                    setOpenFaq(isOpen ? null : index);
                                }, "aria-expanded": isOpen },
                                React.createElement("span", { className: "faq-question-text" }, item.question),
                                React.createElement("span", { className: `faq-icon ${isOpen ? "open" : ""}`, "aria-hidden": "true" })),
                            React.createElement("div", { className: `faq-answer ${isOpen ? "open" : ""}` },
                                React.createElement("div", { className: "faq-answer-inner" },
                                    React.createElement("p", { className: "faq-answer-text" }, item.answer)))));
                    })),
                    faqItems.length > 4 && (React.createElement("div", { className: "faq-more-wrap" },
                        React.createElement("button", { type: "button", className: "faq-more-btn", onClick: () => {
                                setShowMoreFaq(prev => {
                                    const nextValue = !prev;
                                    if (!nextValue && openFaq !== null && openFaq >= 4) {
                                        setOpenFaq(null);
                                    }
                                    return nextValue;
                                });
                            } }, showMoreFaq
                            ? " عرض أسئلة أقل"
                            : " عرض المزيد من الأسئلة "))))),
            React.createElement("div", { className: "mt-0 bg-gradient-to-r from-[#3b0764] via-[#6d28d9] to-[#7c3aed] text-white rounded-t-[40px]" },
                React.createElement("div", { className: "max-w-6xl mx-auto px-6 py-12" },
                    React.createElement("div", { className: "grid md:grid-cols-3 gap-10 items-start" },
                        React.createElement("div", null,
                            React.createElement("h3", { className: "text-3xl font-black mb-4" }, "\u0623\u0644\u0639\u0627\u0628 \u0632\u0627\u0645\u0646"),
                            React.createElement("p", { className: "text-white/80 leading-8 text-base" }, "\u0645\u0646\u0635\u0629 \u0623\u0644\u0639\u0627\u0628 \u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u0639\u0631\u0628\u064A\u0629 \u062A\u062C\u0645\u0639 \u0627\u0644\u0639\u0627\u0626\u0644\u0629 \u0648\u0627\u0644\u0623\u0635\u062F\u0642\u0627\u0621 \u0641\u064A \u062A\u062C\u0631\u0628\u0629 \u0645\u0644\u064A\u0626\u0629 \u0628\u0627\u0644\u0645\u0631\u062D \u0648\u0627\u0644\u062A\u062D\u062F\u064A. \u062D\u0648\u0651\u0644 \u0623\u064A \u062C\u0644\u0633\u0629 \u0625\u0644\u0649 \u0644\u062D\u0638\u0627\u062A \u0644\u0627 \u062A\u064F\u0646\u0633\u0649 \u0645\u0639 \u0623\u0644\u0639\u0627\u0628 \u062C\u0645\u0627\u0639\u064A\u0629 \u0645\u062A\u0646\u0648\u0639\u0629 \u062A\u0639\u0645\u0644 \u0645\u0628\u0627\u0634\u0631\u0629 \u0645\u0646 \u0627\u0644\u0645\u062A\u0635\u0641\u062D.")),
                        React.createElement("div", null,
                            React.createElement("h3", { className: "text-3xl font-black mb-4" }, "\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629"),
                            React.createElement("div", { className: "flex flex-col gap-3" },
                                React.createElement("a", { href: "/", onClick: (e) => {
                                        e.preventDefault();
                                        window.history.pushState({}, "", "/");
                                        setSelectedGame(null);
                                        setSelectedArticle(null);
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }, className: "w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-4 rounded-2xl font-black transition" },
                                    React.createElement("i", { className: "fa-solid fa-gamepad text-lg" }),
                                    React.createElement("span", null, "\u0623\u0644\u0639\u0627\u0628\u0646\u0627")),
                                React.createElement("a", { href: "/blog", onClick: (e) => {
                                        e.preventDefault();
                                        window.history.pushState({}, "", "/blog");
                                        setSelectedGame(null);
                                        setSelectedArticle("blog-list");
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }, className: "w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-4 rounded-2xl font-black transition" },
                                    React.createElement("i", { className: "fa-solid fa-newspaper text-lg" }),
                                    React.createElement("span", null, "\u0627\u0644\u0645\u062F\u0648\u0646\u0629")),
                                React.createElement("a", { href: "https://zamn1.com/", target: "_blank", rel: "noopener noreferrer", className: "w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-4 rounded-2xl font-black transition" },
                                    React.createElement("i", { className: "fa-solid fa-cart-shopping text-lg" }),
                                    React.createElement("span", null, "\u0627\u0644\u0645\u062A\u062C\u0631")))),
                        React.createElement("div", null,
                            React.createElement("h3", { className: "text-3xl font-black mb-6" }, "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627"),
                            React.createElement("div", { className: "flex gap-5" },
                                React.createElement("a", { href: "https://zamn1.com/", target: "_blank", rel: "noopener noreferrer", className: "w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition duration-300", title: "\u0627\u0644\u0645\u062A\u062C\u0631" },
                                    React.createElement("i", { className: "fa-solid fa-store text-4xl text-white" })),
                                React.createElement("a", { href: "https://wa.me/message/ZDFHGX5MVYMOF1", target: "_blank", rel: "noopener noreferrer", className: "w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition duration-300", title: "\u0648\u0627\u062A\u0633\u0627\u0628" },
                                    React.createElement("i", { className: "fa-brands fa-whatsapp text-4xl text-white" }))))),
                    React.createElement("div", { className: "border-t border-white/20 mt-10 pt-6 text-center text-white/70 font-bold" },
                        "\u00A9 ",
                        new Date().getFullYear(),
                        " \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629 - \u0645\u062A\u062C\u0631 ZAMN"))))));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null));
