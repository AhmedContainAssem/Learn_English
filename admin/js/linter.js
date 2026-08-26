/**
 * Pedagogical & Link Quality Linter Module (linter.js)
 * Real-time content quality auditing, pedagogical health score, broken link checks, and 1-click Auto-Fix.
 */

class StudioLinterEngine {
    constructor() {
        this.lastAuditResult = null;
    }

    audit(currentState = state) {
        if (!currentState) return null;

        const issues = [];
        let score = 100;

        // 1. Basic Metadata Audit
        if (!currentState.title || currentState.title.trim() === '' || currentState.title.includes('Untitled')) {
            issues.push({
                type: 'error',
                category: 'metadata',
                message: 'Lesson or Index title is missing or set to default placeholder.',
                fixAction: 'set_default_title'
            });
            score -= 15;
        }

        if (!currentState.filename || !currentState.filename.endsWith('.html')) {
            issues.push({
                type: 'error',
                category: 'metadata',
                message: 'Invalid filename (must end with .html extension).',
                fixAction: 'fix_filename'
            });
            score -= 15;
        }

        // 2. Archetype-specific Audits
        if (currentState.archetype === 'curriculum_tabs') {
            // Verbs Audit
            (currentState.verbs || []).forEach((v, idx) => {
                const verbWord = v.word || v.base || '';
                const verbForms = v.forms || v.past || '';
                if (!v.meaning || v.meaning.trim() === '') {
                    issues.push({
                        type: 'warning',
                        category: 'verbs',
                        message: `الفعل (${verbWord || '#' + (idx + 1)}) ينقصه المعنى بالعربية.`
                    });
                    score -= 4;
                }
                if (!verbForms || verbForms.trim() === '') {
                    issues.push({
                        type: 'warning',
                        category: 'verbs',
                        message: `الفعل (${verbWord || '#' + (idx + 1)}) ينقصه تصريف الفعل (Past / P.P).`
                    });
                    score -= 4;
                }
            });

            // Definitions Audit
            (currentState.definitions || []).forEach((d, idx) => {
                if (!d.word || d.word.trim() === '') {
                    issues.push({
                        type: 'error',
                        category: 'definitions',
                        message: `عنصر التعريفات #${idx + 1} ينقصه الكلمة والمصطلح الرئيسي.`
                    });
                    score -= 5;
                }
            });

            // Synonyms Audit
            (currentState.synonyms || []).forEach((s, idx) => {
                if (!s.synonym && !s.antonym) {
                    issues.push({
                        type: 'warning',
                        category: 'synonyms',
                        message: `الكلمة (${s.word || '#' + (idx + 1)}) ينقصها المرادف أو المضاد.`
                    });
                    score -= 4;
                }
            });
        } else if (currentState.archetype === 'storybook_reading') {
            // Storybook Audit
            if (!currentState.storyPages || currentState.storyPages.length === 0) {
                issues.push({
                    type: 'error',
                    category: 'storybook',
                    message: 'لم تتم إضافة أي صفحات أو فصول في القصة المصورة بعد.'
                });
                score -= 20;
            } else {
                currentState.storyPages.forEach((p, idx) => {
                    if (!p.textEn || p.textEn.trim() === '') {
                        issues.push({
                            type: 'error',
                            category: 'storybook',
                            message: `صفحة القصة #${idx + 1} (${p.title || 'فصل'}) ينقصها النص الإنجليزي.`
                        });
                        score -= 8;
                    }
                    if (!p.textAr || p.textAr.trim() === '') {
                        issues.push({
                            type: 'info',
                            category: 'storybook',
                            message: `صفحة القصة #${idx + 1} يفضل تزويدها بالترجمة العربية لمساعدة الطالب.`
                        });
                        score -= 2;
                    }
                });
            }
        } else if (currentState.archetype === 'flashcards_dialogue') {
            // Flashcards & Dialogue Audit
            if (!currentState.flashcards || currentState.flashcards.length === 0) {
                issues.push({
                    type: 'warning',
                    category: 'flashcards',
                    message: 'لم تتم إضافة بطاقات استذكار (Flashcards) للدرس بعد.'
                });
                score -= 10;
            }
            if (!currentState.dialogueLines || currentState.dialogueLines.length === 0) {
                issues.push({
                    type: 'warning',
                    category: 'dialogue',
                    message: 'لم يتم إضافة أسطر المحادثة التفاعلية (Dialogue Lines).'
                });
                score -= 8;
            }
        }

        // 3. Quiz Quality & Pedagogical Balance
        if (currentState.quiz && currentState.quiz.length > 0) {
            currentState.quiz.forEach((q, idx) => {
                const correctOpts = (q.options || []).filter(o => o.isCorrect);
                if (correctOpts.length === 0) {
                    issues.push({
                        type: 'error',
                        category: 'quiz',
                        message: `Question #${idx + 1}: No option marked as correct answer!`
                    });
                    score -= 15;
                } else if (correctOpts.length > 1) {
                    issues.push({
                        type: 'warning',
                        category: 'quiz',
                        message: `Question #${idx + 1}: Multiple options marked as correct answer.`
                    });
                    score -= 8;
                }

                if (!q.options || q.options.length < 3) {
                    issues.push({
                        type: 'warning',
                        category: 'quiz',
                        message: `Question #${idx + 1}: Has fewer than 3 options (recommended: 3-4 choices).`
                    });
                    score -= 5;
                }

                if (!q.correctMsg || q.correctMsg.trim() === '') {
                    issues.push({
                        type: 'info',
                        category: 'quiz',
                        message: `Question #${idx + 1}: Missing positive reinforcement explanation.`
                    });
                    score -= 2;
                }
            });
        } else if (currentState.archetype === 'quiz_only' || (currentState.archetype === 'curriculum_tabs' && (!currentState.quiz || currentState.quiz.length === 0))) {
            issues.push({
                type: 'warning',
                category: 'quiz',
                message: 'No quiz questions added to assess student understanding.'
            });
            score -= 10;
        }

        // 4. Index / Hub Link Integrity Audit
        if (currentState.archetype === 'index_hub' || currentState.archetype === 'stage_index' || currentState.archetype === 'unit_index') {
            if (!currentState.indexCards || currentState.indexCards.length === 0) {
                issues.push({
                    type: 'error',
                    category: 'links',
                    message: 'Index page has no navigation cards or unit links.'
                });
                score -= 20;
            } else {
                currentState.indexCards.forEach((card, idx) => {
                    if (!card.link || card.link.trim() === '' || card.link === '#') {
                        issues.push({
                            type: 'error',
                            category: 'links',
                            message: `Card (${card.title || '#' + (idx + 1)}) is missing a valid destination URL.`
                        });
                        score -= 10;
                    }

                    // Check status tag consistency
                    if (card.status === 'locked' && card.tag && (card.tag.includes('متاح') || card.tag.toLowerCase().includes('avail'))) {
                        issues.push({
                            type: 'info',
                            category: 'links',
                            message: `Card (${card.title}): Marked as locked but tag says Available.`
                        });
                        score -= 2;
                    }
                });
            }
        }

        // Score bounding
        score = Math.max(0, Math.min(100, score));

        let grade = 'Excellent 🏆';
        let gradeColor = 'var(--accent-green)';
        if (score < 60) {
            grade = 'Needs Review ❌';
            gradeColor = 'var(--accent-red)';
        } else if (score < 85) {
            grade = 'Good with Notes ⚠️';
            gradeColor = '#f59e0b';
        }

        this.lastAuditResult = {
            score,
            grade,
            gradeColor,
            issues,
            timestamp: Date.now()
        };

        this.renderLinterUI();
        return this.lastAuditResult;
    }

