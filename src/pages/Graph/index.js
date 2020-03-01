import React ,{useState,useEffect} from 'react'
import con from '../../controlers/controler'
import calc from '../../operations/calc'
import db from '../../controlers/databaseJSON'
import { Line } from 'react-chartjs-2'

export default function Graph({ history }) {

  const [data,setData] = useState([])
  const [labels,setLabels] = useState([])
  const [numPoints,setNumPoints] = useState(1)
  
  const  [home,setHome] = useState(false)
  const [P1,setP1] = useState('')
  const [P2,setP2] = useState('')
  const [P3,setP3] = useState('')
  const [P4,setP4] = useState('')
  const [P5,setP5] = useState('')
  const [Kt1,setKt1] = useState('')
  const [Kt2,setKt2] = useState('')
  const [Kt3,setKt3] = useState('')
  const [Kt4,setKt4] = useState('')
  const [Kt5,setKt5] = useState('')
  const [Kts1,setKts1] = useState('')
  const [Kts2,setKts2] = useState('')
  const [Kts3,setKts3] = useState('')
  const [Kts4,setKts4] = useState('')
  const [Kts5,setKts5] = useState('')

  const [alert,setAlert] = useState(false)

  useEffect(()=>{
    const [data,labels] = calc.graph()
    setData(data)
    setLabels(labels)
  },[]) // eslint-disable-line

    const dataSet = {
      labels: labels,
      datasets: [
        {
          label: 'Momento Resultante',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data
        }
      ],
    };

    //async function handleHome(event){
    //  event.preventDefault();
    // history.push('/')
    //}

    async function handlePlusPoints(event){
      event.preventDefault()
      const n = numPoints + 1
      if (n<=5){
        setNumPoints(n)
      }
    }
    async function handleMinusPoints(event){
      event.preventDefault()
      const n = numPoints - 1
      if (n>=1){
        if(numPoints === 5){
          setP5('')
          setKt5('')
          setKts5('')
        } else if (numPoints === 4){
          setP4('')
          setKt4('')
          setKts4('')
        } else if (numPoints === 3){
          setP3('')
          setKt3('')
          setKts3('')
        } else if (numPoints === 2){
          setP2('')
          setKt2('')
          setKts2('')
        } else if (numPoints === 1){
          setP1('')
          setKt1('')
          setKts1('')
        }
      setNumPoints(n)
      }
    }
    function handleSubmitNext(){
      const allPoints = [P1/1000,P2/1000,P3/1000,P4/1000,P5/1000]
      const allKt = [Kt1,Kt2,Kt3,Kt4,Kt5]
      const allKts = [Kts1,Kts2,Kts3,Kts4,Kts5]
      const points = allPoints.filter((point)=>(point === 0 ? false : true))
      const ktFilter = allKt.filter((point)=>(point === '' ? false : true))
      const ktsFilter = allKts.filter((point)=>(point === '' ? false : true))

      if(points[0] && ktFilter[0] && ktsFilter[0]){
        var infos = JSON.parse(localStorage.getItem('file'))
        infos.points = points
        infos.kt = ktFilter
        infos.kts = ktsFilter
        localStorage.setItem('file',JSON.stringify(infos))
        const fileName = localStorage.getItem('fileName')
        db.save(fileName,infos)
        history.push('/results')
      } else {
        setAlert(true)
      }
    }
    function handleHome(event) {
      event.preventDefault();
      history.push('/')
      localStorage.removeItem('fileName')
      localStorage.removeItem('file')
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
              <button class="btn btn-default">
              <span class="icon icon-menu"></span>
              </button>
              <button class="btn btn-default active">
                <span class="icon icon-chart-line"></span>
              </button>
            </div>
            
            {home && (
            <>
            <label className='label200'>Voltar para Home? O que foi salvo será perdido.</label>
            <button class="btn btn-default active" onClick={(event)=>{setHome(false);handleHome(event)}}>
              Sim
            </button>
            <button class="btn btn-default active"  onClick={()=>setHome(false)} >
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
              <div className="graph">
              <Line height={120}  className="graph" data={dataSet} options={{
              scales: {
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Momento (N.m)',
                    fontFamily: 'sans-serif',
                  }
                }],
                xAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Comprimento do eixo (m)',
                    fontFamily: 'sans-serif',
                  }
                }]
              }
            }}/>
              <label className="label10" >Observando o gráfico e de acordo com a disposição dos componentes no eixo,
              escolha pontos (até 5 pontos) que você deseja saber o diâmetro, e seus respectivos <br/> Kt e Kts, por exemplo, 
              se o pico do gráfico de momento for em 50 mm e você deseja saber o diâmetro nesse ponto 
              coloque 50 no campo P1.</label>
              <div className="teste">
              <form>
                  <div class="form-Edited20">
                    
                    <div className='intro'>
                    <label class="label7">Posições de interesse</label>
                    <button class="btn btn-default" onClick = {(event)=> handleMinusPoints(event)}  >
                    <span class="icon icon-minus-circled"></span>
                    </button>
                    
                    <button class="btn btn-default" onClick = {(event)=> handlePlusPoints(event)}  >
                    <span class="icon icon-plus-circled"></span>
                    </button>
                    </div>

                    <div className='fatores'>
                    <label class="label6" >P1</label>
                    <input id ="potency" type="number" class="form-control4" placeholder="mm" 
                    onChange ={event =>{setP1(event.target.value);setAlert(false)}}
                    value = {P1}/>
                    <label class="label6" >Kt1</label>
                    <input  type="number" class="form-control4" placeholder="" 
                    onChange ={event =>{setKt1(event.target.value);setAlert(false)}}
                    value = {Kt1}/>
                     <label class="label6" >Kts1</label>
                    <input type="number" class="form-control4" placeholder="" 
                    onChange ={event =>{setKts1(event.target.value);setAlert(false)}}
                    value = {Kts1}/>
                    </div>

                    { numPoints>=2 && (
                    <div className='fatores'>
                    <label class="label6" >P2</label>
                    <input id ="potency" type="number" class="form-control4" placeholder="mm" 
                    onChange ={event =>{setP2(event.target.value);setAlert(false)}}
                    value = {P2}/>
                    <label class="label6" >Kt2</label>
                    <input  type="number" class="form-control4" placeholder="" 
                    onChange ={event =>{setKt2(event.target.value);setAlert(false)}}
                    value = {Kt2}/>
                     <label class="label6" >Kts2</label>
                    <input type="number" class="form-control4" placeholder="" 
                    onChange ={event =>{setKts2(event.target.value);setAlert(false)}}
                    value = {Kts2}/>
                    </div>)}
                    { numPoints>=3 && (
                    <div className='fatores'>
                    <label class="label6" >P3</label>
                    <input id ="potency" type="number" class="form-control4" placeholder="mm" 
                    onChange ={event =>{setP3(event.target.value);setAlert(false)}}
                    value = {P3}/>
                    <label class="label6" >Kt3</label>
                    <input  type="number" class="form-control4" placeholder="" 
                    onChange ={event =>{setKt3(event.target.value);setAlert(false)}}
                    value = {Kt3}/>
                     <label class="label6" >Kts3</label>
                    <input type="number" class="form-control4" placeholder="" 
                    onChange ={event =>{setKts3(event.target.value);setAlert(false)}}
                    value = {Kts3}/>
                    </div>)}
                    { numPoints>=4 && (
                    <div className='fatores'>
                    <label class="label6" >P4</label>
                    <input id ="potency" type="number" class="form-control4" placeholder="mm" 
                    onChange ={event =>{setP4(event.target.value);setAlert(false)}}
                    value = {P4}/>
                    <label class="label6" >Kt4</label>
                    <input  type="number" class="form-control4" placeholder="" 
                    onChange ={event =>{setKt4(event.target.value);setAlert(false)}}
                    value = {Kt4}/>
                     <label class="label6" >Kts4</label>
                    <input type="number" class="form-control4" placeholder="" 
                    onChange ={event =>{setKts4(event.target.value);setAlert(false)}}
                    value = {Kts4}/>
                    </div>)}
                    { numPoints>=5 && (
                    <div className='fatores'>
                    <label class="label6" >P5</label>
                    <input id ="potency" type="number" class="form-control4" placeholder="mm" 
                    onChange ={event =>{setP5(event.target.value);setAlert(false)}}
                    value = {P5}/>
                    <label class="label6" >Kt5</label>
                    <input  type="number" class="form-control4" placeholder="" 
                    onChange ={event =>{setKt5(event.target.value);setAlert(false)}}
                    value = {Kt5}/>
                     <label class="label6" >Kts5</label>
                    <input type="number" class="form-control4" placeholder="" 
                    onChange ={event =>{setKts5(event.target.value);setAlert(false)}}
                    value = {Kts5}/>
                    </div>)}
                  </div>
              </form>
              </div>
              </div>
              <footer class="toolbar toolbar-footer">
              <div class="toolbar-actions1">
        
              <button type= "submit" class="btn btn-default">
              Voltar
              </button>
            
              {alert && <label className="label9" >Adicione os valores requeridos.</label>}

              <button type= "submit" class="btn btn-primary pull-right" onClick={handleSubmitNext}>
              Próximo
              </button>

          </div>
        </footer>
        </div>
</>
    )
};