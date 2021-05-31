API DOC

**User Register**
----
  Returns json data about a new user.

* **URL**

  /auth/register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `None`

* **Data Params**

    `email=['String']`

    `Password=['String']`

    `Name=['String']`

    `Nik=['Integer']`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `

    

    
    {

        "status_code": 201,

        "message": "Success Create New product",

        "name": "Modul praktikum Jaringan Komputer",

        "author": "IF LAB",

        "category": "Cyber Security",

        "image_link": "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",

        "price": "50000",

        "quantity": "10",

        "description": "Not for sale"
    }
`
 
* **Error Response:**

  * **Code:** 500 NOT FOUND <br />
    **Content:** `{ error : "ValidationError" }`


**Create Product**
----
  Returns json data about a new product.

* **URL**

  /product/create

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `None`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ 
    "status_code": 201,
    "message": "Success Create New product",
    "name": "Modul praktikum Jaringan Komputer",
    "author": "IF LAB",
    "category": "Cyber Security",
    "image_link": "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "price": "50000",
    "quantity": "10",
    "description": "Not for sale"
}`
 
* **Error Response:**

  * **Code:** 500 NOT FOUND <br />
    **Content:** `{ error : "ValidationError" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`;


**Read Product**
----
  Returns json data about all product.

* **URL**

  /product/all

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `None`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    "statuc_code": 200,
    "message": "Success get data produucts",
    "products": [
        {
            "_id": "6076b0c1301b193234e19870",
            "name": "Jaringan Komputer Dengan TCP/IP",
            "author": "Winarno Sugeng dan Theta Dinnarwaty Putri",
            "category": "Cyber Security",
            "image_link": "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "price": 59000,
            "quantity": 10,
            "description": "Buku baru",
            "createdAt": "2021-04-14T09:07:13.628Z",
            "updatedAt": "2021-04-14T09:07:13.628Z",
            "__v": 0
        },
        {
            "_id": "6076cf3aa196bf31a0149729",
            "name": "Modul praktikum Jaringan Komputer",
            "author": "IF LAB",
            "category": "Cyber Security",
            "image_link": "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "price": 50000,
            "quantity": 10,
            "description": "Hello",
            "createdAt": "2021-04-14T11:17:14.388Z",
            "updatedAt": "2021-04-14T11:17:14.388Z",
            "__v": 0
        },
    ]
}`
 
* **Error Response:**

  * **Code:** 500 NOT FOUND <br />
    **Content:** `{ error : "ValidationError" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`;

**Read Detail Product**
----
  Returns json data about a product.

* **URL**

  /product/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   'id=[integer]'

* **Data Params**

    None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    "status_code": 200,
    "message": "Success get detail product",
    "data": {
        "_id": "6076b0c1301b193234e19870",
        "name": "Jaringan Komputer Dengan TCP/IP",
        "author": "Winarno Sugeng dan Theta Dinnarwaty Putri",
        "category": "Cyber Security",
        "image_link": "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        "price": 59000,
        "quantity": 10,
        "description": "Buku baru",
        "createdAt": "2021-04-14T09:07:13.628Z",
        "updatedAt": "2021-04-14T09:07:13.628Z",
        "__v": 0
    }
}`
 
* **Error Response:**

  * **Code:** 500 NOT FOUND <br />
    **Content:** `{ error : "Failed Get Data Product" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`;




**Delete Product**
----
  Returns json data about product deleted.
  Headers : 
  token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiSWNobGFzdWwgQW1'

* **URL**

  /product/ID

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   'id'

* **Data Params**

    Id : Integer

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    "message": "Success Delete",
    "data": {
        "_id": "6076cf3aa196bf31a0149729",
        "name": "Modul praktikum Jaringan Komputer",
        "author": "IF LAB",
        "category": "Cyber Security",
        "image_link": "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        "price": 50000,
        "quantity": 10,
        "description": "Hello",
        "createdAt": "2021-04-14T11:17:14.388Z",
        "updatedAt": "2021-04-14T11:17:14.388Z",
        "__v": 0
    }
}`
 
* **Error Response:**

  * **Code:** 500 NOT FOUND <br />
    **Content:** `{ error : "ValidationError" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`;



**Update Product**
----
  Returns json Update succes or failed.
  Headers : 
  token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiSWNobGFzdWwgQW1'

* **URL**

  /product/ID

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   'id'

* **Data Params**

    Id : Integer

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    "message": "Success Update",
    
}`
 
* **Error Response:**

  * **Code:** 500 NOT FOUND <br />
    **Content:** `{ error : "ValidationError" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`;
