function calculateInsights() {
  console.log('Starting attendance calculation...');
  
  // Look for the attendance table - it should have columns for Code, Course Name, Attendance Count, and Percentage
  const tables = document.querySelectorAll('table');
  let table = null;
  
  // Find the table that has the attendance data
  tables.forEach((t, index) => {
    const headers = t.querySelectorAll('th');
    const headerTexts = Array.from(headers).map(h => h.innerText.trim());
    console.log(`Table ${index} headers:`, headerTexts);
    
    if (headerTexts.includes('Code') && 
        headerTexts.includes('Course Name') && 
        headerTexts.includes('Attendance Count') && 
        headerTexts.includes('Percentage')) {
      table = t;
      console.log('Found attendance table!');
    }
  });

  if (!table) {
    console.log('Attendance table not found');
    displayPopup([]);
    return;
  }

  // Log the entire table HTML for debugging
  console.log('Table HTML:', table.outerHTML);

  const rows = table.querySelectorAll('tbody tr');
  console.log(`Found ${rows.length} rows to process`);
  
  const threshold = 60;
  const results = [];

  rows.forEach((row, index) => {
    // Skip the last row which contains totals
    if (index === rows.length - 1) {
      console.log('Skipping total row');
      return;
    }

    // Log the entire row HTML for debugging
    console.log(`Row ${index} HTML:`, row.outerHTML);

    const cols = row.querySelectorAll("td");
    console.log(`Row ${index} has ${cols.length} columns`);
    
    if (cols.length < 4) {
      console.log(`Skipping row ${index}: insufficient columns`);
      return;
    }

    // Log each column's content
    cols.forEach((col, colIndex) => {
      console.log(`Column ${colIndex} content:`, col.innerText.trim());
    });

    const subject = cols[1].innerText.trim();
    const attendanceLink = cols[2].querySelector('a');
    
    if (!attendanceLink) {
      console.log(`Skipping row ${index}: no attendance link found`);
      return;
    }

    const attendanceText = attendanceLink.innerText.trim();
    console.log(`Attendance text for ${subject}:`, attendanceText);

    const [attended, total] = attendanceText.split('/').map(num => parseInt(num.trim()));
    const percentage = parseFloat(cols[3].innerText.trim());

    console.log('Row data:', { subject, attended, total, percentage });

    if (isNaN(attended) || isNaN(total) || total === 0) {
      console.log(`Skipping row ${index}: invalid numbers`);
      return;
    }

    let belowThreshold = false;
    let extraClasses = 0;
    let directAttendance = 0;
    let bunkable = 0;
    let message = "";

    if ((attended / total) * 100 < threshold) {
      belowThreshold = true;
      let tempAttended = attended;
      let tempTotal = total;
      
      while ((tempAttended / tempTotal) * 100 < threshold) {
        tempAttended += 1;
        tempTotal += 1;
        extraClasses += 1;
      }
      directAttendance = Math.ceil((threshold / 100) * total) - attended;
    } else {
      let tempTotal = total;
      while ((attended / tempTotal) * 100 >= threshold) {
        tempTotal += 1;
        bunkable += 1;
      }
      bunkable -= 1; // The last increment takes it below threshold
      message = percentage === 100
        ? "😎 You can skip " + bunkable + " classes"
        : bunkable === 0 
          ? "😅 You're right on edge"
          : "✅ You can skip " + bunkable + " classes";
    }

    results.push({ 
      subject, 
      percentage: percentage.toFixed(2), 
      message,
      attended,
      total,
      belowThreshold,
      extraClasses,
      directAttendance,
      bunkable
    });
  });

  console.log('Final results:', results);
  displayPopup(results);
}

