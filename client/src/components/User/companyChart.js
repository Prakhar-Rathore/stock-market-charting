
import React, { useEffect } from "react";
import { Paper, Grid, Box, getOffsetTop, Modal, TextField, Checkbox } from '@mui/material'
import apiCall from "../../apiCall/apiCall";

import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Button, Typography } from "@mui/material";
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useNavigate } from 'react-router-dom';
import AddCircle from "@mui/icons-material/AddCircle";

ChartJS.register(...registerables);

export default function CompanyChart({ dataset, companyName }) {
  const navigate = useNavigate();
  const handleClick=()=>{
    navigate('/compare',{state:{id:1,name:{companyName}}});
   
   }
  var backgroundColor = ["#71FE74"];


  if (dataset) {
    for (let i = 1; i < dataset.length; i++) {
      if (dataset[i].close < dataset[i - 1].close) {
        backgroundColor.push("#FB6A33");
      }
      else {
        backgroundColor.push("#71FE74");
      }
    }
  }

  var dataReqdFormat = dataset ? {
    labels: [],
    datasets: [{
      data: [],
      label: "Price",
      fill: false,
      type: "line",
      borderColor: "#1CD4FA",
      yAxisID: "price",
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      pointRadius: 10,
      pointBackgroundColor: 'rgba(255, 255, 255, 0)'
    },
    {
      data: [],
      label: "Volume",
      fill: true,
      type: "bar",
      yAxisID: "volume",
      backgroundColor: backgroundColor
    }]
  } : null;

  dataset && Object.keys(dataset).length !== 0 && dataset.forEach((datapoint) => {
    dataReqdFormat.labels.push(datapoint.date.split('T')[0]);
    dataReqdFormat.datasets[0].data.push(datapoint.close ? datapoint.close : null);
    dataReqdFormat.datasets[1].data.push(datapoint.volume ? datapoint.volume : null);
  })

  const [duration, setDuration] = React.useState(dataset ? dataset.length : 0);
  const [chartData, setChartData] = React.useState(dataReqdFormat);
  const [sDate, setSDate] = React.useState("");
  const [eDate, setEDate] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [isPriceChecked, setIsPriceChecked] = React.useState(true);
  const [currentDataset, setCurrentDataset] = React.useState(dataset);
  const [is50dmaChecked, setIs50dmaChecked] = React.useState(false);
  const [is200dmaChecked, setIs200dmaChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const changeData = async (duration) => {
    setLoading(true);
    setDuration(duration);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const endDate = new Date();
    const startDate = new Date();
    endDate.setDate(endDate.getDate());
    startDate.setDate(endDate.getDate() - duration);
    var year = endDate.getFullYear();
    var month = months[endDate.getMonth()];
    var date = endDate.getDate();
    const end = month + " " + date + ", " + year;
    year = startDate.getFullYear();
    month = months[startDate.getMonth()];
    date = startDate.getDate();
    const start = month + " " + date + ", " + year;
    // console.log(start)
    // console.log(end)
    const res = await apiCall(
      "https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/historical/historical/historicalDataByDates?companyName=" + companyName + "&seCode=NSE&startDate=" + start + "&endDate=" + end,
      "GET",
      null
    )
    // console.log("https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/historical/historical/historicalDataByDates?companyName=" + companyName + "&seCode=NSE&startDate=" + start + "&endDate=" + end)
    if (res.status === 200) {
      // console.log(res.data);
      dataset = res.data.data
      setCurrentDataset(dataset);
      dataReqdFormat = {
        labels: [],
        datasets: [{
          data: [],
          label: "Price",
          fill: false,
          type: "line",
          borderColor: "#1CD4FA",
          yAxisID: "price",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        },
        {
          data: [],
          label: "Volume",
          fill: true,
          type: "bar",
          yAxisID: "volume",
          backgroundColor: backgroundColor
        },
        {
          data: [],
          label: "50 DMA",
          fill: false,
          type: "line",
          yAxisID: "price",
          borderColor: "#b800e6",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        },
        {
          data: [],
          label: "200 DMA",
          fill: false,
          type: "line",
          yAxisID: "price",
          borderColor: "#7a0099",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        }]
      }
      Object.keys(dataset).length !== 0 && dataset.forEach((datapoint) => {
        dataReqdFormat.labels.push(datapoint.date.split('T')[0]);
        dataReqdFormat.datasets[0].data.push(datapoint.close ? datapoint.close : null);
        dataReqdFormat.datasets[1].data.push(datapoint.volume ? datapoint.volume : null);
        if (is50dmaChecked) dataReqdFormat.datasets[2].data.push(datapoint["50 dma"] ? datapoint["50 dma"] : null);
        if (is200dmaChecked) dataReqdFormat.datasets[3].data.push(datapoint["200 dma"] ? datapoint["200 dma"] : null);
      })
    }
    // console.log(dataset);
    let bgColor = ["#76FF77"];
    for (let i = 1; i < dataReqdFormat.datasets[0].data.length; i++) {
      if (dataReqdFormat.datasets[0].data[i] < dataReqdFormat.datasets[0].data[i - 1]) {
        bgColor.push("#FB6A33");
      }
      else {
        bgColor.push("#76FF77");
      }
    }
    dataReqdFormat.datasets[1].backgroundColor = bgColor;
    // console.log(dataReqdFormat);
    setChartData(dataReqdFormat);
    setStartDate("");
    setEndDate("");
    setSDate("");
    setEDate("");
    setLoading(false);
  }

  const handleDateChange = (event, label) => {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const temp = new Date(event.target.value);
    const date = months[temp.getMonth()] + " " + temp.getDate() + ", " + temp.getFullYear();

    if (label === "from") {
      setStartDate(event.target.value);
      setSDate(date);
    }

    else if (label === "to") {
      setEndDate(event.target.value);
      setEDate(date);
    }
  }

  const togglePriceShown = () => {
    setLoading(true);
    if (isPriceChecked) {
      var tempChart = chartData;
      tempChart.datasets[0].data.splice(0, tempChart.datasets[0].data.length)
      setChartData(tempChart)
    }
    else {
      dataReqdFormat = {
        labels: [],
        datasets: [{
          data: [],
          label: "Price",
          fill: false,
          type: "line",
          borderColor: "#1CD4FA",
          yAxisID: "price",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        },
        {
          data: [],
          label: "Volume",
          fill: true,
          type: "bar",
          yAxisID: "volume",
          backgroundColor: backgroundColor
        },
        {
          data: [],
          label: "50 DMA",
          fill: false,
          type: "line",
          yAxisID: "price",
          borderColor: "#b800e6",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        },
        {
          data: [],
          label: "200 DMA",
          fill: false,
          type: "line",
          yAxisID: "price",
          borderColor: "#7a0099",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        }]
      };
      Object.keys(currentDataset).length !== 0 && currentDataset.forEach((datapoint) => {
        dataReqdFormat.labels.push(datapoint.date.split('T')[0]);
        dataReqdFormat.datasets[0].data.push(datapoint.close ? datapoint.close : null);
        dataReqdFormat.datasets[1].data.push(datapoint.volume ? datapoint.volume : null);
        if (is50dmaChecked) dataReqdFormat.datasets[2].data.push(datapoint["50 dma"] ? datapoint["50 dma"] : null);
        if (is200dmaChecked) dataReqdFormat.datasets[3].data.push(datapoint["200 dma"] ? datapoint["200 dma"] : null);
      })
      setChartData(dataReqdFormat)
    }
    // console.log(dataReqdFormat);
    setIsPriceChecked(!isPriceChecked);
    setLoading(false);
  }

  const toggle50Dma = () => {
    setLoading(true);
    if (is50dmaChecked) {
      var tempChart = chartData;
      tempChart.datasets[2].data.splice(0, tempChart.datasets[2].data.length)
      setChartData(tempChart)
    }
    else {
      dataReqdFormat = {
        labels: [],
        datasets: [{
          data: [],
          label: "Price",
          fill: false,
          type: "line",
          borderColor: "#1CD4FA",
          yAxisID: "price",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        },
        {
          data: [],
          label: "Volume",
          fill: true,
          type: "bar",
          yAxisID: "volume",
          backgroundColor: backgroundColor
        },
        {
          data: [],
          label: "50 DMA",
          fill: false,
          type: "line",
          yAxisID: "price",
          borderColor: "#b800e6",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        },
        {
          data: [],
          label: "200 DMA",
          fill: false,
          type: "line",
          yAxisID: "price",
          borderColor: "#7a0099",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        }]
      };
      Object.keys(currentDataset).length !== 0 && currentDataset.forEach((datapoint) => {
        dataReqdFormat.labels.push(datapoint.date.split('T')[0]);
        if (isPriceChecked) dataReqdFormat.datasets[0].data.push(datapoint.close ? datapoint.close : null);
        dataReqdFormat.datasets[1].data.push(datapoint.volume ? datapoint.volume : null);
        dataReqdFormat.datasets[2].data.push(datapoint["50 dma"] ? datapoint["50 dma"] : null);
        if (is200dmaChecked) dataReqdFormat.datasets[3].data.push(datapoint["200 dma"] ? datapoint["200 dma"] : null);
      })
      setChartData(dataReqdFormat)
    }
    // console.log(dataReqdFormat);
    setIs50dmaChecked(!is50dmaChecked);
    setLoading(false);
  }

  const toggle200Dma = () => {
    setLoading(true);
    if (is200dmaChecked) {
      var tempChart = chartData;
      tempChart.datasets[3].data.splice(0, tempChart.datasets[3].data.length)
      setChartData(tempChart)
    }
    else {
      dataReqdFormat = {
        labels: [],
        datasets: [{
          data: [],
          label: "Price",
          fill: false,
          type: "line",
          borderColor: "#1CD4FA",
          yAxisID: "price",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        },
        {
          data: [],
          label: "Volume",
          fill: true,
          type: "bar",
          yAxisID: "volume",
          backgroundColor: backgroundColor
        },
        {
          data: [],
          label: "50 DMA",
          fill: false,
          type: "line",
          yAxisID: "price",
          borderColor: "#b800e6",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        },
        {
          data: [],
          label: "200 DMA",
          fill: false,
          type: "line",
          yAxisID: "price",
          borderColor: "#7a0099",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        }]
      };
      Object.keys(currentDataset).length !== 0 && currentDataset.forEach((datapoint) => {
        dataReqdFormat.labels.push(datapoint.date.split('T')[0]);
        if (isPriceChecked) dataReqdFormat.datasets[0].data.push(datapoint.close ? datapoint.close : null);
        dataReqdFormat.datasets[1].data.push(datapoint.volume ? datapoint.volume : null);
        if (is50dmaChecked) dataReqdFormat.datasets[2].data.push(datapoint["50 dma"] ? datapoint["50 dma"] : null);
        dataReqdFormat.datasets[3].data.push(datapoint["200 dma"] ? datapoint["200 dma"] : null);
      })
      setChartData(dataReqdFormat)
    }
    setIs200dmaChecked(!is200dmaChecked);
    setLoading(false);
  }


  const handleDateRangeQuery = async () => {
    setLoading(true);
    const res = await apiCall(
      "https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/historical/historical/historicalDataByDates?companyName=" + companyName + "&seCode=NSE&startDate=" + sDate + "&endDate=" + eDate,
      "GET",
      null
    )
    // console.log("https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/historical/historical/historicalDataByDates?companyName=" + companyName + "&seCode=NSE&startDate=" + sDate + "&endDate=" + eDate)
    if (res.status === 200) {
      // console.log(res.data.data);
      dataset = res.data.data;
      setCurrentDataset(dataset);
      dataReqdFormat = {
        labels: [],
        datasets: [{
          data: [],
          label: "Price",
          fill: false,
          type: "line",
          borderColor: "#1CD4FA",
          yAxisID: "price",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        },
        {
          data: [],
          label: "Volume",
          fill: true,
          type: "bar",
          yAxisID: "volume",
          backgroundColor: backgroundColor
        },
        {
          data: [],
          label: "50 DMA",
          fill: false,
          type: "line",
          yAxisID: "price",
          borderColor: "#b800e6",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        },
        {
          data: [],
          label: "200 DMA",
          fill: false,
          type: "line",
          yAxisID: "price",
          borderColor: "#7a0099",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        }]
      };
      // console.log(dataset);
      Object.keys(dataset).length !== 0 && dataset.forEach((datapoint) => {
        dataReqdFormat.labels.push(datapoint.date.split('T')[0]);
        dataReqdFormat.datasets[0].data.push(datapoint.close ? datapoint.close : null);
        dataReqdFormat.datasets[1].data.push(datapoint.volume ? datapoint.volume : null);
        if (is50dmaChecked) dataReqdFormat.datasets[2].data.push(datapoint["50 dma"] ? datapoint["50 dma"] : null);
        if (is200dmaChecked) dataReqdFormat.datasets[3].data.push(datapoint["200 dma"] ? datapoint["200 dma"] : null);
      })
    }
    let bgColor = ["#76FF77"];
    for (let i = 1; i < dataReqdFormat.datasets[0].data.length; i++) {
      if (dataReqdFormat.datasets[0].data[i] < dataReqdFormat.datasets[0].data[i - 1]) {
        bgColor.push("#FB6A33");
      }
      else {
        bgColor.push("#76FF77");
      }
    }
    dataReqdFormat.datasets[1].backgroundColor = bgColor;
    // console.log(dataReqdFormat);
    setChartData(dataReqdFormat);
    setDuration(currentDataset.length);
    setLoading(false);
  }

  const titleTooltip = (tooltipItems) => {
    return "";
  }

  const labelTooltip = (tooltipItems) => {
    const temp = dataset.filter(datasetItem => datasetItem.date.split('T')[0] === tooltipItems.label)[0]
    const volTemp = temp.volume / 1000000;
    var text = [`Date:  \t ${temp.date.split('T')[0]}`, `Open:  \t ${temp.open}`, `Close:  \t ${temp.close}`, `High:   \t ${temp.high}`, `Low:    \t ${temp.low}`, `Volume:\t ${volTemp.toFixed(2)}M`]
    if (is50dmaChecked) text.push(`50 DMA: \t ${temp["50 dma"] ? temp["50 dma"] : "N/A"}`);
    if (is200dmaChecked) text.push(`200 DMA: \t ${temp["200 dma"] ? temp["200 dma"] : "N/A"}`);
    return text;
  }


  const options = {
    responsive: true,
    spanGaps: true,
    scales: {
      x: {
        title: {
          text: "Date",
          display: true
        },
        grid: {
          display: false
        }
      },
      price: {
        position: 'right',
        grid: {
          borderColor: 'white',
          color: '#097BEB'
        },
        title: {
          text: "Price",
          display: true
        }
      },
      volume: {
        title: {
          text: "Volume",
          display: true
        },
        position: 'left',
        grid: {
          borderColor: 'white',
          color: '#097BEB',
          display: false
        },
        ticks: {
          callback: (value, index, values) => {
            return value / 1000000 + 'M';
          }
        },
        grace: '50%'
      }
    },
    plugins: {
      tooltip: {
        yAlign: 'top',
        xAlign: 'left',
        callbacks: {
          title: titleTooltip,
          label: labelTooltip
        },
        displayColors: false
      },
      legend: {
        display: false
      }
    },
  };

  const tooltipLine = {
    id: 'tooltipLine',
    afterDraw: chart => {
      if (chart.tooltip && chart.tooltip._active.length) {
        const ctx = chart.ctx
        ctx.save();
        const activePoint = typeof chart.tooltip !== "undefined" ? chart.tooltip._active[0] : 0;
        // console.log(chart.chartArea);

        ctx.beginPath();
        ctx.setLineDash([5, 7]);
        ctx.moveTo(activePoint.element.x, chart.chartArea.top);
        ctx.lineTo(activePoint.element.x, activePoint.element.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#136BC5';
        ctx.stroke();
        ctx.restore();

        ctx.beginPath();
        // ctx.setLineDash([5, 7]);
        ctx.moveTo(activePoint.element.x, activePoint.element.y);
        // console.log(chart)
        ctx.lineTo(activePoint.element.x, chart.chartArea.bottom);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#136BC5';
        ctx.stroke();
        ctx.restore();

        ctx.beginPath();
        ctx.setLineDash([5, 7]);
        ctx.moveTo(chart.chartArea.left, activePoint.element.y);
        ctx.lineTo(activePoint.element.x, activePoint.element.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#136BC5';
        ctx.stroke();
        ctx.restore();

        ctx.beginPath();
        ctx.setLineDash([5, 7]);
        ctx.moveTo(activePoint.element.x, activePoint.element.y);
        ctx.lineTo(chart.chartArea.right, activePoint.element.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#136BC5';
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  const plugins = [tooltipLine];

  if (loading) {
    return (
      <div color="white">Updating charts</div>
    )
  }
  else if (chartData) {
    return (
      <div>
        <Grid sx={{ textAlign: "center", backgroundColor: "#04122F" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <div style={{ border: "1px solid white", margin: "20px", marginBottom: 0, marginLeft: "30px", height: "max-content" }}>
              <Button onClick={() => changeData(7)} style={{ marginBottom: "0", color: "white", border: 0, padding: "10px 16px", backgroundColor: duration === 7 ? 'hsl(236deg 96% 70% / 8%)' : "transparent" }}>
                1W
              </Button>
              <Button onClick={() => changeData(30)} style={{ marginBottom: "0", color: "white", border: 0, padding: "10px 16px", backgroundColor: duration === 30 ? 'hsl(236deg 96% 70% / 8%)' : "transparent" }}>
                1M
              </Button>
              <Button onClick={() => changeData(365)} style={{ marginBottom: "0", color: "white", border: 0, padding: "10px 16px", backgroundColor: duration === 365 ? 'hsl(236deg 96% 70% / 8%)' : "transparent" }}>
                1Y
              </Button>
              <Button   onClick={handleClick} style={{ marginBottom: "0", color: "white", border: 0, padding: "10px 16px", backgroundColor: duration === 365 ? 'hsl(236deg 96% 70% / 8%)' : "transparent" }} startIcon={<AddCircle/>}>
                Compare
              </Button>
            </div>

            <div style={{ display: "inline", fontWeight: "500", fontSize: "0.875rem", color: "white", margin: "20px", marginRight: "30px" }}>
              <DateRangeIcon fontSize="small" style={{ verticalAlign: "text-bottom" }} />
              <span>Date Range</span>

              <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
                <span>From</span>
                <input type="date" value={startDate} onChange={(event) => handleDateChange(event, "from")} style={{ backgroundColor: "#04122F", border: "1px solid white", marginLeft: "5px", color: "white" }} />
              </div>

              <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
                <span>To</span>
                <input type="date" value={endDate} onChange={(event) => handleDateChange(event, "to")} style={{ backgroundColor: "#04122F", border: "1px solid white", marginLeft: "5px", color: "white" }} />
              </div>

              <Button style={{ marginBottom: "0", color: "white", border: 0 }} onClick={handleDateRangeQuery} >
                Submit
              </Button>
            </div>
          </div>
          {chartData && <Chart data={chartData} options={options} plugins={plugins} />}
          <div style={{ fontSize: "0.875rem", color: "white" }}>
            <Checkbox id="price" checked={isPriceChecked} onClick={togglePriceShown} style={{ color: "white" }} />
            <span>Price</span>

            <Checkbox id="price" checked={is50dmaChecked} onClick={toggle50Dma} style={{ color: "white" }} />
            <span>50 dma</span>

            <Checkbox id="price" checked={is200dmaChecked} onClick={toggle200Dma} style={{ color: "white" }} />
            <span>200 dma</span>

            <Checkbox id="price" checked={true} disabled style={{ color: "white" }} />
            <span>Volume</span>
          </div>
        </Grid>


      </div>
    )
  }
  else {
    return (
      <div color="white">No historical data for the company</div>
    )
  }
}