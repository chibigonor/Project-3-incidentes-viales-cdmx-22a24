from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine, text
from config import DATABASE_URI

app = Flask(__name__)
engine = create_engine(DATABASE_URI)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/incident_types', methods=['GET'])
def get_incident_types():
    query = 'SELECT id, descripcion FROM tipoincidente'
    with engine.connect() as connection:
        result = connection.execute(text(query))
        incident_types = [dict(row) for row in result.mappings()]
    return jsonify(incident_types)

@app.route('/alcaldias', methods=['GET'])
def get_alcaldias():
    query = 'SELECT id, nombre FROM alcaldias'
    with engine.connect() as connection:
        result = connection.execute(text(query))
        alcaldias = [dict(row) for row in result.mappings()]
    return jsonify(alcaldias)

@app.route('/incidentes_plot1', methods=['GET'])
def get_incidentes_plot1():
    query = '''
        SELECT 
            tipoincidente.descripcion AS incident_type,
            alcaldias.nombre AS alcaldia,
            COUNT(*) AS incident_count
        FROM 
            incidentes
        JOIN 
            tipoincidente ON incidentes.tipo_incidente_id = tipoincidente.id
        JOIN 
            alcaldias ON incidentes.alcaldia_catalogo_id = alcaldias.id
        GROUP BY 
            tipoincidente.descripcion, alcaldias.nombre
        ORDER BY 
            alcaldia, incident_type;
    '''
    with engine.connect() as connection:
        result = connection.execute(text(query))
        incidentes_plot1 = [dict(row) for row in result.mappings()]
    return jsonify(incidentes_plot1)


@app.route('/incidentes_plot2', methods=['GET'])
def get_incidentes_plot2():
    query = '''
        SELECT 
            EXTRACT(YEAR FROM fecha_creacion) AS year,
            tipoincidente.descripcion AS incident_type,
            COUNT(*) AS incident_count
        FROM 
            incidentes
        JOIN 
            tipoincidente ON incidentes.tipo_incidente_id = tipoincidente.id
        WHERE 
            EXTRACT(YEAR FROM fecha_creacion) != 2021
        GROUP BY 
            EXTRACT(YEAR FROM fecha_creacion), tipoincidente.descripcion
        ORDER BY 
            year, incident_type;
    '''
    with engine.connect() as connection:
        result = connection.execute(text(query))
        incidentes_plot2 = [dict(row) for row in result.mappings()]
    return jsonify(incidentes_plot2)


@app.route('/incidentes_coords', methods=['GET'])
def get_incidentes_coords():
    query = '''
        SELECT 
            tipoincidente.descripcion, 
            alcaldias.nombre, 
            incidentes.longitud, 
            incidentes.latitud
        FROM 
            incidentes
        JOIN 
            tipoincidente ON incidentes.tipo_incidente_id = tipoincidente.id
        JOIN 
            alcaldias ON incidentes.alcaldia_catalogo_id = alcaldias.id
        WHERE 
            EXTRACT(YEAR FROM incidentes.fecha_creacion) = 2024
    '''
    with engine.connect() as connection:
        result = connection.execute(text(query))
        incidentes = [dict(row) for row in result.mappings()]
    return jsonify(incidentes)

@app.route('/map')
def map_view():
    return render_template('map.html')

@app.route('/plot1')
def plot1_view():
    return render_template('plot_1.html')

@app.route('/table')
def table():
    return render_template('table.html')

if __name__ == '__main__':
    app.run(debug=True)