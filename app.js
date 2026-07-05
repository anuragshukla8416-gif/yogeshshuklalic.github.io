// INITIAL STABLE REPOSITORY CAPABILITIES DATA
const POLICY_MASTER_REPOSITORY = [
    { id: 'p1', company: 'LIC', name: 'LIC Tech-Term', domain: 'protection', minBudget: 1500, highlight: 'High claim settlement assurance' },
    { id: 'p2', company: 'HDFC Life', name: 'HDFC Click 2 Protect', domain: 'protection', minBudget: 2000, highlight: 'Highly customizable variants' },
    { id: 'p3', company: 'Max Life', name: 'Max Life Smart Secure Plus', domain: 'protection', minBudget: 1800, highlight: 'Excellent rider integrations' },
    { id: 'p4', company: 'SBI Life', name: 'SBI Life eShield Next', domain: 'protection', minBudget: 2200, highlight: 'Airtight banking security layer' },
    { id: 'p5', company: 'ICICI Prudential', name: 'ICICI Pru iProtect Smart', domain: 'protection', minBudget: 1900, highlight: 'Critical Illness coverage inclusions' },
    
    { id: 'p6', company: 'LIC', name: 'LIC Jeevan Utsav', domain: 'income', minBudget: 4000, highlight: 'Lifetime guaranteed 8% deferrals' },
    { id: 'p7', company: 'HDFC Life', name: 'HDFC Life Sanchay Plus', domain: 'income', minBudget: 5000, highlight: 'Guaranteed non-participating maturity yield' },
    { id: 'p8', company: 'SBI Life', name: 'SBI Life Smart Platina Plus', domain: 'income', minBudget: 4500, highlight: 'Steady systematic income architecture' },
    
    { id: 'p9', company: 'HDFC Life', name: 'HDFC Click 2 Wealth', domain: 'wealth', minBudget: 3000, highlight: 'Minimal charge structure optimization' },
    { id: 'p10', company: 'ICICI Prudential', name: 'ICICI Pru Signature', domain: 'wealth', minBudget: 3500, highlight: 'Return of premium allocation charges' },
    { id: 'p11', company: 'LIC', name: 'LIC New Endowment Plus', domain: 'wealth', minBudget: 2500, highlight: 'Sovereign guaranteed security base' },
    
    { id: 'p12', company: 'HDFC Ergo', name: 'Optima Super Secure', domain: 'health', minBudget: 2000, highlight: '4x safety coverage multi-multiplier' },
    { id: 'p13', company: 'Care Health', name: 'Care Health Supreme', domain: 'health', minBudget: 1500, highlight: 'Comprehensive global health pathways' },
    { id: 'p14', company: 'Star Health', name: 'Star Family Health Optima', domain: 'health', minBudget: 1800, highlight: 'Massive local hospital tie-up coverage' }
];

// STATE MANAGEMENT LEDGER
let USER_SESSION_IDENTIFIER = null;
let APP_STATE_CONTEXT = 'auth'; // Options: auth, client_portal, admin_workspace
let MASTER_LEAD_LEDGER = [
    { timestamp: '2026-07-04 11:24', contact: '+91 98300 12345', domain: 'Pure Family Protection', budget: 3500, actionPlan: 'LIC Tech-Term', status: 'In Progress' },
    { timestamp: '2026-07-05 14:10', contact: 'anurag.shukla@email.com', domain: 'Guaranteed Lifetime Income', budget: 6000, actionPlan: 'HDFC Life Sanchay Plus', status: 'New' }
];

// INITIALIZATION PIPELINE
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    setupOtpFieldAutoNavigation();
});

// OTP FIELD UX CONTROL AUTO-TAB
function setupOtpFieldAutoNavigation() {
    const fields = document.querySelectorAll('.otp-field');
    fields.forEach((field, idx) => {
        field.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && idx < fields.length - 1) {
                fields[idx + 1].focus();
            }
        });
        field.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && idx > 0) {
                fields[idx - 1].focus();
            }
        });
    });
}

