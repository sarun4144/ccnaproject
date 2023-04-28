import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'
import './Verifypage.css'
import { verifycation } from "../Function/Auth";
function Loadingpage() {
    const [Load, setLoad] = useState(true);
    const [status, setStatus] = useState(0);
    const [data, setData] = useState({});
    const router = useParams();

    console.log("LOADINGPAGES", router.id);
    async function loadData() {
        await verifycation(router.id)
          .then((res) => {
            console.log(res.data);
            setData(res.data);
            setLoad(false);
            setStatus(res.status);
            // setTimeout(() => {
            //   router.replace(`http://localhost:3000/setuppassword/${data.user_data.id}`)
            // }, 3000);
          })
          .catch((err) => {
            setLoad(false);
            console.log(err.response);
            setData(err.response.data);
          });
      }
      useEffect(() => {
          setLoad(true);
          loadData();
      }, []);
    return (
        <div className="loading-con-head">
            <div className="loading-con">
                {Load ? (
                    <>
                        <h1>
                            Verifying...{status}
                        </h1>
                        <div className="lds-roller">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <h1>Please wait</h1>
                    </>
                ) : (
                    <>
                        {status == 200 ? (
                            <>
                                <h1>{data}</h1>
                                <h1 className="success-verify">✓</h1>
                                <h2>
                                    <a href="http://ccnafront.ver.app/login">Click here to login</a>
                                </h2>
                            </>
                        ) : (
                            <>
                                <h1>{data}</h1>
                                <h1 className="unsuccess-verify">𐄂</h1>
                                <h2>
                                    <a href="http://ccnafront.ver.app/register">
                                        Click here to Register
                                    </a>
                                </h2>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}



export default Loadingpage;
