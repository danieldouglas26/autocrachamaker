const fastify = require('fastify');
const path = require('path');

const server = fastify();

server.register(require('@fastify/static'), {
    root: path.join(__dirname, 'src/views/'),
    prefix: '/', 
});

server.get('/', (request, reply) => {
    reply.sendFile('index.html'); 
});

server.listen({port: 3333}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Servidor escutando em ${address}`);
});