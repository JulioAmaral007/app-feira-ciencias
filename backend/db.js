const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

let db;
let clientes;

async function conectaDB() {
  try {
    const client = new MongoClient('mongodb://localhost:27017/');
    await client.connect();
    db = client.db("Trab2");
    clientes = db.collection("clientes");
    console.log('Conectou no banco de dados');
  } catch (error) {
    console.error('Erro ao conectar no banco de dados:', error.message);
    process.exit(1);
  }
}

async function registraUsuario(user, password, pushsubscription) {
    try {
      if(await clientes.findOne({ user })) {
        throw new Error('Usuário já registrado');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await clientes.insertOne({ user, password: hashedPassword, pushsubscription: pushsubscription});
      return result.insertedId;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error.message);
      throw error;
    }
  }


module.exports = {
  conectaDB,
  registraUsuario,
};
