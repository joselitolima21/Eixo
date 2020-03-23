const initialState = {
    // Entrada
    torque: '',
    l: '',
    r2: '',
    sigmaR: '',
    sigmaE: '',
    components: {
        pulleys: [{ d: 0, position: 0 }],
        gears: [{ d: 0, position: 0, pressionAngle: 0 }]
    },
    typeOfMaterial: 'Aço',
    units: 'si',
    tempOfWork: '',
    surfaceFinish: 'Retificado',
    conf: '50%',
    typeOfCarreg: 'flexao',
    points: [0], // Pontos que ele quer saber o diametro ao longo do eixo
    kt: [0], // Seus kt correspondentes
    kts: [0], // Seus kt correspondentes
    // Numeros de engrenages e polias, N precisa por no relatório
    NP: 1,
    NG: 1,
    Npoints: 1,
};

export default function dataReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_TORQUE':
            return { ...state, torque: action.torque };
        case 'CHANGE_L':
            return { ...state, l: action.l };
        case 'CHANGE_R2':
            return { ...state, r2: action.r2 };
        case 'CHANGE_MATERIAL':
            return { ...state, typeOfMaterial: action.typeOfMaterial };
        case 'CHANGE_SE':
            return { ...state, sigmaE: action.sigmaE };
        case 'CHANGE_SR':
            return { ...state, sigmaR: action.sigmaR };
        case 'CHANGE_TEMP':
            return { ...state, tempOfWork: action.tempOfWork };
        case 'CHANGE_SURFACE':
            return { ...state, surfaceFinish: action.surfaceFinish };
        case 'CHANGE_CONF':
            return { ...state, conf: action.conf };
        case 'PLUS_P':
            return { ...state, components: { ...state.components, pulleys: [...state.components.pulleys, { d: 0, position: 0 }] }, NP: action.NP };
        case 'PLUS_G':
            return { ...state, components: { ...state.components, gears: [...state.components.gears, { d: 0, position: 0, pressionAngle: 0 }] }, NG: action.NG };
        case 'MINUS_P':
            return { ...state, components: { ...state.components, pulleys: state.components.pulleys.filter((p, i) => (i <= (action.NP - 1))) }, NP: action.NP };
        case 'MINUS_G':
            return { ...state, components: { ...state.components, gears: state.components.gears.filter((g, i) => (i <= (action.NG - 1))) }, NG: action.NG };
        case 'CHANGE_DIAMETER_G':
            return { ...state, components: { ...state.components, gears: state.components.gears.map((g, index) => { if (action.i === index) { g.d = action.dg; return g } else { return g } }) } };
        case 'CHANGE_POSITION_G':
            return { ...state, components: { ...state.components, gears: state.components.gears.map((g, index) => { if (action.i === index) { g.position = action.position; return g } else { return g } }) } };
        case 'CHANGE_PRESSION_ANGLE':
            return { ...state, components: { ...state.components, gears: state.components.gears.map((g, index) => { if (action.i === index) { g.pressionAngle = action.pressionAngle; return g } else { return g } }) } };
        case 'CHANGE_DIAMETER_P':
            return { ...state, components: { ...state.components, pulleys: state.components.pulleys.map((p, index) => { if (action.i === index) { p.d = action.dp; return p } else { return p } }) } };
        case 'CHANGE_POSITION_P':
            return { ...state, components: { ...state.components, pulleys: state.components.pulleys.map((p, index) => { if (action.i === index) { p.position = action.position; return p } else { return p } }) } };
        case 'PLUS_POINT':
            return { ...state, points: [...state.points, 0], kt: [...state.kt, 0], kts: [...state.kts, 0], Npoints: action.Npoints };
        case 'MINUS_POINT':
            return {
                ...state,
                points: state.points.filter((p, i) => (i <= (action.Npoints - 1))),
                kt: state.kt.filter((kt, i) => (i <= (action.Npoints - 1))),
                kts: state.kts.filter((kts, i) => (i <= (action.Npoints - 1))),
                Npoints: action.Npoints
            };
        case 'CHANGE_P':
            return { ...state, points: state.points.map((p, index) => { if (action.i === index) { p = action.p; return p } else { return p } }) };
        case 'CHANGE_KT':
            return { ...state, kt: state.kt.map((kt, index) => { if (action.i === index) { kt = action.kt; return kt } else { return kt } }) };
        case 'CHANGE_KTS':
            return { ...state, kts: state.kts.map((kts, index) => { if (action.i === index) { kts = action.kts; return kts } else { return kts } }) };
        case 'BACK':
            return { ...initialState };
        default:
            return state
    }
}

export const actions = {
    setTorque: (torque) => (
        { type: 'CHANGE_TORQUE', torque: torque }
    ),
    setL: (l) => (
        { type: 'CHANGE_L', l: l }
    ),
    setR2: (r2) => (
        { type: 'CHANGE_R2', r2: r2 }
    ),
    setTypeOfMaterial: (typeOfMaterial) => (
        { type: 'CHANGE_MATERIAL', typeOfMaterial: typeOfMaterial }
    ),
    setSigmaE: (sigmaE) => (
        { type: 'CHANGE_SE', sigmaE: sigmaE }
    ),
    setSigmaR: (sigmaR) => (
        { type: 'CHANGE_SR', sigmaR: sigmaR }
    ),
    setTempOfWork: (tempOfWork) => (
        { type: 'CHANGE_TEMP', tempOfWork: tempOfWork }
    ),
    setSurfaceFinish: (surfaceFinish) => (
        { type: 'CHANGE_SURFACE', surfaceFinish: surfaceFinish }
    ),
    setConf: (conf) => (
        { type: 'CHANGE_CONF', conf: conf }
    ),
    plusP: (NP) => (
        { type: 'PLUS_P', NP: NP }
    ),
    plusG: (NG) => (
        { type: 'PLUS_G', NG: NG }
    ),
    minusP: (NP) => (
        { type: 'MINUS_P', NP: NP }
    ),
    minusG: (NG) => (
        { type: 'MINUS_G', NG: NG }
    ),
    setDiameterG: (dg, i) => (
        { type: 'CHANGE_DIAMETER_G', dg: dg, i: i }
    ),
    setPositionG: (position, i) => (
        { type: 'CHANGE_POSITION_G', position: position, i: i }
    ),
    setPressionAngleG: (pressionAngle, i) => (
        { type: 'CHANGE_PRESSION_ANGLE', pressionAngle: pressionAngle, i: i }
    ),
    setDiameterP: (dp, i) => (
        { type: 'CHANGE_DIAMETER_P', dp: dp, i: i }
    ),
    setPositionP: (position, i) => (
        { type: 'CHANGE_POSITION_P', position: position, i: i }
    ),
    plusPoint: (Npoints) => (
        { type: 'PLUS_POINT', Npoints: Npoints }
    ),
    minusPoint: (Npoints) => (
        { type: 'MINUS_POINT', Npoints: Npoints }
    ),
    setP: (p, i) => (
        { type: 'CHANGE_P', p: p, i: i }
    ),
    setKt: (kt, i) => (
        { type: 'CHANGE_KT', kt: kt, i: i }
    ),
    setKts: (kts, i) => (
        { type: 'CHANGE_KTS', kts: kts, i: i }
    ),
    back: () => (
        { type: 'BACK' }
    ),
}