create table _user (
	id bigserial unique,
        name varchar(255),
	email varchar(255),
	password varchar(255),
        profile varchar(255),
	primary key(id)
);