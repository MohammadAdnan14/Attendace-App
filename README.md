# RBU Attendance Planner 🎓📊

> **The intelligent, real-time attendance calculator and "What-If" simulator for Ramdeobaba University (RBU / RCOEM) students.**

---

## 🌟 Overview

**RBU Attendance Planner** is a cross-platform browser extension designed to eliminate attendance anxiety for students at **Ramdeobaba University (formerly RCOEM, Nagpur)**. 

While college ERP portals display static attendance numbers, **RBU Attendance Planner** injects an interactive dashboard directly into the portal page—calculating exactly how many upcoming lectures you must attend to cross the university's mandatory **75% threshold**, or how many lectures you can safely skip while staying in the safe zone.

---

## 🚀 Key Features

### 1. 🎯 Intelligent Attendance Calculations
- **Threshold Analytics**: Automatically evaluates whether your overall and individual course attendance is above the university threshold (75% / 60%).
- **Actionable Badges**:
  - **Attend: +X**: Shows the exact consecutive classes needed to lift attendance above 75%.
  - **Claim Leave: +X**: Calculates how many Duty / Medical Leave certificates (OD) you need to submit to hit the target.
  - **Safe Margin**: Clearly displays: *"You can safely skip X classes"* when you are comfortably above the threshold.

### 2. 🔮 Interactive "What-If" Simulation Engine
- Test theoretical attendance scenarios in real-time before making decisions:
  - `+ Attend`: Simulates attending the next upcoming class (+1 attended, +1 total).
  - `+ Claim`: Simulates claiming an approved duty/medical leave (+1 attended, +0 total).
  - `- Miss`: Simulates missing an upcoming lecture (+0 attended, +1 total).
- **Instant Live Feedback**: Recomputes overall percentage and course targets on the fly.
- **Granular Undo & Reset**: Step backwards through simulations with per-subject and global `Undo` / `Reset` actions.

### 3. 🎨 Obsidian Glass UI with Native Dark & Light Modes
- **Obsidian Dark & Clean Slate Light Themes**: Switch instantly with one click (`🌓`).
- **Elevated Contrast & Depth**: Subtle slate-grey canvas with elevated solid cards, preventing popup blending on bright portal tables.
- **Harmonious Action Palette**:
  - **Sky / Ocean Blue** (`#0284C7` / `#38BDF8`) for active Attendance.
  - **Seafoam / Mint Teal** (`#0D9488` / `#2DDBF`) for Leave Claims.
- **One-Click Minimize Dock**: Compact header dock with non-intrusive floating position that saves your minimized and theme state across sessions.

### 4. ⚡ Performance & Privacy by Design
- **Zero Internet Permissions**: Runs 100% locally on your machine with zero remote tracking or analytics.
- **Strict Host Matching**: Restricted strictly to official university student portals (`*://rcoem.in/*`). Never runs on external websites.
- **Debounced MutationObserver**: Smooth performance that reacts to dynamic portal AJAX/table reloads without lag.

---

## 📱 Multi-Platform Support

| Platform | Engine | Manifest | Target |
| :--- | :--- | :--- | :--- |
| **Google Chrome** | Chromium / Blink | Manifest V3 | `chrome-extension/` |
| **Mozilla Firefox** | Gecko | Manifest V2/V3 | `firefox-extension/` |
| **Apple Safari (iOS / macOS)** | WebKit | Safari Web Extension | `iOS-extension-updated/` |

---

## 🛠️ Installation & Setup

### Google Chrome / Chromium (Brave, Edge, Opera)
1. Download or clone this repository:
   ```bash
   git clone https://github.com/MohammadAdnan14/Attendace-App.git
   ```
2. Open your browser and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the `chrome-extension/` folder inside the repo.
5. Log in to your student portal at [rcoem.in](https://rcoem.in/studentCourseFileNew.htm) and navigate to the attendance table.

### Mozilla Firefox
1. Open Firefox and go to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on...**.
3. Select the `manifest.json` file inside the `firefox-extension/` folder.

### Apple Safari (iOS / iPadOS / macOS)
1. Open the project in Xcode using the Safari Web Extension converter:
   ```bash
   xcrun safari-web-extension-converter iOS-extension-updated/
   ```
2. Build and run on your target iOS device or simulator.

---

## 💡 How It Works (The Math)

1. **Target Attendance Requirement ($T = 75\%$)**:
   $$\text{Required Classes to Attend} = \left\lceil \frac{T \cdot \text{Total} - 100 \cdot \text{Attended}}{100 - T} \right\rceil$$

2. **Skippable Classes Margin ($Bunkable$)**:
   $$\text{Skippable Classes} = \left\lfloor \frac{\text{Attended}}{0.75} \right\rfloor - \text{Total}$$

3. **Duty / Medical Leave Direct Credit**:
   $$\text{Claimable Absences} = \left\lceil \frac{T \cdot \text{Total}}{100} \right\rceil - \text{Attended}$$

---

## ☕ Support the Developer

If this tool helped you save your semester attendance or plan your bunk days wisely, consider supporting the maintenance and store developer fees:

- **Solana (SOL)**: `9k2gaQoScaFBJfWGBQHX8ziqkuqJB8Un3F2RXS4D4QBY`
- **EVM (ETH / BSC / Polygon)**: `0x613e296fe5c586440a01f12e7a1b94671af2987c`

---

## 📜 License
Distributed under the **MIT License**. Created by students, for students.
