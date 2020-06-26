import subprocess
import uuid
from deepspeech import Model
from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS, cross_origin

MODEL_FILE = 'models/output_graph.pbmm'
ALPHABET_FILE = 'models/alphabet.txt'
LANGUAGE_MODEL =  'models/vnlm.binary'
TRIE_FILE =  'models/vntrie'

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def predict(voiceData):
    fileName = 'processing.wav'
    with open(fileName, 'wb') as clip:
        clip.write(voiceData)
    try:
        cmdStr = 'deepspeech --model {} --alphabet {} --lm {} --trie {} --audio {}'.format(MODEL_FILE, ALPHABET_FILE, LANGUAGE_MODEL, TRIE_FILE, fileName)
        proc = subprocess.Popen(cmdStr, shell=True, stdout=subprocess.PIPE, )
        resultText = proc.communicate()[0].decode('utf-8')
        print('--------Text result---------')
        print(resultText)
        print('----------------------------')
        return {'returncode': 1, 'returnmessage': 'Success', 'text': resultText}
    except:
        return {'returncode': -2, 'returnmessage': 'Error when handle data from file wav', 'text': ''}

@app.route('/', methods=['POST'])
@cross_origin()
def post1():
    responseData = {'returncode': 0, 'returnmessage': '', 'text': ''}
    if request.method != 'POST':
        return jsonify({'returncode': 400, 'returnmessage': 'POST method error', 'text': ''})
    fileFormat = request.values.get('type')
    if request.files.get('voice'):
        voiceData = request.files['voice'].read()
        responseData = predict(voiceData)
    return jsonify(responseData)

if __name__ == '__main__':
    print('ASR API is running on port 5000')
    app.run(host='0.0.0.0', port=5000)