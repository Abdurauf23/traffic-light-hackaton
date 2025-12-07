const translations = {
    en: {
        simulation: "Simulation",
        simulationDescription: "Try out simulation which is aimed to give opportunity to interact wth the project.",
        mainPage: "Main Page",
        mainPageDescription: "Go to the main page to see the project.",
        contentSection: "Content",
        demoVideo: "Demo Video",
        demoVideoDescription: "Watch a short demonstration of our smart traffic system in action.",
        chat: "Chat",
        chatDescription: "Try out ChatGPT like chat which will answer all questions about the project.",
        optimizedFlow: "Optimized Flow",
        reducedWait: "Reduced Wait Time",
        logo: "Smart Traffic Lights",
        heroTitle: "AI-Powered Intelligent Traffic Management System",
        heroSubtitle: "Transforming urban mobility through real-time adaptive traffic light control",
        problemSolutionTitle: "Problem & Solution",
        problemTitle: "The Problem",
        problemDesc: "Modern traffic lights in most cities operate on fixed schedules and barely account for real road load. During rush hours, accidents, road closures, or mass events, roads behave differently, but traffic lights continue running the same cycle without considering current traffic conditions.",
        keyProblems: "Key Issues:",
        problem1: "Traffic lights have fixed timings that don't adapt to current road congestion",
        problem2: "During rush hours and emergencies (accidents, repairs, road closures), the system cannot quickly adapt",
        problem3: "Historical traffic data is underutilized for long-term road and city planning",
        consequences: "Consequences:",
        consequence1: "Increased traffic jams and travel time",
        consequence2: "Higher fuel consumption and emissions",
        consequence3: "Elevated stress levels and accident risks",
        solutionTitle: "Our Solution",
        solutionDesc: "We propose an intelligent AI-based traffic light management system that evaluates traffic at intersections and nearby traffic lights in real-time, suggesting optimal timing adjustments. The AI analyzes queue lengths, flow intensity, and congestion on neighboring streets to adapt signal durations and synchronize multiple intersections.",
        keyFeatures: "Key Features:",
        feature1: "Real-time data collection from cameras and sensors",
        feature2: "Dynamic traffic light timing adjustments",
        feature3: "Multi-intersection coordination for 'green waves'",
        feature4: "Recommendation system for operator approval",
        feature5: "Long-term planning using accumulated traffic data",
        comparisonTitle: "Before & After",
        beforeTitle: "Without AI System",
        longWaitTimes: "Long Wait Times",
        wastedFuel: "Wasted Fuel",
        beforeDesc: "Fixed timing creates unnecessary traffic jams, longer wait times, and increased emissions.",
        afterTitle: "With AI System",
        afterDesc: "AI adapts timing in real-time, ensuring smooth traffic flow and minimal waiting.",
        teamTitle: "Our Team",
        role1: "AI Engineer",
        skills1: "Lead AI Developer, Machine Learning, Deep Learning",
        role2: "Data Analyst",
        skills2: "Data Analysis & Visualization, Database Management, Reporting & Dashboards",
        role3: "Project Manager",
        skills3: "Product & Project Management, Agile/Scrum, Requirements Analysis",
        role4: "Backend & DevOps Engineer",
        skills4: "Backend Development, DevOps, AI Engineering",
        whyUsTitle: "Why Our Team Can Solve This",
        whyUs1: "We are graduates of Inha University, where we gained a strong technical foundation in computer science, algorithms, networks, and systems engineering.",
        whyUs2: "We have hands-on experience with sensor data – collecting, cleaning, and interpreting signals from real devices, which directly relates to processing traffic data.",
        whyUs3: "Our final university project focused on robotics, where we developed motion logic and decision-making systems. This experience helps us build real-time systems similar to traffic flow management.",
        whyUs4: "We have experience with rapid prototyping and external API integration, allowing us to quickly build working solutions for the hackathon.",
        whyUs5: "We're not just developers – we are city users: drivers, pedestrians, passengers. Every day we personally face traffic jams, inefficient traffic lights, and unpredictable traffic. For us, this is not an abstract technical task, but a real problem we want to solve for ourselves and everyone around us.",
        roadmapTitle: "Roadmap & Current Stage",
        stage1: "IDEA",
        stage1Desc: "Problem analysis and KPI definition",
        stage2: "PROTOTYPE",
        stage2Desc: "Basic data collection and algorithm testing",
        stage3: "MVP",
        stage3Desc: "Backend service and operator dashboard",
        stage4: "LAUNCHED",
        stage4Desc: "Real intersection deployment",
        implementationTitle: "How We Plan to Solve It",
        implTitle1: "Implementation Steps",
        impl1: "Market research of existing intelligent traffic systems",
        impl2: "Data requirements analysis (vehicle count, queue length, flow intensity)",
        impl3: "Choose data source: traffic API or video stream processing",
        impl4: "Develop service for regular API polling and data processing",
        impl5: "Build decision-making logic for traffic light timing recommendations",
        impl6: "Create MVP operator dashboard",
        impl7: "Prepare demo scenario and presentation",
        implTitle2: "Technologies",
        tech1: "– Backend, API integration, recommendation logic, REST API (FastAPI/Flask)",
        tech2: "– Microservices architecture and external system integration",
        tech3: "– Historical data storage",
        tech4: "– Service containerization",
        tech5: "– Rapid operator dashboard prototyping",
        implTitle3: "AI Technologies",
        ai1: "External ML/AI services (e.g., Yandex API) for traffic analysis",
        ai2: "Classical ML algorithms (regression, boosting) for timing calculations",
        ai3: "Multi-intersection coordination algorithms",
        ai4: "Optional: LLM models for generating human-readable explanations",
        footer: "AI500 Hackathon 2024 | Muad'dib Team",
        demoAboutTitle: "About the Demo",
        demoWhatShownTitle: "What is Shown in the Demo",
        demoWhatShownDesc: "The demo displays a simulated intersection with working traffic lights. Traffic is generated on the roads, and the system recalculates and updates the traffic light phase every 60 seconds. This demonstrates how the model responds to changes in traffic load.",
        demoProblemSolutionTitle: "Problem & Solution Connection",
        demoProblemSolutionDesc1: "The problem is that most urban traffic lights operate on fixed schedules and don't account for real road conditions, leading to traffic jams.",
        demoProblemSolutionDesc2: "Our solution is an intelligent traffic light management system that analyzes traffic parameters (vehicle count, queue length, flow intensity) and automatically suggests optimal timing adjustments.",
        demoTechTitle: "Tech Stack & AI Solutions",
        demoTechStackLabel: "Technologies:",
        demoTechStack: "Java, Python, Docker, AWS EC2, JavaScript, React",
        demoTechAILabel: "AI Implementation:",
        demoTechAI: "Built using Scikit-learn with Random Forest model",
        demoStatusTitle: "Current Status & Next Steps",
        demoStatusLabel: "Status:",
        demoStatusCurrent: "Prototype - Single intersection simulation with adaptive phase switching logic",
        demoNextStepsLabel: "Next Steps:",
        demoNextStep1: "Expand simulation to multiple intersections",
        demoNextStep2: "Add more traffic parameters",
        demoNextStep3: "Test various ML/AI approaches",
        demoNextStep4: "Integrate real data from Yandex Maps",
        demoNextStep5: "MVP testing on real streets",
        demoNextStep6: "Collaborate with traffic authorities for real-world integration"
    }, ru: {
        simulation: "Симуляция",
        simulationDescription: "Попробуйте симуляцию, цель которой - дать возможность взаимодействовать с проектом.",
        mainPage: "Главная страница",
        mainPageDescription: "Вернуться на главную страницу проекта.",
        contentSection: "Ссылки на другие страницы",
        demoVideo: "Демонтрационное видео",
        demoVideoDescription: "Посмотрите короткую демонстрацию нашей интеллектуальной системы дорожного движения в действии.",
        chat: "Чат с ботом",
        chatDescription: "Попробуйте чат, похожий на ChatGPT, который ответит на все вопросы о проекте",
        optimizedFlow: "Оптимизированный поток машин",
        reducedWait: "Меньшее время ожидания",
        logo: "Умные Светофоры",
        heroTitle: "Интеллектуальная система управления трафиком на базе ИИ",
        heroSubtitle: "Трансформация городской мобильности через адаптивное управление светофорами в реальном времени",
        problemSolutionTitle: "Проблема и Решение",
        problemTitle: "Проблема",
        problemDesc: "Современные светофоры в большинстве городов работают по фиксированным сценариям и почти не учитывают реальную нагрузку на дороги. В часы пик, при ДТП, перекрытиях или массовых мероприятиях дороги ведут себя по-разному, но светофоры продолжают «крутить» один и тот же цикл без учета нынешней нагрузки.",
        keyProblems: "Ключевые проблемы:",
        problem1: "Светофоры имеют строго заданные тайминги, которые не меняются в зависимости от текущей загруженности дороги",
        problem2: "В часы пик и при нештатных ситуациях (ДТП, ремонт, перекрытие улиц) система не умеет быстро адаптироваться",
        problem3: "Исторические данные о трафике используются недостаточно эффективно для планирования дорог и районов",
        consequences: "Последствия проблемы:",
        consequence1: "Растут пробки и время в пути",
        consequence2: "Увеличиваются расход топлива и выбросы",
        consequence3: "Повышается уровень стресса и риск аварий",
        solutionTitle: "Наше Решение",
        solutionDesc: "Мы предлагаем интеллектуальную систему управления светофорами на базе искусственного интеллекта, которая в режиме реального времени оценивает трафик на перекрестке и на ближайших светофорах, и на основе этих данных предлагает оптимальные изменения режимов.",
        keyFeatures: "Ключевые элементы решения:",
        feature1: "Сбор данных в реальном времени с камер и датчиков",
        feature2: "Динамический пересчет таймингов красного/зелёного света",
        feature3: "Координация группы светофоров для формирования «зеленых волн»",
        feature4: "Режим системы рекомендаций для утверждения оператором",
        feature5: "Долгосрочное планирование с использованием накопленных данных о трафике",
        comparisonTitle: "До и После",
        beforeTitle: "Без AI Системы",
        longWaitTimes: "Бесполезная трата времени",
        wastedFuel: "Большая трата топлива",
        beforeDesc: "Фиксированные тайминги создают ненужные пробки, увеличивают время ожидания и выбросы.",
        afterTitle: "С AI Системой",
        afterDesc: "ИИ адаптирует тайминги в реальном времени, обеспечивая плавный транспортный поток и минимальное ожидание.",
        teamTitle: "Наша Команда",
        role1: "AI-инженер",
        skills1: "Ведущий разработчик ИИ, машинное обучение, глубокое обучение",
        role2: "Аналитик данных",
        skills2: "Анализ данных и визуализация, работа с базами данных, построение отчетов и дашбордов",
        role3: "Менеджер проекта",
        skills3: "Управление продуктом и проектом, Agile/Scrum, постановка требований",
        role4: "Бэкенд и DevOps инженер",
        skills4: "Разработка бэкенда, DevOps, AI-инженерия",
        whyUsTitle: "Почему наша команда способна решить эту задачу",
        whyUs1: "Мы выпускники Inha University, где получили сильную техническую базу в компьютерных науках, алгоритмах, сетях и системной инженерии.",
        whyUs2: "Мы работали с данными с датчиков: собирали, очищали и интерпретировали сигналы от реальных устройств – это напрямую связано с обработкой данных трафика.",
        whyUs3: "Наш финальный проект был посвящён робототехнике, где мы разрабатывали логику движения и принятия решений. Этот опыт помогает нам строить системы реального времени, похожие на управление транспортными потоками.",
        whyUs4: "Команда уже имеет практику быстрых прототипов и интеграции с внешними API, что позволит нам оперативно собрать рабочее решение для хакатона.",
        whyUs5: "Мы не просто разработчики — мы такие же пользователи города: водители, пешеходы, пассажиры. Каждый день лично сталкиваемся с пробками, неэффективными светофорами и непредсказуемостью трафика. Поэтому для нас это не абстрактная техническая задача, а реальная проблема, которую хочется решить для себя и для всех вокруг.",
        roadmapTitle: "Дорожная карта и текущий этап",
        stage1: "ИДЕЯ",
        stage1Desc: "Анализ проблем и определение KPI",
        stage2: "ПРОТОТИП",
        stage2Desc: "Базовый сбор данных и тестирование алгоритма",
        stage3: "MVP",
        stage3Desc: "Бэкенд-сервис и панель оператора",
        stage4: "ЗАПУЩЕНО",
        stage4Desc: "Подключение к реальным перекрёсткам",
        implementationTitle: "Как мы планируем реализовать решение",
        implTitle1: "Этапы реализации",
        impl1: "Изучение рынка и существующих систем интеллектуального управления трафиком",
        impl2: "Анализ требований к данным (количество машин, длина очереди, интенсивность)",
        impl3: "Выбор источника данных: API трафика или обработка видеопотока",
        impl4: "Разработка сервиса для регулярного опроса API и обработки данных",
        impl5: "Построение логики принятия решений для рекомендаций по таймингам светофоров",
        impl6: "Создание MVP-приложения (панель оператора)",
        impl7: "Подготовка демо-сценария и презентации",
        implTitle2: "Технологии",
        tech1: "– Backend, интеграция API, логика рекомендаций, REST API (FastAPI/Flask)",
        tech2: "– Микросервисная архитектура и интеграция с внешними системами",
        tech3: "– Хранение исторических данных",
        tech4: "– Контейнеризация сервиса",
        tech5: "– Быстрое прототипирование панели оператора",
        implTitle3: "ИИ-технологии",
        ai1: "Внешние ML/ИИ-сервисы (например, API Яндекса) для анализа трафика",
        ai2: "Классические ML-алгоритмы (регрессия, бустинг) для расчета таймингов",
        ai3: "Алгоритмы координации нескольких перекрёстков",
        ai4: "Опционально: LLM-модели для генерации человеко-понятных объяснений",
        footer: "Хакатон AI500 2024 | Muad'dib Team",
        demoAboutTitle: "О демонстрации",
        demoWhatShownTitle: "Что показано в демо",
        demoWhatShownDesc: "В демо отображён смоделированный перекрёсток с работающими светофорами. На дорогах генерируется поток машин, и система каждые 60 секунд пересчитывает и обновляет фазу светофора. Это демонстрирует, как модель реагирует на изменение дорожной нагрузки.",
        demoProblemSolutionTitle: "Как это связано с проблемой и решением",
        demoProblemSolutionDesc1: "Проблема заключается в том, что большинство городских светофоров работают по фиксированным расписаниям и не учитывают реальную ситуацию на дороге, из-за чего появляются пробки.",
        demoProblemSolutionDesc2: "Наше решение – интеллектуальная система управления светофорами, которая анализирует параметры трафика (количество машин, очереди, интенсивность потока) и автоматически предлагает более оптимальные тайминги переключения фаз.",
        demoTechTitle: "Используемый стек, технологии и AI решения",
        demoTechStackLabel: "Технологии:",
        demoTechStack: "Java, Python, Docker, AWS EC2, JavaScript, React",
        demoTechAILabel: "AI-часть:",
        demoTechAI: "Реализована с использованием Scikit-learn, модель Random Forest",
        demoStatusTitle: "Текущий статус и следующие шаги",
        demoStatusLabel: "Статус:",
        demoStatusCurrent: "Prototype – реализована симуляция одного перекрёстка, есть рабочая логика адаптивного переключения фаз",
        demoNextStepsLabel: "Следующие шаги:",
        demoNextStep1: "Расширить симуляцию на несколько перекрёстков",
        demoNextStep2: "Добавить больше параметров трафика",
        demoNextStep3: "Протестировать различные ML/AI-подходы",
        demoNextStep4: "Интегрировать реальные данные с Яндекс карт",
        demoNextStep5: "Тестирование MVP на небольшой реальной улице",
        demoNextStep6: "Сотрудничество с сотрудниками ГИБДД для интеграции с реальными светофорами и потоками данных"
    },
};

