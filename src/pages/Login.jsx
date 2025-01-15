import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            console.log(code);
            const response = await axios.get(`/files/${code}`);
            if (response.data) {
                localStorage.setItem('code', code);
                navigate('/home');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className={""}>
            <div className={"w-full p-5 mx-auto text-center bg-amber-100"}>
                <h1 className={"m-auto text-3xl font-bold italic text-cyan-800"}>
                    Welcome to online file storage
                </h1>
            </div>

            <div className={"w-[500px] bg-cyan-200 mt-72 mx-auto rounded-2xl flex-col"}>
                <div className={"font-bold p-4 text-2xl"}>
                    Enter your code
                </div>
                <div className={"w-full"}>
                    <input
                        type="number"
                        name="usercode"
                        value={code}
                        className={"p-2 w-11/12 rounded-[5px] ml-[10px]"}
                        placeholder="code please!"
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                <div className={"p-[10px] mt-[10px]"}>
                    <button
                        className={"p-[10px] font-bold rounded-[5px] bg-red-500 hover:bg-red-300"}
                        onClick={handleLogin}>
                        Get me files
                    </button>
                </div>
                <div className={"p-[10px]"}>
                    <Link
                        to="/Signup"
                        className={"text-blue-500 underline hover:no-underline hover:text-blue-800 font-bold"}>
                        Need a new code!
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
