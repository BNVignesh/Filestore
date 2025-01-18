

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
//
// const Signup = () => {
//     const [file, setFile] = useState(null); // To store the selected file
//     const [uploadStatus, setUploadStatus] = useState(''); // To store upload status
//
//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]); // Get the selected file
//     };
//
//     const handleUpload = async () => {
//         if (!file) {
//             alert('Please select a file to upload!');
//             return;
//         }
//
//         const formData = new FormData();
//         formData.append('files', file); // Append the selected file to FormData
//
//         try {
//             const response = await axios.post('/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//
//             // Assuming `parentId` is a field in the response data
//             if (response.data && response.data.parentId) {
//                 setUploadStatus(`File uploaded successfully! Your code is: ${response.data.parentId}`);
//             } else {
//                 setUploadStatus('File uploaded successfully, but no code was returned.');
//             }
//         } catch (error) {
//             setUploadStatus('File upload failed. Please try again.');
//             console.error('Upload error:', error);
//         }
//     };
//
//     return (
//         <>
//             <body className="">
//             <div className="w-full p-5 mx-auto text-center bg-amber-100">
//                 <h1 className="m-auto text-3xl font-bold italic text-cyan-800">
//                     Welcome to Online File Storage
//                 </h1>
//             </div>
//
//             <div className="w-[500px] bg-cyan-200 mt-20 mx-auto rounded-2xl flex-col">
//                 <div className="font-bold p-4 text-2xl">
//                     First time or need a new code
//                 </div>
//                 <div className="w-full">
//                     <input
//                         type="file"
//                         className="p-[10px] font-bold"
//                         onChange={handleFileChange} // Update file state
//                     />
//                 </div>
//                 <div className="p-[10px] mt-[10px]">
//                     <button
//                         className="p-[10px] font-bold rounded-[5px] bg-red-500 hover:bg-red-300"
//                         onClick={handleUpload} // Upload file to server
//                     >
//                         Upload
//                     </button>
//                 </div>
//                 {uploadStatus && (
//                     <div className="p-[10px] mt-[10px] text-green-600 font-bold">
//                         {uploadStatus}
//                     </div>
//                 )}
//                 <div className="p-[10px]">
//                     <Link
//                         to="/"
//                         className="text-blue-500 underline hover:no-underline hover:text-blue-800 font-bold"
//                     >
//                         Use existing code
//                     </Link>
//                 </div>
//             </div>
//             </body>
//         </>
//     );
// };
//
// export default Signup;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [files, setFiles] = useState([]); // To store the selected files
    const [uploadStatus, setUploadStatus] = useState(''); // To store upload status

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files)); // Update files state
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            alert('Please select at least one file to upload!');
            return;
        }

        const formData = new FormData();
        // Append each file with the same key "files" to match backend expectations
        files.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle the server response
            if (response) {
                setUploadStatus(
                    `Files uploaded successfully! Your codes are: ${response.data.parentId}`
                );
            } else {
                setUploadStatus('Files uploaded successfully, but no codes were returned.');
            }
        } catch (error) {
            setUploadStatus('File upload failed. Please try again.');
            console.error('Upload error:', error);
        }
    };

    return (
        <div>
            <div className="w-full p-5 mx-auto text-center bg-blue-100 shadow-2xl">
                <h1 className="m-auto text-3xl font-bold italic text-cyan-800">
                    Welcome to Online File Storage
                </h1>
            </div>

            <div className="w-[500px] bg-blue-200 mt-20 mx-auto rounded-[5px] flex-col bg-opacity-70 font-sans shadow-2xl">
                <div className="font-bold p-4 text-2xl">
                    First time or need a new code
                </div>
                <div className="w-full p-4">
                    <input
                        type="file"
                        className="p-2 font-bold w-full"
                         // Allow multiple file selection
                        onChange={handleFileChange} // Update files state
                        multiple="multiple"
                    />
                </div>
                <div className="p-4">
                    <button
                        className="p-2 font-bold text-black rounded bg-neutral-100 text-white hover:bg-neutral-300 w-full"
                        onClick={handleUpload} // Upload files to server
                    >
                        Upload
                    </button>
                </div>
                {uploadStatus && (
                    <div className="p-4 mt-2 text-green-600 font-bold text-center">
                        {uploadStatus}
                    </div>
                )}
                <div className="p-4">
                    <Link
                        to="/"
                        className="text-blue-500 underline hover:no-underline hover:text-blue-800 font-bold"
                    >
                        Use existing code
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
