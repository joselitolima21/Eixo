export default { 
    
    Cfadiga(inputs) {
    let sigmaR = inputs.sigmaR
    const typeOfCarreg = inputs.typeOfCarreg
    const surfaceFinish = inputs.surfaceFinish
    const tempOfWork = inputs.tempOfWork
    const conf = parseFloat(inputs.conf.split('%')[0])
    
    var C_carr
    var C_conf
    var C_temp
    var C_super

    if(typeOfCarreg === "flexao"){
        C_carr = 1;
    }
    else if(typeOfCarreg === "axial"){
        C_carr = 0.7;
    }
    else if(typeOfCarreg === "cisalhamento"){
        C_carr = 0.577
    }
    
    if(surfaceFinish === 'Retificado'){
        const A = 1.58;
        const B = -0.085;
        C_super = A*(sigmaR)**B;
        if(C_super > 1){
            C_super = 1
        }
    }
    else if(surfaceFinish === 'Usinado ou estirado a frio'){
        const A = 4.51;
        const B = -0.265;
        C_super = A*(sigmaR)**B;
        if(C_super > 1){
            C_super = 1
        }
    }
    else if(surfaceFinish === 'Laminado a quente'){
        const A = 57.7;
        const B = -0.718;
        C_super = A*(sigmaR)**B;
        if(C_super > 1){
            C_super = 1;
        }
    }
    else if (surfaceFinish === 'Forjado'){
        const A = 272;
        const B = -0.995;
        C_super = A*sigmaR^B;
        if(C_super > 1){
            C_super = 1}
    }
    
    if(tempOfWork <= 450){
        C_temp = 1
    }
    else if (450 < tempOfWork && tempOfWork <= 550){
        C_temp = 1 - 0.0058*(tempOfWork - 450);
    }

    if(conf === 50){
        C_conf = 1;
    }
    else if(conf === 90){
        C_conf = 0.897;
    }
    else if(conf === 95){
        C_conf = 0.868;
    }
    else if(conf === 99){
        C_conf = 0.814;
    }
    else if(conf === 99.9){
        C_conf = 0.753;
    }
    else if(conf === 99.99){
        C_conf = 0.702;
    }
    else if(conf === 99.999){
        C_conf = 0.659;
    }
    else if(conf === 99.9999){
        C_conf = 0.620;
    }
    const Cfadiga = C_carr*C_conf*C_super*C_temp
    
    return Cfadiga
},
    fatoresK(inputs){
        const sigmaRf = inputs.sigmaR*0.145037737730209215
        const sigmaRt = inputs.sigmaR*0.145037737730209215 + 20
        //const r = inputs.r
        const r = 0.01
        const kt = inputs.kt
        const kts = inputs.kts
        
        var af
        var at
        
        if(sigmaRf > 50 && sigmaRf < 55 ){
            af = 0.130;
        }
        else if(sigmaRf > 55 && sigmaRf < 60){
            af = 0.118;
        }
        else if(sigmaRf > 60 && sigmaRf < 70){
            af = 0.108;
        }
        else if(sigmaRf > 70 && sigmaRf < 80){
            af = 0.093;
        }
        else if(sigmaRf > 80 && sigmaRf < 90){
            af = 0.080;
        }
        else if(sigmaRf > 90 && sigmaRf < 100){
            af = 0.070;
        }
        else if(sigmaRf > 100 && sigmaRf < 110){
            af = 0.062;
        }
        else if(sigmaRf > 110 && sigmaRf < 120){
            af = 0.055;
        }
        else if(sigmaRf > 120 && sigmaRf < 130){
            af = 0.049;
        }
        else if(sigmaRf > 130 && sigmaRf < 140){
            af = 0.044;
        }
        else if(sigmaRf > 140 && sigmaRf < 160){
            af = 0.039;
        }
        else if(sigmaRf > 160 && sigmaRf < 180){
            af = 0.031;
        }
        else if(sigmaRf > 180 && sigmaRf < 200){
            af = 0.024;
        }
        else if(sigmaRf > 200 && sigmaRf < 220){
            af = 0.018;
        }
        else if(sigmaRf > 220 && sigmaRf < 240){
            af = 0.013;
        }
        else if(sigmaRf > 240){
            af = 0.009;
        }

        if(sigmaRt > 50 && sigmaRt < 55 ){
            at = 0.130;
        }
        else if(sigmaRt > 55 && sigmaRt < 60){
            at = 0.118;
        }
        else if(sigmaRt > 60 && sigmaRt < 70){
            at = 0.108;
        }
        else if(sigmaRt > 70 && sigmaRt < 80){
            at = 0.093;
        }
        else if(sigmaRt > 80 && sigmaRt < 90){
            at = 0.080;
        }
        else if(sigmaRt > 90 && sigmaRt < 100){
            at = 0.070;
        }
        else if(sigmaRt > 100 && sigmaRt < 110){
            at = 0.062;
        }
        else if(sigmaRt > 110 && sigmaRt < 120){
            at = 0.055;
        }
        else if(sigmaRt > 120 && sigmaRt < 130){
            at = 0.049;
        }
        else if(sigmaRt > 130 && sigmaRt < 140){
            at = 0.044;
        }
        else if(sigmaRt > 140 && sigmaRt < 160){
            at = 0.039;
        }
        else if(sigmaRt > 160 && sigmaRt < 180){
            at = 0.031;
        }
        else if(sigmaRt > 180 && sigmaRt < 200){
            at = 0.024;
        }
        else if(sigmaRt > 200 && sigmaRt < 220){
            at = 0.018;
        }
        else if(sigmaRt > 220 && sigmaRt < 240){
            at = 0.013;
        }
        else if(sigmaRt > 240){
            at = 0.009;
        }

       const qf = 1/(1 + (af**0.5/r**0.5))
       const qt = 1/(1 + (at**0.5/r**0.5))

       const kf = kt.map((k)=>{
            const kf = 1 + qf*(k - 1)
            return kf
       })

       const kfs = kts.map((k)=>{
            const kfs = 1 + qt*(k- 1)
            return kfs
       })

       return [kf,kfs]
    }

}