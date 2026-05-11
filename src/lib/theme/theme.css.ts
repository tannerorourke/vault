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
				main: null,
				hover: null,
		},
		error: null,
		warning: null,
		shadow: null,
		contrast: null,
		divider: null,
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
    _96: null,
    _112: null,
    _144: null,
    _160: null,
    _192: null,
	},
	layout: {
		gutterWidth: null,
		headerHeight: null,
    footerHeight: null,
		contentMaxWidth: null,
		zIndex: {
			sidebar: null,
			header: null,
			canvas: null,
      content: null,
		}
	},

});

export const lightTheme = createTheme(theme, {
    color: {
			canvas: '#F4F6F5',
			card: '#FFFFFF',
			text: {
					primary: '#1C2321',
					secondary: '#5D6D68',
			},
			primary: {
					main: '#2A5F58',
					hover: '#538D84',
					active: '#538D84',
			},
			secondary: {
					main: '#8B7355',
					hover: '#A68B6B',
					active: '#6B5A42',
			},
			link: {
					main: '#5D6D68',
					hover: '#538D84',
			},
			error: '#D32F2F',
			warning: '#ED6C02',
			shadow: 'rgba(42, 95, 88, 0.12)',
			contrast: '#FFFFFF',
			divider: 'rgba(0, 0, 0, 0.08)',
    },
		typography: {
			fontSize: {
				display: '36px',
				titleLg: '32px',
				titleMd: '28px',
				titleSm: '24px',
				bodyLg: '18px',
				body: '16px',
				bodySm: '14px',
				ui: '14px',
				caption: '12px',
				micro: '10px',
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
      _96: '96px',
      _112: '112px',
      _144: '144px',
      _160: '160px',
      _192: '192px',
    },
		layout: {
			gutterWidth: '80px',
			headerHeight: '140px',
      footerHeight: '120px',
			contentMaxWidth: '1600px',
			zIndex: {
				sidebar: '12',
				header: '11',
				canvas: '1',
        content: '2',
			}
		},
});

export const darkTheme = createTheme(theme, {
    color: {
			canvas: '#0e1a18',
			card: '#162822',
			text: {
					primary: '#E0EDEA',
					secondary: '#7A9E98',
			},
			primary: {
					main: '#4DB8AC',
					hover: '#6ECFC5',
					active: '#3A9087',
			},
			secondary: {
					main: '#C4A87A',
					hover: '#D4BA8E',
					active: '#A08A62',
			},
			link: {
					main: '#7A9E98',
					hover: '#4DB8AC',
			},
			error: '#EF5350',
			warning: '#FFA726',
			shadow: 'rgba(0, 10, 8, 0.5)',
			contrast: '#0e1a18',
			divider: 'rgba(255, 255, 255, 0.08)',
    },
		typography: {
			fontSize: {
				display: '36px',
				titleLg: '32px',
				titleMd: '28px',
				titleSm: '24px',
				bodyLg: '18px',
				body: '16px',
				bodySm: '14px',
				ui: '14px',
				caption: '12px',
				micro: '10px',
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
      _96: '96px',
      _112: '112px',
      _144: '144px',
      _160: '160px',
      _192: '192px',
    },
		layout: {
			gutterWidth: '80px',
			headerHeight: '140px',
      footerHeight: '120px',
			contentMaxWidth: '1600px',
			zIndex: {
				sidebar: '12',
				header: '11',
				canvas: '1',
        content: '2',
			}
		},
});

// Backwards-compat alias - remove after layout.tsx is updated
export const themeClass = lightTheme;
