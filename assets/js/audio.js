/**
 * Audio Engine & Speech Synthesis Module (audio.js)
 * Provides Web Audio API synthesized sound effects & Web Speech API TTS.
 * Supports play/stop toggle globally on any TTS trigger button across all lessons.
 */
(function (window) {
    'use strict';

    let audioContext = null;

    function getAudioContext() {
        if (!audioContext) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                audioContext = new AudioContextClass();
            }
        }
        return audioContext;
    }

    function ensureAudioUnlocked(callback) {
        const ctx = getAudioContext();
        if (!ctx) return;
        if (ctx.state === 'suspended') {
            ctx.resume().then(() => {
                if (typeof callback === 'function') callback(ctx);
            }).catch(() => {});
        } else {
            if (typeof callback === 'function') callback(ctx);
        }
    }

    function initAudio() {
        ensureAudioUnlocked();
    }

    function playTone(ctx, type) {
        try {
            const now = ctx.currentTime;
            const oscillator = ctx.createOscillator();
            const gain = ctx.createGain();

            if (type === 'click') {
                // Crisp, tactile UI button click sound
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(880, now);
                oscillator.frequency.exponentialRampToValueAtTime(440, now + 0.05);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
                oscillator.connect(gain);
                gain.connect(ctx.destination);
                oscillator.start(now);
                oscillator.stop(now + 0.07);
            } else if (type === 'success' || type === 'correct') {
                // Cheerful melodic rising chord (C5 -> E5 -> G5)
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(523.25, now);
                oscillator.frequency.setValueAtTime(659.25, now + 0.07);
                oscillator.frequency.setValueAtTime(783.99, now + 0.14);
                gain.gain.setValueAtTime(0.22, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
                oscillator.connect(gain);
                gain.connect(ctx.destination);
                oscillator.start(now);
                oscillator.stop(now + 0.35);
            } else if (type === 'error' || type === 'wrong') {
                // Gentle soft buzzer for wrong answer
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(260, now);
                oscillator.frequency.linearRampToValueAtTime(140, now + 0.2);
                gain.gain.setValueAtTime(0.18, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
                oscillator.connect(gain);
                gain.connect(ctx.destination);
                oscillator.start(now);
                oscillator.stop(now + 0.24);
            }

            setTimeout(() => {
                try {
                    oscillator.disconnect();
                    gain.disconnect();
                } catch (e) {}
            }, 400);
        } catch (e) {
            // gracefully ignore audio failure
        }
    }

    function playSound(type = 'click') {
        try {
            ensureAudioUnlocked((ctx) => {
                playTone(ctx, type);
            });
        } catch (e) {
            // ignore audio failures gracefully
        }
    }

    function playCorrectFX() {
        playSound('success');
    }

    function playWrongFX() {
        playSound('wrong');
    }

    // ========================================================
    // Global Universal Unstoppable/Stoppable TTS Toggle Management
    // ========================================================
    let currentSpeakingBtn = null;
    let currentSpeakingText = null;
    let lastClickedAudioBtn = null;
    let utteranceCounter = 0;
    let currentUtteranceId = 0;
    let chromeKeepAliveTimer = null;

    function resetButtonState(btn) {
        if (!btn) return;
        try {
            delete btn.dataset.ttsActive;
            btn.classList.remove('speaking', 'tts-speaking', 'is-playing');
            if (btn._origTTSHtml !== undefined) {
                btn.innerHTML = btn._origTTSHtml;
                delete btn._origTTSHtml;
            }
            if (btn._origTTSTitle !== undefined) {
                btn.setAttribute('title', btn._origTTSTitle);
                delete btn._origTTSTitle;
            }
        } catch (e) {}
    }

    function setButtonPlaying(btn) {
        if (!btn) return;
        try {
            btn.dataset.ttsActive = 'true';
            btn.classList.add('speaking', 'tts-speaking', 'is-playing');
            if (btn._origTTSHtml === undefined) {
                btn._origTTSHtml = btn.innerHTML;
            }
            if (btn._origTTSTitle === undefined) {
                btn._origTTSTitle = btn.getAttribute('title') || 'استمع للنطق الصوتي';
            }
            btn.setAttribute('title', 'انقر لإيقاف النطق (Stop)');
            if (btn.innerHTML.includes('🔊')) {
                btn.innerHTML = btn.innerHTML.replace(/🔊/g, '⏹️');
            } else if (!btn.innerHTML.includes('⏹️')) {
                btn.innerHTML = '⏹️ ' + btn.innerHTML;
            }
        } catch (e) {}
    }

    function findTriggerButton(explicitBtn) {
        if (explicitBtn && explicitBtn.nodeType === 1) return explicitBtn;
        if (lastClickedAudioBtn && lastClickedAudioBtn.isConnected) return lastClickedAudioBtn;
        try {
            if (window.event) {
                const target = window.event.target;
                if (target) {
                    const btn = target.closest('button, .audio-btn, .speak-btn');
                    if (btn) return btn;
                }
            }
        } catch (e) {}
        if (document.activeElement && (document.activeElement.tagName === 'BUTTON' || document.activeElement.classList.contains('audio-btn'))) {
            return document.activeElement;
        }
        return null;
    }

    function stopTTS() {
        currentUtteranceId = ++utteranceCounter;
        if (chromeKeepAliveTimer) {
            clearInterval(chromeKeepAliveTimer);
            chromeKeepAliveTimer = null;
        }
        if (typeof window.speechSynthesis !== 'undefined') {
            try {
                window.speechSynthesis.cancel();
            } catch (e) {}
        }
        if (currentSpeakingBtn) {
            resetButtonState(currentSpeakingBtn);
            currentSpeakingBtn = null;
        }
        // Safety: reset any orphaned buttons in DOM marked as active
        if (typeof document !== 'undefined') {
            document.querySelectorAll('[data-tts-active="true"], .tts-speaking').forEach(b => {
                resetButtonState(b);
            });
        }
        currentSpeakingText = null;
        window.isTTSSpeaking = false;
    }

    function cleanTextForSpeech(rawText) {
        if (!rawText) return '';
        // Replace en-dash, em-dash, and bullets with spaces
        let s = rawText.replace(/[\u2013\u2014\u2022]/g, ' ');
        // Extract Latin English characters, standard punctuation, and numbers
        let englishMatches = s.match(/[A-Za-z0-9\s'\-\.\,\/\:\?\!]+/g);
        if (englishMatches) {
            let cleaned = englishMatches.join(' ').replace(/\s+/g, ' ').trim();
            if (cleaned.length >= 1) {
                return cleaned;
            }
        }
        return rawText.trim();
    }

    function speakText(text, explicitBtn) {
        if (!text || typeof window.speechSynthesis === 'undefined') {
            return;
        }
        const textToSpeak = cleanTextForSpeech(text);
        if (!textToSpeak) return;

        const btn = findTriggerButton(explicitBtn);

        // ========================================================
        // UNIVERSAL TOGGLE:
        // If speech is playing AND student clicked same button OR same text
        // -> STOP IMMEDIATELY and return!
        // ========================================================
        const isCurrentlyPlaying = window.isTTSSpeaking || (window.speechSynthesis && window.speechSynthesis.speaking);
        if (isCurrentlyPlaying) {
            const isSameBtn = btn && (btn === currentSpeakingBtn || btn.dataset.ttsActive === 'true');
            const isSameText = currentSpeakingText === textToSpeak;
            if (isSameBtn || isSameText) {
                stopTTS();
                return;
            }
        }

        // If another speech was active, stop it cleanly first
        stopTTS();

        try {
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = 'en-US';
            utterance.rate = 0.92;

            const thisId = ++utteranceCounter;
            currentUtteranceId = thisId;

            if (btn) {
                currentSpeakingBtn = btn;
                setButtonPlaying(btn);
            }
            currentSpeakingText = textToSpeak;
            window.isTTSSpeaking = true;

            // Chrome keep-alive heartbeat for longer paragraphs
            if (!chromeKeepAliveTimer) {
                chromeKeepAliveTimer = setInterval(() => {
                    if (window.speechSynthesis && window.speechSynthesis.speaking) {
                        window.speechSynthesis.pause();
                        window.speechSynthesis.resume();
                    } else {
                        if (chromeKeepAliveTimer) {
                            clearInterval(chromeKeepAliveTimer);
                            chromeKeepAliveTimer = null;
                        }
                    }
                }, 10000);
            }

            utterance.onend = () => {
                if (thisId !== currentUtteranceId) return; // Stale or canceled utterance
                if (btn && currentSpeakingBtn === btn) {
                    resetButtonState(btn);
                    currentSpeakingBtn = null;
                }
                currentSpeakingText = null;
                window.isTTSSpeaking = false;
                if (chromeKeepAliveTimer) {
                    clearInterval(chromeKeepAliveTimer);
                    chromeKeepAliveTimer = null;
                }
            };

            utterance.onerror = (e) => {
                if (thisId !== currentUtteranceId) return; // Stale or canceled utterance
                if (btn && currentSpeakingBtn === btn) {
                    resetButtonState(btn);
                    currentSpeakingBtn = null;
                }
                currentSpeakingText = null;
                window.isTTSSpeaking = false;
                if (chromeKeepAliveTimer) {
                    clearInterval(chromeKeepAliveTimer);
                    chromeKeepAliveTimer = null;
                }
            };

            window.speechSynthesis.speak(utterance);
        } catch (e) {
            if (btn) resetButtonState(btn);
            currentSpeakingBtn = null;
            currentSpeakingText = null;
            window.isTTSSpeaking = false;
        }
    }

    // ========================================================
    // Capture-Phase Global Click Interceptor for Instant Stop
    // Intercepts clicks on active TTS buttons before inline handlers re-trigger!
    // ========================================================
    if (typeof document !== 'undefined') {
        document.addEventListener('click', (event) => {
            const btn = event.target.closest('button, .audio-btn, .speak-btn');
            if (btn) {
                lastClickedAudioBtn = btn;
                if (btn.dataset.ttsActive === 'true' || (btn === currentSpeakingBtn && window.isTTSSpeaking)) {
                    // Instantly stop playback and prevent re-triggering
                    event.preventDefault();
                    event.stopPropagation();
                    stopTTS();
                }
            }
        }, { capture: true });
    }

    // Attach to global window
    window.initAudio = initAudio;
    window.playSound = playSound;
    window.playCorrectFX = playCorrectFX;
    window.playWrongFX = playWrongFX;
    window.speakText = speakText;
    window.stopTTS = stopTTS;
    window.stopSpeech = stopTTS;
    window.toggleTTS = (text, btn) => speakText(text, btn);

})(typeof window !== 'undefined' ? window : this);
