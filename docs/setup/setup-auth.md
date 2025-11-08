# Authentication Setup Guide

This guide covers setting up NextAuth.js with multiple authentication providers.

## What is Authentication?

Authentication is the process of verifying who a user is. It's like showing your ID to prove you are who you say you are. In web applications, this allows users to log in and access their personal accounts and data.

## Purpose

Authentication enables your SaaS application to:

- Secure user accounts and protect user data
- Allow users to sign up and log in to your application
- Provide different access levels (regular users vs. admins)
- Enable password reset and account recovery
- Support multiple login methods (email, Google, GitHub)

## Uses in This Boilerplate

In this boilerplate, authentication is used for:

- **User Registration**: New users can create accounts with email and password
- **User Login**: Multiple login methods (email/password, magic links, Google, GitHub)
- **Session Management**: Keep users logged in securely
- **Role-Based Access**: Different dashboards for regular users and admins
- **Password Reset**: Users can reset forgotten passwords via email
- **User Impersonation**: Admins can temporarily log in as other users for support
- **Protected Routes**: Secure access to user and admin dashboards

## Prerequisites

- Database configured (see [Database Setup](./setup-database.md))
- NextAuth secret key generated

## Step 1: Generate NextAuth Secret

Generate a secure random secret:

```bash
openssl rand -base64 32
```

Or use an online generator: [generate-secret.vercel.app](https://generate-secret.vercel.app/32)

## Step 2: Core Environment Variables

Add to your `.env` file:

```env
# NextAuth Configuration
SECRET="your-generated-secret-here"
NEXTAUTH_URL="http://localhost:3000"  # Development
# NEXTAUTH_URL="https://yourdomain.com"  # Production
```

## Step 3: Email Provider Setup (Magic Links)

For passwordless email authentication, configure SMTP:

```env
# Email Server Configuration
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@yourdomain.com"
```

### Gmail Setup

1. Enable 2-Factor Authentication
2. Generate App Password:
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Generate App Password
   - Use the generated password in `EMAIL_SERVER_PASSWORD`

### Other Email Providers

**SendGrid:**

```env
EMAIL_SERVER_HOST="smtp.sendgrid.net"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="apikey"
EMAIL_SERVER_PASSWORD="your-sendgrid-api-key"
```

**Mailgun:**

```env
EMAIL_SERVER_HOST="smtp.mailgun.org"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-mailgun-username"
EMAIL_SERVER_PASSWORD="your-mailgun-password"
```

**Resend:**

```env
EMAIL_SERVER_HOST="smtp.resend.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="resend"
EMAIL_SERVER_PASSWORD="your-resend-api-key"
```

## Step 4: OAuth Providers (Optional)

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Configure consent screen
6. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
7. Copy Client ID and Client Secret

Add to `.env`:

```env
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### GitHub OAuth

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - Application name: Your App Name
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Generate a new client secret
5. Copy Client ID and Client Secret

Add to `.env`:

```env
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

## Step 5: Enable Authentication

In `integrations.config.tsx`, ensure auth is enabled:

```tsx
const integrations = {
	isAuthEnabled: true,
	// ... other integrations
};
```

## Step 6: Test Authentication

1. Start your development server: `pnpm dev`
2. Navigate to `/auth/signin`
3. Test each authentication method:
   - Email/Password
   - Magic Link (Email)
   - Google (if configured)
   - GitHub (if configured)

## Authentication Methods Available

### 1. Email/Password

- Users can register with email and password
- Passwords are hashed with bcrypt
- Password reset functionality included

### 2. Magic Links

- Passwordless authentication via email
- Users receive a sign-in link via email
- Rate limited for security

### 3. OAuth Providers

- Google OAuth
- GitHub OAuth
- Easy to add more providers

### 4. User Impersonation (Admin Only)

- Admins can impersonate users for support
- Configured in `src/libs/auth.ts`

## User Roles

The system supports two roles:

- **USER** - Regular user access
- **ADMIN** - Admin dashboard access

To create an admin user, update the database:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'admin@example.com';
```

Or use Prisma Studio:

```bash
pnpm prisma studio
```

## Production Considerations

### Update NEXTAUTH_URL

```env
NEXTAUTH_URL="https://yourdomain.com"
```

### Update OAuth Redirect URIs

For production, update redirect URIs in OAuth provider settings:

- Google: `https://yourdomain.com/api/auth/callback/google`
- GitHub: `https://yourdomain.com/api/auth/callback/github`

### Security Best Practices

1. Use strong SECRET (at least 32 characters)
2. Enable HTTPS in production
3. Set secure cookie settings
4. Use environment variables for all secrets
5. Regularly rotate OAuth client secrets

## Troubleshooting

### "Invalid credentials" error

- Check email/password are correct
- Verify user exists in database
- Check password hashing is working

### OAuth redirect errors

- Verify redirect URI matches exactly
- Check OAuth client ID and secret
- Ensure callback URL is correct

### Email not sending

- Verify SMTP credentials
- Check email server port (587 for TLS, 465 for SSL)
- Test SMTP connection
- Check spam folder

### Session not persisting

- Verify SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

## Additional Features

### Password Reset

- Users can request password reset at `/auth/forgot-password`
- Reset tokens expire after 1 hour
- Configured in `src/app/api/forgot-password/`

### User Invitations

- Admins can invite users via email
- Invitation tokens expire after 7 days
- Configured in `src/app/api/user/invite/`
