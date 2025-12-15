import type { SelectorOption } from "@/component/formBox";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Category = "Web Development" | "Mobile Apps" | "Machine Learning" | "Game Development" | "Data Science";
export const categoryList: Category[] = ["Web Development", "Mobile Apps", "Machine Learning", "Game Development", "Data Science"];

export type Dashboard = "Profile" | "Activity" | "Skill" | "Setting";
export const dashboardList: Dashboard[] = ["Profile", "Skill", "Activity", "Setting"];


export const difficultyOptions: SelectorOption[] = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
]

export const roadmapCategoryOptions: SelectorOption[] = [
    { value: 'Java', label: 'Java' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'Python' , label: 'Python'},
    { value: 'C++', label: 'C++' },
    { value: 'R', label: 'R'},
    { value: 'Machine Learning', label: 'Machine Learning'},
    { value: 'Csharp', label: 'C# / .NET' },
    { value: 'GoLang', label: 'Go (Golang)' },
    { value: 'Rust', label: 'Rust' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Database SQL', label: 'Databases (SQL/NoSQL)' },
    { value: 'Data Structures', label: 'Data Structures & Algorithms (DSA)' },
    { value: 'React', label: 'React.js' },
    { value: 'Angular', label: 'Angular' },
    { value: 'VueJS', label: 'Vue.js' },
    { value: 'HTML/CSS', label: 'HTML & CSS' },
    { value: 'Frontend', label: 'Front-End' },
    { value: 'Backend', label: 'Back-End' },
    { value: 'NodeJS', label: 'Node.js' },
    { value: 'PHP', label: 'PHP' },
    { value: 'API', label: 'Application Programming Interface' },
    { value: 'DevOps', label: 'DevOps & Cloud Engineering' },
    { value: 'Docker_K8s', label: 'Docker & Kubernetes' },
    { value: 'Cloud AWS', label: 'Cloud Development (AWS)' },
    { value: 'Cloud Azure', label: 'Cloud Development (Azure)' },
    { value: 'Machine Learning', label: 'Machine Learning' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'Big Data', label: 'Big Data Engineering' },
    { value: 'Deep Learning', label: 'Deep Learning' },
    { value: 'NLP', label: 'Natural Language Processing (NLP)' },
    { value: 'Android Native', label: 'Android (Kotlin/Java)' },
    { value: 'iOS Native', label: 'iOS (Swift/Objective-C)' },
    { value: 'React Native', label: 'React Native' },
    { value: 'Flutter', label: 'Flutter / Dart' },
];

