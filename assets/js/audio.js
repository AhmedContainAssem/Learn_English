/**
 * Audio Engine & Speech Synthesis Module (audio.js)
 * Provides Web Audio API synthesized sound effects & Web Speech API TTS.
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

    function speakText(text) {
        if (!text || typeof window.speechSynthesis === 'undefined') {
            return;
        }
        try {
            // Clean up text: extract english terms if mixed with arabic/symbols
            let englishMatches = text.match(/[A-Za-z0-9\s'\-\.\,\/\:\?]+/g);
            let textToSpeak = text;
            if (englishMatches) {
                let cleaned = englishMatches.join(' ').replace(/\s+/g, ' ').trim();
                if (cleaned.length >= 1) {
                    textToSpeak = cleaned;
                }
            }

            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        } catch (e) {
            // ignore TTS error gracefully
        }
    }

    // Attach to global window
    window.initAudio = initAudio;
    window.playSound = playSound;
    window.playCorrectFX = playCorrectFX;
    window.playWrongFX = playWrongFX;
    window.speakText = speakText;

})(typeof window !== 'undefined' ? window : this);
