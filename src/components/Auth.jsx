import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { signup, login, logout } from '../fetaures/movieSlice';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup form
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.movie)

    useEffect(() => {
        console.log(currentUser);

        if (currentUser) {
            if (currentUser.email) {
                navigate("/home");
                alert("entered Successfully");
            }
            if (currentUser.error) {
                alert(currentUser.error)
            }
        }

    }, [currentUser, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            dispatch(login({ email, password }));
            setPassword('');
            setEmail('');
        } else {
            dispatch(signup({ email, password }));
            setEmail('');
            setIsLogin(true)
            setPassword('');
        }
        // Redirect to profile page after login/signup
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-5">
                    <div className="form-content border border-2 p-3 rounded" >
                        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : 'Sign Up'}</button>
                        </form>
                        <div className="mt-3">
                            <button className="ps-0 btn btn-link" onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? 'Don\'t have an account? Sign up' : 'Already have an account? Login'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <p>Note: Users are stored inside redux store temporarily so you can create
                        multiple users but once page gets refreshed all users will gone
                        because it is not stored inside the database
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
