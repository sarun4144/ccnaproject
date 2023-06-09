import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { login } from './Store/userSilce'
import { checkin } from './Store/examSilce';
import { markin } from './Store/questionSlice';

import { useDispatch } from 'react-redux'
//notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//landdingpage
import Header from './Component/Header'
import About from './Pages/About';
import Banner from './Component/Banner';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Content from './Component/Cotent'
import Store from './Pages/Store';
import Info from './Pages/Info';
import Footer from './Component/Footer';
import Verifypage from './Pages/Verifypage'
//userpage
import Profile from './Component/user/Profile';
import ExampleTest from './Component/user/ExampleTest';
import Example from './Component/user/Example';
import ExamTestEasy from './Component/user/ExamTestEasy';
import ExamTestHard from './Component/user/ExamTestHard';
import ResultHard from './Component/user/ResultHard';
import ResultEasy from './Component/user/ResultEasy';
//adminpage
import Adminhome from './Component/admin/Adminhome';
import ManagAdmin from './Component/admin/ManageAdmin';
import ExamAdd from './Component/admin/ExamAdd';
import CategoryAdd from './Component/admin/CategoryAdd';
import ExamChoices from './Component/admin/ExamChoices';
import Report from './Component/admin/Report';
//function
import { currentuser } from './Function/Auth'
import { readCategory } from './Function/Category';

//protectRoute
import UserRoute from './Routes/UserRouter';
import AdminRoute from './Routes/AdminRouter';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const idtoken = localStorage.token
    const examid = localStorage.examid
    const catid = localStorage.catid
    const currentQuestion = localStorage.currentQuestion
    if (idtoken) {
      currentuser(idtoken)
        .then(res => {
          const user = {
            token: idtoken,
            username: localStorage.username,
            role:localStorage.role,
            email: localStorage.email,
            ObjectID: localStorage.ObjectID
          }
          dispatch(login(user))
          // if(res.data.username !== null){
          //   localStorage.setItem('username',res.data.username)
          // }
          // if(res.data.email !== null){
          //   localStorage.setItem('gmail', res.data.email)
          // }
          console.log('Current-User', user)
        }).catch(err => {
          console.log(err);
        })
    }
    if (examid) {
      readCategory(idtoken, catid)
        .then(res => {
          const EXAM = {
            examid: examid,
            category: res.data.name,
            catid: catid
          }
          dispatch(checkin(EXAM))
        }).catch(err => {
          console.log(err);
        })
    }
    if (currentQuestion) {
      
    }
  }, [dispatch])


  return (

    <div className="landing-container">
      <div className="landing-wrap">
        <BrowserRouter>
          <ToastContainer />
          <Header />
          <main style={{ marginTop: '78px' }}>
            <Routes>
              <Route exact path="/" element={<><Banner /><Content /></>} />
              <Route path="/Info" element={<><Info /></>} />
              <Route path="/about" element={<><About /></>} />
              <Route path="/login" element={<><Login /></>} />
              <Route path="/register" element={<><Register /></>} />
              <Route path="/store" element={<><Store /></>} />
              
              <Route path="/verifycation/:id" element={<><Verifypage /></>} />


              <Route path="/user/profile" element={<UserRoute><><Profile /></> </UserRoute>} />
              {/* <Route path="/user/profile" element={<><Profile /></> } /> */}
              <Route path="/user/ResultHard" element={<UserRoute><><ResultHard /></> </UserRoute>} />
              <Route path="/user/ResultEasy" element={<UserRoute><><ResultEasy /></> </UserRoute>} />

              <Route path="/user/extest" element={<><ExampleTest /></>} />
              <Route path="/user/example" element={<><Example /></>} />
              <Route path="/user/examtesteasy" element={<UserRoute><><ExamTestEasy /></> </UserRoute>} />
              <Route path="/user/examtesthard" element={<UserRoute><><ExamTestHard /></> </UserRoute>} />

              <Route path="/admin/home" element={<AdminRoute> <><Adminhome /></> </AdminRoute>} />
              <Route path="/admin/manageadmin" element={<AdminRoute> <><ManagAdmin /></> </AdminRoute>} />
              <Route path="/admin/examadd" element={<AdminRoute> <><ExamAdd /></> </AdminRoute>} />
              <Route path="/admin/categoryadd" element={<AdminRoute> <><CategoryAdd /></> </AdminRoute>} />
              <Route path="/admin/Report" element={<AdminRoute> <><Report /></> </AdminRoute>} />

              <Route path="/admin/examchoices" element={<AdminRoute> <><ExamChoices /></> </AdminRoute>} />

            </Routes>
          </main>
        </BrowserRouter>
      </div>
      <Footer />
    </div>

  );
}

export default App;