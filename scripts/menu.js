(()=>{
    var navbarNav = document.createElement('ul');
    navbarNav.className = 'navbar-nav ms-auto';

    var navItemHome = document.createElement('li');
    navItemHome.className = 'nav-item';
    var navLinkHome = document.createElement('a');
    navLinkHome.className = 'nav-link active';
    navLinkHome.id = 'menu-item-home';
    navLinkHome.setAttribute('aria-current', 'page');
    navLinkHome.href = aux;
    navLinkHome.title = 'Go to Home Page (website home page)';
    navLinkHome.textContent = 'Home Page';
    navItemHome.appendChild(navLinkHome);

    var navItem3Buttons = document.createElement('li');
    navItem3Buttons.className = 'nav-item';
    var navLink3Buttons = document.createElement('a');
    navLink3Buttons.className = 'nav-link';
    navLink3Buttons.textContent = 'Create Buttons';
    navLink3Buttons.href = aux + 'buttons'
    navLink3Buttons.title = 'Go to tool 3 buttons';
    navItem3Buttons.appendChild(navLink3Buttons);

    navbarNav.appendChild(navItemHome);
    navbarNav.appendChild(navItem3Buttons);

    collapseDiv.appendChild(navbarNav);

    var select = document.createElement("select");
    select.className = "form-select ms-3";
    select.id = "languageSelect";
    select.setAttribute("onchange", "changeLanguage(this.value)");

    var languages = [
        { value: "", title: "", text: "" },
        { value: "ku", title: "Curdo (Kurmanji)", text: "Kurdî (Kurmancî)" },
        { value: "af", title: "Afrikaans", text: "Afrikaans" },
        { value: "sq", title: "Albanês", text: "Shqip" },
        { value: "am", title: "Amárico", text: "አማርኛ" },
        { value: "ar", title: "Árabe", text: "العربية" },
        { value: "hy", title: "Armênio", text: "Հայերեն" },
        { value: "az", title: "Azeri", text: "Azərbaycan dili" },
        { value: "eu", title: "Basco", text: "Euskara" },
        { value: "be", title: "Bielorrusso", text: "Беларуская" },
        { value: "bn", title: "Bengali", text: "বাংলা" },
        { value: "bs", title: "Bósnio", text: "Bosanski" },
        { value: "bg", title: "Búlgaro", text: "български" },
        { value: "ca", title: "Catalão", text: "Català" },
        { value: "ceb", title: "Cebuano", text: "Cebuano" },
        { value: "ny", title: "Chichewa", text: "Chichewa" },
        { value: "zh", title: "Chinês (Simplificado)", text: "简体中文" },
        { value: "zh-TW", title: "Chinês (Tradicional)", text: "繁體中文" },
        { value: "co", title: "Corso", text: "Corsu" },
        { value: "hr", title: "Croata", text: "Hrvatski" },
        { value: "cs", title: "Checo", text: "Čeština" },
        { value: "da", title: "Dinamarquês", text: "Dansk" },
        { value: "nl", title: "Holandês", text: "Nederlands" },
        { value: "en", title: "Inglês", text: "English" },
        { value: "eo", title: "Esperanto", text: "Esperanto" },
        { value: "et", title: "Estoniano", text: "Eesti" },
        { value: "tl", title: "Filipino", text: "Filipino" },
        { value: "fi", title: "Finlandês", text: "Suomi" },
        { value: "fr", title: "Francês", text: "Français" },
        { value: "fy", title: "Frísio", text: "Frysk" },
        { value: "gl", title: "Galego", text: "Galego" },
        { value: "ka", title: "Georgiano", text: "ქართული" },
        { value: "de", title: "Alemão", text: "Deutsch" },
        { value: "el", title: "Grego", text: "Ελληνικά" },
        { value: "gu", title: "Guzerate", text: "ગુજરાતી" },
        { value: "ht", title: "Haitiano", text: "Kreyòl ayisyen" },
        { value: "ha", title: "Hausa", text: "Hausa" },
        { value: "haw", title: "Havaiano", text: "ʻŌlelo Hawaiʻi" },
        { value: "he", title: "Hebraico", text: "עברית" },
        { value: "hi", title: "Hindi", text: "हिन्दी" },
        { value: "hmn", title: "Hmong", text: "Hmong" },
        { value: "hu", title: "Húngaro", text: "Magyar" },
        { value: "is", title: "Islandês", text: "Íslenska" },
        { value: "ig", title: "Ibo", text: "Igbo" },
        { value: "id", title: "Indonésio", text: "Bahasa Indonesia" },
        { value: "ga", title: "Irlandês", text: "Gaeilge" },
        { value: "it", title: "Italiano", text: "Italiano" },
        { value: "ja", title: "Japonês", text: "日本語" },
        { value: "jw", title: "Javanês", text: "Jawa" },
        { value: "kn", title: "Canarês", text: "ಕನ್ನಡ" },
        { value: "kk", title: "Cazaque", text: "Қазақ тілі" },
        { value: "km", title: "Khmer", text: "ភាសាខ្មែរ" },
        { value: "rw", title: "Quiniaruanda", text: "Kinyarwanda" },
        { value: "ko", title: "Coreano", text: "한국어" },
        { value: "ky", title: "Quirguiz", text: "Кыргызча" },
        { value: "lo", title: "Lao", text: "ພາສາລາວ" },
        { value: "la", title: "Latim", text: "Latina" },
        { value: "lv", title: "Letão", text: "Latviešu" },
        { value: "lt", title: "Lituano", text: "Lietuvių" },
        { value: "lb", title: "Luxemburguês", text: "Lëtzebuergesch" },
        { value: "mk", title: "Macedônio", text: "Македонски" },
        { value: "mg", title: "Malgaxe", text: "Malagasy" },
        { value: "ms", title: "Malaio", text: "Bahasa Melayu" },
        { value: "ml", title: "Malaiala", text: "മലയാളം" },
        { value: "mt", title: "Maltês", text: "Malti" },
        { value: "mi", title: "Maori", text: "Māori" },
        { value: "mr", title: "Marathi", text: "मराठी" },
        { value: "mn", title: "Mongol", text: "Монгол" },
        { value: "my", title: "Birmanês", text: "ဗမာ" },
        { value: "ne", title: "Nepalês", text: "नेपाली" },
        { value: "no", title: "Norueguês", text: "Norsk" },
        { value: "or", title: "Oriá", text: "ଓଡ଼ିଆ" },
        { value: "ps", title: "Pashto", text: "پښتو" },
        { value: "fa", title: "Persa", text: "فارسی" },
        { value: "pl", title: "Polonês", text: "Polski" },
        { value: "pt", title: "Português (Portugal, Brasil)", text: "Português" },
        { value: "pa", title: "Punjabi", text: "ਪੰਜਾਬੀ" },
        { value: "ro", title: "Romeno", text: "Română" },
        { value: "ru", title: "Russo", text: "Русский" },
        { value: "sm", title: "Samoano", text: "Gagana fa'a Samoa" },
        { value: "gd", title: "Gaélico escocês", text: "Gàidhlig" },
        { value: "sr", title: "Sérvio", text: "Српски" },
        { value: "st", title: "Sesoto", text: "Sesotho" },
        { value: "sn", title: "Shona", text: "ChiShona" },
        { value: "sd", title: "Sindi", text: "سنڌي" },
        { value: "si", title: "Cingalês", text: "සිංහල" },
        { value: "sk", title: "Eslovaco", text: "Slovenčina" },
        { value: "sl", title: "Esloveno", text: "Slovenščina" },
        { value: "so", title: "Somali", text: "Soomaali" },
        { value: "es", title: "Espanhol", text: "Español" },
        { value: "su", title: "Sundanês", text: "Basa Sunda" },
        { value: "sw", title: "Suaíli", text: "Kiswahili" },
        { value: "sv", title: "Sueco", text: "Svenska" },
        { value: "tg", title: "Tadjique", text: "тоҷикӣ" },
        { value: "ta", title: "Tâmil", text: "தமிழ்" },
        { value: "tt", title: "Tártaro", text: "татарча" },
        { value: "te", title: "Télugo", text: "తెలుగు" },
        { value: "th", title: "Tailandês", text: "ไทย" },
        { value: "tr", title: "Turco", text: "Türkçe" },
        { value: "tk", title: "Turcomano", text: "Türkmençe" },
        { value: "uk", title: "Ucraniano", text: "Українська" },
        { value: "ur", title: "Urdu", text: "اردو" },
        { value: "ug", title: "Uigur", text: "ئۇيغۇرچە" },
        { value: "uz", title: "Uzbeque", text: "Oʻzbekcha" },
        { value: "vi", title: "Vietnamita", text: "Tiếng Việt" },
        { value: "cy", title: "Galês", text: "Cymraeg" },
        { value: "xh", title: "Xhosa", text: "isiXhosa" },
        { value: "yi", title: "Iídiche", text: "ייִדיש" },
        { value: "yo", title: "Iorubá", text: "Èdè Yorùbá" },
        { value: "zu", title: "Zulu", text: "isiZulu" }
    ];
    languages.forEach(function(lang) {
        var option = document.createElement("option");
        option.value = lang.value;
        option.textContent = lang.text;
        option.title = lang.title;
        select.appendChild(option);
    });


    document.getElementById("navbarNav").appendChild(navbarNav)
})()