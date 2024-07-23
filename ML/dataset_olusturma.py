import arastirma
import joblib

df_not_scaled = arastirma.load()[:100]

df = arastirma.prepare_data(df_not_scaled)

k_fit_model = arastirma.produce_fitted_model(df_not_scaled, n_cluster=5)

df_with_clusters = arastirma.produce_clustered_df(df_not_scaled, k_fit_model, target_name='CLUSTER')

# arastirma.pca_table_by_clusters(df_not_scaled, k_fit_model, plot=True)

df_with_clusters.to_csv("datasets/data_with_clusters.csv")
df_not_scaled.to_csv('datasets/train.csv')