function calculateOverallAttendance(data) {
  const total = data.reduce((sum, course) => sum + course.total, 0);
  const attended = data.reduce((sum, course) => sum + course.attended, 0);
  const percentage = (attended / total) * 100;
  const overallThreshold = 75; // Fixed threshold for overall attendance
  
  let belowThreshold = false;
  let requiredClasses = 0;
  let directAttendance = 0;
  let skippableClasses = 0;
  let message = "";

  if (percentage < overallThreshold) {
    belowThreshold = true;
    let currentAttended = attended;
    let currentTotal = total;
    
    while ((currentAttended / currentTotal) * 100 < overallThreshold) {
      currentAttended++;
      currentTotal++;
      requiredClasses++;
    }
    directAttendance = Math.ceil((overallThreshold / 100) * total) - attended;
  } else {
    skippableClasses = Math.floor((attended / 0.75) - total);
    message = percentage === 100
      ? "😎 You can skip " + skippableClasses + " classes"
      : skippableClasses === 0
        ? "😅 You're right on edge"
        : "✅ You can skip " + skippableClasses + " classes";
  }
  
  return {
    percentage: percentage.toFixed(2),
    belowThreshold,
    requiredClasses,
    directAttendance,
    skippableClasses,
    message,
    total,
    attended
  };
}

// Simulation state: maps subject name -> { attendedDelta: number, totalDelta: number }
window.attendanceSimulations = window.attendanceSimulations || {};
window.whatIfModeActive = window.whatIfModeActive || false;