    renderLinterUI() {
        const scoreBadge = document.getElementById('linterScoreBadge');
        const countBadge = document.getElementById('linterIssuesCountBadge');
        const modalContainer = document.getElementById('linterIssuesList') || document.getElementById('linterModalIssuesContainer');
        const modalScoreBox = document.getElementById('linterModalScoreBox');
        const modalScore = document.getElementById('linterModalScore');

        if (!this.lastAuditResult) return;

        const { score, grade, gradeColor, issues } = this.lastAuditResult;

        if (scoreBadge) {
            scoreBadge.textContent = `${score}% ${grade}`;
            scoreBadge.style.color = gradeColor;
            scoreBadge.style.borderColor = gradeColor;
        }

        if (countBadge) {
            countBadge.textContent = `${issues.length} Note${issues.length === 1 ? '' : 's'}`;
            countBadge.style.display = issues.length > 0 ? 'inline-block' : 'none';
        }

        if (modalScore) {
            modalScore.textContent = `${score}% ${grade}`;
            modalScore.style.color = gradeColor;
        }

        if (modalScoreBox) {
            modalScoreBox.innerHTML = `
                <div style="font-size: 0.85rem; color: var(--text-muted);">Overall Pedagogical Quality:</div>
                <div id="linterModalScore" style="font-size: 1.6rem; font-weight: 900; color: ${gradeColor};">${score}% ${grade}</div>
                <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 2px;">
                    ${issues.length === 0 ? '✨ Content fully adheres to quality standards!' : `Found ${issues.length} item(s) to review or optimize.`}
                </div>
            `;
        }

        if (modalContainer) {
            if (issues.length === 0) {
                modalContainer.innerHTML = `
                    <div style="text-align: center; padding: 30px; color: var(--accent-green); background: rgba(0, 255, 157, 0.05); border: 1px dashed rgba(0, 255, 157, 0.2); border-radius: 14px;">
                        <div style="font-size: 2.5rem; margin-bottom: 8px;">🏆</div>
                        <div style="font-weight: 800; font-size: 1.1rem; color: var(--accent-green);">100% Optimal - Ready to Publish!</div>
                        <div style="color: var(--text-muted); font-size: 0.88rem; margin-top: 4px;">All metadata, vocabulary, definitions, and quiz checks passed with no notes.</div>
                    </div>
                `;
                return;
            }

            let html = `<div style="display: flex; flex-direction: column; gap: 8px;">`;
            issues.forEach(issue => {
                const icon = issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : '💡';
                const bg = issue.type === 'error' ? 'rgba(255, 71, 126, 0.1)' : issue.type === 'warning' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(0, 243, 255, 0.08)';
                const border = issue.type === 'error' ? 'rgba(255, 71, 126, 0.3)' : issue.type === 'warning' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(0, 243, 255, 0.2)';
                const textColor = issue.type === 'error' ? 'var(--accent-red)' : issue.type === 'warning' ? '#f59e0b' : 'var(--accent-primary)';

                html += `
                    <div style="background: ${bg}; border: 1px solid ${border}; border-radius: 10px; padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 1.2rem;">${icon}</span>
                            <div style="font-size: 0.88rem; color: var(--text-main); font-weight: 500;">
                                ${escapeHTML(issue.message)}
                            </div>
                        </div>
                        <span style="font-size: 0.75rem; color: ${textColor}; font-weight: bold; padding: 2px 8px; border-radius: 6px; background: rgba(0,0,0,0.2); white-space: nowrap;">
                            ${issue.category.toUpperCase()}
                        </span>
                    </div>
                `;
            });
            html += `</div>`;
            modalContainer.innerHTML = html;
        }
    }

