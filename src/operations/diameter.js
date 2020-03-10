import moments from '../operations/moments'
import db from '../controlers/databaseJSON'
import newton from './newton'
import utils from './utils'

export default function () {

    function getInfos(){
        const file = localStorage.getItem('file')
        const fileName = localStorage.getItem('fileName')
        if(!file){
            const inputs = db.request(fileName)
            return inputs
        } else {
            const file = localStorage.getItem('file')
            const inputs = JSON.parse(file)
            return inputs
        }
    }
    const inputs = getInfos()
    //  ======= Constantes iguais para todos pontos
    const T = inputs.torque
    const sigmaR = inputs.sigmaR
    const Cfadiga = utils.Cfadiga(inputs)

    //  ======= Constantes dependentes dos pontos
    const [kf,kfs] = utils.fatoresK(inputs)
    const M = inputs.points.map((point) => moments.pointMoment(point))
    
    const range = (start, step, end) => {
        const length = (end - start) / step + 1;
        return Array.from({ length }, (_, i) => (start + step * i).toFixed(2));
    }
    
    const N = range(1, 0.5, 10)

    const d = inputs.points.map((p,index) => {

        const DP = N.map((n) => {
            const d = M.map((m, i) => {
                const res = newton(T,m,n,kf[i],kfs[i],Cfadiga,sigmaR)
                return res.toFixed(4)
            })
            return d
        }).map((d) => d[index])
        return DP
    })
    return [d, N, inputs.points]
}