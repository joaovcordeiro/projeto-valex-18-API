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


 
- POST /card/create (authenticated)
  ```
    - Route to register a new card for the employee
    - headers: {x-api-key}
    - body: {
        "employeeId" : 0,
        "cardType" : "restaurant"
    }
  ```
- PUT /card/activate
  ```
    - Route to activate the card, that is, add a password to use.
    - headers: {}
    - body: {
    "id": 1,
    "securityCode": "413",
    "password": "4123
    }
  ```
- GET /card/visualize 
  ```
    - Route to list the cards that belong to the user and that have the password sent.
    - headers: {}
    - body: {
        "employeeId": 2,
        "cardPassword": "3042"
    }
  ```
- POST /card/recharge (authenticated)
  ```
    - Route to recharge the card
    - headers: {x-api-key}
    - body: {
        "cardId": 1, 
        "rechargeAmount": 300
    }
  ```
- GET /card/balance
  ```
    - Route to receive the balance of card recharges and purchases
    - headers: {}
    - body: {
        "cardId": 1
    }
  ```
- POST /card/payment 
  ```
    - Route to make a purchase on the card
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
    - Route to perform card blocking
    - headers: {}
    - body: {
        "cardId": 1,
        "cardPassword": "1234",
    }
  ```
- POST /card/unlock 
  ```
    - Route to unlock the card
    - headers: {}
    - body: {
        "cardId": 1,
        "cardPassword": "1234",
    }
  ```
```
