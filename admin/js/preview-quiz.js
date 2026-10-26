/**
 * Lesson Studio Interactive Quiz Simulator (preview-quiz.js)
 * Single Responsibility: Renders and manages the real-time quiz simulation inside the admin preview.
 */

function renderSimQuizView() {
    if (!state.quiz || state.quiz.length === 0) {
        return '<div style="text-align: center; color: var(--text-muted); padding: 30px;">No questions added yet in quiz section.</div>';
    }

    const totalQuestions = state.quiz.length;
    const totalPossibleScore = state.quiz.reduce((sum, q) => sum + (typeof q.points === 'number' ? q.points : 10), 0);

    // If quiz completed in simulator, show results screen (100% parity with quiz-engine.js)
    if (simQuizCompleted) {
        const percentage = totalPossibleScore > 0 ? Math.round((simQuizScore / totalPossibleScore) * 100) : 0;
        let gradeBadge = '';
        let gradeColor = 'var(--accent-primary, #00f3ff)';
        let trophyEmoji = '🏆';

        if (percentage >= 90) {
            gradeBadge = '🌟 Outstanding!';
            gradeColor = 'var(--accent-green, #10b981)';
            trophyEmoji = '🏆👑';
        } else if (percentage >= 75) {
            gradeBadge = '🎯 Very Good!';
            gradeColor = 'var(--accent-primary, #00f3ff)';
            trophyEmoji = '🎯✨';
        } else if (percentage >= 50) {
            gradeBadge = '👍 Good Effort!';
            gradeColor = 'var(--accent-orange, #ffb703)';
            trophyEmoji = '👏';
        } else {
            gradeBadge = '💪 Keep Practicing!';
            gradeColor = 'var(--accent-red, #ef4444)';
            trophyEmoji = '📚💡';
        }

        return `
            <div class="quiz-card" style="margin-top: 0; padding: 32px 24px; text-align: center; background: var(--card-bg); border: 1.5px solid var(--border-color); border-radius: 22px; box-shadow: 0 15px 40px rgba(0,0,0,0.5);">
                <div style="font-size: 3.8rem; margin-bottom: 12px; filter: drop-shadow(0 0 14px rgba(0,243,255,0.35));">${trophyEmoji}</div>
                <h2 style="color: ${gradeColor}; margin-bottom: 12px; font-size: 1.45rem;">${gradeBadge}</h2>
                
                <p style="font-size: 1.2rem; margin: 16px 0; color: var(--text-main, #f8fafc); line-height: 1.7;">
                    Simulation Score: 
                    <strong style="color: var(--accent-orange, #ffb703); font-size: 1.7rem;">${simQuizScore}</strong> 
                    out of <strong>${totalPossibleScore}</strong> points
                    <span style="display: block; font-size: 1rem; color: var(--text-muted); margin-top: 8px;">
                        (Percentage: <strong style="color: ${gradeColor}; font-size: 1.2rem;">${percentage}%</strong> | ✅ Correct Answers: ${simQuizCorrectCount} of ${totalQuestions})
                    </span>
                </p>

                <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; margin-top: 26px;">
                    <button type="button" onclick="restartSimQuiz()" class="action-btn" style="cursor: pointer; padding: 10px 24px;">🔄 Restart Quiz</button>
                    <button type="button" onclick="shuffleSimQuiz()" class="action-btn secondary" style="cursor: pointer; padding: 10px 22px;">🔀 Shuffle Order</button>
                </div>
            </div>
        `;
    }

    if (simQuizIndex >= totalQuestions) {
        simQuizIndex = totalQuestions - 1;
    }

    const q = state.quiz[simQuizIndex] || state.quiz[0];
    const emoji = q.emoji || '🎯';
    const qPoints = typeof q.points === 'number' ? q.points : 10;

    return `
        <div class="quiz-card" style="margin-top: 0; padding: 24px; text-align: center; background: var(--card-bg); border: 1.5px solid var(--border-color); border-radius: 20px;">
            <!-- Score Board (Exact Parity) -->
            <div class="score-board" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; padding: 12px 18px; background: rgba(11, 15, 25, 0.75); border: 1px solid var(--border-color); border-radius: 14px; font-weight: 800; font-size: 1.05rem;">
                <span>Question: <strong style="color: var(--accent-primary);">${simQuizIndex + 1}</strong> / <strong>${totalQuestions}</strong></span>
                <button type="button" onclick="shuffleSimQuiz()" class="action-btn secondary" style="padding: 4px 12px; font-size: 0.82rem;" title="Reshuffle questions randomly">🔀 Shuffle</button>
                <span>Score: <strong style="color: var(--accent-orange, #ffb703); font-size: 1.3rem;">${simQuizScore}</strong> 🌟</span>
            </div>

            <!-- Large Center Emoji Display -->
            <div class="emoji-display" style="font-size: 3.5rem; margin: 6px 0 14px; display: inline-block; filter: drop-shadow(0 0 12px rgba(0,243,255,0.3));">
                ${emoji}
            </div>

            <div class="question-text" style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 20px; line-height: 1.5;">
                <span>${q.question || 'Question Text'}</span>
                <button type="button" onclick="speakText('${(q.question || '').replace(/'/g, "\\'")}')" class="audio-btn" style="margin-left: 8px; vertical-align: middle; width: 36px; height: 36px; font-size: 1rem;" title="Listen to question">🔊</button>
            </div>

            <!-- Options Grid with Interactive State and Locking -->
            <div class="options-grid" style="display: flex; flex-direction: column; gap: 11px; max-width: 560px; margin: 0 auto 18px;">
                ${q.options.map((opt, i) => {
                    let optStyle = "display: flex; justify-content: space-between; align-items: center; width: 100%; text-align: left; padding: 12px 18px; border-radius: 14px; font-size: 1.05rem; font-weight: 700; transition: all 0.2s ease; cursor: pointer; border: 1.5px solid var(--border-color); background: rgba(19, 27, 46, 0.9); color: var(--text-main);";
                    let stateClass = "";

                    if (simQuizAnswered) {
                        if (opt.isCorrect) {
                            optStyle += " background: rgba(16, 185, 129, 0.22) !important; border-color: var(--accent-green, #10b981) !important; color: #10b981 !important; box-shadow: 0 0 16px rgba(16, 185, 129, 0.35);";
                            stateClass = "correct";
                        } else if (simQuizSelectedOptIdx === i) {
                            optStyle += " background: rgba(239, 68, 68, 0.22) !important; border-color: var(--accent-red, #ef4444) !important; color: #ef4444 !important;";
                            stateClass = "wrong";
                        } else {
                            optStyle += " opacity: 0.55; cursor: default;";
                        }
                    }

                    return `
                        <button type="button" 
                                onclick="handleSimQuizAnswer(${simQuizIndex}, ${i})" 
                                ${simQuizAnswered ? 'disabled' : ''}
                                class="quiz-option-btn ${stateClass}" 
                                style="${optStyle}">
                            <span>${opt.text || ''}</span>
                            <span onclick="event.stopPropagation(); speakText('${(opt.text || '').replace(/'/g, "\\'")}')" class="audio-btn" style="width: 32px; height: 32px; font-size: 0.9rem;" title="Listen to option">🔊</span>
                        </button>
                    `;
                }).join('')}
            </div>

            <!-- Dynamic Feedback Box -->
            <div id="simFeedbackBox" style="min-height: 28px; margin-bottom: 16px; font-weight: bold; font-size: 1.05rem;">
                ${simQuizAnswered ? (
                    simQuizSelectedOptIdx !== null && q.options[simQuizSelectedOptIdx]?.isCorrect
                        ? `<span style="color: var(--accent-green, #10b981);">${q.correctMsg || `Correct! Well done 🎯 (+${qPoints} points)`}</span>`
                        : `<span style="color: var(--accent-red, #ef4444);">${q.wrongMsg || 'Incorrect answer, try again!'}</span>`
                ) : ''}
            </div>

            <!-- Navigation Controls -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 18px; gap: 10px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px;">
                <button type="button" onclick="prevSimQuestion()" ${simQuizIndex === 0 ? 'disabled' : ''} class="action-btn secondary" style="padding: 8px 20px; font-size: 0.92rem;">⬅ Previous</button>
                
                ${simQuizAnswered ? `
                    <button type="button" onclick="nextSimQuestion()" class="action-btn" style="padding: 9px 24px; font-size: 0.95rem;">
                        ${simQuizIndex >= totalQuestions - 1 ? '🎉 Show Results & Grade' : 'Next Question ➔'}
                    </button>
                ` : `
                    <button type="button" onclick="nextSimQuestion()" class="action-btn secondary" style="padding: 8px 18px; font-size: 0.9rem; opacity: 0.7;">Skip ➔</button>
                `}
            </div>
        </div>
    `;
}

