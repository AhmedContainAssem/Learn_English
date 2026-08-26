/**
 * Central State Store & Command History Manager (store.js)
 * Implements Command/Snapshot Pattern with Undo/Redo, reactive subscribers, and keyboard shortcuts.
 */

class StudioStoreManager {
    constructor() {
        this.historyStack = [];
        this.redoStack = [];
        this.maxHistory = 40;
        this.subscribers = [];
        this.isApplyingHistory = false;
    }

    /**
     * Subscribe to state change events
     */
    subscribe(callback) {
        if (typeof callback === 'function') {
            this.subscribers.push(callback);
        }
    }

    /**
     * Notify all subscribers when state changes
     */
    notify() {
        this.updateUndoRedoUI();
        this.subscribers.forEach(cb => {
            try { cb(state); } catch(e) { console.error("Store subscriber error:", e); }
        });
    }

    /**
     * Record a snapshot of current state before mutation
     */
    recordSnapshot(actionName = 'Edit') {
        if (this.isApplyingHistory) return;
        if (typeof state === 'undefined') return;

        // Clone current state cleanly
        const snapshot = JSON.parse(JSON.stringify(state));
        this.historyStack.push({
            name: actionName,
            timestamp: Date.now(),
            state: snapshot
        });

        if (this.historyStack.length > this.maxHistory) {
            this.historyStack.shift();
        }

        // Clear redo stack on new action
        this.redoStack = [];
        this.updateUndoRedoUI();
    }

    /**
     * Undo last action
     */
    undo() {
        if (this.historyStack.length === 0) {
            if (typeof showAdminToast === 'function') showAdminToast('ℹ️ No actions to undo.');
            return false;
        }

        this.isApplyingHistory = true;

        // Push current state to redo stack
        const currentStateClone = JSON.parse(JSON.stringify(state));
        this.redoStack.push({
            name: 'Current State',
            timestamp: Date.now(),
            state: currentStateClone
        });

        // Pop last history item
        const lastAction = this.historyStack.pop();
        state = JSON.parse(JSON.stringify(lastAction.state));

        this.isApplyingHistory = false;

        // Reapply state to UI
        if (typeof applyStateToUI === 'function') applyStateToUI();
        if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
        if (typeof saveDraft === 'function') saveDraft();
        if (typeof playSound === 'function') playSound('click');
        if (typeof showAdminToast === 'function') showAdminToast(`↩️ Undone: ${lastAction.name || 'Previous step'}`);

        this.notify();
        return true;
    }

    /**
     * Redo last undone action
     */
    redo() {
        if (this.redoStack.length === 0) {
            if (typeof showAdminToast === 'function') showAdminToast('ℹ️ No actions to redo.');
            return false;
        }

        this.isApplyingHistory = true;

        // Push current state to history stack
        const currentStateClone = JSON.parse(JSON.stringify(state));
        this.historyStack.push({
            name: 'Current State',
            timestamp: Date.now(),
            state: currentStateClone
        });

        // Pop last redo item
        const nextAction = this.redoStack.pop();
        state = JSON.parse(JSON.stringify(nextAction.state));

        this.isApplyingHistory = false;

        // Reapply state to UI
        if (typeof applyStateToUI === 'function') applyStateToUI();
        if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
        if (typeof saveDraft === 'function') saveDraft();
        if (typeof playSound === 'function') playSound('click');
        if (typeof showAdminToast === 'function') showAdminToast(`↪️ Redone: ${nextAction.name || 'Next step'}`);

        this.notify();
        return true;
    }

    canUndo() {
        return this.historyStack.length > 0;
    }

    canRedo() {
        return this.redoStack.length > 0;
    }

    updateUndoRedoUI() {
        const undoBtn = document.getElementById('btnStudioUndo');
        const redoBtn = document.getElementById('btnStudioRedo');
        const undoCountBadge = document.getElementById('undoCountBadge');

        if (undoBtn) {
            undoBtn.disabled = !this.canUndo();
            undoBtn.style.opacity = this.canUndo() ? '1' : '0.4';
            undoBtn.style.cursor = this.canUndo() ? 'pointer' : 'not-allowed';
        }

        if (redoBtn) {
            redoBtn.disabled = !this.canRedo();
            redoBtn.style.opacity = this.canRedo() ? '1' : '0.4';
            redoBtn.style.cursor = this.canRedo() ? 'pointer' : 'not-allowed';
        }

        if (undoCountBadge) {
            undoCountBadge.textContent = this.historyStack.length;
            undoCountBadge.style.display = this.historyStack.length > 0 ? 'inline-block' : 'none';
        }
    }
}

// Instantiate Global Store Singleton
const StudioStore = new StudioStoreManager();

// Keyboard Shortcuts Integration (Ctrl+Z / Ctrl+Y / Ctrl+Shift+Z)
window.addEventListener('keydown', (e) => {
    // Only capture when not typing in active text inputs / textareas unless Ctrl key is pressed
    const isCtrlOrCmd = e.ctrlKey || e.metaKey;
    if (!isCtrlOrCmd) return;

    if (e.key.toLowerCase() === 'z' && !e.shiftKey) {
        // Ctrl + Z => Undo
        const activeElem = document.activeElement;
        const isEditingText = activeElem && (activeElem.tagName === 'INPUT' || activeElem.tagName === 'TEXTAREA');
        
        // If focused in single field, allow normal text undo unless it's whole app context
        if (!isEditingText || e.altKey) {
            e.preventDefault();
            StudioStore.undo();
        }
    } else if ((e.key.toLowerCase() === 'y') || (e.key.toLowerCase() === 'z' && e.shiftKey)) {
        // Ctrl + Y or Ctrl + Shift + Z => Redo
        e.preventDefault();
        StudioStore.redo();
    }
});
