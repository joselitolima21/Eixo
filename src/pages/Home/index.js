import React from 'react'
import con from '../../controlers/controler'
import db from '../../controlers/databaseJSON'
import back from '../../images/back-home.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../../store/reducers/homeReducer'
//import icone from '../../images/icone.png'

export default function Home({ history }) {

  const state = useSelector(state => state.homeReducer);
  const dispatch = useDispatch()

  // Muda a opçaõ escolhida
  function handleRadio(event) {
    dispatch(actions.setOptionChecked(event.target.value))
  }

  // Avanca depedendo da opção
  function handleNext1(event) {
    event.preventDefault()
    if (state.optionChecked === 'option1') {
      dispatch(actions.setFirstChoice(false))
    } else if (state.optionChecked === 'option2') {
      handleFind()
      dispatch(actions.setFirstChoice(false))
    }
  }

  // Acha os arquivos da opcao 2
  function handleFind() {
    const files = db.find()
    if (files[0]) {
      dispatch(actions.setFile(files, files[0], ''))
      console.log(state.files)
    } else {
      dispatch(actions.setFile(['Nenhum Arquivo Encontrado'], '', ''))
    }
  }

  // Muda o file escolhido na option 2
  function handleFileChange(event) {
    dispatch(actions.setFile(state.files, event.target.value, ''))
  }

  // Muda o nome do file escolhido na option 1
  function handleFileName(event) {
    dispatch(actions.setFile([], '', event.target.value));
    dispatch(actions.alert(''));
  }

  // Volta para primeira tela
  function handleBack(event) {
    event.preventDefault()
    dispatch(actions.back())
  }

  //Segundo botao de avançar
  function handleGO(event) {
    event.preventDefault()
    // Se a opção for a 1
    // Se digitar o nome
    if (state.optionChecked === 'option1') {
      if (state.fileNew) {
        function limpaString(string) {
          var n = "";
          for (var i = 0; i < string.length; i++) {
            if (string.charAt(i) !== " " && string.charAt(i) !== ".") {
              n += string.charAt(i);
            }
          }
          return n
        }
        const name = limpaString(state.fileNew)
        const fileName = name + '.json'
        // Depois salvar no redux
        localStorage.setItem('fileName', fileName)
        history.push('/page1')
      }
      // Se não digitar o nome
      else {
        dispatch(actions.alert('fileName'))
      }
    }
    // Se a opção for a 2
    else if (state.optionChecked === 'option2') {
      const fileName = state.fileChoiced + '.json'
      // Depois salvar no redux
      localStorage.setItem('fileName', fileName)
      history.push('/results')
    }
  }

  // Funçao para o botao enter
  function keyPress(event) {
    if (event.key === "Enter" && state.firstChoice) {
      handleNext1(event)
    } else if (event.key === "Enter" && !state.firstChoice) {
      handleGO(event)
    }
  }

  return (
    <div onKeyPress={(event) => keyPress(event)}>
      <div class="window">
        <header class="toolbar toolbar-header">

          <div class="toolbar-actions">

            <div class="btn-group">
              <button class="btn btn-default active">
                <span class="icon icon-home"></span>
              </button>
            </div>


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
          <div className='home'>

            <form>
              {state.firstChoice && (
                <>
                  <div className="radio">
                    <label>
                      <input type="radio" value="option1" checked={state.optionChecked === 'option1'}
                        onChange={(event) => handleRadio(event)} className='radio' />
                    Iniciar novo dimensionamento
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="option2" checked={state.optionChecked === 'option2'}
                        onChange={(event) => handleRadio(event)} className='radio' />
                    Carregar dimensionamento salvo
                    </label>
                  </div>


                  <div className='buttons1'>
                    <button class="botaoBack" onClick={(event) => handleNext1(event)}>
                      Avançar
                  </button>
                  </div>
                </>)}

              <div className='form-next'>
                {!state.firstChoice && state.optionChecked === 'option1' && (
                  <input type="text" class="form-control5" placeholder="Nome para ser salvo"
                    onChange={event => handleFileName(event)} />)}
                {!state.firstChoice && state.optionChecked === 'option2' && (<select class="form-control5"
                  onChange={event => handleFileChange(event)}>
                  {state.files.map((file) => (<option key={file}>{file}</option>))}</select>)}
              </div>

              {!state.firstChoice &&
                (<div className='buttons'>
                  <button class="botaoNext" onClick={(event) => handleBack(event)}>
                    Mudar escolha
                    </button>
                  {(state.optionChecked === 'option1' || state.fileChoiced !== 'Nenhum Arquivo encontrado') &&
                    (<button class="botaoBack" onClick={(event) => handleGO(event)}
                    >
                      Avançar
                    </button>)}

                </div>)}
              {state.alert === 'fileName' && <label class="label8" >Digite algum nome</label>}
            </form>

          </div>
          <img src={back} alt='back' className='back' />
        </div>

        <footer class="toolbar toolbar-footer">

        </footer>
      </div>
    </div>
  )
};

/*<div className="icone">
<img src={icone} alt='icone'/>
</div>*/