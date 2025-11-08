# Internationalization (i18n) Setup Guide

This guide will help you set up multi-language support using next-intl.

## What is Internationalization (i18n)?

Internationalization (often shortened to i18n) is the process of making your application support multiple languages. Instead of having your website only in English, you can offer it in German, French, Spanish, or any other language. Users can switch between languages, and all text changes accordingly.

## Purpose

Internationalization enables your SaaS application to:

- Reach users in different countries and languages
- Provide a better user experience for non-English speakers
- Expand your market to international customers
- Support multiple languages simultaneously
- Allow users to choose their preferred language

## Uses in This Boilerplate

In this boilerplate, internationalization is used for:

- **Multi-language Support**: Display content in English, German, and other languages
- **Language Switcher**: Allow users to change the website language
- **Localized Content**: Translate all text, buttons, and messages
- **User Preferences**: Remember user's language preference
- **International Expansion**: Make your SaaS accessible to global users

## Prerequisites

- Next.js 15 application
- Translation files ready

## Step 1: Enable i18n Integration

In `integrations.config.tsx`:

```tsx
const integrations = {
	isI18nEnabled: true,
	// ... other integrations
};
```

## Step 2: Configure Supported Languages

Edit `src/i18n/supported-locales.ts`:

```typescript
export const SUPPORTED_LANGUAGES = [
	{
		name: "English",
		code: "en",
	},
	{
		name: "German",
		code: "de",
	},
	// Add more languages
	{
		name: "French",
		code: "fr",
	},
];
```

## Step 3: Translation Files

Translation files are located in `/dictionary/`:

- `en.json` - English translations
- `de.json` - German translations

### Add New Language

1. Create new file: `dictionary/fr.json`
2. Copy structure from `en.json`
3. Translate all strings
4. Add to `supported-locales.ts`

## Step 4: Configure Middleware

The middleware (`src/middleware.ts`) handles locale detection and routing.

### Default Locale

Edit `src/i18n/request.ts` to set default locale:

```typescript
export const defaultLocale = "en" as const;
```

## Step 5: Language Switcher

The boilerplate includes a language switcher component. It's typically in the header.

### Usage

```tsx
import { useLocale } from "next-intl";

const LanguageSwitcher = () => {
	const locale = useLocale();

	return (
		<select value={locale} onChange={handleChange}>
			<option value='en'>English</option>
			<option value='de'>Deutsch</option>
		</select>
	);
};
```

## Step 6: Using Translations

### In Server Components

```tsx
import { useTranslations } from "next-intl";

export default function Page() {
	const t = useTranslations("homepage");

	return <h1>{t("title")}</h1>;
}
```

### In Client Components

```tsx
"use client";
import { useTranslations } from "next-intl";

export default function Component() {
	const t = useTranslations("common");

	return <button>{t("submit")}</button>;
}
```

### In API Routes

```typescript
import { getMessages } from "next-intl/server";

export async function GET() {
	const messages = await getMessages();
	// Use messages
}
```

## Step 7: Translation File Structure

Example `dictionary/en.json`:

```json
{
	"common": {
		"welcome": "Welcome",
		"submit": "Submit",
		"cancel": "Cancel"
	},
	"homepage": {
		"title": "Welcome to SaaSBold",
		"description": "Build your SaaS faster"
	},
	"header": {
		"signIn": "Sign In",
		"signUp": "Sign Up"
	}
}
```

## Step 8: URL Structure

### Default (Prefix-based)

- English: `/en/about`
- German: `/de/about`

### Domain-based (Advanced)

Configure in `next.config.js` for different domains per locale.

## Step 9: Test Translations

1. Start development server: `pnpm dev`
2. Navigate to homepage
3. Switch language using language switcher
4. Verify all text changes

## Adding New Translations

### 1. Add to English File

Edit `dictionary/en.json`:

```json
{
	"newSection": {
		"newKey": "New Translation"
	}
}
```

### 2. Add to Other Languages

Edit `dictionary/de.json`:

```json
{
	"newSection": {
		"newKey": "Neue Übersetzung"
	}
}
```

### 3. Use in Component

```tsx
const t = useTranslations("newSection");
return <p>{t("newKey")}</p>;
```

## Best Practices

1. **Organize by feature** - Group related translations
2. **Use descriptive keys** - `homepage.title` not `t1`
3. **Keep structure consistent** - Same structure across all languages
4. **Use pluralization** - Handle singular/plural forms
5. **Date/time formatting** - Use locale-aware formatting
6. **Number formatting** - Use locale-aware number formats

## Advanced Features

### Pluralization

```json
{
	"items": {
		"one": "{{count}} item",
		"other": "{{count}} items"
	}
}
```

Usage:

```tsx
t("items", { count: 5 }); // "5 items"
t("items", { count: 1 }); // "1 item"
```

### Interpolation

```json
{
	"greeting": "Hello, {{name}}!"
}
```

Usage:

```tsx
t("greeting", { name: "John" }); // "Hello, John!"
```

### Rich Text

```json
{
	"welcome": "Welcome to <strong>SaaSBold</strong>"
}
```

Use `t.rich()` for HTML:

```tsx
t.rich("welcome", {
	strong: (chunks) => <strong>{chunks}</strong>,
});
```

## Production Setup

### Environment Variables

No additional environment variables needed for basic setup.

### Build Configuration

Ensure `next-intl` is configured in `next.config.js`:

```javascript
const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl({
	// your config
});
```

## Troubleshooting

### Translations not showing

- Verify `isI18nEnabled: true` in config
- Check translation files exist
- Ensure locale is in supported locales
- Clear Next.js cache: `rm -rf .next`

### Language switcher not working

- Check middleware is configured
- Verify locale routing is set up
- Check browser console for errors

### Missing translations

- Add missing keys to all language files
- Use fallback locale for missing keys
- Check translation key names match

## Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [next-intl GitHub](https://github.com/next-intl/next-intl)
- [i18n Best Practices](https://next-intl-docs.vercel.app/docs/usage/configuration)
