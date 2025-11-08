# Mailchimp Setup Guide

This guide will help you set up Mailchimp for newsletter management.

## What is Mailchimp?

Mailchimp is an email marketing platform that helps you manage newsletters and email campaigns. It stores your subscriber list, sends emails, and tracks how people interact with your emails. Think of it as a mailing system for your digital newsletters.

## Purpose

Mailchimp enables your SaaS application to:

- Collect email addresses from visitors
- Send newsletters and marketing emails
- Manage subscriber lists automatically
- Track email open rates and clicks
- Segment subscribers into groups
- Comply with email marketing regulations

## Uses in This Boilerplate

In this boilerplate, Mailchimp is used for:

- **Newsletter Signup**: Collect email addresses from website visitors
- **Subscriber Management**: Automatically add new subscribers to your mailing list
- **Email Campaigns**: Send newsletters and updates to subscribers
- **Marketing**: Build an email list for marketing purposes
- **User Engagement**: Keep users informed about updates and news

## Prerequisites

- Mailchimp account (free tier available)
- Audience/list created

## Step 1: Create Mailchimp Account

1. Go to [Mailchimp](https://mailchimp.com/)
2. Sign up for free account
3. Verify your email

## Step 2: Create Audience

1. In Mailchimp dashboard, go to **Audience**
2. Click **Create Audience**
3. Fill in:
   - Audience name
   - Default from email
   - Company name
   - Address
4. Save

## Step 3: Get API Key

1. Go to **Account** → **Extras** → **API keys**
2. Click **Create A Key**
3. Name it (e.g., "SaaSBold API Key")
4. Copy the API key

## Step 4: Get Server Prefix

1. In your API key, note the server prefix
2. Example: If key is `abc123def456-us1`, the server is `us1`
3. Or check your account URL: `https://us1.admin.mailchimp.com/` → server is `us1`

## Step 5: Get Audience ID

1. Go to **Audience** → **Settings** → **Audience name and defaults**
2. Scroll to **Audience ID**
3. Copy the ID (format: `a1b2c3d4e5`)

## Step 6: Configure Environment Variables

Add to your `.env` file:

```env
# Mailchimp Configuration
MAILCHIMP_API_KEY="your-api-key-here"
MAILCHIMP_API_SERVER="us1"  # Your server prefix (us1, us2, eu1, etc.)
MAILCHIMP_AUDIENCE_ID="your-audience-id"
```

## Step 7: Enable Mailchimp Integration

In `integrations.config.tsx`:

```tsx
const integrations = {
	isMailchimpEnabled: true,
	// ... other integrations
};
```

## Step 8: Test Newsletter Signup

1. Start your development server: `pnpm dev`
2. Navigate to homepage
3. Find newsletter signup form
4. Enter email and submit
5. Check Mailchimp dashboard for new subscriber

## Usage

### Newsletter Signup Form

The newsletter form is located in:

- Homepage component: `src/components/Home/Newsletter/`
- API endpoint: `/api/newsletter`

### API Endpoint

The newsletter API accepts POST requests:

```typescript
const response = await fetch("/api/newsletter", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({
		email: "user@example.com",
	}),
});
```

## Subscriber Management

### View Subscribers

1. Go to Mailchimp dashboard
2. Navigate to **Audience** → **All contacts**
3. View all subscribers

### Subscriber Status

Subscribers are added with status:

- **Subscribed** - Active subscribers
- **Unsubscribed** - Opted out
- **Pending** - Awaiting confirmation (if double opt-in enabled)

## Configuration Options

### Double Opt-In

Enable in Mailchimp:

1. Go to **Audience** → **Settings** → **Audience name and defaults**
2. Enable **Double opt-in**
3. Customize confirmation email

### Tags and Segments

Add tags to subscribers in the API:

```typescript
// In src/app/api/newsletter/route.tsx
body: JSON.stringify({
	email_address: email,
	status: "subscribed",
	tags: ["website-signup", "newsletter"],
});
```

## Production Setup

### Environment Variables

```env
MAILCHIMP_API_KEY="your-production-api-key"
MAILCHIMP_API_SERVER="us1"
MAILCHIMP_AUDIENCE_ID="your-production-audience-id"
```

### Compliance

1. **GDPR Compliance**
   - Add privacy policy link
   - Include consent checkbox
   - Provide unsubscribe option

2. **CAN-SPAM Compliance**
   - Include physical address
   - Provide unsubscribe link
   - Honor unsubscribe requests

## Troubleshooting

### "Invalid API key" error

- Verify API key is correct
- Check server prefix matches
- Ensure key hasn't been revoked
- Verify no extra spaces in `.env`

### "Audience not found" error

- Verify `MAILCHIMP_AUDIENCE_ID` is correct
- Check audience exists in Mailchimp
- Ensure audience ID format is correct

### Subscribers not appearing

- Check API response for errors
- Verify email format is valid
- Check spam/junk folder
- Review Mailchimp activity log

### API rate limits

- Free tier: 2,000 requests/day
- Paid tiers: Higher limits
- Implement retry logic if needed

## Advanced Features

### Custom Fields

Add custom fields in Mailchimp:

1. Go to **Audience** → **Settings** → **List fields and |MERGE| tags**
2. Add custom fields
3. Include in API request:

```typescript
body: JSON.stringify({
	email_address: email,
	status: "subscribed",
	merge_fields: {
		FNAME: firstName,
		LNAME: lastName,
	},
});
```

### Automation

Set up email automation:

1. Go to **Automation** in Mailchimp
2. Create welcome email series
3. Set up abandoned cart emails
4. Configure drip campaigns

### Segmentation

Create segments:

1. Go to **Audience** → **Segments**
2. Create segment based on:
   - Signup source
   - Location
   - Engagement
   - Custom fields

## Best Practices

1. **Get explicit consent** - Always ask for permission
2. **Provide value** - Send relevant content
3. **Respect frequency** - Don't over-email
4. **Monitor engagement** - Track open/click rates
5. **Clean your list** - Remove inactive subscribers
6. **Test emails** - Preview before sending

## Resources

- [Mailchimp API Documentation](https://mailchimp.com/developer/)
- [API Reference](https://mailchimp.com/developer/marketing/api/)
- [Mailchimp Dashboard](https://mailchimp.com/)
