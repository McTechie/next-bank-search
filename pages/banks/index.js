import Head from "next/head"
import Link from "next/link"
import { useState } from "react"

// Fetching data in Next.js Apps
export const getStaticProps = async () => {
    const res = await fetch('https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI');
    const data = await res.json();
    const items = data.length;

    return {
        props: { banks: data, items }
    }
}

// Implement Custom Pagination with useState(prev and next) and current items listing

const Banks = ({ banks, items }) => {
    
    // Custom Pagination
    const [count, setCount] = useState(0);
    const [size, setSize] = useState(10);
    const [newBanks, setNewBanks] = useState(banks.slice(count, count + size));
    
    const handleStart = () => {
        setCount(0);
    }

    const handleEnd = () => {
        setCount(items - size);
    }
    
    const handlePrev = () => {
        if (count === 0) {
            setCount(0);
        } else {
            setCount(count => count - size);
        }
    }

    const handleNext = () => {
        if (count > items) {
            setCount(0);
        } else {
            setCount(count => count + size);
        }
    }

    const handleSearch = (e) => {
        if (e.target.value === '' || e.target.value === ' ') {
            window.location.reload();
        } else {
            setNewBanks(banks.filter((bank) => (bank.bank_name.toLowerCase().includes(e.target.value.toLowerCase()) || bank.ifsc.includes(e.target.value))));
        }
    }

    return (
        <>
            <Head>
                <title>Bank Search | Listings</title>
                <meta name="keywords" content="banks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="searchbar">
                <div>
                    <label htmlFor="pageSize">No. of banks per page: </label>
                    <select id="pageSize" name="pageSize" onChange={(e) => setSize(e.target.value)}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="bankSearch">Search for a Bank: </label>
                    <input type="text" name="bankSearch" placeholder="Enter Bank Name or IFSC" onChange={handleSearch} />
                </div>
            </div>
            <h1 style={{ "textAlign": "center" }}>All Banks</h1>
            <div className="pagination-btn-container">
                <a aria-label="button" className="pagination-btn" onClick={handleStart}>Start</a>
                <a aria-label="button" className="pagination-btn" onClick={handlePrev}>Prev</a>
                <a aria-label="button" className="pagination-btn" onClick={handleNext}>Next</a>
                <a aria-label="button" className="pagination-btn" onClick={handleEnd}>End</a>
            </div>
            {newBanks.map(bank => {
                return (
                    <Link href={'/banks/' + bank.ifsc} key={bank.ifsc}>
                        <a className="single">
                            <h3>{bank.bank_name} ({bank.branch})</h3>
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