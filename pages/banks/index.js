import Head from "next/head"
import Link from "next/link"
import { useState, useEffect } from "react"

// Fetching data in Next.js Apps
export const getStaticProps = async () => {
    const res = await fetch('https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI');
    const data = await res.json();

    return {
        props: { banks: data }
    }
}

const Banks = ({ banks }) => {

    const [search, setSearch] = useState('');
    const [end, setEnd] = useState(false)
    
    // Custom Pagination
    const [count, setCount] = useState(0);
    const [size, setSize] = useState(10);
    
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
                    <label htmlFor="pageSize">No. of banks per page: </label>
                    <select id="pageSize" name="pageSize" onChange={(e) => { console.log(e.target.value); setSize(e.target.value)}}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
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