# Stripe Setup Guide

This guide will help you set up Stripe for payment processing and subscriptions.

## What is Stripe?

Stripe is a payment processing platform that allows you to accept payments online. It handles credit cards, debit cards, and other payment methods securely. Stripe manages the complex parts of payment processing like security, compliance, and fraud prevention, so you can focus on building your product.

## Purpose

Stripe enables your SaaS application to:

- Accept subscription payments from customers
- Handle recurring billing automatically
- Manage customer payment methods securely
- Process one-time payments
- Handle subscription upgrades and downgrades
- Provide customers with a billing portal to manage their subscriptions

## Uses in This Boilerplate

In this boilerplate, Stripe is used for:

- **Subscription Management**: Customers can subscribe to monthly plans (Basic, Pro, Enterprise)
- **Payment Processing**: Secure handling of credit card payments
- **Billing Portal**: Customers can update payment methods, view invoices, and cancel subscriptions
- **Webhook Integration**: Automatic updates when subscriptions change (created, updated, cancelled)
- **User Dashboard**: Users can view their subscription status and manage billing
- **Pricing Page**: Display pricing plans and handle checkout flow

## Prerequisites

- Stripe account
- Business information ready

## Step 1: Create Stripe Account

1. Go to [Stripe](https://stripe.com/)
2. Sign up for account
3. Complete business verification
4. Activate your account

## Step 2: Get API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Developers** → **API keys**
3. Copy:
   - **Publishable key** (starts with `pk_`)
   - **Secret key** (starts with `sk_`)

**Important:** Use test keys for development, live keys for production.

## Step 3: Create Products and Prices

1. Go to **Products** in Stripe dashboard
2. Click **Add product**
3. Create three products matching your pricing tiers:
   - Basic Plan ($99/month)
   - Pro Plan ($199/month)
   - Enterprise Plan ($399/month)

4. For each product:
   - Set name and description
   - Set pricing (recurring monthly)
   - Copy the **Price ID** (starts with `price_`)

## Step 4: Configure Environment Variables

Add to your `.env` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY="sk_test_your-secret-key"  # Test key for development
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your-publishable-key"  # Test key
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"  # For webhooks
```

## Step 5: Update Price IDs

Edit `src/pricing/pricingData.ts` and update the `priceId` for each plan:

```typescript
{
  priceId: "price_1ObHbkLtGdPVhGLem0CLA5iT", // Your Stripe Price ID
  unit_amount: 99 * 100,
  // ...
}
```

## Step 6: Set Up Webhook Endpoint

### Development

1. Install Stripe CLI:

   ```bash
   brew install stripe/stripe-cli/stripe
   # or download from https://stripe.com/docs/stripe-cli
   ```

2. Login to Stripe:

   ```bash
   stripe login
   ```

3. Forward webhooks to local server:

   ```bash
   stripe listen --forward-to http://localhost:3000/api/stripe/webhook
   ```

4. Copy the webhook signing secret (starts with `whsec_`)
5. Add to `.env`:
   ```env
   STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"
   ```

### Production

1. Go to **Developers** → **Webhooks** in Stripe dashboard
2. Click **Add endpoint**
3. Set endpoint URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook signing secret
6. Add to production `.env`

## Step 7: Enable Payments Integration

In `integrations.config.tsx`:

```tsx
const integrations = {
	isPaymentsEnabled: true,
	// ... other integrations
};
```

## Step 8: Test Payments

### Test Mode

1. Use test API keys
2. Use test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - 3D Secure: `4000 0025 0000 3155`
3. Any future expiry date
4. Any 3-digit CVC

### Test Flow

1. Start development server: `pnpm dev`
2. Navigate to `/user/billing` or homepage pricing
3. Select a plan
4. Use test card to complete payment
5. Check Stripe dashboard for test payment

## Subscription Management

### Billing Portal

Users can manage subscriptions via Stripe Billing Portal:

- Update payment method
- View invoices
- Cancel subscription
- Update plan

Configured in `src/app/api/stripe/payment/route.ts`.

### Subscription Status

The system tracks:

- `customerId` - Stripe customer ID
- `subscriptionId` - Stripe subscription ID
- `priceId` - Current plan price ID
- `currentPeriodEnd` - Subscription end date

## Production Setup

### Switch to Live Keys

1. Get live API keys from Stripe dashboard
2. Update `.env`:
   ```env
   STRIPE_SECRET_KEY="sk_live_your-live-secret-key"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_your-live-publishable-key"
   STRIPE_WEBHOOK_SECRET="whsec_your-live-webhook-secret"
   ```

### Production Webhook

1. Set up webhook endpoint in Stripe dashboard
2. Use production URL: `https://yourdomain.com/api/stripe/webhook`
3. Select all required events
4. Copy webhook secret to production environment

### Security

1. **Never expose secret keys** - Only use in server-side code
2. **Verify webhook signatures** - Already implemented
3. **Use HTTPS** - Required for production
4. **Enable 3D Secure** - For European customers (SCA compliance)

## Webhook Events Handled

The webhook handler (`src/app/api/stripe/webhook/route.ts`) processes:

- `checkout.session.completed` - New subscription created
- `customer.subscription.updated` - Subscription updated
- `customer.subscription.deleted` - Subscription cancelled
- `invoice.payment_succeeded` - Payment successful
- `invoice.payment_failed` - Payment failed

## Troubleshooting

### "Invalid API key" error

- Verify key starts with `sk_test_` or `sk_live_`
- Check key hasn't been revoked
- Ensure using correct test/live keys
- Check for extra spaces in `.env`

### Webhook not receiving events

- Verify webhook URL is correct
- Check webhook secret matches
- Ensure endpoint is accessible
- Review Stripe dashboard webhook logs

### Payment not processing

- Check card details are correct
- Verify 3D Secure if required
- Review Stripe dashboard for errors
- Check webhook events are firing

### Subscription not updating

- Verify webhook is configured correctly
- Check webhook secret is valid
- Review database for updates
- Check webhook logs in Stripe

## Testing

### Test Cards

Use Stripe test cards:

- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **3D Secure:** `4000 0025 0000 3155`
- **Requires Auth:** `4000 0027 6000 3184`

### Test Scenarios

1. **Successful subscription**
   - Use success test card
   - Verify subscription created in database
   - Check webhook received

2. **Failed payment**
   - Use decline test card
   - Verify error handling
   - Check user notification

3. **Subscription update**
   - Change plan
   - Verify webhook updates database
   - Check billing portal access

## Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
