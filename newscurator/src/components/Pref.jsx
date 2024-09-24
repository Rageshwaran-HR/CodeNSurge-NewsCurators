import {useState} from "react";
import Cookies from "universal-cookie";


const Pref = (props) => {
    const cookies = new Cookies
    const [prf, setPref] = useState([])
    const { setPrf } = props
    const lis = ["World", "Politics", "Business", "Technology", "Sports",
        "Entertainment", "Health", "Science", "Opinion"]

    function addPref(itm) {
        if(!prf.includes(itm)) {
            setPref([...prf, itm])
        }
    }

    function subm() {
        cookies.set('Pref', prf.join(","))
        setPrf(true)
    }

    return (
        <div className="flex place-items-center fixed z-[100] w-[100vw]
            h-[100vh] m-auto">
            <div className="bg-black blur-[15px] opacity-[0.5] w-full h-full absolute"></div>
            {/*<div className="absolute bg-slate-950 opacity-[0.5]"></div>*/}
            <div className="w-[50%] z-[200] h-fit ml-[25%] p-4 bg-slate-200 rounded-xl border-4
                border-slate-800">
                <p className="text-2xl mb-4">Preferences</p>
                {lis.map((itm) => (
                    <button className="rounded-full m-2 bg-red-800 text-white py-2 px-4"
                        onClick={() => addPref(itm)} key={itm}>
                        {itm}</button>
                ))}
                <br /><br />
                <button className="rounded-full m-2 bg-transparent border-red-800 text-red-800
                    border-4 py-2 px-4 text-xl hover:bg-red-800 hover:text-white
                    transition-all duration-300" onClick={subm}>
                    Submit</button>
            </div>
        </div>
    )
}

export default Pref