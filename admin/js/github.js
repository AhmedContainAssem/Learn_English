/**
 * Lesson Studio GitHub Publisher Module (github.js)
 * Enables direct client-side publishing via GitHub REST API (v3) using Personal Access Token.
 */

let ghConfig = {
    owner: 'ahmedcontainassem',
    repo: 'Learn_English',
    branch: 'main',
    token: ''
};

function loadGitHubConfig() {
    let defaultOwner = 'ahmedassem';
    let defaultRepo = 'Learn_English';
    if (typeof window !== 'undefined' && window.location.hostname.endsWith('github.io')) {
        defaultOwner = window.location.hostname.split('.')[0] || defaultOwner;
        const segs = window.location.pathname.split('/').filter(Boolean);
        if (segs.length > 0) defaultRepo = segs[0];
    }
    const saved = localStorage.getItem('assem_gh_publisher_config');
    if (saved) {
        try {
            ghConfig = Object.assign({ owner: defaultOwner, repo: defaultRepo, branch: 'main', token: '' }, JSON.parse(saved));
        } catch(e) {}
    } else {
        ghConfig.owner = defaultOwner;
        ghConfig.repo = defaultRepo;
    }
    if (document.getElementById('ghOwner')) document.getElementById('ghOwner').value = ghConfig.owner;
    if (document.getElementById('ghRepo')) document.getElementById('ghRepo').value = ghConfig.repo;
    if (document.getElementById('ghBranch')) document.getElementById('ghBranch').value = ghConfig.branch || 'main';
    if (document.getElementById('ghToken')) document.getElementById('ghToken').value = ghConfig.token || '';
}

function saveGitHubConfig() {
    ghConfig.owner = (document.getElementById('ghOwner')?.value || '').trim();
    ghConfig.repo = (document.getElementById('ghRepo')?.value || '').trim();
    ghConfig.branch = (document.getElementById('ghBranch')?.value || 'main').trim();
    ghConfig.token = (document.getElementById('ghToken')?.value || '').trim();
    localStorage.setItem('assem_gh_publisher_config', JSON.stringify(ghConfig));
}

function appendGhConsole(msg, color = '#10b981') {
    const c = document.getElementById('ghConsoleLogs');
    if (!c) return;
    c.style.display = 'block';
    const line = document.createElement('div');
    line.style.color = color;
    line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    c.appendChild(line);
    c.scrollTop = c.scrollHeight;
}

async function testGitHubConnection() {
    saveGitHubConfig();
    if (!ghConfig.token) {
        showAdminToast("Please enter your GitHub Personal Access Token first.", false);
        return;
    }
    appendGhConsole("Testing connection to GitHub repository...", "#38bdf8");
    try {
        const res = await fetch(`https://api.github.com/repos/${ghConfig.owner}/${ghConfig.repo}`, {
            headers: {
                'Authorization': `Bearer ${ghConfig.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        if (res.ok) {
            const data = await res.json();
            appendGhConsole(`✅ Successfully connected to repository: ${data.full_name}`, "#10b981");
            showAdminToast("✅ Successfully connected to GitHub repository");
        } else {
            const err = await res.json();
            appendGhConsole(`❌ Connection failed: ${err.message}`, "#ef4444");
            showAdminToast(`❌ Connection failed: ${err.message}`, false);
        }
    } catch(e) {
        appendGhConsole(`❌ Network error: ${e.message}`, "#ef4444");
        showAdminToast("❌ Network error while connecting", false);
    }
}

async function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result;
            const base64 = dataUrl.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

async function commitFileToGitHub(path, base64Content, commitMessage) {
    let sha = null;
    try {
        const checkRes = await fetch(`https://api.github.com/repos/${ghConfig.owner}/${ghConfig.repo}/contents/${path}?ref=${ghConfig.branch}`, {
            headers: {
                'Authorization': `Bearer ${ghConfig.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        if (checkRes.ok) {
            const existing = await checkRes.json();
            sha = existing.sha;
        }
    } catch(e) {}

    const payload = {
        message: commitMessage,
        content: base64Content,
        branch: ghConfig.branch
    };
    if (sha) payload.sha = sha;

    const res = await fetch(`https://api.github.com/repos/${ghConfig.owner}/${ghConfig.repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${ghConfig.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify(payload)
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Commit failed');
    }
    return await res.json();
}

async function publishDirectlyToGitHub() {
    saveGitHubConfig();
    if (!ghConfig.token) {
        showAdminToast("يرجى إدخال مفتاح GitHub Token أولاً.", false);
        return;
    }

    const targetPath = document.getElementById('ghTargetFilePath')?.value.trim();
    if (!targetPath) {
        showAdminToast("يرجى تحديد مسار الملف الهدف.", false);
        return;
    }

    const btn = document.getElementById('btnGhPublish');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>⏳ جاري النشر ورفع الملفات...</span>';
    }

    appendGhConsole(`بدء نشر الدرس إلى: ${targetPath}`, "#38bdf8");

    try {
        // 1. Upload any pending converted WebP images
        if (typeof ImageConverter !== 'undefined') {
            const queued = ImageConverter.getQueuedImages();
            if (queued.length > 0) {
                appendGhConsole(`جاري رفع ${queued.length} صورة WebP مضغوطة...`, "#fbbf24");
                for (const item of queued) {
                    const imgB64 = await blobToBase64(item.blob);
                    await commitFileToGitHub(item.path, imgB64, `Upload WebP slide: ${item.path}`);
                    appendGhConsole(`✅ تم رفع الصورة بنجاح: ${item.path}`, "#10b981");
                }
                ImageConverter.clearQueue();
            }
        }

        // 2. Upload the HTML lesson file
        const htmlContent = generateCompleteHTMLDocument();
        const utf8Bytes = new TextEncoder().encode(htmlContent);
        let binaryStr = '';
        for (let i = 0; i < utf8Bytes.length; i++) {
            binaryStr += String.fromCharCode(utf8Bytes[i]);
        }
        const base64Content = btoa(binaryStr);

        const result = await commitFileToGitHub(
            targetPath,
            base64Content,
            `Publish lesson: ${state.title} (${state.stage || 'root'}) via Lesson Studio`
        );

        appendGhConsole(`🎉 تم نشر الدرس بنجاح على GitHub! (Commit: ${result.commit.sha.substring(0, 7)})`, "#10b981");
        showNavSnippet(targetPath);
        showAdminToast("🎉 تم نشر الدرس وصوره بنجاح على منصتك في GitHub!");

    } catch(e) {
        appendGhConsole(`❌ خطأ أثناء النشر: ${e.message}`, "#ef4444");
        showAdminToast(`❌ فشل النشر: ${e.message}`, false);
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<span>🚀 نشر الدرس إلى GitHub</span>';
        }
    }
}

