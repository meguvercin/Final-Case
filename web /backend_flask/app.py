
from flask_cors import CORS, cross_origin
import numpy as np
from flask import Flask, request, render_template
import joblib
import files.kampanya as kampanya
import pandas as pd
import json
import files.gpt as gpt 
import files.arastirma as arastirma




app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

model = joblib.load("voting_clf.pkl")

def convertFromJSON(json):
    columns_order = ['EXT1', 'EXT2', 'EXT3', 'EXT4', 'EXT5', 'EXT6', 'EXT7', 'EXT8', 'EXT9', 'EXT10', 
                 'EST1', 'EST2', 'EST3', 'EST4', 'EST5', 'EST6', 'EST7', 'EST8', 'EST9', 'EST10', 
                 'AGR1', 'AGR2', 'AGR3', 'AGR4', 'AGR5', 'AGR6', 'AGR7', 'AGR8', 'AGR9', 'AGR10', 
                 'CSN1', 'CSN2', 'CSN3', 'CSN4', 'CSN5', 'CSN6', 'CSN7', 'CSN8', 'CSN9', 'CSN10', 
                 'OPN1', 'OPN2', 'OPN3', 'OPN4', 'OPN5', 'OPN6', 'OPN7', 'OPN8', 'OPN9', 'OPN10']

    df = pd.DataFrame(json)
    reshaped_df = df.pivot_table(index=lambda x: 0, columns='question_code', values='answer', aggfunc='first')[columns_order]
    return reshaped_df



@app.route('/predict-ocean',methods=['POST'])
@cross_origin()
def predictOcean():
    #veriyi data.json dosyasına yazdır
    with open('data.json', 'w') as f:
        json.dump(request.json, f)

    #veriyi oku
    df = pd.read_json(r'data.json')
    #model için veriyi düzenle
    df = arastirma.veriyi_duzenle(df)
    data = df

    #müşteri değerlerini al
    musteri_degerleri = arastirma.sum_of_my_question_groups(data, model)
    response=kampanya.kampanya_onerisi(float(musteri_degerleri["cluster"]))
    result={
        "O":float(musteri_degerleri["open"]),
        "C":float(musteri_degerleri["conscientious"]),
        "E":float(musteri_degerleri["extroversion"]),
        "A":float(musteri_degerleri["agreeable"]),
        "N":float(musteri_degerleri["neurotic"]),
    }
    response["results"]=result
    
    return response



@app.route('/ask-to-gpt',methods=['POST'])
@cross_origin()
def askToGpt():
    data=request.json
    
    response=gpt.useGpt(data["prompt"])
    return response


if __name__ == "__main__":
    app.run()