import React, { useState } from 'react';
import './home.css';
import logo1 from './../assets/logo1.svg';
import TitleBlock from './../components/common/title';
import './../components/common/button.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const userSubmit = (e) => {
        e.preventDefault();

        if (username === 'admin' && password === '1234') {
            navigate('/dashboard');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <>
            <main className='imgbg'>
                <section id='book' className='container moveIn scrollAnimate'>
                    <form className=' form3' onSubmit={userSubmit}>
                        
                        <div className="formLeft">
                            <TitleBlock
                                img={logo1}
                                class="title1"
                                heading="Admin Login"
                                subheading="Log in to your official account on Ma7gouz."
                            />

                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {error && <p style={{ color: 'red' }}>{error}</p>}

                            <button type='submit' className='btn1 btn4'>
                                Login
                            </button>
                        </div>

                    </form>
                </section>
            </main>
        </>
    );
};

export default Login;