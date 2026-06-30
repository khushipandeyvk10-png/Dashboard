// Global Session state variable
let globalActiveUser = "";

// ==========================================
// REQUIREMENT 3: Client-Side Routing Engine
// ==========================================
const routes = {
    '#/signup': displaySignupScreen,
    '#/dashboard': displayDashboardScreen
};

function router() {
    const activeHash = window.location.hash || '#/signup';

    // Simple Route Protection Guard
    if (activeHash === '#/dashboard' && !globalActiveUser) {
        window.location.hash = '#/signup';
        return;
    }

    const loadTargetView = routes[activeHash];
    if (loadTargetView) loadTargetView();
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);

// ==========================================
// REQUIREMENT 2: Dynamic DOM Manipulation Views
// ==========================================
function displaySignupScreen() {
    const appContainer = document.getElementById('app');
    const signupTemplate = document.getElementById('signup-view');
    
    appContainer.innerHTML = ''; 
    appContainer.appendChild(signupTemplate.content.cloneNode(true));
    
    initializeFormValidationLogic();
}

function displayDashboardScreen() {
    const appContainer = document.getElementById('app');
    const dashboardTemplate = document.getElementById('dashboard-view');
    
    appContainer.innerHTML = '';
    appContainer.appendChild(dashboardTemplate.content.cloneNode(true));

    // Dynamic UI data insertion
    document.getElementById('user-display').textContent = globalActiveUser;

    document.getElementById('logout-btn').addEventListener('click', () => {
        globalActiveUser = "";
        window.location.hash = '#/signup';
    });
}

// ==========================================
// REQUIREMENT 1: Complex Form Validation Rules
// ==========================================
function initializeFormValidationLogic() {
    const registrationForm = document.getElementById('signup-form');
    const userField = document.getElementById('username');
    const passField = document.getElementById('password');
    const matchField = document.getElementById('confirm-password');
    const submitBtn = document.getElementById('submit-btn');

    // Live validation loop binds
    userField.addEventListener('input', runFormEvaluationSuite);
    passField.addEventListener('input', runFormEvaluationSuite);
    matchField.addEventListener('input', runFormEvaluationSuite);

    function evaluatePasswordComplexity(passwordValue) {
        let structuralPoints = 0;
        if (passwordValue.length >= 8) structuralPoints++; // Length criteria
        if (/[A-Z]/.test(passwordValue) && /[0-9]/.test(passwordValue)) structuralPoints++; // Special characters & mix case
        if (/[^A-Za-z0-9]/.test(passwordValue)) structuralPoints++; // Symbol inclusion

        const displayBar = document.getElementById('strength-bar');
        const displayLabel = document.getElementById('strength-label');

        displayBar.className = ''; // Wipe formatting classes

        if (passwordValue.length === 0) {
            displayLabel.textContent = "Strength: Unverified";
        } else if (structuralPoints === 1) {
            displayBar.classList.add('weak');
            displayLabel.textContent = "Strength: Weak (Add mixed cases & symbols)";
        } else if (structuralPoints === 2) {
            displayBar.classList.add('medium');
            displayLabel.textContent = "Strength: Medium (Add a unique symbol)";
        } else if (structuralPoints === 3) {
            displayBar.classList.add('strong');
            displayLabel.textContent = "Strength: Strong! Highly Secure ✅";
        }

        return structuralPoints;
    }

    function runFormEvaluationSuite() {
        let isValidationClear = true;

        // Rule 1: Username Length validation Check
        if (userField.value.trim().length >= 6) {
            markElementValid(userField, 'username-error');
        } else {
            markElementInvalid(userField, 'username-error', 'Username requires a minimum of 3 characters.');
            isValidationClear = false;
        }

        // Rule 2: Password Complexity evaluation
        const currentScore = evaluatePasswordComplexity(passField.value);
        if (currentScore === 3) {
            markElementValid(passField, 'password-error');
        } else {
            markElementInvalid(passField, 'password-error', 'Password must satisfy all complexity constraints.');
            isValidationClear = false;
        }

        // Rule 3: Confirmed Match validation target logic
        if (matchField.value === passField.value && matchField.value.length > 0) {
            markElementValid(matchField, 'confirm-error');
        } else {
            markElementInvalid(matchField, 'confirm-error', 'Input text records do not match.');
            isValidationClear = false;
        }

        // Dynamic element node modifications state toggle
        submitBtn.disabled = !isValidationClear;
    }

    function markElementValid(targetNode, errorId) {
        targetNode.classList.remove('invalid');
        targetNode.classList.add('valid');
        document.getElementById(errorId).textContent = '';
    }

    function markElementInvalid(targetNode, errorId, dynamicTextString) {
        targetNode.classList.remove('valid');
        if (targetNode.value.length > 0) targetNode.classList.add('invalid');
        document.getElementById(errorId).textContent = dynamicTextString;
    }

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        globalActiveUser = userField.value.trim();
        // Shift active hash window reference instantly invoking client router
        window.location.hash = '#/dashboard';
    });
}