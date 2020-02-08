import React, { useState /*,useEffect*/ } from 'react'
import con from '../../controlers/controler'

export default function Page3({ history }) {

  const [dp1, setDp1] = useState('')
  const [dp2, setDp2] = useState('')
  const [dp3, setDp3] = useState('')
  const [dp4, setDp4] = useState('')
  const [dp5, setDp5] = useState('')
  const [dp6, setDp6] = useState('')

  const [posP1, setPosP1] = useState('')
  const [posP2, setPosP2] = useState('')
  const [posP3, setPosP3] = useState('')
  const [posP4, setPosP4] = useState('')
  const [posP5, setPosP5] = useState('')
  const [posP6, setPosP6] = useState('')

  const [dg1, setDg1] = useState('')
  const [dg2, setDg2] = useState('')
  const [dg3, setDg3] = useState('')
  const [dg4, setDg4] = useState('')
  const [dg5, setDg5] = useState('')
  const [dg6, setDg6] = useState('')

  const [pressionAngle1, setPressionAngle1] = useState('')
  const [pressionAngle2, setPressionAngle2] = useState('')
  const [pressionAngle3, setPressionAngle3] = useState('')
  const [pressionAngle4, setPressionAngle4] = useState('')
  const [pressionAngle5, setPressionAngle5] = useState('')
  const [pressionAngle6, setPressionAngle6] = useState('')

  const [posG1, setPosG1] = useState('')
  const [posG2, setPosG2] = useState('')
  const [posG3, setPosG3] = useState('')
  const [posG4, setPosG4] = useState('')
  const [posG5, setPosG5] = useState('')
  const [posG6, setPosG6] = useState('')


  const [atention, setAtention] = useState(false)
  const [home,setHome] = useState(false)
  const [numG,setNumG] = useState(1)
  const [numP,setNumP] = useState(1)

  async function handlePlusP(event){
    event.preventDefault()
    const n = numP + 1
    if (n<=6){
      setNumP(n)
    }
  }
  async function handleMinusP(event){
    event.preventDefault()
    const n = numP - 1
    if (n>=1){
      if(numP === 6){
        setDp6('')
        setPosP6('')
      } else if(numP === 5){
        setDp5('')
        setPosP5('')
      } else if (numP === 4){
        setDp4('')
        setPosP4('')
      } else if (numP === 3){
        setDp3('')
        setPosP3('')
      } else if (numP === 2){
        setDp2('')
        setPosP2('')
      } else if (numP === 1){
        setDp1('')
        setPosP1('')
      }
    setNumP(n)
    }
  }
  async function handlePlusG(event){
    event.preventDefault()
    const n = numG + 1
    if (n<=6){
      setNumG(n)
    }
  }
  async function handleMinusG(event){
    event.preventDefault()
    const n = numG - 1
    if (n>=1){
      if(numG === 6){
        setDg6('')
        setPosG6('')
        setPressionAngle6('')
      } else if(numG === 5){
        setDg5('')
        setPosG5('')
        setPressionAngle5('')
      } else if (numG === 4){
        setDg4('')
        setPosG4('')
        setPressionAngle4('')
      } else if (numG === 3){
        setDg3('')
        setPosG3('')
        setPressionAngle3('')
      } else if (numG === 2){
        setDg2('')
        setPosG2('')
        setPressionAngle2('')
      } else if (numG === 1){
        setDg1('')
        setPosG1('')
        setPressionAngle1('')
      }
    setNumG(n)
    }
  }
  /*useEffect(() => {

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
  }, []) // eslint-disable-line */

  async function handleSubmitBack(event) {
    event.preventDefault();
    history.push('/page2')
  }

  async function handleSubmitNext(event) {
    event.preventDefault();
    const pulleys = [
        { d: dp1, position: posP1 },
        { d: dp2, position: posP2 },
        { d: dp3, position: posP3 },
        { d: dp4, position: posP4 },
        { d: dp5, position: posP5 },
        { d: dp6, position: posP6 }
      ]
    const gears = [
        { d: dg1, position: posG1, pressionAngle: pressionAngle1 },
        { d: dg2, position: posG2, pressionAngle: pressionAngle2 },
        { d: dg3, position: posG3, pressionAngle: pressionAngle3 },
        { d: dg4, position: posG4, pressionAngle: pressionAngle4 },
        { d: dg5, position: posG5, pressionAngle: pressionAngle5 },
        { d: dg6, position: posG6, pressionAngle: pressionAngle6 }
      ]
    
    const pul = pulleys.filter((p)=>(p.d && p.position))
    const ge = gears.filter((g)=>(g.d && g.position && g.pressionAngle))
    const components = {pulleys:pul,gears:ge}
    localStorage.setItem('components', JSON.stringify(components))

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

      if (pot && rot && tor && l && r2 && typeOfMaterial && sigmaE && sigmaR && tempOfWork
        && surfaceFinish && conf && components) {
        let file = {
          "potency": pot,
          "rotation": rot,
          "torque": tor,
          "l": l,
          "r2": r2,
          "sigmaR": sigmaR,
          "sigmaE": sigmaE,
          "components": components,
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
    localStorage.removeItem('components')
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
                    <div className='intro'>
                    <span class="icon icon-record"></span>
                    <label class="label7">Engrenagens</label>
                    <button class="btn btn-default" 
                    onClick = {(event)=> handleMinusG(event)}  
                    >
                    <span class="icon icon-minus-circled"></span>
                    </button>
                    
                    <button class="btn btn-default" 
                    onClick = {(event)=> handlePlusG(event)}
                    >
                    <span class="icon icon-plus-circled"></span>
                    </button>
                    <label class="label11">(Aperte para adicionar ou remover)</label>
                    </div>
                  <label class="label3" >Diâmetro primitivo</label>
                            <input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setDg1(event.target.value)}
                              value={dg1}
                            />
                            {numG >= 2 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setDg2(event.target.value)}
                              value={dg2}
                            />)}
                            {numG >= 3 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setDg3(event.target.value)}
                              value={dg3}
                            />)}
                            {numG >= 4 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setDg4(event.target.value)}
                              value={dg4}
                            />)}
                            {numG >= 5 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setDg5(event.target.value)}
                              value={dg5}
                            />)}
                            {numG >= 6 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setDg6(event.target.value)}
                              value={dg6}
                            />)}
                  <label class="label3" >Angulo de pressão (0 para engrenagens retas)</label>
                            <input type="number" class="form-control3" placeholder="°"
                              onChange={event => setPressionAngle1(event.target.value)}
                              value={pressionAngle1}
                            />
                            {numG >= 2 && (<input type="number" class="form-control3" placeholder="°"
                              onChange={event => setPressionAngle2(event.target.value)}
                              value={pressionAngle2}
                            />)}
                            {numG >= 3 && (<input type="number" class="form-control3" placeholder="°"
                              onChange={event => setPressionAngle3(event.target.value)}
                              value={pressionAngle3}
                            />)}
                            {numG >= 4 && (<input type="number" class="form-control3" placeholder="°"
                              onChange={event => setPressionAngle4(event.target.value)}
                              value={pressionAngle4}
                            />)}
                            {numG >= 5 && (<input type="number" class="form-control3" placeholder="°"
                              onChange={event => setPressionAngle5(event.target.value)}
                              value={pressionAngle5}
                            />)}
                            {numG >= 6 && (<input type="number" class="form-control3" placeholder="°"
                              onChange={event => setPressionAngle6(event.target.value)}
                              value={pressionAngle6}
                            />)}
                  <label class="label3" >Posição no eixo (em relação ao primeiro mancal)</label>
                            <input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setPosG1(event.target.value)}
                              value={posG1}
                            />
                            {numG >= 2 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setPosG2(event.target.value)}
                              value={posG2}
                            />)}
                            {numG >= 3 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setPosG3(event.target.value)}
                              value={posG3}
                            />)}
                            {numG >= 4 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setPosG4(event.target.value)}
                              value={posG4}
                            />)}
                            {numG >= 5 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setPosG5(event.target.value)}
                              value={posG5}
                            />)}
                            {numG >= 6 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setPosG6(event.target.value)}
                              value={posG6}
                            />)}
                </div>
                <div class="form-Edited2">
                    <div className='intro'>
                    <span class="icon icon-record"></span>
                    <label class="label7">Polias</label>
                    <button class="btn btn-default" 
                    onClick = {(event)=> handleMinusP(event)}  
                    >
                    <span class="icon icon-minus-circled"></span>
                    </button>
                    
                    <button class="btn btn-default" 
                    onClick = {(event)=> handlePlusP(event)}
                    >
                    <span class="icon icon-plus-circled"></span>
                    </button>
                    <label class="label11">(Aperte para adicionar ou remover)</label>
                    </div>
                  <label class="label3" >Diâmetro primitivo</label>
                            <input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setDp1(event.target.value)}
                              value={dp1}
                            />
                            {numP >= 2 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setDp2(event.target.value)}
                              value={dp2}
                            />)}
                            {numP >= 3 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setDp3(event.target.value)}
                              value={dp3}
                            />)}
                            {numP >= 4 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setDp4(event.target.value)}
                              value={dp4}
                            />)}
                            {numP >= 5 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setDp5(event.target.value)}
                              value={dp5}
                            />)}
                            {numP >= 6 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setDp6(event.target.value)}
                              value={dp6}
                            />)}
                  <label class="label3" >Posição no eixo (em relação ao primeiro mancal)</label>
                             <input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setPosP1(event.target.value)}
                              value={posP1}
                            />
                            {numP >= 2 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setPosP2(event.target.value)}
                              value={posP2}
                            />)}
                            {numP >= 3 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setPosP3(event.target.value)}
                              value={posP3}
                            />)}
                            {numP >= 4 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setPosP4(event.target.value)}
                              value={posP4}
                            />)}
                            {numP >= 5 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setPosP5(event.target.value)}
                              value={posP5}
                            />)}
                           {numP >= 6 && (<input type="number" class="form-control3" placeholder="mm"
                              onChange={event => setPosP6(event.target.value)}
                              value={posP6}
                            />)}
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