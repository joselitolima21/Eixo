import React, { useState, useEffect } from 'react'
import con from '../../controlers/controler'

export default function Page3({ history }) {

  const [dp, setDp] = useState('')
  const [posP, setPosP] = useState('')
  const [dg, setDg] = useState('')
  const [pressionAngle, setPressionAngle] = useState('')
  const [posG, setPosG] = useState('')
  const [atention, setAtention] = useState(false)
  const  [home,setHome] = useState(false)

  useEffect(() => {

    const dp = localStorage.getItem('dp')
    const posP = localStorage.getItem('posP')
    const dg = localStorage.getItem('dg')
    const pressionAngle = localStorage.getItem('pressionAngle')
    const posG = localStorage.getItem('posG')

    if (dp) {
      setDp(dp)
    }
    if (posP) {
      setPosP(posP)
    }
    if (dg) {
      setDg(dg)
    }
    if (pressionAngle) {
      setPressionAngle(pressionAngle)
    }
    if (posG) {
      setPosG(posG)
    }
  }, []) // eslint-disable-line 

  async function handleSubmitBack(event) {
    event.preventDefault();
    history.push('/page2')
  }

  async function handleSubmitNext(event) {
    event.preventDefault();
    localStorage.setItem('dp', dp)
    localStorage.setItem('posP', posP)
    localStorage.setItem('dg', dg)
    localStorage.setItem('pressionAngle', pressionAngle)
    localStorage.setItem('posG', posG)

    function validate() {
      const pot = localStorage.getItem('potency')
      const rot = localStorage.getItem('rotation')
      const tor = localStorage.getItem('torque')
      const l = localStorage.getItem('l')
      const r2 = localStorage.getItem('r2')
      const typeOfMaterial = localStorage.getItem('typeOfMaterial')
      const sigmaE = localStorage.getItem('sigmaE')
      const sigmaR = localStorage.getItem('sigmaR')
      const tempOfWork = localStorage.getItem('tempOfWork')
      const surfaceFinish = localStorage.getItem('surfaceFinish')
      const conf = localStorage.getItem('conf')
      const dp = localStorage.getItem('dp')
      const posP = localStorage.getItem('posP')
      const dg = localStorage.getItem('dg')
      const pressionAngle = localStorage.getItem('pressionAngle')
      const posG = localStorage.getItem('posG')

      if (pot && rot && tor && l && r2 && typeOfMaterial && sigmaE && sigmaR && tempOfWork
        && surfaceFinish && conf && dp && posP && dg && pressionAngle && posG) {
        const file = {
          "potency": pot,
          "rotation": rot,
          "torque": tor,
          "l": l,
          "r2": r2,
          "components": {
            "pulleys": [
              { "d": dp, "position": posP }
            ],
            "gears": [
              { "d": dg, "position": posG, "pressionAngle": pressionAngle }
            ]
          },
          "sigmaR": sigmaR,
          "sigmaE": sigmaE,
          "typeOfMaterial": typeOfMaterial,
          "units": "im",
          "tempOfWork": tempOfWork,
          "surfaceFinish": surfaceFinish,
          "conf": conf,
          "typeOfCarreg": "flexao"
        }
        localStorage.setItem('file', JSON.stringify(file))

        localStorage.removeItem('potency')
        localStorage.removeItem('rotation')
        localStorage.removeItem('torque')
        localStorage.removeItem('l')
        localStorage.removeItem('r2')
        localStorage.removeItem('typeOfMaterial')
        localStorage.removeItem('sigmaE')
        localStorage.removeItem('sigmaR')
        localStorage.removeItem('tempOfWork')
        localStorage.removeItem('surfaceFinish')
        localStorage.removeItem('conf')
        localStorage.removeItem('dp')
        localStorage.removeItem('posP')
        localStorage.removeItem('dg')
        localStorage.removeItem('pressionAngle')
        localStorage.removeItem('posG')
        history.push('/graph')
      } else {
        setAtention(true)
      }
    }
    validate()
  }
  function handleHome(event) {
    event.preventDefault();
    history.push('/')
    localStorage.removeItem('fileName')
    localStorage.removeItem('dp')
    localStorage.removeItem('posP')
    localStorage.removeItem('dg')
    localStorage.removeItem('pressionAngle')
    localStorage.removeItem('posG')
    localStorage.removeItem('typeOfMaterial')
    localStorage.removeItem('sigmaE')
    localStorage.removeItem('sigmaR')
    localStorage.removeItem('tempOfWork')
    localStorage.removeItem('surfaceFinish')
    localStorage.removeItem('conf')
    localStorage.removeItem('potency')
    localStorage.removeItem('rotation')
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
                  <span class="nav-group-item">
                    <span class="icon icon-record"></span>
                    Engrenagens
                        </span>
                  <label class="label3" >Diâmetro primitivo</label>
                  <input type="number" class="form-control3" placeholder="mm"
                    onChange={event => setDg(event.target.value)}
                    value={dg}
                  />
                  <label class="label3" >Angulo de pressão (0 para engrenagens retas)</label>
                  <input type="number" class="form-control3" placeholder="°"
                    onChange={event => setPressionAngle(event.target.value)}
                    value={pressionAngle}
                  />
                  <label class="label3" >Posição no eixo (em relação ao primeiro mancal)</label>
                  <input type="number" class="form-control3" placeholder="mm"
                    onChange={event => setPosG(event.target.value)}
                    value={posG}
                  />
                </div>
                <div class="form-Edited2">
                  <span class="nav-group-item">
                    <span class="icon icon-record"></span>
                    Polias
                        </span>
                  <label class="label3" >Diâmetro primitivo</label>
                  <input type="number" class="form-control3" placeholder="mm"
                    onChange={event => setDp(event.target.value)}
                    value={dp}
                  />
                  <label class="label3" >Posição no eixo (em relação ao primeiro mancal)</label>
                  <input type="number" class="form-control3" placeholder="mm"
                    onChange={event => setPosP(event.target.value)}
                    value={posP}
                  />
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
              onClick={handleSubmitNext}>
              Próximo
              </button>

          </div>
        </footer>

      </div>
    </>
  )
};