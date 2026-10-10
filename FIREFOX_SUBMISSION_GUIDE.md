# Firefox Add-ons (AMO) Submission Guide & Context
**Project:** RBU Attendance Planner  
**Target:** Mozilla Firefox Add-ons (addons.mozilla.org / AMO)  
**Repository:** https://github.com/MohammadAdnan14/Attendace-App  

---

## 📌 Project & Technical Context
- **Name:** RBU Attendance Planner
- **Target Audience:** Students of Ramdeobaba University (formerly RCOEM), Nagpur.
- **Single Purpose:** Enhances the university student ERP portal (`https://rcoem.in/studentCourseFileNew.htm*`) by parsing attendance numbers and injecting an interactive real-time calculator & "What-If" simulator directly into the page DOM.
- **Key Algorithms & Targets:**
  - **Overall Target:** 75%+ semester aggregate criteria.
  - **Individual Subject Target:** 60%+ subject minimum criteria.
  - Calculates skippable (bunkable) lectures, required attendances, and duty/medical certificate credits.
- **Privacy & Security Architecture:**
  - **Zero Remote Code:** 100% of the code is bundled inside the package (`content.js`, `styles.css`, local icons).
  - **Zero External Requests:** No `fetch()`, `XMLHttpRequest`, analytics, or tracking pixels.
  - **Zero Data Collection:** Runs 100% in local browser memory; no credentials or student records are ever transmitted or saved to external servers.

---

## 🛠️ Firefox Manifest Details
Inside `firefox-extension/manifest.json`:
- **Manifest Version:** 2 / Gecko compatible
- **Extension ID:** Set in `browser_specific_settings.gecko.id` (e.g., `rbu-attendance-planner@adnan.dev` or `attendance-insights@example.com`).
  > ⚠️ **Important for AMO:** Mozilla requires this ID to remain consistent across future updates.
- **Permissions:** Restricted strictly to active tab on `*://rcoem.in/*`.

---

## 📦 Step-by-Step Publishing Process on AMO

### Step 1: Package the Extension
1. Open the `firefox-extension/` directory.
2. Select all files inside the folder:
   - `manifest.json`
   - `content.js`
   - `styles.css`
   - `qr.png`
   - `icon16.png`, `icon48.png`, `icon128.png`
3. Compress these files into a `.zip` file (e.g., `rbu-attendance-firefox.zip`). Ensure `manifest.json` is at the root of the archive.

