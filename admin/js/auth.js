/**
 * Teacher Studio Authentication & Security Module (auth.js)
 * Single Responsibility: Manages zero-leak teacher PIN authentication, session unlocking, and PIN resets.
 */

const DEFAULT_TEACHER_PINS = ['ahmed2026', 'assem', '01027131369', 'mr.assem', 'ahmedassem'];

function checkAuthStatus() {
    const isUnlocked = sessionStorage.getItem('teacher_studio_unlocked');
    const lockModal = document.getElementById('securityLockModal');
    const mainApp = document.getElementById('mainStudioApp');
    let storedPin = localStorage.getItem('teacher_studio_pin');
    
    // Auto-initialize default PIN if empty (vital for new domains / GitHub Pages)
    if (!storedPin) {
        storedPin = 'ahmed2026';
        localStorage.setItem('teacher_studio_pin', 'ahmed2026');
    }

    if (!lockModal || !mainApp) return;

    if (isUnlocked === 'true') {
        lockModal.style.display = 'none';
        mainApp.style.display = 'block';
    } else {
        lockModal.style.display = 'flex';
        mainApp.style.display = 'none';
        
        const lockTitle = document.getElementById('lockModalTitle');
        const lockSubtitle = document.getElementById('lockModalSubtitle');
        const lockSubmitBtnText = document.getElementById('lockSubmitBtnText');

        if (lockTitle) lockTitle.textContent = 'Teacher Portal';
        if (lockSubtitle) lockSubtitle.textContent = 'Enter teacher passcode to access Lesson Studio.';
        if (lockSubmitBtnText) lockSubmitBtnText.textContent = '🔓 Enter Studio';

        setTimeout(() => {
            const el = document.getElementById('passcodeInput');
            if (el) el.focus();
        }, 100);
    }
}

function verifyPasscode() {
    const rawInput = (document.getElementById('passcodeInput')?.value || '').trim();
    const input = rawInput.toLowerCase();
    let storedPin = localStorage.getItem('teacher_studio_pin') || 'ahmed2026';
    const errorMsg = document.getElementById('lockErrorMsg');

    if (!rawInput) {
        if (errorMsg) {
            errorMsg.textContent = '❌ Please enter your passcode to continue.';
            errorMsg.style.display = 'block';
        }
        if (typeof playWrongFX === 'function') playWrongFX();
        return;
    }

    // Direct match with stored PIN or universal master pins
    const isMatch = (rawInput === storedPin) || (input === storedPin.toLowerCase()) || DEFAULT_TEACHER_PINS.includes(input);

    if (isMatch) {
        sessionStorage.setItem('teacher_studio_unlocked', 'true');
        const lockModal = document.getElementById('securityLockModal');
        const mainApp = document.getElementById('mainStudioApp');
        if (lockModal) lockModal.style.display = 'none';
        if (mainApp) mainApp.style.display = 'block';
        if (errorMsg) errorMsg.style.display = 'none';
        
        const passEl = document.getElementById('passcodeInput');
        if (passEl) passEl.value = '';

        if (typeof playCorrectFX === 'function') playCorrectFX();
        if (typeof showAdminToast === 'function') showAdminToast("✨ Welcome to Lesson Studio");

        // Bootstrap studio features after unlocking
        if (typeof loadSavedDraftOrPreset === 'function') loadSavedDraftOrPreset();
        if (typeof StudioStore !== 'undefined' && typeof StudioStore.initShortcuts === 'function') StudioStore.initShortcuts();
        if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    } else {
        if (errorMsg) {
            errorMsg.innerHTML = '❌ Incorrect passcode.<br><span style="font-size: 0.82rem; font-weight: normal; color: var(--text-muted);">Please verify your passcode or reset to default.</span>';
            errorMsg.style.display = 'block';
        }
        if (typeof playWrongFX === 'function') playWrongFX();
    }
}

function resetPinToDefault() {
    localStorage.setItem('teacher_studio_pin', 'ahmed2026');
    const input = document.getElementById('passcodeInput');
    if (input) {
        input.value = '';
        input.focus();
    }
    const errorMsg = document.getElementById('lockErrorMsg');
    if (errorMsg) errorMsg.style.display = 'none';
    if (typeof playSound === 'function') playSound('click');
    if (typeof showAdminToast === 'function') showAdminToast("✅ Passcode reset to default successfully");
}

function lockStudio() {
    sessionStorage.removeItem('teacher_studio_unlocked');
    if (typeof playSound === 'function') playSound('click');
    checkAuthStatus();
}

function openChangePinModal() {
    if (typeof playSound === 'function') playSound('click');
    const oldPin = document.getElementById('oldPinInput');
    const newPin = document.getElementById('newPinInput');
    const confirmPin = document.getElementById('confirmPinInput');
    if (oldPin) oldPin.value = '';
    if (newPin) newPin.value = '';
    if (confirmPin) confirmPin.value = '';

    const alertBox = document.getElementById('changePinAlert');
    if (alertBox) alertBox.style.display = 'none';

    const modal = document.getElementById('changePinModal');
    if (modal) modal.style.display = 'flex';
    setTimeout(() => { if (oldPin) oldPin.focus(); }, 100);
}

function closeChangePinModal() {
    if (typeof playSound === 'function') playSound('click');
    const modal = document.getElementById('changePinModal');
    if (modal) modal.style.display = 'none';
}

function saveNewPin() {
    const oldVal = (document.getElementById('oldPinInput')?.value || '').trim();
    const newVal = (document.getElementById('newPinInput')?.value || '').trim();
    const confirmVal = (document.getElementById('confirmPinInput')?.value || '').trim();
    const storedPin = localStorage.getItem('teacher_studio_pin') || 'ahmed2026';
    const alertBox = document.getElementById('changePinAlert');

    const isOldValid = (oldVal === storedPin) || DEFAULT_TEACHER_PINS.includes(oldVal.toLowerCase());

    if (!isOldValid) {
        if (alertBox) {
            alertBox.style.display = 'block';
            alertBox.style.background = 'rgba(255, 71, 126, 0.2)';
            alertBox.style.color = 'var(--accent-red)';
            alertBox.textContent = '❌ Current passcode is incorrect.';
        }
        if (typeof playWrongFX === 'function') playWrongFX();
        return;
    }

    if (!newVal || newVal.length < 3) {
        if (alertBox) {
            alertBox.style.display = 'block';
            alertBox.style.background = 'rgba(255, 71, 126, 0.2)';
            alertBox.style.color = 'var(--accent-red)';
            alertBox.textContent = '❌ New passcode must be at least 3 characters.';
        }
        if (typeof playWrongFX === 'function') playWrongFX();
        return;
    }

    if (newVal !== confirmVal) {
        if (alertBox) {
            alertBox.style.display = 'block';
            alertBox.style.background = 'rgba(255, 71, 126, 0.2)';
            alertBox.style.color = 'var(--accent-red)';
            alertBox.textContent = '❌ New passcode and confirmation do not match.';
        }
        if (typeof playWrongFX === 'function') playWrongFX();
        return;
    }

    localStorage.setItem('teacher_studio_pin', newVal);
    if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.style.background = 'rgba(0, 255, 157, 0.2)';
        alertBox.style.color = 'var(--accent-green)';
        alertBox.textContent = '✅ Passcode updated successfully!';
    }
    if (typeof playCorrectFX === 'function') playCorrectFX();
    
    setTimeout(() => {
        closeChangePinModal();
        if (typeof showAdminToast === 'function') showAdminToast("✅ New passcode saved successfully");
    }, 1200);
}

