import React, { useEffect } from "react";
import {Paper,Grid,Box} from '@mui/material'


import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Button, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Nifty50({dataset}) {

 /* const dataset = [
    {
      "Close": 17069.1,
      "Date": "2022-05-02T10:00:00.000Z",
      "High": 17092.25,
      "Low": 16917.25,
      "Open": 16924.45,
      "Volume": 0,
      "id": 1
    },
    {
      "Close": 16677.6,
      "Date": "2022-05-04T10:00:00.000Z",
      "High": 17132.85,
      "Low": 16623.95,
      "Open": 17096.6,
      "Volume": 0,
      "id": 2
    },
    {
      "Close": 16682.65,
      "Date": "2022-05-05T10:00:00.000Z",
      "High": 16945.7,
      "Low": 16651.85,
      "Open": 16854.75,
      "Volume": 0,
      "id": 3
    },
    {
      "Close": 16411.25,
      "Date": "2022-05-06T10:00:00.000Z",
      "High": 16484.2,
      "Low": 16340.9,
      "Open": 16415.55,
      "Volume": 0,
      "id": 4
    },
    {
      "Close": 16301.85,
      "Date": "2022-05-09T10:00:00.000Z",
      "High": 16403.7,
      "Low": 16142.1,
      "Open": 16227.7,
      "Volume": 0,
      "id": 5
    },
    {
      "Close": 16240.05,
      "Date": "2022-05-10T10:00:00.000Z",
      "High": 16404.55,
      "Low": 16197.3,
      "Open": 16248.9,
      "Volume": 0,
      "id": 6
    },
    {
      "Close": 16167.1,
      "Date": "2022-05-11T10:00:00.000Z",
      "High": 16318.75,
      "Low": 15992.6,
      "Open": 16270.05,
      "Volume": 0,
      "id": 7
    },
    {
      "Close": 15808,
      "Date": "2022-05-12T10:00:00.000Z",
      "High": 16041.95,
      "Low": 15735.75,
      "Open": 16021.1,
      "Volume": 0,
      "id": 8
    },
    {
      "Close": 15782.15,
      "Date": "2022-05-13T10:00:00.000Z",
      "High": 16083.6,
      "Low": 15740.85,
      "Open": 15977,
      "Volume": 0,
      "id": 9
    },
    {
      "Close": 15842.3,
      "Date": "2022-05-16T10:00:00.000Z",
      "High": 15977.95,
      "Low": 15739.65,
      "Open": 15845.1,
      "Volume": 0,
      "id": 10
    },
    {
      "Close": 16259.3,
      "Date": "2022-05-17T10:00:00.000Z",
      "High": 16284.25,
      "Low": 15900.8,
      "Open": 15912.6,
      "Volume": 0,
      "id": 11
    },
    {
      "Close": 16240.3,
      "Date": "2022-05-18T10:00:00.000Z",
      "High": 16399.8,
      "Low": 16211.2,
      "Open": 16318.15,
      "Volume": 0,
      "id": 12
    },
    {
      "Close": 15809.4,
      "Date": "2022-05-19T10:00:00.000Z",
      "High": 15984.75,
      "Low": 15775.2,
      "Open": 15917.4,
      "Volume": 0,
      "id": 13
    },
    {
      "Close": 16266.15,
      "Date": "2022-05-20T10:00:00.000Z",
      "High": 16283.05,
      "Low": 16003.85,
      "Open": 16043.8,
      "Volume": 0,
      "id": 14
    },
    {
      "Close": 16214.7,
      "Date": "2022-05-23T10:00:00.000Z",
      "High": 16414.7,
      "Low": 16185.75,
      "Open": 16290.95,
      "Volume": 0,
      "id": 15
    },
    {
      "Close": 16125.15,
      "Date": "2022-05-24T10:00:00.000Z",
      "High": 16262.8,
      "Low": 16078.6,
      "Open": 16225.55,
      "Volume": 0,
      "id": 16
    },
    {
      "Close": 16025.8,
      "Date": "2022-05-25T10:00:00.000Z",
      "High": 16223.35,
      "Low": 16006.95,
      "Open": 16196.35,
      "Volume": 0,
      "id": 17
    },
    {
      "Close": 16170.15,
      "Date": "2022-05-26T10:00:00.000Z",
      "High": 16204.45,
      "Low": 15903.7,
      "Open": 16105,
      "Volume": 0,
      "id": 18
    },
    {
      "Close": 16352.45,
      "Date": "2022-05-27T10:00:00.000Z",
      "High": 16370.6,
      "Low": 16221.95,
      "Open": 16296.6,
      "Volume": 0,
      "id": 19
    },
    {
      "Close": 16661.4,
      "Date": "2022-05-30T10:00:00.000Z",
      "High": 16695.5,
      "Low": 16506.15,
      "Open": 16527.9,
      "Volume": 0,
      "id": 20
    },
    {
      "Close": 16584.55,
      "Date": "2022-05-31T10:00:00.000Z",
      "High": 16690.75,
      "Low": 16521.9,
      "Open": 16578.45,
      "Volume": 0,
      "id": 21
    },
    {
      "Close": 16522.75,
      "Date": "2022-06-01T10:00:00.000Z",
      "High": 16649.2,
      "Low": 16438.85,
      "Open": 16594.4,
      "Volume": 0,
      "id": 22
    },
    {
      "Close": 16628,
      "Date": "2022-06-02T10:00:00.000Z",
      "High": 16646.4,
      "Low": 16443.05,
      "Open": 16481.65,
      "Volume": 0,
      "id": 23
    },
    {
      "Close": 16584.3,
      "Date": "2022-06-03T10:00:00.000Z",
      "High": 16793.85,
      "Low": 16567.9,
      "Open": 16761.65,
      "Volume": 0,
      "id": 24
    },
    {
      "Close": 16569.55,
      "Date": "2022-06-06T10:00:00.000Z",
      "High": 16610.95,
      "Low": 16444.55,
      "Open": 16530.7,
      "Volume": 0,
      "id": 25
    },
    {
      "Close": 16416.35,
      "Date": "2022-06-07T10:00:00.000Z",
      "High": 16487.25,
      "Low": 16347.1,
      "Open": 16469.6,
      "Volume": 0,
      "id": 26
    },
    {
      "Close": 16356.25,
      "Date": "2022-06-08T10:00:00.000Z",
      "High": 16514.3,
      "Low": 16293.35,
      "Open": 16474.95,
      "Volume": 0,
      "id": 27
    },
    {
      "Close": 16478.1,
      "Date": "2022-06-09T10:00:00.000Z",
      "High": 16492.8,
      "Low": 16243.85,
      "Open": 16263.85,
      "Volume": 0,
      "id": 28
    },
    {
      "Close": 16201.8,
      "Date": "2022-06-10T10:00:00.000Z",
      "High": 16324.7,
      "Low": 16172.6,
      "Open": 16283.95,
      "Volume": 0,
      "id": 29
    },
    {
      "Close": 15774.4,
      "Date": "2022-06-13T10:00:00.000Z",
      "High": 15886.15,
      "Low": 15684,
      "Open": 15877.55,
      "Volume": 0,
      "id": 30
    },
    {
      "Close": 15732.1,
      "Date": "2022-06-14T10:00:00.000Z",
      "High": 15858,
      "Low": 15659.45,
      "Open": 15674.25,
      "Volume": 0,
      "id": 31
    },
    {
      "Close": 15692.15,
      "Date": "2022-06-15T10:00:00.000Z",
      "High": 15783.65,
      "Low": 15678.9,
      "Open": 15729.25,
      "Volume": 0,
      "id": 32
    },
    {
      "Close": 15360.6,
      "Date": "2022-06-16T10:00:00.000Z",
      "High": 15863.15,
      "Low": 15335.1,
      "Open": 15832.25,
      "Volume": 0,
      "id": 33
    },
    {
      "Close": 15293.5,
      "Date": "2022-06-17T10:00:00.000Z",
      "High": 15400.4,
      "Low": 15183.4,
      "Open": 15272.65,
      "Volume": 0,
      "id": 34
    },
    {
      "Close": 15350.15,
      "Date": "2022-06-20T10:00:00.000Z",
      "High": 15382.5,
      "Low": 15191.1,
      "Open": 15334.5,
      "Volume": 0,
      "id": 35
    },
    {
      "Close": 15638.8,
      "Date": "2022-06-21T10:00:00.000Z",
      "High": 15707.25,
      "Low": 15419.85,
      "Open": 15455.95,
      "Volume": 0,
      "id": 36
    }
  ]
*/
  var dataReqdFormat = {
    labels: [],
    datasets: [{
      data: [],
      label: "Nifty",
      fill: true,
      borderColor: (ctx) => {
        const data = ctx.chart.data.datasets[ctx.datasetIndex].data;
        return data[0] >= data[data.length - 1] ? 'red' : 'green'
      }
    }]
  };
  if(!dataset) dataset = {};
  Object.keys(dataset).length !== 0 && dataset.forEach((datapoint) => {
    dataReqdFormat.labels.push(datapoint.Date.split('T')[0]);
    dataReqdFormat.datasets[0].data.push(datapoint.Close);
  })

  const [duration, setDuration] = React.useState(dataset.length);
  const [chartData, setChartData] = React.useState();

  const changeData = (duration) => {
    setDuration(duration);
    //console.log(dataReqdFormat);
    var tempData = dataReqdFormat;
    tempData.labels = dataReqdFormat.labels.slice(-duration);
    for (var i = 0; i < dataReqdFormat.datasets.length; i++) {
      tempData.datasets[i].data = dataReqdFormat.datasets[i].data.slice(-duration);
    }
    //console.log(tempData);
    setChartData(tempData);
  }

  useEffect(() => {
    changeData(30);
  }, [])

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },

  };

  return (
    <div>
<Grid sx={{alignItems:"center"}}>
      <Button onClick={() => changeData(3)} variant={duration === 3 ? "red" : "white"} style={{ margin: "5px", marginBottom: "0", background: "white", color: "black" }}>
        3D
      </Button>
      <Button onClick={() => changeData(7)} variant={duration === 7 ? "contained" : "outlined"} style={{ margin: "5px", marginBottom: "0", background: "white", color: "black" }}>
        1W
      </Button>
      <Button onClick={() => changeData(30)} variant={duration === 30 ? "contained" : "outlined"} style={{ margin: "5px", marginBottom: "0", background: "white", color: "black" }}>
        1M
      </Button>

      {chartData && <Line data={chartData} options={options} />}      </Grid>


    </div>
  )
}