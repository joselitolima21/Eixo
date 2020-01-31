import React ,{useState,useEffect} from 'react'
import con from '../../controlers/controler'
import calc from '../../operations/calc'
import { Line } from 'react-chartjs-2'

export default function Graph({ history }) {

  const [data,setData] = useState([])
  const [labels,setLabels] = useState([])

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
    async function handleDefault(event){
        event.preventDefault();
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
              <button class="btn btn-default" onClick={handleDefault}>
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

          <div class="window-content">
            <div class="pane-group">
            <div class="work">
            <Line data={dataSet} />
          </div>
        </div>
        </div>
        <footer class="toolbar toolbar-footer">
            
          </footer>
        </div>
</>
    )
};