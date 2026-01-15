// Configuration
const CONFIG = {
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 300000, // 5 minutes in milliseconds
    DASHBOARD_URL: 'dashboard.html'
};

// State management
let loginAttempts = 0;
let isAccountLocked = false;
let lockoutTimer = null;

// Mock user database for DEMONSTRATION ONLY
// ⚠️ SECURITY WARNING: In production, this MUST be implemented server-side
// Never store credentials in client-side code - this is for demo purposes only
const MOCK_USERS = {
    'admin@fraudzap.com': 'Admin@123',
    'user@fraudzap.com': 'User@123'
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if previously locked
    checkAccountLockStatus();
    
    // Enforce HTTPS
    enforceHTTPS();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load attempt count from sessionStorage
    const storedAttempts = sessionStorage.getItem('loginAttempts');
    if (storedAttempts) {
        loginAttempts = parseInt(storedAttempts);
    }
});

// Enforce HTTPS connection
function enforceHTTPS() {
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        console.warn('⚠️ Insecure connection detected. HTTPS is required for production.');
        // ⚠️ PRODUCTION NOTE: Uncomment the line below to redirect to HTTPS in production
        // window.location.href = 'https://' + window.location.host + window.location.pathname;
    }
}

// Check if account is locked
function checkAccountLockStatus() {
    const lockoutExpiry = localStorage.getItem('lockoutExpiry');
    if (lockoutExpiry) {
        const expiryTime = parseInt(lockoutExpiry);
        const currentTime = Date.now();
        
        if (currentTime < expiryTime) {
            isAccountLocked = true;
            const remainingTime = Math.ceil((expiryTime - currentTime) / 1000);
            showError(`Account temporarily locked. Please try again in ${remainingTime} seconds.`);
            disableLoginForm();
            
            // Set timer to unlock
            lockoutTimer = setTimeout(() => {
                unlockAccount();
            }, expiryTime - currentTime);
        } else {
            unlockAccount();
        }
    }
}

// Disable login form
function disableLoginForm() {
    const loginButton = document.getElementById('loginButton');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    loginButton.disabled = true;
    emailInput.disabled = true;
    passwordInput.disabled = true;
}

// Enable login form
function enableLoginForm() {
    const loginButton = document.getElementById('loginButton');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    loginButton.disabled = false;
    emailInput.disabled = false;
    passwordInput.disabled = false;
}

// Unlock account
function unlockAccount() {
    isAccountLocked = false;
    loginAttempts = 0;
    localStorage.removeItem('lockoutExpiry');
    sessionStorage.removeItem('loginAttempts');
    enableLoginForm();
    hideError();
    
    if (lockoutTimer) {
        clearTimeout(lockoutTimer);
        lockoutTimer = null;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLogin);
    
    // Forgot password link
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    forgotPasswordLink.addEventListener('click', openForgotPasswordModal);
    
    // Forgot password form
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    
    // Modal close button
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', closeForgotPasswordModal);
    
    // Close modal when clicking outside
    const modal = document.getElementById('forgotPasswordModal');
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeForgotPasswordModal();
        }
    });
}

// Handle login submission
async function handleLogin(event) {
    event.preventDefault();
    
    if (isAccountLocked) {
        showError('Account is temporarily locked due to multiple failed login attempts.');
        return;
    }
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // Validate inputs
    if (!validateEmail(email)) {
        showError('Please enter a valid email address.');
        return;
    }
    
    if (!password) {
        showError('Please enter your password.');
        return;
    }
    
    // Show loading state
    const loginButton = document.getElementById('loginButton');
    loginButton.classList.add('loading');
    loginButton.disabled = true;
    hideError();
    
    // Simulate authentication delay (network request)
    setTimeout(() => {
        authenticateUser(email, password);
        loginButton.classList.remove('loading');
        loginButton.disabled = false;
    }, 800);
}

