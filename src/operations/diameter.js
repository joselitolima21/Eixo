import calc from '../operations/calc'
import db from '../controlers/databaseJSON'
//import utils from './utils'
export default function () {

    function getInfos(){
        const file = localStorage.getItem('file')
        const fileName2 = localStorage.getItem('fileName')
        if(!file){
            const inputs = db.request(fileName2)
            return inputs
        } else {
            const file = localStorage.getItem('file')
            const inputs = JSON.parse(file)
            return inputs
        }
    }

    const inputs = getInfos()
    //  ======= Constantes iguais para todos pontos
    //const sigmaF = utils.sigmaFlinha(inputs) - só para primeira estimativa
    const sigmaF = 27.3 * 1000
    const sigmaR = inputs.sigmaR * 1000
    const T = inputs.torque

    //  ======= Constantes dependentes dos pontos
    //const [kf,kfs] = utils.fatoresK(inputs)
    const kf = [2.50, 2.25, 2.25]
    const kfs = [2.70, 1.57, 1.57]
    const M = inputs.points.map((point) => calc.pointMoment(point))
    const range = (start, step, end) => {
        const length = (end - start) / step + 1;
        return Array.from({ length }, (_, i) => (start + step * i).toFixed(2));
    }
    const N = range(1, 0.5, 10)

    const d = inputs.points.map((p,index) => {

        const DP = N.map((n) => {
            const d = M.map((m, i) => {
                const res = ((32*n/Math.PI)*(((((kf[i]*m)**2)+((((3/4)*((kfs[i]*T)**2)))))**0.5)/sigmaF + ((((kf[i]*m)** 2) + ((((3/4)*((kfs[i]*T)**2)))))**0.5)/sigmaR))**(1/3)
                return res.toFixed(4)
            })
            return d
        }).map((d) => d[index])
        return DP
    })
    return [d, N, inputs.points]
}