const getters = {
  isMobile: state => state.app.isMobile,
  lang: state => state.app.lang,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.loginUser.token,
  avatar: state => state.loginUser.avatar,
  nickname: state => state.loginUser.name,
  welcome: state => state.loginUser.welcome,
  roles: state => state.loginUser.roles,
  userInfo: state => state.loginUser.info,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab
}

export default getters
