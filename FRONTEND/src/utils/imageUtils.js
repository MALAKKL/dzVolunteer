import { API_BASE_URL } from "./api";

/**
 * Utility to process image URLs.
 * Handles Cloudinary URLs by adding auto-optimization parameters.
 * Handles local paths by prepending API_BASE_URL.
 * 
 * @param {string} path - The image path or URL
 * @param {string} fallback - Fallback image if path is missing
 * @returns {string} - The processed image URL
 */
export const getImageUrl = (path, fallback = "/placeholder.jpg") => {
    if (!path) return fallback;

    // If it's already a full URL
    if (path.startsWith("http")) {
        // If it's a Cloudinary URL, add auto-optimization
        if (path.includes("cloudinary.com")) {
            // Only add if not already present
            if (!path.includes("/f_auto,q_auto/")) {
                // Replace /upload/ with /upload/f_auto,q_auto/
                // Cloudinary URLs: https://res.cloudinary.com/[cloud]/image/upload/[transformations]/v[version]/[id].[ext]
                return path.replace("/upload/", "/upload/f_auto,q_auto/");
            }
        }
        return path;
    }

    // If it's a relative path from the backend
    // Ensure we don't have double slashes if API_BASE_URL ends with /
    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    return `${baseUrl}${normalizedPath}`;
};
