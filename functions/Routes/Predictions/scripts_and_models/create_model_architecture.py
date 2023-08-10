import tensorflow as tf
import json

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import LSTM
from tensorflow.keras.layers import Dropout

IN_STEPS = 60
NUM_FEATURES = 5
OUT_STEPS = 21

multi_lstm_model = Sequential()

multi_lstm_model.add(LSTM(units=50, return_sequences = True, input_shape = (IN_STEPS, NUM_FEATURES)))
multi_lstm_model.add(Dropout(0.3))

multi_lstm_model.add(LSTM(units = 50, return_sequences = True))
multi_lstm_model.add(Dropout(0.3))

multi_lstm_model.add(LSTM(units = 50, return_sequences = True))
multi_lstm_model.add(Dropout(0.3))

multi_lstm_model.add(LSTM(units = 50))
multi_lstm_model.add(Dropout(0.3))

multi_lstm_model.add(Dense(units = OUT_STEPS))

#convert the model to a json object and dump it to a json file named 'model_architecture.json'
model_json = multi_lstm_model.to_json()

with open("config/model_architecture.json", "w") as json_file:
    json.dump(model_json, json_file)
