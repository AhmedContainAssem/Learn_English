/**
 * Curriculum UI Primitives (ui-primitives.js)
 * Clean Architecture & DRY Foundation:
 * Reusable HTML component builders to eliminate template redundancy.
 */

(function (window) {
    'use strict';

    function escapeHTML(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function escapeJS(str) {
        if (!str) return '';
        return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    }

    const UIPrimitives = {
        escapeHTML: escapeHTML,
        escapeJS: escapeJS,

        /**
         * Render a unified clickable learning card with audio button
         */
        renderCard: function (options) {
            const {
                tag = '',
                title = '',
                audioText = '',
                meaning = '',
                details = '',
                detailsLabel = '',
                extraClass = '',
                icon = '🔊',
                customBody = ''
            } = options;

            const audioPayload = audioText || title;
            const audioBtnHtml = audioPayload ? `
                <button type="button" class="audio-btn" 
                    onclick="event.stopPropagation(); if(typeof speakText==='function') speakText('${escapeJS(audioPayload)}', this); if(typeof playSound==='function') playSound('click');" 
                    title="استمع للنطق">
                    ${icon}
                </button>` : '';

            const tagHtml = tag ? `<span class="tag-badge">${escapeHTML(tag)}</span>` : '';
            const detailsHtml = details ? `
                <div class="details-box" style="margin-top: 8px;">
                    ${detailsLabel ? escapeHTML(detailsLabel) + ': ' : ''}
                    <span>${escapeHTML(details)}</span>
                </div>` : '';

            return `
            <div class="card ${extraClass}" onclick="if(typeof playSound==='function') playSound('click')">
                <div class="card-header">
                    <div>
                        ${tagHtml}
                        <div class="word-en font-bold">${escapeHTML(title)}</div>
                    </div>
                    ${audioBtnHtml}
                </div>
                <div class="card-body">
                    ${meaning ? `<div><strong>المعنى:</strong> ${escapeHTML(meaning)}</div>` : ''}
                    ${detailsHtml}
                    ${customBody}
                </div>
            </div>`;
        },

        /**
         * Render a responsive data table
         */
        renderTable: function (options) {
            const { headers = [], rows = [], tableClass = 'data-table' } = options;
            return `
            <div class="table-responsive" style="margin-bottom: 25px;">
                <table class="${tableClass}">
                    <thead>
                        <tr>
                            ${headers.map(h => `<th>${escapeHTML(h)}</th>`).join('')}
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
        },

        /**
         * Render a section subtitle banner
         */
        renderSectionHeader: function (title, subtitle = '') {
            return `
            <div class="section-sub-banner" style="margin: 24px 0 14px 0;">
                <h3 class="section-subtitle">${escapeHTML(title)}</h3>
                ${subtitle ? `<p class="section-sub-desc text-muted">${escapeHTML(subtitle)}</p>` : ''}
            </div>`;
        }
    };

    window.CurriculumUIPrimitives = UIPrimitives;

})(typeof window !== 'undefined' ? window : this);
