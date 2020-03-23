import React, { useState, useEffect } from 'react'
import con from '../../controlers/controler'
import moments from '../../operations/moments'
import db from '../../controlers/databaseJSON'
import { Line } from 'react-chartjs-2'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../../store/reducers/dataReducer'

export default function Points({ history }) {
  
  const { fileName } = useSelector(state => state.homeReducer)
  const state = useSelector(state => state.dataReducer)
  const dispatch = useDispatch()

  const [data, setData] = useState([])
  const [labels, setLabels] = useState([])

  const [home, setHome] = useState(false)

  const [alert, setAlert] = useState(false)
  const [curto, setCurto] = useState(false)

  useEffect(() => {
      const [data, labels, curto] = moments.graph(state)
      setCurto(curto)
      setData(data)
      setLabels(labels)
  }, []) // eslint-disable-line

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

  // Acrescenta mais polias
  function handlePlusPoints(event) {
    event.preventDefault()
    if (state.Npoints <= 5) {
      dispatch(actions.plusPoint(state.Npoints + 1))
    }
  }
  function handleMinusPoints(event) {
    event.preventDefault()
    if (state.Npoints >= 2) {
      dispatch(actions.minusPoint(state.Npoints - 1))
    }
  }

  function handleSubmitNext() {
    if (state.points[0] !== 0 && state.kt[0] !== 0 && state.kts[0] !== 0) {
      db.save(fileName, state)
      history.push('/results')
    } else {
      setAlert(true)
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
                <button class="btn btn-default active" onClick={(event) => { setHome(false); handleHome(event) }}>
                  Sim
            </button>
                <button class="btn btn-default active" onClick={() => setHome(false)} >
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
        <div className="graph">
          <Line height={120} className="graph" data={dataSet} options={{
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
                  labelString: curto ? 'Comprimento do eixo em milímetros (mm)' : 'Comprimento do eixo em metros (m)',
                  fontFamily: 'sans-serif',
                }
              }]
            }
          }} />
          <label className="label10" >Observando o gráfico e de acordo com a disposição dos componentes no eixo,
              escolha pontos (até 5 pontos) que você deseja saber o diâmetro, e seus respectivos <br /> Kt e Kts, por exemplo,
              se o pico do gráfico de momento for em 50 mm e você deseja saber o diâmetro nesse ponto
              coloque 50 no campo P1.</label>
          <div className="teste">
            <form>
              <div class="form-Edited20">

                <div className='intro'>
                  <label class="label7">Posições de interesse</label>
                  <button class="btn btn-default" onClick={(event) => handleMinusPoints(event)}  >
                    <span class="icon icon-minus-circled"></span>
                  </button>

                  <button class="btn btn-default" onClick={(event) => handlePlusPoints(event)}  >
                    <span class="icon icon-plus-circled"></span>
                  </button>
                </div>


                {state.points.map((p, i) => (
                  <div key={i} className='fatores'>
                    <label class="label6" >P{i + 1}</label>
                    <input id="potency" type="number" class="form-control4" placeholder="mm"
                      onChange={event => { dispatch(actions.setP(event.target.value, i)); setAlert(false) }}
                      value={p} />
                    <label class="label6" >Kt{i + 1}</label>
                    <input type="number" class="form-control4" placeholder=""
                      onChange={event => { dispatch(actions.setKt(event.target.value, i)); setAlert(false) }}
                      value={state.kt[i]} />
                    <label class="label6" >Kts{i + 1}</label>
                    <input type="number" class="form-control4" placeholder=""
                      onChange={event => { dispatch(actions.setKts(event.target.value, i)); setAlert(false) }}
                      value={state.kts[i]} />
                  </div>))}

              </div>
            </form>
          </div>
        </div>
        <footer class="toolbar toolbar-footer">
          <div class="toolbar-actions1">

            <button type="submit" class="btn btn-default">
              Voltar
              </button>

            {alert && <label className="label9" >Adicione os valores requeridos.</label>}

            <button type="submit" class="btn btn-primary pull-right" onClick={handleSubmitNext}>
              Próximo
              </button>

          </div>
        </footer>
      </div>
    </>
  )
};