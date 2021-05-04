*REST API*

Link:
Login
Register
CreateProduct
Get Products
Get Product

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