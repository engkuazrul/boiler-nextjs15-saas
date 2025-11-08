# SaaSBold - Next.js 15 SaaS Boilerplate

Thanks for choosing SaaSBold 🙌

A full-stack SaaS boilerplate and starter kit built on Next.js 15. Comes with all essential integrations, pages, components, user/admin dashboards, landing page, design source and everything you need to turn your feature-rich SaaS startup idea into reality.

## 🚀 Quick Links

- **[Documentation](https://saasbold.com/docs)** - Complete setup and integration guides
- **[Homepage](https://saasbold.com)** - Learn more about SaaSBold
- **[Support](https://saasbold.com/support)** - Get help and support
- **[Community](https://pimjo.com/community)** - Join our community

## ✨ Key Features

- **🔐 Authentication** - NextAuth.js with multiple providers (Email, Google, GitHub, Magic Links)
- **💳 Payment Processing** - Stripe, Paddle, and LemonSqueezy integrations
- **📝 Content Management** - Sanity CMS for blog management
- **🔍 Search** - Algolia integration for powerful search functionality
- **🌐 Internationalization** - Multi-language support (en, de) with `next-intl`
- **📊 Admin Dashboard** - Complete admin panel with user management, analytics, and more
- **👤 User Dashboard** - User profile, billing, and account management
- **📧 Email** - Newsletter integration with Mailchimp
- **🤖 AI Integration** - OpenAI integration for content generation
- **☁️ File Storage** - AWS S3 and Cloudflare R2 support
- **🎨 Modern UI** - Beautiful, responsive design with Tailwind CSS and Shadcn UI
- **🔒 Security** - Rate limiting, API validation with Zod, and secure authentication

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI, Radix UI
- **Payments:** Stripe, Paddle, LemonSqueezy
- **CMS:** Sanity
- **Search:** Algolia
- **Email:** Nodemailer, Mailchimp
- **AI:** OpenAI
- **Storage:** AWS S3, Cloudflare R2

## 📋 Prerequisites

- **Node.js** >= 14.0.0 (recommended: 18.x or higher)
- **Package Manager:** pnpm (recommended), npm, or yarn
- **Database:** PostgreSQL
- **Git** for version control

## 🚀 Quick Start

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
   Create a `.env` file in the root directory. See [Setup Guide](./docs/setup/setup.md) for detailed instructions.

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

Visit `http://localhost:3000` to see your application.

## 📚 Documentation

For detailed setup instructions, visit the [Setup Guide](./docs/setup/setup.md) or check out individual integration guides:

- [Authentication Setup](./docs/setup/setup-auth.md)
- [Database Setup](./docs/setup/setup-database.md)
- [Stripe Setup](./docs/setup/setup-stripe.md)
- [Paddle Setup](./docs/setup/setup-paddle.md)
- [LemonSqueezy Setup](./docs/setup/setup-lemonsqueezy.md)
- [Sanity CMS Setup](./docs/setup/setup-sanity.md)
- [Algolia Setup](./docs/setup/setup-algolia.md)
- [OpenAI Setup](./docs/setup/setup-openai.md)
- [Mailchimp Setup](./docs/setup/setup-mailchimp.md)
- [Storage Setup](./docs/setup/setup-storage.md)
- [Internationalization Setup](./docs/setup/setup-i18n.md)

## 🔧 Configuration

All integrations can be enabled or disabled in `integrations.config.tsx`. See the [Setup Guide](./docs/setup/setup.md) for more details.

## 📜 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm check-style` - Check code formatting and linting
- `pnpm fix-style` - Auto-fix formatting and linting issues
- `pnpm test-build` - Run style checks and build

## 📝 Update Logs

### 📆 26 March 2025

- Update next.js for [CVE-2025-29927](https://nextjs.org/blog/cve-2025-29927) patch

### 📆 19 March 2025

- Fixed peer dependency issue while installing the application
- Migrated to `react-instantsearch` from `react-instantsearch-dom`

### 📆 26 February 2025

- Internationalization support (en and de) with `next-intl`
- Added Language Switcher dropdown
- Resolved React Quill support issue

### 📆 06 February 2025

- Rate limiting for Magic Links and email-password authentication
- Request body validation of API endpoints using Zod
- Preventing sensitive data being exposed on API routes

### 📆 28 November 2024

- Integrated zod for Form validation
- Upgraded to Next.js 15

### 📆 27 October 2024

- Updated sanity integration enable/disable
- Removed lock file to prevent unexpected errors
- Updated package.json file

### 📆 11 September 2024

- Added integrations enable/disable features

### 📆 13 June 2024

- Added Paddle Integration
- Added Cancel Subscription API on LemonSqueezy integration
- Separated Stripe, LemonSqueezy and Paddle Billing pages

**Update Guide:**
- `api` → `lemon-squeezy` (all the APIs updated)
- `libs` → `auth.ts`
- Stripe → StripeBilling, Paddle → PaddleBilling, LemonSqueezy → LsBilling

### 📆 26 May 2024

- Added User Impersonation
- Added Invitation from admin dashboard

**Update Guide:**
- `prisma` → `schema.prisma`
- `src` → `app` → `user` → `invite`
- `components` → `Auth` → `InvitedSignin`
- `components` → `Admin` → `Users` → `UsersActions.tsx` and `UserTopbar.tsx`
- `libs` → `auth.ts`

### 📆 15 May 2024

- Added LemonSqueezy Integration

### 📆 07 April 2024

- Fixed mobile nav toggle issue
- Removed breadcrumb from single blog page
- Updated Layout (to prevent client rendering):
  - Moved pre-loader logic to PreLoader File
  - Moved header & footer to HeaderWrapper & FooterWrapper
