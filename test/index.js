//sample test
//Para rodar os testes, use: npm test
//PS: Os testes não estão completos e alguns podem comnter erros.

// veja mais infos em:
//https://mochajs.org/
//https://www.chaijs.com/
//https://www.chaijs.com/plugins/chai-json-schema/
//https://developer.mozilla.org/pt-PT/docs/Web/HTTP/Status (http codes)

const app = require("../src/index.js");

const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiJson = require("chai-json-schema");

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;

//Define o minimo de campos que o usuário deve ter. Geralmente deve ser colocado em um arquivo separado
const userSchema = {
  title: "Schema do Usuario, define como é o usuario, linha 24 do teste",
  type: "object",
  required: ["nome", "email", "idade"],
  properties: {
    nome: {
      type: "string",
    },
    email: {
      type: "string",
    },
    idade: {
      type: "number",
      minimum: 18,
    },
  },
};

//Inicio dos testes

//este teste é simplesmente pra enteder a usar o mocha/chai
describe("Um simples conjunto de testes", function () {
  it("deveria retornar -1 quando o valor não esta presente", function () {
    assert.equal([1, 2, 3].indexOf(4), -1);
  });
});

//testes da aplicação
describe("Testes da aplicaçao", () => {
  it("o servidor esta online", function (done) {
    chai
      .request(app)
      .get("/")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("deveria ser uma lista vazia de usuarios", function (done) {
    chai
      .request(app)
      .get("/users")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.rows).to.eql([]);
        done();
      });
  });

  it("deveria criar o usuario raupp", function (done) {
    chai
      .request(app)
      .post("/users")
      .send({ nome: "raupp", email: "jose.raupp@devoz.com.br", idade: 35 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });
  //...adicionar pelo menos mais 5 usuarios. se adicionar usuario menor de idade, deve dar erro. Ps: não criar o usuario naoExiste
  
  it("deveria criar usuario 2", function (done) {
    chai
      .request(app)
      .post("/users")
      .send({ nome: "winicius", email: "wini124345464@bol.com", idade: 27 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it("deveria criar usuario 3", function (done) {
    chai
      .request(app)
      .post("/users")
      .send({ nome: "gabriel", email: "gabrielO@hotmail.com", idade: 25 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it("deveria criar usuario 4", function (done) {
    chai
      .request(app)
      .post("/users")
      .send({ nome: "gabrielgomes", email: "notmegabriel@riot.com", idade: 30 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it("deveria criar usuario 5", function (done) {
    chai
      .request(app)
      .post("/users")
      .send({ nome: "arthur", email: "arbochelli@ubuntu.com", idade: 24 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it("deveria criar usuario 6", function (done) {
    chai
      .request(app)
      .post("/users")
      .send({ nome: "eduardo", email: "edu7@gmail.com", idade: 46 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it("usuario menor de idade", function (done) {
    chai
      .request(app)
      .post("/users")
      .send({ nome: "joao", email: "joaozinho@gmail.com", idade: 12 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });

  it("usuario com email inválido", function (done) {
    chai
      .request(app)
      .post("/users")
      .send({ nome: "heitor", email: "etobryahoo.com", idade: 28 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });

  it("usuario com nome inválido", function (done) {
    chai
      .request(app)
      .post("/users")
      .send({ nome: 45, email: "eu45@yahoo.com", idade: 45 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });

  it("o usuario naoExiste não existe no sistema", function (done) {
    chai
      .request(app)
      .get("/users/naoExiste")
      .end(function (err, res) {
        expect(err.response.body.error).to.be.equal("User not found"); //possivelmente forma errada de verificar a mensagem de erro
        expect(res).to.have.status(404);
        expect(res.body).to.be.jsonSchema(userSchema);
        done();
      });
  });

  it("o usuario raupp existe e é valido", function (done) {
    chai
      .request(app)
      .get("/users/raupp")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        done();
      });
  });

  it("deveria excluir o usuario raupp", function (done) {
    chai
      .request(app)
      .delete("/users/raupp")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        done();
      });
  });

  it("o usuario raupp não deve existir mais no sistema", function (done) {
    chai
      .request(app)
      .get("/users/raupp")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        done();
      });
  });

  it("deveria ser uma lista com pelomenos 5 usuarios", function (done) {
    chai
      .request(app)
      .get("/users")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.total).to.be.at.least(5);
        done();
      });
  });
});
