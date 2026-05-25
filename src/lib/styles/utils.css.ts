import { keyframes, style } from '@vanilla-extract/css';
import type { GlobalStyleRule } from '@vanilla-extract/css';


export const srOnly: GlobalStyleRule = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export const srOnlyCls = style(srOnly);

/** ANIMATION */
export const EASE_CUBIC = `cubic-bezier(.2,.1,.2,1)`;

export const balance = keyframes({
  '0%, 100%': { transform: 'rotate(0deg)' },
  '30%, 60%': { transform: 'rotate(-45deg)' },
});

export const falling = keyframes({
  '12%': {  transform: 'rotateX(240deg)' },
  '24%': {  transform: 'rotateX(150deg)' },
  '36%': {  transform: 'rotateX(200deg)' },
  '48%': {  transform: 'rotateX(175deg)' },
  '60%, 85%': { transform: 'rotateX(180deg)' },
  '100%': { transform: 'rotateX(0deg)' }
});

export const rY = keyframes({
  '20%, 80%': { transform: 'rotateY(180deg)' },
  '100%':     { transform: 'rotateY(360deg)' },
});

export const rX = keyframes({
  '20%, 80%': { transform: 'rotateX(180deg)' },
  '100%':     { transform: 'rotateX(360deg)' },
});

export const spinTop = keyframes({
  '0%':  { transform: `rotateY(0deg)    rotateZ(0deg)` },
  '7%':  { transform: `rotateY(360deg)  rotateZ(0deg)` },  // 7%
  '15%': { transform: `rotateY(720deg)  rotateZ(0deg)` },  // 8%
  '27%': { transform: `rotateY(1440deg) rotateZ(0deg)` },  // 12%
  '42%': { transform: `rotateY(1800deg) rotateZ(0deg)` },  // 15%
  '60%': { transform: `rotateY(2160deg) rotateZ(0deg)` },  // 18%
    '65%': { transform: `rotateY(2340deg) rotateZ(-12deg)`  }, // mid  +12
    '70%': { transform: `rotateY(2410deg) rotateZ(-22deg)`  }, // mid  +10
    '75%': { transform: `rotateY(2470deg) rotateZ(-30deg)` },// mid   +8
    '80%': { transform: `rotateY(2520deg) rotateZ(-36deg)` }, // mid  +6
  '85%': { transform: `rotateY(2520deg) rotateZ(-40deg)` }, // 25%     +4
  // snap back
  '90%': { transform: `rotateY(2520deg) rotateZ(50deg)` }, // mid
  '95%': { transform: `rotateY(2520deg) rotateZ(30deg)`  }, // mid
  '100%':{ transform: `rotateY(2520deg) rotateZ(0deg)`  }, // 15%
});