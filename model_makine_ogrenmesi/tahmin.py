import joblib
import pandas as pd
import arastirma


df = pd.read_json(r'C:\Users\SEZER\OneDrive\Desktop\oceananswer.json')
df = arastirma.veriyi_duzenle(df)
model = joblib.load("voting_clf.pkl")


def main():
    data = df
    musteri_degerleri = arastirma.sum_of_my_question_groups(data, model, plot=True)
    model.predict(df)
    return musteri_degerleri


if __name__ == '__main__':
    print('islem baslatildi ..')
    main()













