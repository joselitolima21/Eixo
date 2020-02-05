const electron = window.require("electron")
const app = electron.remote.app; // eslint-disable-line



export default {

handleMinimize() {
    electron.remote.BrowserWindow.getFocusedWindow().minimize();
},

handleMaximize() {
    if (electron.remote.BrowserWindow.getFocusedWindow().isMaximized()){
        electron.remote.BrowserWindow.getFocusedWindow().restore()
    } else {
        electron.remote.BrowserWindow.getFocusedWindow().maximize()
    }
},

handleClose(){
    localStorage.clear()
    electron.remote.BrowserWindow.getFocusedWindow().close();
},

}