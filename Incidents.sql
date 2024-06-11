CREATE TABLE Alcaldias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50)
);

CREATE TABLE TipoIncidente (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(100)
);

CREATE TABLE CodigoCierre (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(10),
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
    nombre VARCHAR(100)
);

CREATE TABLE Incidentes (
    folio VARCHAR(50) PRIMARY KEY,
    fecha_creacion DATE,
    hora_creacion TIME,
    dia_semana VARCHAR(20),
    fecha_cierre DATE,
    hora_cierre TIME,
    tipo_incidente_id INTEGER,
    codigo_cierre_id INTEGER,
    clasificacion_alarma_id INTEGER,
    tipo_entrada_id INTEGER,
    alcaldia_catalogo_id INTEGER,
    colonia_catalogo_id INTEGER,
    longitud DECIMAL(10, 6),
    latitud DECIMAL(10, 6),
    FOREIGN KEY (tipo_incidente_id) REFERENCES TipoIncidente(id),
    FOREIGN KEY (codigo_cierre_id) REFERENCES CodigoCierre(id),
    FOREIGN KEY (clasificacion_alarma_id) REFERENCES ClasificacionAlarma(id),
    FOREIGN KEY (tipo_entrada_id) REFERENCES TipoEntrada(id),
    FOREIGN KEY (alcaldia_catalogo_id) REFERENCES Alcaldias(id),
    FOREIGN KEY (colonia_catalogo_id) REFERENCES Colonias(id)
);