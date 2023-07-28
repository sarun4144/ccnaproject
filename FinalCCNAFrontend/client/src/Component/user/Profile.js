import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as moment from 'moment';
import './Profile.css'
import * as AiIcons from "react-icons/ai";
import Swal from 'sweetalert2'
import LineChart from "./LineChart";
import LineChartHard from "./LineChartHard";
import RadarChart from "./RadarChart";
import RadarChartHard from "./RadarChartHard";
import Table from 'react-bootstrap/Table';
import { ChangeName, reads, Hardlog, Easylog } from "../../Function/Person"
import { useNavigate } from "react-router-dom";
 function Profile() {
  const user = useSelector((state) => ({ ...state }))
  const Userid =   localStorage.ObjectID
  const Token =   user.userStore.user.token
  const email =   user.userStore.user.email
  const role =  user.userStore.user.role
  const username = user.userStore.user.username
  const [data, setData] = useState([]);
  const [dataExamHard, setDataExamHard] = useState([]);
  const [dataExamEasy, setDataExamEasy] = useState([]);
  
  const [Linetext, setLinetext] = useState("เลือกความยากและชุดข้อสอบเพื่อแสดงกราฟ");
  const [Radartext, setRadartext] = useState("เลือกความยากเพื่อแสดงกราฟ");

  const [showLine, setShowLine] = useState("");
  const [showRadar, setShowRadar] = useState("")

  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const DataHard = Object.values(dataExamHard);
  const DataEasy = Object.values(dataExamEasy);

  const [loading, setloading] = useState(true)
  const [loading2, setloading2] = useState(true)
  //console.log(username)
  //console.log(role)
  // console.log(email)
  console.log(dataExamHard)
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  useEffect(() => {
    localStorage.removeItem("Index")
  }, [])
  
   
  useEffect(() => {
    
    if (Userid !== null || email !== null) {
      loadData(Token, Userid)
    }
  }, [Userid])


  useEffect(() => {
    //code
    if (Userid !== null || email !== null) {
      loadExamData(Userid)
      loadExamDataE(Userid)
    }
  }, [Userid]);

  function loadData(authtoken, id) {
    reads(authtoken, id).then((res) => {
      setData(res.data);
      setloading2(false)
      localStorage.setItem('username', res.data.username)
    });
  }
  function loadExamData(id) {
    Hardlog(id).then((res) => {
      setDataExamHard(res.data);
      setloading(false)
    });
  }
  function loadExamDataE(id) {
    Easylog(id).then((res) => {
      setDataExamEasy(res.data);
      setloading(false)
    });
  }

  const ShowEditUsername = async (id) => {
    const { value: Newusername } = await Swal.fire({
      title: 'แก้ไข',
      input: 'text',
      inputLabel: 'ใส่ Username',
      inputPlaceholder: 'ใส่ Username ใหม่',
      confirmButtonText: 'ยืนยัน',
      confirmButtonColor: 'green',
    })
    if (Newusername) {
      console.log("True")
      ChangeName(user.userStore.user.token, id, { Newusername })
        .then(res => {
          Swal.fire({
            title: 'แก้ไข Username สำเร็จ',
            confirmButtonText: 'ยืนยัน',
            confirmButtonColor: 'green',
          })
          setloading2(true)
          loadData(Token, Userid)
        }).catch(err => {
          Swal.fire({
            title: err.response.data,
            confirmButtonText: 'ยกเลิก',
            confirmButtonColor: 'red',
          })
          console.log(err.response)
        })
    }
  }

  function Seresult(index) {
    localStorage.setItem("Index", index)
    navigate("/user/ResultHard");
  }
  function SeresultEasy(index) {
    localStorage.setItem("Index", index)
    navigate("/user/ResultEasy");
  }

  return (
    <div className="profile-container">
      {loading == true
        ? (<h1> Loading ...</h1>)
        : (
          <>
            <div className="profile-card">
              <div className="profile-card-header">
                <h1>Profile</h1>
              </div>
              <div className="profile-card-content">
                {loading2 == true
                  ? (<h1> Loading ...</h1>)
                  : (
                    <>
                      <div>Username : {data.username} <AiIcons.AiFillEdit id="EditUsernameBtn" onClick={() => ShowEditUsername(Userid)} /></div>
                    </>
                  )
                }
                <div>Role : {role}</div>
                <div>Email : {email}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="profile-card">
                  <div className="profile-card-header"><h2>{Linetext}</h2></div>
                  <button className="btn btn-success" onClick={() => {setShowLine("easy");setLinetext("Chart แสดงคะแนนเฉลี่ยระดับ Easy")}}>EASY</button>&nbsp;
                  <button className="btn btn-warning" onClick={() => {setShowLine("hard");setLinetext("Chart แสดงคะแนนเฉลี่ยระดับ Hard")}}>HARD</button>
                  <div className="profile-card-content">
                    <>
                    {showLine != "" 
                     ?<>{showLine === "easy" ? <LineChart></LineChart> : <LineChartHard></LineChartHard>}</>
                     :<></>
                    }
                   
                    </>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-card">
                  <div className="profile-card-header"><h4>{Radartext}</h4></div>
                  <button className="btn btn-success" onClick={() => {setShowRadar("easy");setRadartext("Chart แสดงจำนวนครั้งที่ทำในแต่ละหมวดหมู่ในระดับ Easy")}}>EASY</button>&nbsp;
                  <button className="btn btn-warning" onClick={() => {setShowRadar("hard");setRadartext("Chart แสดงจำนวนครั้งที่ทำในแต่ละหมวดหมู่ในระดับ Hard")}}>HARD</button>
                  <div className="profile-card-content">
                  <>
                    {showRadar != "" 
                     ?<>{showRadar === "easy" ? <RadarChart></RadarChart> : <RadarChartHard></RadarChartHard>}</>
                     :<></>
                    }
                    </>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-card">
              <div className="profile-card-header"><h1>ประวัติการทำข้อสอบ</h1></div>
              <div className="row">
                <div className="col-md-6" style={{ textAlign: "center" , overflow:"auto"}}>
                  <h2>Easy</h2>
                  <div className="profile-card-content">
                    <Table className="table">
                      <thead>
                        <tr>
                          <th scope="col">ExamName</th>
                          <th scope="col">Title</th>
                          <th scope="col">Category</th>
                          <th scope="col">Date</th>
                          <th scope="col">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DataEasy.map((item, index) =>
                          <tr key={index}>
                            <td >
                              <div className="SeeexamEasy" onClick={() => SeresultEasy(index + 1)}>
                                {item.Examname}
                              </div>
                            </td>
                            <td>{item.Title}</td>
                            <td>{item.Category}</td>
                            <td>{item.Date.substring(0, 24)}</td>
                            <td>{item.Score}</td>
                          </tr>

                        )}

                      </tbody>
                    </Table>
                  </div>
                </div>
                <div className="col-md-6" style={{ textAlign: "center" , overflow:"auto"}}>
                  <h2>Hard</h2>
                  <div className="profile-card-content">
                    <Table className="table">
                      <thead>
                        <tr>
                          <th scope="col">ExamName</th>
                          <th scope="col">Title</th>
                          <th scope="col">Category</th>
                          <th scope="col">Time use</th>
                          <th scope="col">Date</th>
                          <th scope="col">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DataHard.map((item, index) =>
                          <tr key={index}>
                            <td >
                              <div className="SeeexamHard" onClick={() => Seresult(index + 1)}>
                                {item.Examname}
                              </div>
                            </td>
                            <td>{item.Title}</td>
                            <td>{item.Category}</td>
                            <td>{item.Time}</td>
                            <td> {moment(item.Date)
                            .locale("th").format('LLL')
                            }</td>
                            <td>{item.Score}</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default Profile