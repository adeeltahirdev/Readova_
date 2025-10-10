import React, {useState} from 'react';
import AuthLayout from "../../layouts/AuthLayout.jsx";
import {Link} from "react-router";
import {MdEmail,MdLock, MdPerson2} from "react-icons/md";
import '../../assets/css/login.css';



const RegisterPage = () => {

    const [login, setLogin] = useState(true);

  return (
    <AuthLayout>
        <div className="wrap">
            <div className={`auth-container ${login ? '' : 'active' }`}>
                <div className="form-box login">
                    <form action="">
                        <h1>Login</h1>
                        <div className="input-box">
                            <input type="text" placeholder="Username" required/>
                            <MdPerson2 className="icon"/>
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Password" required/>
                            <MdLock className="icon"/>
                        </div>
                        <div className="forgot-link">
                            <Link to="#">Forgot password?</Link>
                        </div>
                        <Link to="/library"><button type="submit" className="auth-btn">Login</button></Link>
                    </form>
                </div>

                <div className="form-box signup">
                    <form action="">
                        <h1>Sign Up</h1>
                        <div className="input-box">
                            <input type="text" placeholder="Username" required/>
                            <MdPerson2 className="icon"/>
                        </div>
                        <div className="input-box">
                            <input type="email" placeholder="Email" required/>
                            <MdLock className="icon"/>
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Password" required/>
                            <MdEmail className="icon"/>
                        </div>
                        <button type="submit" className="auth-btn">Sign up</button>
                    </form>
                </div>
                <div className="toggle-box">
                    <div className="toggle-panel toggle-left">
                        <h1>Hello, Welcome!</h1>
                        <p>Don't have an account?</p>
                        <button className="auth-btn signup-btn" onClick={() => setLogin(false)}>Sign Up</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Welcome Back!</h1>
                        <p>Already have an account?</p>
                        <button className="auth-btn login-btn" onClick={() => setLogin(true)}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    </AuthLayout>
  )
}

export default RegisterPage;