// Authenticate user
function authenticateUser(email, password) {
    // ⚠️ PRODUCTION NOTE: This is a client-side demo only
    // In production:
    // - Make HTTPS API call to backend authentication endpoint
    // - Use proper password hashing (bcrypt, argon2, etc.)
    // - Use constant-time comparison to prevent timing attacks
    // - Never compare passwords client-side
    
    if (MOCK_USERS[email] && MOCK_USERS[email] === password) {
        // Successful login
        loginAttempts = 0;
        sessionStorage.removeItem('loginAttempts');
        localStorage.removeItem('lockoutExpiry');
        
        // Store authentication token (in production)
        // ⚠️ PRODUCTION NOTE: Use cryptographically secure JWT tokens from server
        // This mock token is for demonstration only
        sessionStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
        sessionStorage.setItem('userEmail', email);
        
        // Redirect to dashboard
        showSuccess('Login successful! Redirecting to dashboard...');
        setTimeout(() => {
            window.location.href = CONFIG.DASHBOARD_URL;
        }, 1000);
    } else {
        // Failed login
        loginAttempts++;
        sessionStorage.setItem('loginAttempts', loginAttempts.toString());
        
        if (loginAttempts >= CONFIG.MAX_LOGIN_ATTEMPTS) {
            lockAccount();
        } else {
            const remainingAttempts = CONFIG.MAX_LOGIN_ATTEMPTS - loginAttempts;
            showError(`Invalid email or password. ${remainingAttempts} attempt(s) remaining.`);
        }
    }
}

// Lock account after max attempts
function lockAccount() {
    isAccountLocked = true;
    const lockoutExpiry = Date.now() + CONFIG.LOCKOUT_DURATION;
    localStorage.setItem('lockoutExpiry', lockoutExpiry.toString());
    
    showError(`Account locked due to multiple failed login attempts. Please try again in ${CONFIG.LOCKOUT_DURATION / 60000} minutes.`);
    disableLoginForm();
    
    // Set timer to unlock
    lockoutTimer = setTimeout(() => {
        unlockAccount();
    }, CONFIG.LOCKOUT_DURATION);
}

// Validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Hide error message
function hideError() {
    const errorElement = document.getElementById('errorMessage');
    errorElement.classList.remove('show');
}

// Show success message (for login)
function showSuccess(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.style.backgroundColor = '#d1fae5';
    errorElement.style.color = '#065f46';
    errorElement.style.borderLeftColor = '#10b981';
    errorElement.classList.add('show');
}

// Open forgot password modal
function openForgotPasswordModal(event) {
    event.preventDefault();
    const modal = document.getElementById('forgotPasswordModal');
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.getElementById('resetEmail').focus();
}

// Close forgot password modal
function closeForgotPasswordModal() {
    const modal = document.getElementById('forgotPasswordModal');
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.getElementById('forgotPasswordForm').reset();
    hideResetMessage();
}

// Handle forgot password submission
function handleForgotPassword(event) {
    event.preventDefault();
    
    const resetEmail = document.getElementById('resetEmail').value.trim();
    
    if (!validateEmail(resetEmail)) {
        showResetError('Please enter a valid email address.');
        return;
    }
    
    // Simulate sending reset email
    showResetSuccess(`Password reset link has been sent to ${resetEmail}. Please check your email.`);
    
    // Auto-close modal after 3 seconds
    setTimeout(() => {
        closeForgotPasswordModal();
    }, 3000);
}

// Show reset message
function showResetSuccess(message) {
    const resetMessage = document.getElementById('resetMessage');
    resetMessage.textContent = message;
    resetMessage.classList.add('show');
}

// Show reset error
function showResetError(message) {
    const resetMessage = document.getElementById('resetMessage');
    resetMessage.textContent = message;
    resetMessage.style.backgroundColor = '#fee2e2';
    resetMessage.style.color = '#dc2626';
    resetMessage.style.borderLeftColor = '#dc2626';
    resetMessage.classList.add('show');
}

// Hide reset message
function hideResetMessage() {
    const resetMessage = document.getElementById('resetMessage');
    resetMessage.classList.remove('show');
    resetMessage.style.backgroundColor = '#d1fae5';
    resetMessage.style.color = '#065f46';
    resetMessage.style.borderLeftColor = '#10b981';
}

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (lockoutTimer) {
        clearTimeout(lockoutTimer);
    }
});
