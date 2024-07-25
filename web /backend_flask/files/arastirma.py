import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.impute import KNNImputer
from yellowbrick.cluster import KElbowVisualizer
from sklearn.decomposition import PCA
from sklearn.preprocessing import MinMaxScaler
from sklearn.decomposition import PCA
import warnings

warnings.simplefilter(action='ignore', category=Warning)


def load():
    data = pd.read_csv('datasets/data-final.csv', sep="\t")
    data = data.iloc[:, :50]
    return data

# df = load()


def cat_summary(dataframe, col, plot=False):
    print(pd.DataFrame({col: dataframe[col].value_counts(),
                        "Ratio": dataframe[col].value_counts()*100/len(dataframe)}))
    print("------------------", end="\n\n")

    if plot:
        sns.countplot(x=col, data=dataframe)
        plt.title(col)
        plt.show(block=True)


# for col in df.columns:
#     cat_summary(df, col, plot=True)

# df.isnull().sum()
#
# df[df.isnull().any(axis=1)].head()


def min_max_scaler(dataframe):
    mms = MinMaxScaler()
    cols = list(dataframe.columns)
    df_scaled = mms.fit_transform(dataframe)
    dataframe = pd.DataFrame(df_scaled, columns=cols)
    return dataframe


def prepare_data(dataframe):
    dataframe.dropna(inplace=True)
    # dataframe = min_max_scaler(dataframe)
    return dataframe


def inertia_analysis_for_number_of_clusters(dataframe, max_number_of_cluster):
    ssd = list()
    K = range(1, max_number_of_cluster+1)

    for k in K:
        kmeans = KMeans(n_clusters=k).fit(dataframe)
        ssd.append(kmeans.inertia_)
    return ssd


def visualize_ssd(ssd):
    plt.plot(range(1,len(ssd)+1), ssd, "bx-")
    plt.xlabel('Farklı k değerlerine karşılık SSD')
    plt.ylabel('Optimum küme sayısı için elbow yöntemi')
    plt.show()

#
# df = load()
# df = prepare_data(df)
# ssd = inertia_analysis_for_number_of_clusters(df, 10)
# visualize_ssd(ssd)


def elbow_visualizer(dataframe, k_max, plot=False):
    kmeans = KMeans()
    elbow = KElbowVisualizer(kmeans, k=range(1,k_max+1))
    elbow.fit(dataframe)

    if plot:
        elbow.show()

    return elbow

# df = load()
#
# df = prepare_data(df)
#
# elbow_visualizer(df, 10, plot=True)


# Model Olusturma
#
#
# kmeans = KMeans(n_clusters=5)
# k_fit = kmeans.fit(df)
#
# k_fit.get_params()
#
# k_fit.n_clusters
# k_fit.inertia_
# k_fit.cluster_centers_
#
# df.head()
#
#
# df['CLUSTERS'] = k_fit.labels_
# df['CLUSTERS'] += 1
#
# df['CLUSTERS'].value_counts()
#
# df.groupby('CLUSTERS').mean()
#
# df.head()


def produce_fitted_model(dataframe, n_cluster=5):
    k_means = KMeans(n_clusters=n_cluster).fit(dataframe)
    return k_means


def produce_clustered_df(dataframe, model, target_name):
    dataframe[target_name] = model.labels_
    return dataframe


# Summing up the different questions groups
def sum_of_the_different_questions_groups(dataframe, target='CLUSTER'):
    col_list = list(dataframe)
    ext = col_list[0:10]
    est = col_list[10:20]
    agr = col_list[20:30]
    csn = col_list[30:40]
    opn = col_list[40:50]

    data_sums = pd.DataFrame()
    data_sums['extroversion'] = dataframe[ext].sum(axis=1)/10
    data_sums['neurotic'] = dataframe[est].sum(axis=1)/10
    data_sums['agreeable'] = dataframe[agr].sum(axis=1)/10
    data_sums['conscientious'] = dataframe[csn].sum(axis=1)/10
    data_sums['open'] = dataframe[opn].sum(axis=1)/10
    data_sums['CLUSTER'] = dataframe['CLUSTER']

    return data_sums.groupby(target).mean()


# Visualizing the means for each cluster

def pca_table_by_clusters(dataframe, model, plot=False):
    pca = PCA(n_components=2)
    pca_fit = pca.fit_transform(dataframe)

    df_pca = pd.DataFrame(data=pca_fit, columns=["PCA1", "PCA2"])
    df_pca['CLUSTERS'] = model.labels_
    df_pca['CLUSTERS'] += 1
    print(df_pca.head())

    if plot:
        plt.figure(figsize=(10,10))
        sns.scatterplot(data=df_pca, x='PCA1', y='PCA2', hue='CLUSTERS', palette='Set2', alpha=0.8)
        plt.title('Personality Clusters after PCA')
        plt.show()


