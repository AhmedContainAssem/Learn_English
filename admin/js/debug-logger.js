/**
 * Universal Diagnostic & Debug Logger Module (debug-logger.js)
 * Provides standardized, styled console output, runtime diagnostics, 
 * schema integrity validation, and debugging utilities across Lesson Studio.
 */

(function(window) {
    'use strict';

    const MODULE_STYLES = {
        'Auth': 'background: #e086ff; color: #0b0f19; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
        'State': 'background: #00f3ff; color: #0b0f19; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
        'Editor': 'background: #00ff88; color: #0b0f19; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
        'Generator': 'background: #ffd700; color: #0b0f19; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
        'Preview': 'background: #38bdf8; color: #0b0f19; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
        'GitHub': 'background: #a855f7; color: #ffffff; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
        'Linter': 'background: #f43f5e; color: #ffffff; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
        'Audio': 'background: #10b981; color: #ffffff; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
        'Diagnostics': 'background: #ff5e00; color: #ffffff; font-weight: bold; padding: 2px 6px; border-radius: 4px;'
    };

    class StudioLogger {
        constructor() {
            this.isDebugEnabled = true;
            this.logHistory = [];
            this.maxHistory = 100;
        }

        _format(module, message) {
            return [`%c[${module}]%c ${message}`, MODULE_STYLES[module] || MODULE_STYLES.Diagnostics, 'color: inherit;'];
        }

        _record(type, module, message, payload) {
            const entry = {
                timestamp: new Date().toISOString(),
                type,
                module,
                message,
                payload: payload ? JSON.parse(JSON.stringify(payload)) : null
            };
            this.logHistory.push(entry);
            if (this.logHistory.length > this.maxHistory) {
                this.logHistory.shift();
            }
        }

        info(module, message, payload = null) {
            this._record('INFO', module, message, payload);
            const [fmt, s1, s2] = this._format(module, message);
            if (payload) {
                console.log(fmt, s1, s2, payload);
            } else {
                console.log(fmt, s1, s2);
            }
        }

        warn(module, message, payload = null) {
            this._record('WARN', module, message, payload);
            const [fmt, s1, s2] = this._format(module, `⚠️ ${message}`);
            if (payload) {
                console.warn(fmt, s1, s2, payload);
            } else {
                console.warn(fmt, s1, s2);
            }
        }

        error(module, message, error = null) {
            this._record('ERROR', module, message, error);
            const [fmt, s1, s2] = this._format(module, `❌ ${message}`);
            if (error) {
                console.error(fmt, s1, s2, error);
            } else {
                console.error(fmt, s1, s2);
            }
        }

        group(module, title, callback) {
            const [fmt, s1, s2] = this._format(module, title);
            console.groupCollapsed(fmt, s1, s2);
            try {
                if (typeof callback === 'function') callback();
            } catch (err) {
                console.error('Error during log group execution:', err);
            } finally {
                console.groupEnd();
            }
        }

        /**
         * Comprehensive runtime diagnostics check
         */
        runDiagnostics() {
            const report = {
                timestamp: new Date().toISOString(),
                status: 'HEALTHY',
                checks: [],
                warnings: [],
                errors: []
            };

            // 1. Storage Integrity
            try {
                const testKey = '__studio_diag_test__';
                localStorage.setItem(testKey, '1');
                localStorage.removeItem(testKey);
                report.checks.push({ name: 'LocalStorage Available', passed: true });
            } catch (e) {
                report.errors.push('LocalStorage is restricted or quota exceeded.');
                report.status = 'DEGRADED';
            }

            // 2. Global State Validation
            if (typeof window.state === 'object' && window.state !== null) {
                const requiredFields = ['archetype', 'title', 'stage', 'unit'];
                const missing = requiredFields.filter(f => !window.state[f]);
                if (missing.length === 0) {
                    report.checks.push({ name: 'State Schema Valid', passed: true, details: `Archetype: ${window.state.archetype}` });
                } else {
                    report.warnings.push(`State missing fields: ${missing.join(', ')}`);
                }
            } else {
                report.errors.push('Global window.state is undefined or not loaded.');
                report.status = 'CRITICAL';
            }

            // 3. Audio Synth Engine
            if ('speechSynthesis' in window) {
                report.checks.push({ name: 'SpeechSynthesis Audio Engine', passed: true });
            } else {
                report.warnings.push('Web SpeechSynthesis API is not supported in this browser.');
            }

            // 4. Critical UI Container Bindings
            const essentialDomIds = ['mainStudioApp', 'previewModal', 'editorTabsBar', 'stageSelect'];
            const missingElements = essentialDomIds.filter(id => !document.getElementById(id));
            if (missingElements.length === 0) {
                report.checks.push({ name: 'DOM Element Bindings', passed: true });
            } else {
                report.warnings.push(`Missing DOM containers: ${missingElements.join(', ')}`);
            }

            // 5. GitHub Token Status
            let hasGhToken = false;
            try {
                const rawGhConfig = localStorage.getItem('assem_gh_publisher_config');
                if (rawGhConfig) {
                    const parsed = JSON.parse(rawGhConfig);
                    if (parsed && parsed.token && parsed.token.trim().length > 0) {
                        hasGhToken = true;
                    }
                }
            } catch (e) {
                // Ignore parse errors
            }

            report.checks.push({
                name: 'GitHub API Connection',
                passed: hasGhToken,
                details: hasGhToken ? 'Token configured in localStorage (assem_gh_publisher_config)' : 'Unconfigured (Offline / Direct Download mode)'
            });

            this.info('Diagnostics', `System Health Status: ${report.status}`, report);
            return report;
        }

        exportDebugBundle() {
            const bundle = {
                timestamp: new Date().toISOString(),
                state: window.state || null,
                manifest: window.STUDIO_MANIFEST || null,
                logs: this.logHistory,
                diagnostics: this.runDiagnostics()
            };
            return JSON.stringify(bundle, null, 2);
        }
    }

    window.StudioLogger = new StudioLogger();
    console.log(
        '%c🚀 Learn English Lesson Studio Debugger Ready%c Use StudioLogger.runDiagnostics() or click 🐞 Diagnostics in toolbar.',
        'background: #00f3ff; color: #0b0f19; font-weight: 800; padding: 4px 8px; border-radius: 4px;',
        'color: #00f3ff; font-weight: bold; margin-left: 6px;'
    );
})(window);
