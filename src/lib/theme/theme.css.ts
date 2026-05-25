import { createTheme, createThemeContract } from "@vanilla-extract/css";

export const theme = createThemeContract({
  color: {
    canvas: null,
		card: null,
		cardFrosted: null,
		cardFrostedBorder: null,
    cardFrostedShadow: null,
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
		code: {
				bg: null,
				border: null,
				text: null,
				blockBg: null,
		},
		tint: {
				primaryWeak: null,
				primarySoft: null,
				primary: null,
				primaryHoverSoft: null,
				secondarySoft: null,
				secondary: null,
				neutralSoft: null,
		},
		focus: null,
		error: null,
		warning: null,
		shadow: null,
		shadowStrong: null,
		contrast: null,
		divider: null,
  },
	typography: {
		fontSize: {
      logo: null,
      displayLg: null,
			display: null,
			titleLg: null,
			titleMd: null,
			titleSm: null,
			titleXs: null,
			bodyLg: null,
			body: null,
			bodySm: null,
			ui: null,
			eyebrow: null,
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
    fontFamily: {
      sans: null,
      display: null,
      serif: null,
      mono: null,
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
    _64: null,
		_80: null,
    _96: null,
    _112: null,
    _144: null,
    _160: null,
    _192: null,
	},
  header: {
    padTop: { xs: null, sm: null, md: null, lg: null },
    height: { xs: null, sm: null },
    offset: { xs: null, sm: null, md: null, lg: null },
  },
  page: {
    marginTop: { xs: null,    sm: null, md: null, lg: null },
    gutter: { xs: null,       sm: null, md: null, lg: null },
    maxContentWidth: {        sm: null, md: null, lg: null },
    marginBottom: { xs: null, sm: null, md: null, lg: null },
  },
  zIndex: {
    tooltip: null,
    sidebar: null,
    pageSticky: null,
    header: null,
    canvas: null,
    content: null,
  },
	sheet: {
		bg: null,
		blur: null,
		border: null,
		radius: null,
		shadow: null,
	},

});

/** -- LAYOUT DEFINITIONS (SHARED) ----------------------- */
const fluid = (
  min: number, max: number, 
  startVw: number, endVw: number
) =>
  `clamp(${min}px, calc(${min}px + ${max - min} * (100vw - ${startVw}px) / ${endVw - startVw}), ${max}px)`;

const typography = {
  fontSize: {
    logo:      'clamp(30px, 1.5rem + 2vw, 52px)',
    displayLg: fluid(36, 52, 560, 900),
    display:   fluid(36, 44, 900, 1600),
    titleLg:   fluid(32, 36, 900, 1600),
    titleMd:   fluid(28, 32, 900, 1600),
    titleSm:   fluid(24, 26, 900, 1600),
    titleXs:   fluid(20, 22, 900, 1600),
    bodyLg:    '18px',
    body:      '16px',
    bodySm:    '14px',
    ui:        '14px',
    eyebrow:   '11px',
    caption:   '12px',
    micro:     '10px',
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
  fontFamily: {
    sans:    'var(--font-display)',
    display: 'var(--font-display)',
    serif:   'var(--font-serif)',
    mono:    'var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  },
};

const space = {
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
    _64: '64px',
    _80: '80px',
    _96: '96px',
    _112: '112px',
    _144: '144px',
    _160: '160px',
    _192: '192px',
}

const header = {
  padTop: { xs: '16px', sm: '24px', md: '36px', lg: '48px' },
  height: { xs: '63px', sm: '42px' },
  // padTop + height + page.marginTop
  offset: { xs: '103px', sm: '112px', md: '126px', lg: '154px' }
}

const page = {
  marginTop: { xs: '24px', sm: '48px', md: '48px', lg: '64px' },
  gutter: { xs: '20px', sm: '32px', md: '48px', lg: '48px' },
  maxContentWidth: { 
    sm: '876px', // 900px - gutter diff * 2
    md: '1240px', // width set to scalar for animation, max-width=100vw to prevent overflow
    lg: '1500px' 
  },
  marginBottom: { xs: '96px', sm: '96px', md: '96px', lg: '96px' },
};

const zIndex = {
  tooltip: '9999',
  sidebar: '13',
  pageSticky: '12',
  header: '11',
  canvas: '1',
  content: '2',
}

/** ------------------------------------------------------ */
/** -- THEME DEFINITIONS --------------------------------- */
const lightThemeColors = {
  canvas: '#F4F6F5',
  card: '#FFFFFF',
  cardFrosted: 'rgba(244, 246, 245, 0.06)', // sheet.bg w/lower opacity
  cardFrostedBorder: 'rgba(255, 255, 255, 0)',
  cardFrostedShadow: `0 8px 32px rgba(31, 38, 135, 0.2),
                inset 0 4px 20px rgba(255, 255, 255, 0.3),
                inset 0 -8px 16px -10px rgba(255, 255, 255, 0.55),
                inset -10px -10px 16px -12px rgba(255, 255, 255, 0.45)`,
  text: {
      primary: '#1C2321',
      secondary: '#5D6D68',
  },
  primary: {
      main: '#2A5F58',
      hover: '#1F4844',
      active: '#143431',
  },
  secondary: {
      main: '#E07A5F',
      hover: '#FFAB8D',
      active: '#AA4B34',
  },
  link: {
      main: '#5D6D68',
      hover: '#E07A5F', // intentional teal->copper jump on link hover
  },
  code: {
      bg:      'rgba(42, 95, 88, 0.06)',
      border:  'rgba(42, 95, 88, 0.12)',
      text:    '#1C2321',
      blockBg: '#F8FAF9',
  },
  tint: {
      primaryWeak:      'rgba(42, 95, 88, 0.06)',
      primarySoft:      'rgba(42, 95, 88, 0.10)',
      primary:          'rgba(42, 95, 88, 0.16)',
      primaryHoverSoft: 'rgba(83, 141, 132, 0.40)',
      secondarySoft:    'rgba(224, 122, 95, 0.10)',
      secondary:        'rgba(224, 122, 95, 0.16)',
      neutralSoft:      'rgba(93, 109, 104, 0.10)',
  },
  focus: '#2A5F58',
  error: '#D32F2F',
  warning: '#ED6C02',
  shadow:       'rgba(42, 95, 88, 0.12)',
  shadowStrong: 'rgba(42, 95, 88, 0.22)',
  contrast: '#FFFFFF',
  divider: 'rgba(0, 0, 0, 0.08)',
};

const darkThemeColors = {
  canvas: '#0e1a18',
  card: '#162822',
  cardFrosted: 'rgba(14, 26, 24, 0.30)', // sheet.bg w/lower opacity
  cardFrostedBorder: 'rgba(255, 255, 255, 0.06)',
  cardFrostedShadow: `0 8px 32px rgba(0, 0, 0, 0.4),
                inset 0 4px 20px rgba(255, 255, 255, 0.08),
                inset 0 -8px 16px -10px rgba(255, 255, 255, 0.10),
                inset -10px -10px 16px -12px rgba(255, 255, 255, 0.06)`,
  text: {
      primary: '#E0EDEA',
      secondary: '#7A9E98',
  },
  primary: {
      main: '#4DB8AC',
      hover: '#6ECFC5',
      active: '#82DDD3',
  },
  secondary: {
      main: '#C4A87A',
      hover: '#D4BA8E',
      active: '#A08A62',
  },
  link: {
      main: '#7A9E98',
      hover: '#C4A87A',
  },
  code: {
      bg:      'rgba(77, 184, 172, 0.10)',
      border:  'rgba(77, 184, 172, 0.18)',
      text:    '#E0EDEA',
      blockBg: '#11211D',
  },
  tint: {
      primaryWeak:      'rgba(77, 184, 172, 0.06)',
      primarySoft:      'rgba(77, 184, 172, 0.10)',
      primary:          'rgba(77, 184, 172, 0.16)',
      primaryHoverSoft: 'rgba(110, 207, 197, 0.40)',
      secondarySoft:    'rgba(196, 168, 122, 0.10)',
      secondary:        'rgba(196, 168, 122, 0.16)',
      neutralSoft:      'rgba(122, 158, 152, 0.10)',
  },
  focus: '#4DB8AC',
  error: '#EF5350',
  warning: '#FFA726',
  shadow:       'rgba(0, 10, 8, 0.5)',
  shadowStrong: 'rgba(0, 0, 0, 0.5)',
  contrast: '#0e1a18',
  divider: 'rgba(255, 255, 255, 0.08)',
};

const lightSheet = {
  bg: 'rgba(244, 246, 245, 0.86)',
  blur: '8px',
  border: '1px solid rgba(42, 95, 88, 0.08)',
  radius: '8px',
  shadow: '0 6px 16px -10px rgba(42, 95, 88, 0.18)',
}

const darkSheet = {
  bg: 'rgba(14, 26, 24, 0.86)',
  blur: '8px',
  border: '1px solid rgba(77, 184, 172, 0.10)',
  radius: '8px',
  shadow: '0 6px 16px -10px rgba(0, 0, 0, 0.40)',
};
/** ------------------------------------------------------ */

export const lightTheme = createTheme(theme, {
    color: lightThemeColors,
		typography,
    space,
		header,
    page,
    zIndex,
		sheet: lightSheet,
});

export const darkTheme = createTheme(theme, {
    color: darkThemeColors,
		typography,
    space,
		header,
    page,
    zIndex,
		sheet: darkSheet,
});