function handleSimQuizAnswer(qIdx, optIdx) {
    if (simQuizAnswered) return;
    const q = state.quiz[qIdx];
    if (!q) return;
    const opt = q.options[optIdx];
    if (!opt) return;

    simQuizAnswered = true;
    simQuizSelectedOptIdx = optIdx;
    const points = typeof q.points === 'number' ? q.points : 10;

    if (opt.isCorrect) {
        if (typeof playCorrectFX === 'function') playCorrectFX();
        simQuizScore += points;
        simQuizCorrectCount += 1;
        showAdminToast(`Correct! (+${points} points)`);
    } else {
        if (typeof playWrongFX === 'function') playWrongFX();
        simQuizWrongCount += 1;
        showAdminToast('Incorrect answer', false);
    }

    renderLiveSimulator();
}

function nextSimQuestion() {
    if (typeof playSound === 'function') playSound('click');
    if (simQuizIndex < state.quiz.length - 1) {
        simQuizIndex++;
        simQuizAnswered = false;
        simQuizSelectedOptIdx = null;
        renderLiveSimulator();
    } else {
        // Last question reached -> show results
        simQuizCompleted = true;
        if (typeof playSound === 'function') {
            const totalScore = state.quiz.reduce((sum, q) => sum + (typeof q.points === 'number' ? q.points : 10), 0);
            const percentage = totalScore > 0 ? Math.round((simQuizScore / totalScore) * 100) : 0;
            playSound(percentage >= 50 ? 'success' : 'click');
        }
        renderLiveSimulator();
    }
}

