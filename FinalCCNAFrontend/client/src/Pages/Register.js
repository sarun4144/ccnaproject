import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from '../Function/Auth';
import Swal from 'sweetalert2'
import Toast from "../Alert/Success";
import './Register.css'

import emailjs from "@emailjs/browser"
function Register() {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        username: " ",
        password: " ",
        conpassword: " ",
        email: " "
    })
    const handleChange = (e) => {
        setValue({
            ...value, [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(value);
        if (value.password !== value.conpassword) {
            Swal.fire({
                position: 'top',
                title: 'รหัสผ่านไม่ตรงกัน',
                text: 'กรุณากรอกรหัสใหม่',
                icon: 'error',
                iconColor: 'Red'
            })
        } else {
            if (value.password.length < 6) {
                Swal.fire({
                    position: 'top',
                    title: 'Password ต้องมี 6 ตัวอักษรขึ้นไป',
                    text: 'กรุณากรอกรหัสใหม่',
                    icon: 'error',
                    iconColor: 'Red'
                })
            } else {
                register(value).then((res) => {
                    var templateParams = {
                        usarname: value.username,
                        contact: res.data.id,
                        email: value.email
                    };
                    emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, templateParams, process.env.REACT_APP_PUBLIC_KEY)
                        .then(function (response) {
                            Toast.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: res.data.msg
                            })
                            navigate("/login")
                        }, function (error) {
                            console.log('FAILED...', error);
                        });

                }).catch((err) => {
                    console.log(err)
                    Swal.fire({
                        position: 'top',
                        title: 'Error!',
                        text: err.response.data,
                        icon: 'error',
                        iconColor: 'Red',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'ตกลง'
                    })
                });
            }
        }
    }

    return (
        <div className="container">
            <div className="row" >
                <div className="col-md-6 offset-md-3" >
                    <div className="regis-card">
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="regis-header">
                                <h1 className="title">Register</h1>
                            </div>
                            <div className="col-1"></div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group" >
                                <label>Username: </label>
                                <input className="form-control" type="text" name="username" autoFocus placeholder="Username" onChange={handleChange} required />
                            </div>
                            <br />
                            <div className="form-group">
                                <label >Password:</label>
                                <input className="form-control" type="password" name="password" placeholder="Password with at least 6 characters" onChange={handleChange} required />
                            </div>
                            <br />
                            <div className="form-group">
                                <label >Confirm-Password:</label>
                                <input className="form-control" type="password" name="conpassword" placeholder="Confirm Password" onChange={handleChange} required />
                            </div>
                            <br />
                            <div className="form-group">
                                <label >Email : </label>
                                <input className="form-control" type="email" name="email" placeholder="Email" onChange={handleChange} required />
                            </div>

                            <br />
                            <div className="row">
                                <div className="col-4" ></div>
                                <div className="col-4" > <button className="submitre">Register</button> </div>
                                <div className="col-4"></div>

                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
