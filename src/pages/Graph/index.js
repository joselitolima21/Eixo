import React /*,{useState,useEffect}*/ from 'react'
import con from '../../controlers/controler'

export default function Graph({ history }) {

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
              
          </div>
        </div>
        </div>
        <footer class="toolbar toolbar-footer">
            
          </footer>
        </div>
</>
    )
};