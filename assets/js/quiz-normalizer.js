/**
 * Universal Quiz Schema Normalizer (quiz-normalizer.js)
 * Single Responsibility: Adapts all legacy and modern question data formats into canonical schema.
 */

(function (window) {
    'use strict';

    const QuizNormalizer = {
        normalizeQuestions: function (rawData, pageElements = {}) {
            if (!rawData) return [];

            let list = [];
            if (Array.isArray(rawData)) {
                list = rawData;
            } else if (typeof rawData === 'object' && rawData !== null) {
                if (rawData.title && pageElements.titleElement) {
                    pageElements.titleElement.textContent = rawData.title;
                }
                if (rawData.description && pageElements.descriptionElement) {
                    pageElements.descriptionElement.textContent = rawData.description;
                }

                if (Array.isArray(rawData.sections)) {
                    rawData.sections.forEach(section => {
                        if (Array.isArray(section.questions)) {
                            list.push(...section.questions);
                        }
                    });
                } else if (Array.isArray(rawData.questions)) {
                    list = rawData.questions;
                } else if (Array.isArray(rawData.quiz)) {
                    list = rawData.quiz;
                }
            }

            return list.map(q => {
                if (!q) return q;
                const cleanQ = { ...q };
                if (!cleanQ.question && cleanQ.q) {
                    cleanQ.question = cleanQ.q;
                }
                if (typeof cleanQ.question === 'string') {
                    // Strip leading numbers like "1. ", "10- ", "5) " so shuffled questions don't conflict with counter
                    cleanQ.question = cleanQ.question.replace(/^\d+[\.\-\)]\s*/, '').trim();
                }
                if (typeof cleanQ.answer === 'number' && Array.isArray(cleanQ.options)) {
                    cleanQ.options = cleanQ.options.map((opt, idx) => {
                        if (typeof opt === 'object' && opt !== null) return opt;
                        return { text: String(opt), isCorrect: idx === cleanQ.answer };
                    });
                }
                return cleanQ;
            });
        }
    };

    window.QuizNormalizer = QuizNormalizer;

})(typeof window !== 'undefined' ? window : this);
