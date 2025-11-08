# Algolia Search Setup Guide

This guide will help you set up Algolia for search functionality in your application.

## What is Algolia?

Algolia is a search-as-a-service platform. It provides fast, relevant search results for your application. Instead of building your own search system, Algolia handles all the complex search logic, indexing, and ranking algorithms. Think of it as Google Search built specifically for your website.

## Purpose

Algolia enables your SaaS application to:

- Provide fast, accurate search across your content
- Deliver relevant search results instantly
- Handle complex search queries efficiently
- Offer search suggestions and autocomplete
- Track search analytics and user behavior

## Uses in This Boilerplate

In this boilerplate, Algolia is used for:

- **Global Search**: Search across all blog posts and content
- **Blog Search**: Find specific blog posts by keywords
- **Real-time Search**: Instant search results as users type
- **Search Suggestions**: Autocomplete and search suggestions
- **Content Discovery**: Help users find relevant content quickly

## Prerequisites

- Algolia account (free tier available)
- Content to index (blog posts, etc.)

## Step 1: Create Algolia Account

1. Go to [Algolia](https://www.algolia.com/)
2. Sign up for free account
3. Verify your email

## Step 2: Create Application

1. In Algolia dashboard, create a new application
2. Choose a region (closest to your users)
3. Note your **Application ID**

## Step 3: Create Search-Only API Key

1. Go to **API Keys** section
2. Find **Search-Only API Key**
3. Copy the key

## Step 4: Create Admin API Key

1. In **API Keys** section
2. Find **Admin API Key** (keep this secret!)
3. Copy the key

## Step 5: Create Index

1. Go to **Indices** section
2. Click **Create Index**
3. Name it (e.g., "blog_posts")
4. Note the index name

## Step 6: Configure Environment Variables

Add to your `.env` file:

```env
# Algolia Configuration
NEXT_PUBLIC_ALGOLIA_APPLICATION_ID="your-application-id"
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY="your-search-only-api-key"
NEXT_PUBLIC_ALGOLIA_INDEX_NAME="blog_posts"
ALGOLIA_ADMIN_API_KEY="your-admin-api-key" # For indexing (server-side only)
```

## Step 7: Configure Index Settings

In Algolia dashboard, go to your index → **Configuration**:

### Searchable Attributes

Add attributes you want to search:

- `title`
- `content`
- `author`
- `category`

### Attributes for Faceting

Add attributes for filtering:

- `category`
- `author`
- `publishedAt`

### Ranking and Sorting

Configure:

- Primary: Typo tolerance
- Secondary: Custom ranking
- Tertiary: Alphabetical

## Step 8: Enable Algolia Integration

In `integrations.config.tsx`:

```tsx
const integrations = {
	isAlgoliaEnabled: true,
	// ... other integrations
};
```

## Step 9: Index Your Content

Content is automatically indexed when:

- Blog posts are published
- Content is updated

Manual indexing happens in `src/libs/crawlIndex.ts`.

### Manual Indexing

The boilerplate includes automatic indexing for blog posts. When a post is viewed, it's indexed to Algolia.

## Step 10: Test Search

1. Start your development server: `pnpm dev`
2. Use the global search (usually triggered by Cmd/Ctrl + K)
3. Search for content

## Search Features

### Global Search

- Accessible via keyboard shortcut
- Real-time search results
- Highlights matching text

### Search Components

Located in `src/components/GlobalSearch/`:

- `index.tsx` - Main search modal
- `EmptyState.tsx` - Empty state component
- `SearchResults.tsx` - Results display

## Index Structure

Example document structure:

```json
{
	"objectID": "unique-id",
	"title": "Post Title",
	"content": "Post content...",
	"slug": "post-slug",
	"author": "Author Name",
	"category": "Category Name",
	"publishedAt": "2024-01-01",
	"url": "/blog/post-slug"
}
```

## Production Setup

### Environment Variables

```env
NEXT_PUBLIC_ALGOLIA_APPLICATION_ID="your-production-app-id"
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY="your-production-search-key"
NEXT_PUBLIC_ALGOLIA_INDEX_NAME="blog_posts"
ALGOLIA_ADMIN_API_KEY="your-production-admin-key"
```

### Index Configuration

1. Create separate index for production
2. Configure CORS settings
3. Set up rate limiting
4. Enable analytics

## Customization

### Custom Search Component

Edit `src/components/GlobalSearch/index.tsx`:

```tsx
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";

// Customize search UI
```

### Search Filters

Add filters in `src/components/GlobalSearch/index.tsx`:

```tsx
import { RefinementList } from "react-instantsearch";

<RefinementList attribute='category' />;
```

### Custom Highlighting

Configure highlighting in Algolia dashboard or via API:

```typescript
const searchClient = algoliasearch(appID, apiKEY);
searchClient.setSettings({
	attributesToHighlight: ["title", "content"],
});
```

## Troubleshooting

### "Application ID not found" error

- Verify `NEXT_PUBLIC_ALGOLIA_APPLICATION_ID` is correct
- Check application exists in Algolia dashboard
- Ensure no extra spaces in environment variable

### No search results

- Verify index has data
- Check index name matches `NEXT_PUBLIC_ALGOLIA_INDEX_NAME`
- Ensure content is indexed
- Check searchable attributes configuration

### Search not working

- Verify `isAlgoliaEnabled: true` in config
- Check API keys have correct permissions
- Clear browser cache
- Verify CORS settings in Algolia

### Indexing errors

- Check `ALGOLIA_ADMIN_API_KEY` is set
- Verify admin key has write permissions
- Check index exists
- Review Algolia dashboard for errors

## Monitoring

### View Analytics

1. Go to Algolia dashboard
2. Navigate to **Analytics**
3. View:
   - Search volume
   - Popular queries
   - Click-through rates
   - Conversion rates

### Monitor Usage

1. Go to **Usage** section
2. Monitor:
   - Search operations
   - Indexing operations
   - API calls

## Best Practices

1. **Index only necessary data** - Don't index sensitive information
2. **Use faceting** - Enable filtering for better UX
3. **Configure typo tolerance** - Improve search accuracy
4. **Set up synonyms** - Handle common variations
5. **Monitor analytics** - Track search performance
6. **Optimize index settings** - Fine-tune for your content

## Resources

- [Algolia Documentation](https://www.algolia.com/doc/)
- [React InstantSearch Guide](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/)
- [Algolia Dashboard](https://www.algolia.com/dashboard)
