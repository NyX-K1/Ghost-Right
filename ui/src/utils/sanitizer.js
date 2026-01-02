/**
 * Sanitizes raw AI output to be clean, plain text for LinkedIn.
 * Removes Markdown bolding, italics, and code blocks.
 * Fixes escaped newlines.
 * 
 * @param {string} content - The raw string content from the API.
 * @returns {string} - The cleaned text.
 */
export const sanitizePostContent = (content) => {
    if (!content) return '';

    return content
        .replace(/\*\*/g, '')          // Remove bolding (**)
        .replace(/__?|\*([^*]+)\*/g, '$1') // Remove italics (_ or *) - simple naive approach, mostly for *text*
        .replace(/\\n/g, '\n')         // Fix literal escaped newlines
        .replace(/^```[a-z]*\n?/gm, '')  // Remove opening code block tags (e.g. ```json)
        .replace(/```/g, '')           // Remove any remaining backticks
        .trim();                       // Trim whitespace
};
