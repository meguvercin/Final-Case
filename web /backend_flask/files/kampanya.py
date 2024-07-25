import pandas as pd
from sklearn.preprocessing import MinMaxScaler



def sum_of_my_question_groups(my_data, model, plot=False):
    my_personality = model.predict(my_data)
    # print('Müşterinin Sınıfı: ', my_personality, end="\n\n")
    col_list = list(my_data)
    ext = col_list[0:10]
    est = col_list[10:20]
    agr = col_list[20:30]
    csn = col_list[30:40]
    opn = col_list[40:50]

    my_sums = pd.DataFrame()
    my_sums['extroversion'] = my_data[ext].sum(axis=1)/10
    my_sums['neurotic'] = my_data[est].sum(axis=1)/10
    my_sums['agreeable'] = my_data[agr].sum(axis=1)/10
    my_sums['conscientious'] = my_data[csn].sum(axis=1)/10
    my_sums['open'] = my_data[opn].sum(axis=1)/10
    my_sums['cluster'] = my_personality


    return my_sums
kampanyalar = {
    0: [
        "Uzun Vadeli Tasarruf Hesapları: Düşük risk ve güvenli getiri sağlayan tasarruf hesaplarının tanıtımı.",
        "Düşük Faizli Krediler: Düşük faiz oranları ile stressiz finansman seçenekleri.",
        "Otomatik Ödeme Sistemleri:   Rutin ve düzenli ödeme sistemlerinin tanıtımı.",
        "Temel Dijital Bankacılık:  Kullanımı kolay, temel dijital bankacılık hizmetleri.",
        "Temel Sigorta Ürünleri: Basit ve kapsamlı sigorta seçenekleri."
    ],
    1: [
        "Ağ Kurma Etkinlikleri: Sosyal etkileşim ve iş ağı oluşturma etkinliklerinin tanıtımı.",
        "Yatırım Danışmanlığı: Yenilikçi ve açık fikirlere yönelik yatırım danışmanlığı hizmetleri.",
        "Seyahat ve Deneyim Kartları: Seyahat ve farklı deneyimler sunan özel kredi kartları.",
        "Çevre Dostu Yatırımlar: Çevre dostu ve sürdürülebilir yatırım seçeneklerinin tanıtımı.",
        "Finansal Eğitim Programları: Finansal okuryazarlık ve eğitim seminerleri."
    ],
    2: [
        "Yeni Ürün Tanıtımları: Yeniliklere açık müşterilere yeni bankacılık ürünlerinin tanıtımı.",
        "Finansal Planlama Hizmetleri: Sorumluluk sahibi müşterilere özel finansal planlama hizmetleri.",
        "E-Bankacılık Çözümleri: Teknolojik çözümler sunan e-bankacılık hizmetleri.",
        "Riskli Yatırımlar: Yüksek risk toleransına sahip müşterilere yönelik yatırım fırsatları.",
        "Kariyer Gelişim Programları: Profesyonel gelişim ve finansal danışmanlık hizmetleri."
    ],
    3: [
        "Duygusal Destek Hizmetleri: Yüksek nevrotiklik nedeniyle duygusal destek ve danışmanlık hizmetleri.",
        "Topluluk Etkinlikleri: Sosyal ve uyumlu bireyler için topluluk etkinlikleri ve sosyal sorumluluk projeleri.",
        "Özel Danışmanlık Hizmetleri: Duygusal hassasiyet gösteren bireyler için özel finansal danışmanlık hizmetleri.",
        "Sağlık ve Yaşam Sigortaları: Duygusal güvence sağlayan sağlık ve yaşam sigortaları.",
        "Yenilikçi Ürün Paketleri: Açık fikirlere hitap eden yenilikçi bankacılık ürün paketleri."
    ],
    4: [
        "Duygusal Destek Hizmetleri: Yüksek nevrotiklik seviyesine sahip müşterilere duygusal destek ve danışmanlık hizmetleri.",
        "Esnek Kredi ve Ödeme Seçenekleri: Duygusal hassasiyeti azaltmak için esnek kredi ve ödeme seçenekleri.",
        "Güvenli Yatırım Seçenekleri: Yüksek sorumluluk ve güven ihtiyacını karşılayan güvenli yatırım seçenekleri.",
        "Yenilikçi Finansal Ürünler: Açık fikirli müşterilere yönelik yenilikçi finansal ürünler ve hizmetler.",
        "Kapsamlı Sağlık Sigortası: Duygusal güvence sağlayan kapsamlı sağlık sigortası planları."
    ]
}


def min_max_scaler(dataframe):
    mms = MinMaxScaler(feature_range=(0,1))
    cols = list(dataframe.columns)
    dataframe = mms.fit_transform(dataframe)
    dataframe = pd.DataFrame(dataframe, columns=cols)
    return dataframe


def prepare_data(dataframe):
    dataframe.dropna(inplace=True)
    dataframe = min_max_scaler(dataframe)
    return dataframe

def kampanyaları_getir(sınıf):
    thisdict={}
    i=0
    for kampanya in kampanyalar[sınıf]:
        thisdict[str(i)]=str(kampanya)
        i+=1
    return thisdict

def kampanya_onerisi(sinif):
 
    thedict={
        "id":0,
        "customerClass":sinif,
        "campaigns":kampanyaları_getir(sinif),

    }

    if sinif == 0:
        thedict["oceanComment"]="Bu sınıftaki bireyler, diğer sınıflara kıyasla daha içe dönük, daha az uyumlu ve sorumluluk sahibi, daha az açık fikirlidirler. Aynı zamanda nevrotiklik düzeyleri düşük olduğu için daha az stresli ve duygusal olarak daha dengelidirler.",

    elif sinif == 1:
        thedict["oceanComment"]="Bu sınıftaki bireyler sosyal, düşük stresli, yeniliklere en açık ve uyumlu bireylerdir. Sorumluluk ve uyumluluk düzeyleri ortalama seviyededir."


    elif sinif == 2:
        thedict["oceanComment"]="Bu sınıftaki bireyler dengeli, sorumluluk sahibi ve yeniliklere açık bireylerdir. Duygusal dengeleri ortalama olup, uyumluluk düzeyleri nispeten düşüktür."
       
    elif sinif == 3:
        
        thedict["oceanComment"]="Bu sınıftaki bireyler sosyal, duygusal olarak daha hassas, uyumlu ve yeniliklere açık kişilerdir. Hem sosyal ilişkilerde hem de duygusal konularda aktif ve duyarlıdırlar."
    
    elif sinif == 4:
        
        thedict["oceanComment"]="Bu sınıftaki bireyler duygusal olarak daha hassas, sorumluluk sahibi ve yeniliklere açık kişilerdir. Duygusal dengesizlik yaşamalarına rağmen, sorumluluk ve yeniliklere açıklık düzeyleri yüksektir."
   
    return thedict



