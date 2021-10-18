// import Header from '../../layout/Header';
// import Footer from '../../layout/Footer';
// import Bread from '../../elements/ui/Bread';
// import LoginForm from '../../elements/widgets/Form/Login';
// import { Fragment } from 'react';
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Brand from "../../elements/widgets/brand/Brand";

export default function Login() {

  const gogo = useHistory();

  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const [guideTxts, setGuideTxts] = useState({
    emailGuide: '이메일 형식에 맞게 작성해 주세요.',
    pwdGuide: '숫자와 문자를 조합해서 최소 8글자는 입력해 주세요.'
  });

  const [error, setError] = useState({
    emailError: '',
    pwdError: ''
  })

  const isEmail = email => {
    const emailRegex = /^(([^<>()\].,;:\s@"]+(\.[^<>()\].,;:\s@"]+)*)|(".+"))@(([^<>()¥[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    return emailRegex.test(email);
  };

  const isPwd = pass => {
    const pwdRegex = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*#?&]).*$/;

    return pwdRegex.test(pass);
  }

  const onTextCheck = () => {
    let emailError = "";
    let pwdError = "";

    if (!isEmail(values.email)) emailError = "email 형식이 아닙니다.";
    if (!isPwd(values.password)) pwdError = "비밀번호 조건을 만족 할 수 없습니다.";

    setError({
      emailError, pwdError
    })

    if (emailError || pwdError) return false;
    return true;
  }

  const handleChangeForm = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  }

  const handlePutUserLists = (e) => {
    e.preventDefault();

    const valid = onTextCheck();
    if (!valid) console.error("retry");

    else {
      fetch(`/user-service/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        })
      }) // res.json() 해 줘야 되는지 생각..
        .then((res) => {
          if (res.headers.get('token')) {
            localStorage.setItem("token", res.headers.get('token'));
            localStorage.setItem("userId", res.headers.get('userId'));
            localStorage.setItem("email", values.email);
            gogo.push("/");
          }
          else {
            alert("로그인 정보를 확인하세요.");
          }
        })
    }
  }

  return (
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth px-0">
          <div class="row w-100 mx-0">
            <div class="col-lg-4 mx-auto">
              <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                <Brand/>
                <h4>Hello! let's get started</h4>
                <h6 class="font-weight-light">Sign in to continue.</h6>
                <form class="pt-3" onSubmit={handlePutUserLists}>
                  <div class="form-group">
                    <input type="email" class="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" name="email" value={values.email} onChange={handleChangeForm} />
                  </div>
                  {
                    error.emailError
                      ?
                      <div style={{ color: "red", fontSize: "12px", margin: '-5px 0 10px 15px' }}>{error.emailError}</div>
                      :
                      <div style={{ color: "gray", fontSize: "12px", margin: '-5px 0 10px 15px' }}>{guideTxts.userGuide}</div>
                  }
                  <div class="form-group">
                    <input type="password" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" 
                    name="password"
                    value={values.password}
                    onChange={handleChangeForm}/>
                  </div>
                  {
                        error.pwdError 
                            ? 
                                <div style={{ color: "red", fontSize: "12px", margin: '-5px 0 10px 15px' }}>{error.pwdError}</div>
                            :
                                <div style={{ color: "gray", fontSize: "12px", margin: '-5px 0 10px 15px' }}>{guideTxts.pwdGuide}</div>
                    }
                  <div class="mt-3">
                    <button type="submit" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</button>
                  </div>
                  <div class="my-2 d-flex justify-content-between align-items-center">
                    <div class="form-check">
                      <label class="form-check-label text-muted">
                        <input type="checkbox" class="form-check-input" />
                        Keep me signed in
                      </label>
                    </div>
                    <a href="#" class="auth-link text-black">Forgot password?</a>
                  </div>
                  <div class="mb-2">
                    <button type="button" class="btn btn-block btn-facebook auth-form-btn">
                      <i class="ti-facebook mr-2"></i>Connect using facebook
                    </button>
                  </div>
                  <div class="text-center mt-4 font-weight-light">
                    지원자 계정으로 가입하고 싶으시다면 <Link to="/register-for-user" class="text-primary">Create</Link>
                  </div>
                  <div class="text-center mt-4 font-weight-light">
                    인사담당자 계정으로 가입하고 싶으시다면 <Link to="/register" class="text-primary">Create</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}