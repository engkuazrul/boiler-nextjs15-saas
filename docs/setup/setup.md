# Setup Guide

Welcome to the SaaSBold Next.js 15 SaaS Boilerplate setup guide. This document provides an overview of all available integrations and links to detailed setup instructions for each one.

## Prerequisites

- **Node.js**: >= 14.0.0 (recommended: 18.x or higher)
- **Package Manager**: pnpm (recommended), npm, or yarn
- **Database**: PostgreSQL
- **Git**: For version control

## Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd boiler-nextjs15-saas
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory. See [Environment Variables](#environment-variables) section below.

4. **Set up the database**

   ```bash
   # Generate Prisma Client
   pnpm prisma generate

   # Run migrations
   pnpm prisma migrate dev
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables. Each integration has its own setup guide with specific environment variables needed.

### Core Required Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
SHADOW_DATABASE_URL="postgresql://user:password@localhost:5432/shadow_dbname" # Optional, for cloud providers

# NextAuth
SECRET="your-secret-key-here" # Generate with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
```

## Integration Setup Guides

Follow these guides to set up each integration:

### Core Integrations

- **[Authentication Setup](./setup-auth.md)** - NextAuth.js with multiple providers
- **[Database Setup](./setup-database.md)** - PostgreSQL with Prisma

### Optional Integrations

- **[Sanity CMS Setup](./setup-sanity.md)** - Content management for blog
- **[OpenAI Setup](./setup-openai.md)** - AI content generation
- **[Algolia Setup](./setup-algolia.md)** - Search functionality
- **[Mailchimp Setup](./setup-mailchimp.md)** - Newsletter management
- **[Stripe Setup](./setup-stripe.md)** - Payment processing
- **[Paddle Setup](./setup-paddle.md)** - Alternative payment processor
- **[LemonSqueezy Setup](./setup-lemonsqueezy.md)** - Alternative payment processor
- **[AWS S3 / Cloudflare R2 Setup](./setup-storage.md)** - File storage
- **[Internationalization Setup](./setup-i18n.md)** - Multi-language support

## Enabling/Disabling Integrations

All integrations can be enabled or disabled in `integrations.config.tsx`:

```tsx
const integrations = {
	isSanityEnabled: true, // Enable Sanity CMS
	isOpenAIEnabled: true, // Enable OpenAI
	isAlgoliaEnabled: true, // Enable Algolia Search
	isMailchimpEnabled: true, // Enable Mailchimp
	isAuthEnabled: true, // Enable Authentication
	isPaymentsEnabled: true, // Enable Payment integrations
	isI18nEnabled: false, // Enable Internationalization
};
```

## Next Steps

1. Set up your database (see [Database Setup](./setup-database.md))
2. Configure authentication (see [Auth Setup](./setup-auth.md))
3. Choose and configure payment provider (see payment setup guides)
4. Enable optional integrations as needed

## Troubleshooting

### Common Issues

**Module not found errors:**

- Run `pnpm install` to ensure all dependencies are installed
- Clear Next.js cache: `rm -rf .next`
- Restart your development server

**Database connection errors:**

- Verify your `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Check database credentials

**Environment variable errors:**

- Ensure all required variables are set in `.env`
- Restart your development server after adding new variables
- Check for typos in variable names

## Support

For more help, visit:

- [Documentation](https://docs.saasbold.com)
- [Support](https://saasbold.com/support)
- [Community](https://pimjo.com/community)
