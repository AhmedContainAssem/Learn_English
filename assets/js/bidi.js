/**
 * Universal BiDi & Mixed Language Typography Formatter (bidi.js)
 * Automatically isolates mixed Arabic/English expressions, punctuation, quotes, and brackets.
 * Prevents parenthesis flipping, trailing question mark displacement, and word order corruption.
 */

(function (window) {
    'use strict';

    /**
     * Checks if a string contains Arabic characters.
     */
    function hasArabic(text) {
        if (typeof text !== 'string') return false;
        return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
    }

    /**
     * Checks if a string contains English (Latin) characters.
     */
    function hasLatin(text) {
        if (typeof text !== 'string') return false;
        return /[a-zA-Z]/.test(text);
    }

    /**
     * Formats mixed Arabic/English text by wrapping embedded English segments
     * in <bdi dir="ltr" class="en-term"> or Arabic segments in <bdi dir="rtl">.
     * Also fixes quotes, parenthesis, and question marks across boundaries.
     * 
     * @param {string} text - Raw plain or HTML text
     * @returns {string} Safe HTML with BiDi isolation tags
     */
    function formatBiDiText(text) {
        if (!text || typeof text !== 'string') return text || '';

        // If the text is purely one language without mixed scripts, return standard safe text
        const hasAr = hasArabic(text);
        const hasEn = hasLatin(text);

        if (!hasAr && hasEn) {
            // Pure English text in an RTL container -> isolate as LTR block
            return `<bdi dir="ltr" class="en-term">${text}</bdi>`;
        }

        if (!hasEn) {
            // Pure Arabic text -> return as is
            return text;
        }

        // Protect existing HTML tags first using tokens
        const tags = [];
        let clean = text.replace(/<[^>]+>/g, (tag) => {
            const id = '___HTML_TAG_' + tags.length + '___';
            tags.push({ id, tag });
            return id;
        });

        const replacements = [];
        function wrapLtr(match) {
            const token = '___BIDI_LTR_' + replacements.length + '___';
            replacements.push({ token, html: '<bdi dir="ltr" class="en-term">' + match + '</bdi>' });
            return token;
        }
        function wrapRtl(match) {
            const token = '___BIDI_RTL_' + replacements.length + '___';
            replacements.push({ token, html: '<bdi dir="rtl" class="ar-term">' + match + '</bdi>' });
            return token;
        }

        // 1. Prefixes with colons: e.g. Pronunciation:, Vocabulary:, Part 1:, Note:
        clean = clean.replace(/\b([a-zA-Z0-9\s\-]+:)/g, wrapLtr);

        // 2. Parentheses with English / phonetics / IPA symbols
        clean = clean.replace(/(\([^\(\)]*[a-zA-Z\u0250-\u02AF][^\(\)]*\))/g, wrapLtr);

        // 3. Quoted English phrases
        clean = clean.replace(/(['"‘“][a-zA-Z0-9\s\/\-\.\,\:\;\!\?]+['"’”])/g, wrapLtr);

        // 4. Quoted Arabic words
        clean = clean.replace(/(['"‘“][\u0600-\u06FF\s]+['"’”])/g, wrapRtl);

        // 5. Standalone English words or phrases
        clean = clean.replace(/\b([a-zA-Z][a-zA-Z0-9\s\-']*[a-zA-Z0-9]|[a-zA-Z])\b/g, (match) => {
            if (match.startsWith('___')) return match; // skip our tokens
            return wrapLtr(match);
        });

        // Restore bidi tokens
        replacements.forEach(r => {
            clean = clean.replace(r.token, r.html);
        });

        // Restore original HTML tags
        tags.forEach(t => {
            clean = clean.replace(t.id, t.tag);
        });

        return clean;
    }

    /**
     * Scans DOM elements with mixed language content and applies BiDi formatting automatically.
     */
    function autoFormatDOM(rootElement = document.body) {
        if (!rootElement) return;

        const targetSelectors = [
            '.q-main-text',
            '.question-text',
            '.lesson-title',
            '.lesson-sub',
            '.lesson-desc',
            '.card-content',
            '.flashcard-front',
            '.flashcard-back',
            '.dialogue-text',
            '.quiz-option-text',
            'td',
            'th'
        ];

        const elements = rootElement.querySelectorAll(targetSelectors.join(','));
        elements.forEach(el => {
            // Only process elements that haven't been formatted yet and contain both scripts
            if (el.dataset.bidiProcessed) return;

            const originalText = el.textContent || '';
            if (hasArabic(originalText) && hasLatin(originalText)) {
                // If it contains direct text nodes, apply formatting
                const hasChildElements = el.children.length > 0;
                if (!hasChildElements) {
                    el.innerHTML = formatBiDiText(originalText);
                    el.dataset.bidiProcessed = 'true';
                }
            }
        });
    }

    // Export globally for universal accessibility & inheritance across all templates
    window.BiDi = {
        hasArabic,
        hasLatin,
        format: formatBiDiText,
        formatBiDiText,
        autoFormatDOM
    };

    window.formatBiDiText = formatBiDiText;

})(typeof window !== 'undefined' ? window : this);
