import react from 'react';

const Home = () => {
    return (
        <>
            <div className={"w-full flex m-[10px]"}>
                <div className={"bg-emerald-400 w-[400px] rounded-[5px] hover:bg-emerald-200"}>
                    <div className={"font-bold text-4xl p-4"}>
                        File 1
                    </div>
                    <div className={"font-bold text-xl p-4 flex justify-between"}>
                        <div>
                            pdf
                        </div>
                        <div>
                            download
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Home;