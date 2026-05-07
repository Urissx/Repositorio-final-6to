create database stromgame;
use stromgame;

create table usuario (
ID_usuario int auto_increment primary key,
Nombre varchar(100),
Contraseña varchar(100),
Email varchar(100),
Estadisticas varchar(100)
);

create table juego (
ID_juegos int auto_increment primary key,
nombre varchar(100),
genero varchar(50)
);

create table torneo (
ID_torneo int auto_increment primary key,
Fecha_Inicio date,
Nombre varchar(100),
Estado varchar(50),
Tipo varchar(50),
ID_creador int,
ID_juego int,

foreign key (ID_credor) references usuario(ID_usuario),
foreign key (ID_juego) references juego(ID_juego)

);

create table partido (
ID_partido int auto_increment primary key,
Fecha date,
ID_torneo int,

foreign key (ID_torneo) references torneo(ID_torneo)

);

create table resultado (
ID_resultado int auto_increment primary key,
puntaje int,
ID_usuario int,
ID_partido int,

foreign key (ID_usuario) references usuario(ID_usuario),
foreign key (ID_partido) references partido(ID_partido)

);

create table participar (
ID_torneo int,
ID_usurio int,
rol varchar(50),
estado varchar(50),

primary key (ID_usuario, ID_torneo),
foreign key (ID_usuario) references usuario(ID_usuario),
foreign key (ID_usuario) references torneo(ID_torneo)
);


 
 select * from Usuario; 
 
 
 CREATE USER 'python_user'@'%' identified by 'stormgame';
 GRANT ALL PRIVILEGES ON stromgame.* TO 'python_user'@'%';
 FLUSH PRIVILEGES;