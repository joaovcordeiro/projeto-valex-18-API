<div align="center">
<h1>VALEX</h1>
<p>
<img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f355.svg" alt="Pizza emoji" width=200px/>
</p>
<br>
<p > <b>The Valex project is an API to create benefits cards for employees<b> </p>
 </div>

##  INSTALLATION

```bash
$ git clone https://github.com/Offjhonjhon/projeto-valex-18-API.git

$ cd projeto-valex-18-API

$ npm install

$ npm run dev
```
 ## USAGE


 
- POST /card/create (autenticada)
  ```
    - Rota para cadastrar um novo cartão para o empregado
    - headers: {x-api-key}
    - body: {
        "employeeId" : 0,
        "cardType" : "restaurant"
    }
  ```
- PUT /card/activate
  ```
    - Rota para fazer a ativação do cartão, ou seja adicionar uma senha de uso.
    - headers: {}
    - body: {
    "id": 1,
    "securityCode": "413",
    "password": "4123
    }
  ```
- GET /card/visualize 
  ```
    - Rota para listar os cartões que pertencem ao usuario e que possuem a senha enviada.
    - headers: {}
    - body: {
        "employeeId": 2,
        "cardPassword": "3042"
    }
  ```
- POST /card/recharge (autenticada)
  ```
    - Rota para realizar a recarga do cartão
    - headers: {x-api-key}
    - body: {
        "cardId": 1, 
        "rechargeAmount": 300
    }
  ```
- GET /card/balance
  ```
    - Rota para receber o balanço de recargas e compras do cartão
    - headers: {}
    - body: {
        "cardId": 1
    }
  ```
- POST /card/payment 
  ```
    - Rota para realizar uma compra no cartão
    - headers: {}
    - body: {
        "cardId": 1,
        "cardPassword": "1234",
        "businessesId": 1,
        "amount": 1000
    }
  ```
- POST /card/block 
  ```
    - Rota para realizar o bloqueio do cartão
    - headers: {}
    - body: {
        "cardId": 1,
        "cardPassword": "1234",
    }
  ```
- POST /card/unlock 
  ```
    - Rota para realizar o desbloqueio do cartão
    - headers: {}
    - body: {
        "cardId": 1,
        "cardPassword": "1234",
    }
  ```
```
