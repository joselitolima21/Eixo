const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
// Mantém a referência global do objeto da janela.
// se você não fizer isso,
// a janela será fechada automaticamente
// quando o objeto JavaScript for coletado como lixo.
let win

function createWindow () {
  // Criar uma janela de navegação.
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 1000,
    minHeight: 700,
    maxWidth: 1000,
    maxHeight: 700,
    webPreferences: {
      nodeIntegration: true,
    },
    frame: false,
    show: false
  })

  // and load the index.html of the app.
  win.loadURL(
    isDev ? "http://localhost:3000/" : `file://${path.join(__dirname,"../build/index.html")}`
    )

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitido quando a janela é fechada.
  win.on('closed', () => {
    // Elimina a referência do objeto da janela, geralmente você iria armazenar as janelas
    // em um array, se seu app suporta várias janelas, este é o momento
    // quando você deve excluir o elemento correspondente.
    win = null
  })
  win.once('ready-to-show', () => {
    win.show()
  })
  
}


// Este método será chamado quando o Electron tiver finalizado
// a inicialização e está pronto para criar a janela browser.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.on('ready', createWindow)

// Finaliza quando todas as janelas estiverem fechadas.
app.on('window-all-closed', () => {
  // No macOS é comum para aplicativos e sua barra de menu 
  // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// Neste arquivo, você pode incluir o resto do seu aplicativo especifico do processo
// principal. Você também pode colocar eles em arquivos separados e requeridos-as aqui.

