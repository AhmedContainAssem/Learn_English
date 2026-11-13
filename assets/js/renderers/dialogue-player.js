/**
 * Dialogue Player & Renderer (dialogue-player.js)
 * Single Responsibility: Conversational Dialogue playback, sequential turn reading, and DOM rendering.
 */

(function (window) {
    'use strict';

    const UI = window.CurriculumUIPrimitives || {
        escapeHTML: str => String(str || ''),
        escapeJS: str => String(str || '').replace(/'/g, "\\'")
    };

    const DialoguePlayer = {
        isDiagPlaying: false,
        currentDiagIdx: 0,
        currentDeckIdx: 0,

        switchDeck: function (idx) {
            const decks = window.dialogueDecks || (window.lessonData && window.lessonData.dialogueDecks);
            if (decks && decks[idx]) {
                this.currentDeckIdx = idx;
                this.render(decks[idx]);
                if (typeof window.playSound === 'function') window.playSound('click');
            }
        },

        render: function (dialogueData) {
            if (!dialogueData) return;

            // Detect array of dialogue decks
            if (Array.isArray(dialogueData)) {
                if (dialogueData.length > 0 && (dialogueData[0].lines || dialogueData[0].turns || dialogueData[0].dialogue)) {
                    window.dialogueDecks = dialogueData;
                    const idx = this.currentDeckIdx || 0;
                    return this.render(dialogueData[idx] || dialogueData[0]);
                }
            }

            let title = 'حوار الاستماع التفاعلي (Listening Dialogue)';
            let subtitle = 'استمع للمحادثة وتدرّب على النطق بالإنجليزية ومتابعة الترجمة بالتزامن.';
            let characters = null;
            let rawTurns = [];

            if (Array.isArray(dialogueData)) {
                rawTurns = dialogueData;
            } else if (typeof dialogueData === 'object') {
                title = dialogueData.title || dialogueData.topic || title;
                subtitle = dialogueData.description || dialogueData.subtitle || subtitle;
                characters = dialogueData.characters || dialogueData.participants || null;
                rawTurns = dialogueData.lines || dialogueData.turns || dialogueData.dialogue || dialogueData.conversation || [];
            }

            if (!rawTurns || rawTurns.length === 0) return;

            // Normalize turns
            const turns = rawTurns.map(t => {
                let speakerName = t.speaker || t.name || 'Speaker';
                let avatar = t.avatar || '';
                let role = t.role || t.tags || '';

                if (characters) {
                    let c = null;
                    if (Array.isArray(characters)) {
                        c = characters.find(char => char.name === t.speaker);
                    } else if (characters[t.speaker]) {
                        c = characters[t.speaker];
                    }
                    if (c) {
                        speakerName = c.name || speakerName;
                        avatar = avatar || c.avatar || '';
                        role = role || c.role || '';
                    }
                }

                return {
                    speaker: avatar ? `${avatar} ${speakerName}` : speakerName,
                    en: t.en || t.textEn || t.text || t.english || '',
                    ar: t.ar || t.textAr || t.translation || t.arabic || '',
                    tags: role
                };
            });

            window.activeDialogueTurns = turns;

            const bannerContainer = document.getElementById('dialogue-banner-container');
            const listContainer = document.getElementById('dialogue-list-container') || document.getElementById('dialogueList');
            const mainContainer = document.getElementById('dialogue-container') || document.getElementById('dialogue');

            if (!mainContainer && !listContainer) return;

            const decks = window.dialogueDecks || (window.lessonData && window.lessonData.dialogueDecks);
            let deckSwitcherHtml = '';
            if (decks && Array.isArray(decks) && decks.length > 1) {
                const curIdx = this.currentDeckIdx || 0;
                deckSwitcherHtml = `
                <div class="dialogue-deck-switcher" style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
                    ${decks.map((d, dIdx) => `
                        <button type="button" class="badge ${dIdx === curIdx ? 'badge-active' : 'badge-gold'}" onclick="DialoguePlayer.switchDeck(${dIdx})" style="cursor: pointer; padding: 9px 18px; font-size: 0.95rem; border-radius: 25px; transition: all 0.25s ease;">
                            💬 ${UI.escapeHTML(d.title || ('المحادثة ' + (dIdx + 1)))}
                        </button>
                    `).join('')}
                </div>`;
            }

            const headerHtml = `
            ${deckSwitcherHtml}
            <div class="section-title">🗣️ ${UI.escapeHTML(title)}</div>
            <p class="section-hint" style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 20px;">
                💡 <strong>حوار استماع حي:</strong> ${UI.escapeHTML(subtitle)}
            </p>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; background: rgba(19, 27, 46, 0.85); padding: 14px 20px; border-radius: 14px; border: 1px solid var(--border-color);">
                <div style="font-weight: 700; color: var(--accent-primary); font-size: 1.05rem;">
                    📻 مشغل الاستماع التفاعلي للمحادثة (${turns.length} أدوار)
                </div>
                <div style="display: flex; gap: 10px;">
                    <button id="dialoguePlayAllBtn" class="action-btn next-btn" onclick="DialoguePlayer.toggleDialoguePlayAll()" style="font-size: 0.95rem; padding: 8px 18px;">
                        ▶️ تشغيل المحادثة كاملة بالتتابع
                    </button>
                </div>
            </div>`;

            const turnsHtml = `
            <div class="dialogue-list" id="dialogueList">
                ${turns.map((turn, idx) => `
                    <div class="dialogue-box" id="diag-turn-${idx}" style="background: rgba(19, 27, 46, 0.85); border: 1px solid var(--border-color); border-radius: 14px; padding: 18px; margin-bottom: 16px; transition: all 0.3s ease;">
                        <div class="dialogue-content">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                <div class="speaker-name" style="color: var(--accent-secondary); font-weight: 800; font-size: 1.05rem;">
                                    ${UI.escapeHTML(turn.speaker)}
                                </div>
                                ${turn.tags ? `<span class="tag-badge" style="font-size: 0.8rem; background: rgba(56, 189, 248, 0.15);">${UI.escapeHTML(turn.tags)}</span>` : ''}
                            </div>
                            <div class="en-text" style="font-size: 1.1rem; color: #f8fafc; font-weight: 600; line-height: 1.6; margin-bottom: 6px; direction: ltr; text-align: left;">
                                "${UI.escapeHTML(turn.en)}"
                            </div>
                            <div class="ar-text" style="font-size: 0.95rem; color: #94a3b8; line-height: 1.5;">
                                💡 ${UI.escapeHTML(turn.ar)}
                            </div>
                        </div>
                        <button type="button" class="audio-btn" onclick="DialoguePlayer.speakDiagTurn(${idx}, this);" title="استمع للنطق" style="margin-top: 10px;">🔊</button>
                    </div>
                `).join('')}
            </div>`;

            if (bannerContainer && listContainer) {
                bannerContainer.innerHTML = headerHtml;
                listContainer.innerHTML = turnsHtml;
            } else if (mainContainer) {
                mainContainer.innerHTML = headerHtml + turnsHtml;
            } else if (listContainer) {
                listContainer.innerHTML = headerHtml + turnsHtml;
            }
        },

        speakDiagTurn: function (idx, btn) {
            const turns = window.activeDialogueTurns || [];
            if (turns[idx] && typeof window.speakText === 'function') {
                window.speakText(turns[idx].en, btn);
            }
        },

        toggleDialoguePlayAll: function () {
            if (this.isDiagPlaying) {
                this.stopDialoguePlayAll();
            } else {
                this.startDialoguePlayAll();
            }
        },

        startDialoguePlayAll: function () {
            if (!('speechSynthesis' in window)) return;
            window.speechSynthesis.cancel();
            this.isDiagPlaying = true;
            this.currentDiagIdx = 0;
            const btn = document.getElementById('dialoguePlayAllBtn');
            if (btn) {
                btn.innerHTML = '⏸️ إيقاف القراءة المتتابعة (Stop)';
                btn.classList.add('playing');
            }
            this.playDiagStep(0);
        },

        stopDialoguePlayAll: function () {
            this.isDiagPlaying = false;
            if (window.speechSynthesis) window.speechSynthesis.cancel();
            const btn = document.getElementById('dialoguePlayAllBtn');
            if (btn) {
                btn.innerHTML = '▶️ تشغيل المحادثة كاملة بالتتابع';
                btn.classList.remove('playing');
            }
            document.querySelectorAll('.dialogue-box').forEach(b => b.style.boxShadow = 'none');
        },

        playDiagStep: function (idx) {
            const turns = window.activeDialogueTurns || [];
            if (!this.isDiagPlaying || idx >= turns.length) {
                this.stopDialoguePlayAll();
                return;
            }
            this.currentDiagIdx = idx;
            document.querySelectorAll('.dialogue-box').forEach(b => b.style.boxShadow = 'none');
            const box = document.getElementById('diag-turn-' + idx);
            if (box) {
                box.style.boxShadow = '0 0 15px rgba(0, 243, 255, 0.4)';
                if (typeof box.scrollIntoView === 'function') {
                    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
            const utter = new SpeechSynthesisUtterance(turns[idx].en);
            utter.lang = 'en-US';
            utter.rate = 0.92;
            utter.onend = () => {
                if (!this.isDiagPlaying) return;
                setTimeout(() => {
                    this.playDiagStep(idx + 1);
                }, 600);
            };
            utter.onerror = () => {
                this.stopDialoguePlayAll();
            };
            window.speechSynthesis.speak(utter);
        }
    };

    window.DialoguePlayer = DialoguePlayer;

})(typeof window !== 'undefined' ? window : this);
