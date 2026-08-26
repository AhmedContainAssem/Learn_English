# Static Neon Avatar Glow Optimization

## 1. Problem & Context
The teacher avatar header (`.avatar-wrapper`) previously utilized a continuous keyframe animation (`neonPulse 3s infinite alternate`) on the CSS `box-shadow` property. 

## 2. Why the Decision Was Taken
- **Performance & Battery Efficiency**: Animating `box-shadow` continuously causes frequent browser repaint cycles and GPU compositing overhead, which can degrade frame rates on mobile devices and low-power hardware.
- **Visual Stability**: A crisp, static multi-layered neon glow provides a solid, premium cyberpunk aesthetic without visual flickering, jitter, or performance degradation.

## 3. Implementation Details
- Removed the dynamic `@keyframes neonPulse` binding from `.avatar-wrapper` in `Learn_English/assets/css/main.css`.
- Configured a high-contrast, static dual-color neon glow:
  ```css
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.45), 0 0 35px rgba(224, 134, 255, 0.25);
  ```
- Harmonized the avatar styling across both student-facing lesson pages (`main.css`) and teacher admin studio (`admin.css`).

## 4. Lessons Learned
- Avoid animating heavy CSS properties like `box-shadow` and `filter: drop-shadow` in infinite loops on critical above-the-fold elements. Static gradients and multi-stop shadows provide identical visual richness with zero runtime performance cost.
