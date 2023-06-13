import React, { useContext } from 'react'

import { Chart as ChartJs, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2'
import { AppContext } from '../../Context/App_Context';
ChartJs.register(...registerables);

// ChartJs.defaults.global.maintainAspectRatio = false;



const BarChart = () => {

const { ChartLabel, ChartData1, ChartData2, ChartData3, ChartData4} = useContext(AppContext)


  const options = {
    // indexAxis: 'y',
    indexAxis: 'x',
    elements: {
      bar: {borderWidth:1}
    },
    responsive: true,
  // maintainAspectRatio: true,
  // height: 400,
  // width:600,
    plugins: {
      legend:{
        // position: 'left'
        // position: 'right'
        position: 'top'
        // position: 'bottom'
      },
      title:{
        display: true,
        text: "STATS BAR CHART OF LAST 6 MONTHS",
      }
    }
    // ,
    // scales: {
    //   yAxes: [{
    //     ticks: {beginAtZero: true}
  
    //   }] 
    // }
  
  }


  
  const data = {
    // labels: labels, 
    labels: ChartLabel, 
  
    datasets : [
      {
        label: 'STUDENTS',
        // data: data1,
        data: ChartData1,
        // fill: false,
        borderColor: "rgb(35,255,27)",
        backgroundColor: "rgba(35,255,27, 0.5)",
        tension: 0.2
      },
      {
        label: 'DEFFERED',
        // data: data2,
        data: ChartData2,
        // fill: false,
        borderColor: "rgb(255,27,69)",
        backgroundColor: "rgba(255,27,69, 0.5)",
        tension: 0.2
      },
      {
        label: 'REGISTRATIONS',
        // data: data3,
        data: ChartData3,
        // fill: false,
        borderColor: "rgb(27,137,255)",
        backgroundColor: "rgba(27,137,255, 0.5)",
        tension: 0.2
      },
      {
        label: 'PROSPECTS',
        // data: data4,
        data: ChartData4,
        // fill: false,
        borderColor: "rgb(124,34,248)",
        backgroundColor: "rgba(124,34,248, 0.5)",
        tension: 0.2
      }
    ]
  } 

  return (
    <Bar data={data} options={options} />
  )
}

export default BarChart