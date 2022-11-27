const screens = {
  xs: '0px', // phone
  sm: '576px', // phone rotated
  md: '768px', // tablet
  lg: '992px', // tablet rotated / small desktop
  xl: '1200px' // big desktop
}
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './public/**/*.html'],
  mode: 'jit',
  theme: {
    extend: {
      screens,
      width: screens,
      fontFamily: {
        mono: ['Roboto Mono', 'ui-monospace', 'monospace'],
        helixR: ['HellixRegular'],
        helixB: ['HellixBold']
      },
      boxShadow: {
        card: 'rgb(90 113 208 / 11%) 0px 0px 0px 0px, rgb(167 175 183 / 33%) 0px 4px 16px 0px'
      },
      dropShadow: {
        chat: '0px 4px 4px rgba(0, 0, 0, 0.25)'
      },
      colors: {
        primary: {
          main: '#2F80ED',
          dark: '#09457D',
          darkness: '#232323'
        },
        accent: {
          main: '#FBBD0B'
        },
        text: {
          placeholder: '#7E8797',
          light: '#C0C3C9',
          lighter: '#D8DBDF',
          bglighter: 'rgba(216, 219, 223, .3)'
        },
        gray: {
          dark: '#151B26',
          background: '#222',
          light: '#D8DBDF',
          border: '#E5E5E5'
        },
        white: 'white',
        black: 'black',
        background: '#F8F8FF',
        error: '#EB5757',
        warning: '#F2994A',
        success: '#27AE60'
      },
      fontSize: {
        h1: '96px',
        h2: '60px',
        h3: '48px',
        h4: '34px',
        h5: '24px',
        h6: '20px',
        body: [
          '16px',
          {
            fontWeight: 'bold',
            lineHeight: '24px'
          }
        ],
        subtitle: [
          '16px',
          {
            lineHeight: '24px'
          }
        ],
        subtitle1: [
          '16px',
          {
            lineHeight: '19.2px'
          }
        ],
        subtitle2: [
          '14px',
          {
            lineHeight: '16.8px'
          }
        ],
        subtitle3: [
          '13px',
          {
            lineHeight: '16px'
          }
        ],
        button: [
          '14px',
          {
            lineHeight: '16.8px'
          }
        ],
        caption: [
          '12px',
          {
            lineHeight: '15px'
          }
        ],
        chat: [
          '13px',
          {
            lineHeight: '16px'
          }
        ],
        tabs: '10px',
        overline: [
          '10px',
          {
            lineHeight: '12px',
            letterSpacing: '1.5px'
          }
        ]
      },
    }
  },
  plugins: [
    // ...
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms')
  ],
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
