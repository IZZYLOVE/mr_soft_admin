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
import { CreateFeed } from "./CreateFeed";
import { GetFeeds } from "./GetFeeds";
import { AdminSupport } from "./AdminSupport";
import { AdminChangeProfileImage } from "./AdminChangeProfileImage";
import { GetContactMessages } from "./GetsContactMessages";

export function Admindashboard() {
  const { API_base_url, isLoggedIn,  userRole, setChartLabel, setChartData1, setChartData2, setChartData3, setChartData4, StoreUserObj, getStoredToken, 
    setNewContactMessageCount, setNewSupportCount, setNewSupport, setNewContactMessage } = useContext(AppContext)
  const navigate = useNavigate();
  let tempHandleGetMultipleData = useRef( )
  let tempIsLoggedIn = useRef( )

  let done = useRef(false)

  useEffect(() => {
  if(!getStoredToken()){
    navigate(`/`)
  }
}, [ navigate ]);

  useEffect(() => {
    const handleIsLoggedIn = () => {
      if(isLoggedIn() === false){
        navigate(`/`)
      }
      return(true)
    };
    handleIsLoggedIn()
    return () => {
    };
  }, [ isLoggedIn, navigate ]);


  
  if(isLoggedIn() && userRole() !== 'admin' ){ // ensures only admin is allowed
    navigate(`/`)
  }

  const labels = []
  const data1 = []
  const data2 = []
  const data3 = []
  const data4 = []



  const handleSetChartData = () => {
    setChartLabel(labels)
    setChartData1(data1)
    setChartData2(data2)
    setChartData3(data3)
    setChartData4(data4)
    console.log("Chart data set")
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
      
      if((Data.length -1) === i){
        return(handleSetChartData())
      }
      return('done')

    })
  };


  
  const handleGetMultipleData = () => {

    // let headerObj = {}
    
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
      fetch(`${API_base_url}api/v1/supports?status=open`, headerObj), //support Object
      fetch(`${API_base_url}api/v1/contactmessages?status=open`, headerObj), // ContactMessage Object
    ]
    async function fetchData(){
      // fails the rest of the fetch if one fails
      // then throws an error
        try{
          const res = await Promise.all(myArray) 
          console.log(res)
          const data = await Promise.all(res.map((item) => { 
            return item.json();
          }))
          console.log(data)

          // data is  an array
          // if(data.status === 'success'){
          data[0].data && StoreUserObj(data[0].data)
          handleSetStatsArrays(data[1].data.reverse())
          setNewSupport(data[2].data)
          setNewSupportCount(data[2].data.length)
          setNewContactMessage(data[3].data)
          setNewContactMessageCount(data[3].data.length)
          // }
          // else{
          //   throw Error(data.message)
          // }
        }
        catch(e){
          alert("could not fetch data from one or more resources",+e)
        } 
      }
      fetchData()

  };


  // remove useEffect dependency of handleGetMultipleData() if used in useEffect
  tempHandleGetMultipleData.current = handleGetMultipleData
  tempIsLoggedIn.current = isLoggedIn



  useEffect(() => {
    console.log("useEffect ran")
    tempIsLoggedIn.current() && tempHandleGetMultipleData.current()
    if(done.current === true){
      done.current = false
    }

    return () => {
    };
  }, []); 


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
            <Route path="/changeprofileimage" element={<AdminChangeProfileImage/>} />
            <Route path="/profileimage" element={<AdminProfileImage/>} />
            <Route path="/removeuser" element={<RemoveUser/>} />
            <Route path="/graduates" element={<Graduates/>} />
            <Route path="/createcourse" element={<CreateCourse/>} />
            <Route path="/createfeed" element={<CreateFeed/>} />
            <Route path="/getfeeds" element={<GetFeeds/>} />
            <Route path="/adminsupport" element={<AdminSupport/>} />
            <Route path="/contactmessages" element={<GetContactMessages/>} />
            <Route path="/*" element={<Stats/>} />
          </Routes>
        </>
     
      )
    };