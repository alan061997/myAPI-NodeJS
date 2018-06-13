use node-rest-shop;

create table Products (
    product_id int not null,
    product_name varchar(50) not null,
    product_price decimal(13,2) not null,
    constraint pk_products primary key (product_id)
);

create table orders (
    order_id int not null,
    product_id int not null,
    product_quantity int not null,
    constraint pk_orders primary key (order_id),
    constraint fk_orders foreign key (product_id) references Products(product_id)
);