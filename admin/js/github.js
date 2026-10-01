/**
 * Lesson Studio GitHub Publisher Module (github.js)
 * Enables direct client-side publishing via GitHub REST API (v3) using Personal Access Token.
 */

let ghConfig = {
    owner: 'ahmedassem',
    repo: 'Learn_English',
    branch: 'main',
    token: ''
};

function loadGitHubConfig() {
    const saved = localStorage.getItem('assem_gh_publisher_config');
    if (saved) {
        try {
            ghConfig = JSON.parse(saved);
            if (document.getElementById('ghOwner')) document.getElementById('ghOwner').value = ghConfig.owner || 'ahmedassem';
            if (document.getElementById('ghRepo')) document.getElementById('ghRepo').value = ghConfig.repo || 'Learn_English';
            if (document.getElementById('ghBranch')) document.getElementById('ghBranch').value = ghConfig.branch || 'main';
            if (document.getElementById('ghToken')) document.getElementById('ghToken').value = ghConfig.token || '';
        } catch(e) {}
    }
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

async function publishDirectlyToGitHub() {
    saveGitHubConfig();
    if (!ghConfig.token) {
        showAdminToast("Please enter your GitHub Personal Access Token.", false);
        return;
    }

    const targetPath = document.getElementById('ghTargetFilePath')?.value.trim();
    if (!targetPath) {
        showAdminToast("Please specify the target file path.", false);
        return;
    }

    const htmlContent = generateCompleteHTMLDocument();
    const btn = document.getElementById('btnGhPublish');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>⏳ Publishing to GitHub...</span>';
    }

    appendGhConsole(`Starting publishing to: ${targetPath}`, "#38bdf8");

    try {
        // 1. Check if file already exists to get its SHA
        let sha = null;
        const checkRes = await fetch(`https://api.github.com/repos/${ghConfig.owner}/${ghConfig.repo}/contents/${targetPath}?ref=${ghConfig.branch}`, {
            headers: {
                'Authorization': `Bearer ${ghConfig.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (checkRes.ok) {
            const existingData = await checkRes.json();
            sha = existingData.sha;
            appendGhConsole(`Existing file found, updating (SHA: ${sha.substring(0, 7)})`, "#fbbf24");
        }

        // 2. Put file contents (Base64 encoded UTF-8)
        const utf8Bytes = new TextEncoder().encode(htmlContent);
        let binaryStr = '';
        for (let i = 0; i < utf8Bytes.length; i++) {
            binaryStr += String.fromCharCode(utf8Bytes[i]);
        }
        const base64Content = btoa(binaryStr);

        const commitPayload = {
            message: `Publish ${state.archetype === 'index_hub' ? 'index hub' : 'lesson'}: ${state.title} (${state.stage || 'root'}) via Lesson Studio`,
            content: base64Content,
            branch: ghConfig.branch
        };
        if (sha) commitPayload.sha = sha;

        const uploadRes = await fetch(`https://api.github.com/repos/${ghConfig.owner}/${ghConfig.repo}/contents/${targetPath}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${ghConfig.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify(commitPayload)
        });

        if (uploadRes.ok) {
            const result = await uploadRes.json();
            appendGhConsole(`🎉 File published successfully to GitHub! (Commit: ${result.commit.sha.substring(0, 7)})`, "#10b981");
            showNavSnippet(targetPath);
            showAdminToast("🎉 File published to GitHub repository successfully");
        } else {
            const err = await uploadRes.json();
            appendGhConsole(`❌ Upload error: ${err.message}`, "#ef4444");
            showAdminToast(`❌ Upload error: ${err.message}`, false);
        }

    } catch(e) {
        appendGhConsole(`❌ Network error: ${e.message}`, "#ef4444");
        showAdminToast("❌ Network error during publishing", false);
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<span>🚀 Publish Directly to GitHub</span>';
        }
    }
}
