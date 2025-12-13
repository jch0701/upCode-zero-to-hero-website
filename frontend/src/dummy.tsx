import { defaultImageSrc, javaImage, pythonImage, javaScriptImage, cImage, machinelearningImage,
         devopsImage, frontendImage, backendImage, reactImage, apiImage, angularImage,
         typeScriptImage, htmlcssImage, sqlImage
 } from "./lib/image";
import type { LinkType } from "./store/linksSlice";
import type { PillarType } from "./store/pillarsSlice";
import type { RoadmapType } from "./store/roadmapSlice";


export const roadmapData: RoadmapType[] = [
  {
    roadmapID: 100001,
    roadmapSlug: "java-fundamentals",
    creatorID: 100001,
    imageSrc: javaImage,
    title: "Java Fundamentals",
    description: "The Java Fundamentals roadmap is designed to build a strong foundation in the Java programming language. It starts with essential topics such as data types, control flow, arrays, and Object-Oriented Programming (OOP) concepts like classes, objects, inheritance, and polymorphism. You will also learn how to work with the Java Collections Framework, handle exceptions, and use Java’s functional features like lambda expressions and the Stream API. This roadmap prepares learners for real-world development and serves as a prerequisite for more advanced Java frameworks like Spring Boot.",
    createdDate: "2025-10-20",
    isFavourite: false,
    
  },
  {
    roadmapID: 100002,
    roadmapSlug: "python-basics",
    creatorID: 100002,
    imageSrc: pythonImage,
    title: "Python Basics",
    description: "Python Basics introduces new learners to one of the most popular and beginner-friendly programming languages. This roadmap covers variables, loops, conditions, functions, and basic data structures such as lists and dictionaries. You will also explore simple file handling, modules, and basic problem-solving techniques. The goal is to help beginners write clean and readable Python scripts while building confidence to continue toward intermediate Python topics or apply Python in fields like data analytics, automation, and AI.",
    createdDate: "2025-11-05",
    isFavourite: false,
    
  },
  {
    roadmapID: 100003,
    roadmapSlug: "javascript-essentials",
    creatorID: 100002,
    imageSrc: javaScriptImage,
    title: "JavaScript Essentials",
    description: "JavaScript Essentials provides a clear path for mastering the core features of JavaScript, the language of the web. This roadmap includes topics such as variables, functions, loops, arrays, objects, and basic DOM manipulation. You will also learn how JavaScript runs in the browser, how events work, and how to interact with HTML and CSS. These fundamentals form the base required for front-end frameworks like React, Angular, and Vue.",
    createdDate: "2025-08-15",
    isFavourite: false,
    
  },
  {
    roadmapID: 100004,
    roadmapSlug: "react-for-beginners",
    creatorID: 100003,
    imageSrc: reactImage,
    title: "React for Beginners",
    description: "This roadmap introduces the basics of React, one of the most in-demand front-end frameworks. You will learn how to create components, manage state, handle props, and work with React Hooks such as useState and useEffect. The roadmap also covers JSX, component trees, and simple API fetching. By the end, you will understand how to build interactive and reusable UI components — an essential skill for modern web development.",
    createdDate: "2025-09-25",
    isFavourite: false,
    
  },
  {
    roadmapID: 100005,
    roadmapSlug: "nodejs-fundamentals",
    creatorID: 100001,
    imageSrc: defaultImageSrc,
    title: "Node.js Fundamentals",
    description: "Node.js Fundamentals guides you into the world of backend JavaScript development. You will learn how Node.js works, how to use built-in modules, and how to create simple servers. The roadmap also covers asynchronous programming, callbacks, promises, and using npm packages. By understanding the Node.js runtime environment and event loop, you will be prepared to build APIs or move into full-stack development using frameworks like Express.js.",
    createdDate: "2025-11-09",
    isFavourite: false,
    
  },
  {
    roadmapID: 100006,
    roadmapSlug: "sql-basics",
    creatorID: 100007,
    imageSrc: sqlImage,
    title: "SQL Basics",
    description: "SQL Basics provides a foundational understanding of relational databases and the SQL language. You will learn how to create, read, update, and delete data using SQL queries. The roadmap covers essential concepts such as database design, normalization, joins, and indexing. By mastering SQL, you will be equipped to work with popular database systems like MySQL, PostgreSQL, and SQLite, which are crucial for backend development and data management.",
    createdDate: "2025-12-15",
    isFavourite: false,
    
  },
  {
    roadmapID: 100007,
    roadmapSlug: "html-css-fundamentals",
    creatorID: 100007,
    imageSrc: htmlcssImage,
    title: "HTML & CSS Fundamentals",
    description:  "HTML & CSS Fundamentals teaches the core building blocks of web development. You will learn how to structure webpages using HTML elements such as headings, paragraphs, lists, and forms. Then, you will work with CSS to style layouts, apply colors, spacing, and responsive design. This roadmap helps beginners create clean and attractive webpages and builds the foundation needed for JavaScript and front-end frameworks.",
    createdDate: "2025-11-11",
    isFavourite: false,
    
  },
  {
    roadmapID: 100008,
    roadmapSlug: "typescript-basics",
    creatorID: 100001,
    imageSrc: typeScriptImage,
    title: "TypeScript Basics",
    description: "TypeScript Basics introduces the strongly typed superset of JavaScript that adds static types. You will learn about type annotations, interfaces, classes, and generics. The roadmap covers how TypeScript improves code quality and developer experience by catching errors early and enabling better tooling. By mastering TypeScript basics, you will be prepared to work on large-scale JavaScript applications and frameworks like Angular.",
    createdDate: "2025-12-05",
    isFavourite: false,
    
  },
  {
    roadmapID: 100009,
    roadmapSlug: "angular-fundamentals",
    creatorID: 100002,
    imageSrc: angularImage,
    title: "Angular Fundamentals",
    description: "Angular Fundamentals covers the core concepts of the Angular framework. You will learn about components, templates, data binding, directives, services, and dependency injection. The roadmap also introduces Angular CLI, routing, and forms. By mastering these fundamentals, you will be able to build dynamic single-page applications and understand the architecture of modern front-end development with Angular.",
    createdDate: "2025-01-15",
    isFavourite: false,
    
  },
  {
    roadmapID: 100010,
    roadmapSlug: "python-advanced-concepts",
    creatorID: 100004,
    imageSrc: pythonImage,
    title: "Python Advanced Concepts",
    description: "Explore advanced concepts in Python programming, including decorators, generators, context managers, metaclasses, and concurrency. This roadmap helps you deepen your understanding of Python's capabilities and prepares you for complex application development and optimization.",
    createdDate: "2026-01-25",
    isFavourite: false,
    
  },
  {
    roadmapID: 100011,
    roadmapSlug: "java-advanced-topics",
    creatorID: 100001,
    imageSrc: javaImage,
    title: "Java Advanced Topics",
    description: "Explore advanced topics in Java programming, including concurrency, JVM internals, garbage collection, and performance tuning. This roadmap helps you deepen your understanding of Java's capabilities and prepares you for building high-performance, scalable applications.",
    createdDate: "2026-01-05",
    isFavourite: false,
    
  },
  {
    roadmapID: 100012,
    roadmapSlug: "react-advanced-patterns",
    creatorID: 100002,
    imageSrc: reactImage,
    title: "React Advanced Patterns",
    description: "Explore advanced patterns in React development, including higher-order components, render props, context API, hooks, and performance optimization techniques. This roadmap helps you build scalable and maintainable React applications by mastering design patterns and best practices.",
    createdDate: "2025-02-15",
    isFavourite: false,
    
  },
  {
    roadmapID: 100013,
    roadmapSlug: "api-design-and-development",
    creatorID: 100003,
    imageSrc: apiImage,
    title: "API Design and Development",
    description: "Master the principles of designing, developing, and deploying robust APIs. Topics include RESTful design, GraphQL fundamentals, authentication (OAuth, JWT), API documentation (Swagger/OpenAPI), and performance testing.",
    createdDate: "2025-03-01",
    isFavourite: false,
  },
  {
    roadmapID: 100014,
    roadmapSlug: "modern-frontend-development",
    creatorID: 100004,
    imageSrc: frontendImage,
    title: "Modern Frontend Development",
    description: "A comprehensive path covering HTML5, CSS3 (Flexbox/Grid), advanced JavaScript (ES6+), and popular frameworks like Vue.js and Svelte. Focus on responsive design, state management, and build tools (Webpack/Vite).",
    createdDate: "2025-04-10",
    isFavourite: false,
  },
  {
    roadmapID: 100015,
    roadmapSlug: "scalable-backend-engineering",
    creatorID: 100005,
    imageSrc: backendImage,
    title: "Scalable Backend Engineering",
    description: "Learn to build high-performance, scalable servers using languages like Node.js, Go, or Python (Django/Flask). Includes database management (SQL/NoSQL), microservices architecture, caching strategies, and security implementation.",
    createdDate: "2025-05-20",
    isFavourite: false,
  },
  {
    roadmapID: 100016,
    roadmapSlug: "devops-fundamentals-and-ci-cd",
    creatorID: 100006,
    imageSrc: devopsImage,
    title: "DevOps Fundamentals and CI/CD",
    description: "Master the DevOps toolchain, focusing on automation, infrastructure as code (Terraform), containerization (Docker, Kubernetes), and building continuous integration/continuous delivery (CI/CD) pipelines (Jenkins/GitLab CI).",
    createdDate: "2025-06-05",
    isFavourite: false,
  },
  {
    roadmapID: 100017,
    roadmapSlug: "machine-learning-engineering",
    creatorID: 100007,
    imageSrc: machinelearningImage,
    title: "Machine Learning Engineering",
    description: "A deep dive into model development, training, and deployment. Covers core algorithms, data preprocessing, MLOps, cloud platforms (AWS Sagemaker/Azure ML), and performance optimization for production environments.",
    createdDate: "2025-07-12",
    isFavourite: false,
  },
  {
    roadmapID: 100018,
    roadmapSlug: "modern-c++",
    creatorID: 100008,
    imageSrc: cImage,
    title: "Modern C++ Programming",
    description: "Focus on C++17 and C++20 features, object-oriented programming, standard template library (STL), memory management, multithreading, and best practices for developing high-performance, low-latency applications.",
    createdDate: "2025-08-25",
    isFavourite: false,
},
];


