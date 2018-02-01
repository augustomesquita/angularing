create table _user (
	id bigserial unique,
        name varchar(255),
	age integer,
	login varchar(255),
	password varchar(255),

	primary key(id)
);