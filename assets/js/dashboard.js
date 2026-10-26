/**
 * Platform Dashboard & Home Page Hub Orchestrator (dashboard.js)
 * Responsible for homepage stage accordions, filters, search, and resume-learning widgets.
 * Follows Single Responsibility Principle (SRP) and Separation of Concerns (SoC).
 */

(function (window) {
    'use strict';

    function normalizeAr(str) {
        if (window.AssemUtils && typeof window.AssemUtils.normalizeAr === 'function') {
            return window.AssemUtils.normalizeAr(str);
        }
        if (!str) return '';
        return str
            .toLowerCase()
            .replace(/[أإآ]/g, 'ا')
            .replace(/ة/g, 'ه')
            .replace(/ى/g, 'ي')
            .replace(/[\u064B-\u0652]/g, '')
            .trim();
    }

    function initCollapsibleSections() {
        const collapsibleGroups = document.querySelectorAll('.stage-group, .collapsible-unit, [data-collapsible="true"]');
        if (!collapsibleGroups.length) return;

        collapsibleGroups.forEach(group => {
            if (group.dataset.accordionInit === 'true') return;
            group.dataset.accordionInit = 'true';

            const header = group.querySelector('.stage-header, .collapsible-header');
            if (!header) return;

            header.setAttribute('role', 'button');
            header.setAttribute('tabindex', '0');
            const isInitiallyExpanded = group.classList.contains('is-expanded');
            header.setAttribute('aria-expanded', isInitiallyExpanded ? 'true' : 'false');

            const toggleSection = (event) => {
                if (event.target.closest('a, button:not(.stage-accordion-toggle, .collapsible-accordion-toggle)')) return;
                event.preventDefault();
                event.stopPropagation();

                if (typeof window.toggleCollapsibleUnit === 'function') {
                    window.toggleCollapsibleUnit(header);
                } else {
                    const willExpand = !group.classList.contains('is-expanded') && !group.classList.contains('active');
                    group.classList.toggle('is-expanded', willExpand);
                    group.classList.toggle('active', willExpand);
                    header.setAttribute('aria-expanded', willExpand ? 'true' : 'false');

                    if (typeof window.playSound === 'function') {
                        window.playSound('click');
                    }
                }
            };

            header.addEventListener('click', toggleSection);
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSection(e);
                }
            });
        });
    }

    function initStageFilters() {
        const filterNav = document.querySelector('.stages-filter-nav');
        if (!filterNav) return;
        const stageGroups = document.querySelectorAll('.stage-group[data-stage]');
        if (!stageGroups.length) return;

        const filterBtns = filterNav.querySelectorAll('.stage-filter-btn');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                stageGroups.forEach(group => {
                    const header = group.querySelector('.stage-header');
                    if (filter === 'all') {
                        group.style.display = '';
                    } else if (group.dataset.stage === filter) {
                        group.style.display = '';
                        group.classList.add('is-expanded');
                        if (header) header.setAttribute('aria-expanded', 'true');
                    } else {
                        group.style.display = 'none';
                        group.classList.remove('is-expanded');
                        if (header) header.setAttribute('aria-expanded', 'false');
                    }
                });
            });
        });
    }

    function initDashboardSearch() {
        const searchInput = document.getElementById('dashboardSearchInput');
        if (!searchInput) return;

        const stageGroups = document.querySelectorAll('.stage-group');
        const filterNav = document.querySelector('.stages-filter-nav');

        searchInput.addEventListener('input', () => {
            const query = normalizeAr(searchInput.value);
            const activeFilter = filterNav ? filterNav.querySelector('.stage-filter-btn.active')?.dataset.filter || 'all' : 'all';

            if (!query) {
                stageGroups.forEach(group => {
                    const header = group.querySelector('.stage-header');
                    const matchStage = (activeFilter === 'all' || group.dataset.stage === activeFilter);
                    group.style.display = matchStage ? '' : 'none';
                    if (activeFilter !== 'all' && matchStage) {
                        group.classList.add('is-expanded');
                        if (header) header.setAttribute('aria-expanded', 'true');
                    }
                    group.querySelectorAll('.grade-card, .featured-course-card').forEach(card => card.style.display = '');
                });
                return;
            }

            stageGroups.forEach(group => {
                let groupHasMatch = false;
                const cards = group.querySelectorAll('.grade-card, .featured-course-card');
                const header = group.querySelector('.stage-header');
                
                cards.forEach(card => {
                    const text = normalizeAr(card.textContent || '');
                    if (text.includes(query)) {
                        card.style.display = '';
                        groupHasMatch = true;
                    } else {
                        card.style.display = 'none';
                    }
                });

                if (groupHasMatch) {
                    group.style.display = '';
                    group.classList.add('is-expanded');
                    if (header) header.setAttribute('aria-expanded', 'true');
                } else {
                    group.style.display = 'none';
                }
            });
        });
    }

    function initLessonTrackingAndResume() {
        const resumeContainer = document.getElementById('dashboardResumeContainer');
        if (!resumeContainer) return;

        try {
            let data = null;
            if (window.AssemStorage && typeof window.AssemStorage.get === 'function') {
                data = window.AssemStorage.get('assem_recent_lesson', null);
            } else {
                const saved = localStorage.getItem('assem_recent_lesson');
                data = saved ? JSON.parse(saved) : null;
            }

            let resumeHtml = '';
            if (data && data.title && data.url) {
                resumeHtml = `
                    <div class="resume-learning-banner" role="complementary" aria-label="متابعة آخر درس">
                        <div class="resume-info">
                            <span class="resume-label">📖 تابع من حيث توقفت:</span>
                            <span class="resume-title">${data.title}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:10px;">
                            <a href="${data.url}" class="resume-btn">استئناف المذاكرة ←</a>
                            <button class="resume-dismiss" type="button" title="إخفاء" onclick="this.closest('.resume-learning-banner').remove(); if(window.AssemStorage) { window.AssemStorage.remove('assem_recent_lesson'); } else { localStorage.removeItem('assem_recent_lesson'); }">✕</button>
                        </div>
                    </div>
                `;
            }

            // Quick Blitz Widget
            let blitzHtml = '';
            const practiceBank = (window.AssemStorage && typeof window.AssemStorage.getPracticeBank === 'function')
                ? window.AssemStorage.getPracticeBank()
                : [];

            if (practiceBank.length > 0) {
                blitzHtml = `
                    <div class="daily-blitz-banner" role="region" aria-label="تحدي المراجعة السريعة">
                        <div class="blitz-info">
                            <span class="blitz-icon">⚡</span>
                            <div>
                                <h3 class="blitz-title">تحدي المراجعة السريعة (Quick Blitz)</h3>
                                <p class="blitz-desc">لديك <strong>${practiceBank.length}</strong> كلمة جاهزة للمراجعة والتثبيت بالبطاقات التفاعلية.</p>
                            </div>
                        </div>
                        <button type="button" class="blitz-btn" onclick="const hubBtn = document.getElementById('practiceHubBtn'); if(hubBtn) hubBtn.click();">
                            <span>🚀 ابدأ المراجعة (3 دقائق)</span>
                        </button>
                    </div>
                `;
            }

            resumeContainer.innerHTML = resumeHtml + blitzHtml;
        } catch (e) {
            // Ignore storage errors
        }
    }

    function initDashboard() {
        initCollapsibleSections();
        initStageFilters();
        initDashboardSearch();
        initLessonTrackingAndResume();
    }

    // Attach to global window
    window.AssemDashboard = {
        init: initDashboard,
        initCollapsibleSections,
        initStageFilters,
        initDashboardSearch,
        initLessonTrackingAndResume
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDashboard);
    } else {
        initDashboard();
    }

})(typeof window !== 'undefined' ? window : this);
