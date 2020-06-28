const textLight = {
  primary: "#484748",
  secondary: "rgba(74, 70, 109, 0.54)",
  disabled: "rgba(74, 70, 109, 0.38)",
  hint: "rgba(74, 70, 109, 0.38)"
};

export const themeColors = {
  light: {
    palette: {
      type: "light",
      primary: {
        main: "#039be5",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#ff9805",
        contrastText: textLight.primary
      },
      text: textLight
    }
  },
  dark: {
    palette: {
      type: "dark",
      primary: {
        main: "#222A45",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#ff9805",
        contrastText: textLight.primary
      },
      background: {
        paper: "#222A45",
        default: "#1a2038"
      }
    }
  },
  blue: {
    palette: {
      type: "light",
      primary: {
        main: "#3366FF",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#FFAF38",
        contrastText: textLight.primary
      },
      text: textLight
    }
  },
  white: {
    palette: {
      type: "light",
      primary: {
        main: "#ffffff",
        contrastText: textLight.primary
      },
      secondary: {
        main: "#039be5",
        contrastText: textLight.primary
      },
      text: textLight
    }
  },
  red: {
    palette: {
      type: "dark",
      primary: {
        main: "#e53935",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#FFAF38",
        contrastText: textLight.primary
      }
    }
  }
};
