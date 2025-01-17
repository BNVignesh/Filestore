import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [code, setCode] = useState('');
    const [data, setData] = useState([]);
    const [file, setFile] = useState([]);
    const [keys, setKeys] = useState([]);
    const [uploadResponse, setUploadResponse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const accessCode = localStorage.getItem('code');
            if (!accessCode) {
                navigate('/login'); // Redirect if no code is found
                return;
            }
            setCode(accessCode);

            try {
                const response = await axios.get(`/files/${accessCode}`);
                setData(response.data.files); // Assuming `response.data` contains the array of files
                console.log(response.data);

                const keys = [];

                response.data.files.forEach((file)=> {
                    const url = file.deleteURL;
                    const fileKey = url.split('/').pop();
                    keys.push(fileKey);
                })

                setKeys(keys);

                console.log(keys);

            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchData();
    }, [navigate]);

    const handleFileChange = (e) => {
        setFile(Array.from(e.target.files));
    }

    const uploadFile = async () =>{
        if(file.length === 0){
            setUploadResponse("Select atleast one file");
            return;
        }

        const formData = new FormData();
        file.forEach((a) =>{
            formData.append('files', a);
        })

        try{
            const response = axios.post(`/upload/${code}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if(response){
                setUploadResponse("Upload successfully!");
            }

        }catch (error){
            setUploadResponse("Error uploading file");
            console.log(error);
        }
    }

    const deleteFile = async (index) =>{
        const response = await axios.delete(`/delete/${keys[index]}`);
        keys.splice(index, 1);

        if(response.data.remainingCount === 0){
            console.log("no files found.");
            navigate('/');
        }

        console.log(index);
        console.log(response);
        location.reload();
    }

    return (
        <>
            <div className={"w-full m-[10px] p-4 bg-cyan-400"}>
                <input type="file" className={"m-auto"} onChange={handleFileChange} multiple = "multiple" />
                <button className={" bg-cyan-100 rounded-[5px] p-2 hover:bg-emerald-200"} onClick={uploadFile}>upload</button>
                <p className={"text-2xl text-cyan-800"}>{uploadResponse}</p>

            </div>


            <div className="w-full flex m-[10px] gap-3 flex-wrap justify-center">
                {data.map((item, index) => (
                    <div key={index} className="bg-emerald-400 w-[400px] rounded-[5px] ">
                        <div className="font-bold text-4xl p-4">{item.fileName || `File ${index + 1}`}</div>
                        <div className="font-bold text-xl p-4 flex justify-between ">
                            <div>{item.type || 'Unknown Type'}</div>
                            <div >
                                <a href={item.downloadURL || '#'} download className={"bg-cyan-100 p-2 rounded-1xl hover:bg-emerald-200"}>
                                    Download
                                </a>
                            </div>
                            <div>
                                <button href={item.deleteURL || '#'}
                                   className={"bg-cyan-100 p-2 rounded-1xl hover:bg-emerald-200"} onClick={() => (deleteFile(index))}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </>
    );
};

export default Home;
