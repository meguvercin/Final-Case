import joblib
import numpy as np
import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, VotingClassifier, AdaBoostClassifier
from sklearn.svm import SVC
from sklearn.model_selection import cross_validate, GridSearchCV, train_test_split
from sklearn.metrics import classification_report


from xgboost import XGBClassifier
from catboost import CatBoostClassifier
from lightgbm import LGBMClassifier
import warnings
import joblib

warnings.simplefilter(action='ignore', category=Warning)


def load():
    data = pd.read_csv('datasets/data_with_clusters.csv', index_col=0)
    return data


def data_prep(dataframe, target):
    x = dataframe.drop(target, axis=1)
    y = dataframe[target]

    return x, y


# Base Models

def base_models(X, y, scoring="accuracy"):
    print("Base Models....")
    classifiers = [('XGBoost', XGBClassifier(use_label_encoder=False, eval_metric='logloss', verbose=False)),
                   ('LightGBM', LGBMClassifier(force_row_wise=True, verbose=0)),
                   ('CatBoost', CatBoostClassifier(silent=True))]

    for name, classifier in classifiers:
        cv_results = cross_validate(classifier, X, y, cv=5, scoring=scoring)
        print(f"{scoring}: {round(cv_results['test_score'].mean(), 4)} ({name}) ")

#
# # Automated Hyperparameter Optimization
#
# knn_params = {"n_neighbors": range(2, 50)}
#
# cart_params = {'max_depth': range(1, 20),
#                "min_samples_split": range(2, 30)}
#
# rf_params = {"max_depth": [8, 15, None],
#              "max_features": [5, 7, "auto"],
#              "min_samples_split": [15, 20],
#              "n_estimators": [200, 300]}
#
# xgboost_params = {"learning_rate": [0.1, 0.01],
#                   "max_depth": [5, 8],
#                   "n_estimators": [100, 200]}
#
# lightgbm_params = {"learning_rate": [0.01, 0.1],
#                    "n_estimators": [300, 500]}
#
# classifiers = [('XGBoost', XGBClassifier(use_label_encoder=False, eval_metric='logloss'), xgboost_params),
#                ('LightGBM', LGBMClassifier(force_row_wise=True, verbose=0), lightgbm_params)]


# def hyperparameter_optimization(X, y, cv=5, scoring="accuracy"):
#     print("Hyperparameter Optimization....")
#     best_models = {}
#     for name, classifier, params in classifiers:
#         print(f"########## {name} ##########")
#         cv_results = cross_validate(classifier, X, y, cv=cv, scoring=scoring)
#         print(f"{scoring} (Before): {round(cv_results['test_score'].mean(), 4)}")
#
#         gs_best = GridSearchCV(classifier, params, cv=cv, n_jobs=-1, verbose=False).fit(X, y)
#         final_model = classifier.set_params(**gs_best.best_params_)
#
#         cv_results = cross_validate(final_model, X, y, cv=cv, scoring=scoring)
#         print(f"{scoring} (After): {round(cv_results['test_score'].mean(), 4)}")
#         print(f"{name} best params: {gs_best.best_params_}", end="\n\n")
#         best_models[name] = final_model
#     return best_models

df = load()
df.head()

X, y = data_prep(df, 'CLUSTER')


model1 = XGBClassifier(use_label_encoder=False, eval_metric='mlogloss')
model2 = CatBoostClassifier(silent=True)
model3 = LGBMClassifier(force_row_wise=True, verbose=0)


def voting_classifier(X, y):
    print("Voting Classifier...")
    voting_clf = VotingClassifier(estimators=[('XGBoost', model1),
                                              ('CatBoost',model2),
                                              ('LightGBM', model3)],
                                  voting='soft').fit(X, y)
    cv_results = cross_validate(voting_clf, X, y, cv=5, scoring=["accuracy"])
    print(f"Accuracy: {cv_results['test_accuracy'].mean()}")
    return voting_clf


voting_clf = voting_classifier(X,y)

joblib.dump(voting_clf, 'voting_clf.pkl')


