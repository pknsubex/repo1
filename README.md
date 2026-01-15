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

⚠️ **Important**: This is a frontend demonstration. In a production environment:

- User authentication should be handled server-side
- Passwords should never be stored in frontend code
- Use proper JWT tokens or session cookies
- Implement CSRF protection
- Use HTTPS with valid SSL certificates
- Add server-side rate limiting
- Implement proper password hashing (bcrypt, argon2, etc.)

## Architecture

The login page is built with vanilla HTML, CSS, and JavaScript for simplicity and performance:

- No external dependencies
- Lightweight and fast loading
- Easy to integrate with any backend
- Modern ES6+ JavaScript
- CSS3 animations and flexbox layout