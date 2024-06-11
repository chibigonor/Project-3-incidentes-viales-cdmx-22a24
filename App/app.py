from flask import Flask, jsonify, render_template
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/map')
def index():
    return render_template('map.html')

@app.route('/plot1')
def plot1():
    return render_template('plot1.html')

@app.route('/plot2')
def plot2():
    return render_template('plot2.html')

@app.route('/plot3')
def plot3():
    return render_template('plot3.html')
@app.route('/map_json_info', method=['GET'])
def data_map():
    sqlmalt
    
    return jsonify(akmdaksdm)




if __name__ == '__main__':
    app.run(debug=True)