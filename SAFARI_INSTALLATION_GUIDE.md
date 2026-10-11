# 🧭 Safari Installation Guide (macOS Sonoma / Sequoia & Safari 17+) — RBU Attendance Planner

> **Note for Chrome, Brave, Arc, Edge, and Firefox users on Mac:**  
> You do **not** need this guide! Simply use the 1-click install button on the **Chrome Web Store**, **Microsoft Edge Add-ons**, or **Firefox Add-ons** store pages.  
> Follow the steps below **only if you want to run the extension inside Apple's native Safari browser**.

---

## ⚡ How It Works on Modern Safari
Modern Safari (Safari 17 and newer on macOS Sonoma & Sequoia) supports loading unpacked web extensions directly from a folder — exactly like Chrome's "Load unpacked". 

**No Xcode, no Mac App (`.app`), no terminal commands, and no developer fees required!**

---

## 🚀 Step-by-Step Installation

### Step 1: Download & Extract the Safari Package
1. Download **`safari-extension.zip`** from our website or GitHub Releases.
2. Double-click the `.zip` file in Finder to extract it into a regular folder.
3. Open the folder once to make sure `manifest.json`, `content.js`, and `styles.css` are directly inside.

---

### Step 2: Enable Developer Features in Safari (One-Time Setup)
1. Open **Safari** on your Mac.
2. In the top Apple menu bar, click **Safari** $\rightarrow$ **Settings...** (or press `⌘ + ,`).
3. Switch to the **Advanced** tab.
4. Check the box at the bottom: **"Show features for web developers"** (or *"Show Develop menu in menu bar"*).
5. You will now see a new **Developer** (or **Develop**) tab appear in Safari Settings.

---

### Step 3: Allow Local Extensions
1. In Safari Settings, switch to the **Developer** tab.
2. Under the **Extensions** section, check the box: **"Allow unsigned extensions"**.
3. Authenticate with your Mac password or Touch ID when prompted.

---

### Step 4: Load the Extension ("Add Temporary Extension...")
1. Right below the "Allow unsigned extensions" checkbox, click the button:  
   👉 **`Add Temporary Extension...`**
2. In the Finder file picker that pops up, select the **unzipped folder** containing `manifest.json` (do not select a zip or the Applications folder).
3. Click **Select** / **Open**.
4. Safari will immediately load **RBU Attendance Planner**!

---

### Step 5: Turn It On & Grant Portal Access (Important!)
1. In Safari Settings, switch to the **Extensions** tab.
2. Verify that **RBU Attendance Planner** has its checkbox **checked (ON)**.
3. Open the college attendance portal in Safari:  
   👉 **`https://rcoem.in/studentCourseFileNew.htm`**
4. Look at the Safari address bar (next to the URL) for the RBU extension icon.
5. Click the icon $\rightarrow$ select: **"Always Allow on This Website"**.
6. Refresh the page (`⌘ + R`).

🎉 **Done!** The attendance dashboard and "What-If" simulation HUD will now inject automatically above your course table!

---

## 🛠️ Common Questions & Quick Fixes

### 1. "Extension Not Supported: 'Applications' cannot be used as an extension"
* **Cause:** You selected the parent folder (like `Applications` or `Downloads`) instead of the specific extension folder.
* **Fix:** Click **"Add Temporary Extension..."** again, navigate inside your extracted folder, and choose the folder that directly contains `manifest.json`.

### 2. The extension disappeared after quitting Safari
* **Cause:** For security, Apple resets temporary developer extensions when Safari is completely quit (`⌘ + Q`).
* **Fix:** Click **Developer** in Settings $\rightarrow$ re-check **"Allow unsigned extensions"** $\rightarrow$ click **"Add Temporary Extension..."** and select your folder.  
* *Pro-Tip:* Minimize Safari (`⌘ + H`) instead of quitting to keep the extension active throughout the semester.

### 3. Dashboard doesn't appear on the attendance page
* **Cause:** Safari site permissions defaulted to *Ask* or *Deny*.
* **Fix:** In **Safari Settings** $\rightarrow$ **Extensions** $\rightarrow$ select **RBU Attendance Planner** $\rightarrow$ set `rcoem.in` to **Allow**. Perform a hard refresh using `⌥ + ⌘ + R`.
