/* ==========================================================================
   content.js — every word and every photo on the site lives here.
   Edit this file to change text, dates, captions, or photos.
   Each text entry has an Arabic (ar) and English (en) version.
   ========================================================================== */

window.SITE = {
  /* ---------- Photos ----------------------------------------------------
     Put your images in  assets/photos/  using these exact file names,
     or change the paths below. A missing photo shows a soft placeholder
     labelled with the file name it is waiting for.                        */
  photos: {
    hero: "assets/photos/hero.jpg",

    // Three photos shown in the engagement-day card (the main milestone)
    engagement: [
      "assets/photos/engagement-1.jpg",
      "assets/photos/engagement-2.jpg",
      "assets/photos/engagement-3.jpg"
    ],

    // The gallery. Add or remove entries freely.
    // shape: "tall" | "wide" | "square" (only a layout hint)
    gallery: [
      { src: "assets/photos/gallery-01.jpg", shape: "tall",   caption: { ar: "يوم الشبكة",            en: "Engagement day" } },
      { src: "assets/photos/gallery-02.jpg", shape: "square", caption: { ar: "الخاتم",                 en: "The ring" } },
      { src: "assets/photos/gallery-03.jpg", shape: "wide",   caption: { ar: "معًا",                    en: "Together" } },
      { src: "assets/photos/gallery-04.jpg", shape: "tall",   caption: { ar: "ليلة الحنّة",             en: "Henna night" } },
      { src: "assets/photos/gallery-05.jpg", shape: "square", caption: { ar: "ضحكة",                    en: "A laugh" } },
      { src: "assets/photos/gallery-06.jpg", shape: "tall",   caption: { ar: "تفاصيل صغيرة",           en: "Little details" } },
      { src: "assets/photos/gallery-07.jpg", shape: "wide",   caption: { ar: "مع الأحبّة",              en: "With our loved ones" } },
      { src: "assets/photos/gallery-08.jpg", shape: "square", caption: { ar: "الورد",                   en: "The flowers" } },
      { src: "assets/photos/gallery-09.jpg", shape: "tall",   caption: { ar: "لحظة لا تُنسى",           en: "A moment to remember" } }
    ],

    // Optional video. Set to null to hide the video section.
    video: {
      src: "assets/video/engagement.mp4",
      poster: "assets/photos/video-poster.jpg"
    }
  },

  /* ---------- Key dates (used for the live day counters) --------------- */
  dates: {
    firstMeeting: "2026-10-09",
    engagement:   "2026-10-23"
  },

  /* ---------- Our story: the timeline ----------------------------------
     icon: sparkle | heart | pact | book | gift | henna | ring | quill | moon
     featured: true  -> the big highlighted milestone
     future:   true  -> "coming soon" chapter
     photo:    optional small image; hidden automatically if missing     */
  timeline: [
    {
      icon: "sparkle",
      title: { ar: "الرؤية الشرعية", en: "The First Meeting (Ru'yah)" },
      day:   { ar: "الجمعة",  en: "Friday" },
      greg:  { ar: "9 أكتوبر 2026", en: "9 October 2026" },
      hijri: { ar: "28 ربيع الثاني 1448 هـ", en: "28 Rabi' al-Thani 1448 AH" },
      text:  { ar: "النظرة الأولى… ولقاءٌ كتب الله فيه أول سطرٍ في حكايتنا.",
               en: "The first look, and a meeting in which Allah wrote the first line of our story." },
      photo: null
    },
    {
      icon: "heart",
      title: { ar: "لقد وافقت ❤️", en: "She Said Yes ❤️" },
      day:   { ar: "الأحد",  en: "Sunday" },
      greg:  { ar: "11 أكتوبر 2026", en: "11 October 2026" },
      hijri: { ar: "30 ربيع الثاني 1448 هـ", en: "30 Rabi' al-Thani 1448 AH" },
      text:  { ar: "كلمةٌ واحدة… فتحت للقلب أبواب الفرح كلها.",
               en: "A single word that opened every door of joy in my heart." },
      photo: null
    },
    {
      icon: "pact",
      title: { ar: "الاتفاق", en: "The Agreement" },
      day:   { ar: "الخميس", en: "Thursday" },
      greg:  { ar: "15 أكتوبر 2026", en: "15 October 2026" },
      hijri: { ar: "4 جمادى الأولى 1448 هـ", en: "4 Jumada al-Ula 1448 AH" },
      text:  { ar: "اتفقت العائلتان، وتلاقت القلوب على الخير.",
               en: "Two families agreed, and two hearts met upon goodness." },
      photo: null
    },
    {
      icon: "book",
      title: { ar: "الفاتحة", en: "Reciting Al-Fatiha" },
      day:   { ar: "الجمعة", en: "Friday" },
      greg:  { ar: "16 أكتوبر 2026", en: "16 October 2026" },
      hijri: { ar: "5 جمادى الأولى 1448 هـ", en: "5 Jumada al-Ula 1448 AH" },
      text:  { ar: "قرأنا الفاتحة، وبدأنا الطريق باسم الله.",
               en: "We recited Al-Fatiha and set out on the path in the name of Allah." },
      photo: null
    },
    {
      icon: "gift",
      title: { ar: "تجهيزات الخطوبة", en: "Engagement Preparations" },
      day:   { ar: "الإثنين", en: "Monday" },
      greg:  { ar: "19 أكتوبر 2026", en: "19 October 2026" },
      hijri: { ar: "8 جمادى الأولى 1448 هـ", en: "8 Jumada al-Ula 1448 AH" },
      text:  { ar: "أيامٌ من الترقّب الجميل، وتفاصيل صغيرة صنعت فرحتنا.",
               en: "Days of sweet anticipation, and small details that shaped our joy." },
      photo: null
    },
    {
      icon: "henna",
      title: { ar: "حِنّة الشبكة", en: "The Henna Night" },
      day:   { ar: "الخميس", en: "Thursday" },
      greg:  { ar: "22 أكتوبر 2026", en: "22 October 2026" },
      hijri: { ar: "11 جمادى الأولى 1448 هـ", en: "11 Jumada al-Ula 1448 AH" },
      text:  { ar: "نقوش الحنّة، وضحكات الأحبّة، وليلةٌ تسبق الفرح.",
               en: "Henna patterns, the laughter of loved ones, and the night before the joy." },
      photo: null
    },
    {
      icon: "ring",
      featured: true,
      title: { ar: "الشبكة والخطوبة 🥳", en: "The Shabka & Engagement 🥳" },
      day:   { ar: "الجمعة", en: "Friday" },
      greg:  { ar: "23 أكتوبر 2026", en: "23 October 2026" },
      hijri: { ar: "12 جمادى الأولى 1448 هـ", en: "12 Jumada al-Ula 1448 AH" },
      text:  { ar: "اليوم الذي التقت فيه الأيدي على خاتمٍ ووعد، وشهد الأحبّة على بداية عمرٍ جديد.",
               en: "The day our hands met over a ring and a promise, as our loved ones witnessed the beginning of a new life." }
    },
    {
      icon: "quill",
      future: true,
      title: { ar: "كتب الكتاب 💍", en: "Katb El-Ketab 💍" },
      subtitle: { ar: "عقد القِران", en: "The marriage contract" },
      when:  { ar: "قريبًا بإذن الله", en: "Soon, God willing" },
      text:  { ar: "ميثاقٌ غليظ… نرجوه قريبًا على خير.",
               en: "A solemn covenant — we pray it comes soon, upon goodness." }
    },
    {
      icon: "moon",
      future: true,
      title: { ar: "ليلة الزفاف ❤️", en: "The Wedding Night ❤️" },
      subtitle: { ar: "وتكتمل الحكاية", en: "And the story is complete" },
      when:  { ar: "قريبًا بإذن الله", en: "Soon, God willing" },
      text:  { ar: "في بيتٍ يملؤه السَّكن والمودّة والرحمة.",
               en: "In a home filled with tranquility, affection, and mercy." }
    }
  ],

  /* ---------- Interface text ------------------------------------------ */
  i18n: {
    ar: {
      "meta.title": "محمد & أسماء — حكاية خطوبتنا",
      "skip": "انتقل إلى المحتوى",
      "nav.home": "البداية",
      "nav.story": "حكايتنا",
      "nav.gallery": "الصور",
      "nav.video": "لحظاتنا",
      "lang.toggle": "English",
      "lang.label": "Switch to English",

      "hero.kicker": "خطوبة",
      "hero.hamd1": "الحمدُ لله حمدًا كثيرًا طيّبًا مباركًا فيه",
      "hero.hamd2": "الحمدُ لله الذي رزقني بمن أرجو أن تكون لي <em>زوجةً وسكنًا ومودّةً ورحمة</em>",
      "hero.translation1": "",
      "hero.translation2": "",
      "hero.groom": "محمد",
      "hero.groomTitle": "م. محمد عادل",
      "hero.bride": "أسماء",
      "hero.brideTitle": "د. أسماء جميل",
      "hero.date": "الجمعة 23 أكتوبر 2026",
      "hero.hijri": "12 جمادى الأولى 1448 هـ",
      "hero.scroll": "تابع الحكاية",
      "hero.photoAlt": "محمد وأسماء يوم الخطوبة",

      "verse.text": "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
      "verse.ref": "سورة الروم · الآية 21",
      "verse.translation": "",

      "count.title": "أيامٌ تُعدّ بالقلب",
      "count.since": "يومًا منذ الرؤية الشرعية",
      "count.engaged": "يومًا منذ الخطوبة",
      "count.chapters": "فصلان قادمان بإذن الله",
      "count.today": "اليوم",

      "story.kicker": "من أول نظرة إلى خاتم ووعد",
      "story.title": "حكايتنا",
      "story.lead": "خطواتٌ قليلة في التقويم.",
      "story.featuredBadge": "اليوم الأجمل",
      "story.here": "نحن هنا الآن",
      "story.ahead": "فصولٌ قادمة",
      "story.soonA11y": "لم يحدث بعد",

      "gallery.kicker": "ألبوم الذكريات",
      "gallery.title": "لحظاتٌ لا تُنسى",
      "gallery.lead": "اضغط على أي صورة لعرضها بالحجم الكامل.",
      "gallery.open": "عرض الصورة",
      "lightbox.close": "إغلاق",
      "lightbox.prev": "الصورة السابقة",
      "lightbox.next": "الصورة التالية",

      "video.kicker": "شريط الذكريات",
      "video.title": "من يوم الخطوبة",

      "close.dua": "اللهمّ بارك لنا، وبارك علينا، واجمع بيننا في خير",
      "close.line": "وما زال للحكاية بقية…",
      "close.amen": "آمين",
      "footer.made": "صُنعت بحبّ لتبقى ذكرى",
      "placeholder": "أضف الصورة"
    },

    en: {
      "meta.title": "Mohamed & Asmaa — Our Engagement Story",
      "skip": "Skip to content",
      "nav.home": "Home",
      "nav.story": "Our Story",
      "nav.gallery": "Gallery",
      "nav.video": "Film",
      "lang.toggle": "العربية",
      "lang.label": "التبديل إلى العربية",

      "hero.kicker": "Engagement",
      "hero.hamd1": "الحمدُ لله حمدًا كثيرًا طيّبًا مباركًا فيه",
      "hero.hamd2": "الحمدُ لله الذي رزقني بمن أرجو أن تكون لي <em>زوجةً وسكنًا ومودّةً ورحمة</em>",
      "hero.translation1": "All praise is due to Allah — abundant, pure, and blessed praise.",
      "hero.translation2": "Praise be to Allah, who has blessed me with the one I pray will be my wife, my tranquility, my affection, and my mercy.",
      "hero.groom": "Mohamed",
      "hero.groomTitle": "Eng. Mohamed Adel",
      "hero.bride": "Asmaa",
      "hero.brideTitle": "Dr. Asmaa Gamil",
      "hero.date": "Friday, 23 October 2026",
      "hero.hijri": "12 Jumada al-Ula 1448 AH",
      "hero.scroll": "Follow our story",
      "hero.photoAlt": "Mohamed and Asmaa on their engagement day",

      "verse.text": "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً",
      "verse.ref": "Surah Ar-Rum · 30:21",
      "verse.translation": "“And of His signs is that He created for you from yourselves mates, that you may find tranquility in them; and He placed between you affection and mercy.”",

      "count.title": "Days counted by heart",
      "count.since": "days since we first met",
      "count.engaged": "days since our engagement",
      "count.chapters": "chapters still ahead, God willing",
      "count.today": "today",

      "story.kicker": "From a first look to a ring and a promise",
      "story.title": "Our Story",
      "story.lead": "Only a few steps on the calendar, and a whole lifetime in the heart.",
      "story.featuredBadge": "The most beautiful day",
      "story.here": "We are here now",
      "story.ahead": "Chapters ahead",
      "story.soonA11y": "Not yet happened",

      "gallery.kicker": "Our Album",
      "gallery.title": "Moments to Remember",
      "gallery.lead": "Tap any photo to see it full size.",
      "gallery.open": "Open photo",
      "lightbox.close": "Close",
      "lightbox.prev": "Previous photo",
      "lightbox.next": "Next photo",

      "video.kicker": "Our Film",
      "video.title": "From Our Engagement Day",

      "close.dua": "O Allah, bless us, shower Your blessings upon us, and unite us in goodness",
      "close.line": "And the story continues…",
      "close.amen": "Ameen",
      "footer.made": "Made with love, to be remembered",
      "placeholder": "Add photo"
    }
  }
};
