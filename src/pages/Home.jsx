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

    // to get all the files available when page loaded

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

    //to store the inputed files in file array

    const handleFileChange = (e) => {
        setFile(Array.from(e.target.files));
    }

    //to send a request for storing the files in database

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

    //to send a request for deleting the file

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

    //to send a request to download a file
    const downloadFile = async (index) => {
        const response = await axios.get(`/download/${keys[index]}`);
        console.log(response);
    }

    //rendered page

    return (
        <>
            <div className={"w-full mb-[15px] p-4 bg-blue-400 justify-center text-center font-bold bg-opacity-50 shadow-2xl"}>
                <input type="file" className={"m-auto  bg-blue-400 p-2 rounded-[10px] m-[5px] "} onChange={handleFileChange} multiple = "multiple" />
                <button className={" bg-blue-400 rounded-[5px] p-2 hover:bg-blue-200 m-[5px]"} onClick={uploadFile}>upload</button>
                <p className={"text-2xl text-cyan-800"}>{uploadResponse}</p>

            </div>


            <div className="w-full flex m-[10px] gap-3 flex-wrap justify-center">
                {data.map((item, index) => (
                    <div key={index} className="bg-blue-300 bg-opacity-50 w-[400px] rounded-[5px] hover:shadow-2xl">
                        <div className="font-sans text-4xl p-4">{item.fileName || `File ${index + 1}`}</div>
                        <div className="font-bold text-xl p-4 flex justify-between ">
                            <div>{item.fileName.split(".").pop() || 'Unknown Type'}</div>
                            <div >
                                <a   href={item.downloadURL || '#'} className={"bg-neutral-200 p-2 mt-2 rounded-[10px] hover:bg-neutral-400"} onClick={() => (downloadFile(index))}>
                                    Download
                                </a>
                            </div>
                            <div>
                                <button href={item.deleteURL || '#'}
                                   className={"bg-neutral-200 p-2 rounded-[10px] hover:bg-neutral-400"} onClick={() => (deleteFile(index))}>
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
