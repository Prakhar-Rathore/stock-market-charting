import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import tensorflow as tf
import yfinance as yf
from pickle import dump
import os

from firestore_interface import *
from tensorflow.keras.models import load_model
from functions import *

TRAINING_RATIO = 0.9
IN_STEPS = 60
OUT_STEPS = 21
START_DATE = "2016-01-01"
END_DATE = "2022-06-30"

def prepare_model(ticker):

    dir = "models/" + ticker.replace(".", "_")
    
    if not os.path.exists(dir):
        os.mkdir(dir)

    df = get_dataframe_and_store_csv(ticker, start=START_DATE, end=END_DATE, filepath=dir + "/" +"data.csv")
    
    #split into train and test dataframes
    n = len(df)
    train_df = df[0:int(n*TRAINING_RATIO)]
    test_df = df[int(n*(1-TRAINING_RATIO)):]

    #obtain the scaling parameters for standardisation and store them in a file
    train_mean = train_df.mean()
    train_std = train_df.std()
    scaler = {"mean": train_mean, "std": train_std}
    dump(scaler, open(dir + "/" +"scaler.pkl", "wb"))

    train_df_scaled = (train_df - train_mean) / train_std
    test_df_scaled = (test_df - train_mean) / train_std

    #convert to numpy values
    train_set_scaled = train_df_scaled.values
    test_set_scaled = test_df_scaled.values
    
    X_train, Y_train = get_input_output_arr(train_set_scaled, IN_STEPS, OUT_STEPS)
    X_test, Y_test = get_input_output_arr(test_set_scaled, IN_STEPS, OUT_STEPS)

    #make the keras Sequential model
    lstm_model = get_untrained_model()

    #compile and fit the model
    lstm_model = compile_and_fit(lstm_model, X_train, Y_train)

    #save the model
    lstm_model.save(dir+ '/' + 'model.h5')
    reloaded_model = load_model(dir+ '/' +'model.h5', custom_objects = {"custom_accuracy":custom_accuracy})
    
    #evaluate its performance and store it in a file
    performance = reloaded_model.evaluate(X_test, Y_test, batch_size=32)

    with open(dir + '/' + "/performance.txt", "w") as f:
        f.write(str(performance))


if __name__ == "__main__":
    #prepare a model for all the stocks in the database
    yf_tickers = get_all_tickers()

    for ticker in yf_tickers:
        prepare_model(ticker)