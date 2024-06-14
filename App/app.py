from flask import Flask, jsonify, render_template, request
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

@app.route('/colonias', methods=['GET'])
def get_colonias():
  query = 'SELECT id, nombre FROM colonias'
  with engine.connect() as connection:
    result = connection.execute(text(query))
    colonias = [dict(row) for row in result.mappings()]
  return jsonify(colonias)

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


 # unique dynamic endpoint
@app.route('/incident_count', methods=['GET'])
def get_incident_count():
    year = request.args.get('year')
    colonia = request.args.get('colonia')
    query = '''
    SELECT tipoincidente.descripcion, COUNT(*) as count 
    FROM incidentes 
    JOIN tipoincidente ON incidentes.tipo_incidente_id = tipoincidente.id 
    JOIN colonias ON incidentes.colonia_catalogo_id = colonias.id 
    WHERE EXTRACT(YEAR FROM incidentes.fecha_creacion) = :year 
    AND colonias.nombre = :colonia 
    GROUP BY tipoincidente.descripcion
    '''
    with engine.connect() as connection:
        result = connection.execute(text(query), {'year': year, 'colonia': colonia})
        incident_count = [dict(row) for row in result.mappings()]
    return jsonify(incident_count)
     
@app.route('/incidentes_plot3', methods=['GET'])
def get_incidentes_plot3():
    query = '''
        SELECT 
            colonias.nombre AS colonia,
            tipoincidente.descripcion AS tipo_incidente,
            COUNT(*) AS incident_count
        FROM 
            incidentes
        JOIN 
            colonias ON incidentes.colonia_catalogo_id = colonias.id
        JOIN 
            tipoincidente ON incidentes.tipo_incidente_id = tipoincidente.id
        GROUP BY 
            colonias.nombre, tipoincidente.descripcion
        ORDER BY 
            colonias.nombre, tipoincidente.descripcion;
    '''
    with engine.connect() as connection:
        result = connection.execute(text(query))
        incidentes_plot3 = [dict(row) for row in result.mappings()]
    return jsonify(incidentes_plot3)

@app.route('/incidentes_plot4', methods=['GET'])
def get_incidentes_plot4():
    query = '''
        SELECT 
            TO_CHAR(fecha_creacion, 'Day') AS day_of_week,
            COUNT(*) AS incident_count
        FROM 
            incidentes
        GROUP BY 
            day_of_week
        ORDER BY 
            incident_count DESC;
    '''
    with engine.connect() as connection:
        result = connection.execute(text(query))
        incidentes_plot4 = [dict(row) for row in result.mappings()]
    return jsonify(incidentes_plot4)

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

@app.route('/plot2')
def plot2_view():
    return render_template('plot_2.html')

@app.route('/plot3')
def plot3_view():
    return render_template('plot_3.html')

@app.route('/plot4')
def plot4_view():
    return render_template('plot_4.html')

@app.route('/table')
def table():
    return render_template('table.html')

if __name__ == '__main__':
    app.run(debug=True)