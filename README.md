<p align="center">
  <a href="https://github.com/$username-github/$nome-repositorio">
    <img src="./readme.png" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    $nome-repositorio
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/$username-github/$nome-repositorio

$ cd $nome-repositorio

$ npm install

$ npm run dev
```

API:

```
- POST /card/create (autenticada)
    - Rota para cadastrar um novo cartão para o empregado
    - headers: {x-api-key}
    - body: {
        "employeeId" : 0,
        "cardType" : "restaurant"
    }
- PUT /card/activate
    - Rota para fazer a ativação do cartão, ou seja adicionar uma senha de uso.
    - headers: {}
    - body: {
    "id": 1,
    "securityCode": "413",
    "password": "4123
    }
- GET /card/visualize 
    - Rota para listar os cartões que pertencem ao usuario e que possuem a senha enviada.
    - headers: {}
    - body: {
        "employeeId": 2,
        "cardPassword": "3042"
    }
- POST /card/recharge (autenticada)
    - Rota para realizar a recarga do cartão
    - headers: {x-api-key}
    - body: {
        "cardId": 1, 
        "rechargeAmount": 300
    }
- GET /card/balance
    - Rota para receber o balanço de recargas e compras do cartão
    - headers: {}
    - body: {
        "cardId": 1
    }
- POST /card/payment 
    - Rota para realizar uma compra no cartão
    - headers: {}
    - body: {
        "cardId": 1,
        "cardPassword": "1234",
        "businessesId": 1,
        "amount": 1000
    }
- POST /card/block 
    - Rota para realizar o bloqueio do cartão
    - headers: {}
    - body: {
        "cardId": 1,
        "cardPassword": "1234",
    }
- POST /card/unlock 
    - Rota para realizar o desbloqueio do cartão
    - headers: {}
    - body: {
        "cardId": 1,
        "cardPassword": "1234",
    }
```