-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

CREATE TABLE Incidentes (
    folio VARCHAR(50) NOT NULL,
    fecha_creacion DATE NOT NULL,
    hora_creacion TIME NOT NULL,
    dia_semana VARCHAR(20) NOT NULL,
    fecha_cierre DATE NOT NULL,
    hora_cierre TIME NOT NULL,
    incidente_c4 VARCHAR(255) NOT NULL,
    codigo_cierre VARCHAR(10) NOT NULL,
    clas_con_f_alarma VARCHAR(50) NOT NULL,
    tipo_entrada VARCHAR(50) NOT NULL,
    alcaldia_catalogo VARCHAR(50) NOT NULL,
    colonia_catalogo VARCHAR(100) NOT NULL,
    longitud DECIMAL(10,6) NOT NULL,
    latitud DECIMAL(10,6) NOT NULL,
    PRIMARY KEY (folio)
);

CREATE TABLE Alcaldias (
    id SERIAL NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE CodigoCierre (
    codigo VARCHAR(10) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    PRIMARY KEY (codigo)
);

CREATE TABLE ClasificacionAlarma (
    id SERIAL NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE TipoEntrada (
    id SERIAL NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Colonias (
    id SERIAL NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    alcaldia_id INTEGER NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE Incidentes ADD CONSTRAINT fk_Incidentes_codigo_cierre FOREIGN KEY(codigo_cierre)
REFERENCES CodigoCierre (codigo);

ALTER TABLE Incidentes ADD CONSTRAINT fk_Incidentes_clas_con_f_alarma FOREIGN KEY(clas_con_f_alarma)
REFERENCES ClasificacionAlarma (id);

ALTER TABLE Incidentes ADD CONSTRAINT fk_Incidentes_tipo_entrada FOREIGN KEY(tipo_entrada)
REFERENCES TipoEntrada (id);

ALTER TABLE Incidentes ADD CONSTRAINT fk_Incidentes_alcaldia_catalogo FOREIGN KEY(alcaldia_catalogo)
REFERENCES Alcaldias (id);

ALTER TABLE Incidentes ADD CONSTRAINT fk_Incidentes_colonia_catalogo FOREIGN KEY(colonia_catalogo)
REFERENCES Colonias (id);

ALTER TABLE Colonias ADD CONSTRAINT fk_Colonias_alcaldia_id FOREIGN KEY(alcaldia_id)
REFERENCES Alcaldias (id);
