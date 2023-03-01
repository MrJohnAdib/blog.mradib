const colors = require('tailwindcss/colors');
// const breakpoint_sm = theme('screens.sm', {});

module.exports = {
  purge: {
    mode: 'all',
    content: [
      './purge/samples/*.html',
      './purge/**/*.html'
    ],
    options: {
      keyframes: true,
    },
  },
  corePlugins: {
   gradientColorStops: false,


   // disable TYPOGRAPHY
   placeholderColor: false,
   textColor: false,

   // disable BACKGROUNDS
   backgroundImage: false,
   backgroundColor: false,

   // disable BORDERS
   // borderColor: false,
   divideColor: false,
   ringWidth: false,
   ringColor: false,
   ringOpacity: false,
   ringOffsetWidth: false,
   ringOffsetColor: false,

   // disable EFFECTS
   mixBlendMode: false,
   backgroundBlendMode: false,

   // disable filters
   contrast: false,
   dropShadow: false,
   hueRotate: false,
   invert: false,
   saturate: false,
   sepia: false,
   backdropBrightness: false,
   backdropContrast: false,
   backdropGrayscale: false,
   backdropHueRotate: false,
   backdropInvert: false,
   backdropSaturate: false,
   backdropSepia: false,

   // disable transforms
   // transform: false,
   transformOrigin: false,
   scale: false,
   translate: false,
   skew: false,

  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': {'min': '640px'},
      'md': {'min': '768px'},
      'lg': {'min': '1024px'},
      // 'xl': {'min': '1280px'},
      // '2xl': {'min': '1536px'},
    },
    fontFamily: {
      'sans': '"LatoLatinWeb", IRANYekan, ui-sans-serif, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
      'siftal': 'siftal',
      'mono': ['ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'],
      'IRANSansX': 'IRANSansX',
      'IRANYekan': 'IRANYekan',
      'LatoLatinWeb': 'LatoLatinWeb',
      'Vazir': 'Vazir',
      'tahoma': 'tahoma',
      'GanjNamehSans': 'GanjNamehSans',
      'NikaWeb': 'NikaWeb',
      'BehdadWeb': 'BehdadWeb',
      'WebNastaliq': 'WebNastaliq',
      'Lalezar': 'Lalezar',
    },
    fontSize: {
      'reset': ['16px',    '24px'],
      '2xs':   ['.625em',  '0.875em'],
      'xs':    ['.75em',   '1em'],
      'sm':    ['.875em',  '1.25em'],
      'md':    ['.9375em', '1.4em'],
      'base':  ['1em',     '1.5em'],
      'lg':    ['1.125em', '1.75em'],
      'xl':    ['1.25em',  '1.75em'],
      '2xl':   ['1.5em',   '2em'],
      '3xl':   ['1.875em', '2.25em'],
      '4xl':   ['2.25em',  '2.5em'],
      '5xl':   ['3em',     '1'],
      '6xl':   ['3.75em',  '1'],
      '7xl':   ['4.5em',   '1'],
      '8xl':   ['6em',     '1'],
      '9xl':   ['8em',     '1'],
    },
    inset: {
      '0': 0,
      'auto': 'auto',
      '1/4': '25%;',
      '2/4': '50%;',
      '3/4': '75%;',
      'full': '100%;',
    },
    space: {
      '0': 0,
      '2': '0.5rem',
      '4': '1rem',
      '5': '1.25rem',
      '10': '2.5rem',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
    },
    aspectRatio: {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      9: '9',
      10: '10',
      16: '16',
      19: '19',
      27: '27',
      32: '32',
      64: '64',
    },
    lineClamp: {
      1: '1',
      2: '2',
      3: '3',
    },
    debugScreens: {
      prefix: '',
      selector: '[data-debugger]',
    },
    extend: {
      lineHeight: {
        '3': '.75em',
        '4': '1em',
        '5': '1.25em',
        '6': '1.5em',
        '7': '1.75em',
        '8': '2em',
        '9': '2.5em',
        '10': '3em',
      },
      minHeight: {
        // '0': '0',
        '1/4': '25vh',
        '1/2': '50vh',
        '3/4': '75vh',
        // 'full': '100%',
      },
      maxHeight: {
       '1/4': '25vh',
       '1/2': '50vh',
       '3/4': '75vh',
      },
      maxWidth:{
       '1/4': '25%',
       '1/2': '50%',
       '3/4': '75%',
       'screen-sm': '640px',
       'screen-md': '768px',
       'screen-lg': '1024px',
       'screen-xl': '1280px',
       'screen-2xl': '1536px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // require('tailwindcss-rtl'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-debug-screens'),
    require('cssnano')({
      preset: 'default',
    }),
    // plugin(function({ addBase, theme }) {
    //   addBase({
    //     'h1': { fontSize: theme('fontSize.2xl') },
    //     'h2': { fontSize: theme('fontSize.xl') },
    //     'h3': { fontSize: theme('fontSize.lg') },
    //   }),
    // }),
  ],
}
