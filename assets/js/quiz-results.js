/**
 * Gamified Quiz Results Screen Renderer (quiz-results.js)
 * Single Responsibility: Calculates honors grades, trophy badges, and renders completion screen.
 */

(function (window) {
    'use strict';

    const QuizResultsRenderer = {
        render: function (engine) {
            engine.refreshElements();
            if (!engine.page.cardElement) return;

            const totalScore = engine.totalPossibleScore > 0 ? engine.totalPossibleScore : (engine.questions.length * 10);
            const percentage = totalScore > 0 ? Math.round((engine.score / totalScore) * 100) : 0;

            let gradeBadge = '';
            let gradeColor = 'var(--accent-primary, #00f3ff)';
            let trophyEmoji = '🏆';

            if (percentage >= 90) {
                gradeBadge = '🌟 ممتاز مع مرتبة الشرف (Outstanding)';
                gradeColor = 'var(--accent-green, #10b981)';
                trophyEmoji = '🏆👑';
            } else if (percentage >= 75) {
                gradeBadge = '🎯 جيد جداً (Very Good)';
                gradeColor = 'var(--accent-primary, #00f3ff)';
                trophyEmoji = '🎯✨';
            } else if (percentage >= 50) {
                gradeBadge = '👍 جيد ومحاولة طيبة (Good Effort)';
                gradeColor = 'var(--accent-orange, #ffb703)';
                trophyEmoji = '👏';
            } else {
                gradeBadge = '💪 تدرب أكثر وستتفوق في المحاولة القادمة!';
                gradeColor = 'var(--accent-red, #ef4444)';
                trophyEmoji = '📚💡';
            }

            if (typeof window.playSound === 'function') {
                window.playSound(percentage >= 50 ? 'success' : 'click');
            }

            engine.page.cardElement.innerHTML = `
                <div style="text-align: center; padding: 28px;">
                    <div style="font-size: 3.5rem; margin-bottom: 12px; filter: drop-shadow(0 0 15px rgba(0,243,255,0.4));">${trophyEmoji}</div>
                    <h2 style="color: ${gradeColor}; margin-bottom: 10px;">${gradeBadge}</h2>
                    <p style="font-size: 1.2rem; margin: 16px 0; color: var(--text-main, #f8fafc); line-height: 1.7;">
                        لقد حصلت على 
                        <strong style="color: var(--accent-orange, #ffb703); font-size: 1.6rem;">${engine.score}</strong> 
                        من إجمالي <strong>${totalScore}</strong> نقطة 
                        <span style="display: block; font-size: 1rem; color: var(--text-muted); margin-top: 4px;">
                            (النسبة المئوية: <strong style="color: ${gradeColor}; font-size: 1.15rem;">${percentage}%</strong> | ✅ الإجابات الصحيحة: ${engine.correctCount} من ${engine.questions.length})
                        </span>
                    </p>
                    <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin-top: 25px;">
                        <button onclick="quizEngine.restartQuiz()" class="action-btn" style="cursor: pointer;">🔄 إعادة الاختبار (أسئلة عشوائية)</button>
                        <a href="./index.html" class="action-btn secondary" style="text-decoration:none; display: inline-flex; align-items: center;">⬅ العودة لقائمة الدروس</a>
                    </div>
                </div>
            `;
        }
    };

    window.QuizResultsRenderer = QuizResultsRenderer;

})(typeof window !== 'undefined' ? window : this);
