/**
 * AssemStorage - Robust Client-Side Persistence Abstraction
 * Handles namespace isolation, silent Safari private browsing fallbacks,
 * deterministic keying, and practice bank queue management.
 */

(function (window) {
    'use strict';

    const memoryStore = {};
    const MAX_PRACTICE_BANK_ITEMS = 30;

    function isLocalStorageAvailable() {
        try {
            const testKey = '__assem_test_storage__';
            window.localStorage.setItem(testKey, testKey);
            window.localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    }

    const hasLocalStorage = isLocalStorageAvailable();

    const AssemStorage = {
        /**
         * Safely retrieves a parsed JSON value or returns defaultValue.
         */
        get: function (key, defaultValue) {
            try {
                if (hasLocalStorage) {
                    const raw = window.localStorage.getItem(key);
                    if (raw === null || raw === undefined) return defaultValue;
                    return JSON.parse(raw);
                } else {
                    if (key in memoryStore) {
                        return JSON.parse(memoryStore[key]);
                    }
                    return defaultValue;
                }
            } catch (e) {
                return defaultValue;
            }
        },

        /**
         * Safely serializes and persists a value.
         */
        set: function (key, value) {
            try {
                const serialized = JSON.stringify(value);
                if (hasLocalStorage) {
                    window.localStorage.setItem(key, serialized);
                } else {
                    memoryStore[key] = serialized;
                }
                return true;
            } catch (e) {
                // Fallback to memory store if quota exceeded or storage blocked
                try {
                    memoryStore[key] = JSON.stringify(value);
                } catch (memErr) {
                    // Ignore memory errors
                }
                return false;
            }
        },

        /**
         * Safely removes a key from storage.
         */
        remove: function (key) {
            try {
                if (hasLocalStorage) {
                    window.localStorage.removeItem(key);
                }
                delete memoryStore[key];
            } catch (e) {
                delete memoryStore[key];
            }
        },

        /**
         * Deterministic Lesson Key Generation
         */
        getLessonKey: function () {
            if (window.AssemUtils && typeof window.AssemUtils.getLessonKey === 'function') {
                return window.AssemUtils.getLessonKey();
            }
            return 'assem_mastery_current_lesson';
        },

        /**
         * Vocabulary Mastery Methods
         */
        getLessonMastery: function (customLessonKey) {
            const key = customLessonKey || this.getLessonKey();
            return this.get(key, {});
        },

        setWordMastery: function (wordKey, status, meta, customLessonKey) {
            if (!wordKey) return;
            const key = customLessonKey || this.getLessonKey();
            const current = this.getLessonMastery(key);
            const cleanKey = (window.AssemUtils && window.AssemUtils.cleanWordKey) 
                ? window.AssemUtils.cleanWordKey(wordKey) 
                : wordKey.toLowerCase().trim();

            const existing = current[cleanKey] || {
                status: 'in_progress',
                reviewCount: 0,
                failedInQuizCount: 0
            };

            current[cleanKey] = {
                status: status, // 'mastered' | 'needs_practice' | 'in_progress'
                lastReviewed: Date.now(),
                reviewCount: (existing.reviewCount || 0) + 1,
                failedInQuizCount: (meta && meta.failedInQuizCount !== undefined) 
                    ? meta.failedInQuizCount 
                    : (existing.failedInQuizCount || 0)
            };

            this.set(key, current);
            return current[cleanKey];
        },

        /**
         * Practice Bank Methods (Capped at 30 items FIFO)
         */
        getPracticeBank: function () {
            return this.get('assem_global_practice_bank', []);
        },

        addToPracticeBank: function (item) {
            if (!item || !item.word) return;
            const bank = this.getPracticeBank();
            const cleanWord = (window.AssemUtils && window.AssemUtils.cleanWordKey)
                ? window.AssemUtils.cleanWordKey(item.word)
                : item.word.toLowerCase().trim();

            // Filter out if already exists (bring to front)
            const filtered = bank.filter(b => {
                const bClean = (window.AssemUtils && window.AssemUtils.cleanWordKey)
                    ? window.AssemUtils.cleanWordKey(b.word)
                    : b.word.toLowerCase().trim();
                return bClean !== cleanWord;
            });

            // Prepend new item
            filtered.unshift({
                word: item.word,
                translation: item.translation || '',
                stage: item.stage || '',
                unit: item.unit || '',
                lessonUrl: item.lessonUrl || window.location.href,
                addedTimestamp: Date.now()
            });

            // Enforce max cap
            if (filtered.length > MAX_PRACTICE_BANK_ITEMS) {
                filtered.length = MAX_PRACTICE_BANK_ITEMS;
            }

            this.set('assem_global_practice_bank', filtered);
            try {
                window.dispatchEvent(new CustomEvent('assem:practice-bank-updated', {
                    detail: { bank: filtered, action: 'add', item: filtered[0] }
                }));
            } catch (e) {
                // Silently continue
            }
        },

        removeFromPracticeBank: function (word) {
            if (!word) return;
            const bank = this.getPracticeBank();
            const cleanWord = (window.AssemUtils && window.AssemUtils.cleanWordKey)
                ? window.AssemUtils.cleanWordKey(word)
                : word.toLowerCase().trim();

            const filtered = bank.filter(b => {
                const bClean = (window.AssemUtils && window.AssemUtils.cleanWordKey)
                    ? window.AssemUtils.cleanWordKey(b.word)
                    : b.word.toLowerCase().trim();
                return bClean !== cleanWord;
            });

            this.set('assem_global_practice_bank', filtered);
            try {
                window.dispatchEvent(new CustomEvent('assem:practice-bank-updated', {
                    detail: { bank: filtered, action: 'remove', word: word }
                }));
            } catch (e) {
                // Silently continue
            }
        }
    };

    window.AssemStorage = AssemStorage;

})(typeof window !== 'undefined' ? window : this);
