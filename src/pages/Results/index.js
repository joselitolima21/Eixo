import React, { useState, useEffect } from 'react'
import con from '../../controlers/controler'
import result from '../../operations/diameter'
import { Line } from 'react-chartjs-2'

export default function Graph({ history }) {

  const [data, setData] = useState([])
  const [labels, setLabels] = useState([])
  const [points, setPoints] = useState([])
  const [pointChoiced, setPointChoiced] = useState(0)

  function handleHome(event) {
    event.preventDefault();
    history.push('/')
  }
  useEffect(() => {
    const [data, labels, points] = result()
    setData(data)
    setLabels(labels)
    setPoints(points)
  }, [])

  const dataSet = {
    labels: labels,
    datasets: [
      {
        label: 'Diâmetro Calculado',
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
        data: data[pointChoiced]
      }
    ]
  };
  return (
    <>
      <div class="window">
        <header class="toolbar toolbar-header">

          <div class="toolbar-actions">

            <div class="btn-group">
              <button class="btn btn-default" onClick={handleHome}>
                <span class="icon icon-home"></span>
              </button>
              <button class="btn btn-default">
                <span class="icon icon-menu"></span>
              </button>
              <button class="btn btn-default">
                <span class="icon icon-chart-line"></span>
              </button>
            </div>

            <div class="btn-group pull-right">
              <button onClick={() => con.handleMinimize()} class="btn btn-default">
                <span class="icon icon-minus"></span>
              </button>
              <button onClick={() => con.handleMaximize()} class="btn btn-default">
                <span class="icon icon-plus"></span>
              </button>
              <button onClick={() => con.handleClose()} class="btn btn-default">
                <span class="icon icon-cancel"></span>
              </button>
            </div>
          </div>
        </header>

        <div class="window-content">
          <div className="res">
            <nav class="nav-group">
              <h5 class="nav-group-title">Pontos Escolhidos</h5>
              {points.map((p, i) => (
                <span key={i} class={i === pointChoiced ? "nav-group-item active" : "nav-group-item"}
                  onClick={() => setPointChoiced(i)}>
                 
                  Ponto {i + 1} - {p} mm
                </span>))
              }
            </nav>
          </div>

          <div className='graph'>
            <Line height={140} data={dataSet} />
          </div>
        </div>

        <footer class="toolbar toolbar-footer">
          <div class="toolbar-actions1">

            <button type="submit" class="btn btn-default">
              Voltar
            </button>

            <button type="submit" class="btn btn-primary pull-right">
              Próximo
            </button>

          </div>
        </footer>
      </div>
    </>
  )
};