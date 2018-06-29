create table products (
    product_id int not null,
    product_name varchar(50) not null,
    product_price decimal(13,2) not null,
    constraint pk_products primary key (product_id),
    constraint uk_products unique(product_name)
);

create table orders (
    order_id int not null,
    product_id int not null,
    product_quantity int not null,
    constraint pk_orders primary key (order_id),
    constraint fk_orders foreign key (product_id) references products(product_id) on delete cascade
);

create table users (
    user_id int not null,
    user_email varchar(100) not null,
    user_password varchar(60) not null,
    constraint pk_users primary key (user_id),
    constraint uk_users unique(user_email)
);