// SIMULATE SEND OTP ACTION
function requestOTP() {
    const identifier = document.getElementById('authIdentifier').value.trim();
    if (!identifier) {
        alert('Please provide a valid Mobile Number or Email destination.');
        return;
    }
    USER_SESSION_IDENTIFIER = identifier;
    
    document.getElementById('authRequestForm').classList.add('hidden');
    document.getElementById('authVerificationForm').classList.remove('hidden');
    
    // Auto-prefill the secure test simulation code inside standard alert framework
    setTimeout(() => {
        alert(`[Secure Gateway Simulator]: Use verification token "1234" to pass securely into Mr. Shukla's advisory panel.`);
    }, 600);

    startOtpCountdownTimer();
}

// OTP COUNTDOWN TIMER CLOCK
function startOtpCountdownTimer() {
    let timeLeft = 30;
    const timerText = document.getElementById('otpTimerText');
    const countdown = document.getElementById('timerCountdown');
    const resendBtn = document.getElementById('resendOtpBtn');
    
    timerText.classList.remove('hidden');
    resendBtn.classList.add('hidden');
    
    const interval = setInterval(() => {
        timeLeft--;
        countdown.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(interval);
            timerText.classList.add('hidden');
            resendBtn.classList.remove('hidden');
        }
    }, 1000);
}

// VERIFY SECURE TOKEN CODE
function verifyOTP() {
    const fields = document.querySelectorAll('.otp-field');
    let compiledToken = '';
    fields.forEach(f => compiledToken += f.value);

    if (compiledToken === '1234') {
        APP_STATE_CONTEXT = 'client_portal';
        document.getElementById('authGateway').classList.add('hidden');
        document.getElementById('portalWorkspace').classList.remove('hidden');
        document.getElementById('logoutBtn').classList.remove('hidden');
        
        // Execute dynamic match logic rendering instantly
        runRecommendationEngine();
    } else {
        alert('Verification token failed. Please input valid simulation key "1234".');
    }
}

// HANDLE DYNAMIC PREMIUM INPUT VIEW CHANGE
function updateBudgetDisplay(value) {
    document.getElementById('sliderValueDisplay').textContent = `₹${parseInt(value).toLocaleString('en-IN')}`;
    runRecommendationEngine();
}

// CONSULTATIVE ALGORITHMIC MATCH ENGINE LOGIC
function runRecommendationEngine() {
    const targetDomain = document.getElementById('userGoal').value;
    const allocationBudget = parseInt(document.getElementById('userBudget').value);
    const deckContainer = document.getElementById('recommendationDeck');
    
    // Filter master pool against capabilities boundary metrics
    const matchedPolicies = POLICY_MASTER_REPOSITORY.filter(p => p.domain === targetDomain && p.minBudget <= allocationBudget);
    
    document.getElementById('matchCountBadge').textContent = `${matchedPolicies.length} Available Match Options`;
    deckContainer.innerHTML = '';

    if (matchedPolicies.length === 0) {
        deckContainer.innerHTML = `
            <div class="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center text-amber-800 text-sm font-medium">
                No standard flagship frameworks directly scale down to this allocation line. Adjust budget parameter upward to initialize match structures.
            </div>`;
        return;
    }

    // Build dynamic structured output presentation layers loop
    matchedPolicies.forEach(policy => {
        const card = document.createElement('div');
        card.className = "bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-5 shadow-sm transition duration-150 flex flex-col md:flex-row items-start md:items-center justify-between gap-4";
        
        // Construct clear platform action triggers text strings
        const whatsappMessage = encodeURIComponent(`Hello Mr. Yogesh Shukla, I am interested in exploring the ${policy.company} ${policy.name} plan strategy for a target allocation budget of around ₹${allocationBudget.toLocaleString('en-IN')}/month. Please guide me.`);
        
        card.innerHTML = `
            <div class="space-y-1">
                <div class="flex items-center space-x-2">
                    <span class="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">${policy.company}</span>
                    <h4 class="text-base font-bold text-slate-900">${policy.name}</h4>
                </div>
                <p class="text-xs text-slate-500 font-medium">${policy.highlight}</p>
                <span class="text-[11px] text-slate-400 block pt-1">Estimated Entry Allocation Requirement: <strong class="text-slate-600">≥ ₹${policy.minBudget.toLocaleString('en-IN')}/mo</strong></span>
            </div>
            <div class="flex items-center space-x-2 w-full md:w-auto">
                <button onclick="logInquiryTrigger('${policy.name}')" class="flex-1 md:flex-none text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-lg transition text-center">
                    Request Call Back
                </button>
                <a href="https://wa.me/919830012345?text=${whatsappMessage}" target="_blank" onclick="logInquiryTrigger('${policy.name}')" class="flex-1 md:flex-none text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 rounded-lg transition text-center flex items-center justify-center space-x-1">
                    <i data-lucide="message-square" class="w-3.5 h-3.5"></i>
                    <span>Consult via WhatsApp</span>
                </a>
            </div>
        `;
        deckContainer.appendChild(card);
    });
    lucide.createIcons();
}

