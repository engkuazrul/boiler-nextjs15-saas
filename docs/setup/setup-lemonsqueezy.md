# LemonSqueezy Setup Guide

This guide will help you set up LemonSqueezy as an alternative payment processor.

## What is LemonSqueezy?

LemonSqueezy is a payment platform designed for digital products and SaaS businesses. It handles payments, subscriptions, tax collection, and compliance automatically. Similar to Paddle, it acts as a merchant of record, meaning they handle all the legal and tax complexities for you.

## Purpose

LemonSqueezy enables your SaaS application to:

- Accept payments for subscriptions and digital products
- Handle recurring billing automatically
- Calculate and collect taxes worldwide
- Manage compliance and regulations
- Process refunds and cancellations
- Provide a simple checkout experience

## Uses in This Boilerplate

In this boilerplate, LemonSqueezy is used for:

- **Payment Processing**: Accept payments for subscription plans
- **Subscription Management**: Handle monthly recurring subscriptions
- **Tax Handling**: Automatically calculate and collect sales tax
- **Billing Portal**: Customers can manage subscriptions and view invoices
- **Alternative Payment Option**: Use instead of Stripe or Paddle

## Prerequisites

- LemonSqueezy account
- Store created

## Step 1: Create LemonSqueezy Account

1. Go to [LemonSqueezy](https://lemonsqueezy.com/)
2. Sign up for account
3. Complete business verification

## Step 2: Create Store

1. In LemonSqueezy dashboard, create a store
2. Complete store setup
3. Note your **Store ID**

## Step 3: Get API Key

1. Go to **Settings** → **API**
2. Click **Create API Key**
3. Name it (e.g., "SaaSBold API Key")
4. Copy the API key (starts with `sk_`)

## Step 4: Create Products

1. Go to **Products**
2. Click **Create Product**
3. Create subscription products:
   - Set name, description
   - Set pricing (monthly recurring)
   - Copy the **Variant ID** (starts with `variant_`)

## Step 5: Configure Environment Variables

Add to your `.env` file:

```env
# LemonSqueezy Configuration
LEMON_SQUEEZY_API_KEY="sk_your-api-key"
LEMON_SQUEEZY_STORE_ID="your-store-id"
LEMON_SQUEEZY_WEBHOOK_SIGNATURE="your-webhook-signature"  # For webhooks
```

## Step 6: Set Up Webhook

1. Go to **Settings** → **Webhooks**
2. Click **Create Webhook**
3. Set endpoint URL: `https://yourdomain.com/api/lemon-squeezy/webhook`
4. Select events:
   - `subscription_created`
   - `subscription_updated`
   - `subscription_cancelled`
   - `order_created`
5. Copy webhook signature
6. Add to `.env`

## Step 7: Update Components

To use LemonSqueezy instead of Stripe:

1. Edit `src/components/User/Billing/index.tsx`:

   ```tsx
   // import Pricing from "@/stripe/StripeBilling";
   // import Pricing from "@/paddle/PaddleBilling";
   import Pricing from "@/lemonSqueezy/LsBilling";
   ```

2. Edit `src/components/Home/Pricing/index.tsx`:
   ```tsx
   // import Pricing from "@/stripe/StripeBilling";
   // import Pricing from "@/paddle/PaddleBilling";
   import Pricing from "@/lemonSqueezy/LsBilling";
   ```

## Step 8: Update Price IDs

Edit `src/pricing/pricingData.ts` and update variant IDs:

```typescript
{
  priceId: "variant_1234567890", // Your LemonSqueezy Variant ID
  unit_amount: 99 * 100,
  // ...
}
```

## Step 9: Enable Payments Integration

In `integrations.config.tsx`:

```tsx
const integrations = {
	isPaymentsEnabled: true,
	// ... other integrations
};
```

## Step 10: Test Payments

1. Start development server: `pnpm dev`
2. Navigate to `/user/billing`
3. Select a plan
4. Complete LemonSqueezy checkout
5. Verify subscription in dashboard

## Production Setup

### Environment Variables

```env
LEMON_SQUEEZY_API_KEY="sk_your-production-api-key"
LEMON_SQUEEZY_STORE_ID="your-production-store-id"
LEMON_SQUEEZY_WEBHOOK_SIGNATURE="your-production-webhook-signature"
```

### Production Webhook

1. Set up webhook in LemonSqueezy dashboard
2. Use production URL: `https://yourdomain.com/api/lemon-squeezy/webhook`
3. Select all required events
4. Copy webhook signature

## Features

### Subscription Management

- Create subscriptions via checkout
- Cancel subscriptions
- Update plans
- View subscription status

### API Integration

The boilerplate includes:

- Payment API: `/api/lemon-squeezy/payment`
- Cancel subscription: `/api/lemon-squeezy/cancel-subscription`
- Webhook handler: `/api/lemon-squeezy/webhook`

## Troubleshooting

### "Invalid API key" error

- Verify key starts with `sk_`
- Check key hasn't been revoked
- Ensure no extra spaces in `.env`

### Checkout not working

- Verify store ID is correct
- Check variant IDs match products
- Review browser console for errors

### Webhook not receiving events

- Verify webhook URL is accessible
- Check webhook signature matches
- Review LemonSqueezy dashboard webhook logs

## Resources

- [LemonSqueezy Documentation](https://docs.lemonsqueezy.com/)
- [LemonSqueezy API Reference](https://docs.lemonsqueezy.com/api)
- [LemonSqueezy Dashboard](https://app.lemonsqueezy.com/)
