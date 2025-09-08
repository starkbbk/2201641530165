import { alpha, createTheme } from '@mui/material/styles'

const blur = '12px'
const glassBg = alpha('#ffffff', 0.06)          // translucent surface
const glassBorder = alpha('#ffffff', 0.18)

export const glassTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#0b0f14', paper: 'transparent' },
    primary: { main: '#4cc9f0' },
    text: { primary: '#e6f1ff', secondary: '#aab7cf' },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body{
          /* soft gradient blobs for depth */
          background:
            radial-gradient(900px 600px at 10% -10%, #1a2431 0%, rgba(11,15,20,0) 60%),
            radial-gradient(800px 500px at 120% 10%, #0f2030 0%, rgba(11,15,20,0) 55%),
            #0b0f14;
        }
        .glass{
          background: ${glassBg};
          backdrop-filter: blur(${blur}) saturate(115%);
          -webkit-backdrop-filter: blur(${blur}) saturate(115%);
          border: 1px solid ${glassBorder};
          box-shadow: 0 12px 30px rgba(0,0,0,.35);
        }
      `,
    },
    // Make Paper “glass” by default
    MuiPaper: {
      styleOverrides: {
        root: {
          background: glassBg,
          backdropFilter: `blur(${blur}) saturate(115%)`,
          WebkitBackdropFilter: `blur(${blur}) saturate(115%)`,
          border: `1px solid ${glassBorder}`,
          boxShadow: '0 12px 30px rgba(0,0,0,.35)',
        },
      },
    },
    // AppBar also glassy
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: glassBg,
          backdropFilter: `blur(${blur})`,
          WebkitBackdropFilter: `blur(${blur})`,
          borderBottom: `1px solid ${glassBorder}`,
        },
      },
    },
    // Inputs & buttons slightly translucent
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: alpha('#0d1117', 0.35),
          '& fieldset': { borderColor: glassBorder },
          '&:hover fieldset': { borderColor: alpha('#ffffff', 0.35) },
        },
        input: { color: '#e6f1ff' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { backdropFilter: `blur(${blur})` },
        contained: {
          color: '#021018',
          fontWeight: 700,
          boxShadow: '0 8px 22px rgba(0,0,0,.35)',
        },
      },
    },
    MuiCard: { styleOverrides: { root: { background: glassBg } } },
    MuiDialog: { styleOverrides: { paper: { background: glassBg } } },
    MuiMenu: { styleOverrides: { paper: { background: glassBg } } },
    MuiTooltip: { styleOverrides: { tooltip: { background: glassBg } } },
  },
})