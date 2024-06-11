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


if __name__ == '__main__':
    app.run(debug=True)