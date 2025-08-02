from flask import Flask, request, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_file(path):
    return send_from_directory('.', path)

@app.route('/save', methods=['POST'])
def save_csv():
    data = request.data.decode('utf-8')
    with open('restaurant_specials.csv', 'w') as f:
        f.write(data)
    return 'Saved', 200

if __name__ == '__main__':
    app.run(debug=True)