function prevSimQuestion() {
    if (typeof playSound === 'function') playSound('click');
    if (simQuizIndex > 0) {
        simQuizIndex--;
        simQuizAnswered = false;
        simQuizSelectedOptIdx = null;
        simQuizCompleted = false;
        renderLiveSimulator();
    }
}

function restartSimQuiz() {
    if (typeof playSound === 'function') playSound('click');
    simQuizIndex = 0;
    simQuizScore = 0;
    simQuizAnswered = false;
    simQuizSelectedOptIdx = null;
    simQuizCorrectCount = 0;
    simQuizWrongCount = 0;
    simQuizCompleted = false;

    // Reshuffle questions & options if utility available
    if (Array.isArray(state.quiz) && state.quiz.length > 1) {
        if (typeof window.shuffleArray === 'function') {
            state.quiz = window.shuffleArray(state.quiz);
            state.quiz.forEach(q => {
                if (Array.isArray(q.options)) {
                    q.options = window.shuffleArray(q.options);
                }
            });
        }
    }

    renderQuizQuestionsList();
    renderLiveSimulator();
    showAdminToast('🔄 Quiz reset and restarted successfully.');
}

function shuffleSimQuiz() {
    if (typeof playSound === 'function') playSound('click');
    if (Array.isArray(state.quiz) && state.quiz.length > 1) {
        if (typeof window.shuffleArray === 'function') {
            state.quiz = window.shuffleArray(state.quiz);
            state.quiz.forEach(q => {
                if (Array.isArray(q.options)) {
                    q.options = window.shuffleArray(q.options);
                }
            });
        } else {
            for (let i = state.quiz.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [state.quiz[i], state.quiz[j]] = [state.quiz[j], state.quiz[i]];
            }
        }
        simQuizIndex = 0;
        simQuizScore = 0;
        simQuizAnswered = false;
        simQuizSelectedOptIdx = null;
        simQuizCorrectCount = 0;
        simQuizWrongCount = 0;
        simQuizCompleted = false;

        renderQuizQuestionsList();
        renderLiveSimulator();
        showAdminToast('🔀 Questions and options shuffled randomly.');
    } else {
        showAdminToast('Need more than one question to shuffle.', false);
    }
}

