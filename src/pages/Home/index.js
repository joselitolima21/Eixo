import React ,{useState} from 'react'
import con from '../../controlers/controler'
import db from '../../controlers/databaseJSON'
import back from '../../images/back-home.jpg'

export default function Home({ history }) {
    const [optionChecked,setOptionChecked] = useState('option1')
    const [campo1,setCampo1] = useState(false)
    const [campo2,setCampo2] = useState(false)
    const [buttons,setButtons] = useState(false)
    const [firstChoice,setFirstChoice] = useState(true)
    const [files,setFiles] = useState([])
    const [fileChoiced,setFileChoiced] = useState('')
    const [fileNew,setFileNew] = useState('')
    const [alert,setAlert] = useState('')

    function handleFind(){
      const files = db.find()
      setFiles(files)
      setFileChoiced(files[0])
    }
    function handleNext1(event) {
      event.preventDefault()
      if (optionChecked === 'option1'){
        setFirstChoice(false)
        setCampo1(true)
        setButtons(true)
      } else if (optionChecked === 'option2') {
        handleFind()
        setCampo2(true)
        setButtons(true)
        setFirstChoice(false)
      }
    }
    function handleBack(event) {
      event.preventDefault()
      setAlert('')
      setOptionChecked('option1')
      setCampo1(false)
      setCampo2(false)
      setButtons(false)
      setFirstChoice(true)
    }
    function handleRadio(event) {
      setOptionChecked(event.target.value)
    }
    function handleGO(event) {
      event.preventDefault()
      if (optionChecked === 'option1'){        
        if (fileNew){     
            function limpaString(string) {                
                var n = "";
                for( var i = 0; i < string.length; i++ ) {
                    if( string.charAt(i) !== " " && string.charAt(i) !== "." ) {
                        n += string.charAt(i);
                    }
                  }
                  return n
            }
        const name = limpaString(fileNew)
        const fileName = name + '.json'
        localStorage.setItem('fileName',fileName)
        history.push('/page1')
        } else {
          setAlert('fileName')
        }
      } else if(optionChecked === 'option2'){
        const fileName = fileChoiced + '.json'
        localStorage.setItem('fileName',fileName)
        history.push('/results')
      }
    }
    return (
        <>
        <div class="window">
        <header class="toolbar toolbar-header">
          
          <div class="toolbar-actions">

            <div class="btn-group">
              <button class="btn btn-default active">
                <span class="icon icon-home"></span>
              </button>
            </div>

            
            <div class="btn-group pull-right">
                <button onClick = {()=> con.handleMinimize()} class="btn btn-default">
                  <span class="icon icon-minus"></span>
                </button>
                <button onClick = {()=> con.handleMaximize()} class="btn btn-default">
                  <span class="icon icon-plus"></span>
                </button>
                <button onClick = {()=> con.handleClose()} class="btn btn-default">
                    <span class="icon icon-cancel"></span>
                </button>
          </div>
          </div>
          </header>
          <div class="window-content">
            <div className='home'>

            <form>
                  {firstChoice && (<>
                  <div className="radio">
                    <label>
                      <input type="radio" value="option1" checked={optionChecked === 'option1'}
                      onChange={(event)=>handleRadio(event)} className='radio'/>
                      Iniciar novo dimensionamento
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="option2" checked={optionChecked === 'option2'}
                      onChange={(event)=>handleRadio(event)} className='radio'/>
                      Carregar algum dimensionamento salvo
                    </label>
                  </div>
                  
                  
                  <div className='buttons1'>
                  <button class="botaoBack" onClick={(event)=>handleNext1(event)}>
                  Avançar
                  </button>
                  </div>
                  </>)}

                  <div className='form-next'>
                    {campo1 && (
                    <input type="text" class="form-control5" placeholder="Nome para ser salvo" 
                    onChange ={event =>{setFileNew(event.target.value);setAlert('')}}/>)}
                    {campo2 && (<select class="form-control5" 
                    onChange ={event =>setFileChoiced(event.target.value)}>
                    {files.map((file)=>(<option key={file}>{file}</option>))}</select>)}
                    </div>
                    {buttons && 
                    (<div className='buttons'>
                    <button class="botaoNext" onClick={(event)=>handleBack(event)}>
                    Mudar escolha
                    </button>
                    <button class="botaoBack" onClick={(event)=>handleGO(event)}
                    >
                    Avançar
                    </button>
                    
                    </div>)}
                    {alert === 'fileName' && <label class="label8" >Digite algum nome</label>}
            </form>

            </div>
            <img src={back} alt='back' className = 'back'/>
          </div>
              
        <footer class="toolbar toolbar-footer">
            
          </footer>
        </div>
</>
    )
};