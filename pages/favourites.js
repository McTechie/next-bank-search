import Head from "next/head"
import Link from "next/link"
import { useState, useEffect } from "react"

const Favourties = () => {

    const [searchName, setSearchName] = useState('');
    const [searchIfsc, setSearchIfsc] = useState('');
    const [localFav, setLocalFav] = useState([]);
    
    useEffect(() => {
        setLocalFav(JSON.parse(localStorage.getItem("banks") || "[]"));
    }, [])

    return (
        <>
            <Head>
                <title>Bank Search App | Favourites</title>
                <meta name="keywords" content="banks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="searchbar">
                <div>
                    <label htmlFor="bankSearch">Search for a Bank: </label>
                    <input type="text" placeholder="Enter Bank Name or IFSC" onChange={(e) => { setSearchName(e.target.value); setSearchIfsc(e.target.value) }} />
                </div>
            </div>
            <h1 style={{ "textAlign": "center" }}>Your Favourites</h1>
            {localFav.map(bank => {
                if (bank.bank_name.toLowerCase().includes(searchName.toLowerCase()) || bank.ifsc.includes(searchIfsc)) {
                    return (
                        <Link href={'/banks/' + bank.ifsc} key={bank.ifsc}>
                            <a className="single">
                                <h3>{bank.bank_name} ({bank.branch})</h3>
                            </a>
                        </Link>
                    )
                }
            })}
        </>
    );
}
 
export default Favourties;