    autoFix() {
        if (typeof StudioStore !== 'undefined') {
            StudioStore.recordSnapshot('Auto-Fix Quality Audit');
        }

        let fixCount = 0;

        // 1. Trim strings & ensure clean titles
        if (!state.title || state.title.trim() === '') {
            state.title = 'Lesson Unit Assessment';
            fixCount++;
        }

        // 2. Fix Quizzes (ensure at least 1 correct answer & default feedback)
        if (state.quiz && state.quiz.length > 0) {
            state.quiz.forEach(q => {
                const correctCount = (q.options || []).filter(o => o.isCorrect).length;
                if (correctCount === 0 && q.options && q.options.length > 0) {
                    q.options[0].isCorrect = true;
                    fixCount++;
                }
                if (!q.correctMsg || q.correctMsg.trim() === '') {
                    q.correctMsg = 'Correct! Well done (+10)';
                    fixCount++;
                }
                if (!q.wrongMsg || q.wrongMsg.trim() === '') {
                    q.wrongMsg = 'Try again to select the correct answer';
                    fixCount++;
                }
            });
        }

        // 3. Fix Index Cards status tags
        if (state.indexCards && state.indexCards.length > 0) {
            state.indexCards.forEach(c => {
                if (c.status === 'locked' && (!c.tag || c.tag.includes('متاح') || c.tag.toLowerCase().includes('avail'))) {
                    c.tag = '🔒 Upcoming';
                    fixCount++;
                } else if (c.status === 'active' && (!c.tag || c.tag.includes('قريب') || c.tag.toLowerCase().includes('upcom'))) {
                    c.tag = '🎯 Available';
                    fixCount++;
                }
            });
        }

        this.audit();
        if (typeof applyStateToUI === 'function') applyStateToUI();
        if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
        if (typeof saveDraft === 'function') saveDraft();
        if (typeof playCorrectFX === 'function') playCorrectFX();
        if (typeof showAdminToast === 'function') showAdminToast(`⚡ Applied auto-fix to ${fixCount} item(s)!`);
    }
}

const StudioLinter = new StudioLinterEngine();

function openLinterModal() {
    if (typeof playSound === 'function') playSound('click');
    StudioLinter.audit();
    const modal = document.getElementById('linterModal');
    if (modal) modal.style.display = 'flex';
}

function closeLinterModal() {
    if (typeof playSound === 'function') playSound('click');
    const modal = document.getElementById('linterModal');
    if (modal) modal.style.display = 'none';
}

function runLinterCheck() {
    if (typeof playSound === 'function') playSound('click');
    StudioLinter.audit();
}

function autoFixLinter() {
    StudioLinter.autoFix();
}