let currentLang = 'en';

function changeLanguage(lang) {
    currentLang = lang;

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update all translated elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    // Update roadmap content
    switchRoadmapTab(currentRoadmapIndex);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({behavior: 'smooth'});
        }
    });
});

// Roadmap tab switching
const roadmapData = {
    en: {
        idea: {
            title: "IDEA",
            items: ["Analysis of current intersection problems and fixed timings", "Definition of key KPIs (waiting time, queue length, throughput)"]
        }, prototype: {
            title: "PROTOTYPE",
            items: ["Collection of basic traffic data: number of vehicles, load by direction", "Connection to external data sources", "Development of simple heuristic logic (e.g., more cars → longer green light)", "Algorithm testing through simulation"]
        }, mvp: {
            title: "MVP",
            items: ["Backend service for regular data collection and recommendation calculation", "Simple operator dashboard showing current traffic load and suggested timings", "Pilot test at a test intersection or limited urban area (e.g., suburban zone, Chirchik)", "Collection and analysis of initial performance metrics"]
        }, launched: {
            title: "LAUNCHED",
            items: ["Integration with real intersections", "Algorithm improvement based on historical data", "Stable version, integration with city systems", "Collection of final metrics: reduced delays, shorter queues, efficiency evaluation"]
        }
    }, ru: {
        idea: {
            title: "ИДЕЯ",
            items: ["Анализ текущих проблем перекрёстков и фиксированных таймингов", "Определение ключевых KPI (время ожидания, длина очередей, пропускная способность)"]
        }, prototype: {
            title: "ПРОТОТИП",
            items: ["Сбор базовых данных о трафике: количество машин, загруженность по направлениям", "Подключение к внешним источникам данных", "Разработка простой эвристической логики (например, больше машин → больше зелёного света)", "Проверка работы алгоритма на симуляции"]
        }, mvp: {
            title: "MVP",
            items: ["Backend-сервис для регулярного сбора данных и расчёта рекомендаций", "Простая панель оператора с отображением текущей загруженности и предложенных таймингов", "Пилот на тестовом перекрёстке или ограниченной городской зоне (пригородная зона, Чирчик, например)", "Сбор и анализ начальных метрик эффективности"]
        }, launched: {
            title: "ЗАПУЩЕНО",
            items: ["Подключение системы к реальным перекрёсткам", "Улучшение алгоритма на основе истории данных", "Стабильная версия, интеграция с городскими системами", "Сбор финальных метрик: снижение задержек, уменьшение длины очередей, оценка эффективности"]
        }
    }
};

