<div align="center">
<h1>VALEX</h1>
<p>
<img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f355.svg" alt="Pizza emoji" width=200px/>
</p>
<br>
<p > <b>The Valex project is an API to create benefits cards for employees<b> </p>
    
     ![NODE.JS](https://camo.githubusercontent.com/2e5a624f533563052290ad30aed4ecc1092945a458c80cd753d108807e0293b5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f6465206a732532302d2532333230323332612e7376673f267374796c653d666f722d7468652d626164676526636f6c6f723d333339393333266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d666666666666)    ![EXPRESS](https://camo.githubusercontent.com/56960eb8a4e655c887ee533f3d6b29ad57255c69a3e07b0455f29af3ad4947fd/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f457870726573732532302d2532333230323332612e7376673f267374796c653d666f722d7468652d626164676526636f6c6f723d303030303030266c6f676f3d45787072657373266c6f676f436f6c6f723d666666666666)

## Usage

```bash
$ git clone https://github.com/Offjhonjhon/projeto-valex-18-API.git

$ cd projeto-valex-18-API

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
