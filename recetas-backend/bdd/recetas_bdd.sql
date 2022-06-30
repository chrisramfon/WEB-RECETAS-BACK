-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-06-2022 a las 18:07:38
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `recetas bdd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario_publicacion`
--

CREATE TABLE `comentario_publicacion` (
  `id` bigint(50) NOT NULL,
  `publicacion` bigint(50) NOT NULL,
  `usuario` bigint(50) NOT NULL,
  `texto` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario_receta`
--

CREATE TABLE `comentario_receta` (
  `id` bigint(50) NOT NULL,
  `receta` bigint(50) NOT NULL,
  `usuario` bigint(50) NOT NULL,
  `texto` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingrediente`
--

CREATE TABLE `ingrediente` (
  `id` bigint(50) NOT NULL,
  `receta` bigint(50) NOT NULL,
  `ingrediente` varchar(50) NOT NULL,
  `cantidad` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `id` bigint(50) NOT NULL,
  `nombre` varchar(70) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `correo` varchar(60) NOT NULL,
  `bio` varchar(150) NOT NULL,
  `status` bit(50) NOT NULL,
  `seguidores` int(50) NOT NULL,
  `seguidos` int(50) NOT NULL,
  `pinned` int(50) NOT NULL,
  `favoritos` int(50) NOT NULL,
  `imagen` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacion`
--

CREATE TABLE `publicacion` (
  `id` bigint(50) NOT NULL,
  `texto` varchar(50) NOT NULL,
  `usuario` bigint(50) NOT NULL,
  `portada` varchar(50) NOT NULL,
  `megusta` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacion_imagen`
--

CREATE TABLE `publicacion_imagen` (
  `id` bigint(50) NOT NULL,
  `imagen` varchar(50) NOT NULL,
  `receta` bigint(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `receta`
--

CREATE TABLE `receta` (
  `id` bigint(50) NOT NULL,
  `texto` varchar(50) NOT NULL,
  `megusta` int(50) NOT NULL,
  `usuario` bigint(50) NOT NULL,
  `costo` int(50) NOT NULL,
  `tipococina` varchar(50) NOT NULL,
  `lugar` varchar(49) NOT NULL,
  `tiempo` varchar(10) NOT NULL,
  `dificultad` varchar(10) NOT NULL,
  `porciones` tinyint(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `receta_imagen`
--

CREATE TABLE `receta_imagen` (
  `id` bigint(50) NOT NULL,
  `imagen` longblob NOT NULL,
  `receta` bigint(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `re_publicacion_comentario`
--

CREATE TABLE `re_publicacion_comentario` (
  `id` bigint(50) NOT NULL,
  `comentario` bigint(50) NOT NULL,
  `texto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `re_receta_comentario`
--

CREATE TABLE `re_receta_comentario` (
  `id` bigint(50) NOT NULL,
  `comentario` bigint(50) NOT NULL,
  `texto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` bigint(50) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `pass` varchar(65) NOT NULL,
  `status` bit(50) NOT NULL,
  `token` varchar(65) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `usuario`, `pass`, `status`, `token`) VALUES
(0, '', '', b'00000000000000000000000000000000000000000000000000', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentario_publicacion`
--
ALTER TABLE `comentario_publicacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `publicacion` (`publicacion`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `comentario_receta`
--
ALTER TABLE `comentario_receta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `receta` (`receta`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `ingrediente`
--
ALTER TABLE `ingrediente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `receta` (`receta`);

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `publicacion_imagen`
--
ALTER TABLE `publicacion_imagen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `imagen` (`imagen`);

--
-- Indices de la tabla `receta`
--
ALTER TABLE `receta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `receta_imagen`
--
ALTER TABLE `receta_imagen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `receta` (`receta`),
  ADD KEY `imagen` (`imagen`(3072));

--
-- Indices de la tabla `re_publicacion_comentario`
--
ALTER TABLE `re_publicacion_comentario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comentario` (`comentario`);

--
-- Indices de la tabla `re_receta_comentario`
--
ALTER TABLE `re_receta_comentario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comentario` (`comentario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentario_publicacion`
--
ALTER TABLE `comentario_publicacion`
  ADD CONSTRAINT `comentario_publicacion_ibfk_1` FOREIGN KEY (`publicacion`) REFERENCES `publicacion` (`id`),
  ADD CONSTRAINT `comentario_publicacion_ibfk_2` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `comentario_receta`
--
ALTER TABLE `comentario_receta`
  ADD CONSTRAINT `comentario_receta_ibfk_1` FOREIGN KEY (`id`) REFERENCES `perfil` (`id`),
  ADD CONSTRAINT `comentario_receta_ibfk_2` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
