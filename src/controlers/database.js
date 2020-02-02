const sqlite3 = window.require('sqlite3').verbose();

export default {


teste(nameDB) {
    let db = new sqlite3.Database('./src/db/teste.db', (err) => {
    if (err) {
        console.error(err.message);
    } else{
    console.log(`Conectado com o banco de dados: ${nameDB}.`);
    }
    });

    db.serialize(function () {
        db.run("CREATE TABLE Products (name, barcode, quantity)");
      
        db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product001', 'xxxxx', 20]);
        db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product002', 'xxxxx', 40]);
        db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product003', 'xxxxx', 60]);
      
        db.each("SELECT * FROM Products", function (err, row) {
          console.log(row);
        });
      });

    db.close((err) => {
        if (err) {
        console.error(err.message);
        }else{
        console.log('Conexão fechada');
        }
    });
}

}