export const pillarsData: PillarType[] = [
    // Java Fundamentals (100001)
  { chapterID: 100001, chapterSlug: "java-introduction", roadmapID: 100001, title: "Introduction to Java", description: "Learn Java basics and set up your development environment.", difficulty: "Beginner", category: "Java", prerequisite: "None", order: 1, isViewed: false },
  { chapterID: 100002, chapterSlug: "java-variables", roadmapID: 100001, title: "Variables and Data Types", description: "Understand variables, primitive types, and type conversions.", difficulty: "Beginner", category: "Java", prerequisite: "Introduction to Java", order: 2, isViewed: false },
  { chapterID: 100003, chapterSlug: "java-control-flow", roadmapID: 100001, title: "Control Flow", description: "Learn conditionals, loops, and decision-making in Java.", difficulty: "Intermediate", category: "Java", prerequisite: "Variables and Data Types", order: 3, isViewed: false },
  { chapterID: 100004, chapterSlug: "java-oop", roadmapID: 100001, title: "Object-Oriented Programming", description: "Explore classes, objects, inheritance, and polymorphism.", difficulty: "Intermediate", category: "Java", prerequisite: "Control Flow", order: 4, isViewed: false },
  { chapterID: 100005, chapterSlug: "java-collections", roadmapID: 100001, title: "Collections Framework", description: "Learn Lists, Sets, Maps, and Queues in Java.", difficulty: "Advanced", category: "Java", prerequisite: "Object-Oriented Programming", order: 5, isViewed: false },

  // Python Basics (100002)
  { chapterID: 100006, chapterSlug: "python-intro", roadmapID: 100002, title: "Introduction to Python", description: "Get started with Python syntax and setup.", difficulty: "Beginner", category: "Python", prerequisite: "None", order: 1, isViewed: false },
  { chapterID: 100007, chapterSlug: "python-variables", roadmapID: 100002, title: "Variables and Data Types", description: "Understand Python variables, lists, tuples, and dictionaries.", difficulty: "Beginner", category: "Python", prerequisite: "Introduction to Python", order: 2, isViewed: false },
  { chapterID: 100008, chapterSlug: "python-control-flow", roadmapID: 100002, title: "Control Flow", description: "Learn if statements, loops, and error handling in Python.", difficulty: "Intermediate", category: "Python", prerequisite: "Variables and Data Types", order: 3, isViewed: false },
  { chapterID: 100009, chapterSlug: "python-functions", roadmapID: 100002, title: "Functions and Modules", description: "Create reusable code using functions and modules.", difficulty: "Intermediate", category: "Python", prerequisite: "Control Flow", order: 4, isViewed: false },
  { chapterID: 100010, chapterSlug: "python-file-io", roadmapID: 100002, title: "File I/O", description: "Read and write files in Python for data storage.", difficulty: "Advanced", category: "Python", prerequisite: "Functions and Modules", order: 5, isViewed: false },

  // JavaScript Essentials (100003)
  { chapterID: 100011, chapterSlug: "js-intro", roadmapID: 100003, title: "Introduction to JavaScript", description: "Learn JS basics, variables, and operators.", difficulty: "Beginner", category: "JavaScript", prerequisite: "None", order: 1, isViewed: false },
  { chapterID: 100012, chapterSlug: "js-functions", roadmapID: 100003, title: "Functions and Scope", description: "Understand functions, closures, and variable scope.", difficulty: "Intermediate", category: "JavaScript", prerequisite: "Introduction to JavaScript", order: 2, isViewed: false },
  { chapterID: 100013, chapterSlug: "js-dom", roadmapID: 100003, title: "DOM Manipulation", description: "Interact with web pages using the DOM.", difficulty: "Intermediate", category: "JavaScript", prerequisite: "Functions and Scope", order: 3, isViewed: false },
  { chapterID: 100014, chapterSlug: "js-events", roadmapID: 100003, title: "Events and Listeners", description: "Handle user interactions using events.", difficulty: "Intermediate", category: "JavaScript", prerequisite: "DOM Manipulation", order: 4, isViewed: false },
  { chapterID: 100015, chapterSlug: "js-async", roadmapID: 100003, title: "Asynchronous JavaScript", description: "Learn callbacks, promises, and async/await.", difficulty: "Advanced", category: "JavaScript", prerequisite: "Events and Listeners", order: 5, isViewed: false },

  // React for Beginners (100004)
  { chapterID: 100016, chapterSlug: "react-intro", roadmapID: 100004, title: "Introduction to React", description: "Understand React basics and JSX.", difficulty: "Beginner", category: "React", prerequisite: "None", order: 1, isViewed: false },
  { chapterID: 100017, chapterSlug: "react-components", roadmapID: 100004, title: "Components and Props", description: "Create reusable components and pass data via props.", difficulty: "Intermediate", category: "React", prerequisite: "Introduction to React", order: 2, isViewed: false },
  { chapterID: 100018, chapterSlug: "react-state", roadmapID: 100004, title: "State Management", description: "Learn useState and managing component state.", difficulty: "Intermediate", category: "React", prerequisite: "Components and Props", order: 3, isViewed: false },
  { chapterID: 100019, chapterSlug: "react-hooks", roadmapID: 100004, title: "React Hooks", description: "Learn useEffect and other hooks for side effects.", difficulty: "Intermediate", category: "React", prerequisite: "State Management", order: 4, isViewed: false },
  { chapterID: 100020, chapterSlug: "react-api", roadmapID: 100004, title: "Fetching Data with APIs", description: "Learn how to fetch data from APIs using React.", difficulty: "Advanced", category: "React", prerequisite: "React Hooks", order: 5, isViewed: false },

  // Node.js Fundamentals (100005)
  { chapterID: 100021, chapterSlug: "node-intro", roadmapID: 100005, title: "Introduction to Node.js", description: "Learn Node.js runtime and setup.", difficulty: "Beginner", category: "NodeJS", prerequisite: "None", order: 1, isViewed: false },
  { chapterID: 100022, chapterSlug: "node-modules", roadmapID: 100005, title: "Node.js Modules", description: "Understand built-in modules and npm packages.", difficulty: "Intermediate", category: "NodeJS", prerequisite: "Introduction to Node.js", order: 2, isViewed: false },
  { chapterID: 100023, chapterSlug: "node-server", roadmapID: 100005, title: "Creating Servers", description: "Build simple HTTP servers in Node.js.", difficulty: "Intermediate", category: "NodeJS", prerequisite: "Node.js Modules", order: 3, isViewed: false },
  { chapterID: 100024, chapterSlug: "node-async", roadmapID: 100005, title: "Asynchronous Programming", description: "Learn callbacks, promises, and async patterns.", difficulty: "Advanced", category: "NodeJS", prerequisite: "Creating Servers", order: 4, isViewed: false },
  { chapterID: 100025, chapterSlug: "node-express", roadmapID: 100005, title: "Express.js Basics", description: "Build RESTful APIs using Express framework.", difficulty: "Advanced", category: "NodeJS", prerequisite: "Asynchronous Programming", order: 5, isViewed: false },

  // SQL Basics (100006)
  { chapterID: 100026, chapterSlug: "sql-intro", roadmapID: 100006, title: "Introduction to SQL", description: "Learn SQL syntax, setup, and basic queries.", difficulty: "Beginner", category: "Database SQL", prerequisite: "None", order: 1, isViewed: false },
  { chapterID: 100027, chapterSlug: "sql-select-queries", roadmapID: 100006, title: "SELECT Queries", description: "Retrieve data from databases using SELECT statements.", difficulty: "Beginner", category: "Database SQL", prerequisite: "Introduction to SQL", order: 2, isViewed: false },
  { chapterID: 100028, chapterSlug: "sql-joins", roadmapID: 100006, title: "Joins", description: "Combine tables using INNER, LEFT, RIGHT, and FULL joins.", difficulty: "Intermediate", category: "Database SQL", prerequisite: "SELECT Queries", order: 3, isViewed: false },
  { chapterID: 100029, chapterSlug: "sql-aggregate-functions", roadmapID: 100006, title: "Aggregate Functions", description: "Use COUNT, SUM, AVG, MIN, MAX for data analysis.", difficulty: "Intermediate", category: "Database SQL", prerequisite: "Joins", order: 4, isViewed: false },
  { chapterID: 100030, chapterSlug: "sql-indexing", roadmapID: 100006, title: "Indexing and Optimization", description: "Learn how indexing improves query performance.", difficulty: "Advanced", category: "Database SQL", prerequisite: "Aggregate Functions", order: 5, isViewed: false },

  // HTML & CSS Fundamentals (100007)
  { chapterID: 100031, chapterSlug: "html-intro", roadmapID: 100007, title: "Introduction to HTML", description: "Learn the structure of web pages using HTML.", difficulty: "Beginner", category: "HTML/CSS", prerequisite: "None", order: 1, isViewed: false },
  { chapterID: 100032, chapterSlug: "html-forms", roadmapID: 100007, title: "HTML Forms", description: "Create forms and gather user input effectively.", difficulty: "Beginner", category: "HTML/CSS", prerequisite: "Introduction to HTML", order: 2, isViewed: false },
  { chapterID: 100033, chapterSlug: "css-intro", roadmapID: 100007, title: "CSS Basics", description: "Style web pages using colors, fonts, and layouts.", difficulty: "Intermediate", category: "HTML/CSS", prerequisite: "HTML Forms", order: 3, isViewed: false },
  { chapterID: 100034, chapterSlug: "css-flexbox-grid", roadmapID: 100007, title: "Flexbox and Grid", description: "Create responsive layouts using Flexbox and Grid.", difficulty: "Intermediate", category: "HTML/CSS", prerequisite: "CSS Basics", order: 4, isViewed: false },
  { chapterID: 100035, chapterSlug: "css-animations", roadmapID: 100007, title: "Animations and Transitions", description: "Add animations and transitions for interactive UI.", difficulty: "Advanced", category: "HTML/CSS", prerequisite: "Flexbox and Grid", order: 5, isViewed: false },

  // TypeScript Basics (100008)
  { chapterID: 100036, chapterSlug: "ts-intro", roadmapID: 100008, title: "Introduction to TypeScript", description: "Learn TypeScript syntax, types, and setup.", difficulty: "Beginner", category: "TypeScript", prerequisite: "None", order: 1, isViewed: false },
  { chapterID: 100037, chapterSlug: "ts-types", roadmapID: 100008, title: "Types and Interfaces", description: "Use strong typing with interfaces and type annotations.", difficulty: "Intermediate", category: "TypeScript", prerequisite: "Introduction to TypeScript", order: 2, isViewed: false },
  { chapterID: 100038, chapterSlug: "ts-classes", roadmapID: 100008, title: "Classes and Objects", description: "Understand classes, inheritance, and OOP in TypeScript.", difficulty: "Intermediate", category: "TypeScript", prerequisite: "Types and Interfaces", order: 3, isViewed: false },
  { chapterID: 100039, chapterSlug: "ts-generics", roadmapID: 100008, title: "Generics", description: "Create reusable code with generics.", difficulty: "Advanced", category: "TypeScript", prerequisite: "Classes and Objects", order: 4, isViewed: false },
  { chapterID: 100040, chapterSlug: "ts-advanced", roadmapID: 100008, title: "Advanced TypeScript Features", description: "Learn advanced types, decorators, and type guards.", difficulty: "Advanced", category: "TypeScript", prerequisite: "Generics", order: 5, isViewed: false },

  // Angular Fundamentals (100009)
  { chapterID: 100041, chapterSlug: "angular-intro", roadmapID: 100009, title: "Introduction to Angular", description: "Learn Angular setup, modules, and architecture.", difficulty: "Beginner", category: "Angular", prerequisite: "None", order: 1, isViewed: false },
  { chapterID: 100042, chapterSlug: "angular-components", roadmapID: 100009, title: "Components and Templates", description: "Create components and bind templates in Angular.", difficulty: "Intermediate", category: "Angular", prerequisite: "Introduction to Angular", order: 2, isViewed: false },
  { chapterID: 100043, chapterSlug: "angular-services", roadmapID: 100009, title: "Services and Dependency Injection", description: "Manage data and services efficiently.", difficulty: "Intermediate", category: "Angular", prerequisite: "Components and Templates", order: 3, isViewed: false },
  { chapterID: 100044, chapterSlug: "angular-routing", roadmapID: 100009, title: "Routing and Navigation", description: "Handle page navigation and dynamic routes.", difficulty: "Intermediate", category: "Angular", prerequisite: "Services and DI", order: 4, isViewed: false },
  { chapterID: 100045, chapterSlug: "angular-forms", roadmapID: 100009, title: "Forms and Validation", description: "Create forms with validation in Angular.", difficulty: "Advanced", category: "Angular", prerequisite: "Routing and Navigation", order: 5, isViewed: false },

  // Python Advanced Concepts (100010)
  { chapterID: 100046, chapterSlug: "python-decorators", roadmapID: 100010, title: "Decorators", description: "Learn how decorators modify functions and classes.", difficulty: "Advanced", category: "Python", prerequisite: "Functions and Modules", order: 1, isViewed: false },
  { chapterID: 100047, chapterSlug: "python-generators", roadmapID: 100010, title: "Generators", description: "Understand lazy evaluation using Python generators.", difficulty: "Advanced", category: "Python", prerequisite: "Decorators", order: 2, isViewed: false },
  { chapterID: 100048, chapterSlug: "python-context-managers", roadmapID: 100010, title: "Context Managers", description: "Manage resources efficiently with context managers.", difficulty: "Advanced", category: "Python", prerequisite: "Generators", order: 3, isViewed: false },
  { chapterID: 100049, chapterSlug: "python-metaclasses", roadmapID: 100010, title: "Metaclasses", description: "Dive into Python metaclasses and dynamic class creation.", difficulty: "Advanced", category: "Python", prerequisite: "Context Managers", order: 4, isViewed: false },
  { chapterID: 100050, chapterSlug: "python-concurrency", roadmapID: 100010, title: "Concurrency", description: "Explore threading, asyncio, and multiprocessing.", difficulty: "Advanced", category: "Python", prerequisite: "Metaclasses", order: 5, isViewed: false },

  // Java Advanced Topics (100011)
  { chapterID: 100051, chapterSlug: "java-concurrency", roadmapID: 100011, title: "Concurrency in Java", description: "Learn multithreading, Executors, and thread safety.", difficulty: "Advanced", category: "Java", prerequisite: "Intermediate Java Knowledge", order: 1, isViewed: false },
  { chapterID: 100052, chapterSlug: "java-jvm-internals", roadmapID: 100011, title: "JVM Internals", description: "Understand JVM memory, class loading, and bytecode.", difficulty: "Advanced", category: "Java", prerequisite: "Concurrency in Java", order: 2, isViewed: false },
  { chapterID: 100053, chapterSlug: "java-garbage-collection", roadmapID: 100011, title: "Garbage Collection", description: "Learn GC algorithms, tuning, and memory management.", difficulty: "Advanced", category: "Java", prerequisite: "JVM Internals", order: 3, isViewed: false },
  { chapterID: 100054, chapterSlug: "java-performance", roadmapID: 100011, title: "Performance Tuning", description: "Optimize Java applications for speed and scalability.", difficulty: "Advanced", category: "Java", prerequisite: "Garbage Collection", order: 4, isViewed: false },

  // React Advanced Patterns (100012)
  { chapterID: 100055, chapterSlug: "react-hoc", roadmapID: 100012, title: "Higher-Order Components", description: "Learn HOCs to reuse component logic.", difficulty: "Advanced", category: "React", prerequisite: "React Basics", order: 1, isViewed: false },
  { chapterID: 100056, chapterSlug: "react-render-props", roadmapID: 100012, title: "Render Props", description: "Use render props for flexible component composition.", difficulty: "Advanced", category: "React", prerequisite: "Higher-Order Components", order: 2, isViewed: false },
  { chapterID: 100057, chapterSlug: "react-context-api", roadmapID: 100012, title: "Context API", description: "Manage state globally using React Context.", difficulty: "Advanced", category: "React", prerequisite: "Render Props", order: 3, isViewed: false },
  { chapterID: 100058, chapterSlug: "react-hooks-advanced", roadmapID: 100012, title: "Advanced Hooks", description: "Master useReducer, useMemo, useCallback for performance.", difficulty: "Advanced", category: "React", prerequisite: "Context API", order: 4, isViewed: false },
  { chapterID: 100059, chapterSlug: "react-performance-optimization", roadmapID: 100012, title: "Performance Optimization", description: "Improve React app performance and best practices.", difficulty: "Advanced", category: "React", prerequisite: "Advanced Hooks", order: 5, isViewed: false },

  // API Design and Development (100013)
  { chapterID: 100060, chapterSlug: "restful-api-design", roadmapID: 100013, title: "RESTful API Design", description: "Learn principles and best practices for designing RESTful APIs.", difficulty: "Intermediate", category: "API", prerequisite: "None", order: 1, isViewed: false },
  { chapterID: 100061, chapterSlug: "graphql-fundamentals", roadmapID: 100013, title: "GraphQL Fundamentals", description: "Understand GraphQL schema, queries, mutations, and subscriptions.", difficulty: "Intermediate", category: "API", prerequisite: "RESTful API Design", order: 2, isViewed: false },
  { chapterID: 100062, chapterSlug: "api-authentication", roadmapID: 100013, title: "API Authentication", description: "Implement OAuth2, JWT, and other authentication mechanisms.", difficulty: "Advanced", category: "API", prerequisite: "GraphQL Fundamentals", order: 3, isViewed: false },
  { chapterID: 100063, chapterSlug: "api-documentation", roadmapID: 100013, title: "API Documentation", description: "Generate API docs using Swagger/OpenAPI for clarity and collaboration.", difficulty: "Intermediate", category: "API", prerequisite: "API Authentication", order: 4, isViewed: false },
  { chapterID: 100064, chapterSlug: "api-performance-testing", roadmapID: 100013, title: "API Performance Testing", description: "Test APIs for scalability, latency, and reliability.", difficulty: "Advanced", category: "API", prerequisite: "API Documentation", order: 5, isViewed: false },

  // Modern Frontend Development (100014)
  { chapterID: 100065, chapterSlug: "html-css-advanced", roadmapID: 100014, title: "HTML5 & CSS3 Advanced", description: "Master advanced HTML5 features and CSS3 layouts (Flexbox, Grid).", difficulty: "Intermediate", category: "Frontend", prerequisite: "None", order: 1, isViewed: false },
  { chapterID: 100066, chapterSlug: "javascript-es6-plus", roadmapID: 100014, title: "JavaScript ES6+", description: "Learn modern JavaScript syntax, modules, and asynchronous programming.", difficulty: "Intermediate", category: "Frontend", prerequisite: "HTML5 & CSS3 Advanced", order: 2, isViewed: false },
  { chapterID: 100067, chapterSlug: "vue-svelte-frameworks", roadmapID: 100014, title: "Vue.js & Svelte", description: "Build applications using Vue.js and Svelte frameworks.", difficulty: "Advanced", category: "Frontend", prerequisite: "JavaScript ES6+", order: 3, isViewed: false },
  { chapterID: 100068, chapterSlug: "state-management", roadmapID: 100014, title: "State Management", description: "Manage application state using Vuex, Pinia, or Svelte stores.", difficulty: "Advanced", category: "Frontend", prerequisite: "Vue.js & Svelte", order: 4, isViewed: false },
  { chapterID: 100069, chapterSlug: "frontend-build-tools", roadmapID: 100014, title: "Frontend Build Tools", description: "Use Webpack, Vite, and other tools to optimize frontend projects.", difficulty: "Advanced", category: "Frontend", prerequisite: "State Management", order: 5, isViewed: false },

  // Scalable Backend Engineering (100015)
  { chapterID: 100070, chapterSlug: "backend-architecture", roadmapID: 100015, title: "Backend Architecture", description: "Understand backend architecture patterns and microservices.", difficulty: "Intermediate", category: "Backend", prerequisite: "None", order: 1, isViewed: false },
  { chapterID: 100071, chapterSlug: "databases-sql-nosql", roadmapID: 100015, title: "Databases (SQL & NoSQL)", description: "Learn relational and non-relational database design and queries.", difficulty: "Intermediate", category: "Backend", prerequisite: "Backend Architecture", order: 2, isViewed: false },
  { chapterID: 100072, chapterSlug: "backend-languages", roadmapID: 100015, title: "Backend Languages", description: "Use Node.js, Go, or Python for building scalable backends.", difficulty: "Intermediate", category: "Backend", prerequisite: "Databases (SQL & NoSQL)", order: 3, isViewed: false },
  { chapterID: 100073, chapterSlug: "caching-strategies", roadmapID: 100015, title: "Caching Strategies", description: "Implement caching to improve backend performance.", difficulty: "Advanced", category: "Backend", prerequisite: "Backend Languages", order: 4, isViewed: false },
  { chapterID: 100074, chapterSlug: "backend-security", roadmapID: 100015, title: "Backend Security", description: "Secure APIs, databases, and servers with best practices.", difficulty: "Advanced", category: "Backend", prerequisite: "Caching Strategies", order: 5, isViewed: false },

  // DevOps Fundamentals and CI/CD (100016)
  { chapterID: 100075, chapterSlug: "devops-intro", roadmapID: 100016, title: "Introduction to DevOps", description: "Understand DevOps principles, culture, and benefits.", difficulty: "Beginner", category: "DevOps", prerequisite: "None", order: 1, isViewed: false },
  { chapterID: 100076, chapterSlug: "infrastructure-as-code", roadmapID: 100016, title: "Infrastructure as Code (Terraform)", description: "Learn to automate infrastructure using Terraform.", difficulty: "Intermediate", category: "DevOps", prerequisite: "Introduction to DevOps", order: 2, isViewed: false },
  { chapterID: 100077, chapterSlug: "containerization", roadmapID: 100016, title: "Containerization with Docker & Kubernetes", description: "Use Docker and Kubernetes for container orchestration.", difficulty: "Intermediate", category: "DevOps", prerequisite: "Infrastructure as Code (Terraform)", order: 3, isViewed: false },
  { chapterID: 100078, chapterSlug: "ci-cd-pipelines", roadmapID: 100016, title: "CI/CD Pipelines", description: "Build CI/CD pipelines using Jenkins, GitLab CI, or GitHub Actions.", difficulty: "Advanced", category: "DevOps", prerequisite: "Containerization with Docker & Kubernetes", order: 4, isViewed: false },
  { chapterID: 100079, chapterSlug: "devops-monitoring", roadmapID: 100016, title: "Monitoring and Logging", description: "Implement monitoring and logging to ensure system reliability.", difficulty: "Advanced", category: "DevOps", prerequisite: "CI/CD Pipelines", order: 5, isViewed: false },

  // Machine Learning Engineering (100017)
  { chapterID: 100080, chapterSlug: "ml-intro", roadmapID: 100017, title: "Introduction to Machine Learning", description: "Learn core ML concepts, algorithms, and workflows.", difficulty: "Beginner", category: "Machine Learning", prerequisite: "None", order: 1, isViewed: false },
  { chapterID: 100081, chapterSlug: "data-preprocessing", roadmapID: 100017, title: "Data Preprocessing", description: "Clean, transform, and prepare data for ML models.", difficulty: "Intermediate", category: "Machine Learning", prerequisite: "Introduction to Machine Learning", order: 2, isViewed: false },
  { chapterID: 100082, chapterSlug: "model-development", roadmapID: 100017, title: "Model Development and Training", description: "Develop and train ML models using popular libraries.", difficulty: "Intermediate", category: "Machine Learning", prerequisite: "Data Preprocessing", order: 3, isViewed: false },
  { chapterID: 100083, chapterSlug: "mlops-deployment", roadmapID: 100017, title: "MLOps and Model Deployment", description: "Deploy ML models and manage production pipelines with MLOps.", difficulty: "Advanced", category: "Machine Learning", prerequisite: "Model Development and Training", order: 4, isViewed: false },
  { chapterID: 100084, chapterSlug: "ml-optimization", roadmapID: 100017, title: "Performance Optimization", description: "Optimize ML models for performance, scalability, and cost.", difficulty: "Advanced", category: "Machine Learning", prerequisite: "MLOps and Model Deployment", order: 5, isViewed: false },

  // Modern C++ Programming (100018)
  { chapterID: 100085, chapterSlug: "cpp-modern-intro", roadmapID: 100018, title: "Modern C++ Introduction", description: "Learn C++17/20 features and modern coding standards.", difficulty: "Beginner", category: "C++", prerequisite: "None", order: 1, isViewed: false },
  { chapterID: 100086, chapterSlug: "cpp-oop", roadmapID: 100018, title: "Object-Oriented Programming", description: "Master classes, inheritance, and polymorphism in C++.", difficulty: "Intermediate", category: "C++", prerequisite: "Modern C++ Introduction", order: 2, isViewed: false },
  { chapterID: 100087, chapterSlug: "cpp-stl", roadmapID: 100018, title: "Standard Template Library (STL)", description: "Use STL containers, algorithms, and iterators effectively.", difficulty: "Intermediate", category: "C++", prerequisite: "Object-Oriented Programming", order: 3, isViewed: false },
  { chapterID: 100088, chapterSlug: "cpp-multithreading", roadmapID: 100018, title: "Multithreading and Concurrency", description: "Implement multithreading and asynchronous programming in C++.", difficulty: "Advanced", category: "C++", prerequisite: "Standard Template Library (STL)", order: 4, isViewed: false },
  { chapterID: 100089, chapterSlug: "cpp-best-practices", roadmapID: 100018, title: "C++ Best Practices", description: "Learn high-performance coding, memory management, and low-latency design.", difficulty: "Advanced", category: "C++", prerequisite: "Multithreading and Concurrency", order: 5, isViewed: false },
];

