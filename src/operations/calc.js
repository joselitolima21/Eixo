import math from 'math'
import db from '../controlers/databaseJSON'

export default {
    graph(){
        function getInfos(){
            const files = db.find()
            const fileName1 = localStorage.getItem('fileName').split('.')[0]
            const fileName2 = localStorage.getItem('fileName')
            if(files.indexOf(fileName1) !== -1){
                const inputs = db.request(fileName2)
                return inputs
            } else {
                const file = localStorage.getItem('file')
                const inputs = JSON.parse(file)
                return inputs
            }
        }
        
        const inputs = getInfos()
        
        //Obtenção dos valores das Reações
        const T = inputs.torque
        const r2 = inputs.r2
        const pulleys = inputs.components.pulleys
        const gears = inputs.components.gears
        const l = inputs.l
        
        const forcesPulleys = pulleys.map((pulley)=>{
            const rp = pulley.d/2
            const Fn = T/rp
            const Fs = 1.5*Fn
            const Ms = Fs*pulley.position
            const pos = pulley.position
            const result = {Fs,Ms,pos}
            return result
        })
        
        const forcesGears = gears.map((gear)=>{
            const rg = gear.d/2
            const Fg = -T/rg
            const angleRad = gear.pressionAngle*math.PI/180
            const Fr = -Fg*math.tan(angleRad)
            const Mr = Fr*gear.position
            const Mg = Fg*gear.position
            const pos = gear.position
            const result = {Fr,Fg,Mr,Mg,pos}
            return result 
        })
        
        const Cfx = forcesPulleys.reduce((prev,current)=>{
            return prev + current.Fs
        },0) + forcesGears.reduce((prev,current)=>{
            return prev + current.Fr
        },0)
        
        const Cmx = forcesPulleys.reduce((prev,current)=>{
            return prev + current.Ms
        },0) + forcesGears.reduce((prev,current)=>{
            return prev + current.Mr
        },0)
        
        const Cfy = forcesGears.reduce((prev,current)=>{
            return prev + current.Fg
        },0)
        
        const Cmy = forcesGears.reduce((prev,current)=>{
            return prev + current.Mg
        },0)
        
        const R1x = -Cfx +Cmx/r2
        const R2x = -Cmx/r2
        
        const R1y = -Cfy +Cmy/r2
        const R2y = -Cmy/r2
        
        
        //====================================================
        //Obtenção dos gráficos de momento
        
        function sing(x,F,pos) {
            if(x < pos){
                return 0
            }
            if(x >= pos){
                return F*(x-pos)
            }
        }
        
        const ListPulleys = forcesPulleys.map((pulley)=>{
            return {f: pulley.Fs,pos: pulley.pos}
        })
        
        const ListGearsX = forcesGears.map((gear)=>{
            return {f: gear.Fr,pos: gear.pos}
        })
        const ListGearsY = forcesGears.map((gear)=>{
            return {f: gear.Fg,pos: gear.pos}
        })
        
        const forcesX = [{f: R1x,pos: 0},{f: R2x,pos:r2}]
        const forcesY = [{f: R1y,pos: 0},{f: R2y,pos:r2}]
        
        const rex = forcesX.concat(ListPulleys).concat(ListGearsX)
        const rey = forcesY.concat(ListGearsY)
        
        const range = (start,step, end) => {
            const length = (end - start)/step + 1;
            return Array.from({ length }, (_,i) => (start + step*i).toFixed(2));
        }
        
        const labels = range(0,0.2,l)
        
        const data = labels.map((z)=>{
        
            const xz = rex.map((item)=>{
                return sing(z,item.f,item.pos)
            }).reduce((prev,current) => prev + current,0)
        
            const yz = rey.map((item)=>{
                return sing(z,item.f,item.pos)
            }).reduce((prev,current) => prev + current,0)
        
            const res = (xz**2 + yz**2)**(1/2)
            return res.toFixed(4)
        })
        return [data,labels]
    },
    pointMoment(z){
        function getInfos(){
            const files = db.find()
            const fileName1 = localStorage.getItem('fileName').split('.')[0]
            const fileName2 = localStorage.getItem('fileName')
            if(files.indexOf(fileName1) !== -1){
                const inputs = db.request(fileName2)
                return inputs
            } else {
                const file = localStorage.getItem('file')
                const inputs = JSON.parse(file)
                return inputs
            }
        }
        
        const inputs = getInfos()
        
        //Obtenção dos valores das Reações
        const T = inputs.torque
        const r2 = inputs.r2
        const pulleys = inputs.components.pulleys
        const gears = inputs.components.gears
        
        const forcesPulleys = pulleys.map((pulley)=>{
            const rp = pulley.d/2
            const Fn = T/rp
            const Fs = 1.5*Fn
            const Ms = Fs*pulley.position
            const pos = pulley.position
            const result = {Fs,Ms,pos}
            return result
        })
        
        const forcesGears = gears.map((gear)=>{
            const rg = gear.d/2
            const Fg = -T/rg
            const angleRad = gear.pressionAngle*math.PI/180
            const Fr = -Fg*math.tan(angleRad)
            const Mr = Fr*gear.position
            const Mg = Fg*gear.position
            const pos = gear.position
            const result = {Fr,Fg,Mr,Mg,pos}
            return result 
        })
        
        const Cfx = forcesPulleys.reduce((prev,current)=>{
            return prev + current.Fs
        },0) + forcesGears.reduce((prev,current)=>{
            return prev + current.Fr
        },0)
        
        const Cmx = forcesPulleys.reduce((prev,current)=>{
            return prev + current.Ms
        },0) + forcesGears.reduce((prev,current)=>{
            return prev + current.Mr
        },0)
        
        const Cfy = forcesGears.reduce((prev,current)=>{
            return prev + current.Fg
        },0)
        
        const Cmy = forcesGears.reduce((prev,current)=>{
            return prev + current.Mg
        },0)
        
        const R1x = -Cfx +Cmx/r2
        const R2x = -Cmx/r2
        
        const R1y = -Cfy +Cmy/r2
        const R2y = -Cmy/r2
        
        
        //====================================================
        //Obtenção dos gráficos de momento
        
        function sing(x,F,pos) {
            if(x < pos){
                return 0
            }
            if(x >= pos){
                return F*(x-pos)
            }
        }
        
        const ListPulleys = forcesPulleys.map((pulley)=>{
            return {f: pulley.Fs,pos: pulley.pos}
        })
        
        const ListGearsX = forcesGears.map((gear)=>{
            return {f: gear.Fr,pos: gear.pos}
        })
        const ListGearsY = forcesGears.map((gear)=>{
            return {f: gear.Fg,pos: gear.pos}
        })
        
        const forcesX = [{f: R1x,pos: 0},{f: R2x,pos:r2}]
        const forcesY = [{f: R1y,pos: 0},{f: R2y,pos:r2}]
        
        const rex = forcesX.concat(ListPulleys).concat(ListGearsX)
        const rey = forcesY.concat(ListGearsY)
        
        const xz = rex.map((item)=>{
            return sing(z,item.f,item.pos)
        }).reduce((prev,current) => prev + current,0)
    
        const yz = rey.map((item)=>{
            return sing(z,item.f,item.pos)
        }).reduce((prev,current) => prev + current,0)
    
        const res = (xz**2 + yz**2)**(1/2)
        return res.toFixed(4)
    }
}