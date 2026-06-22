import { createTheme, createThemeContract } from "@vanilla-extract/css";
import { stepped, vwFromLg } from "./responsive.css";


export const theme = createThemeContract({
  color: {
    canvas: null,
		surfaceAlt: null,
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
      displayLg: null,
			display: null,
			titleLg: null,
			titleMd: null,
			titleSm: null,
			titleXs: null,
			bodyLg: null,
			body: null,
			bodySm: null,
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
      loose: null,
      normal: null,
      tight: null,
      tighter: null,
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
		_76: null,
    _96: null,
    _112: null,
    _144: null,
    _160: null,
    _192: null,
	},
  page: {
    marginTop: { xs: null,    sm: null, md: null, lg: null },
    gutter: { xs: null,       sm: null, md: null, lg: null },
    clearanceTop: { xs: null, sm: null, md: null, lg: null },
    marginBottom: { xs: null, sm: null, md: null, lg: null },
    maxContentWidth: {        sm: null, md: null, lg: null },
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



/** -- SHARED DEFINITIONS ----------------------- */
const typography = {
  fontSize: {
    displayLg: stepped({ xs: 38, sm: 45, md: 50, lg: vwFromLg(48) }),
    display:   stepped({ xs: 36, sm: 40, md: 44, lg: vwFromLg(44) }),
    titleLg:   stepped({ xs: 32, sm: 34, md: 36, lg: vwFromLg(36) }),
    titleMd:   stepped({ xs: 28, sm: 30, md: 32, lg: vwFromLg(32) }),
    titleSm:   stepped({ xs: 22, sm: 24, md: 26, lg: vwFromLg(26) }),
    titleXs:   stepped({ xs: 18, sm: 19, md: 20, lg: vwFromLg(20) }), // equiv. body, different font
    bodyLg:    stepped({ xs: 18, sm: 19, md: 20, lg: vwFromLg(20) }), // equiv. titleXs, different font
    body:      stepped({ xs: 16, sm: 17, md: 18, lg: vwFromLg(18) }),
    bodySm:    stepped({ xs: 14, sm: 15, md: 16, lg: vwFromLg(16) }),
    eyebrow:   stepped({ xs: 12, sm: 13, md: 14, lg: vwFromLg(14) }),
    caption:   stepped({ xs: 12, lg: vwFromLg(12) }), // eligibility floor
    micro:     stepped({ xs: 10, lg: vwFromLg(10) }), // slightly below the floor
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
    loose: "0.1em",
    normal: "0",
    tight: "-0.01em",
    tighter: "-0.025em"
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
    _76: '76px',
    _96: '96px',
    _112: '112px',
    _144: '144px',
    _160: '160px',
    _192: '192px',
}

const page = {
  gutter: { xs: '16px', sm: '24px', md: '36px', lg: '48px' },
  marginTop: { xs: '16px', sm: '24px', md: '28px', lg: '36px' },
  clearanceTop: { xs: '58px', sm: '66px', md: '70px', lg: '78px' },
  marginBottom: { xs: '64px', sm: '48px', md: '48px', lg: '48px' },
  
  maxContentWidth: { 
    sm: '872px', // 900px - gutter diff * 2
    md: '900px', // width set to scalar for animation, max-width=100vw to prevent overflow
    lg: '900px' 
  }
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
/** -- Per-THEME DEFINITIONS --------------------------------- */
const lightThemeColors = {
  canvas: '#F4F6F5',
  surfaceAlt: '#E0E7E5',
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
  surfaceAlt: '#142A27',
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
    page,
    zIndex,
		sheet: lightSheet,
});

export const darkTheme = createTheme(theme, {
    color: darkThemeColors,
		typography,
    space,
    page,
    zIndex,
		sheet: darkSheet,
});
