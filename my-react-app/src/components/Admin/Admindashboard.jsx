import React, { useContext, useEffect, useRef } from "react"
import { AdminNavbar } from "./AdminNavbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AdminProfile } from "./AdminProfile";
import { Stats } from "./Stats";
import { AppContext } from "../../Context/App_Context";
import { ActiveStudents } from "./ActiveStudents";
import { DefferedStudents } from "./DefferdStudents";
import { MonthsReg } from "./MonthsReg";
import { Enquiries } from "./Enquiries";
import { MonthsPros } from "./MontthsProspects";
import { ApproveUserAccess } from "./ApproveUserAccess";
import { AllProspects } from "./AllProspects";
import { AllCourses } from "./AllCourses";
import { Users } from "./Users";
import { RemoveUser } from "./RemoveUser";
import { Graduates } from "./Graduates";
import { CreateCourse } from "./CreateCourse";
import { AdminProfileUpdate } from "./AdminProfileUpdate";
import { AdminProfileImage } from "./AdminProfileImage";
import { CreateFeed, CreateNews } from "./CreateFeed";
import { GetFeeds, GetNews } from "./GetFeeds";
import { AdminSupport } from "./AdminSupport";
import { AdminChangeProfileImage } from "./AdminChangeProfileImage";

export function Admindashboard() {
  const { API_base_url, userRole, setChartLabel, setChartData1, setChartData2, setChartData3, setChartData4, StoredUserObj, getStoredToken } = useContext(AppContext)
  const navigate = useNavigate();
  // let statsData = useRef([])
  let done = useRef(false)

  if(userRole() !== 'admin' ){ // ensures only admin is allowed
    navigate(`/`)
  }

  const labels = []
  const data1 = []
  const data2 = []
  const data3 = []
  const data4 = []

  // const ChartDataArr = []


  const handleSetChartData = () => {
    console.log("ChartDataArr sttt")
    setChartLabel(labels)
    setChartData1(data1)
    setChartData2(data2)
    setChartData3(data3)
    setChartData4(data4)

    // ChartDataArr.push(labels)
    // ChartDataArr.push(data1)
    // ChartDataArr.push(data2)
    // ChartDataArr.push(data3)
    // ChartDataArr.push(data4)

    // console.log("ChartDataArr")
    // console.log(ChartDataArr)

    // setChartData(ChartDataArr)
    done.current = true
    return(done.current)
  };

  const handleSetStatsArrays = (Data) => {
    
    Data.map((data, i) => {  
      
      labels.push(data.month)
      data1.push(data.students)
      data2.push(data.deffered)
      data3.push(data.regCount)
      data4.push(data.enquiryCount)
      
      console.log("handleSetStatsArrays ran")

      if((Data.length -1) === i){
        console.log("calling handleSetChartData")

        return(handleSetChartData())
      }
      return('done')

    })
  };


  
  const handleGetMultipleData = () => {

    let headerObj = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${getStoredToken()}`,
            },
            // body: JSON.stringify(formData),
          }
    const myArray = [
      fetch(`${API_base_url}api/v1/users/myprofile`, headerObj), //User Object
      fetch(`${API_base_url}api/v1/stats/lateststats`, headerObj), // Stats Object
    ]
    async function fetchData(){
      // fails the rest of the fetch if one fails
      // then throws an error
        try{
          const res = await Promise.all(myArray) 
          const data = await Promise.all(res.map((item) => { 
            return item.json();
          }))
          // data is  an array

          StoredUserObj(data[0].data)
          handleSetStatsArrays(data[1].data.reverse())
          // console.log("data[0].data")
          // console.log(data[0].data)
          // console.log("data[1].data.reverse()")
          // console.log(data[1].data)
 
        }
        catch(e){
          console.log("multiple fetch failed")
          throw Error("multiple fetch failed")
        } 
      }
      fetchData()


  //   let url = `${API_base_url}api/v1/stats/lateststats`
  //   const fetchData = async (url) => {
  //     await fetch(url , {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'authorization': `Bearer ${getStoredToken()}`,
  //       },
  //       // body: JSON.stringify(formData),
  //     })
  //     .then(res => {
  //       if(!res.ok){
  //         throw Error('could not fetch the data for that resource')
  //       }
  //       return res.json();
  //     })
  //     .then(data => {
  //       statsData.current = data.data
  //       handleSetStatsArrays(data.data.reverse())
  //     })
  //   }
  // fetchData(url)

  };



  useEffect(() => {
    console.log("useEffect ran")
    handleGetMultipleData()
    if(done.current === true){
      done.current = false
    }

    return () => {
    };
  }, [  ]); // adding handleGetStatsData to dependency array results in an infinit loop, neglect the warning


    return (
        <>
          <AdminNavbar />
          <Routes>
            <Route path="/students" element={<ActiveStudents/>} />
            <Route path="/deffered" element={<DefferedStudents/>} />
            <Route path="/monthsreg" element={<MonthsReg/>} />
            <Route path="/monthspros" element={<MonthsPros/>} />
            <Route path="/allprospects" element={<AllProspects/>} />
            <Route path="/approveuser" element={<ApproveUserAccess/>} />
            <Route path="/allcourses" element={<AllCourses/>} />
            <Route path="/enquiries" element={<Enquiries/>} />
            <Route path="/users" element={<Users/>} />
            <Route path="/myprofile" element={<AdminProfile/>} />
            <Route path="/profileupdate" element={<AdminProfileUpdate/>} />
            <Route path="/adminchangeprofileimage" element={<AdminChangeProfileImage/>} />
            <Route path="/profileimage" element={<AdminProfileImage/>} />
            <Route path="/removeuser" element={<RemoveUser/>} />
            <Route path="/graduates" element={<Graduates/>} />
            <Route path="/createcourse" element={<CreateCourse/>} />
            <Route path="/createfeed" element={<CreateFeed/>} />
            <Route path="/getfeeds" element={<GetFeeds/>} />
            <Route path="/adminsupport" element={<AdminSupport/>} />
            <Route path="/*" element={<Stats/>} />
          </Routes>
        </>
     
      )
    };