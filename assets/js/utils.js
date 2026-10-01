/**
 * AssemUtils - Shared Pure Utility Functions (DRY Principle)
 * Handles text normalization, regex escaping, and lesson identifier resolution.
 */

(function (window) {
    'use strict';

    const AssemUtils = {
        /**
         * Normalizes Arabic text by unifying alef variations, taa marbuta,
         * yaa/alef maksura, and removing diacritics (tashkeel).
         */
        normalizeAr: function (str) {
            if (!str || typeof str !== 'string') return '';
            return str
                .toLowerCase()
                .replace(/[أإآ]/g, 'ا')
                .replace(/ة/g, 'ه')
                .replace(/ى/g, 'ي')
                .replace(/[\u064B-\u0652]/g, '')
                .trim();
        },

        /**
         * Safely escapes special characters in a string for use in a RegExp.
         */
        escapeRegExp: function (str) {
            if (!str || typeof str !== 'string') return '';
            return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        },

        /**
         * Cleans English words for vocabulary matching (lowercased, trimmed, stripped of parenthesis metadata).
         * e.g., "preserve (preserved)" -> "preserve"
         */
        cleanWordKey: function (str) {
            if (!str || typeof str !== 'string') return '';
            return str
                .replace(/\s*\([^)]*\)/g, '')
                .replace(/[^\w\s-]/g, '')
                .trim()
                .toLowerCase();
        },

        /**
         * Deterministically derives a unique lesson key across all curriculum templates.
         */
        getLessonKey: function () {
            // 1. Explicit metadata if set
            if (window.lessonData && window.lessonData.id) {
                return `assem_mastery_${window.lessonData.id}`;
            }

            // 2. Structural path extraction (e.g. Sec_1/unit-1/lesson-1.html)
            const path = (window.location && window.location.pathname) ? window.location.pathname.replace(/\\/g, '/') : '';
            const matches = path.match(/(Sec_[1-3]|Prep_[1-3]|Grade_[1-6]|Course)\/([^/]+)\/([^/]+)\.html/i);
            if (matches) {
                return `assem_mastery_${matches[1]}_${matches[2]}_${matches[3]}`;
            }

            // 3. Fallback based on document title and filename
            const filename = path.split('/').pop().replace('.html', '') || 'lesson';
            const cleanTitle = (document.title || 'lesson').replace(/\|.*$/, '').replace(/[^\w\u0600-\u06FF]/g, '_').trim();
            return `assem_mastery_${cleanTitle}_${filename}`;
        }
    };

    window.AssemUtils = AssemUtils;

})(typeof window !== 'undefined' ? window : this);
