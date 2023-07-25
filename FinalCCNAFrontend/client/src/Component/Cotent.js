import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ComponentCSS/Content.css"
import { listexamSort, listexamSortDate } from "../Function/Exam"
import { reads } from "../Function/Person"
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { checkin } from "../Store/examSilce";
import * as moment from 'moment';


function Content() {
    const navigate = useNavigate();
    const user = useSelector((state) => ({ ...state }))
    const role = user.userStore.user.role
    const [dataMost, setDataMost] = useState([]);
    const [dataNew, setDataNew] = useState([]);
    const dispatch = useDispatch()
    const [loadingmost, setloadingmost] = useState(true)
    const [loadingdate, setloadingdate] = useState(true)

    console.log(dataMost)
    console.log(dataNew)
    useEffect(() => {
        //code
        loadData();
        // reads()

    }, []);
    useEffect(() => {
        //code
        if(dataMost.length > 0){
            setloadingmost(false)
        }
       
        // reads()
    }, [dataMost]);
    useEffect(() => {
        //code
        if(dataNew .length > 0){
            setloadingdate(false)
        }
        // reads()

    }, [dataNew]);

    const loadData = () => {
        listexamSort().then(res => {
            setDataMost(res.data)
        }).catch(err => {
            console.log(err.response.data)
        })

        listexamSortDate().then(res => {
            setDataNew(res.data)
        }).catch(err => {
            console.log(err.response.data)
        })

    }

    function SeeExam(id, catid, category) {
        if (role === "admin") {
            navigate("/admin/home")
        } else {
            const EXAM = {
                examid: id,
                catid: catid,
                category: category
            }
            dispatch(checkin(EXAM))
            localStorage.setItem('examid', id)
            localStorage.setItem('catid', catid)
            navigate("/user/extest")
        }
    }

    return (
        <div className='mainBackground'>
            <div className='content-container'>
                <div className="content-con">
                    <div className="content-con-header"><h1>The Most Popular Exam</h1></div>
                    <div className="content-row">
                        {loadingmost == true
                            ? (<h1>Loading ...</h1>)

                            : (
                                <>
                                    {dataMost.slice(0, 3).map((itemM, indexM) =>
                                        <div className="content-card">
                                            <div className="content-con-header">
                                                <h2>
                                                    {itemM.name}
                                                </h2>
                                            </div>
                                            <div className="content-Text">

                                                <p>
                                                    {itemM.title}
                                                </p>
                                                submitted : {itemM.Docount >= 0 ? <>{itemM.Docount}</> : <>0</>}
                                            </div>
                                            <hr />
                                            <div>{itemM.CAT.map((cat, index) =>
                                                <div key={index}>
                                                    {itemM.enable == true
                                                        ? <button type="submit" className="btn btn-primary" onClick={() => SeeExam(itemM._id, itemM.Categoryid, cat.name)}>Enter</button>
                                                        : <button type="submit" className="btn btn-danger" disabled>This exam now is fix</button>
                                                    }
                                                </div>)}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )
                        }
                    </div>

                </div>
                <br></br>
                <div className="content-con">
                    <div className="content-con-header"><h1>Newly Added Exam</h1></div>
                    <div className="content-row">
                        {loadingdate == true
                            ? (<h1>Loading ...</h1>)

                            : (
                                <>
                                    {dataNew.slice(0, 3).map((itemN, indexN) =>
                                        <div className="content-card">
                                            <div className="content-con-header">
                                                <h2>
                                                   {itemN.name}
                                                </h2>
                                            </div>
                                            <div className="content-Text">

                                                <p>
                                                    {itemN.title}
                                                </p>
                                                {moment(itemN.date)
                            .locale("th").format('LLL')
                            }
                                            </div>
                                            <hr />
                                            <div>{itemN.CAT.map((cat, index) =>
                                                <div key={index}>
                                                    {itemN.enable == true
                                                        ? <button type="submit" className="btn btn-primary" onClick={() => SeeExam(itemN._id, itemN.Categoryid, cat.name)}>Enter</button>
                                                        : <button type="submit" className="btn btn-danger" disabled>This exam now is fix</button>
                                                    }
                                                </div>
                                            )}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Content