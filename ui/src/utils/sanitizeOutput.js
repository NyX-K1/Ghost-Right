/**
 * CLEAN AI OUTPUT FOR LINKEDIN
 * Aggressively strips Markdown and formatting artifacts.
 * Handles JSON strings by parsing them first.
 * 
 * @param {string} rawText - The raw string from the AI/N8N.
 * @returns {string} - Clean, plain text ready for LinkedIn.
 */
export const sanitizeOutput = (rawText) => {
    if (!rawText) return "";

    let clean = rawText;

    // 0. Attempt to Parse JSON if it looks like JSON
    if (typeof clean === 'string' && clean.trim().startsWith('{')) {
        try {
            const parsed = JSON.parse(clean);
            // Try to find the text content
            clean = parsed.text || parsed.postContent || parsed.post || parsed.content || JSON.stringify(parsed);
        } catch (e) {
            // If parse fails, just use the raw string and continue cleaning
        }
    }

    // Ensure it's a string before regex operations
    if (typeof clean !== 'string') {
        clean = String(clean);
    }

    // 1. Strip Markdown Bolding (**text**)
    clean = clean.replace(/\*\*/g, '');

    // 2. Strip Markdown Italics (_text_ or *text*)
    clean = clean.replace(/(\*|_)(.*?)\1/g, '$2');

    // 3. Fix Escaped Newlines & Accidental Newlines
    clean = clean.replace(/\\n/g, '\n');

    // 4. Fix Escaped Quotes
    clean = clean.replace(/\\"/g, '"');

    // 5. Remove surrounding quotes if present (common in JSON strings)
    if (clean.startsWith('"') && clean.endsWith('"')) {
        clean = clean.slice(1, -1);
    }

    // 6. Trim whitespace
    clean = clean.trim();

    return clean;
};
