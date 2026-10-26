/**
 * Image Converter Module (image-converter.js)
 * Client-side HTML5 Canvas based WebP converter & Drag-and-Drop handler.
 * Converts PNG, JPG, GIF to optimized WebP in-memory with zero server dependency.
 */

const ImageConverter = (function() {
    'use strict';

    // In-memory store for images queued to be published to GitHub or exported
    const pendingImages = new Map();

    /**
     * Converts any image File/Blob to optimized WebP.
     * @param {File|Blob} file
     * @param {Object} options
     * @returns {Promise<{blob: Blob, dataUrl: string, name: string, originalSize: number, webpSize: number, savings: number, width: number, height: number}>}
     */
    function convertToWebP(file, options = {}) {
        const quality = options.quality !== undefined ? options.quality : 0.85;
        const maxW = options.maxWidth || 1920;
        const maxH = options.maxHeight || 1080;

        return new Promise((resolve, reject) => {
            const originalName = file.name || 'image.png';
            const baseName = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
            const webpName = `${baseName}.webp`;
            const originalSize = file.size;

            const reader = new FileReader();
            reader.onerror = () => reject(new Error('Failed to read image file'));
            reader.onload = () => {
                const img = new Image();
                img.onerror = () => reject(new Error('Failed to decode image data'));
                img.onload = () => {
                    let w = img.naturalWidth || img.width;
                    let h = img.naturalHeight || img.height;

                    // Calculate aspect ratio scale if exceeding max constraints
                    if (w > maxW || h > maxH) {
                        const ratio = Math.min(maxW / w, maxH / h);
                        w = Math.round(w * ratio);
                        h = Math.round(h * ratio);
                    }

                    const canvas = document.createElement('canvas');
                    canvas.width = w;
                    canvas.height = h;
                    const ctx = canvas.getContext('2d');
                    
                    // Smooth image rendering
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    ctx.drawImage(img, 0, 0, w, h);

                    canvas.toBlob((blob) => {
                        if (!blob) {
                            reject(new Error('Canvas WebP encoding failed'));
                            return;
                        }
                        const webpSize = blob.size;
                        const savings = originalSize > 0 
                            ? Math.round(((originalSize - webpSize) / originalSize) * 100) 
                            : 0;
                        const dataUrl = canvas.toDataURL('image/webp', quality);

                        resolve({
                            blob,
                            dataUrl,
                            name: webpName,
                            originalSize,
                            webpSize,
                            savings,
                            width: w,
                            height: h
                        });
                    }, 'image/webp', quality);
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        });
    }

    /**
     * Formats bytes to human-readable size
     */
    function formatBytes(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }

    /**
     * Binds drag & drop listeners to a DOM element
     */
    function setupDropZone(dropZoneEl, onProcessedCallback) {
        if (!dropZoneEl) return;

        ['dragenter', 'dragover'].forEach(evt => {
            dropZoneEl.addEventListener(evt, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZoneEl.classList.add('drag-active');
            }, false);
        });

        ['dragleave', 'drop'].forEach(evt => {
            dropZoneEl.addEventListener(evt, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZoneEl.classList.remove('drag-active');
            }, false);
        });

        dropZoneEl.addEventListener('drop', async (e) => {
            const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
            if (files.length === 0) return;

            for (const file of files) {
                try {
                    const result = await convertToWebP(file);
                    if (typeof onProcessedCallback === 'function') {
                        onProcessedCallback(result);
                    }
                } catch(err) {
                    console.error('Image conversion error:', err);
                }
            }
        });
    }

    /**
     * Registers an image to be uploaded on next publish
     */
    function queueUpload(relativePath, blob) {
        pendingImages.set(relativePath, blob);
    }

    function getQueuedImages() {
        return Array.from(pendingImages.entries()).map(([path, blob]) => ({ path, blob }));
    }

    function clearQueue() {
        pendingImages.clear();
    }

    return {
        convertToWebP,
        formatBytes,
        setupDropZone,
        queueUpload,
        getQueuedImages,
        clearQueue
    };
})();

if (typeof window !== 'undefined') {
    window.ImageConverter = ImageConverter;
}