export const linksData: LinkType[] = [
  // Java Fundamentals
  { nodeID: 100001, chapterID: 100001, title: "Java Official Docs", modifiedDate: "2025-10-01", order: 1, link: "https://docs.oracle.com/en/java/", isViewed: false },
  { nodeID: 100002, chapterID: 100001, title: "Java Beginner Tutorial", modifiedDate: "2025-10-01", order: 2, link: "https://www.w3schools.com/java/", isViewed: false },
  { nodeID: 100003, chapterID: 100001, title: "Java Setup Guide", modifiedDate: "2025-10-01", order: 3, link: "https://www.javatpoint.com/java-tutorial", isViewed: false },

  { nodeID: 100004, chapterID: 100002, title: "Java Variables Overview", modifiedDate: "2025-10-02", order: 1, link: "https://www.geeksforgeeks.org/variables-in-java/", isViewed: false },
  { nodeID: 100005, chapterID: 100002, title: "Data Types in Java", modifiedDate: "2025-10-02", order: 2, link: "https://www.javatpoint.com/java-data-types", isViewed: false },
  { nodeID: 100006, chapterID: 100002, title: "Primitive Types Explained", modifiedDate: "2025-10-02", order: 3, link: "https://www.tutorialspoint.com/java/java_basic_datatypes.htm", isViewed: false },

  { nodeID: 100007, chapterID: 100003, title: "Java if-else Tutorial", modifiedDate: "2025-10-03", order: 1, link: "https://www.geeksforgeeks.org/decision-making-java/", isViewed: false },
  { nodeID: 100008, chapterID: 100003, title: "Loops in Java", modifiedDate: "2025-10-03", order: 2, link: "https://www.w3schools.com/java/java_loop.asp", isViewed: false },
  { nodeID: 100009, chapterID: 100003, title: "Java Control Flow Guide", modifiedDate: "2025-10-03", order: 3, link: "https://www.javatpoint.com/java-if-else", isViewed: false },

  { nodeID: 100010, chapterID: 100004, title: "OOP Concepts in Java", modifiedDate: "2025-10-04", order: 1, link: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/", isViewed: false },
  { nodeID: 100011, chapterID: 100004, title: "Java Classes and Objects", modifiedDate: "2025-10-04", order: 2, link: "https://www.w3schools.com/java/java_classes.asp", isViewed: false },
  { nodeID: 100012, chapterID: 100004, title: "Inheritance in Java", modifiedDate: "2025-10-04", order: 3, link: "https://www.javatpoint.com/inheritance-in-java", isViewed: false },

  { nodeID: 100013, chapterID: 100005, title: "Java Collections Overview", modifiedDate: "2025-10-05", order: 1, link: "https://www.geeksforgeeks.org/collections-in-java-2/", isViewed: false },
  { nodeID: 100014, chapterID: 100005, title: "List, Set, Map", modifiedDate: "2025-10-05", order: 2, link: "https://www.javatpoint.com/collections-in-java", isViewed: false },
  { nodeID: 100015, chapterID: 100005, title: "Java Queue Tutorial", modifiedDate: "2025-10-05", order: 3, link: "https://www.geeksforgeeks.org/queue-interface-java/", isViewed: false },

  // Python Basic
  { nodeID: 100016, chapterID: 100006, title: "Getting Started with Python", modifiedDate: "2025-12-01", order: 1, link: "https://www.w3schools.com/python/python_intro.asp", isViewed: false },
  { nodeID: 100017, chapterID: 100006, title: "Python Installation Guide", modifiedDate: "2025-12-01", order: 2, link: "https://realpython.com/installing-python/", isViewed: false },
  { nodeID: 100018, chapterID: 100006, title: "First Python Program", modifiedDate: "2025-12-01", order: 3, link: "https://www.programiz.com/python-programming/online-compiler/", isViewed: false },

  { nodeID: 100019, chapterID: 100007, title: "Python Variables Overview", modifiedDate: "2025-12-02", order: 1, link: "https://www.w3schools.com/python/python_variables.asp", isViewed: false },
  { nodeID: 100020, chapterID: 100007, title: "Python Data Types", modifiedDate: "2025-12-02", order: 2, link: "https://realpython.com/python-data-types/", isViewed: false },
  { nodeID: 100021, chapterID: 100007, title: "Python Lists, Tuples, and Dictionaries", modifiedDate: "2025-12-02", order: 3, link: "https://www.geeksforgeeks.org/python-data-types/", isViewed: false },

  { nodeID: 100022, chapterID: 100008, title: "Python If Statements", modifiedDate: "2025-12-03", order: 1, link: "https://www.w3schools.com/python/python_conditions.asp", isViewed: false },
  { nodeID: 100023, chapterID: 100008, title: "Loops in Python", modifiedDate: "2025-12-03", order: 2, link: "https://realpython.com/python-for-loop/", isViewed: false },
  { nodeID: 100024, chapterID: 100008, title: "Error Handling in Python", modifiedDate: "2025-12-03", order: 3, link: "https://www.programiz.com/python-programming/exception-handling", isViewed: false },

  { nodeID: 100025, chapterID: 100009, title: "Defining Python Functions", modifiedDate: "2025-12-04", order: 1, link: "https://www.w3schools.com/python/python_functions.asp", isViewed: false },
  { nodeID: 100026, chapterID: 100009, title: "Python Modules Overview", modifiedDate: "2025-12-04", order: 2, link: "https://realpython.com/python-modules-packages/", isViewed: false },
  { nodeID: 100027, chapterID: 100009, title: "Using Python Packages", modifiedDate: "2025-12-04", order: 3, link: "https://docs.python.org/3/tutorial/modules.html", isViewed: false },

  { nodeID: 100028, chapterID: 100010, title: "Reading and Writing Files in Python", modifiedDate: "2025-12-05", order: 1, link: "https://www.w3schools.com/python/python_file_handling.asp", isViewed: false },
  { nodeID: 100029, chapterID: 100010, title: "Working with File Paths", modifiedDate: "2025-12-05", order: 2, link: "https://realpython.com/read-write-files-python/", isViewed: false },
  { nodeID: 100030, chapterID: 100010, title: "Using Python with Databases", modifiedDate: "2025-12-05", order: 3, link: "https://www.sqlitetutorial.net/sqlite-python/", isViewed: false },

  // JavaScript Essentials
  { nodeID: 100031, chapterID: 100011, title: "JavaScript Basics", modifiedDate: "2025-12-01", order: 1, link: "https://www.w3schools.com/js/js_intro.asp", isViewed: false },
  { nodeID: 100032, chapterID: 100011, title: "JS Variables and Operators", modifiedDate: "2025-12-01", order: 2, link: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables", isViewed: false },
  { nodeID: 100033, chapterID: 100011, title: "JavaScript Syntax Guide", modifiedDate: "2025-12-01", order: 3, link: "https://www.geeksforgeeks.org/javascript-syntax/", isViewed: false },

  { nodeID: 100034, chapterID: 100012, title: "JavaScript Functions Explained", modifiedDate: "2025-12-02", order: 1, link: "https://www.w3schools.com/js/js_functions.asp", isViewed: false },
  { nodeID: 100035, chapterID: 100012, title: "Understanding Scope in JS", modifiedDate: "2025-12-02", order: 2, link: "https://developer.mozilla.org/en-US/docs/Glossary/Scope", isViewed: false },
  { nodeID: 100036, chapterID: 100012, title: "Closures in JavaScript", modifiedDate: "2025-12-02", order: 3, link: "https://www.freecodecamp.org/news/closures-in-javascript/", isViewed: false },

  { nodeID: 100037, chapterID: 100013, title: "DOM Basics", modifiedDate: "2025-12-03", order: 1, link: "https://www.w3schools.com/js/js_htmldom.asp", isViewed: false },
  { nodeID: 100038, chapterID: 100013, title: "JavaScript DOM Methods", modifiedDate: "2025-12-03", order: 2, link: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction", isViewed: false },
  { nodeID: 100039, chapterID: 100013, title: "Manipulating HTML Elements with JS", modifiedDate: "2025-12-03", order: 3, link: "https://www.geeksforgeeks.org/dom-manipulation-in-javascript/", isViewed: false },

  { nodeID: 100040, chapterID: 100014, title: "JavaScript Event Listeners", modifiedDate: "2025-12-04", order: 1, link: "https://www.w3schools.com/js/js_events.asp", isViewed: false },
  { nodeID: 100041, chapterID: 100014, title: "Handling Events in JS", modifiedDate: "2025-12-04", order: 2, link: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events", isViewed: false },
  { nodeID: 100042, chapterID: 100014, title: "Common JS Event Types", modifiedDate: "2025-12-04", order: 3, link: "https://www.javascripttutorial.net/javascript-dom/javascript-events/", isViewed: false },

  { nodeID: 100043, chapterID: 100015, title: "Callbacks in JS", modifiedDate: "2025-12-05", order: 1, link: "https://www.w3schools.com/js/js_callback.asp", isViewed: false },
  { nodeID: 100044, chapterID: 100015, title: "Promises in JavaScript", modifiedDate: "2025-12-05", order: 2, link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises", isViewed: false },
  { nodeID: 100045, chapterID: 100015, title: "Async/Await in JS", modifiedDate: "2025-12-05", order: 3, link: "https://www.freecodecamp.org/news/javascript-async-await-tutorial/", isViewed: false },

  // React for Beginners
  { nodeID: 100046, chapterID: 100016, title: "Getting Started with React", modifiedDate: "2025-12-01", order: 1, link: "https://react.dev/learn", isViewed: false },
  { nodeID: 100047, chapterID: 100016, title: "JSX in React", modifiedDate: "2025-12-01", order: 2, link: "https://react.dev/learn/rendering-elements", isViewed: false },
  { nodeID: 100048, chapterID: 100016, title: "React Setup Guide", modifiedDate: "2025-12-01", order: 3, link: "https://reactjs.org/docs/getting-started.html", isViewed: false },

  { nodeID: 100049, chapterID: 100017, title: "React Components Basics", modifiedDate: "2025-12-02", order: 1, link: "https://react.dev/learn/components-and-props", isViewed: false },
  { nodeID: 100050, chapterID: 100017, title: "Passing Props in React", modifiedDate: "2025-12-02", order: 2, link: "https://reactjs.org/docs/components-and-props.html", isViewed: false },
  { nodeID: 100051, chapterID: 100017, title: "Reusable React Components", modifiedDate: "2025-12-02", order: 3, link: "https://www.freecodecamp.org/news/react-components-tutorial/", isViewed: false },

  { nodeID: 100052, chapterID: 100018, title: "Using useState Hook", modifiedDate: "2025-12-03", order: 1, link: "https://react.dev/learn/state-a-components-memory", isViewed: false },
  { nodeID: 100053, chapterID: 100018, title: "React State Best Practices", modifiedDate: "2025-12-03", order: 2, link: "https://www.digitalocean.com/community/tutorials/react-use-state-hook", isViewed: false },
  { nodeID: 100054, chapterID: 100018, title: "Managing State in React Components", modifiedDate: "2025-12-03", order: 3, link: "https://reactjs.org/docs/state-and-lifecycle.html", isViewed: false },

  { nodeID: 100055, chapterID: 100019, title: "Using useEffect Hook", modifiedDate: "2025-12-04", order: 1, link: "https://react.dev/reference/react/useEffect", isViewed: false },
  { nodeID: 100056, chapterID: 100019, title: "Common React Hooks", modifiedDate: "2025-12-04", order: 2, link: "https://reactjs.org/docs/hooks-intro.html", isViewed: false },
  { nodeID: 100057, chapterID: 100019, title: "Side Effects in React", modifiedDate: "2025-12-04", order: 3, link: "https://www.digitalocean.com/community/tutorials/react-useeffect-hook", isViewed: false },

  { nodeID: 100058, chapterID: 100020, title: "Fetch API in React", modifiedDate: "2025-12-05", order: 1, link: "https://react.dev/learn/fetching-data", isViewed: false },
  { nodeID: 100059, chapterID: 100020, title: "Axios in React", modifiedDate: "2025-12-05", order: 2, link: "https://www.digitalocean.com/community/tutorials/react-axios-react", isViewed: false },
  { nodeID: 100060, chapterID: 100020, title: "Handling API Responses", modifiedDate: "2025-12-05", order: 3, link: "https://www.freecodecamp.org/news/react-fetching-data/", isViewed: false },

  // Node.js Fundamentals
  { nodeID: 100061, chapterID: 100021, title: "Getting Started with Node.js", modifiedDate: "2025-12-01", order: 1, link: "https://nodejs.dev/learn", isViewed: false },
  { nodeID: 100062, chapterID: 100021, title: "Node.js Installation Guide", modifiedDate: "2025-12-01", order: 2, link: "https://www.w3schools.com/nodejs/nodejs_getstarted.asp", isViewed: false },
  { nodeID: 100063, chapterID: 100021, title: "Node.js Overview", modifiedDate: "2025-12-01", order: 3, link: "https://www.geeksforgeeks.org/introduction-to-node-js/", isViewed: false },

  { nodeID: 100064, chapterID: 100022, title: "Node.js Modules Explained", modifiedDate: "2025-12-02", order: 1, link: "https://nodejs.org/api/modules.html", isViewed: false },
  { nodeID: 100065, chapterID: 100022, title: "Using npm Packages", modifiedDate: "2025-12-02", order: 2, link: "https://www.w3schools.com/nodejs/nodejs_npm.asp", isViewed: false },
  { nodeID: 100066, chapterID: 100022, title: "Common Node.js Built-in Modules", modifiedDate: "2025-12-02", order: 3, link: "https://www.geeksforgeeks.org/node-js-modules/", isViewed: false },

  { nodeID: 100067, chapterID: 100023, title: "Building a Simple HTTP Server", modifiedDate: "2025-12-03", order: 1, link: "https://nodejs.dev/learn/your-first-nodejs-http-server", isViewed: false },
  { nodeID: 100068, chapterID: 100023, title: "Node.js Server Tutorial", modifiedDate: "2025-12-03", order: 2, link: "https://www.w3schools.com/nodejs/nodejs_http.asp", isViewed: false },
  { nodeID: 100069, chapterID: 100023, title: "Handling Requests and Responses", modifiedDate: "2025-12-03", order: 3, link: "https://www.geeksforgeeks.org/node-js-http-module/", isViewed: false },

  { nodeID: 100070, chapterID: 100024, title: "Node.js Callbacks", modifiedDate: "2025-12-04", order: 1, link: "https://www.w3schools.com/nodejs/nodejs_callback.asp", isViewed: false },
  { nodeID: 100071, chapterID: 100024, title: "Promises in Node.js", modifiedDate: "2025-12-04", order: 2, link: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises", isViewed: false },
  { nodeID: 100072, chapterID: 100024, title: "Async/Await in Node.js", modifiedDate: "2025-12-04", order: 3, link: "https://www.digitalocean.com/community/tutorials/nodejs-async-await-tutorial", isViewed: false },

  { nodeID: 100073, chapterID: 100025, title: "Getting Started with Express.js", modifiedDate: "2025-12-05", order: 1, link: "https://expressjs.com/en/starter/installing.html", isViewed: false },
  { nodeID: 100074, chapterID: 100025, title: "Building RESTful APIs with Express", modifiedDate: "2025-12-05", order: 2, link: "https://www.w3schools.com/nodejs/nodejs_express.asp", isViewed: false },
  { nodeID: 100075, chapterID: 100025, title: "Express.js Middleware and Routing", modifiedDate: "2025-12-05", order: 3, link: "https://www.geeksforgeeks.org/express-js-introduction/", isViewed: false },

  // SQL Basics 
  { nodeID: 100076, chapterID: 100026, title: "SQL Tutorial for Beginners", modifiedDate: "2025-12-01", order: 1, link: "https://www.w3schools.com/sql/sql_intro.asp", isViewed: false },
  { nodeID: 100077, chapterID: 100026, title: "Setting Up SQL Environment", modifiedDate: "2025-12-01", order: 2, link: "https://www.geeksforgeeks.org/introduction-of-sql/", isViewed: false },
  { nodeID: 100078, chapterID: 100026, title: "Basic SQL Syntax", modifiedDate: "2025-12-01", order: 3, link: "https://www.sqltutorial.org/sql-basics/", isViewed: false },

  { nodeID: 100079, chapterID: 100027, title: "SQL SELECT Statement", modifiedDate: "2025-12-02", order: 1, link: "https://www.w3schools.com/sql/sql_select.asp", isViewed: false },
  { nodeID: 100080, chapterID: 100027, title: "Filtering Data with WHERE Clause", modifiedDate: "2025-12-02", order: 2, link: "https://www.sqltutorial.org/sql-where/", isViewed: false },
  { nodeID: 100081, chapterID: 100027, title: "SQL SELECT Examples", modifiedDate: "2025-12-02", order: 3, link: "https://www.geeksforgeeks.org/sql-select-statement/", isViewed: false },

  { nodeID: 100082, chapterID: 100028, title: "SQL JOIN Types", modifiedDate: "2025-12-03", order: 1, link: "https://www.w3schools.com/sql/sql_join.asp", isViewed: false },
  { nodeID: 100083, chapterID: 100028, title: "INNER, LEFT, RIGHT, FULL Joins", modifiedDate: "2025-12-03", order: 2, link: "https://www.geeksforgeeks.org/sql-joins/", isViewed: false },
  { nodeID: 100084, chapterID: 100028, title: "Join Examples in SQL", modifiedDate: "2025-12-03", order: 3, link: "https://www.sqltutorial.org/sql-join/", isViewed: false },

  { nodeID: 100085, chapterID: 100029, title: "SQL Aggregate Functions", modifiedDate: "2025-12-04", order: 1, link: "https://www.w3schools.com/sql/sql_count_avg_sum.asp", isViewed: false },
  { nodeID: 100086, chapterID: 100029, title: "Using COUNT, SUM, AVG, MIN, MAX", modifiedDate: "2025-12-04", order: 2, link: "https://www.geeksforgeeks.org/sql-aggregate-functions/", isViewed: false },
  { nodeID: 100087, chapterID: 100029, title: "Aggregate Functions Examples", modifiedDate: "2025-12-04", order: 3, link: "https://www.sqltutorial.org/sql-aggregate-functions/", isViewed: false },

  { nodeID: 100088, chapterID: 100030, title: "SQL Indexing Basics", modifiedDate: "2025-12-05", order: 1, link: "https://www.geeksforgeeks.org/sql-index/", isViewed: false },
  { nodeID: 100089, chapterID: 100030, title: "Optimizing SQL Queries", modifiedDate: "2025-12-05", order: 2, link: "https://www.sqlshack.com/sql-query-optimization-tips/", isViewed: false },
  { nodeID: 100090, chapterID: 100030, title: "Indexing Techniques in SQL", modifiedDate: "2025-12-05", order: 3, link: "https://www.w3schools.com/sql/sql_create_index.asp", isViewed: false },

  // HTML & CSS Fundamentals
  { nodeID: 100091, chapterID: 100031, title: "HTML Basics Tutorial", modifiedDate: "2025-12-01", order: 1, link: "https://www.w3schools.com/html/html_intro.asp", isViewed: false },
  { nodeID: 100092, chapterID: 100031, title: "HTML Elements and Tags", modifiedDate: "2025-12-01", order: 2, link: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML", isViewed: false },
  { nodeID: 100093, chapterID: 100031, title: "HTML Structure Guide", modifiedDate: "2025-12-01", order: 3, link: "https://www.geeksforgeeks.org/html-tutorials/", isViewed: false },

  { nodeID: 100094, chapterID: 100032, title: "HTML Forms Tutorial", modifiedDate: "2025-12-02", order: 1, link: "https://www.w3schools.com/html/html_forms.asp", isViewed: false },
  { nodeID: 100095, chapterID: 100032, title: "Form Elements and Attributes", modifiedDate: "2025-12-02", order: 2, link: "https://developer.mozilla.org/en-US/docs/Learn/Forms", isViewed: false },
  { nodeID: 100096, chapterID: 100032, title: "Validating HTML Forms", modifiedDate: "2025-12-02", order: 3, link: "https://www.geeksforgeeks.org/html-form-validation/", isViewed: false },

  { nodeID: 100097, chapterID: 100033, title: "CSS Basics Tutorial", modifiedDate: "2025-12-03", order: 1, link: "https://www.w3schools.com/css/css_intro.asp", isViewed: false },
  { nodeID: 100098, chapterID: 100033, title: "CSS Selectors and Properties", modifiedDate: "2025-12-03", order: 2, link: "https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps", isViewed: false },
  { nodeID: 100099, chapterID: 100033, title: "Styling Web Pages with CSS", modifiedDate: "2025-12-03", order: 3, link: "https://www.geeksforgeeks.org/css-tutorials/", isViewed: false },

  { nodeID: 100100, chapterID: 100034, title: "CSS Flexbox Guide", modifiedDate: "2025-12-04", order: 1, link: "https://www.w3schools.com/css/css3_flexbox.asp", isViewed: false },
  { nodeID: 100101, chapterID: 100034, title: "CSS Grid Layout Tutorial", modifiedDate: "2025-12-04", order: 2, link: "https://www.w3schools.com/css/css_grid.asp", isViewed: false },
  { nodeID: 100102, chapterID: 100034, title: "Responsive Layouts with Flexbox and Grid", modifiedDate: "2025-12-04", order: 3, link: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox", isViewed: false },

  { nodeID: 100103, chapterID: 100035, title: "CSS Transitions Tutorial", modifiedDate: "2025-12-05", order: 1, link: "https://www.w3schools.com/css/css3_transitions.asp", isViewed: false },
  { nodeID: 100104, chapterID: 100035, title: "CSS Animations Tutorial", modifiedDate: "2025-12-05", order: 2, link: "https://www.w3schools.com/css/css3_animations.asp", isViewed: false },
  { nodeID: 100105, chapterID: 100035, title: "CSS Keyframes and Animations", modifiedDate: "2025-12-05", order: 3, link: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations", isViewed: false },

  // TypeScript Basics
  { nodeID: 100106, chapterID: 100036, title: "TypeScript Beginner Tutorial", modifiedDate: "2025-12-01", order: 1, link: "https://www.typescriptlang.org/docs/handbook/intro.html", isViewed: false },
  { nodeID: 100107, chapterID: 100036, title: "Getting Started with TypeScript", modifiedDate: "2025-12-01", order: 2, link: "https://www.w3schools.com/typescript/typescript_intro.asp", isViewed: false },
  { nodeID: 100108, chapterID: 100036, title: "TypeScript Setup Guide", modifiedDate: "2025-12-01", order: 3, link: "https://www.geeksforgeeks.org/introduction-to-typescript/", isViewed: false },

  { nodeID: 100109, chapterID: 100037, title: "TypeScript Types and Interfaces", modifiedDate: "2025-12-02", order: 1, link: "https://www.typescriptlang.org/docs/handbook/interfaces.html", isViewed: false },
  { nodeID: 100110, chapterID: 100037, title: "Using Type Annotations", modifiedDate: "2025-12-02", order: 2, link: "https://www.w3schools.com/typescript/typescript_types.asp", isViewed: false },
  { nodeID: 100111, chapterID: 100037, title: "TypeScript Interface Examples", modifiedDate: "2025-12-02", order: 3, link: "https://www.geeksforgeeks.org/typescript-interfaces/", isViewed: false },

  { nodeID: 100112, chapterID: 100038, title: "TypeScript Classes Tutorial", modifiedDate: "2025-12-03", order: 1, link: "https://www.typescriptlang.org/docs/handbook/classes.html", isViewed: false },
  { nodeID: 100113, chapterID: 100038, title: "OOP in TypeScript", modifiedDate: "2025-12-03", order: 2, link: "https://www.w3schools.com/typescript/typescript_classes.asp", isViewed: false },
  { nodeID: 100114, chapterID: 100038, title: "Inheritance in TypeScript", modifiedDate: "2025-12-03", order: 3, link: "https://www.geeksforgeeks.org/classes-and-objects-in-typescript/", isViewed: false },

  { nodeID: 100115, chapterID: 100039, title: "TypeScript Generics Tutorial", modifiedDate: "2025-12-04", order: 1, link: "https://www.typescriptlang.org/docs/handbook/generics.html", isViewed: false },
  { nodeID: 100116, chapterID: 100039, title: "Using Generics in TypeScript", modifiedDate: "2025-12-04", order: 2, link: "https://www.w3schools.com/typescript/typescript_generics.asp", isViewed: false },
  { nodeID: 100117, chapterID: 100039, title: "TypeScript Generic Examples", modifiedDate: "2025-12-04", order: 3, link: "https://www.geeksforgeeks.org/typescript-generics/", isViewed: false },

  { nodeID: 100118, chapterID: 100040, title: "Advanced TypeScript Features", modifiedDate: "2025-12-05", order: 1, link: "https://www.typescriptlang.org/docs/handbook/advanced-types.html", isViewed: false },
  { nodeID: 100119, chapterID: 100040, title: "Decorators and Type Guards", modifiedDate: "2025-12-05", order: 2, link: "https://www.geeksforgeeks.org/typescript-decorators/", isViewed: false },
  { nodeID: 100120, chapterID: 100040, title: "Advanced TypeScript Examples", modifiedDate: "2025-12-05", order: 3, link: "https://www.w3schools.com/typescript/typescript_advanced.asp", isViewed: false },

  // Angular Fundamentals
  { nodeID: 100121, chapterID: 100041, title: "Angular Beginner Guide", modifiedDate: "2025-12-01", order: 1, link: "https://angular.io/start", isViewed: false },
  { nodeID: 100122, chapterID: 100041, title: "Introduction to Angular Framework", modifiedDate: "2025-12-01", order: 2, link: "https://www.w3schools.com/angular/", isViewed: false },
  { nodeID: 100123, chapterID: 100041, title: "Angular Architecture Overview", modifiedDate: "2025-12-01", order: 3, link: "https://www.geeksforgeeks.org/angular-framework/", isViewed: false },

  { nodeID: 100124, chapterID: 100042, title: "Angular Components Tutorial", modifiedDate: "2025-12-02", order: 1, link: "https://angular.io/guide/architecture-components", isViewed: false },
  { nodeID: 100125, chapterID: 100042, title: "Templates and Data Binding", modifiedDate: "2025-12-02", order: 2, link: "https://www.w3schools.com/angular/angular_components.asp", isViewed: false },
  { nodeID: 100126, chapterID: 100042, title: "Angular Component Examples", modifiedDate: "2025-12-02", order: 3, link: "https://www.geeksforgeeks.org/components-in-angular/", isViewed: false },

  { nodeID: 100127, chapterID: 100043, title: "Angular Services Guide", modifiedDate: "2025-12-03", order: 1, link: "https://angular.io/guide/architecture-services", isViewed: false },
  { nodeID: 100128, chapterID: 100043, title: "Dependency Injection in Angular", modifiedDate: "2025-12-03", order: 2, link: "https://www.w3schools.com/angular/angular_services.asp", isViewed: false },
  { nodeID: 100129, chapterID: 100043, title: "Creating Angular Services", modifiedDate: "2025-12-03", order: 3, link: "https://www.geeksforgeeks.org/services-in-angular/", isViewed: false },

  { nodeID: 100130, chapterID: 100044, title: "Angular Routing Tutorial", modifiedDate: "2025-12-04", order: 1, link: "https://angular.io/guide/router", isViewed: false },
  { nodeID: 100131, chapterID: 100044, title: "Navigating Between Pages", modifiedDate: "2025-12-04", order: 2, link: "https://www.w3schools.com/angular/angular_routing.asp", isViewed: false },
  { nodeID: 100132, chapterID: 100044, title: "Angular Route Examples", modifiedDate: "2025-12-04", order: 3, link: "https://www.geeksforgeeks.org/angular-routing/", isViewed: false },

  { nodeID: 100133, chapterID: 100045, title: "Angular Forms Guide", modifiedDate: "2025-12-05", order: 1, link: "https://angular.io/guide/forms-overview", isViewed: false },
  { nodeID: 100134, chapterID: 100045, title: "Template-driven and Reactive Forms", modifiedDate: "2025-12-05", order: 2, link: "https://www.w3schools.com/angular/angular_forms.asp", isViewed: false },
  { nodeID: 100135, chapterID: 100045, title: "Form Validation in Angular", modifiedDate: "2025-12-05", order: 3, link: "https://www.geeksforgeeks.org/angular-forms/", isViewed: false },

  // Python Advanced Concepts (100010)
  { nodeID: 100136, chapterID: 100046, title: "Python Decorators Tutorial", modifiedDate: "2026-03-01", order: 1, link: "https://realpython.com/primer-on-python-decorators/", isViewed: false },
  { nodeID: 100137, chapterID: 100046, title: "Decorators in Python Explained", modifiedDate: "2026-03-01", order: 2, link: "https://www.geeksforgeeks.org/decorators-in-python/", isViewed: false },
  { nodeID: 100138, chapterID: 100046, title: "Python Function Decorators", modifiedDate: "2026-03-01", order: 3, link: "https://www.w3schools.com/python/python_functions_decorators.asp", isViewed: false },

  { nodeID: 100139, chapterID: 100047, title: "Python Generators Guide", modifiedDate: "2026-03-02", order: 1, link: "https://realpython.com/introduction-to-python-generators/", isViewed: false },
  { nodeID: 100140, chapterID: 100047, title: "Python Yield Explained", modifiedDate: "2026-03-02", order: 2, link: "https://www.geeksforgeeks.org/generators-in-python/", isViewed: false },
  { nodeID: 100141, chapterID: 100047, title: "Generators Best Practices", modifiedDate: "2026-03-02", order: 3, link: "https://www.programiz.com/python-programming/generator", isViewed: false },

  { nodeID: 100142, chapterID: 100048, title: "Context Managers in Python", modifiedDate: "2026-03-03", order: 1, link: "https://realpython.com/python-with-statement/", isViewed: false },
  { nodeID: 100143, chapterID: 100048, title: "Python with Statement Guide", modifiedDate: "2026-03-03", order: 2, link: "https://www.geeksforgeeks.org/context-manager-in-python/", isViewed: false },
  { nodeID: 100144, chapterID: 100048, title: "Custom Context Managers", modifiedDate: "2026-03-03", order: 3, link: "https://www.programiz.com/python-programming/context-manager", isViewed: false },

  { nodeID: 100145, chapterID: 100049, title: "Python Metaclasses Tutorial", modifiedDate: "2026-03-04", order: 1, link: "https://realpython.com/python-metaclasses/", isViewed: false },
  { nodeID: 100146, chapterID: 100049, title: "Metaclasses in Python Explained", modifiedDate: "2026-03-04", order: 2, link: "https://www.geeksforgeeks.org/python-metaclasses/", isViewed: false },
  { nodeID: 100147, chapterID: 100049, title: "Python Metaclass Examples", modifiedDate: "2026-03-04", order: 3, link: "https://www.programiz.com/python-programming/metaclasses", isViewed: false },

  { nodeID: 100148, chapterID: 100050, title: "Python Concurrency: Threading & Asyncio", modifiedDate: "2026-03-05", order: 1, link: "https://realpython.com/python-concurrency/", isViewed: false },
  { nodeID: 100149, chapterID: 100050, title: "Asyncio in Python", modifiedDate: "2026-03-05", order: 2, link: "https://www.geeksforgeeks.org/asyncio-python/", isViewed: false },
  { nodeID: 100150, chapterID: 100050, title: "Multiprocessing in Python", modifiedDate: "2026-03-05", order: 3, link: "https://www.programiz.com/python-programming/multiprocessing", isViewed: false },

  // Java Advanced Topics (100011)
  { nodeID: 100151, chapterID: 100051, title: "Java Concurrency Tutorial", modifiedDate: "2026-03-06", order: 1, link: "https://www.baeldung.com/java-concurrency", isViewed: false },
  { nodeID: 100152, chapterID: 100051, title: "Java Multithreading Guide", modifiedDate: "2026-03-06", order: 2, link: "https://www.geeksforgeeks.org/multithreading-in-java/", isViewed: false },
  { nodeID: 100153, chapterID: 100051, title: "Concurrency Best Practices", modifiedDate: "2026-03-06", order: 3, link: "https://www.javatpoint.com/multithreading-in-java", isViewed: false },

  { nodeID: 100154, chapterID: 100052, title: "Understanding JVM Internals", modifiedDate: "2026-03-07", order: 1, link: "https://www.baeldung.com/jvm-internals", isViewed: false },
  { nodeID: 100155, chapterID: 100052, title: "JVM Memory Management", modifiedDate: "2026-03-07", order: 2, link: "https://www.geeksforgeeks.org/java-jvm-internals/", isViewed: false },
  { nodeID: 100156, chapterID: 100052, title: "Java Bytecode Explained", modifiedDate: "2026-03-07", order: 3, link: "https://www.javatpoint.com/jvm-internals", isViewed: false },

  { nodeID: 100157, chapterID: 100053, title: "Java Garbage Collection Guide", modifiedDate: "2026-03-08", order: 1, link: "https://www.baeldung.com/java-garbage-collection", isViewed: false },
  { nodeID: 100158, chapterID: 100053, title: "Garbage Collector Algorithms", modifiedDate: "2026-03-08", order: 2, link: "https://www.geeksforgeeks.org/garbage-collection-in-java/", isViewed: false },
  { nodeID: 100159, chapterID: 100053, title: "Tuning Garbage Collection", modifiedDate: "2026-03-08", order: 3, link: "https://www.javatpoint.com/java-garbage-collection", isViewed: false },

  { nodeID: 100160, chapterID: 100054, title: "Java Performance Tuning", modifiedDate: "2026-03-09", order: 1, link: "https://www.baeldung.com/java-performance", isViewed: false },
  { nodeID: 100161, chapterID: 100054, title: "Optimizing Java Applications", modifiedDate: "2026-03-09", order: 2, link: "https://www.geeksforgeeks.org/java-performance-tuning/", isViewed: false },
  { nodeID: 100162, chapterID: 100054, title: "High-Performance Java Patterns", modifiedDate: "2026-03-09", order: 3, link: "https://www.javatpoint.com/java-performance-tuning", isViewed: false },

  // React Advanced Patterns (100012)
  { nodeID: 100163, chapterID: 100055, title: "Higher-Order Components in React", modifiedDate: "2026-03-10", order: 1, link: "https://reactjs.org/docs/higher-order-components.html", isViewed: false },
  { nodeID: 100164, chapterID: 100055, title: "HOC Examples", modifiedDate: "2026-03-10", order: 2, link: "https://www.freecodecamp.org/news/higher-order-components-in-react/", isViewed: false },
  { nodeID: 100165, chapterID: 100055, title: "Advanced HOC Patterns", modifiedDate: "2026-03-10", order: 3, link: "https://www.geeksforgeeks.org/higher-order-components-in-reactjs/", isViewed: false },

  { nodeID: 100166, chapterID: 100056, title: "Render Props in React", modifiedDate: "2026-03-11", order: 1, link: "https://reactjs.org/docs/render-props.html", isViewed: false },
  { nodeID: 100167, chapterID: 100056, title: "Render Props Examples", modifiedDate: "2026-03-11", order: 2, link: "https://www.freecodecamp.org/news/render-props-in-react/", isViewed: false },
  { nodeID: 100168, chapterID: 100056, title: "Advanced Render Props Patterns", modifiedDate: "2026-03-11", order: 3, link: "https://www.geeksforgeeks.org/render-props-in-reactjs/", isViewed: false },

  { nodeID: 100169, chapterID: 100057, title: "React Context API Guide", modifiedDate: "2026-03-12", order: 1, link: "https://reactjs.org/docs/context.html", isViewed: false },
  { nodeID: 100170, chapterID: 100057, title: "Using Context API in Projects", modifiedDate: "2026-03-12", order: 2, link: "https://www.freecodecamp.org/news/react-context-for-state-management/", isViewed: false },
  { nodeID: 100171, chapterID: 100057, title: "Advanced Context API Examples", modifiedDate: "2026-03-12", order: 3, link: "https://www.geeksforgeeks.org/context-api-in-reactjs/", isViewed: false },

  { nodeID: 100172, chapterID: 100058, title: "Advanced React Hooks", modifiedDate: "2026-03-13", order: 1, link: "https://reactjs.org/docs/hooks-intro.html", isViewed: false },
  { nodeID: 100173, chapterID: 100058, title: "useReducer and useCallback", modifiedDate: "2026-03-13", order: 2, link: "https://www.geeksforgeeks.org/react-hooks-usecallback-usememo-usestate/", isViewed: false },
  { nodeID: 100174, chapterID: 100058, title: "Optimizing with React Hooks", modifiedDate: "2026-03-13", order: 3, link: "https://www.freecodecamp.org/news/react-hooks-tutorial/", isViewed: false },

  { nodeID: 100175, chapterID: 100059, title: "React Performance Optimization Techniques", modifiedDate: "2026-03-14", order: 1, link: "https://reactjs.org/docs/optimizing-performance.html", isViewed: false },
  { nodeID: 100176, chapterID: 100059, title: "Improving React App Speed", modifiedDate: "2026-03-14", order: 2, link: "https://www.freecodecamp.org/news/react-performance-optimization/", isViewed: false },
  { nodeID: 100177, chapterID: 100059, title: "Advanced React Patterns for Performance", modifiedDate: "2026-03-14", order: 3, link: "https://www.geeksforgeeks.org/react-performance-optimization/", isViewed: false },

  // API Design and Development (100013)
  { nodeID: 100178, chapterID: 100060, title: "RESTful API Design Guide", modifiedDate: "2026-03-01", order: 1, link: "https://restfulapi.net/", isViewed: false },
  { nodeID: 100179, chapterID: 100060, title: "REST API Best Practices", modifiedDate: "2026-03-01", order: 2, link: "https://www.geeksforgeeks.org/rest-api/", isViewed: false },
  { nodeID: 100180, chapterID: 100060, title: "Designing RESTful APIs", modifiedDate: "2026-03-01", order: 3, link: "https://www.freecodecamp.org/news/rest-api-tutorial-rest-client/", isViewed: false },

  { nodeID: 100181, chapterID: 100061, title: "GraphQL Basics", modifiedDate: "2026-03-02", order: 1, link: "https://graphql.org/learn/", isViewed: false },
  { nodeID: 100182, chapterID: 100061, title: "GraphQL Queries and Mutations", modifiedDate: "2026-03-02", order: 2, link: "https://www.howtographql.com/", isViewed: false },
  { nodeID: 100183, chapterID: 100061, title: "GraphQL Best Practices", modifiedDate: "2026-03-02", order: 3, link: "https://www.apollographql.com/docs/", isViewed: false },

  { nodeID: 100184, chapterID: 100062, title: "OAuth2 Tutorial", modifiedDate: "2026-03-03", order: 1, link: "https://www.digitalocean.com/community/tutorial_series/oauth-2-0", isViewed: false },
  { nodeID: 100185, chapterID: 100062, title: "JWT Authentication Guide", modifiedDate: "2026-03-03", order: 2, link: "https://jwt.io/introduction/", isViewed: false },
  { nodeID: 100186, chapterID: 100062, title: "API Security Best Practices", modifiedDate: "2026-03-03", order: 3, link: "https://www.freecodecamp.org/news/oauth-jwt-api-security/", isViewed: false },

  { nodeID: 100187, chapterID: 100063, title: "Swagger/OpenAPI Tutorial", modifiedDate: "2026-03-04", order: 1, link: "https://swagger.io/resources/articles/getting-started-with-swagger/", isViewed: false },
  { nodeID: 100188, chapterID: 100063, title: "OpenAPI Best Practices", modifiedDate: "2026-03-04", order: 2, link: "https://www.baeldung.com/openapi-swagger-rest", isViewed: false },
  { nodeID: 100189, chapterID: 100063, title: "Documenting APIs with Swagger", modifiedDate: "2026-03-04", order: 3, link: "https://www.geeksforgeeks.org/swagger-tutorial/", isViewed: false },

  { nodeID: 100190, chapterID: 100064, title: "API Load Testing", modifiedDate: "2026-03-05", order: 1, link: "https://www.guru99.com/performance-testing.html", isViewed: false },
  { nodeID: 100191, chapterID: 100064, title: "API Performance Tools", modifiedDate: "2026-03-05", order: 2, link: "https://www.softwaretestinghelp.com/performance-testing-tools/", isViewed: false },
  { nodeID: 100192, chapterID: 100064, title: "Stress Testing APIs", modifiedDate: "2026-03-05", order: 3, link: "https://www.javatpoint.com/api-performance-testing", isViewed: false },

  // Modern Frontend Development (100014)
  { nodeID: 100193, chapterID: 100065, title: "HTML5 & CSS3 Advanced Guide", modifiedDate: "2026-04-10", order: 1, link: "https://www.w3schools.com/html/", isViewed: false },
  { nodeID: 100194, chapterID: 100065, title: "CSS Flexbox & Grid Tutorial", modifiedDate: "2026-04-10", order: 2, link: "https://css-tricks.com/snippets/css/complete-guide-grid/", isViewed: false },
  { nodeID: 100195, chapterID: 100065, title: "Responsive Web Design", modifiedDate: "2026-04-10", order: 3, link: "https://www.freecodecamp.org/news/responsive-web-design-tutorial/", isViewed: false },

  { nodeID: 100196, chapterID: 100066, title: "Modern JavaScript ES6+ Guide", modifiedDate: "2026-04-11", order: 1, link: "https://www.freecodecamp.org/news/es6-guide/", isViewed: false },
  { nodeID: 100197, chapterID: 100066, title: "ES6 Features Explained", modifiedDate: "2026-04-11", order: 2, link: "https://www.geeksforgeeks.org/es6-in-javascript/", isViewed: false },
  { nodeID: 100198, chapterID: 100066, title: "Async JS with Promises & Async/Await", modifiedDate: "2026-04-11", order: 3, link: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous", isViewed: false },

  { nodeID: 100199, chapterID: 100067, title: "Vue.js Fundamentals", modifiedDate: "2026-04-12", order: 1, link: "https://vuejs.org/guide/introduction.html", isViewed: false },
  { nodeID: 100200, chapterID: 100067, title: "Svelte Basics", modifiedDate: "2026-04-12", order: 2, link: "https://svelte.dev/tutorial", isViewed: false },
  { nodeID: 100201, chapterID: 100067, title: "Vue & Svelte Projects", modifiedDate: "2026-04-12", order: 3, link: "https://www.freecodecamp.org/news/vue-vs-svelte-tutorial/", isViewed: false },

  { nodeID: 100202, chapterID: 100068, title: "State Management in Vue & Svelte", modifiedDate: "2026-04-13", order: 1, link: "https://vuex.vuejs.org/", isViewed: false },
  { nodeID: 100203, chapterID: 100068, title: "Pinia State Management", modifiedDate: "2026-04-13", order: 2, link: "https://pinia.vuejs.org/", isViewed: false },
  { nodeID: 100204, chapterID: 100068, title: "Svelte Stores Guide", modifiedDate: "2026-04-13", order: 3, link: "https://svelte.dev/tutorial/writable-stores", isViewed: false },

  { nodeID: 100205, chapterID: 100069, title: "Webpack Basics", modifiedDate: "2026-04-14", order: 1, link: "https://webpack.js.org/concepts/", isViewed: false },
  { nodeID: 100206, chapterID: 100069, title: "Vite Setup Guide", modifiedDate: "2026-04-14", order: 2, link: "https://vitejs.dev/guide/", isViewed: false },
  { nodeID: 100207, chapterID: 100069, title: "Build Tools Comparison", modifiedDate: "2026-04-14", order: 3, link: "https://www.freecodecamp.org/news/webpack-vs-vite/", isViewed: false },

  // Scalable Backend Engineering (100015)
  { nodeID: 100208, chapterID: 100070, title: "Backend Architecture Patterns", modifiedDate: "2026-05-20", order: 1, link: "https://microservices.io/", isViewed: false },
  { nodeID: 100209, chapterID: 100070, title: "Monolith vs Microservices", modifiedDate: "2026-05-20", order: 2, link: "https://www.geeksforgeeks.org/microservices-architecture/", isViewed: false },
  { nodeID: 100210, chapterID: 100070, title: "Backend Design Principles", modifiedDate: "2026-05-20", order: 3, link: "https://www.freecodecamp.org/news/backend-architecture-guide/", isViewed: false },

  { nodeID: 100211, chapterID: 100071, title: "SQL Database Tutorial", modifiedDate: "2026-05-21", order: 1, link: "https://www.w3schools.com/sql/", isViewed: false },
  { nodeID: 100212, chapterID: 100071, title: "NoSQL Database Guide", modifiedDate: "2026-05-21", order: 2, link: "https://www.geeksforgeeks.org/introduction-to-nosql/", isViewed: false },
  { nodeID: 100213, chapterID: 100071, title: "Choosing SQL vs NoSQL", modifiedDate: "2026-05-21", order: 3, link: "https://www.freecodecamp.org/news/sql-vs-nosql/", isViewed: false },

  { nodeID: 100214, chapterID: 100072, title: "Node.js Backend Guide", modifiedDate: "2026-05-22", order: 1, link: "https://nodejs.dev/learn", isViewed: false },
  { nodeID: 100215, chapterID: 100072, title: "Go Backend Guide", modifiedDate: "2026-05-22", order: 2, link: "https://golang.org/doc/tutorial/getting-started", isViewed: false },
  { nodeID: 100216, chapterID: 100072, title: "Python Django & Flask", modifiedDate: "2026-05-22", order: 3, link: "https://www.djangoproject.com/start/", isViewed: false },

  { nodeID: 100217, chapterID: 100073, title: "Caching Strategies for Backends", modifiedDate: "2026-05-23", order: 1, link: "https://www.geeksforgeeks.org/caching-strategies/", isViewed: false },
  { nodeID: 100218, chapterID: 100073, title: "Redis Caching Guide", modifiedDate: "2026-05-23", order: 2, link: "https://redis.io/docs/getting-started/", isViewed: false },
  { nodeID: 100219, chapterID: 100073, title: "Backend Performance Optimization", modifiedDate: "2026-05-23", order: 3, link: "https://www.freecodecamp.org/news/backend-performance-optimization/", isViewed: false },

  { nodeID: 100220, chapterID: 100074, title: "API Security Best Practices", modifiedDate: "2026-05-24", order: 1, link: "https://owasp.org/www-project-api-security/", isViewed: false },
  { nodeID: 100221, chapterID: 100074, title: "Server Security Guide", modifiedDate: "2026-05-24", order: 2, link: "https://www.geeksforgeeks.org/server-security/", isViewed: false },
  { nodeID: 100222, chapterID: 100074, title: "Backend Security Checklist", modifiedDate: "2026-05-24", order: 3, link:"https://codeinterview.io/blog/the-ultimate-back-end-developer-checklist-ensuring-a-smooth-development-process/", isViewed: false },

  // DevOps Fundamentals and CI/CD (100016)
  { nodeID: 100223, chapterID: 100075, title: "DevOps Guide for Beginners", modifiedDate: "2026-06-05", order: 1, link: "https://www.atlassian.com/devops", isViewed: false },
  { nodeID: 100224, chapterID: 100075, title: "DevOps Principles", modifiedDate: "2026-06-05", order: 2, link: "https://aws.amazon.com/devops/what-is-devops/", isViewed: false },
  { nodeID: 100225, chapterID: 100075, title: "Understanding DevOps Culture", modifiedDate: "2026-06-05", order: 3, link: "https://www.redhat.com/en/topics/devops/what-is-devops", isViewed: false },

  { nodeID: 100226, chapterID: 100076, title: "Terraform Basics", modifiedDate: "2026-06-06", order: 1, link: "https://developer.hashicorp.com/terraform/tutorials", isViewed: false },
  { nodeID: 100227, chapterID: 100076, title: "Infrastructure as Code Guide", modifiedDate: "2026-06-06", order: 2, link: "https://www.digitalocean.com/community/tutorials/terraform-get-started", isViewed: false },
  { nodeID: 100228, chapterID: 100076, title: "Terraform Best Practices", modifiedDate: "2026-06-06", order: 3, link: "https://learn.hashicorp.com/terraform", isViewed: false },

  { nodeID: 100229, chapterID: 100077, title: "Docker Getting Started", modifiedDate: "2026-06-07", order: 1, link: "https://docs.docker.com/get-started/", isViewed: false },
  { nodeID: 100230, chapterID: 100077, title: "Kubernetes Basics", modifiedDate: "2026-06-07", order: 2, link: "https://kubernetes.io/docs/tutorials/kubernetes-basics/", isViewed: false },
  { nodeID: 100231, chapterID: 100077, title: "Containerization Guide", modifiedDate: "2026-06-07", order: 3, link: "https://www.freecodecamp.org/news/docker-and-kubernetes-for-beginners/", isViewed: false },

  { nodeID: 100232, chapterID: 100078, title: "CI/CD Pipeline Concepts", modifiedDate: "2026-06-08", order: 1, link: "https://www.jenkins.io/doc/book/pipeline/", isViewed: false },
  { nodeID: 100233, chapterID: 100078, title: "GitLab CI/CD Tutorial", modifiedDate: "2026-06-08", order: 2, link: "https://docs.gitlab.com/ee/ci/", isViewed: false },
  { nodeID: 100234, chapterID: 100078, title: "GitHub Actions Guide", modifiedDate: "2026-06-08", order: 3, link: "https://docs.github.com/en/actions", isViewed: false },

  { nodeID: 100235, chapterID: 100079, title: "Monitoring & Logging Overview", modifiedDate: "2026-06-09", order: 1, link: "https://prometheus.io/docs/introduction/overview/", isViewed: false },
  { nodeID: 100236, chapterID: 100079, title: "ELK Stack Tutorial", modifiedDate: "2026-06-09", order: 2, link: "https://www.elastic.co/what-is/elk-stack", isViewed: false },
  { nodeID: 100237, chapterID: 100079, title: "Observability Best Practices", modifiedDate: "2026-06-09", order: 3, link: "https://www.redhat.com/en/topics/observability", isViewed: false },

  // Machine Learning Engineering (100017)
  { nodeID: 100238, chapterID: 100080, title: "Introduction to ML Concepts", modifiedDate: "2026-07-12", order: 1, link: "https://www.coursera.org/learn/machine-learning", isViewed: false },
  { nodeID: 100239, chapterID: 100080, title: "ML Algorithms Overview", modifiedDate: "2026-07-12", order: 2, link: "https://scikit-learn.org/stable/supervised_learning.html", isViewed: false },
  { nodeID: 100240, chapterID: 100080, title: "Machine Learning Workflows", modifiedDate: "2026-07-12", order: 3, link: "https://ml-cheatsheet.readthedocs.io/en/latest/", isViewed: false },

  { nodeID: 100241, chapterID: 100081, title: "Data Cleaning Techniques", modifiedDate: "2026-07-13", order: 1, link: "https://towardsdatascience.com/data-cleaning-techniques-9e1aa4c5ef3c", isViewed: false },
  { nodeID: 100242, chapterID: 100081, title: "Feature Engineering Guide", modifiedDate: "2026-07-13", order: 2, link: "https://www.kaggle.com/learn/feature-engineering", isViewed: false },
  { nodeID: 100243, chapterID: 100081, title: "Data Preprocessing in ML", modifiedDate: "2026-07-13", order: 3, link: "https://scikit-learn.org/stable/modules/preprocessing.html", isViewed: false },

  { nodeID: 100244, chapterID: 100082, title: "Model Training Tutorial", modifiedDate: "2026-07-14", order: 1, link: "https://www.tensorflow.org/tutorials/keras/classification", isViewed: false },
  { nodeID: 100245, chapterID: 100082, title: "Building ML Models", modifiedDate: "2026-07-14", order: 2, link: "https://scikit-learn.org/stable/supervised_learning.html", isViewed: false },
  { nodeID: 100246, chapterID: 100082, title: "ML Model Evaluation", modifiedDate: "2026-07-14", order: 3, link: "https://www.analyticsvidhya.com/blog/2021/04/how-to-evaluate-machine-learning-models/", isViewed: false },

  { nodeID: 100247, chapterID: 100083, title: "MLOps Introduction", modifiedDate: "2026-07-15", order: 1, link: "https://ml-ops.org/", isViewed: false },
  { nodeID: 100248, chapterID: 100083, title: "Deploying Models in Production", modifiedDate: "2026-07-15", order: 2, link: "https://aws.amazon.com/sagemaker/", isViewed: false },
  { nodeID: 100249, chapterID: 100083, title: "MLOps Tools & Platforms", modifiedDate: "2026-07-15", order: 3, link: "https://www.kubeflow.org/", isViewed: false },

  { nodeID: 100250, chapterID: 100084, title: "Model Optimization Techniques", modifiedDate: "2026-07-16", order: 1, link: "https://towardsdatascience.com/10-tips-for-optimizing-your-machine-learning-model-96c7f0f8f6f7", isViewed: false },
  { nodeID: 100251, chapterID: 100084, title: "Hyperparameter Tuning Guide", modifiedDate: "2026-07-16", order: 2, link: "https://scikit-learn.org/stable/modules/grid_search.html", isViewed: false },
  { nodeID: 100252, chapterID: 100084, title: "ML Model Deployment Best Practices", modifiedDate: "2026-07-16", order: 3, link: "https://www.analyticsvidhya.com/blog/2021/06/deploy-machine-learning-model/", isViewed: false },

  // Modern C++ Programming (100018)
  { nodeID: 100253, chapterID: 100085, title: "Modern C++ Features", modifiedDate: "2026-08-25", order: 1, link: "https://www.learncpp.com/cpp-tutorial/cpp11-and-cpp14-overview/", isViewed: false },
  { nodeID: 100254, chapterID: 100085, title: "C++17/20 Overview", modifiedDate: "2026-08-25", order: 2, link: "https://en.cppreference.com/w/cpp/17", isViewed: false },
  { nodeID: 100255, chapterID: 100085, title: "C++ Modern Practices", modifiedDate: "2026-08-25", order: 3, link: "https://isocpp.org/get-started", isViewed: false },

]