# visualized PCA

# plt.figure(figsize=(10,10))
# sns.scatterplot(data=df_pca, x="PCA1", y="PCA2", hue='CLUSTERS', palette='Set2', alpha=0.8)
# plt.title('Personality Clusters after PCA')
# plt.show()


# Summing up the my question groups


# def ortalama_degerler(dataframe):
#     df = sum_of_the_different_questions_groups(dataframe)
#     ort = []
#     print(df)
#     for i in list(df):
#         ort.append(df[i].mean())
#     return ort


def sum_of_my_question_groups(my_data, model):
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
        "Sosyal Etkinlik Bileti İndirimi: Üyelerimize özel sosyal etkinlik biletlerinde %20 indirim.",
        "Duygusal Destek Paketleri: Psikolojik danışmanlık hizmetleri ve destek paketleri.",
        "Topluluk Etkinlikleri: Yıl boyunca düzenlenen özel topluluk etkinlikleri ve seminerler.",
        "Ücretsiz Eğlence Etkinlikleri: Sosyal etkinlikler ve konserlerde ücretsiz biletler.",
        "Gönüllü Programları: Sosyal sorumluluk projelerinde gönüllü olma fırsatları ve ödüller."
    ],
    1: [
        "Uzun Vadeli Yatırım Hesapları: Yüksek faiz oranları ve avantajlı yatırım hesapları.",
        "Kişisel Gelişim Seminerleri: Ücretsiz kişisel gelişim ve kariyer seminerleri.",
        "Emeklilik Planları: Uzun vadeli emeklilik ve tasarruf planları.",
        "Finansal Danışmanlık Hizmetleri: Kişiye özel finansal planlama ve danışmanlık hizmetleri.",
        "Yatırım Fırsatları: Yeni yatırım fırsatları ve fırsatları değerlendirme seminerleri."
    ],
    2: [
        "Stres Yönetimi Programları: Stres azaltıcı yoga ve meditasyon seansları.",
        "Güvenli Yatırım Ürünleri: Düşük riskli yatırım ürünleri ve tasarruf hesapları.",
        "Sağlık ve Refah Paketleri: Sağlık ve refah hizmetleri için özel paketler.",
        "Acil Durum Kredi Hatları: Stresli durumlar için özel kredi hatları ve acil durum destekleri.",
        "Güvenli Yatırım Seminerleri: Risk yönetimi ve güvenli yatırım stratejileri seminerleri."
    ],
    3: [
        "Sosyal Ağ Üyelikleri: Sosyal ağ etkinliklerinde özel üyelik fırsatları ve indirimler.",
        "Güvenli Kredi Kartı Teklifleri: Özel avantajlı ve güvenli kredi kartı teklifleri.",
        "Topluluk Buluşmaları: Finansal bilgi paylaşımı ve sosyal buluşma etkinlikleri.",
        "Sosyal Etkileşim Ödülleri: Sosyal etkinliklere katılım ve etkileşim için ödüller.",
        "Güvenilir Yatırım Araçları: Uzman önerileriyle güvenli yatırım araçları ve ürünleri."
    ],
    4: [
        "Yeni Yatırım Fırsatları: Yüksek getirili yeni yatırım fırsatları ve ürünleri.",
        "Deneyim Paketleri: Ücretsiz veya indirimli seyahat ve eğlence deneyim paketleri.",
        "Özel Müşteri Bonusları: Yatırımlarda ekstra bonuslar ve avantajlı teklifler.",
        "Yeni Teknoloji Ürünleri: Finansal yönetim için yeni teknoloji ürünleri ve araçları.",
        "İnovasyon Seminerleri: Yeni yatırım trendleri ve finansal inovasyonlar üzerine seminerler."
    ]
}


def kampanyaları_yazdır(sınıf):
    print(f"Sınıf {sınıf} için önerilen kampanyalar:")
    for kampanya in kampanyalar[sınıf]:
        print(f"- {kampanya}")


