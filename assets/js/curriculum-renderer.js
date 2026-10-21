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
        if (!window[name] && document.readyState === 'loading') {
            document.write('<script src="' + basePath + 'renderers/' + file + '"><\/script>');
        }
    }

    ensureModule('CurriculumUIPrimitives', 'ui-primitives.js');
    ensureModule('VocabRenderer', 'vocab-renderer.js');
    ensureModule('LexiconRenderer', 'lexicon-renderer.js');
    ensureModule('DialoguePlayer', 'dialogue-player.js');
    ensureModule('WritingRenderer', 'writing-renderer.js');

    const CurriculumRenderer = {
        init: function () {
            const data = window.lessonData;
            if (!data) return;

            // 1. Header Metadata
            this.renderHeaderMeta(data);

            // 2. Verbs Tab
            if (data.verbs && data.verbs.length > 0) {
                this.renderVerbsTab(data);
            }

            // 3. Vocabulary Tab
            if (data.learningOutcomes || data.keyVocabulary || data.keyIdioms || data.accumulativeVocabulary || data.importantVocabulary || data.lessonVocabulary || data.popQuiz) {
                this.renderVocabTab(data);
            }

            // 4. Definitions, Synonyms & Antonyms
            if (data.definitions || data.synonyms || data.antonyms) {
                this.renderDefinitionsTab(data);
            }

            // 5. Affixes, Prefixes & Suffixes
            if (data.prefixes || data.suffixes || data.affixes || data.expressions || data.prepositions) {
                this.renderAffixesTab(data);
            }

            // 6. Collocations & Prepositions
            if (data.collocations || data.verbPrepositions) {
                this.renderCollocationsTab(data);
            }

            // 7. Language Notes & Derivatives
            if (data.derivatives || data.confusionNotes) {
                this.renderLanguageNotesTab(data);
            }

            // 8. Grammar Slides & Lectures
            if (data.grammarSlides || data.youtubeLecture || data.youtubeShorts) {
                this.renderGrammarTab(data);
            }

            // 8.5 Writing Skills Tab
            if (data.writingSkills) {
                this.renderWritingSkillsTab(data);
            }

            // 9. Interactive Storybook
            if ((data.storyPages || data.readingDecks) && window.storyEngine) {
                this.initStorybook(data);
            }

            // 10. Dialogue Tab
            if (data.dialogue) {
                this.renderDialogueTab(data.dialogue);
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
            if (window.GrammarSlides && typeof window.GrammarSlides.init === 'function') {
                window.GrammarSlides.init();
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
            if (window.LexiconRenderer) window.LexiconRenderer.renderDefinitions(data);
        },

        renderAffixesTab: function (data) {
            if (window.LexiconRenderer) window.LexiconRenderer.renderAffixes(data);
        },

        renderCollocationsTab: function (data) {
            if (window.LexiconRenderer) window.LexiconRenderer.renderCollocations(data);
        },

        renderLanguageNotesTab: function (data) {
            if (window.LexiconRenderer) window.LexiconRenderer.renderLanguageNotes(data);
        },

        renderGrammarTab: function (data) {
            if (window.LexiconRenderer) window.LexiconRenderer.renderGrammar(data);
        },

        initStorybook: function (data) {
            const pages = data.storyPages || data.readingDecks || [];
            if (window.storyEngine && pages.length > 0) {
                window.storyEngine.loadPages(pages);
            }
        },

        renderDialogueTab: function (dialogue) {
            if (window.DialoguePlayer) window.DialoguePlayer.render(dialogue);
        },

        renderWritingSkillsTab: function (data) {
            if (window.WritingRenderer) window.WritingRenderer.render(data);
        },

        speakDiagTurn: function (idx, btn) {
            if (window.DialoguePlayer) window.DialoguePlayer.speakDiagTurn(idx, btn);
        },

        toggleDialoguePlayAll: function () {
            if (window.DialoguePlayer) window.DialoguePlayer.toggleDialoguePlayAll();
        }
    };

    window.CurriculumRenderer = CurriculumRenderer;

})(typeof window !== 'undefined' ? window : this);
