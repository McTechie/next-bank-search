import Head from "next/head"
import Link from "next/link"
import { useState, useEffect } from "react"

const Favourties = () => {

    const [searchName, setSearchName] = useState('');
    const [searchIfsc, setSearchIfsc] = useState('');

    // Accessing Browser's Local Storage
    const [localFav, setLocalFav] = useState([]);

    useEffect(() => {
        setLocalFav(JSON.parse(localStorage.getItem("banks") || "[]"));
        console.log(localFav);
    }, []);

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
            {(localFav.length === 0) && (
                <div style={{ "color": "#777", "textAlign": "center" }}>
                    <div>You have no favourites yet :&#40;</div> <br />
                    <div>Check out our Bank listings and possibly add one to your favourties!</div>
                </div>
            )}
            {(localFav.length !== 0) && localFav.filter(bank => bank.bank_name.toLowerCase().includes(searchName.toLowerCase()) || bank.ifsc.includes(searchIfsc)).map(bank => {
                return (
                    <Link href={'/banks/' + bank.ifsc} key={bank.ifsc}>
                        <a className="single">
                            <h3>{bank.bank_name} -- <span className="branch">({bank.branch})</span></h3>
                        </a>
                    </Link>
                )
            })}
        </>
    );
}
 
export default Favourties;