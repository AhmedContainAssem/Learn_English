/**
 * Lesson Studio Grammar & Presentation Slides Builder Module (slides-builder.js)
 * Clean Architecture: Manages slide items, bulk auto-generation, reordering, and live simulator presentation.
 */

function renderSlidesList() {
    const list = document.getElementById('slidesList');
    if (!list) return;

    if (!Array.isArray(state.grammarSlides)) state.grammarSlides = [];
    list.innerHTML = '';
    const total = state.grammarSlides.length;

    // Canva-style Drag & Drop WebP Converter Area
    const dropZoneHtml = `
        <div id="slidesDragDropArea" class="slides-dropzone mb-md" onclick="document.getElementById('slideFileInput').click()">
            <input type="file" id="slideFileInput" multiple accept="image/*" style="display:none;" onchange="handleSlideFilesSelect(this.files)">
            <div style="font-size: 2rem; margin-bottom: 6px;">📁 ⚡</div>
            <div style="font-weight: 800; color: var(--accent-primary); font-size: 1.05rem; margin-bottom: 4px;">
                اسحب وأفلت صور الشرح هنا (PNG, JPG, WebP) أو اضغط للاختيار
            </div>
            <div style="color: var(--text-muted); font-size: 0.85rem;">
                المنصة ستقوم بفحص الصور وتحويلها تلقائياً إلى صيغة WebP فائقة السرعة وتوليد الشرائح فوراً!
            </div>
        </div>
    `;

    if (total === 0) {
        list.innerHTML = dropZoneHtml + `
            <div class="empty-state-card" style="background: rgba(19, 27, 46, 0.6); border: 2px dashed rgba(56, 189, 248, 0.3); border-radius: 14px; padding: 24px; text-align: center; margin-bottom: 16px;">
                <h4 style="color: var(--accent-primary); margin: 0 0 6px 0; font-size: 1.1rem;">أو أضف الشرائح بالطريقة التي تفضلها:</h4>
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 12px;">
                    <button type="button" onclick="addSlideItem()" class="action-btn secondary btn-sm-padding">➕ إضافة شريحة يدوياً</button>
                    <button type="button" onclick="openBulkSlidesModal()" class="action-btn btn-sm-padding" style="background: var(--accent-primary); color: #0b0f19; font-weight: 800;">⚡ معالج التوليد السريع لمجلد شرائح</button>
                </div>
            </div>`;
        setupSlidesDropListener();
        return;
    }

    list.innerHTML = dropZoneHtml;
    setupSlidesDropListener();

    state.grammarSlides.forEach((slide, idx) => {
        const el = document.createElement('div');
        el.className = 'item-card-builder';
        el.style.borderRight = '4px solid var(--accent-primary)';
        el.innerHTML = `
            <div class="item-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="item-badge" style="background: rgba(0, 243, 255, 0.15); color: var(--accent-primary); border: 1px solid var(--accent-primary); font-weight: bold; padding: 3px 10px; border-radius: 6px;">
                        ⚡ شريحة #${idx + 1} من ${total}
                    </span>
                    <span style="color: #94a3b8; font-size: 0.85rem; direction: ltr;">${slide.title ? escapeHTML(slide.title.substring(0, 30)) : ''}</span>
                </div>
                <div class="d-flex gap-xs items-center">
                    <button type="button" onclick="moveSlideItem(${idx}, -1)" ${idx === 0 ? 'disabled' : ''} class="action-btn secondary" style="padding: 4px 8px; font-size: 0.85rem;" title="تحريك لأعلى">⬆️</button>
                    <button type="button" onclick="moveSlideItem(${idx}, 1)" ${idx === total - 1 ? 'disabled' : ''} class="action-btn secondary" style="padding: 4px 8px; font-size: 0.85rem;" title="تحريك لأسفل">⬇️</button>
                    <button type="button" onclick="removeSlideItem(${idx})" class="btn-delete-item" style="padding: 4px 10px; font-size: 0.85rem; color: #f87171; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 6px; cursor: pointer;">🗑️ حذف</button>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 140px 1fr; gap: 14px; align-items: start;">
                <div style="background: rgba(11, 15, 25, 0.8); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 8px; height: 100px; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;">
                    <img id="slideThumb_${idx}" src="${escapeHTML(slide.imageUrl || '')}" alt="Slide Preview" style="max-width: 100%; max-height: 100%; object-fit: contain; ${slide.imageUrl ? '' : 'display: none;'}" onerror="this.style.display='none'; document.getElementById('slideThumbPlaceholder_${idx}').style.display='block';">
                    <div id="slideThumbPlaceholder_${idx}" style="color: #64748b; font-size: 0.8rem; text-align: center; padding: 6px; ${slide.imageUrl ? 'display: none;' : 'display: block;'}">🖼️ لا توجد صورة</div>
                </div>

                <div class="form-grid" style="display: grid; grid-template-columns: 1fr; gap: 10px;">
                    <div class="form-group" style="margin: 0;">
                        <label class="form-label" style="font-size: 0.85rem; margin-bottom: 4px; display: flex; justify-content: space-between;">
                            <span>مسار / رابط صورة الشريحة (Image URL - WebP):</span>
                            <span style="color: var(--accent-primary); font-size: 0.8rem;">.webp مُوصى به</span>
                        </label>
                        <input type="text" class="form-input" placeholder="e.g. ../../assets/images/slides/slide-1.webp أو ./sec 3 storybook photos/1.webp" value="${escapeHTML(slide.imageUrl || '')}" oninput="updateSlideField(${idx}, 'imageUrl', this.value)" style="direction: ltr; font-family: monospace; font-size: 0.85rem;">
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <div class="form-group" style="margin: 0;">
                            <label class="form-label" style="font-size: 0.85rem; margin-bottom: 4px;">عنوان الشريحة (Slide Title):</label>
                            <input type="text" class="form-input" placeholder="e.g. زمن المضارع التام واستخداماته" value="${escapeHTML(slide.title || '')}" oninput="updateSlideField(${idx}, 'title', this.value)">
                        </div>
                        <div class="form-group" style="margin: 0;">
                            <label class="form-label" style="font-size: 0.85rem; margin-bottom: 4px;">ملاحظات الشريحة / وسوم (اختياري):</label>
                            <input type="text" class="form-input" placeholder="e.g. شرح القاعدة الأساسية • تكوين الزمن" value="${escapeHTML(slide.notes || '')}" oninput="updateSlideField(${idx}, 'notes', this.value)">
                        </div>
                    </div>
                </div>
            </div>`;
        list.appendChild(el);
    });
}

