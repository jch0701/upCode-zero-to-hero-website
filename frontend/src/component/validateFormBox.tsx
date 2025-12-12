export const validateTitle = (title: string): string[] => {
    const errors: string[] = [];
    if (!title.trim()) {
        errors.push("- Title is required.");
    }
    return errors;
};

export const validateDescription = (title: string): string[] => {
    const errors: string[] = [];
    if (!title.trim()) {
        errors.push("- Description is required.");
    }
    return errors;
};


export const validateOrder = (order: number): string[] => {
    const errors: string[] = [];
    if (!Number.isInteger(order)) {
        errors.push("- Order must be an integer.");
    }
    else if (!order) {
        errors.push("- Order is required.");
    } 
    else if (order <= 0) {
        errors.push("- Order must be greater than 0.");
    } 
    return errors;
}

export const validateDifficulty = (difficulty: string): string[] => {
    difficulty = difficulty.toLowerCase()
    const errors: string[] = [];
    if (!difficulty){
        errors.push("- Difficulty is required.");
    }
    else if (difficulty !== "beginner" && difficulty !== "intermediate" && difficulty !== "advanced"){
        errors.push("- Difficulty can only key in Beginner / Intermediate / Advanced.");
    }
    return errors
}

export const validateCategory = (category: string): string[] => {
    const errors: string[] = [];
    if (!category){
        errors.push("- Category is required.");
    }
    return errors
}

export const validatePrerequisite = (prerequisite: string): string[] => {
    const errors: string[] = [];
    if (!prerequisite){
        errors.push("- Prerequisite is required.");
    }
    return errors
}

export const validateLink = (link: string): string[] => {
    const errors: string[] = [];
    if (!link.trim()){
        errors.push("- Link is required.");
    }
    else {
        const urlPattern = /^(https?:\/\/)[\w.-]+(\.[\w.-]+)+.*$/;

        if (!urlPattern.test(link)) {
            errors.push("- Link must be a valid URL starting with http:// or https://.");
        }
    }
    return errors
}