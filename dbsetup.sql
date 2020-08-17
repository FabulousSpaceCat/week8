CREATE DATABASE rps9;
use rps9;

create table users(
   user_id int auto_increment primary key,
   user_name varchar(20) not null unique,
   win int not null default 0,
   lose int not null default 0
);