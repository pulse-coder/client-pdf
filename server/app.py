from flask import Flask, request
import base64

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload():
    pdf = request.form.get('pdf')
    pdfdecoded = base64.b64decode(pdf)
    with open('file.pdf', 'wb') as f:
        f.write(pdfdecoded)

    return {
        "message": "File received"
    }, 200, {
        'ContentType': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }

if __name__ == '__main__':
    app.run(debug=True)
