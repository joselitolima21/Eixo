import React, { useState } from 'react'
import con from '../../controlers/controler'
import db from '../../controlers/databaseJSON'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../../store/reducers/dataReducer'


export default function Page3({ history }) {
  const { fileName } = useSelector(state => state.homeReducer)
  const state = useSelector(state => state.dataReducer)
  const dispatch = useDispatch()

  const [atention, setAtention] = useState(false)
  const [home, setHome] = useState(false)

  // Acrescenta mais polias
  function handlePlusP(event) {
    event.preventDefault()
    if(state.NP <= 5){
      dispatch(actions.plusP(state.NP + 1))
    }
  }
  function handleMinusP(event) {
    event.preventDefault()
    if(state.NP >= 2){
      dispatch(actions.minusP(state.NP - 1))
    }
  }

  // Acrescenta mais engrenagens
  function handlePlusG(event) {
    event.preventDefault()
    if(state.NG <= 5){
      dispatch(actions.plusG(state.NG + 1))
    }
  }
  function handleMinusG(event) {
    event.preventDefault()
    if(state.NG >= 2){
      dispatch(actions.minusG(state.NG - 1))
    }
  }

  function handleSubmitBack(event) {
    event.preventDefault();
    history.push('/page2')
  }

  function handleSubmitNext(event) {
    event.preventDefault();
    if (state.torque && state.l && state.r2 && state.sigmaR && state.sigmaE && state.tempOfWork
        && state.components ) {
        db.save(fileName,state)
        history.push('/points')
    } else {
        setAtention(true)
    }
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
                <span class="nav-group-item">
                  <span class="icon icon-stop"></span>
                  Material e acabamento
                    </span>
                <span class="nav-group-item active">
                  <span class="icon icon-play"></span>
                  Componentes no eixo
                  </span>
              </nav>
            </div>

            <div class="work">
              <form>
                <div class="form-Edited2">
                  <div className='intro'>
                    <span class="icon icon-record"></span>
                    <label class="label7">Engrenagens</label>
                    <button class="btn btn-default"
                      onClick={(event) => handleMinusG(event)}
                    >
                      <span class="icon icon-minus-circled"></span>
                    </button>

                    <button class="btn btn-default"
                      onClick={(event) => handlePlusG(event)}
                    >
                      <span class="icon icon-plus-circled"></span>
                    </button>
                    <label class="label11">(Aperte para adicionar ou remover)</label>
                  </div>

                  <label class="label3" >Diâmetro primitivo</label>
                  {state.components.gears.map((g,i) => (
                    <input type="number" key={i} class="form-control3" placeholder="mm"
                      onChange={event => dispatch(actions.setDiameterG(event.target.value,i))}
                      value={g.d}
                    />))}

                  <label class="label3" >Angulo de pressão (0 para engrenagens retas)</label>
                  {state.components.gears.map((g,i) => (
                    <input type="number" key={i} class="form-control3" placeholder="°"
                      onChange={event =>  dispatch(actions.setPressionAngleG(event.target.value,i))}
                      value={g.pressionAngle}
                    />))}

                  <label class="label3" >Posição no eixo (em relação ao primeiro mancal)</label>
                  {state.components.gears.map((g,i) => (
                    <input type="number" key={i} class="form-control3" placeholder="mm"
                      onChange={event =>  dispatch(actions.setPositionG(event.target.value,i))}
                      value={g.position}
                    />))}

                </div>
                <div class="form-Edited2">
                  <div className='intro'>
                    <span class="icon icon-record"></span>
                    <label class="label7">Polias</label>
                    <button class="btn btn-default"
                      onClick={(event) => handleMinusP(event)}
                    >
                      <span class="icon icon-minus-circled"></span>
                    </button>

                    <button class="btn btn-default"
                      onClick={(event) => handlePlusP(event)}
                    >
                      <span class="icon icon-plus-circled"></span>
                    </button>
                    <label class="label11">(Aperte para adicionar ou remover)</label>
                  </div>

                  <label class="label3" >Diâmetro primitivo</label>
                  {state.components.pulleys.map((p,i) => (
                  <input type="number" key={i} class="form-control3" placeholder="mm"
                    onChange={event => dispatch(actions.setDiameterP(event.target.value,i))}
                    value={p.d}
                  />))}

                  <label class="label3" >Posição no eixo (em relação ao primeiro mancal)</label>
                  {state.components.pulleys.map((p,i) => (
                  <input type="number" key={i} class="form-control3" placeholder="mm"
                    onChange={event => dispatch(actions.setPositionP(event.target.value,i))}
                    value={p.position}
                  />))}
                </div>
                {atention && <label class="label4" >Algumas informações estão faltando, verifique essa e as sessões anteriores.</label>}
              </form>
            </div>
          </div>
        </div>



        <footer class="toolbar toolbar-footer">
          <div class="toolbar-actions">

            <button type="submit" class="btn btn-default" onClick={handleSubmitBack}>
              Voltar
              </button>

            <button type="submit" class="btn btn-primary pull-right"
              onClick={(event)=>handleSubmitNext(event)}>
              Próximo
              </button>

          </div>
        </footer>

      </div>
    </>
  )
};