import React, { useEffect } from "react";
import { Paper, Grid, Box, getOffsetTop, Modal, TextField, Checkbox } from '@mui/material'
import apiCall from "../../apiCall/apiCall";

import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Button, Typography } from "@mui/material";
import DateRangeIcon from '@mui/icons-material/DateRange';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

export default function CompanyChart({ dataset, dataset2, dataset3, dataset4, companyName, companyName2,companyName3,companyName4 }) {
console.log(companyName)
console.log(companyName2)
console.log(companyName3)
console.log(companyName4)
console.log(dataset3)
console.log(dataset4)
 
if(dataset3 && dataset4 && dataset && dataset2){
  console.log("hi")
  var dataReqdFormat = {
    labels: [],
    datasets: [{
      data: [],
      label: companyName,
      fill: true,
      type: "line",
      borderColor: "#FFFF00",
      yAxisID: "price",
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      pointRadius: 10,
      pointBackgroundColor: 'rgba(255, 255, 255, 0)'
    },
    {
      data: [],
      label: companyName2,
      fill: true,
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
      label: companyName3,
      fill: true,
      type: "line",
      borderColor: "#FFA500",
      yAxisID: "price",
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      pointRadius: 10,
      pointBackgroundColor: 'rgba(255, 255, 255, 0)'
    },
    {
      data: [],
      label: companyName4,
      fill: true,
      type: "line",
      borderColor: "#D3D3D3",
      yAxisID: "price",
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      pointRadius: 10,
      pointBackgroundColor: 'rgba(255, 255, 255, 0)'
    }]
  };

var prev=0;
var c=0;
Object.keys(dataset).length !== 0 && dataset.forEach((datapoint) => {
  dataReqdFormat.labels.push(datapoint.date.split('T')[0]);
 c++;
 if(c===1) {
  var perCh=0;
  dataReqdFormat.datasets[0].data.push(perCh);
 prev=datapoint.close;
}
 else{
  var perCh=(datapoint.close-prev)/prev*100;
  dataReqdFormat.datasets[0].data.push(perCh);
  prev=datapoint.close;}

})
prev=0;
c=0;


Object.keys(dataset2).length !== 0 && dataset2.forEach((datapoint) => {
  c++; 
  
  if(c===1) {
   var perCh=0;
   dataReqdFormat.datasets[1].data.push(perCh);
  prev=datapoint.close;
 }
  else{
   var perCh=(datapoint.close-prev)/prev*100;
   dataReqdFormat.datasets[1].data.push(perCh);
   prev=datapoint.close;}
})

prev=0;
c=0;

Object.keys(dataset3).length !== 0 && dataset3.forEach((datapoint) => {
 c++;
 if(c===1) {
  var perCh=0;
  dataReqdFormat.datasets[2].data.push(perCh);
 prev=datapoint.close;
}
 else{
  var perCh=(datapoint.close-prev)/prev*100;
  dataReqdFormat.datasets[2].data.push(perCh);
  prev=datapoint.close;}

})
prev=0;
c=0;


Object.keys(dataset4).length !== 0 && dataset4.forEach((datapoint) => {
 c++;
 if(c===1) {
  var perCh=0;
  dataReqdFormat.datasets[3].data.push(perCh);
 prev=datapoint.close;
}
 else{
  var perCh=(datapoint.close-prev)/prev*100;
  dataReqdFormat.datasets[3].data.push(perCh);
  prev=datapoint.close;}

})
}

if(dataset3 && typeof dataset4==='undefined' &&  typeof dataset3!=='undefined'){
  var dataReqdFormat = {
    labels: [],
    datasets: [{
      data: [],
      label: companyName,
      fill: true,
      type: "line",
      borderColor: "#FFFF00",
      yAxisID: "price",
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      pointRadius: 10,
      pointBackgroundColor: 'rgba(255, 255, 255, 0)'
    },
    {
      data: [],
      label: companyName2,
      fill: true,
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
      label: companyName3,
      fill: true,
      type: "line",
      borderColor: "#FFA500",
      yAxisID: "price",
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      pointRadius: 10,
      pointBackgroundColor: 'rgba(255, 255, 255, 0)'
    },]
  };

var prev=0;
var c=0;
Object.keys(dataset).length !== 0 && dataset.forEach((datapoint) => {
  dataReqdFormat.labels.push(datapoint.date.split('T')[0]);
 c++;
 if(c===1) {
  var perCh=0;
  dataReqdFormat.datasets[0].data.push(perCh);
 prev=datapoint.close;
}
 else{
  var perCh=(datapoint.close-prev)/prev*100;
  dataReqdFormat.datasets[0].data.push(perCh);
  prev=datapoint.close;}

})
prev=0;
c=0;


Object.keys(dataset2).length !== 0 && dataset2.forEach((datapoint) => {
  c++; 
  
  if(c===1) {
   var perCh=0;
   dataReqdFormat.datasets[1].data.push(perCh);
  prev=datapoint.close;
 }
  else{
   var perCh=(datapoint.close-prev)/prev*100;
   dataReqdFormat.datasets[1].data.push(perCh);
   prev=datapoint.close;}
})

prev=0;
c=0;

Object.keys(dataset3).length !== 0 && dataset3.forEach((datapoint) => {
 c++;
 if(c===1) {
  var perCh=0;
  dataReqdFormat.datasets[2].data.push(perCh);
 prev=datapoint.close;
}
 else{
  var perCh=(datapoint.close-prev)/prev*100;
  dataReqdFormat.datasets[2].data.push(perCh);
  prev=datapoint.close;}

})
prev=0;
c=0;

}

if(dataset && dataset2 && typeof dataset3==='undefined'){
  var dataReqdFormat = {
    labels: [],
    datasets: [{
      data: [],
      label: companyName,
      fill: true,
      type: "line",
      borderColor: "#FFFF00",
      yAxisID: "price",
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      pointRadius: 10,
      pointBackgroundColor: 'rgba(255, 255, 255, 0)'
    },
    {
      data: [],
      label: companyName2,
      fill: true,
      type: "line",
      borderColor: "#1CD4FA",
      yAxisID: "price",
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      pointRadius: 10,
      pointBackgroundColor: 'rgba(255, 255, 255, 0)'
    },
    ]
  };

var prev=0;
var c=0;
Object.keys(dataset).length !== 0 && dataset.forEach((datapoint) => {
  dataReqdFormat.labels.push(datapoint.date.split('T')[0]);
 c++;
 if(c===1) {
  var perCh=0;
  dataReqdFormat.datasets[0].data.push(perCh);
 prev=datapoint.close;
}
 else{
  var perCh=(datapoint.close-prev)/prev*100;
  dataReqdFormat.datasets[0].data.push(perCh);
  prev=datapoint.close;}

})
prev=0;
c=0;


Object.keys(dataset2).length !== 0 && dataset2.forEach((datapoint) => {
  c++; 
  
  if(c===1) {
   var perCh=0;
   dataReqdFormat.datasets[1].data.push(perCh);
  prev=datapoint.close;
 }
  else{
   var perCh=(datapoint.close-prev)/prev*100;
   dataReqdFormat.datasets[1].data.push(perCh);
   prev=datapoint.close;}
})

}

  const [duration, setDuration] = React.useState(dataset.length);
  const [chartData, setChartData] = React.useState(dataReqdFormat);
  const [sDate, setSDate] = React.useState("");
  const [eDate, setEDate] = React.useState("");
  const [isPriceChecked, setIsPriceChecked] = React.useState(true);
  const [currentDataset, setCurrentDataset] = React.useState(dataset);
  const [currentDataset2, setCurrentDataset2] = React.useState(dataset2);
  const [currentDataset3, setCurrentDataset3] = React.useState(dataset2);
  const [currentDataset4, setCurrentDataset4] = React.useState(dataset2);


  const changeData = async (duration) => {
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
    const res2 = await apiCall(
      "https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/historical/historical/historicalDataByDates?companyName=" + companyName2 + "&seCode=NSE&startDate=" + start + "&endDate=" + end,
      "GET",
      null
    )
    const res3 = await apiCall(
      "https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/historical/historical/historicalDataByDates?companyName=" + companyName3 + "&seCode=NSE&startDate=" + start + "&endDate=" + end,
      "GET",
      null
    )
    const res4 = await apiCall(
      "https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/historical/historical/historicalDataByDates?companyName=" + companyName4 + "&seCode=NSE&startDate=" + start + "&endDate=" + end,
      "GET",
      null
    )
    console.log(res2.status)
    console.log(res4.status)

    if (res.status === 200 && res2.status===200 && res3.status===200 && res4.status===200 && typeof dataset4!=='undefined' && typeof dataset3!=='undefined' ){
      //console.log(res.data);
      dataset = res.data.data
      dataset2=res2.data.data
      dataset3=res3.data.data
      dataset4=res4.data.data
      setCurrentDataset(dataset);
      setCurrentDataset2(dataset2);
      setCurrentDataset3(dataset3);
      setCurrentDataset4(dataset4);

      dataReqdFormat = {
        labels: [],
        datasets: [{
          data: [],
          label: companyName,
          fill: true,
          type: "line",
          borderColor: "#FFFF00",
          yAxisID: "price",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        },
        {
          data: [],
          label: companyName2,
          fill: true,
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
          label: companyName3,
          fill: true,
          type: "line",
          borderColor: "#FFA500",
          yAxisID: "price",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        },
        {
          data: [],
          label: companyName4,
          fill: true,
          type: "line",
          borderColor: "#D3D3D3",
          yAxisID: "price",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        }]
      }
      var prev=0;
      var c=0;
      Object.keys(dataset).length !== 0 && dataset.forEach((datapoint) => {
        dataReqdFormat.labels.push(datapoint.date.split('T')[0]);
       c++; 
       if(c===1) {
        var perCh=0;
        console.log(c,perCh, prev, datapoint.close)
        dataReqdFormat.datasets[0].data.push(perCh);
       prev=datapoint.close;
      }
       else{
        var perCh=(datapoint.close-prev)/prev*100;
        console.log(c,perCh, prev, datapoint.close)
        dataReqdFormat.datasets[0].data.push(perCh);
        prev=datapoint.close;}

      })
      prev=0;
      c=0;
      Object.keys(dataset2).length !== 0 && dataset2.forEach((datapoint) => {
        c++; 
        if(c===1) {
         var perCh=0;
         console.log(c,perCh)
         dataReqdFormat.datasets[1].data.push(perCh);
        prev=datapoint.close;
       }
        else{
         var perCh=(datapoint.close-prev)/prev*100;
         console.log(c,perCh)
         dataReqdFormat.datasets[1].data.push(perCh);
         prev=datapoint.close;}
      })
      prev=0;
      c=0;

Object.keys(dataset3).length !== 0 && dataset3.forEach((datapoint) => {
 c++;
 if(c===1) {
  var perCh=0;
  dataReqdFormat.datasets[2].data.push(perCh);
 prev=datapoint.close;
}
 else{
  var perCh=(datapoint.close-prev)/prev*100;
  dataReqdFormat.datasets[2].data.push(perCh);
  prev=datapoint.close;}

})
prev=0;
c=0;

Object.keys(dataset4).length !== 0 && dataset4.forEach((datapoint) => {
 c++;
 if(c===1) {
  var perCh=0;
  dataReqdFormat.datasets[3].data.push(perCh);
 prev=datapoint.close;
}
 else{
  var perCh=(datapoint.close-prev)/prev*100;
  dataReqdFormat.datasets[3].data.push(perCh);
  prev=datapoint.close;}

})
}
if (res.status === 200 && res2.status===200 && res3.status===200 && typeof dataset4==='undefined'  &&  typeof dataset3!=='undefined') {
  //console.log(res.data);
  dataset = res.data.data
  dataset2=res2.data.data
  dataset3=res3.data.data
  setCurrentDataset(dataset);
  setCurrentDataset2(dataset2);
  setCurrentDataset3(dataset3);

  dataReqdFormat = {
    labels: [],
    datasets: [{
      data: [],
      label: companyName,
      fill: true,
      type: "line",
      borderColor: "#FFFF00",
      yAxisID: "price",
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      pointRadius: 10,
      pointBackgroundColor: 'rgba(255, 255, 255, 0)'
    },
    {
      data: [],
      label: companyName2,
      fill: true,
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
      label: companyName3,
      fill: true,
      type: "line",
      borderColor: "#FFA500",
      yAxisID: "price",
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      pointRadius: 10,
      pointBackgroundColor: 'rgba(255, 255, 255, 0)'
    },
    ]
  }
  var prev=0;
  var c=0;
  Object.keys(dataset).length !== 0 && dataset.forEach((datapoint) => {
    dataReqdFormat.labels.push(datapoint.date.split('T')[0]);
   c++; 
   if(c===1) {
    var perCh=0;
    console.log(c,perCh, prev, datapoint.close)
    dataReqdFormat.datasets[0].data.push(perCh);
   prev=datapoint.close;
  }
   else{
    var perCh=(datapoint.close-prev)/prev*100;
    console.log(c,perCh, prev, datapoint.close)
    dataReqdFormat.datasets[0].data.push(perCh);
    prev=datapoint.close;}

  })
  prev=0;
  c=0;
  Object.keys(dataset2).length !== 0 && dataset2.forEach((datapoint) => {
    c++; 
    if(c===1) {
     var perCh=0;
     console.log(c,perCh)
     dataReqdFormat.datasets[1].data.push(perCh);
    prev=datapoint.close;
   }
    else{
     var perCh=(datapoint.close-prev)/prev*100;
     console.log(c,perCh)
     dataReqdFormat.datasets[1].data.push(perCh);
     prev=datapoint.close;}
  })
  prev=0;
  c=0;

Object.keys(dataset3).length !== 0 && dataset3.forEach((datapoint) => {
c++;
if(c===1) {
var perCh=0;
dataReqdFormat.datasets[2].data.push(perCh);
prev=datapoint.close;
}
else{
var perCh=(datapoint.close-prev)/prev*100;
dataReqdFormat.datasets[2].data.push(perCh);
prev=datapoint.close;}

})
prev=0;
c=0;
}
if (res.status === 200 && res2.status===200 && typeof dataset3==='undefined') {
  //console.log(res.data);
  dataset = res.data.data
  dataset2=res2.data.data
  setCurrentDataset(dataset);
  setCurrentDataset2(dataset2);

  dataReqdFormat = {
    labels: [],
    datasets: [{
      data: [],
      label: companyName,
      fill: true,
      type: "line",
      borderColor: "#FFFF00",
      yAxisID: "price",
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      pointRadius: 10,
      pointBackgroundColor: 'rgba(255, 255, 255, 0)'
    },
    {
      data: [],
      label: companyName2,
      fill: true,
      type: "line",
      borderColor: "#1CD4FA",
      yAxisID: "price",
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      pointRadius: 10,
      pointBackgroundColor: 'rgba(255, 255, 255, 0)'
    },
   ]
  }
  var prev=0;
  var c=0;
  Object.keys(dataset).length !== 0 && dataset.forEach((datapoint) => {
    dataReqdFormat.labels.push(datapoint.date.split('T')[0]);
   c++; 
   if(c===1) {
    var perCh=0;
    dataReqdFormat.datasets[0].data.push(perCh);
   prev=datapoint.close;
  }
   else{
    var perCh=(datapoint.close-prev)/prev*100;
    dataReqdFormat.datasets[0].data.push(perCh);
    prev=datapoint.close;}

  })
  prev=0;
  c=0;
  Object.keys(dataset2).length !== 0 && dataset2.forEach((datapoint) => {
    c++; 
    if(c===1) {
     var perCh=0;
     dataReqdFormat.datasets[1].data.push(perCh);
    prev=datapoint.close;
   }
    else{
     var perCh=(datapoint.close-prev)/prev*100;
     dataReqdFormat.datasets[1].data.push(perCh);
     prev=datapoint.close;}
  })
  prev=0;
  c=0;

}   
 setChartData(dataReqdFormat);
  }

  const handleDateChange = (event, label) => {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const temp = new Date(event.target.value);
    const date = months[temp.getMonth()] + " " + temp.getDate() + ", " + temp.getFullYear();

    if (label === "from") {
      setSDate(date);
    }

    else if (label === "to") {
      setEDate(date);
    }
  }



  const handleDateRangeQuery = async () => {
    const res = await apiCall(
      "https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/historical/historical/historicalDataByDates?companyName=" + companyName + "&seCode=NSE&startDate=" + sDate + "&endDate=" + eDate,
      "GET",
      null
    )
    const res2 = await apiCall(
      "https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/historical/historical/historicalDataByDates?companyName=" + companyName2 + "&seCode=NSE&startDate=" + sDate + "&endDate=" + eDate,
      "GET",
      null
    )
    const res3 = await apiCall(
      "https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/historical/historical/historicalDataByDates?companyName=" + companyName3 + "&seCode=NSE&startDate=" + sDate + "&endDate=" + eDate,
      "GET",
      null
    )
    const res4 = await apiCall(
      "https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/historical/historical/historicalDataByDates?companyName=" + companyName4 + "&seCode=NSE&startDate=" + sDate + "&endDate=" + eDate,
      "GET",
      null
    )
   
console.log(res2.status)
    if (res.status === 200 && res2.status===200 && res3.status===200 && res4.status===200 && typeof dataset4!=='undefined' && typeof dataset3!=='undefined' ) {
      dataset = res.data.data;
      dataset2 = res2.data.data;
      dataset3=res3.data.data
      dataset4=res4.data.data
      setCurrentDataset(dataset);
      setCurrentDataset2(dataset2);
      setCurrentDataset3(dataset3);
      setCurrentDataset4(dataset4);
      dataReqdFormat = {
        labels: [],
        datasets: [{
          data: [],
          label:companyName,
          fill: true,
          type: "line",
          borderColor: "#FFFF00",
          yAxisID: "price",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        },
        {
          data: [],
          label: companyName2,
          fill: true,
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
          label: companyName3,
          fill: true,
          type: "line",
          borderColor: "#FFA500",
          yAxisID: "price",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        },
        {
          data: [],
          label: companyName4,
          fill: true,
          type: "line",
          borderColor: "#D3D3D3",
          yAxisID: "price",
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          pointRadius: 10,
          pointBackgroundColor: 'rgba(255, 255, 255, 0)'
        }]
      }
  
var prev=0; var c=0;


      Object.keys(dataset).length !== 0 && dataset.forEach((datapoint) => {
        dataReqdFormat.labels.push(datapoint.date.split('T')[0]);
       c++; 
       if(c===1) {
        var perCh=0;
        dataReqdFormat.datasets[0].data.unshift(perCh);
       prev=datapoint.close;
      }
       else{
        var perCh=(datapoint.close-prev)/prev*100;
        dataReqdFormat.datasets[0].data.unshift(perCh);
        prev=datapoint.close;}

      })
      prev=0;
      c=0;
      Object.keys(dataset2).length !== 0 && dataset2.forEach((datapoint) => {
        c++; 
        if(c===1) {
         var perCh=0;
         dataReqdFormat.datasets[1].data.unshift(perCh);
        prev=datapoint.close;
       }
        else{
         var perCh=(datapoint.close-prev)/prev*100;
         dataReqdFormat.datasets[1].data.unshift(perCh);
         prev=datapoint.close;}
      })
      prev=0;
      c=0;

Object.keys(dataset3).length !== 0 && dataset3.forEach((datapoint) => {
 c++;
 if(c===1) {
  var perCh=0;
  dataReqdFormat.datasets[2].data.push(perCh);
 prev=datapoint.close;
}
 else{
  var perCh=(datapoint.close-prev)/prev*100;
  dataReqdFormat.datasets[2].data.push(perCh);
  prev=datapoint.close;}

})
prev=0;
c=0;

Object.keys(dataset4).length !== 0 && dataset4.forEach((datapoint) => {
 c++;
 if(c===1) {
  var perCh=0;
  dataReqdFormat.datasets[3].data.push(perCh);
 prev=datapoint.close;
}
 else{
  var perCh=(datapoint.close-prev)/prev*100;
  dataReqdFormat.datasets[3].data.push(perCh);
  prev=datapoint.close;}

})
}

if (res.status === 200 && res2.status===200 && res3.status===200  && typeof dataset4==='undefined' &&  typeof dataset3!=='undefined') {
  dataset = res.data.data;
  dataset2 = res2.data.data;
  dataset3=res3.data.data
  setCurrentDataset(dataset);
  setCurrentDataset2(dataset2);
  setCurrentDataset3(dataset3);
  dataReqdFormat = {
    labels: [],
    datasets: [{
      data: [],
      label:companyName,
      fill: true,
      type: "line",
      borderColor: "#FFFF00",
      yAxisID: "price",
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      pointRadius: 10,
      pointBackgroundColor: 'rgba(255, 255, 255, 0)'
    },
    {
      data: [],
      label: companyName2,
      fill: true,
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
      label: companyName3,
      fill: true,
      type: "line",
      borderColor: "#FFA500",
      yAxisID: "price",
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      pointRadius: 10,
      pointBackgroundColor: 'rgba(255, 255, 255, 0)'
    },
   ]
  }

var prev=0; var c=0;


  Object.keys(dataset).length !== 0 && dataset.forEach((datapoint) => {
    dataReqdFormat.labels.push(datapoint.date.split('T')[0]);
   c++; 
   if(c===1) {
    var perCh=0;
    dataReqdFormat.datasets[0].data.unshift(perCh);
   prev=datapoint.close;
  }
   else{
    var perCh=(datapoint.close-prev)/prev*100;
    dataReqdFormat.datasets[0].data.unshift(perCh);
    prev=datapoint.close;}

  })
  prev=0;
  c=0;
  Object.keys(dataset2).length !== 0 && dataset2.forEach((datapoint) => {
    c++; 
    if(c===1) {
     var perCh=0;
     dataReqdFormat.datasets[1].data.unshift(perCh);
    prev=datapoint.close;
   }
    else{
     var perCh=(datapoint.close-prev)/prev*100;
     dataReqdFormat.datasets[1].data.unshift(perCh);
     prev=datapoint.close;}
  })
  prev=0;
  c=0;

Object.keys(dataset3).length !== 0 && dataset3.forEach((datapoint) => {
c++;
if(c===1) {
var perCh=0;
dataReqdFormat.datasets[2].data.push(perCh);
prev=datapoint.close;
}
else{
var perCh=(datapoint.close-prev)/prev*100;
dataReqdFormat.datasets[2].data.push(perCh);
prev=datapoint.close;}

})
prev=0;
c=0;
}
if (res.status === 200 && res2.status===200 && typeof dataset3==='undefined') {
  dataset = res.data.data;
  dataset2 = res2.data.data;
  setCurrentDataset(dataset);
  setCurrentDataset2(dataset2);
  dataReqdFormat = {
    labels: [],
    datasets: [{
      data: [],
      label:companyName,
      fill: true,
      type: "line",
      borderColor: "#FFFF00",
      yAxisID: "price",
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      pointRadius: 10,
      pointBackgroundColor: 'rgba(255, 255, 255, 0)'
    },
    {
      data: [],
      label: companyName2,
      fill: true,
      type: "line",
      borderColor: "#1CD4FA",
      yAxisID: "price",
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      pointRadius: 10,
      pointBackgroundColor: 'rgba(255, 255, 255, 0)'
    },
    ]
  }

var prev=0; var c=0;


  Object.keys(dataset).length !== 0 && dataset.forEach((datapoint) => {
    dataReqdFormat.labels.push(datapoint.date.split('T')[0]);
   c++; 
   if(c===1) {
    var perCh=0;
    dataReqdFormat.datasets[0].data.unshift(perCh);
   prev=datapoint.close;
  }
   else{
    var perCh=(datapoint.close-prev)/prev*100;
    dataReqdFormat.datasets[0].data.unshift(perCh);
    prev=datapoint.close;}

  })
  prev=0;
  c=0;
  Object.keys(dataset2).length !== 0 && dataset2.forEach((datapoint) => {
    c++; 
    if(c===1) {
     var perCh=0;
     dataReqdFormat.datasets[1].data.unshift(perCh);
    prev=datapoint.close;
   }
    else{
     var perCh=(datapoint.close-prev)/prev*100;
     dataReqdFormat.datasets[1].data.unshift(perCh);
     prev=datapoint.close;}
  })
  prev=0;
  c=0;
}
    
    setChartData(dataReqdFormat);
  }

  const titleTooltip = (tooltipItems) => {
    return "";
  }

  const labelTooltip = (tooltipItems) => {
    const temp = dataset.filter(datasetItem => datasetItem.date.split('T')[0] === tooltipItems.label)[0]
    const volTemp = temp.volume / 1000000;

    const temp2 = dataset2.filter(datasetItem => datasetItem.date.split('T')[0] === tooltipItems.label)[0]
    const volTemp2 = temp2.volume / 1000000;

   if(typeof dataset3!=='undefined'  && typeof dataset4==='undefined') {
    const temp3 = dataset3.filter(datasetItem => datasetItem.date.split('T')[0] === tooltipItems.label)[0]
    const volTemp3 = temp3.volume / 1000000;
    console.log(temp3)
    const text = [`Company:\t${companyName}`,`Date:  \t ${temp.date.split('T')[0]}`, `Open:  \t ${temp.open}`, `Close:  \t ${temp.close}`, `High:   \t ${temp.high}`, `Low:    \t ${temp.low}`, `Volume:\t ${volTemp.toFixed(2)}M`,`\n`,
    `Company:\t${companyName2}`, `Date:  \t ${temp2.date.split('T')[0]}`, `Open:  \t ${temp2.open}`, `Close:  \t ${temp2.close}`, `High:   \t ${temp2.high}`, `Low:    \t ${temp2.low}`, `Volume:\t ${volTemp2.toFixed(2)}M`,`\n`,
    `Company:\t${companyName3}`, `Date:  \t ${temp3.date.split('T')[0]}`, `Open:  \t ${temp3.open}`, `Close:  \t ${temp3.close}`, `High:   \t ${temp3.high}`, `Low:    \t ${temp3.low}`, `Volume:\t ${volTemp3.toFixed(2)}M`,`\n`,
  ]
return text;
  }
    if(typeof dataset3!=='undefined' && typeof dataset4!=='undefined'){
      const temp3 = dataset3.filter(datasetItem => datasetItem.date.split('T')[0] === tooltipItems.label)[0]
      const volTemp3 = temp3.volume / 1000000;
      console.log(temp3)
      const temp4 = dataset4.filter(datasetItem => datasetItem.date.split('T')[0] === tooltipItems.label)[0]
    const volTemp4 = temp4.volume / 1000000;
    console.log(temp4)
    const text = [`Company:\t${companyName}`,`Date:  \t ${temp.date.split('T')[0]}`, `Open:  \t ${temp.open}`, `Close:  \t ${temp.close}`, `High:   \t ${temp.high}`, `Low:    \t ${temp.low}`, `Volume:\t ${volTemp.toFixed(2)}M`,`\n`,
    `Company:\t${companyName2}`, `Date:  \t ${temp2.date.split('T')[0]}`, `Open:  \t ${temp2.open}`, `Close:  \t ${temp2.close}`, `High:   \t ${temp2.high}`, `Low:    \t ${temp2.low}`, `Volume:\t ${volTemp2.toFixed(2)}M`,`\n`,
    `Company:\t${companyName3}`, `Date:  \t ${temp3.date.split('T')[0]}`, `Open:  \t ${temp3.open}`, `Close:  \t ${temp3.close}`, `High:   \t ${temp3.high}`, `Low:    \t ${temp3.low}`, `Volume:\t ${volTemp3.toFixed(2)}M`,`\n`,
    `Company:\t${companyName4}`, `Date:  \t ${temp4.date.split('T')[0]}`, `Open:  \t ${temp4.open}`, `Close:  \t ${temp4.close}`, `High:   \t ${temp4.high}`, `Low:    \t ${temp4.low}`, `Volume:\t ${volTemp4.toFixed(2)}M`,`\n`,
  ]
return text;
  }
    console.log(temp)
    console.log(temp2)
    //console.log(tooltipItems.label)

 
    const text = [`Company:\t${companyName}`,`Date:  \t ${temp.date.split('T')[0]}`, `Open:  \t ${temp.open}`, `Close:  \t ${temp.close}`, `High:   \t ${temp.high}`, `Low:    \t ${temp.low}`, `Volume:\t ${volTemp.toFixed(2)}M`,`\n`,
    `Company:\t${companyName2}`, `Date:  \t ${temp2.date.split('T')[0]}`, `Open:  \t ${temp2.open}`, `Close:  \t ${temp2.close}`, `High:   \t ${temp2.high}`, `Low:    \t ${temp2.low}`, `Volume:\t ${volTemp2.toFixed(2)}M`,`\n`,
  ]
  

    return text;
  }


  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          text: "Date",
          display: true,
          color:'#FFFFFF'
        },
        grid: {
          display: false
        },
      },
      
      price: {
        position: 'left',
        grid: {
          borderColor: 'white',
          color: '#097BEB'
        },
        title: {
          text: "Percentage Change in Close Price (%)",
          display: true,
          color:'#FFFFFF'
        }
      },
     
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
        display: true,
        position:'top',
        align:'center',
        labels:
        {
          boxHeight: 10,
          boxWidth: 30,
          color: '#FFFFFF',
          padding: 20,
          fillStyle:''
        }

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

  if (chartData) {
    return (
      <div>
        <Grid sx={{ textAlign: "center", backgroundColor: "#04122F" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
            <div style={{ border: "1px solid white", margin: "20px", marginBottom: 0, marginLeft: "30px", height: "max-content" }}>
              <Button onClick={() => changeData(7)} style={{ marginBottom: "0", color: "white", border: 0, padding: "10px 16px", backgroundColor: duration === 7 ? 'hsl(236deg 96% 70% / 8%)' : "transparent" }}>
                1W
              </Button>
              <Button onClick={() => changeData(30)} style={{ marginBottom: "0", color: "white", border: 0, padding: "10px 16px", backgroundColor: duration === 30 ? 'hsl(236deg 96% 70% / 8%)' : "transparent" }}>
                1M
              </Button>
              <Button onClick={() => changeData(365)} style={{ marginBottom: "0", color: "white", border: 0, padding: "10px 16px", backgroundColor: duration === 365 ? 'hsl(236deg 96% 70% / 8%)' : "transparent"  }}>
                1Y
              </Button>
            </div>

            <div style={{ display: "inline", fontWeight: "500", fontSize: "0.875rem", color: "white", margin: "20px", marginRight: "30px" }}>
              <DateRangeIcon fontSize="small" color="#FFFFFF" style={{ verticalAlign: "text-bottom" }} />
              <span>Date Range</span>

              <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
                <span>From</span>
                <input type="date" onChange={(event) => handleDateChange(event, "from")} style={{ backgroundColor: "#04122F", border: "1px solid white", marginLeft: "5px", color: "#FFFFFF" }} />
              </div>

              <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
                <span>To</span>
                <input type="date" onChange={(event) => handleDateChange(event, "to")} style={{ backgroundColor: "#04122F", border: "1px solid white", marginLeft: "5px", color: "white" }} />
              </div>

              <Button style={{ marginBottom: "0", color: "white", border: 0 }} onClick={handleDateRangeQuery} >
                Submit
              </Button>
            </div>
          </div>
          {dataReqdFormat.datasets[0].data.length!==0 && dataReqdFormat.datasets[1].data.length!==0 && <Chart data={chartData} options={options} plugins={plugins} />}
          
        </Grid>


      </div>
    )
  }
  else {
    return (
      <div color="white">Loading Charts</div>
    )
  }
}


