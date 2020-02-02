import React ,{useState,useEffect} from 'react'
import con from '../../controlers/controler'
import calc from '../../operations/calc'
import db from '../../controlers/databaseJSON'
import { Line } from 'react-chartjs-2'

export default function Graph({ history }) {

  const [data,setData] = useState([])
  const [labels,setLabels] = useState([])
  const [numPoints,setNumPoints] = useState(1)

  const [P1,setP1] = useState('')
  const [P2,setP2] = useState('')
  const [P3,setP3] = useState('')
  const [P4,setP4] = useState('')
  const [P5,setP5] = useState('')
  const [P6,setP6] = useState('')

  const [alert,setAlert] = useState(false)

  useEffect(()=>{
    const file = localStorage.getItem('file')
    const inputs = JSON.parse(file)
    const [data,labels] = calc(inputs)
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
      ]
    };

    //async function handleHome(event){
    //  event.preventDefault();
    // history.push('/')
    //}

    async function handlePlusPoints(){
      const n = numPoints + 1
      if (n<=6){
        setNumPoints(n)
      }
    }
    async function handleMinusPoints(){
      const n = numPoints - 1
      if (n>=1){
        if(numPoints === 6){
          setP6('')
        } else if (numPoints === 5){
          setP5('')
        } else if (numPoints === 4){
          setP4('')
        } else if (numPoints === 3){
          setP3('')
        } else if (numPoints === 2){
          setP2('')
        } else if (numPoints === 1){
          setP1('')
        }
      setNumPoints(n)
      }
    }
    function handleSubmitNext(){
      const allPoints = [P1,P2,P3,P4,P5,P6]
      const points = allPoints.filter((point)=>(point === '' ? false : true))
      if(points[0]){
        var infos = JSON.parse(localStorage.getItem('file'))
        infos.points = points
        localStorage.setItem('file',JSON.stringify(infos))
        const fileName = localStorage.getItem('fileName')
        db.save(fileName,infos)
      } else {
        setAlert(true)
      }
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
              <span class="icon icon-menu"></span>
              </button>
              <button class="btn btn-default active">
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
              <div className="graph">
              <Line className="graph" data={dataSet} />
              </div>
              <label className="label5" >Observando o gráfico e de acordo com a disposição dos componentes no eixo,
              escolha pontos que você deseja saber o diâmetro, por exemplo, 
              se o <br/> pico do gráfico de momento for em 5 metros e você deseja saber o diâmetro nesse ponto 
              coloque 5 no campo abaixo </label>
              <div className="teste">
              <form>
                  <div class="form-Edited">
                    <label class="label7">Posições de interesse</label>
                    <button class="btn btn-default" onClick = {()=> handleMinusPoints()}  >
                    <span class="icon icon-minus-circled"></span>
                    </button>
                    
                    <button class="btn btn-default" onClick = {()=> handlePlusPoints()}  >
                    <span class="icon icon-plus-circled"></span>
                    </button>

                    <>
                    <label class="label6" >P1</label>
                    <input id ="potency" type="number" class="form-control4" placeholder="mm" 
                    onChange ={event =>{setP1(event.target.value);setAlert(false)}}
                    value = {P1}
                    />
                    </>
                    { numPoints>=2 && (
                    <>
                    <label class="label6" >P2</label>
                    <input id ="potency" type="number" class="form-control4" placeholder="mm" 
                    onChange ={event =>{setP2(event.target.value);setAlert(false)}}
                    value = {P2}
                    />
                    </>)}
                    { numPoints>=3 && (
                    <>
                    <label class="label6" >P3</label>
                    <input id ="potency" type="number" class="form-control4" placeholder="mm" 
                    onChange ={event =>{setP3(event.target.value);setAlert(false)}}
                    value = {P3}
                    />
                    </>)}
                    { numPoints>=4 && (
                    <>
                    <label class="label6" >P4</label>
                    <input id ="potency" type="number" class="form-control4" placeholder="mm" 
                    onChange ={event =>{setP4(event.target.value);setAlert(false)}}
                    value = {P4}
                    />
                    </>)}
                    { numPoints>=5 && (
                    <>
                    <label class="label6" >P5</label>
                    <input id ="potency" type="number" class="form-control4" placeholder="mm" 
                    onChange ={event =>{setP5(event.target.value);setAlert(false)}}
                    value = {P5}
                    />
                    </>)}
                    { numPoints>=6 && (
                    <>
                    <label class="label6" >P6</label>
                    <input id ="potency" type="number" class="form-control4" placeholder="mm" 
                    onChange ={event =>{setP6(event.target.value);setAlert(false)}}
                    value = {P6}
                    />
                    </>)}
                  </div>
              </form>
              </div>
        
        <footer class="toolbar toolbar-footer">
          <div class="toolbar-actions1">
        
            <button type= "submit" class="btn btn-default">
              Voltar
            </button>
            
            {alert && <label className="label9" >Adicione pelo menos um valor.</label>}

            <button type= "submit" class="btn btn-primary pull-right" onClick={handleSubmitNext}>
              Próximo
            </button>

          </div>
        </footer>
        </div>
</>
    )
};