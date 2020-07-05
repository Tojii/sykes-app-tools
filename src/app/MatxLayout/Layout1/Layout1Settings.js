const Layout1Settings = {
  leftSidebar: {
    show: true,
    mode: 'full', // full, close, compact, mobile,
    theme: 'white', // View all valid theme colors inside MatxTheme/themeColors.js
    bgOpacity: .96, // 0 ~ 1
    bgImgURL: `${process.env.REACT_APP_PUBLIC_URL}/assets/images/sidebar/sidebar-bg-dark.jpg`
  },
  topbar: {
    show: true,
    fixed: true,
    incognito: true,
    theme: 'purpleDark1' // View all valid theme colors inside MatxTheme/themeColors.js
  }
}

export default Layout1Settings;