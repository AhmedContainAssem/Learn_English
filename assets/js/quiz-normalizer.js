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
                const clean = { ...q };

                // 1. Normalize Question Prompt
                clean.question = clean.question || clean.q || clean.prompt || clean.text || '';
                if (typeof clean.question === 'string') {
                    // Strip leading numbers like "1. ", "10- ", "5) " so shuffled questions don't conflict with counter
                    clean.question = clean.question.replace(/^\d+[\.\-\)]\s*/, '').trim();
                }

                // 2. Normalize Explanation & Feedback
                clean.explanation = clean.explanation || clean.exp || clean.explain || clean.rationale || '';
                clean.correctMsg = clean.correctMsg || (clean.feedback && clean.feedback.correct) || (clean.explanation ? `✅ إجابة صحيحة! أحسنت 🎯 (${clean.explanation})` : null);
                clean.wrongMsg = clean.wrongMsg || (clean.feedback && clean.feedback.wrong) || (clean.explanation ? `❌ إجابة غير صحيحة. (${clean.explanation})` : null);

                // 3. Resolve Answer Indicator
                const rawAnswer = clean.correct !== undefined 
                    ? clean.correct 
                    : (clean.a !== undefined 
                        ? clean.a 
                        : (clean.answer !== undefined 
                            ? clean.answer 
                            : clean.correctAnswer));

                // 4. Normalize Options into [{ text: string, isCorrect: boolean }] BEFORE shuffling
                const rawOptions = Array.isArray(clean.options) 
                    ? clean.options 
                    : (Array.isArray(clean.choices) ? clean.choices : []);

                const alreadyStructured = rawOptions.length > 0 && typeof rawOptions[0] === 'object' && rawOptions[0] !== null && 'isCorrect' in rawOptions[0];

                if (alreadyStructured) {
                    clean.options = rawOptions.map(opt => ({
                        text: String(opt.text || ''),
                        isCorrect: Boolean(opt.isCorrect)
                    }));
                } else {
                    clean.options = rawOptions.map((opt, idx) => {
                        const optText = (typeof opt === 'object' && opt !== null) ? (opt.text || '') : String(opt);
                        let isMatch = false;

                        if (typeof rawAnswer === 'number') {
                            isMatch = (idx === rawAnswer);
                        } else if (typeof rawAnswer === 'string') {
                            const trimmedAns = rawAnswer.trim().toLowerCase();
                            if (optText.trim().toLowerCase() === trimmedAns) {
                                isMatch = true;
                            } else if (['a', 'b', 'c', 'd'].includes(trimmedAns)) {
                                const letterIdx = trimmedAns.charCodeAt(0) - 97;
                                isMatch = (idx === letterIdx);
                            }
                        }

                        return {
                            text: optText,
                            isCorrect: isMatch
                        };
                    });
                }

                // Fallback guarantee: if index was valid number but didn't match, force correct flag
                if (clean.options.length > 0 && !clean.options.some(o => o.isCorrect)) {
                    if (typeof rawAnswer === 'number' && rawAnswer >= 0 && rawAnswer < clean.options.length) {
                        clean.options[rawAnswer].isCorrect = true;
                    }
                }

                // Store string answer for analytics / reverse-binding lookup
                const correctOpt = clean.options.find(o => o.isCorrect);
                clean.answer = correctOpt ? correctOpt.text : (typeof rawAnswer === 'string' ? rawAnswer : '');

                return clean;
            });
        }
    };

    window.QuizNormalizer = QuizNormalizer;

})(typeof window !== 'undefined' ? window : this);

