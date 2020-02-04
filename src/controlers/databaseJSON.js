const path = window.require('path')
const fs = window.require('fs') 
const localPath = path.resolve()
const dir = `${localPath}/db`;

export default {
    save(name,content) {
        //Verifica se não existe
        if (!fs.existsSync(dir)){
        //Efetua a criação do diretório
            fs.mkdirSync(dir);
        }
        fs.writeFile(`${dir}/${name}`, JSON.stringify(content), function (err) {
        if (err) throw err;
        console.log(`Arquivo salvo em ${dir}/${name}`);
        })
        },
    find() {
        //Verifica se não existe
        if (!fs.existsSync(dir)){
            //Efetua a criação do diretório
                fs.mkdirSync(dir);
            }
        const files = fs.readdirSync(dir);
        const filesSplit = files.map((file)=>{
            const list = file.split('.')
            return list[0]
        })
        return filesSplit
    },
    request(fileName){
        const data = fs.readFileSync(`${dir}/${fileName}`)
        const inputs = JSON.parse(data)
        return inputs
    }
}