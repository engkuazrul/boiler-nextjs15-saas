# Paddle Setup Guide

This guide will help you set up Paddle as an alternative payment processor.

## What is Paddle?

Paddle is a payment processing platform similar to Stripe, but designed specifically for software and SaaS businesses. It handles payments, subscriptions, tax calculations, and compliance automatically. Think of it as Stripe but with built-in tax handling and merchant of record services.

## Purpose

Paddle enables your SaaS application to:

- Accept payments from customers worldwide
- Handle subscriptions and recurring billing
- Automatically calculate and collect taxes
- Manage compliance and regulations
- Process refunds and handle customer support
- Act as merchant of record (they handle the legal side)

## Uses in This Boilerplate

In this boilerplate, Paddle is used for:

- **Payment Processing**: Accept credit card payments for subscriptions
- **Subscription Management**: Handle monthly subscription billing
- **Tax Compliance**: Automatically calculate and collect sales tax
- **Billing Portal**: Customers can manage their subscriptions
- **Alternative to Stripe**: Use Paddle instead of Stripe if preferred

## Prerequisites

- Paddle account
- Business information ready

## Step 1: Create Paddle Account

1. Go to [Paddle](https://paddle.com/)
2. Sign up for account
3. Complete business verification
4. Activate your account

## Step 2: Get API Credentials

1. Go to [Paddle Dashboard](https://vendors.paddle.com/)
2. Navigate to **Developer Tools** → **Authentication**
3. Copy:
   - **API Key** (starts with `test_` or `live_`)
   - **Client Token** (for frontend)

## Step 3: Create Products

1. Go to **Catalog** → **Products**
2. Click **Create Product**
3. Create subscription products:
   - Set name, description
   - Set pricing (monthly recurring)
   - Copy the **Product ID**

## Step 4: Configure Environment Variables

Add to your `.env` file:

```env
# Paddle Configuration
PADDLE_API_KEY="test_your-api-key"  # Test key for development
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN="test_your-client-token"  # Test token
NEXT_PUBLIC_PADDLE_API_URL="https://sandbox-api.paddle.com"  # Sandbox for dev
PADDLE_WEBHOOK_SECRET="your-webhook-secret"  # For webhooks
```

## Step 5: Set Up Webhook

1. Go to **Developer Tools** → **Notifications**
2. Click **Add Notification**
3. Set endpoint URL: `https://yourdomain.com/api/paddle/webhook`
4. Select events:
   - `subscription.created`
   - `subscription.updated`
   - `subscription.canceled`
   - `transaction.completed`
5. Copy webhook secret
6. Add to `.env`

## Step 6: Update Components

The boilerplate includes Paddle components. To use Paddle instead of Stripe:

1. Edit `src/components/User/Billing/index.tsx`:

   ```tsx
   // import Pricing from "@/stripe/StripeBilling";
   import Pricing from "@/paddle/PaddleBilling";
   ```

2. Edit `src/components/Home/Pricing/index.tsx`:
   ```tsx
   // import Pricing from "@/stripe/StripeBilling";
   import Pricing from "@/paddle/PaddleBilling";
   ```

## Step 7: Enable Payments Integration

In `integrations.config.tsx`:

```tsx
const integrations = {
	isPaymentsEnabled: true,
	// ... other integrations
};
```

## Step 8: Test Payments

### Sandbox Mode

1. Use sandbox API URL
2. Use test credentials
3. Test payment flow

### Test Flow

1. Start development server: `pnpm dev`
2. Navigate to `/user/billing`
3. Select a plan
4. Complete Paddle checkout
5. Verify subscription in Paddle dashboard

## Production Setup

### Switch to Live Mode

1. Get live API credentials from Paddle
2. Update `.env`:
   ```env
   PADDLE_API_KEY="live_your-live-api-key"
   NEXT_PUBLIC_PADDLE_CLIENT_TOKEN="live_your-live-client-token"
   NEXT_PUBLIC_PADDLE_API_URL="https://api.paddle.com"
   PADDLE_WEBHOOK_SECRET="your-live-webhook-secret"
   ```

### Production Webhook

1. Set up webhook in Paddle dashboard
2. Use production URL: `https://yourdomain.com/api/paddle/webhook`
3. Select all required events
4. Copy webhook secret

## Features

### Subscription Management

- Create subscriptions
- Update plans
- Cancel subscriptions
- View invoices

### Billing Portal

Paddle provides built-in billing portal for customers to:

- Update payment methods
- View invoices
- Manage subscriptions

## Troubleshooting

### "Invalid API key" error

- Verify key format is correct
- Check using correct test/live keys
- Ensure no extra spaces in `.env`

### Checkout not loading

- Verify client token is correct
- Check Paddle script is loaded
- Review browser console for errors

### Webhook not receiving events

- Verify webhook URL is accessible
- Check webhook secret matches
- Review Paddle dashboard webhook logs

## Resources

- [Paddle Documentation](https://developer.paddle.com/)
- [Paddle API Reference](https://developer.paddle.com/api-reference/overview)
- [Paddle Dashboard](https://vendors.paddle.com/)
