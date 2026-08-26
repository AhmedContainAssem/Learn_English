# Zero-Leak Passcode Security Enhancement & Default Passcode Update

## 1. Context & Motivation
- **Issue**: The teacher portal login screen previously displayed the default passcode in the UI helper text and error messages (`(Default: 1234)`), which exposed the PIN to anyone opening the admin route.
- **Requirement**: Completely hide and remove any visual exposure of the teacher passcode from the platform UI. Set the default teacher passcode to `ahmed2026`, and document it exclusively in `README.md`.

## 2. Implementation Details
1. **Default Passcode Configuration**:
   - Updated `DEFAULT_TEACHER_PINS` and default initialization to `'ahmed2026'` in `/Learn_English/admin/js/auth.js`.
2. **UI Sanitization (Zero-Leak)**:
   - Removed `(Default: 1234)` from `#lockModalSubtitle` in `admin/index.html` and `auth.js`.
   - Removed `(1234)` from the Reset button label and toast notifications.
   - Updated error messages to state "Please verify your passcode or reset to default" without printing the PIN code.
3. **Documentation**:
   - Documented the default passcode (`ahmed2026`) in `README.md` and `/Learn_English/README.md` in the Teacher Studio Access table.
