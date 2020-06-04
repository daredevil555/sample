# K-Means Clustering

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import warnings
import pickle
warnings.filterwarnings("ignore")
# Importing the dataset
dataset = pd.read_csv('data.csv')
X = dataset.iloc[:, 2:12].values

# Using the elbow method to find the optimal number of clusters
from sklearn.cluster import KMeans

# Training the K-Means model on the dataset
kmeans = KMeans(n_clusters = 3, init = 'k-means++', random_state = 42)
y_kmeans = kmeans.fit_predict(X)

pickle.dump(kmeans,open('model.pkl','wb'))
model=pickle.load(open('model.pkl','rb'))
