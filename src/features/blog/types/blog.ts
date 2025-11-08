/**
 * Blog types for Sanity CMS integration
 * Used by blog feature components and utilities
 */

import { PortableTextBlock } from "sanity";

export type Author = {
	name: string;
	image: string;
	bio?: string;
	slug: {
		current: string;
	};
	_id?: number | string;
	_ref?: number | string;
};

export type SanitySlug = {
	current: string;
	_type: string;
};

export type SanityImage = {
	_type: string;
	asset: {
		_ref: string;
		_type: string;
	};
};

export type Blog = {
	_id: number;
	title: string;
	slug: SanitySlug;
	metadata: string;
	body: PortableTextBlock[];
	mainImage: SanityImage;
	author: Author;
	tags: string[];
	publishedAt: string;
};