function updateSlideField(index, field, value) {
    if (!state.grammarSlides[index]) return;
    state.grammarSlides[index][field] = value;
    if (field === 'imageUrl') {
        const thumb = document.getElementById(`slideThumb_${index}`);
        const ph = document.getElementById(`slideThumbPlaceholder_${index}`);
        if (thumb && ph) {
            thumb.src = value.trim();
            thumb.style.display = value.trim() ? 'block' : 'none';
            ph.style.display = value.trim() ? 'none' : 'block';
        }
    }
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

function addSlideItem(slideData = null) {
    if (typeof playSound === 'function') playSound('click');
    if (!Array.isArray(state.grammarSlides)) state.grammarSlides = [];
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Add grammar slide');

    const nextNum = state.grammarSlides.length + 1;
    state.grammarSlides.push(slideData || {
        id: Date.now() + Math.random(),
        title: `شريحة ${nextNum}: شرح القاعدة`,
        imageUrl: '',
        notes: ''
    });

    renderSlidesList();
    if (typeof renderEditorNavigation === 'function') renderEditorNavigation();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    if (typeof showAdminToast === 'function') showAdminToast(`⚡ تمت إضافة شريحة #${nextNum}`);

    setTimeout(() => {
        const list = document.getElementById('slidesList');
        if (list && list.lastElementChild) list.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
}

function removeSlideItem(index) {
    if (typeof playSound === 'function') playSound('click');
    if (!state.grammarSlides || !state.grammarSlides[index]) return;
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot(`Delete slide #${index + 1}`);

    state.grammarSlides.splice(index, 1);
    if (simCurrentSlide >= state.grammarSlides.length) {
        simCurrentSlide = Math.max(0, state.grammarSlides.length - 1);
    }
    renderSlidesList();
    if (typeof renderEditorNavigation === 'function') renderEditorNavigation();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    if (typeof showAdminToast === 'function') showAdminToast('🗑️ تم حذف الشريحة');
}

function moveSlideItem(index, direction) {
    if (typeof playSound === 'function') playSound('click');
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= state.grammarSlides.length) return;
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot(`Reorder slide #${index + 1}`);

    const temp = state.grammarSlides[index];
    state.grammarSlides[index] = state.grammarSlides[newIndex];
    state.grammarSlides[newIndex] = temp;

    renderSlidesList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

function openBulkSlidesModal() {
    if (typeof playSound === 'function') playSound('click');
    let modal = document.getElementById('bulkSlidesModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'bulkSlidesModal';
        modal.className = 'modal-backdrop';
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.85);backdrop-filter:blur(6px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;';
        modal.innerHTML = `
            <div style="background:#0f172a;border:1.5px solid var(--accent-primary);border-radius:18px;max-width:620px;width:100%;padding:24px;box-shadow:0 10px 40px rgba(0,243,255,0.2);direction:rtl;text-align:right;">
                <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:12px;margin-bottom:18px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <span style="font-size:1.5rem;">⚡</span>
                        <h3 style="margin:0;color:var(--accent-primary);font-size:1.25rem;">المولد السريع لمجلد الشرائح (Bulk Slides Generator)</h3>
                    </div>
                    <button type="button" onclick="closeBulkSlidesModal()" style="background:none;border:none;color:#94a3b8;font-size:1.3rem;cursor:pointer;">✕</button>
                </div>
                <p style="color:#cbd5e1;font-size:0.9rem;line-height:1.6;margin-bottom:18px;">
                    إذا كان لديك مجلد يحتوي على شرائح مرقمة ومصدرة من PowerPoint أو Canva (مثل <code>slide-1.webp</code> إلى <code>slide-15.webp</code>)، يمكنك توليد جميع الشرائح دفعة واحدة بضغطة زر دون كتابتها يدوياً!
                </p>
                <div class="form-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:18px;">
                    <div class="form-group" style="grid-column:span 2;margin:0;">
                        <label class="form-label" style="font-size:0.85rem;margin-bottom:4px;">مسار مجلد الشرائح (Folder Path):</label>
                        <input type="text" id="bulkSlideFolderPath" class="form-input" placeholder="e.g. ../../assets/images/slides/if_conditions/" value="../../assets/images/slides/" style="direction:ltr;font-family:monospace;">
                    </div>
                    <div class="form-group" style="margin:0;">
                        <label class="form-label" style="font-size:0.85rem;margin-bottom:4px;">بادئة اسم الملف (File Prefix):</label>
                        <input type="text" id="bulkSlidePrefix" class="form-input" placeholder="e.g. slide- أو Present_Perfect_p" value="slide-" style="direction:ltr;font-family:monospace;">
                    </div>
                    <div class="form-group" style="margin:0;">
                        <label class="form-label" style="font-size:0.85rem;margin-bottom:4px;">امتداد الصور (Extension):</label>
                        <select id="bulkSlideExt" class="form-select" style="direction:ltr;font-family:monospace;">
                            <option value=".webp" selected>.webp (مُوصى به)</option>
                            <option value=".png">.png</option>
                            <option value=".jpg">.jpg</option>
                        </select>
                    </div>
                    <div class="form-group" style="margin:0;">
                        <label class="form-label" style="font-size:0.85rem;margin-bottom:4px;">رقم أول شريحة (Start Number):</label>
                        <input type="number" id="bulkSlideStart" class="form-input" value="1" min="1" max="100">
                    </div>
                    <div class="form-group" style="margin:0;">
                        <label class="form-label" style="font-size:0.85rem;margin-bottom:4px;">إجمالي عدد الشرائح (Count):</label>
                        <input type="number" id="bulkSlideCount" class="form-input" value="10" min="1" max="60">
                    </div>
                </div>
                <div style="background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);border-radius:8px;padding:10px 14px;margin-bottom:20px;font-size:0.85rem;color:#38bdf8;">
                    💡 <strong>معاينة المسار الأول الناتج:</strong> <span id="bulkSlideSamplePreview" style="direction:ltr;display:inline-block;font-family:monospace;">../../assets/images/slides/slide-1.webp</span>
                </div>
                <div style="display:flex;justify-content:flex-end;gap:10px;">
                    <button type="button" onclick="closeBulkSlidesModal()" class="action-btn secondary">إلغاء</button>
                    <button type="button" onclick="executeBulkSlidesGeneration()" class="action-btn" style="background:var(--accent-primary);color:#0b0f19;font-weight:800;">🚀 توليد الشرائح الآن</button>
                </div>
            </div>`;
        document.body.appendChild(modal);

        const updateSample = () => {
            const folder = (document.getElementById('bulkSlideFolderPath')?.value || '').trim();
            const prefix = (document.getElementById('bulkSlidePrefix')?.value || '').trim();
            const ext = document.getElementById('bulkSlideExt')?.value || '.webp';
            const start = document.getElementById('bulkSlideStart')?.value || '1';
            const previewEl = document.getElementById('bulkSlideSamplePreview');
            if (previewEl) previewEl.textContent = `${folder}${folder.endsWith('/') ? '' : '/'}${prefix}${start}${ext}`;
        };
        ['bulkSlideFolderPath', 'bulkSlidePrefix', 'bulkSlideExt', 'bulkSlideStart'].forEach(id => {
            document.getElementById(id)?.addEventListener('input', updateSample);
        });
    }
    modal.style.display = 'flex';
}

function closeBulkSlidesModal() {
    const modal = document.getElementById('bulkSlidesModal');
    if (modal) modal.style.display = 'none';
}

function executeBulkSlidesGeneration() {
    let folder = (document.getElementById('bulkSlideFolderPath')?.value || '').trim();
    const prefix = (document.getElementById('bulkSlidePrefix')?.value || '').trim();
    const ext = document.getElementById('bulkSlideExt')?.value || '.webp';
    const start = parseInt(document.getElementById('bulkSlideStart')?.value || '1', 10);
    const count = parseInt(document.getElementById('bulkSlideCount')?.value || '10', 10);

    if (!folder.endsWith('/')) folder += '/';
    if (count < 1 || count > 60) {
        if (typeof showAdminToast === 'function') showAdminToast('يرجى اختيار عدد شرائح بين 1 و 60', false);
        return;
    }

    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot(`Bulk generate ${count} slides`);
    if (!Array.isArray(state.grammarSlides)) state.grammarSlides = [];

    for (let i = 0; i < count; i++) {
        const num = start + i;
        state.grammarSlides.push({
            id: Date.now() + i,
            title: `شريحة ${state.grammarSlides.length + 1}`,
            imageUrl: `${folder}${prefix}${num}${ext}`,
            notes: `شريحة رقم ${num}`
        });
    }

    closeBulkSlidesModal();
    renderSlidesList();
    if (typeof renderEditorNavigation === 'function') renderEditorNavigation();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    if (typeof showAdminToast === 'function') showAdminToast(`🎉 تم توليد ${count} شريحة بنجاح!`);
}

function renderSlidesSimulator() {
    const slides = state.grammarSlides || [];
    const total = slides.length;

    if (total === 0) {
        return `<div style="background:rgba(19,27,46,0.6);border:1px dashed rgba(56,189,248,0.3);border-radius:12px;padding:24px;text-align:center;color:var(--text-muted);">
            ⚡ لا توجد شرائح مضافة حتى الآن. أضف شرائح في تبويب "شرائح القواعد" لتشاهد المعاينة هنا.
        </div>`;
    }

    if (simCurrentSlide < 0 || simCurrentSlide >= total) simCurrentSlide = 0;
    const cur = slides[simCurrentSlide] || {};

    return `
        <div class="slides-simulator-wrapper" style="background:rgba(11,15,25,0.9);border:1px solid var(--accent-primary);border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,243,255,0.15);">
            <div style="padding:12px 18px;background:rgba(19,27,46,0.9);border-bottom:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;align-items:center;">
                <div style="font-weight:800;color:var(--accent-primary);font-size:1.05rem;">
                    ⚡ ${cur.title || `شريحة ${simCurrentSlide + 1}`}
                </div>
                <div style="background:rgba(0,243,255,0.15);color:var(--accent-primary);border:1px solid var(--accent-primary);padding:2px 10px;border-radius:20px;font-size:0.8rem;font-weight:bold;">
                    شريحة ${simCurrentSlide + 1} من ${total}
                </div>
            </div>
            <div style="padding:16px;text-align:center;background:#000;min-height:280px;display:flex;align-items:center;justify-content:center;position:relative;">
                <img src="${escapeHTML(cur.imageUrl || '')}" alt="${escapeHTML(cur.title || '')}" style="max-width:100%;max-height:480px;object-fit:contain;border-radius:8px;${cur.imageUrl ? '' : 'display:none;'}" onerror="this.style.display='none';document.getElementById('simSlidePlaceholder').style.display='block';">
                <div id="simSlidePlaceholder" style="color:#64748b;font-size:0.95rem;${cur.imageUrl ? 'display:none;' : 'display:block;'}">
                    🖼️ مسار الصورة غير متوفر أو غير صحيح.<br><small style="color:#94a3b8;font-family:monospace;">${escapeHTML(cur.imageUrl || '')}</small>
                </div>
            </div>
            <div style="padding:12px 18px;background:rgba(19,27,46,0.9);border-top:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;align-items:center;">
                <button type="button" onclick="changeSimSlide(-1)" class="action-btn secondary" ${simCurrentSlide === 0 ? 'disabled' : ''} style="padding:6px 14px;font-size:0.85rem;">⬅️ الشريحة السابقة</button>
                <div style="display:flex;gap:5px;align-items:center;">
                    ${slides.slice(0, 15).map((_, i) => `
                        <span onclick="setSimSlideIndex(${i})" style="width:10px;height:10px;border-radius:50%;cursor:pointer;transition:all 0.2s ease;background:${i === simCurrentSlide ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)'};transform:${i === simCurrentSlide ? 'scale(1.3)' : 'scale(1)'};"></span>
                    `).join('')}
                    ${total > 15 ? `<span style="color:#64748b;font-size:0.75rem;">+${total - 15}</span>` : ''}
                </div>
                <button type="button" onclick="changeSimSlide(1)" class="action-btn secondary" ${simCurrentSlide === total - 1 ? 'disabled' : ''} style="padding:6px 14px;font-size:0.85rem;">الشريحة التالية ➔</button>
            </div>
        </div>`;
}

function changeSimSlide(step) {
    if (typeof playSound === 'function') playSound('click');
    const total = state.grammarSlides?.length || 0;
    if (total === 0) return;
    simCurrentSlide = Math.max(0, Math.min(total - 1, simCurrentSlide + step));
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
}

function setSimSlideIndex(idx) {
    if (typeof playSound === 'function') playSound('click');
    const total = state.grammarSlides?.length || 0;
    if (idx >= 0 && idx < total) {
        simCurrentSlide = idx;
        if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    }
}

function setupSlidesDropListener() {
    setTimeout(() => {
        const dropEl = document.getElementById('slidesDragDropArea');
        if (!dropEl || dropEl.dataset.bound) return;
        dropEl.dataset.bound = 'true';
        if (typeof ImageConverter !== 'undefined') {
            ImageConverter.setupDropZone(dropEl, (res) => handleConvertedSlideImage(res));
        }
    }, 50);
}

function handleConvertedSlideImage(res) {
    if (!res) return;
    const nextNum = (state.grammarSlides ? state.grammarSlides.length : 0) + 1;
    const stage = state.stage || 'Sec_3';
    const unit = state.unit || 'unit-1';
    const repoRelativePath = `${stage}/${unit}/slides/${res.name}`;

    if (typeof ImageConverter !== 'undefined') {
        ImageConverter.queueUpload(repoRelativePath, res.blob);
    }

    addSlideItem({
        id: Date.now() + Math.random(),
        title: `شريحة ${nextNum}: شرح وتوضيح`,
        imageUrl: res.dataUrl,
        notes: `WebP (${ImageConverter.formatBytes(res.webpSize)} - تم توفير ${res.savings}%)`
    });
}

async function handleSlideFilesSelect(files) {
    if (!files || files.length === 0) return;
    showAdminToast(`⏳ جاري فحص وتحويل ${files.length} صورة إلى WebP...`);
    let added = 0;
    for (let i = 0; i < files.length; i++) {
        try {
            const res = await ImageConverter.convertToWebP(files[i]);
            handleConvertedSlideImage(res);
            added++;
        } catch(e) {
            console.error('Slide conversion error:', e);
        }
    }
    if (added > 0) {
        showAdminToast(`🎉 تم تحويل ${added} صورة بنجاح إلى صيغة WebP!`);
    }
}
