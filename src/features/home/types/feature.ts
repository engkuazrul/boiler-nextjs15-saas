/**
 * Feature types for home page features
 * Used in feature showcase sections
 */

export type FeatureItem = {
	id: number;
	title: string;
	description: string;
	icon: string;
};

export type FeatureWithImg = {
	title: string;
	subtitle: string;
	features: string[];
};

