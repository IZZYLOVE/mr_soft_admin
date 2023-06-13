import React, { useContext } from 'react'
import './card.css'
import BarChart from './charts/BarChart'
import LineChart from './charts/LineChart'
import { AppContext } from '../Context/App_Context'
import { useNavigate } from 'react-router-dom';


export function Card() {
  const { ChartData1, ChartData2, ChartData3, ChartData4} = useContext(AppContext)
  const navigate = useNavigate();



let students = 0;
let deffered = 0;
let registrations = 0;
let enquiriies = 0;

ChartData1 && (students = ChartData1[ChartData1.length - 1])
ChartData2 && (deffered = ChartData2[ChartData2.length - 1])
ChartData3 && (registrations = ChartData3[ChartData3.length - 1])
ChartData4 && (enquiriies = ChartData4[ChartData4.length - 1])

const handleCardRedirection = (path) => {
	switch(path.toUpperCase()){
		case "STUDENTS":
			return(navigate(`/Admin/${path}`))
		case "DEFFERED":
			return(navigate(`/Admin/${path}`))   
		case "MONTHSREG":
			return(navigate(`/Admin/${path}`))
		case "MONTHSPROS":
			return(navigate(`/Admin/${path}`))
		default:
			return(path)
	  } 
} 

  return (
    <div className='Chart'>
    {/* <div>DASHBOARD</div> */}
		<div className="main_flex_container">
			<div className="father1">
			<div className="flex_container">
				<div className="box box1" onClick={() => handleCardRedirection('students') } title='Shows the total number of active students'>ACTIVE STUDENTS <br /> { students }</div>
				<div className="box box2" onClick={() => handleCardRedirection('deffered') } title='Shows the total number of deffered students'>DEFFERED STUDENTS <br /> { deffered } </div>
			</div>
			</div>
			<div className="father1">
			<div className="flex_container">
				<div className="box box3" onClick={() => handleCardRedirection('monthsreg') } title='Shows the total number of students who registerd this month'>MONTH'S REGITRATIONS <br /> { registrations } </div>
				<div className="box box4" onClick={() => handleCardRedirection('monthspros') } title='Shows the total number of new individuals who made enquiries this month'>MONTH'S PROSPECTS  <br /> {enquiriies  }</div>
			</div>
			</div>
		</div>


    	<div className="main_flex_container">
			<div className="flex_container">
				<div className="overRideFlexDirection boxA box1A">
					<BarChart />
				</div>
				<div className="overRideFlexDirection boxA box2A">
					<LineChart />
				</div>
			</div>
		</div>

    </div>
  )
}

