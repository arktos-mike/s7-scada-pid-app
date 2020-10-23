module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'Настройка ПИД-регуляторов котловой автоматики',
        copyright: '©2020 ЗАО ГК ТЭКС-Автоматик',
        appId: 's7.scada.pid',
        win: {
          icon: 'public/favicon.ico',
          //target: 'nsis',
          target: 'portable',  
        },
        nsis: {
          oneClick: false,
          perMachine: false,
          allowToChangeInstallationDirectory: true,
          language: '1049',
          unicode: true,
          runAfterFinish: false,
          createDesktopShortcut: true,
          createStartMenuShortcut: true,
          menuCategory: 'ТЭКС-Автоматик',
          shortcutName: 'Настройка ПИД-регуляторов котловой автоматики'
        }
      }
    }
  }
}