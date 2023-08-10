from firestore_interface import *
from functions import custom_accuracy
import tensorflow as tf
import numpy as np
import pandas as pd
from pickle import load
from tensorflow.keras.models import load_model


def predict_and_update(ticker):

    dir = "models/" + ticker.replace(".", "_")
    prev_data_60 = get_60_days_data(ticker)
    #convert it to pandas dataframe
    df = pd.DataFrame(prev_data_60)
    #remove the date column
    df.pop("date")
    #order like open, high, low, close, volume
    df = df[["open", "high", "low", "close", "volume"]].round(2).astype(float)

    df.rename(columns={"open": "Open", "high": "High", "low": "Low", "close": "Close", "volume": "Volume"}, inplace=True)
    
    #get the scaling parameters
    scaler = load(open(dir + '/scaler.pkl', 'rb'))

    scaled_df = (df - scaler['mean'])/scaler['std']
    #convert it to numpy array
    scaled_arr = scaled_df.values
    scaled_reshaped_arr = scaled_arr[np.newaxis, ...]

    #load the model and make the prediction
    model = load_model(dir + '/model.h5', custom_objects={'custom_accuracy': custom_accuracy})
    prediction = model.predict(scaled_reshaped_arr)
    prediction = prediction.reshape(prediction.shape[1])
    
    #undo standardization
    prediction = prediction * scaler['std']['Open'] + scaler['mean']['Open']

    #account for error caused due to extrapolation
    #first outputopen price must be equal to last input open price
    mul_factor = df["Open"][-1]/prediction[0]
    prediction_final = (prediction[1:] * mul_factor)

    #convert it to a list
    prediction_final = prediction_final.tolist()
    update_firestore_predictions(ticker, prediction_final)

if __name__ == "__main__":
    
    for ticker in get_all_tickers():
        predict_and_update(ticker)