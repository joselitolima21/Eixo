import React from 'react'
import con from '../../controlers/controler'

export default function Page2({ history }) {

    async function handleSubmitNext(event){
        event.preventDefault();
        //localStorage.setItem('user',_id);
        history.push('/page3')
    }

    async function handleSubmitBack(event){
      event.preventDefault();
      //localStorage.setItem('user',_id);
      history.push('/')
  }

    return (
        <>
        <div class="window">
        <header class="toolbar toolbar-header">
          
          <div class="toolbar-actions">

            <div class="btn-group">
              <button class="btn btn-default">
                <span class="icon icon-home"></span>
              </button>
              <button class="btn btn-default">
              <span class="icon icon-folder"></span>
              </button>
              <button class="btn btn-default">
                <span class="icon icon-cloud"></span>
              </button>
              <button class="btn btn-default">
                <span class="icon icon-popup"></span>
              </button>
              <button class="btn btn-default">
                <span class="icon icon-shuffle"></span>
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
              <div class="pane pane-sm sidebar">
                <nav class="nav-group">
                  <h5 class="nav-group-title">Dados de Entrada</h5>
                  <span class="nav-group-item">
                  <span class="icon icon-check"></span>
                    Valores importantes
                  </span>
                  <span class="nav-group-item active">
                    <span class="icon icon-cancel"></span>
                      Material e acabamento
                    </span>
                  <span class="nav-group-item">
                      <span class="icon icon-cancel"></span>
                    Componentes
                  </span>
                </nav>
              </div>

              <div class="work">
                  <form>
                      <div class="form-Edited">
                        <label class="label2" >Material do Eixo</label>
                        <select class="form-control2">
                          <option>Aço</option>
                          <option>Ferro</option>
                          <option>Cobre</option>
                        </select>
                      </div>
                      <div class="form-Edited">
                        <label class="label2" >&sigma;e</label>
                        <input type="number" class="form-control2" placeholder="MPa"/>
                      </div>
                      <div class="form-Edited">
                        <label class="label2" >&sigma;r</label>
                        <input type="number" class="form-control2" placeholder="MPa"/>
                      </div>
                      <div class="form-Edited">
                        <label class="label2" >Temperatura de trabalho</label>
                        <input type="number" class="form-control2" placeholder="°C"/>
                      </div>
                      <div class="form-Edited">
                        <label class="label2" >Acabamento Superficial</label>
                        <select class="form-control2">
                          <option>Retificado</option>
                          <option>Usinado ou estirado a frio</option>
                          <option>Laminado a quente</option>
                          <option>Fsorjado</option>
                        </select>
                      </div>
                      <div class="form-Edited">
                        <label class="label2" >Confiabilidade</label>
                        <select class="form-control2">
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