### Step 2: Open Mozilla Developer Hub
1. Navigate to: [https://addons.mozilla.org/developers/](https://addons.mozilla.org/developers/)
2. Log in with your Firefox Account (or create one using your personal email for free).
3. Click the blue button: **"Submit a New Add-on"**.
4. Read and accept the Firefox Add-on Distribution Agreement.

### Step 3: Distribution Option
- Select **"On this site"** (Distribute publicly on Mozilla Add-ons).
- *(Do not select "On your own" unless you only want a self-hosted signed XPI file).*

### Step 4: Upload & Automated Linter
1. Upload your `rbu-attendance-firefox.zip`.
2. AMO will run an automated validation scan to check for Manifest errors, malicious eval usage, or permission issues.
3. Once the scan passes with 0 fatal errors, click **Continue**.

---

## 📝 Copy-Paste Metadata for Listing

### 1. Summary (Short Description)
> Smart attendance calculator & simulator for RBU students. Plan safe bunks, medical leaves, and hit 75% target.

### 2. Full Description (Firefox-Compliant)
```markdown
🎓 RBU Attendance Planner — The Ultimate Attendance Calculator & Simulator for Ramdeobaba University Students

Are you tired of constantly worrying about falling below the mandatory attendance criteria? Do you find yourself opening a calculator every week trying to figure out how many upcoming classes you can safely skip, or how many lectures you must attend to pull your percentage back up?

RBU Attendance Planner eliminates attendance anxiety. It seamlessly integrates directly into the official RBU / RCOEM student portal (rcoem.in), turning your static attendance tables into an interactive, real-time decision dashboard and "What-If" simulation laboratory.

--------------------------------------------------
🌟 WHY SHOULD YOU INSTALL THIS?
--------------------------------------------------
College ERP portals only display historical records — numbers that tell you where you were, not what you need to do next. RBU Attendance Planner bridges that gap by providing forward-looking intelligence:

• Instant Clarity: Instantly shows the exact number of consecutive classes required to reach university criteria, or how many bunkable classes you have left in reserve.
• Dual Target Accuracy: Pre-calibrated strictly to university norms — maintaining 75%+ overall attendance while keeping every individual subject above 60%+.
• Test Before You Act: Simulate attending, skipping, or claiming medical leaves in real time to see the percentage impact before making decisions.
• Zero Manual Math: No spreadsheets, no formulas, no guesswork. Everything updates dynamically as you view your portal.
• Clean & Non-Intrusive: Designed with modern Dark and Light aesthetics that blend seamlessly with your workflow.

--------------------------------------------------
🚀 CORE FEATURES IN DETAIL
--------------------------------------------------

1. 🎯 Dynamic Target Analytics (Dual Threshold Engine)
• University-Compliant Targets:
  - Overall Aggregate Target: Kept at 75%+ to ensure full semester eligibility.
  - Individual Subject Target: Kept at 60%+ to prevent individual course detentions or exam blocks.
• Automatic Status Badges: Each course row is dynamically evaluated against both individual (60%+) and aggregate (75%+) thresholds.
• "Attend: +X": If you are below the target, the extension calculates the exact number of upcoming consecutive lectures you must attend to cross the threshold safely.
• "Safe Margin / Bunkable: X": When you are safely above the threshold, it highlights exactly how many classes you can afford to miss before your percentage dips into the danger zone.
• "Claim Medical: +X": Calculates how many approved medical/duty leave certificates you need to credit to reach safety without waiting for future lectures.

2. 🔮 Interactive "What-If" Simulation Engine
Want to plan a trip, take time off for a hackathon, or calculate the effect of an upcoming week? The built-in simulation HUD allows scenario testing:
• [+ Attend]: Simulates attending the next session (+1 attended, +1 total). Watch your percentage rise in real time.
• [- Miss]: Simulates missing a session (+0 attended, +1 total). Immediately reveals whether it triggers a shortage warning.
• [+ Claim]: Simulates claiming an approved medical or duty certificate (+1 attended, +0 total).
• Granular Undo & Reset: Made a mistake while simulating? Step back individual actions with per-subject Undo or wipe simulations clean with Global Reset.

3. 🎨 Obsidian Glass UI (Dark & Light Mode)
• Obsidian Dark & Slate Light Themes: Toggle instantly with a single click (🌓) according to your preference.
• High Contrast Cards: Specially tuned contrast prevents the dashboard from blending into bright college ERP table backgrounds.
• Minimize Dock: Need full screen visibility of your portal? Minimize the dashboard into a sleek floating pill dock at the top-right corner.

4. ⚡ 100% Privacy & Local-First Security
• Zero Data Collection: Your attendance numbers, login details, and session data never leave your browser.
• No External Servers: All mathematical calculations and simulations are performed 100% locally on your machine.
• Restricted Host Scope: Operates strictly and exclusively on official student portal pages (rcoem.in).

--------------------------------------------------
📖 HOW TO USE (STEP-BY-STEP GUIDE)
--------------------------------------------------

Step 1: Install the add-on from Firefox Add-ons.
Step 2: Open Firefox and log into the student portal: https://rcoem.in/studentCourseFileNew.htm
Step 3: Navigate to your registered courses attendance page.
Step 4: The RBU Attendance Planner HUD will automatically appear, overlaying course analytics and actionable badges.
Step 5: Use the simulation buttons (+ Attend, - Miss, + Claim) in any course row to test upcoming scenarios.
Step 6: Use the Reset button whenever you wish to return to your actual live attendance numbers.

--------------------------------------------------
💬 SUPPORT & FEEDBACK
--------------------------------------------------
Built by students, for students. If you encounter any display discrepancies or have feature requests for upcoming updates, feel free to reach out to 0xadnandalal@gmail.com
```

### 3. Categories
- **Productivity**
- **Photos, Music & Notes** (or General / Educational)

### 4. Reviewer Notes (Information for Reviewers)
```text
This extension operates strictly on the internal student attendance portal of Ramdeobaba University (https://rcoem.in/studentCourseFileNew.htm).
It reads client-side attendance numbers in the course table and injects a simulation dashboard into the DOM to assist students with 75% aggregate / 60% subject attendance planning.
All operations execute purely client-side with zero network requests or remote data handling.
If test credentials or walkthrough details are required, please contact the developer at 0xadnandalal@gmail.com.
```

---

## ⏱️ Review Time & Metrics
- **Review Duration:** Firefox typically takes between **2 hours to 24 hours**.
- **Metrics Available on AMO:** Once live, Mozilla provides real-time public and developer metrics:
  - Daily Active Users (exact count)
  - Lifetime & Weekly Download Counts
  - Star ratings & written student reviews
