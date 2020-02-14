const mathjs = window.require('mathjs')
export default function(T,M,N,Kf,Kfs,Cfadiga,sigmaR) {
var t = true
// Valores iniciais
var sigmaFlinha0 = 200000
var d0 = 10
while(t){
    const e = 0.01
    //Constantes necessarias
    const pi = mathjs.pi
    const Cf = 0.5*1.189*Cfadiga*(sigmaR*1000000) //= Mpa
    //const Cf = 0.5*0.869*0.84*(sigmaR*1000000) //kpsi
    const Ct = (32*N/pi)*((Kf*M)**2 + (3/4)*((Kfs*T)**2))**0.5
    // Jacobiana e sua inversa
    const f1y = (Ct/(3*(sigmaFlinha0**2)))*(((Ct/sigmaFlinha0)+(Ct/(sigmaR*1000000)))**(-2/3))
    const f2y = (Cf/((sigmaFlinha0**2)*0.097))*((Cf/sigmaFlinha0)**(0.903/0.097))
    const J = mathjs.matrix([[1,f1y],[1,f2y]])
    const detJ = 1/mathjs.det(J)
    const inv = mathjs.matrix([[f2y,-f1y],[-1,1]])
    const Jinv = mathjs.multiply(inv,detJ)
    // Matriz das funções
    const f1 = d0 - ((Ct/sigmaFlinha0) + (Ct/(sigmaR*1000000)))**(1/3)
    const f2 = d0 - (Cf/sigmaFlinha0)**(1/0.097)
    const F = mathjs.matrix([[f1],[f2]])
    //Solução
    const k = mathjs.matrix([[d0],[sigmaFlinha0]])
    const factor = mathjs.multiply(Jinv,F)
    const sol = mathjs.subtract(k,factor)

    const d1 = sol._data[0][0]
    const sigmaFlinha1 = sol._data[1][0]

    const Ex = mathjs.abs(d1 - d0)
    const Ey = mathjs.abs(sigmaFlinha1 - sigmaFlinha0)
    console.log(d1)
    if (Ex < e && Ey < e){        
        t = false
        console.log("DEU")
        return d1
    } else {
        sigmaFlinha0 = sigmaFlinha1
        d0 = d1
        console.log("NÃO DEU")
    }
}
}