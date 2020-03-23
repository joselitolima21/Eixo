import React, { useState } from 'react'
import con from '../../controlers/controler'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../../store/reducers/dataReducer'

export default function Page2({ history }) {
  
  const state = useSelector(state => state.dataReducer)
  const dispatch = useDispatch()

  const [home, setHome] = useState(false)

  async function handleSubmitNext(event) {
    event.preventDefault();
    history.push('/page3')
  }

  async function handleSubmitBack(event) {
    event.preventDefault();
    history.push('/page1')
  }
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
                <button class="btn btn-default active" onClick={(event) => { setHome(false); handleHome(event) }}>
                  Sim
            </button>
                <button class="btn btn-default active" onClick={() => setHome(false)}>
                  Não
            </button>
              </>)}


            <div class="btn-group pull-right">
              <button onClick={() => con.handleMinimize()} class="btn btn-default">
                <span class="icon icon-minus"></span>
              </button>
              <button onClick={() => con.handleClose()} class="btn btn-default">
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
                    onChange={event => dispatch(actions.setTypeOfMaterial(event.target.value))}
                    value={state.typeOfMaterial}
                  >
                    <option>Aço</option>
                    <option>Ferro</option>
                    <option>Cobre</option>
                  </select>
                </div>
                <div class="form-Edited">
                  <label class="label2" >&sigma;e</label>
                  <input type="number" class="form-control2" placeholder="MPa"
                    onChange={event => dispatch(actions.setSigmaE(event.target.value))}
                    value={state.sigmaE}
                  />
                </div>
                <div class="form-Edited">
                  <label class="label2" >&sigma;r</label>
                  <input type="number" class="form-control2" placeholder="MPa"
                    onChange={event => dispatch(actions.setSigmaR(event.target.value))}
                    value={state.sigmaR}
                  />
                </div>
                <div class="form-Edited">
                  <label class="label2" >Temperatura de trabalho</label>
                  <input type="number" class="form-control2" placeholder="°C"
                    onChange={event => dispatch(actions.setTempOfWork(event.target.value))}
                    value={state.tempOfWork}
                  />
                </div>
                <div class="form-Edited">
                  <label class="label2" >Acabamento Superficial</label>
                  <select class="form-control2"
                    onChange={event => dispatch(actions.setSurfaceFinish(event.target.value))}
                    value={state.surfaceFinish}
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
                    onChange={event => dispatch(actions.setConf(event.target.value))}
                    value={state.conf}
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

            <button type="submit" class="btn btn-default" onClick={handleSubmitBack}>
              Voltar
              </button>

            <button type="submit" class="btn btn-primary pull-right" onClick={handleSubmitNext}>
              Próximo
              </button>

          </div>
        </footer>

      </div>
    </>
  )
};