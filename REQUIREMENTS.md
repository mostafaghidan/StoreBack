API Endpoints

USERES ROUTE

    Index /users [GET]
    Create /users/register [POST]
    Auth /users/login [POST]
    Read /users/get/:id [GET]     [token required]
    Update /users/update/:id [PUT] [token required]
    Delete /useres/delete/:id [DELETE] [token required]

PRODUCTS

    Index /products [GET] [token required]
    Create /products/create [POST]
    Read /products/:id [GET] [token required]
    Update /products/:id [PUT] [token required]
    Delete /products/:id [DELETE] [token required]

Orders

    Index /orders [GET] [token required]
    Create /orders/:user_id [POST] [token required]
    Read /orders/:id [GET] [token required]
    Update /orders/:id [PUT] [token required]
    Delete /orders/:id [DELETE] [token required]
    add products /orders/:id/fill [POST] [token required]
    get order products /orders/:id/products [GET] [token required]

SCHEMA  

USERS

    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL

PRODUCTS

    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    price INTEGER NOT NULL 

ORDERS

    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    status BOOLEAN

order_products

    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL
