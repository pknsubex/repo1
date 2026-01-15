# FraudZap - Login Homepage

A secure and responsive login interface for the FraudZap fraud detection platform.

## Features

### ✅ Implemented Requirements

1. **Login Form**
   - Email input field with validation
   - Password input field (masked for security)
   - Login button for authentication

2. **Valid Login**
   - Authentication with valid credentials
   - Automatic redirect to dashboard upon success
   - Session token management

3. **Invalid Credentials**
   - Clear error messages for invalid login attempts
   - Displays remaining attempts before lockout
   - User-friendly error notifications

4. **Forgot Password**
   - "Forgot Password?" link on login page
   - Modal dialog for password reset
   - Email-based password recovery flow

5. **Security Features**
   - Password input masking
   - HTTPS enforcement (redirects to secure connection)
   - Account lockout after 5 failed attempts
   - 5-minute lockout duration with automatic unlock
   - Client-side rate limiting and throttling
   - Session storage for authentication tokens

6. **Usability**
   - Fast page load performance
   - Responsive design for desktop resolutions
   - Accessible UI with ARIA labels and keyboard navigation
   - Smooth animations and transitions
   - Loading states for better UX

## Files

- `index.html` - Main login page
- `styles.css` - Responsive styling and animations
- `script.js` - Authentication logic and security features
- `dashboard.html` - Post-login dashboard (demo)

## Usage

### Opening the Login Page

Simply open `index.html` in a web browser:

```bash
# Using Python's built-in server
python3 -m http.server 8000

# Using Node.js http-server (if installed)
npx http-server

# Or just open the file
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

### Test Credentials

For demonstration purposes, the following mock credentials are available:

- Email: `admin@fraudzap.com` / Password: `Admin@123`
- Email: `user@fraudzap.com` / Password: `User@123`

### Security Features in Action

1. **Account Lockout**: Try entering wrong credentials 5 times to see the account lockout feature
2. **Password Reset**: Click "Forgot Password?" to test the password recovery flow
3. **HTTPS Enforcement**: The application checks for HTTPS connections (except on localhost)

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Accessibility

- ARIA labels for screen readers
- Keyboard navigation support
- High contrast error messages
- Focus indicators for all interactive elements

## Security Notes

⚠️ **IMPORTANT - DEMONSTRATION ONLY**: This is a frontend demonstration with mock authentication. In a production environment, you MUST implement the following:

### Critical Security Requirements for Production:

1. **Server-Side Authentication**
   - All authentication MUST be handled by a secure backend server
   - Never store credentials in client-side code
   - Use secure session management (JWT tokens, secure cookies)

2. **Password Security**
   - Use proper password hashing algorithms (bcrypt, argon2, scrypt)
   - Implement constant-time comparison to prevent timing attacks
   - Never send or compare passwords client-side

3. **Transport Security**
   - Use HTTPS with valid SSL/TLS certificates for all connections
   - Implement HTTP Strict Transport Security (HSTS)
   - Enforce secure cookies with HttpOnly and Secure flags

4. **Rate Limiting & Protection**
   - Implement server-side rate limiting for login attempts
   - Add CAPTCHA after failed login attempts
   - Use CSRF tokens to prevent cross-site request forgery
   - Implement IP-based throttling and monitoring

5. **Token Security**
   - Use cryptographically secure, unpredictable tokens
   - Implement proper token expiration and refresh mechanisms
   - Store tokens securely (httpOnly cookies preferred over localStorage)

6. **Additional Security Measures**
   - Implement Content Security Policy (CSP)
   - Add input validation and sanitization on both client and server
   - Use parameterized queries to prevent SQL injection
   - Implement proper logging and monitoring
   - Regular security audits and penetration testing

## Architecture

The login page is built with vanilla HTML, CSS, and JavaScript for simplicity and performance:

- No external dependencies
- Lightweight and fast loading
- Easy to integrate with any backend
- Modern ES6+ JavaScript
- CSS3 animations and flexbox layout