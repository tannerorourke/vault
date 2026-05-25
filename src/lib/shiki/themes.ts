import type { ThemeRegistration } from 'shiki/bundle/web';

export const portfolioLight: ThemeRegistration = {
  name: 'portfolio-light',
  type: 'light',
  colors: {
    'editor.background': '#F8FAF9',
    'editor.foreground': '#1C2321',
  },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#7A8C87', fontStyle: 'italic' } },
    { scope: ['keyword', 'storage.type', 'storage.modifier', 'keyword.control'], settings: { foreground: '#AA4B34' } },
    { scope: ['string', 'string.quoted', 'string.template'], settings: { foreground: '#2A5F58' } },
    { scope: ['constant.numeric', 'constant.language', 'constant.character'], settings: { foreground: '#AA4B34' } },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call'], settings: { foreground: '#1F4844' } },
    { scope: ['variable', 'variable.other', 'variable.parameter'], settings: { foreground: '#1C2321' } },
    { scope: ['entity.name.type', 'support.type', 'support.class', 'entity.name.class'], settings: { foreground: '#5D6D68' } },
    { scope: ['punctuation', 'meta.brace', 'meta.delimiter'], settings: { foreground: '#5D6D68' } },
  ],
};

export const portfolioDark: ThemeRegistration = {
  name: 'portfolio-dark',
  type: 'dark',
  colors: {
    'editor.background': '#11211D',
    'editor.foreground': '#E0EDEA',
  },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#5D7672', fontStyle: 'italic' } },
    { scope: ['keyword', 'storage.type', 'storage.modifier', 'keyword.control'], settings: { foreground: '#C4A87A' } },
    { scope: ['string', 'string.quoted', 'string.template'], settings: { foreground: '#4DB8AC' } },
    { scope: ['constant.numeric', 'constant.language', 'constant.character'], settings: { foreground: '#D4BA8E' } },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call'], settings: { foreground: '#6ECFC5' } },
    { scope: ['variable', 'variable.other', 'variable.parameter'], settings: { foreground: '#E0EDEA' } },
    { scope: ['entity.name.type', 'support.type', 'support.class', 'entity.name.class'], settings: { foreground: '#7A9E98' } },
    { scope: ['punctuation', 'meta.brace', 'meta.delimiter'], settings: { foreground: '#7A9E98' } },
  ],
};
