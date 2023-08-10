import tensorflow as tf
import numpy as np
import json
import pandas as pd
from tensorflow.keras.models import model_from_json
import yfinance as yf


def get_untrained_model():
    #load the model architecture from a json file
    with open("config/model_architecture.json", "r") as json_file:
        model_json = json.load(json_file)
    
    recon_model = model_from_json(model_json)
    return recon_model


def get_dataframe_and_store_csv(ticker, start, end, filepath):
    #get data from yfinance
    data = yf.download(ticker, start, end)
    data.pop('Adj Close')
    data[["Open", "High", "Low", "Close"]] = data[["Open", "High", "Low", "Close"]].round(2)
    #change datatype of volume to float
    data['Volume'] = data['Volume'].astype(float)

    #save data to a csv file
    data.to_csv(filepath)
    df = pd.read_csv(filepath)
    df.pop("Date")
    return df


def get_input_output_arr(scaled_np_arr, in_steps, out_steps):
    X = []
    Y = []

    for i in range(in_steps+out_steps-1, len(scaled_np_arr)):
        X.append(scaled_np_arr[i-(in_steps+out_steps-1):i-out_steps+1, :])
        Y.append(scaled_np_arr[i-out_steps:i,0])
    
    return np.array(X), np.array(Y)


def custom_accuracy(y_true, y_pred):
    
    correct = 0
    
    for i in range(len(y_true)):
        y_t = y_true[i]
        y_p = y_pred[i]
        start_true = y_t[0]
        end_true = y_t[-1]
        start_pred = y_p[0]
        end_pred = y_p[-1]
    
        if (((end_true >= start_true) and (end_pred >= start_pred)) or ((end_true <= start_true) and (end_pred <= start_pred))):
            correct += 1
    return correct/len(y_true)

def compile_and_fit(model, X_train, Y_train):
    model.compile(optimizer='adam', loss='mean_squared_error', metrics = [custom_accuracy])
    model.fit(X_train, Y_train, epochs=25, batch_size=32)
    return model