function displayPopup(data) {
  // Capture current scroll positions before removing existing popup
  let bodyWrapperScroll = 0;
  let subjectListScroll = 0;
  const existingPopup = document.getElementById('attendance-popup');
  if (existingPopup) {
    const existingWrapper = existingPopup.querySelector('.popup-body-wrapper');
    if (existingWrapper) bodyWrapperScroll = existingWrapper.scrollTop;
    const existingList = existingPopup.querySelector('.subject-list');
    if (existingList) subjectListScroll = existingList.scrollTop;
    existingPopup.remove();
  }

  const popup = document.createElement("div");
  popup.id = "attendance-popup";

  // Restore states
  const savedTheme = localStorage.getItem('attendance-theme') || 'light';
  if (savedTheme === 'dark') {
    popup.classList.add('dark-theme');
  }
  
  const savedCollapsed = localStorage.getItem('attendance-collapsed') === 'true';
  if (savedCollapsed) {
    popup.classList.add('collapsed');
  }

  if (window.whatIfModeActive) {
    popup.classList.add('whatif-active');
  }

  if (data.length === 0) {
    popup.innerHTML = 
      "<div class='popup-header'>" +
        "<div class='header-left'>" +
          "<span class='header-icon'>📊</span>" +
          "<h3>Attendance Insights</h3>" +
        "</div>" +
        "<div class='header-controls'>" +
          "<button id='whatif-toggle' class='control-btn" + (window.whatIfModeActive ? " active" : "") + "' title='Toggle What-If Simulation'>🔮</button>" +
          "<button id='theme-toggle' class='control-btn' title='Toggle Theme'>🌓</button>" +
          "<button id='collapse-toggle' class='control-btn' title='Minimize'>➖</button>" +
        "</div>" +
      "</div>" +
      "<div class='popup-body-wrapper'>" +
        "<div class='error-view'>" +
          "<p>No attendance data found. Please make sure:</p>" +
          "<ul>" +
            "<li>You're on the correct page</li>" +
            "<li>The attendance table is visible</li>" +
            "<li>You're logged in to the portal</li>" +
          "</ul>" +
        "</div>" +
      "</div>";
  } else {
    // Apply simulation deltas to data
    let hasActiveSimulations = false;
    const simulatedData = data.map(d => {
      const sim = window.attendanceSimulations[d.subject] || { attendedDelta: 0, totalDelta: 0 };
      if (sim.attendedDelta !== 0 || sim.totalDelta !== 0) {
        hasActiveSimulations = true;
      }
      
      const effectiveAttended = Math.max(0, d.attended + sim.attendedDelta);
      const effectiveTotal = Math.max(1, d.total + sim.totalDelta);
      const effectivePercentage = (effectiveAttended / effectiveTotal) * 100;
      const threshold = 60;

      let belowThreshold = false;
      let extraClasses = 0;
      let directAttendance = 0;
      let bunkable = 0;
      let message = "";

      if (effectivePercentage < threshold) {
        belowThreshold = true;
        let tempAttended = effectiveAttended;
        let tempTotal = effectiveTotal;
        while ((tempAttended / tempTotal) * 100 < threshold) {
          tempAttended += 1;
          tempTotal += 1;
          extraClasses += 1;
        }
        directAttendance = Math.ceil((threshold / 100) * effectiveTotal) - effectiveAttended;
      } else {
        let tempTotal = effectiveTotal;
        while ((effectiveAttended / tempTotal) * 100 >= threshold) {
          tempTotal += 1;
          bunkable += 1;
        }
        bunkable -= 1;
        message = effectivePercentage === 100
          ? "😎 You can skip " + bunkable + " classes"
          : bunkable === 0 
            ? "😅 You're right on edge"
            : "✅ You can skip " + bunkable + " classes";
      }

      return {
        ...d,
        effectiveAttended,
        effectiveTotal,
        effectivePercentage: effectivePercentage.toFixed(2),
        belowThreshold,
        extraClasses,
        directAttendance,
        bunkable,
        message,
        attendedDelta: sim.attendedDelta,
        totalDelta: sim.totalDelta
      };
    });

    const overall = calculateOverallAttendance(simulatedData.map(s => ({
      ...s,
      attended: s.effectiveAttended,
      total: s.effectiveTotal
    })));
    
    // Sort critical courses to the top so students spot them instantly
    simulatedData.sort((a, b) => {
      if (a.belowThreshold && !b.belowThreshold) return -1;
      if (!a.belowThreshold && b.belowThreshold) return 1;
      return parseFloat(a.effectivePercentage) - parseFloat(b.effectivePercentage);
    });

    let overallRecommendations = "";
    if (overall.belowThreshold) {
      overallRecommendations = 
        "<div class='overall-recommendations'>" +
          "<div class='rec-badge attend'>" +
            "<span class='badge-label'>Attend:</span>" +
            "<span class='badge-val'>+" + overall.requiredClasses + " classes</span>" +
          "</div>" +
          "<div class='rec-badge direct'>" +
            "<span class='badge-label'>Claim Leave:</span>" +
            "<span class='badge-val'>+" + overall.directAttendance + " present</span>" +
          "</div>" +
        "</div>";
    } else {
      overallRecommendations = "<p class='overall-message safe'>" + overall.message + " to stay above 75%</p>";
    }

    let html = 
      "<div class='popup-header'>" +
        "<div class='header-left'>" +
          "<span class='header-icon'>📊</span>" +
          "<h3>Attendance Insights</h3>" +
        "</div>" +
        "<div class='header-controls'>" +
          "<button id='whatif-toggle' class='control-btn" + (window.whatIfModeActive ? " active" : "") + "' title='Toggle What-If Simulation'>🔮</button>" +
          "<button id='theme-toggle' class='control-btn' title='Toggle Theme'>🌓</button>" +
          "<button id='collapse-toggle' class='control-btn' title='Minimize'></button>" +
        "</div>" +
      "</div>" +
      "<div class='popup-body-wrapper'>" +
        "<div class='attendance-summary" + (hasActiveSimulations ? " sim-highlight" : "") + "'>" +
          "<div class='summary-top'>" +
            "<span class='summary-label'>Overall Attendance " + (hasActiveSimulations ? "<span class='sim-tag'>(SIMULATED)</span>" : "") + "</span>" +
            "<span class='summary-value " + (overall.belowThreshold ? 'low-attendance' : '') + "'>" + overall.percentage + "%</span>" +
          "</div>" +
          "<div class='progress-bar-container'>" +
            "<div class='progress-bar-fill' style='width: " + Math.min(100, Math.max(0, overall.percentage)) + "%'></div>" +
          "</div>" +
          overallRecommendations +
          (hasActiveSimulations ? "<div class='reset-sim-wrapper'><button id='reset-sim-btn' class='reset-sim-btn'>🔄 Reset Simulation</button></div>" : "") +
        "</div>" +
        "<ul class='subject-list'>";
    
    simulatedData.forEach(d => {
      let recHtml = "";
      if (d.belowThreshold) {
        recHtml = 
          "<div class='recommendation-badges'>" +
            "<span class='rec-badge-mini attend'>Attend: +" + d.extraClasses + "</span>" +
            "<span class='rec-badge-mini direct'>Leave: +" + d.directAttendance + "</span>" +
          "</div>";
      } else {
        recHtml = "<span class='safe-message'>" + d.message + "</span>";
      }

      const deltaText = d.totalDelta > 0 
        ? `<span class='delta-tag'>(${d.attendedDelta >= 0 ? '+' + d.attendedDelta : d.attendedDelta}/${d.totalDelta >= 0 ? '+' + d.totalDelta : d.totalDelta})</span>`
        : "";

      html += 
        "<li class='subject-card " + (d.belowThreshold ? 'warning-card' : '') + "'>" +
          "<div class='subject-header'>" +
            "<strong class='subject-title'>" + d.subject + "</strong>" +
            "<span class='subject-percentage " + (d.belowThreshold ? "low-attendance" : "") + "'>" + d.effectivePercentage + "%</span>" +
          "</div>" +
          "<div class='subject-body'>" +
            "<span class='count'>(" + d.effectiveAttended + "/" + d.effectiveTotal + " classes) " + deltaText + "</span>" +
            recHtml +
          "</div>" +
          (window.whatIfModeActive ? 
            "<div class='whatif-controls'>" +
              "<span class='whatif-label'>Simulate:</span>" +
              "<button class='sim-btn attend-btn' data-subject='" + encodeURIComponent(d.subject) + "' title='Simulate Attending 1 Class'>+ Attend</button>" +
              "<button class='sim-btn miss-btn' data-subject='" + encodeURIComponent(d.subject) + "' title='Simulate Missing 1 Class'>- Miss</button>" +
            "</div>" : "") +
        "</li>";
    });

    html += "</ul>" +
      "<div class='popup-footer'>" +
        "<button id='coffee-btn' class='coffee-btn'>☕ Support the Dev</button>" +
        "<div id='donation-drawer' class='donation-drawer hidden'>" +
          "<p class='donation-pitch'>If you like our work, kindly help or motivate us!</p>" +
          
          "<div class='donation-item'>" +
            "<div class='donation-meta'>" +
              "<span class='chain-title'>EVM Address (ETH/BSC/Polygon)</span>" +
              "<span class='chain-note'>⚠️ Strictly send EVM chain tokens. Others will be lost.</span>" +
            "</div>" +
            "<div class='address-copy-container'>" +
              "<input type='text' readonly class='address-input' value='0xC43947F88eC57D5d96A1A7C6d597c239677dE9B7'>" +
              "<button class='copy-btn' data-address='0xC43947F88eC57D5d96A1A7C6d597c239677dE9B7'>Copy</button>" +
            "</div>" +
          "</div>" +

          "<div class='donation-item'>" +
            "<div class='donation-meta'>" +
              "<span class='chain-title'>Solana Address</span>" +
              "<span class='chain-note'>⚠️ Strictly send Solana network tokens. Others will be lost.</span>" +
            "</div>" +
            "<div class='address-copy-container'>" +
              "<input type='text' readonly class='address-input' value='8LXB8CuiRQumccju3SGXtCFvPehEcARJkwTFAzKVqFtw'>" +
              "<button class='copy-btn' data-address='8LXB8CuiRQumccju3SGXtCFvPehEcARJkwTFAzKVqFtw'>Copy</button>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>";

    popup.innerHTML = html;
  }

  document.body.appendChild(popup);

  // Restore scroll positions seamlessly
  const newWrapper = popup.querySelector('.popup-body-wrapper');
  if (newWrapper && bodyWrapperScroll > 0) newWrapper.scrollTop = bodyWrapperScroll;
  const newList = popup.querySelector('.subject-list');
  if (newList && subjectListScroll > 0) newList.scrollTop = subjectListScroll;

  // Setup event listeners after appending to DOM
  const whatIfToggle = document.getElementById('whatif-toggle');
  if (whatIfToggle) {
    whatIfToggle.addEventListener('click', () => {
      window.whatIfModeActive = !window.whatIfModeActive;
      displayPopup(data);
    });
  }

  const resetSimBtn = document.getElementById('reset-sim-btn');
  if (resetSimBtn) {
    resetSimBtn.addEventListener('click', () => {
      window.attendanceSimulations = {};
      displayPopup(data);
    });
  }

  const attendBtns = popup.querySelectorAll('.sim-btn.attend-btn');
  attendBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const subject = decodeURIComponent(btn.getAttribute('data-subject'));
      if (!window.attendanceSimulations[subject]) {
        window.attendanceSimulations[subject] = { attendedDelta: 0, totalDelta: 0 };
      }
      window.attendanceSimulations[subject].attendedDelta += 1;
      window.attendanceSimulations[subject].totalDelta += 1;
      displayPopup(data);
    });
  });

  const missBtns = popup.querySelectorAll('.sim-btn.miss-btn');
  missBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const subject = decodeURIComponent(btn.getAttribute('data-subject'));
      if (!window.attendanceSimulations[subject]) {
        window.attendanceSimulations[subject] = { attendedDelta: 0, totalDelta: 0 };
      }
      window.attendanceSimulations[subject].totalDelta += 1;
      displayPopup(data);
    });
  });

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      popup.classList.toggle('dark-theme');
      const currentTheme = popup.classList.contains('dark-theme') ? 'dark' : 'light';
      localStorage.setItem('attendance-theme', currentTheme);
    });
  }

  const collapseToggle = document.getElementById('collapse-toggle');
  if (collapseToggle) {
    collapseToggle.textContent = popup.classList.contains('collapsed') ? "➕" : "➖";
    collapseToggle.addEventListener('click', () => {
      popup.classList.toggle('collapsed');
      const isCollapsed = popup.classList.contains('collapsed');
      localStorage.setItem('attendance-collapsed', isCollapsed);
      collapseToggle.textContent = isCollapsed ? "➕" : "➖";
    });
  }

  const coffeeBtn = document.getElementById('coffee-btn');
  const donationDrawer = document.getElementById('donation-drawer');
  if (coffeeBtn && donationDrawer) {
    coffeeBtn.addEventListener('click', () => {
      donationDrawer.classList.toggle('hidden');
      coffeeBtn.classList.toggle('active');
    });
  }

  const copyButtons = popup.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const address = btn.getAttribute('data-address');
      navigator.clipboard.writeText(address).then(() => {
        const originalText = btn.textContent;
        btn.textContent = "Copied!";
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('copied');
        }, 1500);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  });
}

// Wait for the page to be fully loaded
function initializeExtension() {
  if (window.attendanceTimeout) {
    clearTimeout(window.attendanceTimeout);
  }
  
  window.attendanceTimeout = setTimeout(() => {
    calculateInsights();
  }, 1000);
  
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        const hasTable = Array.from(mutation.addedNodes).some(node => 
          node.nodeType === 1 && node.matches('table')
        );
        if (hasTable) {
          calculateInsights();
          break;
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExtension);
} else {
  initializeExtension();
}