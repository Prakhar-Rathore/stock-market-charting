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
  var dataReqdFormat = {
    labels: [],
    datasets: [{
      data: [],
      label: "Sensex",
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
   // console.log(dataReqdFormat);
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