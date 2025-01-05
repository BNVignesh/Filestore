import react from 'react'
import {useState} from 'react';

import {Link} from "react-router-dom";

const Signup = () => {
    const [file, setFile] = useState(null);
    return (
        <>
            <body className={""}>
            <div className={"w-full p-5 mx-auto text-center bg-amber-100"}>
                <h1 className={"m-auto text-3xl font-bold  italic text-cyan-800"}>Welcome to online file storage</h1>
            </div>

            <div className={"w-[500px] bg-cyan-200 mt-72 mx-auto rounded-2xl flex-col"}>
                <div className={"font-bold p-4 text-2xl"}>
                    First time or need a new code
                </div>
                <div className={"w-full  "}>
                    <input type = "file" className={"p-[10px] font-bold"} value = {file} onChange={(e) => setFile(e.target.value)} />
                </div>
                <div className={"p-[10px] mt-[10px]"}>
                    <button className={"p-[10px] font-bold rounded-[5px] bg-red-500 hover:bg-red-300"} onClick={() => {setFile('')}}>upload
                    </button>
                </div>
                <div className={"p-[10px]"}>
                    <Link to="/"
                          className={"text-blue-500 underline hover:no-underline hover:text-blue-800 font-bold"}> Use existing code</Link>
                </div>

            </div>
            </body>
        </>
    )
}
export default Signup