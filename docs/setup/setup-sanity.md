# Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for blog content management.

## What is Sanity CMS?

Sanity is a headless content management system (CMS). Think of it as a flexible content editor that stores your content separately from your website. You write and manage content in Sanity's interface, and your website displays it. It's perfect for blogs, articles, and any content that needs to be updated regularly.

## Purpose

Sanity CMS enables your SaaS application to:

- Manage blog posts and articles without touching code
- Store rich content (text, images, videos) in a structured way
- Allow non-technical team members to create and edit content
- Provide a clean editing interface for content creators
- Keep content separate from your application code

## Uses in This Boilerplate

In this boilerplate, Sanity is used for:

- **Blog Management**: Create, edit, and publish blog posts
- **Content Storage**: Store blog content, images, and metadata
- **Author Profiles**: Manage blog author information and bios
- **Categories & Tags**: Organize blog posts by categories and tags
- **Rich Content**: Support for rich text formatting, images, and embedded content
- **SEO**: Store SEO metadata for better search engine visibility

## Prerequisites

- Sanity account (free tier available)
- Node.js installed

## Step 1: Create Sanity Project

1. Go to [sanity.io](https://www.sanity.io/)
2. Sign up or log in
3. Create a new project
4. Choose a project name and dataset name (use "production")

## Step 2: Get Project Credentials

1. In your Sanity project dashboard, go to **API** → **API settings**
2. Note your:
   - **Project ID**
   - **Dataset** (usually "production")
   - **API Version** (default: "2023-03-09")

## Step 3: Create API Token

1. Go to **API** → **Tokens**
2. Click **Add API token**
3. Name it: "Next.js Website"
4. Select **Editor** permissions
5. Copy the token (you'll only see it once!)

## Step 4: Configure Environment Variables

Add to your `.env` file:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
SANITY_API_KEY="your-api-token"
```

## Step 5: Install Sanity CLI (Optional)

For local development and schema management:

```bash
npm install -g @sanity/cli
```

## Step 6: Configure Sanity Studio (Optional)

The boilerplate includes Sanity Studio at `/studio`. To customize:

1. Edit `sanity.config.ts` in the root directory
2. Configure schemas in `src/sanity/schemas/`
3. Run `sanity dev` to preview studio locally

## Step 7: Enable Sanity Integration

In `integrations.config.tsx`:

```tsx
const integrations = {
	isSanityEnabled: true,
	// ... other integrations
};
```

## Step 8: Set Up Content Types

The boilerplate includes these content types:

- **Post** - Blog posts
- **Author** - Blog authors
- **Category** - Post categories

Schemas are located in `src/sanity/schemas/`.

## Step 9: Create Your First Post

1. Start your development server: `pnpm dev`
2. Navigate to `http://localhost:3000/studio`
3. Log in with your Sanity credentials
4. Create a new post:
   - Add title, slug, content
   - Add featured image
   - Select category and author
   - Publish

## Step 10: View Posts

Posts will appear at:

- Blog listing: `/blog`
- Individual post: `/blog/[slug]`
- Author page: `/blog/author/[slug]`

## Content Structure

### Post Schema

- Title
- Slug (URL-friendly)
- Content (Portable Text)
- Featured Image
- Author (reference)
- Category (reference)
- Published Date
- SEO fields

### Author Schema

- Name
- Slug
- Bio
- Avatar Image
- Social Links

### Category Schema

- Title
- Slug
- Description

## Image Configuration

Sanity images are automatically optimized. The boilerplate uses:

- `@sanity/image-url` for image URLs
- `@sanity/asset-utils` for image dimensions
- `@portabletext/react` for rich text rendering

## Production Setup

### Update Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your-production-project-id"
SANITY_API_KEY="your-production-api-token"
```

### CDN Configuration

In `src/sanity/config/client-config.ts`, you can enable CDN:

```ts
const config = {
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
	dataset: "production",
	apiVersion: "2023-03-09",
	useCdn: true, // Enable CDN for production
	token: process.env.SANITY_API_KEY as string,
};
```

## Troubleshooting

### "Project not found" error

- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Check project exists in Sanity dashboard
- Ensure dataset name matches

### Images not loading

- Check `SANITY_API_KEY` has correct permissions
- Verify image asset references are correct
- Check CORS settings in Sanity dashboard

### Content not appearing

- Verify `isSanityEnabled: true` in config
- Check API token has read permissions
- Verify dataset name is "production"
- Clear Next.js cache: `rm -rf .next`

### Studio not accessible

- Ensure Sanity is enabled in config
- Check route is not protected by middleware
- Verify Sanity config file exists

## Useful Commands

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Deploy studio
sanity deploy

# View Sanity project
sanity manage
```

## Advanced Configuration

### Custom Queries

Edit queries in `src/sanity/sanity-query.ts`:

```ts
export const postQuery = `*[_type == "post"] | order(publishedAt desc) {
  // your custom query
}`;
```

### Image Optimization

Configure image builder in `src/sanity/sanity-utils.ts`:

```ts
export function imageBuilder(source: string) {
	return ImageUrlBuilder(clientConfig)
		.image(source)
		.width(800)
		.height(600)
		.fit("max")
		.auto("format");
}
```

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Portable Text Guide](https://www.sanity.io/docs/block-content)
- [Sanity Image URLs](https://www.sanity.io/docs/image-urls)
