import { createTheme, createThemeContract } from "@vanilla-extract/css";

export const theme = createThemeContract({
  color: {
    canvas: null,
		card: null,
		text: {
				primary: null,
				secondary: null
		},
		primary: {
				main: null,
				hover: null,
				active: null
		},
		secondary: {
				main: null,
				hover: null,
				active: null
		},
		link: {
				main: null, /* Spruce Teal */
				hover: null, /* Copper */
		},
		error: null,
		warning: null,
		shadow: null,
		contrast: null,
  },
	typography: {
		fontSize: {
			display: null,
			titleLg: null,
			titleMd: null,
			titleSm: null,
			bodyLg: null,
			body: null,
			bodySm: null,
			ui: null,
			caption: null,
			micro: null,
		},
		lineHeight: {
      tight: null,
      snug: null,
      normal: null,
      relaxed: null,
    },
    fontWeight: {
      regular: null,
      medium: null,
      semibold: null,
      bold: null,
    },
    letterSpacing: {
      normal: null,
      tight: null,
    },
	},
	space: {
		auto: null,
		_0: null,
		_4: null,
		_8: null,
		_12: null,
		_16: null,
		_20: null,
		_24: null,
		_32: null,
		_36: null,
		_48: null,
		_56: null,
		_80: null,
	},
	layout: {
		sidebarWidth: null,
		headerHeight: null,
		contentMaxWidth: null,
		zIndex: {
			sidebar: null,
			header: null,
			heroImg: null,
		}
	},
	
});

export const themeClass = createTheme(theme, {
    /* --- Backgrounds --- */
    color: {
			canvas: '#F4F6F5',
			card: '#FFFFFF',
			text: {
					primary: '#1C2321', /* Deep Obsidian */
					secondary: '#5D6D68', /* Moss Grey */
			},
			primary: {
					main: '#2A5F58', /* Spruce Teal */
					hover: '#538D84', /* Lighter Teal */
					active: '#538D84', /* Deep teal for active states */
			},
			secondary: {
					main: '#8B7355', /* Bark Brown — sparse accent only */
					hover: '#A68B6B', /* Golden Bark */
					active: '#6B5A42', /* Dark Bark */
			},
			link: {
					main: '#5D6D68', /* Moss Grey */
					hover: '#538D84', /* Light Teal — stays in the forest palette */
			},
			error: '#D32F2F',
			warning: '#ED6C02',
			shadow: 'rgba(42, 95, 88, 0.12)',
			contrast: '#FFFFFF',
    },
		typography: {
			fontSize: {
				display: '36px',	// hero numbers, landing headers
				titleLg: '32px',	// page title
				titleMd: '28px',	// section header
				titleSm: '24px',	// subsection header
				bodyLg: '18px',		// long-form reading
				body: '16px',			// default body text
				bodySm: '14px',		// secondary body / dense UI
				ui: '14px',				// buttons, nav, labels
				caption: '12px',	// helper text
				micro: '10px',		// timestamps, legal, badges
			},
			lineHeight: {
				tight: "1.15",
				snug: "1.25",
				normal: "1.4",
				relaxed: "1.6",
			},
			fontWeight: {
				regular: "400",
				medium: "500",
				semibold: "600",
				bold: "700",
			},
			letterSpacing: {
				normal: "0",
				tight: "-0.01em",
			},
		},
    space: {
			auto: 'auto',
			_0: '0px',
      _4: '4px',
			_8: '8px',
			_12: '12px',
			_16: '16px',
			_20: '20px',
			_24: '24px',
			_32: '32px',
			_36: '36px',
			_48: '48px',
			_56: '56px',
			_80: '80px',
    },
		layout: {
			sidebarWidth: '80px',
			headerHeight: '180px',
			contentMaxWidth: '1600px',
			zIndex: {
				sidebar: '11',
				header: '12',
				heroImg: '5',
			}
		},
});