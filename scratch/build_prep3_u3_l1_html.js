const fs = require('fs');

const bak = fs.readFileSync('Prep_3/unit-3/lesson-1.html.bak', 'utf8');

// 1. Head and Header up to line 216 (tabs navigation)
const headToTabs = bak.slice(0, bak.indexOf('<!-- ========================================== -->\n        <!-- Tab 1: Comprehensive Vocabulary'));

// 2. Empty hydrated containers for Tabs 1-5
const tabs1to5 = `        <!-- ========================================== -->
        <!-- Tab 1: Comprehensive Vocabulary            -->
        <!-- ========================================== -->
        <div id="vocab" class="tab-content active"></div>

        <!-- ========================================== -->
        <!-- Tab 2: Verbs Conjugation                   -->
        <!-- ========================================== -->
        <div id="verbs" class="tab-content" style="display: none;"></div>

        <!-- ========================================== -->
        <!-- Tab 3: Collocations & Affixes              -->
        <!-- ========================================== -->
        <div id="collocations-affixes" class="tab-content" style="display: none;">
            <div id="collocations"></div>
            <div id="affixes" style="margin-top: 36px;"></div>
        </div>

        <!-- ========================================== -->
        <!-- Tab 4: Synonyms & Antonyms                 -->
        <!-- ========================================== -->
        <div id="synonyms-antonyms" class="tab-content" style="display: none;">
            <div id="synonyms"></div>
        </div>

        <!-- ========================================== -->
        <!-- Tab 5: General Notes & Expressions         -->
        <!-- ========================================== -->
        <div id="general-notes" class="tab-content" style="display: none;">
            <div id="notes"></div>
            <div id="expressions" style="margin-top: 36px;"></div>
        </div>

`;

// 3. Tab 6 Storybook to Nav controls
const storybookStart = bak.indexOf('<!-- ========================================== -->\n        <!-- Tab 6: Interactive Storybook');
const scriptEngineStart = bak.indexOf('<!-- Data Engine for Storybook and QuizEngine -->');
const tabs6to9AndNav = bak.slice(storybookStart, scriptEngineStart);

// 4. Decoupled scripts
const footerScripts = `    <!-- Universal Framework Scripts -->
    <script src="../../assets/js/bidi.js"></script>
    <script src="../../assets/js/audio.js"></script>
    <script src="../../assets/js/tabs.js"></script>
    <script src="../../assets/js/quiz-engine.js"></script>
    <script src="../../assets/js/story-engine.js"></script>
    <script src="../../assets/js/ui.js"></script>
    <script src="../../assets/js/practice-hub.js"></script>
    <script src="../../assets/js/main.js"></script>

    <!-- Pure Decoupled Lesson Data Payload -->
    <script src="./lesson-1.data.js"></script>

    <!-- Universal Curriculum Dynamic Renderer -->
    <script src="../../assets/js/curriculum-renderer.js"></script>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            if (window.CurriculumRenderer && typeof window.CurriculumRenderer.init === 'function') {
                window.CurriculumRenderer.init();
            }
        });
    </script>
</body>
</html>
`;

const outputHtml = headToTabs + tabs1to5 + tabs6to9AndNav + footerScripts;
fs.writeFileSync('Prep_3/unit-3/lesson-1.html', outputHtml, 'utf8');
console.log('Original bak size:', bak.length);
console.log('New shell size:', outputHtml.length);
console.log('Successfully assembled Prep_3/unit-3/lesson-1.html');
