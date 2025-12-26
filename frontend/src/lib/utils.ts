import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Load from local storage
export function loadUserInfo() {
  try {
    const raw = localStorage.getItem("activeUser");
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ellipsifyText(text: string, maxLength=50): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function capitalizeFirstLetter(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word characters with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
}

export function getActiveUserField(field: string): any {
  const data = localStorage.getItem("activeUser");
  if (!data) return null;
  try {
    const user = JSON.parse(data);
    return user ? user[field] : null;
  } 
  catch (error) {
    console.error("Error parsing user from localStorage", error);
    return null;
  }
}

// export function uint8ToBase64(bytes: Uint8Array): string {
//   let binary = "";
//   const chunkSize = 0x8000;

//   for (let i = 0; i < bytes.length; i += chunkSize) {
//     binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
//   }

//   return btoa(binary);
// }


// export async function convertFileToUInt8(file: File): Promise<Uint8Array> {
//   const arrayBuffer = await file.arrayBuffer();
//   return new Uint8Array(arrayBuffer);
// }

// export function base64ToMarkdown(base64: string): string {
//   const clean = base64.includes(",")
//     ? base64.split(",").pop()!
//     : base64;

//   const binary = atob(clean);
//   const bytes = new Uint8Array(binary.length);

//   for (let i = 0; i < binary.length; i++) {
//     bytes[i] = binary.charCodeAt(i);
//   }

//   return new TextDecoder("utf-8").decode(bytes);
// }

