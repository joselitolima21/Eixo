import React, {useState,useEffect} from 'react'
import con from '../../controlers/controler'

export default function Page1({ history }) {
    
    const  [potency,setPotency] = useState('')
    const  [rotation,setRotation] = useState('')
    const  [torque,setTorque] = useState('')
    const  [l,setl] = useState('')
    const  [r2,setR2] = useState('')

    useEffect(()=>{
      const pot= localStorage.getItem('potency')
      const rot = localStorage.getItem('rotation')
      const tor = localStorage.getItem('torque') 
      const l = localStorage.getItem('l')
      const r2 = localStorage.getItem('r2')

      if (pot){
        setPotency(pot)
      }
      if(rot) {
        setRotation(rot)
      }
      if(tor) {
        setTorque(tor)
      } 
      if(l) {
        setl(l)
      } 
      if(r2) {
        setR2(r2)
      } 
    },[]) // eslint-disable-line 

    async function handleSubmit(event){
        event.preventDefault();
        localStorage.setItem('potency',potency);
        localStorage.setItem('rotation',rotation);
        localStorage.setItem('torque',torque);
        localStorage.setItem('l',l);
        localStorage.setItem('r2',r2);
        history.push('/page2')
    }
    async function handleHome(){
      history.push('/')
    }  

    return (
        <>
        <div class="window">
        <header class="toolbar toolbar-header">
          
          <div class="toolbar-actions">

            <div class="btn-group">
              <button class="btn btn-default" onClick={handleHome}>
                <span class="icon icon-home"></span>
              </button>
              <button class="btn btn-default active">
              <span class="icon icon-menu"></span>
              </button>
              <button class="btn btn-default">
                <span class="icon icon-chart-line"></span>
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
            <div class="pane-group">
              <div class="pane pane-sm sidebar res">
                <nav class="nav-group">
                  <h5 class="nav-group-title">Dados de Entrada</h5>
                  <span class="nav-group-item active">
                  <span class="icon icon-play"></span>
                    Valores importantes
                  </span>
                  <span class="nav-group-item">
                    <span class="icon icon-stop"></span>
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
                    <label class="label2" >Potência transmitida</label>
                    <input id ="potency" type="number" class="form-control2" placeholder="W" 
                    onChange ={event =>setPotency(event.target.value)}
                    value = {potency}
                    />
                  </div>
                  <div class="form-Edited">
                      <label class="label2" >Rotação</label>
                      <input id = "rotation" type="number" class="form-control2" placeholder="rpm"
                      onChange ={event =>setRotation(event.target.value)}
                      value = {rotation}
                      />
                  </div>
                  <div class="form-Edited">
                      <label class="label2" >Torque</label>
                      <input id = "torque" type="number" class="form-control2" placeholder="N.m"
                      onChange ={event =>setTorque(event.target.value)}
                      value = {torque}
                      />
                  </div>
                  <div class="form-Edited">
                      <label class="label2" >Comprimento do Eixo</label>
                      <input id = "l" type="number" class="form-control2" placeholder="mm"
                      onChange ={event =>setl(event.target.value)}
                      value = {l}
                      />
                  </div>
                  <div class="form-Edited">
                      <label class="label3" >Posição do segundo mancal (da esquerda para a direita tendo como base o primeiro mancal)</label>
                      <input id = "l" type="number" class="form-control3" placeholder="mm"
                      onChange ={event =>setR2(event.target.value)}
                      value = {r2}
                      />
                  </div>
              </form>
          </div>
        </div>
        </div>
        <footer class="toolbar toolbar-footer">
            <div class="toolbar-actions">

              <button type= "submit" onClick={handleSubmit} class="btn btn-primary pull-right">
                Próximo
              </button>
        
            </div>
          </footer>
        </div>
</>
    )
};