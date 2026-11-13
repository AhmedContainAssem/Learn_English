/**
 * Base Renderer (base-renderer.js)
 * Clean Architecture & Object-Oriented Inheritance Foundation.
 * All specialized renderers inherit from BaseRenderer to eliminate code duplication (DRY)
 * and provide uniform handling of text escaping, BiDi wrapping, audio buttons, card rendering, and data normalization.
 */

(function (window) {
    'use strict';

    class BaseRenderer {
        constructor(name = 'BaseRenderer') {
            this.name = name;
        }

        escapeHTML(str) {
            if (str === null || str === undefined) return '';
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        escapeJS(str) {
            if (!str) return '';
            return String(str)
                .replace(/\\/g, '\\\\')
                .replace(/'/g, "\\'")
                .replace(/\r/g, '')
                .replace(/\n/g, '\\n');
        }

        /**
         * Isolate mixed English/Arabic text to prevent BiDi scramble in RTL layouts
         */
        wrapBidi(text) {
            if (!text) return '';
            const str = String(text);
            // If the string contains both Arabic and English characters, wrap English phrases with <bdi dir="ltr">
            const hasArabic = /[\u0600-\u06FF]/.test(str);
            const hasEnglish = /[a-zA-Z]/.test(str);
            if (!hasArabic || !hasEnglish) {
                return this.escapeHTML(str);
            }

            // Regex matches English sequences including slashes, 'vs', hyphens, etc.
            return str.replace(/([a-zA-Z0-9_\-\.\/]+(?:\s+(?:vs\.?|and|or|\/|\+)\s+[a-zA-Z0-9_\-\.\/]+)*|[a-zA-Z0-9\-_]{2,})/g, (match) => {
                if (/[a-zA-Z]/.test(match)) {
                    return `<bdi dir="ltr" class="inline-en-token" style="unicode-bidi: isolate; display: inline-block;">${this.escapeHTML(match)}</bdi>`;
                }
                return this.escapeHTML(match);
            });
        }

        /**
         * Render interactive audio button
         */
        renderAudioButton(audioText, options = {}) {
            if (!audioText) return '';
            const {
                icon = '🔊',
                size = 'default',
                title = 'استمع للنطق',
                extraClass = ''
            } = options;

            const sizeStyle = size === 'small' 
                ? 'width: 28px; height: 28px; font-size: 0.82rem; padding: 0;' 
                : '';

            return `
            <button type="button" class="audio-btn ${extraClass}" style="${sizeStyle}" 
                onclick="event.stopPropagation(); if(typeof speakText==='function') speakText('${this.escapeJS(audioText)}', this); if(typeof playSound==='function') playSound('click');" 
                title="${this.escapeHTML(title)}">
                ${icon}
            </button>`;
        }

        /**
         * Normalize example items into an array of { en, ar } objects
         */
        normalizeExamples(rawExamples) {
            if (!rawExamples) return [];
            let list = [];

            if (Array.isArray(rawExamples)) {
                list = rawExamples;
            } else if (typeof rawExamples === 'string') {
                list = rawExamples.split(/•|\n/).map(s => s.trim()).filter(Boolean);
            } else if (typeof rawExamples === 'object') {
                list = [rawExamples];
            }

            return list.map(item => {
                if (typeof item === 'string') {
                    // Check for Arabic translation inside brackets or after colon/dash
                    const bracketMatch = item.match(/^(.*?)\s*[\(\[（]([\u0600-\u06FF\s\d\.\,\-]+)[\)\]）]\s*$/);
                    if (bracketMatch) {
                        return { en: bracketMatch[1].trim(), ar: bracketMatch[2].trim() };
                    }
                    const colonMatch = item.match(/^(.*?)\s*(?:=|:|\/\/|➔|->)\s*([\u0600-\u06FF].*)$/);
                    if (colonMatch) {
                        return { en: colonMatch[1].trim(), ar: colonMatch[2].trim() };
                    }
                    return { en: item, ar: '' };
                }
                return {
                    en: item.en || item.example || item.sentence || item.textEn || '',
                    ar: item.ar || item.translation || item.meaning || item.textAr || ''
                };
            }).filter(ex => Boolean(ex.en || ex.ar));
        }

        /**
         * Render a structured list of examples with bilingual support and audio
         */
        renderExamplesList(examples) {
            const list = this.normalizeExamples(examples);
            if (list.length === 0) return '';

            return `
            <div class="card-examples-list" style="margin-top: 10px; display: flex; flex-direction: column; gap: 8px;">
                <div style="font-size: 0.85rem; font-weight: 700; color: var(--accent-secondary, #38bdf8); display: flex; align-items: center; gap: 6px;">
                    <span>💬</span> <span>أمثلة توضيحية:</span>
                </div>
                ${list.map(ex => `
                    <div class="example-item-box" style="background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 8px; padding: 8px 12px; font-size: 0.92rem;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                            <div class="example-en" style="direction: ltr; text-align: left; color: #f8fafc; font-weight: 600; flex: 1;">
                                ${this.escapeHTML(ex.en)}
                            </div>
                            ${this.renderAudioButton(ex.en, { size: 'small', title: 'استمع للمثال' })}
                        </div>
                        ${ex.ar ? `
                            <div class="example-ar" style="color: #94a3b8; font-size: 0.86rem; margin-top: 4px; direction: rtl; text-align: right;">
                                ${this.escapeHTML(ex.ar)}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>`;
        }

        /**
         * Unified Clickable Card Builder
         */
        renderCard(options) {
            const {
                tag = '',
                tagType = 'default',
                title = '',
                titleAr = '',
                audioText = '',
                meaning = '',
                details = '',
                detailsLabel = '',
                explanation = '',
                examples = [],
                customBody = '',
                extraClass = ''
            } = options;

            const audioPayload = audioText || title;
            const audioBtnHtml = audioPayload ? this.renderAudioButton(audioPayload) : '';
            const tagHtml = tag ? `<span class="tag-badge tag-${tagType}">${this.escapeHTML(tag)}</span>` : '';

            // Check if title has Arabic characters
            const isArTitle = /[\u0600-\u06FF]/.test(title);
            const titleClasses = isArTitle ? 'word-title font-bold' : 'word-en font-bold';

            const detailsHtml = details ? `
                <div class="details-box" style="margin-top: 8px; font-size: 0.92rem; color: #cbd5e1;">
                    ${detailsLabel ? `<strong style="color: var(--accent-orange, #f59e0b);">${this.escapeHTML(detailsLabel)}:</strong> ` : ''}
                    <span>${this.escapeHTML(details)}</span>
                </div>` : '';

            const explanationHtml = explanation ? `
                <div class="note-explanation-box" style="margin-top: 8px; background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 8px; padding: 10px 14px; color: #f1f5f9; font-size: 0.96rem; line-height: 1.6;">
                    <div style="font-weight: 700; color: #f59e0b; font-size: 0.88rem; margin-bottom: 4px; display: flex; align-items: center; gap: 4px;">
                        <span>💡</span> <span>الشرح والتوضيح:</span>
                    </div>
                    <div>${this.wrapBidi(explanation)}</div>
                </div>` : '';

            const examplesHtml = this.renderExamplesList(examples);

            return `
            <div class="card ${extraClass}" onclick="if(typeof playSound==='function') playSound('click')">
                <div class="card-header">
                    <div style="flex: 1; margin-inline-end: 10px;">
                        ${tagHtml}
                        <div class="${titleClasses}">${isArTitle ? this.wrapBidi(title) : this.escapeHTML(title)}</div>
                        ${titleAr ? `<div class="word-subtitle-ar" style="font-size: 0.88rem; color: #94a3b8; margin-top: 2px;">${this.escapeHTML(titleAr)}</div>` : ''}
                    </div>
                    ${audioBtnHtml}
                </div>
                <div class="card-body">
                    ${meaning ? `<div class="card-meaning-line" style="font-size: 1rem; color: var(--accent-cyan, #00f3ff); font-weight: 700; margin-bottom: 6px;"><strong>المعنى:</strong> ${this.escapeHTML(meaning)}</div>` : ''}
                    ${explanationHtml}
                    ${detailsHtml}
                    ${examplesHtml}
                    ${customBody}
                </div>
            </div>`;
        }

        /**
         * Unified Responsive Data Table
         */
        renderTable(options) {
            const headers = options.headers || [];
            const rows = options.rows || [];
            const tableClass = options.tableClass || 'data-table';

            return `
            <div class="table-responsive" style="margin-bottom: 25px;">
                <table class="${tableClass}">
                    <thead>
                        <tr>
                            ${headers.map(h => `<th>${this.escapeHTML(h)}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(row => `
                            <tr>
                                ${row.map((cell, idx) => `
                                    <td ${idx === 0 ? 'class="word-cell"' : ''}>${cell}</td>
                                `).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>`;
        }

        /**
         * Unified Section Header
         */
        renderSectionHeader(title, subtitle = '', icon = '📌') {
            return `
            <div class="section-title" style="display: flex; align-items: center; gap: 8px; margin-top: 28px; margin-bottom: 8px;">
                <span>${icon}</span>
                <span>${this.escapeHTML(title)}</span>
            </div>
            ${subtitle ? `<p class="section-hint" style="color: #94a3b8; margin-bottom: 16px; font-size: 0.95rem;">${this.escapeHTML(subtitle)}</p>` : ''}`;
        }
    }

    window.BaseRenderer = BaseRenderer;

})(typeof window !== 'undefined' ? window : this);
