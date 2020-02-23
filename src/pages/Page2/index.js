import React, {useState,useEffect} from 'react'
import con from '../../controlers/controler'

export default function Page2({ history }) {

    const  [typeOfMaterial,setTypeOfMaterial] = useState('Aço')
    const  [sigmaE,setSigmaE] = useState('')
    const  [sigmaR,setSigmaR] = useState('')
    const  [tempOfWork,setTempOfWork] = useState('')
    const  [surfaceFinish,setSurfaceFinish] = useState('Retificado')
    const  [conf,setConf] = useState('50%')
    const  [home,setHome] = useState(false)

    useEffect(()=>{

      const typeOfMaterial = localStorage.getItem('typeOfMaterial')
      const sigmaE = localStorage.getItem('sigmaE')
      const sigmaR = localStorage.getItem('sigmaR')
      const tempOfWork = localStorage.getItem('tempOfWork')
      const surfaceFinish = localStorage.getItem('surfaceFinish')
      const conf = localStorage.getItem('conf')
      
      if (typeOfMaterial){
        setTypeOfMaterial(typeOfMaterial)
      }
      if(sigmaE) {
        setSigmaE(sigmaE)
      }
      if(sigmaR) {
        setSigmaR(sigmaR)
      } 
      if(tempOfWork) {
        setTempOfWork(tempOfWork)
      }
      if(surfaceFinish) {
        setSurfaceFinish(surfaceFinish)
      } 
      if(conf) {
        setConf(conf)
      }  
    },[]) // eslint-disable-line 

    async function handleSubmitNext(event){
        event.preventDefault();
        localStorage.setItem('typeOfMaterial',typeOfMaterial);
        localStorage.setItem('sigmaE',sigmaE);
        localStorage.setItem('sigmaR',sigmaR);
        localStorage.setItem('tempOfWork',tempOfWork);
        localStorage.setItem('surfaceFinish',surfaceFinish);
        localStorage.setItem('conf',conf);
        history.push('/page3')
    }

    async function handleSubmitBack(event){
      event.preventDefault();
      //localStorage.setItem('user',_id);
      history.push('/page1')
    }
    function handleHome(event) {
      event.preventDefault();
      history.push('/')
      localStorage.removeItem('fileName')
      localStorage.removeItem('typeOfMaterial')
      localStorage.removeItem('sigmaE')
      localStorage.removeItem('sigmaR')
      localStorage.removeItem('tempOfWork')
      localStorage.removeItem('surfaceFinish')
      localStorage.removeItem('conf')
      //localStorage.removeItem('potency')
      //localStorage.removeItem('rotation')
      localStorage.removeItem('torque')
      localStorage.removeItem('l')
      localStorage.removeItem('r2')
    }
    function handleSetHome(event) {
      event.preventDefault()
      setHome(true)
    }
    return (
        <>
        <div class="window">
        <header class="toolbar toolbar-header">
          
          <div class="toolbar-actions">

            <div class="btn-group">
              <button class="btn btn-default" onClick={handleSetHome}>
                <span class="icon icon-home"></span>
              </button>
              <button class="btn btn-default active">
              <span class="icon icon-menu"></span>
              </button>
            </div>
            {home && (
            <>
            <label className='label200'>Voltar para Home? O que foi digitado  será perdido.</label>
            <button class="btn btn-default active" onClick={(event)=>{setHome(false);handleHome(event)}}>
              Sim
            </button>
            <button class="btn btn-default active"  onClick={()=>setHome(false)}>
              Não
            </button>
            </>)}


            <div class="btn-group pull-right">
                <button onClick = {()=> con.handleMinimize()} class="btn btn-default">
                  <span class="icon icon-minus"></span>
                </button>
                <button onClick = {()=> con.handleClose()} class="btn btn-default">
                    <span class="icon icon-cancel"></span>
                </button>
          </div>
          </div>
          </header>

          <div class="window-content">
            <div class="pane-group">
              <div class="pane pane-sm sidebar">
                <nav class="nav-group">
                  <h5 class="nav-group-title">Dados de Entrada</h5>
                  <span class="nav-group-item">
                  <span class="icon icon-stop"></span>
                    Valores importantes
                  </span>
                  <span class="nav-group-item active">
                    <span class="icon icon-play"></span>
                      Material e acabamento
                    </span>
                  <span class="nav-group-item">
                      <span class="icon icon-stop"></span>
                      Componentes no eixo
                  </span>
                </nav>
              </div>

              <div class="work">
                  <form>
                      <div class="form-Edited">
                        <label class="label2" >Material do Eixo</label>
                        <select class="form-control2" 
                        onChange ={event =>setTypeOfMaterial(event.target.value)}
                        value = {typeOfMaterial}
                        >
                          <option>Aço</option>
                          <option>Ferro</option>
                          <option>Cobre</option>
                        </select>
                      </div>
                      <div class="form-Edited">
                        <label class="label2" >&sigma;e</label>
                        <input type="number" class="form-control2" placeholder="MPa"
                         onChange ={event =>setSigmaE(event.target.value)}
                         value = {sigmaE}
                         />
                      </div>
                      <div class="form-Edited">
                        <label class="label2" >&sigma;r</label>
                        <input type="number" class="form-control2" placeholder="MPa"
                        onChange ={event =>setSigmaR(event.target.value)}
                        value = {sigmaR}
                        />
                      </div>
                      <div class="form-Edited">
                        <label class="label2" >Temperatura de trabalho</label>
                        <input type="number" class="form-control2" placeholder="°C"
                        onChange ={event =>setTempOfWork(event.target.value)}
                        value = {tempOfWork}
                        />
                      </div>
                      <div class="form-Edited">
                        <label class="label2" >Acabamento Superficial</label>
                        <select class="form-control2"
                        onChange ={event =>setSurfaceFinish(event.target.value)}
                        value = {surfaceFinish}
                        >
                          <option>Retificado</option>
                          <option>Usinado ou estirado a frio</option>
                          <option>Laminado a quente</option>
                          <option>Forjado</option>
                        </select>
                      </div>
                      <div class="form-Edited">
                        <label class="label2" >Confiabilidade</label>
                        <select class="form-control2"
                        onChange ={event =>setConf(event.target.value)}
                        value = {conf}
                        >
                          <option>50%</option>
                          <option>90%</option>
                          <option>95%</option>
                          <option>99%</option>
                          <option>99,9%</option>
                          <option>99,99%</option>
                          <option>99,999%</option>
                          <option>99,9999%</option>
                        </select>
                      </div>
                    </form>
              </div>
            </div>
          </div>

          <footer class="toolbar toolbar-footer">
            <div class="toolbar-actions">
      
              <button type= "submit" class="btn btn-default" onClick={handleSubmitBack}>
                Voltar
              </button>

              <button type= "submit" class="btn btn-primary pull-right" onClick={handleSubmitNext}>
                Próximo
              </button>
        
            </div>
          </footer>

        </div>
</>
    )
};