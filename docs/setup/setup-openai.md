# OpenAI Setup Guide

This guide will help you set up OpenAI integration for AI content generation.

## What is OpenAI?

OpenAI is a company that provides artificial intelligence (AI) services. Their API allows you to use AI models like GPT to generate text, answer questions, and create content automatically. Think of it as having an AI assistant that can write content for you.

## Purpose

OpenAI integration enables your SaaS application to:

- Generate content automatically using AI
- Help users create blog posts, articles, or other text content
- Provide AI-powered writing assistance
- Create content variations and suggestions
- Save time by automating content creation

## Uses in This Boilerplate

In this boilerplate, OpenAI is used for:

- **AI Content Generation**: Generate blog posts, articles, and other content
- **Admin Dashboard**: AI integration page where admins can generate content
- **Content Assistance**: Help users create content faster
- **Text Completion**: Auto-complete and suggest text
- **Content Variations**: Generate multiple versions of content

## Prerequisites

- OpenAI account
- OpenAI API key

## Step 1: Create OpenAI Account

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to **API keys** section

## Step 2: Generate API Key

1. Go to [API Keys](https://platform.openai.com/api-keys)
2. Click **Create new secret key**
3. Name your key (e.g., "SaaSBold Production")
4. Copy the key immediately (you won't see it again!)

## Step 3: Add Credits

1. Go to [Billing](https://platform.openai.com/account/billing)
2. Add payment method
3. Set up usage limits (recommended)
4. Add credits to your account

## Step 4: Configure Environment Variables

Add to your `.env` file:

```env
# OpenAI Configuration
OPENAI_API_KEY="sk-your-api-key-here"
```

## Step 5: Enable OpenAI Integration

In `integrations.config.tsx`:

```tsx
const integrations = {
	isOpenAIEnabled: true,
	// ... other integrations
};
```

## Step 6: Test Integration

1. Start your development server: `pnpm dev`
2. Navigate to `/admin/ai-integration`
3. Test content generation with a prompt

## Usage

The OpenAI integration is used in:

- **Admin Dashboard** - AI Integration page (`/admin/ai-integration`)
- **Content Generation API** - `/api/generate-content`

### API Usage Example

```typescript
const response = await fetch("/api/generate-content", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({
		prompt: [{ role: "user", content: "Write a blog post about AI" }],
		apiKey: "optional-custom-key", // Optional, uses env var if not provided
	}),
});
```

## Model Configuration

Default model: `gpt-3.5-turbo`

To change the model, edit `src/app/api/generate-content/route.ts`:

```typescript
const chatCompletion = await openai.chat.completions.create({
	messages: prompt,
	model: "gpt-4", // Change model here
	temperature: 1,
	top_p: 1,
	frequency_penalty: 0,
	presence_penalty: 0,
});
```

## Available Models

- `gpt-3.5-turbo` - Fast and cost-effective (default)
- `gpt-4` - More capable, higher cost
- `gpt-4-turbo` - Latest GPT-4 with improved performance
- `gpt-4o` - Optimized for speed and cost

## Cost Management

### Set Usage Limits

1. Go to [Usage Limits](https://platform.openai.com/account/limits)
2. Set hard limit (e.g., $100/month)
3. Set soft limit for alerts

### Monitor Usage

1. Go to [Usage](https://platform.openai.com/usage)
2. View daily/monthly usage
3. Set up billing alerts

### Pricing (as of 2024)

- GPT-3.5-turbo: ~$0.002 per 1K tokens
- GPT-4: ~$0.03 per 1K tokens (input), ~$0.06 per 1K tokens (output)

## Security Best Practices

1. **Never commit API keys** to version control
2. Use environment variables only
3. Implement rate limiting (already included)
4. Monitor API usage regularly
5. Rotate API keys periodically
6. Use separate keys for development/production

## Production Setup

### Environment Variables

```env
OPENAI_API_KEY="sk-production-key-here"
```

### Rate Limiting

The boilerplate includes rate limiting. Configure in `src/libs/limiter.ts` if needed.

### Error Handling

The API includes error handling for:

- Invalid API keys
- Rate limit exceeded
- Insufficient credits
- Network errors

## Troubleshooting

### "Invalid API key" error

- Verify key starts with `sk-`
- Check key hasn't been revoked
- Ensure no extra spaces in `.env` file

### "Insufficient quota" error

- Add credits to your OpenAI account
- Check usage limits
- Verify payment method is valid

### Rate limit errors

- Wait before retrying
- Implement exponential backoff
- Consider upgrading to higher tier

### Slow responses

- Use `gpt-3.5-turbo` for faster responses
- Reduce `max_tokens` parameter
- Check your network connection

## Advanced Configuration

### Custom Temperature

Edit `src/app/api/generate-content/route.ts`:

```typescript
temperature: 0.7, // Lower = more focused, Higher = more creative
```

### Custom Max Tokens

```typescript
max_tokens: 1000, // Limit response length
```

### Streaming Responses

For streaming, modify the API route to use streaming:

```typescript
const stream = await openai.chat.completions.create({
	model: "gpt-3.5-turbo",
	messages: prompt,
	stream: true,
});
```

## Resources

- [OpenAI Documentation](https://platform.openai.com/docs)
- [API Reference](https://platform.openai.com/docs/api-reference)
- [Pricing](https://openai.com/pricing)
- [Best Practices](https://platform.openai.com/docs/guides/production-best-practices)