// LOG INCOMING INQUIRY DATA OBJECT
function logInquiryTrigger(policyName) {
    const targetDomainText = document.getElementById('userGoal').options[document.getElementById('userGoal').selectedIndex].text;
    const allocationBudget = parseInt(document.getElementById('userBudget').value);
    
    const now = new Date();
    const timestampStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

    const newLeadRecord = {
        timestamp: timestampStr,
        contact: USER_SESSION_IDENTIFIER || 'Anonymous Portal User',
        domain: targetDomainText.split('(')[0].trim(),
        budget: allocationBudget,
        actionPlan: policyName,
        status: 'New'
    };

    MASTER_LEAD_LEDGER.unshift(newLeadRecord);
    populateAdminWorkspaceView();
}

// TOGGLE VISIBILITY MATRIX BETWEEN FRONT AND WORKSPACE
function toggleAdminView(showAdmin) {
    if (showAdmin) {
        document.getElementById('portalWorkspace').classList.add('hidden');
        document.getElementById('authGateway').classList.add('hidden');
        document.getElementById('adminWorkspace').classList.remove('hidden');
        populateAdminWorkspaceView();
    } else {
        document.getElementById('adminWorkspace').classList.add('hidden');
        if (APP_STATE_CONTEXT === 'client_portal') {
            document.getElementById('portalWorkspace').classList.remove('hidden');
        } else {
            document.getElementById('authGateway').classList.remove('hidden');
        }
    }
}

// RENDER ADMINISTRATIVE TABLE MATRIX DATA LEADER
function populateAdminWorkspaceView() {
    const tableBody = document.getElementById('adminLeadTableBody');
    tableBody.innerHTML = '';

    MASTER_LEAD_LEDGER.forEach((lead, idx) => {
        const row = document.createElement('tr');
        row.className = "hover:bg-slate-50 border-b border-slate-100 transition";
        
        row.innerHTML = `
            <td class="p-4 text-xs font-mono text-slate-400">${lead.timestamp}</td>
            <td class="p-4 text-slate-900 font-semibold">${lead.contact}</td>
            <td class="p-4 text-slate-600 text-xs">${lead.domain}</td>
            <td class="p-4 text-right font-bold text-slate-900">₹${lead.budget.toLocaleString('en-IN')}</td>
            <td class="p-4"><span class="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-0.5 rounded border border-blue-100">${lead.actionPlan}</span></td>
            <td class="p-4 text-center">
                <select onchange="updateLeadStatus(${idx}, this.value)" class="text-xs font-bold rounded-lg px-2.5 py-1 bg-slate-100 border-none text-slate-700 focus:ring-2 focus:ring-blue-500">
                    <option value="New" ${lead.status === 'New' ? 'selected' : ''}>New</option>
                    <option value="In Progress" ${lead.status === 'In Progress' ? 'selected' : ''}>Contacted</option>
                    <option value="Policy Issued" ${lead.status === 'Policy Issued' ? 'selected' : ''}>Policy Issued</option>
                </select>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// UPDATE SPECIFIC STATE LOG ATTRIBUTE
function updateLeadStatus(index, newStatus) {
    MASTER_LEAD_LEDGER[index].status = newStatus;
}

// RESET WORKSPACE CONTEXT ON LOGOUT EXIT
function handleLogout() {
    USER_SESSION_IDENTIFIER = null;
    APP_STATE_CONTEXT = 'auth';
    
    // Clear field data matrices
    document.getElementById('authIdentifier').value = '';
    document.querySelectorAll('.otp-field').forEach(f => f.value = '');
    
    document.getElementById('portalWorkspace').classList.add('hidden');
    document.getElementById('adminWorkspace').classList.add('hidden');
    document.getElementById('logoutBtn').classList.add('hidden');
    
    document.getElementById('authRequestForm').classList.remove('hidden');
    document.getElementById('authVerificationForm').classList.add('hidden');
    document.getElementById('authGateway').classList.remove('hidden');
}
