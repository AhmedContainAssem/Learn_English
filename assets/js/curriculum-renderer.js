/**
 * Curriculum Lesson Renderer Engine (curriculum-renderer.js)
 * Clean Architecture & Orchestrator Facade:
 * Coordinates specialized rendering modules (Vocab, Lexicon, Grammar, Story, Quiz, Dialogue).
 * Adheres strictly to Separation of Concerns (SoC), DRY, and NO GOD FILES.
 */

(function (window) {
    'use strict';

    // Auto-load sub-renderers if not already loaded in the DOM
    const currentScript = document.currentScript || (function () {
        const scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();

    const basePath = (function () {
        if (currentScript && currentScript.src) {
            return currentScript.src.substring(0, currentScript.src.lastIndexOf('/') + 1);
        }
        return '../../assets/js/';
    })();

    function ensureModule(name, file) {
        if (!window[name] && typeof document !== 'undefined') {
            const src = basePath + 'renderers/' + file;
            if (!document.querySelector(`script[src="${src}"]`)) {
                const script = document.createElement('script');
                script.src = src;
                script.async = false;
                document.head.appendChild(script);
            }
        }
    }

    function ensureAssetScript(name, file) {
        if (!window[name] && typeof document !== 'undefined') {
            const src = basePath + file;
            if (!document.querySelector(`script[src="${src}"]`)) {
                const script = document.createElement('script');
                script.src = src;
                script.async = false;
                document.head.appendChild(script);
            }
        }
    }

    ensureModule('BaseRenderer', 'base-renderer.js');
    ensureModule('CurriculumUIPrimitives', 'ui-primitives.js');
    ensureModule('VocabRenderer', 'vocab-renderer.js');
    ensureModule('LexiconRenderer', 'lexicon-renderer.js');
    ensureModule('NotesRenderer', 'notes-renderer.js');
    ensureModule('GrammarRenderer', 'grammar-renderer.js');
    ensureModule('PhonicsRenderer', 'phonics-renderer.js');
    ensureModule('DialoguePlayer', 'dialogue-player.js');
    ensureModule('WritingRenderer', 'writing-renderer.js');
    ensureAssetScript('grammarSlidesEngine', 'slides-engine.js');
    ensureAssetScript('storyEngine', 'story-engine.js');
    ensureAssetScript('quizEngine', 'quiz-engine.js');

    const CurriculumRenderer = {
        /**
         * Universal Data Normalization Pipeline
         * Standardizes polymorphic schema keys across curriculum stages and lesson formats.
         * Guarantees zero blank tabs caused by naming discrepancies.
         */
        normalizeData: function (raw) {
            if (!raw || typeof raw !== 'object') return raw || {};
            const data = { ...raw };

            // 1. Grammar Normalization (grammarDeck / grammarSlides / grammarLessons / grammar.slides)
            const resolvedSlides = data.grammarSlides || 
                                   data.grammarDeck || 
                                   data.grammarLessons || 
                                   (data.grammar && (data.grammar.slides || data.grammar.deck)) || 
                                   [];
            data.grammarSlides = Array.isArray(resolvedSlides) ? resolvedSlides : [];
            data.grammarDeck = data.grammarSlides;
            window.grammarSlides = data.grammarSlides;

            if (!data.grammarContentHtml && data.grammar) {
                data.grammarContentHtml = typeof data.grammar === 'string' ? data.grammar : (data.grammar.html || data.grammar.contentHtml || '');
            }

            // 2. Reading & Interactive Storybook Normalization
            if (data.readingDecks && Array.isArray(data.readingDecks) && data.readingDecks.length > 0) {
                window.readingDecks = data.readingDecks;
                if (!data.storyPages || data.storyPages.length === 0) {
                    const firstDeck = data.readingDecks[0];
                    data.storyPages = firstDeck.pages || firstDeck.scenes || [];
                }
            } else if (data.storyPages && Array.isArray(data.storyPages) && data.storyPages.length > 0) {
                if (!data.readingDecks) {
                    data.readingDecks = [{ id: 'deck_1', title: data.title || 'Reading Deck', pages: data.storyPages }];
                }
                window.readingDecks = data.readingDecks;
            } else if (data.storyBook && data.storyBook.scenes) {
                data.storyPages = data.storyBook.scenes.map(s => ({
                    title: s.titleEn || s.title || '',
                    titleAr: s.titleAr || '',
                    textEn: s.textEn || s.narrativeEn || s.text || '',
                    textAr: s.textAr || s.narrativeAr || s.translation || '',
                    imageUrl: s.image || s.illustration || s.imageUrl || '',
                    caption: s.caption || '',
                    vocabNotes: s.vocabWords || s.targetWords || ''
                }));
                data.readingDecks = [{ id: 'deck_1', title: data.title || 'Reading Deck', pages: data.storyPages }];
                window.readingDecks = data.readingDecks;
            }

            // 3. Dialogue Normalization
            if (data.dialogueDecks && Array.isArray(data.dialogueDecks) && data.dialogueDecks.length > 0) {
                window.dialogueDecks = data.dialogueDecks;
                data.dialogue = data.dialogue || data.dialogueDecks[0];
            } else if (data.dialogue) {
                if (!data.dialogueDecks) {
                    data.dialogueDecks = [data.dialogue];
                }
                window.dialogueDecks = data.dialogueDecks;
            } else if (data.speakingDialogue) {
                data.dialogue = data.speakingDialogue;
                data.dialogueDecks = [data.dialogue];
                window.dialogueDecks = data.dialogueDecks;
            } else if (data.dialogues && Array.isArray(data.dialogues)) {
                data.dialogueDecks = data.dialogues;
                data.dialogue = data.dialogues[0];
                window.dialogueDecks = data.dialogueDecks;
            }

            // 4. Vocabulary Normalization
            data.keyVocabulary = data.keyVocabulary || data.vocabulary || data.importantVocabulary || data.lessonVocabulary || [];
            data.accumulativeVocabulary = data.accumulativeVocabulary || data.extraVocabulary || [];

            // 5. Verbs Normalization
            data.verbs = data.verbs || data.irregularVerbs || data.verbConjugations || [];

            // 6. Definitions, Synonyms, Affixes, Collocations
            data.definitions = data.definitions || [];
            data.synonyms = data.synonyms || data.synonymsAndAntonyms || [];
            data.affixes = data.affixes || data.prefixesAndSuffixes || [];
            data.collocations = data.collocations || data.expressions || data.expressionsAndPrepositions || [];
            data.languageNotes = data.languageNotes || data.derivatives || data.confusionNotes || [];

            // 7. Quiz Normalization
            data.quiz = data.quiz || data.questions || [];
            data.questions = data.quiz;
            window.quiz = data.quiz;
            window.questions = data.quiz;

            return data;
        },

        init: function () {
            let data = window.lessonData || window.__LESSON_DATA__;
            if (!data) return;
            data = this.normalizeData(data);
            window.lessonData = data;
            window.__LESSON_DATA__ = data;

            // 1. Header Metadata
            this.renderHeaderMeta(data);

            // 2. Verbs Tab
            if (data.verbs && (Array.isArray(data.verbs) ? data.verbs.length > 0 : (typeof data.verbs === 'object' && Object.keys(data.verbs).length > 0))) {
                this.renderVerbsTab(data);
            }

            // 3. Vocabulary Tab
            if (data.learningOutcomes || (data.keyVocabulary && data.keyVocabulary.length > 0) || data.keyIdioms || data.accumulativeVocabulary || data.importantVocabulary || data.lessonVocabulary || data.popQuiz) {
                this.renderVocabTab(data);
            }

            // 4. Definitions, Synonyms & Antonyms
            if ((data.definitions && data.definitions.length > 0) || (data.synonyms && data.synonyms.length > 0) || data.antonyms) {
                this.renderDefinitionsTab(data);
            }

            // 5. Affixes, Prefixes & Suffixes
            if (data.prefixes || data.suffixes || (data.affixes && data.affixes.length > 0)) {
                this.renderAffixesTab(data);
            }

            // 6. Collocations, Expressions & Prepositions Tab
            if ((data.collocations && data.collocations.length > 0) || data.verbPrepositions || data.expressions || data.prepositions || data.expressionsAndPrepositions) {
                this.renderCollocationsTab(data);
            }

            // 7. Language Notes & Derivatives
            if (data.derivatives || data.derivativeRoots || data.wordFamilies || data.confusionNotes || data.clearConfusion || (data.languageNotes && data.languageNotes.length > 0)) {
                this.renderLanguageNotesTab(data);
            }

            // 8. Grammar Slides, Decks & Video Lectures
            if ((data.grammarSlides && data.grammarSlides.length > 0) || data.grammarDeck || data.grammarContentHtml || data.youtubeLecture || data.youtubeShorts || data.videoLessons) {
                this.renderGrammarTab(data);
            }

            // 8.5 Writing Skills & Projects Tab
            if (data.writingSkills || data.writingSkill || data.posterProject || data.writingGuide) {
                this.renderWritingSkillsTab(data);
            }

            // 8.6 Pronunciation Lab Tab
            if (data.pronunciation) {
                this.renderPronunciationTab(data);
            }

            // 9. Interactive Storybook
            if ((data.storyPages || data.readingDecks || data.storyBook) && window.storyEngine) {
                this.initStorybook(data);
            }

            // 10. Dialogue Tab (Supports single dialogue or multi-deck arrays)
            const diagPayload = data.dialogueDecks || data.dialogue || data.speakingDialogue;
            if (diagPayload) {
                this.renderDialogueTab(diagPayload);
            }

            // 11. Quiz Engine Integration
            const quizList = data.quiz || data.questions;
            if (window.quizEngine && quizList && quizList.length > 0) {
                window.quizEngine.loadQuestions(quizList);
            }

            // 12. Leitner Vocab Mastery Integration
            if (window.AssemVocabMastery && typeof window.AssemVocabMastery.init === 'function') {
                window.AssemVocabMastery.init();
            }

            // 13. Slides Engine Sync
            if (window.grammarSlidesEngine && typeof window.grammarSlidesEngine.init === 'function') {
                window.grammarSlidesEngine.init();
            }
        },

        renderHeaderMeta: function (data) {
            const titleEl = document.getElementById('title');
            if (titleEl && data.title) {
                const escapeHTML = window.CurriculumUIPrimitives ? window.CurriculumUIPrimitives.escapeHTML : str => str;
                titleEl.innerHTML = escapeHTML(data.title);
            }

            const descEl = document.getElementById('description');
            if (descEl && data.description) {
                const escapeHTML = window.CurriculumUIPrimitives ? window.CurriculumUIPrimitives.escapeHTML : str => str;
                descEl.innerHTML = escapeHTML(data.description);
            }
        },

        // Delegated Sub-Renderers (Clean Facade)
        renderVerbsTab: function (data) {
            if (window.LexiconRenderer) window.LexiconRenderer.renderVerbs(data);
        },

        renderVocabTab: function (data) {
            if (window.VocabRenderer) window.VocabRenderer.render(data);
        },

        renderDefinitionsTab: function (data) {
            if (window.LexiconRenderer) {
                if (typeof window.LexiconRenderer.renderDefinitions === 'function') {
                    window.LexiconRenderer.renderDefinitions(data);
                }
                if (typeof window.LexiconRenderer.renderSynonyms === 'function') {
                    window.LexiconRenderer.renderSynonyms(data);
                }
            }
        },

        renderAffixesTab: function (data) {
            if (window.LexiconRenderer) window.LexiconRenderer.renderAffixes(data);
        },

        renderCollocationsTab: function (data) {
            if (window.LexiconRenderer) window.LexiconRenderer.renderCollocations(data);
        },

        renderLanguageNotesTab: function (data) {
            if (window.NotesRenderer) {
                window.NotesRenderer.renderLanguageNotes(data);
            } else if (window.LexiconRenderer) {
                window.LexiconRenderer.renderLanguageNotes(data);
            }
        },

        renderGrammarTab: function (data) {
            if (window.GrammarRenderer) {
                window.GrammarRenderer.renderGrammar(data);
            } else if (window.LexiconRenderer) {
                window.LexiconRenderer.renderGrammar(data);
            }
        },

        initStorybook: function (data) {
            let pages = data.storyPages;
            if ((!pages || pages.length === 0) && data.readingDecks && data.readingDecks.length > 0) {
                pages = data.readingDecks[0].pages || data.readingDecks[0].scenes;
            }
            if ((!pages || pages.length === 0) && data.storyBook && data.storyBook.scenes) {
                pages = data.storyBook.scenes.map(s => ({
                    title: s.titleEn || s.title || '',
                    titleAr: s.titleAr || '',
                    narrativeEn: s.textEn || s.narrativeEn || s.text || '',
                    narrativeAr: s.textAr || s.narrativeAr || s.translation || '',
                    image: s.image || s.illustration || s.imageUrl || '',
                    caption: s.caption || '',
                    vocabWords: s.vocabWords || s.targetWords || []
                }));
            }
            if (window.storyEngine && pages && pages.length > 0) {
                window.storyEngine.loadPages(pages);
            }
        },

        renderDialogueTab: function (dialogue) {
            if (window.DialoguePlayer) window.DialoguePlayer.render(dialogue);
        },

        renderWritingSkillsTab: function (data) {
            if (window.WritingRenderer) window.WritingRenderer.render(data);
        },

        renderPronunciationTab: function (data) {
            if (window.PhonicsRenderer) {
                window.PhonicsRenderer.renderPronunciation(data);
            } else if (window.LexiconRenderer && typeof window.LexiconRenderer.renderPronunciation === 'function') {
                window.LexiconRenderer.renderPronunciation(data);
            }
        },

        speakDiagTurn: function (idx, btn) {
            if (window.DialoguePlayer) window.DialoguePlayer.speakDiagTurn(idx, btn);
        },

        toggleDialoguePlayAll: function () {
            if (window.DialoguePlayer) window.DialoguePlayer.toggleDialoguePlayAll();
        }
    };

    window.CurriculumRenderer = CurriculumRenderer;

    // Automatic Lifecycle Hydration
    function autoInit() {
        if (!CurriculumRenderer._initialized && (window.lessonData || window.__LESSON_DATA__)) {
            CurriculumRenderer.init();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInit);
    } else {
        autoInit();
    }

})(typeof window !== 'undefined' ? window : this);
