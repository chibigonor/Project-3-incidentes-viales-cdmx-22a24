CREATE TABLE Alcaldias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50)
);

CREATE TABLE TipoIncidente (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(100)
);

CREATE TABLE CodigoCierre (
    codigo VARCHAR(10) PRIMARY KEY,
    descripcion VARCHAR(100)
);

CREATE TABLE ClasificacionAlarma (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(100)
);

CREATE TABLE TipoEntrada (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(100)
);

CREATE TABLE Colonias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    alcaldia_id INTEGER,
    FOREIGN KEY (alcaldia_id) REFERENCES Alcaldias(id)
);

CREATE TABLE Incidentes (
    folio VARCHAR(50) PRIMARY KEY,
    fecha_creacion DATE,
    hora_creacion TIME,
    dia_semana VARCHAR(20),
    fecha_cierre DATE,
    hora_cierre TIME,
    tipo_incidente_c4 INTEGER,
    incidente_c4 VARCHAR(255),
    alcaldia_inicio INTEGER,
    codigo_cierre VARCHAR(10),
    clas_con_f_alarma INTEGER,
    tipo_entrada INTEGER,
    alcaldia_cierre INTEGER,
    alcaldia_catalogo INTEGER,
    colonia_catalogo INTEGER,
    longitud DECIMAL(10, 6),
    latitud DECIMAL(10, 6),
    FOREIGN KEY (tipo_incidente_c4) REFERENCES TipoIncidente(id),
    FOREIGN KEY (alcaldia_inicio) REFERENCES Alcaldias(id),
    FOREIGN KEY (codigo_cierre) REFERENCES CodigoCierre(codigo),
    FOREIGN KEY (clas_con_f_alarma) REFERENCES ClasificacionAlarma(id),
    FOREIGN KEY (tipo_entrada) REFERENCES TipoEntrada(id),
    FOREIGN KEY (alcaldia_cierre) REFERENCES Alcaldias(id),
    FOREIGN KEY (alcaldia_catalogo) REFERENCES Alcaldias(id),
    FOREIGN KEY (colonia_catalogo) REFERENCES Colonias(id)
);
