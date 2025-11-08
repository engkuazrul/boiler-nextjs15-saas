# Database Setup Guide

This guide will help you set up PostgreSQL database with Prisma ORM for the SaaSBold boilerplate.

## What is PostgreSQL?

PostgreSQL is a powerful, open-source relational database system. It stores and organizes your application's data in tables with relationships between them. Think of it as a digital filing cabinet that can handle complex queries and large amounts of data efficiently.

## Purpose

PostgreSQL serves as the foundation for storing all your application data:

- User accounts and authentication information
- Subscription and payment records
- Blog posts and content
- API keys and user settings
- Session data and tokens

## Uses in This Boilerplate

In this boilerplate, the database is used to store:

- **User Accounts**: Email, password, profile information, roles (USER/ADMIN)
- **Authentication**: Sessions, OAuth accounts, verification tokens
- **Subscriptions**: Customer IDs, subscription IDs, plan information, billing dates
- **API Keys**: User-generated API keys for accessing your API
- **Invitations**: User invitation tokens and status
- **Blog Content**: References to Sanity CMS content (if using Sanity)

## Prerequisites

- PostgreSQL installed and running
- Access to create databases

## Step 1: Install PostgreSQL

### macOS

```bash
brew install postgresql@14
brew services start postgresql@14
```

### Linux (Ubuntu/Debian)

```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Windows

Download and install from [PostgreSQL official website](https://www.postgresql.org/download/windows/)

## Step 2: Create Database

Connect to PostgreSQL and create a database:

```bash
psql postgres
```

Then create the database:

```sql
CREATE DATABASE saasbold_db;
CREATE DATABASE saasbold_shadow_db; -- Optional, for migrations
```

## Step 3: Configure Environment Variables

Add to your `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/saasbold_db"
SHADOW_DATABASE_URL="postgresql://username:password@localhost:5432/saasbold_shadow_db"
```

Replace:

- `username` - Your PostgreSQL username
- `password` - Your PostgreSQL password
- `saasbold_db` - Your database name

## Step 4: Generate Prisma Client

```bash
pnpm prisma generate
```

## Step 5: Run Migrations

```bash
pnpm prisma migrate dev --name init
```

This will:

- Create all tables based on the schema
- Generate migration files
- Apply migrations to your database

## Step 6: (Optional) Seed Database

If you have seed data, run:

```bash
pnpm prisma db seed
```

## Step 7: Verify Setup

Open Prisma Studio to view your database:

```bash
pnpm prisma studio
```

This opens a GUI at `http://localhost:5555` where you can view and edit your data.

## Database Schema Overview

The schema includes these models:

- **User** - User accounts with authentication and subscription data
- **Account** - OAuth account connections
- **Session** - User sessions
- **ApiKey** - API keys for users
- **Invitation** - User invitation tokens
- **VerificationToken** - Email verification tokens

## Production Setup

For production, use a managed PostgreSQL service:

### Recommended Providers:

- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)
- [Neon](https://neon.tech)
- [AWS RDS](https://aws.amazon.com/rds/postgresql/)

### Production Environment Variables

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"
SHADOW_DATABASE_URL="postgresql://user:password@host:5432/shadow_dbname?sslmode=require"
```

## Troubleshooting

### Connection Refused

- Ensure PostgreSQL is running: `pg_isready`
- Check if PostgreSQL is listening on the correct port (default: 5432)
- Verify firewall settings

### Authentication Failed

- Check username and password in `DATABASE_URL`
- Verify PostgreSQL authentication method in `pg_hba.conf`

### Migration Errors

- Ensure database exists
- Check user has CREATE privileges
- Verify `SHADOW_DATABASE_URL` if using cloud providers

## Useful Commands

```bash
# View database schema
pnpm prisma db pull

# Reset database (WARNING: Deletes all data)
pnpm prisma migrate reset

# Create a new migration
pnpm prisma migrate dev --name migration_name

# Apply migrations in production
pnpm prisma migrate deploy

# Format Prisma schema
pnpm prisma format
```
