create database recetas;

use recetas;

create table Usuario (
    id bigint not null AUTO_INCREMENT,
    Usuario varchar(20) not null,
    Pass varchar(65) not null, 
    Status bit not null,
    Token varchar(65),
    CONSTRAINT PKUsuario primary key (id));

create table Perfil (
    id bigint not null AUTO_INCREMENT,
    Nombre varchar(70) not null,
    Usuario varchar(20) not null,
    Correo varchar(60) not null, 
    Bio varchar(150),
    Status bit not null,
    Pinned bigint,
    Imagen varchar(40),
    CONSTRAINT PKPerfil primary key (id));

create table Receta (
    id bigint not null AUTO_INCREMENT,
    Texto text(5000) not null, 
    Likes int,
    Usuario bigint not null,
    Costo int not null,
    Tipo_de_cocina varchar(30) not null,
    Lugar varchar(30) not null,
    Tiempo varchar(10) not null,
    Dificultad varchar(10) not null,
    Porciones tinyint not null, 
    constraint PKReceta primary key (id),
    constraint FKReceta_Usuario foreign key (Usuario)
    references Usuario (id));

create table Publicacion (
    id bigint not null AUTO_INCREMENT,
    Texto Text(5000) not null,
    Usuario bigint not null,
    Portada varchar(40) not null,
    Likes int, 
    constraint PKPublicacion primary key (id),
    constraint FKPublicacion_Usuario foreign key (Usuario)
    references Usuario (id));

    create table Comentario_Receta(
        id bigint not null AUTO_INCREMENT,
        Receta bigint not null, 
        Usuario bigint not null, 
        Texto varchar(255) not null,
        constraint PKComentario_Receta primary key (id),
        constraint FKComRe_Receta foreign key (Receta)
        references Receta (id),
        constraint FKComRe_Usuario foreign key (Usuario)
        references Usuario (id));

create table Ingrediente (
    id bigint not null AUTO_INCREMENT,
    Receta bigint not null,
    Ingrediente varchar(20) not null,
    Cantidad int not null,
    constraint PKIngrediente primary key (id),
    constraint FKIngrediente_Receta foreign key (Receta)
    references Receta (id));

create table Comentario_Publicacion (
    id bigint not null AUTO_INCREMENT,
    Publicacion bigint not null,
    Usuario bigint not null, 
    Texto varchar(255) not null, 
    constraint PKComentario_Publicacion primary key (id),
    constraint FKComPub_Publicacion foreign key (Publicacion)
    references Publicacion (id),
    constraint FKComPub_Usuario foreign key (Usuario)
    references Usuario (id));

create table Re_Receta_Comentario(
    id bigint not null AUTO_INCREMENT,
    Comentario bigint not null,
    Texto varchar(255) not null,
    constraint PKRe_Receta_Comentario primary key (id),
    constraint FKReCom_ComentarioReceta foreign key (Comentario)
    references Comentario_Receta (id));

create table Re_Publicacion_Comentario (
    id bigint not null AUTO_INCREMENT,
    Comentario bigint not null,
    Texto varchar(255) not null,
    constraint PKRe_Publicacion_Comentario primary key (id),
    constraint FKReCom_ComentarioPublicacion foreign key (Comentario)
    references Comentario_Publicacion (id));

create table Receta_Imagen (
    id bigint not null AUTO_INCREMENT,
    Imagen varchar(40) not null,
    Receta bigint not null,
    constraint PKReceta_Imagen primary key (id),
    constraint FKRecImg_RecetaImagen foreign key (Receta)
    references Receta (id));

create table Publicacion_Imagen (
    id bigint not null AUTO_INCREMENT,
    Imagen varchar(40) not null,
    Publicacion bigint not null,
    constraint PKPublicacion_Imagen primary key (id),
    constraint FKRecImg_PublicacionImagen foreign key (Publicacion)
    references Publicacion (id));  

    insert into Usuario (Usuario, Pass, Status) values ('chrisramfon', '123', 1);