let currentRoadmapIndex = 1; // Start with PROTOTYPE

function switchRoadmapTab(index) {
    const stages = ['idea', 'prototype', 'mvp', 'launched'];
    const stage = stages[index];
    currentRoadmapIndex = index;

    // Update active tab
    document.querySelectorAll('.roadmap-tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });

    // Update content
    const data = roadmapData[currentLang][stage];
    document.getElementById('roadmap-stage-title').textContent = data.title;

    const contentList = document.getElementById('roadmap-stage-content');
    contentList.innerHTML = '';
    data.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        contentList.appendChild(li);
    });
}

// Initialize roadmap with PROTOTYPE stage
document.addEventListener('DOMContentLoaded', () => {
    switchRoadmapTab(1);
});

// Scroll-based car animation
let lastScrollY = 0;
let carPositionHorizontal = 360;
let carPositionVertical = 280;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollDelta = scrollY - lastScrollY;

    // Animate horizontal car
    const carHorizontal = document.getElementById('car-moving-scroll');
    if (carHorizontal) {
        carPositionHorizontal += scrollDelta * 0.5;
        if (carPositionHorizontal > 600) carPositionHorizontal = 340;
        if (carPositionHorizontal < 340) carPositionHorizontal = 600;
        carHorizontal.setAttribute('transform', `translate(${carPositionHorizontal - 360}, 0)`);
    }

    // Animate vertical car
    const carVertical = document.getElementById('car-vertical-scroll');
    if (carVertical) {
        carPositionVertical += scrollDelta * 0.3;
        if (carPositionVertical > 400) carPositionVertical = 250;
        if (carPositionVertical < 250) carPositionVertical = 400;
        carVertical.setAttribute('transform', `translate(0, ${carPositionVertical - 280})`);
    }

    lastScrollY = scrollY;
});