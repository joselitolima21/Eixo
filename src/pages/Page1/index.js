import React, {useState} from 'react'
import con from '../../controlers/controler'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../../store/reducers/dataReducer'

export default function Page1({ history }) {
    
    const state = useSelector(state => state.dataReducer)
    const dispatch = useDispatch()
    const  [home,setHome] = useState(false)
    
    // Vai para a próxima page
    function handleSubmit(event){
        event.preventDefault();
        history.push('/page2')
    }
    // Ir para home
    function handleHome(event) {
      event.preventDefault();
      dispatch(actions.back())
      history.push('/')
    }
    function handleSetHome(event) {
      event.preventDefault()
      setHome(true)
    }
    return (
        <div>
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
            <button class="btn btn-default active" onClick={()=>setHome(false)}>
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
                {/*
                  <div class="form-Edited">
                    <label class="label2" >Potência transmitida</label>
                    <input id ="potency" type="number" class="form-control2" placeholder="W" 
                    onChange ={event =>setPotency(event.target.value)}
                    value = {potency}
                    />
                  </div>*/}
                  {/*<div class="form-Edited">
                      <label class="label2" >Rotação</label>
                      <input id = "rotation" type="number" class="form-control2" placeholder="rpm"
                      onChange ={event =>setRotation(event.target.value)}
                      value = {rotation}
                      />
                </div>*/}
                  <div class="form-Edited">
                      <label class="label2" >Torque</label>
                      <input id = "torque" type="number" class="form-control2" placeholder="N.m"
                      onChange ={event =>dispatch(actions.setTorque(event.target.value))}
                      value = {state.torque}
                      />
                  </div>
                  <div class="form-Edited">
                      <label class="label2" >Comprimento do Eixo</label>
                      <input id = "l" type="number" class="form-control2" placeholder="mm"
                      onChange ={event =>dispatch(actions.setL(event.target.value))}
                      value = {state.l}
                      />
                  </div>
                  <div class="form-Edited">
                      <label class="label3" >Posição do segundo mancal (da esquerda para a direita tendo como base o primeiro mancal)</label>
                      <input id = "l" type="number" class="form-control3" placeholder="mm"
                      onChange ={event =>dispatch(actions.setR2(event.target.value))}
                      value = {state.r2}
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
</div>
    )
};