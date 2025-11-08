/**
 * Navigation types for menus and sidebars
 * Used across the application for navigation structures
 */

export type Menu = {
	id: number;
	titleKey: string;
	newTab?: boolean;
	path?: string;
	submenu?: Submenu[];
};

export type Submenu = {
	id: number;
	titleKey: string;
	newTab?: boolean;
	path: string;
};

export type Sidebar = {
	id: number;
	titleKey: string;
	path?: string;
	icon: React.ReactNode;
	comingSoon?: boolean;
};
