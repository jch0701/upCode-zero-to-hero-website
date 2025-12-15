import defaultImageSrc from "../assets/image/placeholder_image.jpg";
import javaImage from "../assets/image/java_intro.jpg";
import pythonImage from "../assets/image/python_intro.jpg"
import javaScriptImage from "../assets/image/javascript_intro.jpg"
import cImage from "../assets/image/c++_intro.jpg"
import machinelearningImage from "../assets/image/machine_learning_intro.jpg"
import devopsImage from "../assets/image/devop_intro.jpg"
import frontendImage from "../assets/image/frontend_intro.jpg"
import backendImage from "../assets/image/backend_intro.jpg"
import reactImage from "../assets/image/react_intro.jpg"
import apiImage from "../assets/image/api_intro.jpg"
import angularImage from "../assets/image/angular_intro.jpg"
import typeScriptImage from "../assets/image/typescript_intro.png"
import htmlcssImage from "../assets/image/html_css_intro.jpg"
import sqlImage from "../assets/image/sql_intro.png"
import bin from "../assets/image/bin.png"

const IMAGE_KEYWORD_MAP: { [key: string]: string } = {
    // IMPORTANT: Replace these with the actual public/absolute URLs for your images
    "javascript": javaScriptImage,
    "c++": cImage,
    "java": javaImage, 
    "python": pythonImage,
    "machine learning": machinelearningImage,
    "devops": devopsImage,
    "frontend": frontendImage,
    "backend": backendImage,
    "react": reactImage,
    "api": apiImage,
    "angular" : angularImage,
    "sql" : sqlImage,
    "typescript": typeScriptImage,
    "css": htmlcssImage,
    "html": htmlcssImage
};

export {
    defaultImageSrc,
    javaImage,
    pythonImage,
    javaScriptImage,
    cImage,
    machinelearningImage,
    devopsImage,
    frontendImage,
    backendImage,
    reactImage,
    apiImage,
    angularImage,
    typeScriptImage,
    htmlcssImage,
    sqlImage,
    bin,
    IMAGE_KEYWORD_MAP
};