def kampanya_onerisi(sinif):
    if sinif == 0:
        return """f'Müşteri {sinif}. sınıfta yer alıyor' Bu sınıftaki kisiler dışa dönük, duygusal olarak dengesiz, 
        uyumlu, sorumlu ve açık bir yapıya
        sahiptir. Bu profildeki kişiler genellikle sosyal ve yeniliklere açıktır. Ancak duygusal dengesizlikleri
              'onları stresli durumlarda daha hassas yapabilir.'
        
        kampanyaları_yazdır(sinif)"""

    elif sinif == 1:
        print(f'Müşteri {sinif}. sınıfta yer alıyor', end="\n\n")
        print('Bu sınıftaki kisiler ortalama düzeyde dışa dönük, duygusal olarak daha dengeli, uyumlu, sorumlu ve ',
              'açık bir yapıya sahiptir. Bu profildeki kişiler genellikle dengeli bir hayat tarzına sahiptir.', sep='\n',
              end="\n")
        print("---------------------------", end="\n")
        kampanyaları_yazdır(sinif)

    elif sinif == 2:
        print(f'Müşteri {sinif}. sınıfta yer alıyor', end="\n\n")
        print('Bu sınıftaki kisiler dışa dönük, duygusal olarak dengesiz, uyumlu, sorumlu ve açık bir yapıya ',
              'sahiptir. Duygusal dengesizlik bu kümede oldukça belirgindir.', sep='\n', end="\n")
        print("---------------------------", end="\n")
        kampanyaları_yazdır(sinif)

    elif sinif == 3:
        print(f'Müşteri {sinif}. sınıfta yer alıyor', end="\n\n")
        print('Bu sınıftaki kişiler duygusal olarak dengesiz, uyumlu, sorumlu ve açık bir yapıya sahiptir. Duygusal '
              'dengesizlik bu kümede oldukça belirgindir.', sep='\n', end="\n")
        print("---------------------------", end="\n")
        kampanyaları_yazdır(sinif)

    elif sinif == 4:
        print(f'Müşteri {sinif}. sınıfta yer alıyor', end="\n\n")
        print('Bu sınıftaki kişiler dışa dönük, duygusal olarak dengeli, uyumlu, sorumlu ve açık bir yapıya sahiptir. '
              'Duygusal denge bu kümede en yüksek seviyededir.', sep='\n', end="\n")
        print("---------------------------", end="\n")
        kampanyaları_yazdır(sinif)

columns_order = [
        'EXT1', 'EXT2', 'EXT3', 'EXT4', 'EXT5', 'EXT6', 'EXT7', 'EXT8', 'EXT9', 'EXT10',
        'EST1', 'EST2', 'EST3', 'EST4', 'EST5', 'EST6', 'EST7', 'EST8', 'EST9', 'EST10',
        'AGR1', 'AGR2', 'AGR3', 'AGR4', 'AGR5', 'AGR6', 'AGR7', 'AGR8', 'AGR9', 'AGR10',
        'CSN1', 'CSN2', 'CSN3', 'CSN4', 'CSN5', 'CSN6', 'CSN7', 'CSN8', 'CSN9', 'CSN10',
        'OPN1', 'OPN2', 'OPN3', 'OPN4', 'OPN5', 'OPN6', 'OPN7', 'OPN8', 'OPN9', 'OPN10'
    ]

def veriyi_duzenle(dataframe):
    dataframe['id'] = 0
    df_pivot = dataframe.pivot(index='id', columns='question_code', values='answer')
    df_pivot.columns.name = None
    df_pivot = df_pivot[columns_order]
    df_pivot.reset_index(drop=True, inplace=True)
    return df_pivot


# def sum_of_my(my_data, model):
#     my_sum = sum_of_my_question_groups(my_data, model)
#     columns = my_sum.columns
#     values1 = my_sum.iloc[0, :]
#     print(values1)
#     values2 = [3.017374241775224, 3.0048569400598337, 3.1405757982678755, 3.113967321327427, 3.258182070752743]
#
#     # Çift barların genişliğini belirlemek için bir offset
#     bar_width = 0.35
#     index = np.arange(len(columns))
#
#     plt.figure(figsize=(10, 10))
#
#     # İlk barlar (yeşil)
#     bars1 = plt.bar(index, values1, bar_width, color='green', alpha=0.8, label='Müşteri Değerleri')
#
#     # İkinci barlar (mavi)
#     bars2 = plt.bar(index + bar_width, values2, bar_width, color='blue', alpha=0.8, label='Ortalama Degerler')
#
#     plt.plot(index, values1, color='red')
#
#     plt.title('Cluster 2')
#     plt.xticks(index + bar_width / 2, columns, rotation=45)
#
#     # İlk barların üzerinde değerleri göstermek
#     for bar in bars1:
#         height = bar.get_height()
#         plt.text(bar.get_x() + bar.get_width() / 2, height, f'{height:.2f}', ha='center', va='bottom')
#
#     # İkinci barların üzerinde değerleri göstermek
#     for bar in bars2:
#         height = bar.get_height()
#         plt.text(bar.get_x() + bar.get_width() / 2, height, f'{height:.2f}', ha='center', va='bottom')
#
#     plt.legend()
#     plt.show()