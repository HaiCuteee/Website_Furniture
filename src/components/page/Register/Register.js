
import React from 'react';
import style from './Register.module.css';
import classNames from 'classnames/bind';


import { useFormik } from 'formik';
import * as Yup from 'yup';

import { register } from '../../../services/user.Service';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

const initialValues = {
    
    name: "",
    phone: "",
    email: "",
    password: ""
}

const validationSchema = Yup.object().shape({
    
    name: Yup.string().required("Vui lòng nhập Họ tên"),
    phone: Yup.string().required("Vui lòng nhập số điện thoại"),
    email: Yup.string().required("Vui lòng nhập email").email("Email không đúng định dạng"),
    password: Yup.string().required("Vui lòng nhập mật khẩu").min(6, "Mật khẩu tối thiếu 6 ký tự")

    
})

function Register() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues,
        
        validationSchema,
        
        onSubmit: async (user) => {
            let response = await register(user);
            response.status === 201 && navigate("/login");
           
        }
    });

    return (
        <div className={cx('container', 'mt-5', 'd-block')}>
            <h3 className='text-center text-uppercase font-weight-bold'>Đăng ký</h3>
            <div className=''>
                <form onSubmit={formik.handleSubmit} className={cx('form-submit')}>
                    <div className={cx("mt-3")}>
                        <label className="mb-0 mr-2 font-weight-bold">
                            Họ và tên
                        </label>
                        <input
                            name="name" type="text" placeholder='Họ và tên'
                            className={cx("form-control", "form-input", "mt-2")}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        

                        />
                    </div>
                    
                    <span className={cx("err")}>
                        {formik.errors.name ? formik.errors.name : ""}
                    </span>


                    <div className={cx("mt-3")}>
                        <label className="mb-0 mr-2 font-weight-bold">
                            Số điện thoại
                        </label>
                        <input placeholder='Số điện thoại'
                            className={cx("form-control", "form-input", "mt-2")}
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            name="phone"
                        />
                    </div>
                    <span className={cx("err")}>
                        {formik.errors.phone ? formik.errors.phone : ""}
                    </span>

                    <div className={cx('form-submit', 'mt-3')}>
                        <label className="mb-0 mr-2 font-weight-bold d-block">
                            Email
                        </label>
                        <input
                            name="email" type="email "
                            className={cx("form-control", "form-input", "mt-2")}
                            onChange={formik.handleChange} placeholder="Email"
                            value={formik.values.email}
                        />
                    </div>
                    <span className={cx("err")}>
                        {formik.errors.email ? formik.errors.email : ""}
                    </span>

                    <div className={cx("mb-2", "mt-4")}>
                        <label className="mb-0 mr-2 font-weight-bold d-block">
                            Mật khẩu
                        </label>
                        <input
                            name="password" type="password"
                            className={cx("form-control", "form-input", "mt-2")}
                            onChange={formik.handleChange} placeholder="Mật khẩu"
                            value={formik.values.password}
                        />
                    </div>
                    <span className={cx("err")}>
                        {formik.errors.password ? formik.errors.password : ""}
                    </span>
                    <button
                        type="submit"
                        className={cx("btn", "text-uppercase", "btn-success", "mb-5","mt-2")}
                    >
                        Đăng ký
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register;
