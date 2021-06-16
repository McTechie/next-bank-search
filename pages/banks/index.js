import Head from "next/head"
import Link from "next/link"
import { useState, useEffect } from "react"

// Fetching data in Next.js Apps
export const getStaticProps = async () => {
    const resMum = await fetch('https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI');
    const dataMum = await resMum.json();
    const resThane = await fetch('https://vast-shore-74260.herokuapp.com/banks?city=THANE');
    const dataThane = await resThane.json();
    const resDelhi = await fetch('https://vast-shore-74260.herokuapp.com/banks?city=DELHI');
    const dataDelhi = await resDelhi.json();
    const resBang = await fetch('https://vast-shore-74260.herokuapp.com/banks?city=BANGALORE');
    const dataBang = await resBang.json();
    const resKol = await fetch('https://vast-shore-74260.herokuapp.com/banks?city=KOLKATA');
    const dataKol = await resKol.json();

    return {
        props: { banksMum: dataMum, banksThane: dataThane, banksDelhi: dataDelhi, banksBang: dataBang, banksKol: dataKol }
    }
}

const Banks = ({ banksMum, banksThane, banksDelhi, banksBang, banksKol }) => {

    const [search, setSearch] = useState('');
    const [end, setEnd] = useState(false);
    const [banks, setBanks] = useState(banksMum);

    const handleCity = (e) => {
        if (e.target.value === 'THANE') {
            setBanks(banksThane);
        } else if (e.target.value === 'DELHI') {
            setBanks(banksDelhi);
        } else if (e.target.value === 'BANGALORE') {
            setBanks(banksBang);
        } else if (e.target.value === 'KOLKATA') {
            setBanks(banksKol);
        } else {
            setBanks(banksMum);
        }
    }
    
    // Custom Pagination
    const [count, setCount] = useState(0);
    const size = 20;
    
    const handleStart = () => {
        setCount(0);
    }
    
    const handleEnd = () => {
        setEnd(true);
        setCount(banks.filter(bank => (bank.bank_name.toLowerCase().includes(search.toLowerCase()) || bank.ifsc.includes(search) || bank.district.toLowerCase().includes(search.toLowerCase()) || bank.branch.toLowerCase().includes(search.toLowerCase()))).length - size);
    }
    
    const handlePrev = () => {
        if (count === 0) {
            handleEnd();
        } else {
            setCount(count => count - size);
        }
    }
    
    const handleNext = () => {
        if (end) {
            setEnd(false);
            setCount(0);
        } else {
            setCount(count => count + size);
        }
    }

    return (
        <>
            <Head>
                <title>Bank Search App | Listings</title>
                <meta name="keywords" content="banks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="searchbar">
                <div>
                    <label htmlFor="pageSize">Select Your City: </label>
                    <select id="pageSize" name="pageSize" onChange={handleCity}>
                        <option value="MUMBAI">Mumbai</option>
                        <option value="THANE">Thane</option>
                        <option value="DELHI">Delhi</option>
                        <option value="BANGALORE">Bangalore</option>
                        <option value="KOLKATA">Kolkata</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="bankSearch">Search for a Bank: </label>
                    <input type="text" name="bankSearch" placeholder="Enter Bank Name or IFSC" onChange={(e) => { setSearch(e.target.value) }} />
                </div>
            </div>
            <h1 style={{ "textAlign": "center" }}>All Banks</h1>
            <div className="pagination-btn-container">
                <a aria-label="button" className="pagination-btn" onClick={handleStart}>Start</a>
                <a aria-label="button" className="pagination-btn" onClick={handlePrev}>Prev</a>
                <a aria-label="button" className="pagination-btn" onClick={handleNext}>Next</a>
                <a aria-label="button" className="pagination-btn" onClick={handleEnd}>End</a>
            </div>
            {banks.filter(bank => (bank.bank_name.toLowerCase().includes(search.toLowerCase()) || bank.ifsc.includes(search) || bank.district.toLowerCase().includes(search.toLowerCase()) || bank.branch.toLowerCase().includes(search.toLowerCase()))).slice(count, count + size).map(bank => {
                return (
                    <Link href={'/banks/' + bank.ifsc} key={bank.ifsc}>
                        <a className="single">
                            <h3>{bank.bank_name} -- <span className="branch">({bank.branch})</span></h3>
                        </a>
                    </Link>
                )
            })}
            <div className="pagination-btn-container">
                <a aria-label="button" className="pagination-btn" onClick={handleStart}>Start</a>
                <a aria-label="button" className="pagination-btn" onClick={handlePrev}>Prev</a>
                <a aria-label="button" className="pagination-btn" onClick={handleNext}>Next</a>
                <a aria-label="button" className="pagination-btn" onClick={handleEnd}>End</a>
            </div>
        </>
    );
}

export default Banks;