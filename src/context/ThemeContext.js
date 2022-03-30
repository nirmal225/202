import React from 'react'

const ThemeContext = React.createContext({
  isDark: false,
  savedVideos: [],
  isHamburgerActive: true,
  changeHamburgerActive: () => {},
  changeTheme: () => {},
  addSavedVideo: () => {},
})

export default ThemeContext
