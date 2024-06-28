const fastify = require('fastify');
const path = require('path');

const server = fastify();

const address = '127.0.0.1';

server.register(require('@fastify/static'), { // Referência estática
    root: path.join(__dirname, '../public'),
    //prefix: '/', 
});

server.register(require('@fastify/view'), { // Referência dinâmica
  engine: {
    ejs: require('ejs') 
  },
  root: path.join(__dirname, 'views')
});

/*server.get('/', (request, reply) => {
    reply.sendFile('index.html'); 
}); */

server.get('/criador', (req, res) => {
  res.view('index', { username: 'Daniel' });
});

server.listen({port: 3333}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Servidor escutando em ${address}`);
});