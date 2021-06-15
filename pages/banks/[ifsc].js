import Head from "next/head"

// Fetching the number of route params required on the page
export const getStaticPaths = async () => {
    const res = await fetch('https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI');
    const data = await res.json();

    const paths = data.map(bank => {
        return {
            params: { ifsc: bank.ifsc.toString() }
        }
    });

    // The paths property is utilized to know the number of HTML pages to be generated
    return {
        paths,
        fallback: false
    }
}

// Fetching data for each individual route
export const getStaticProps = async (context) => {
    const ifsc = context.params.ifsc;
    const res = await fetch('https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI');
    const data = await res.json();
    let reqdBank;
    data.every(bank => {
        if (bank.ifsc === ifsc) {
            reqdBank = bank;
            return false;
        }
        return true;
    });

    return {
        props: { bank: reqdBank }
    }
}

const Details = ({ bank }) => {

    // Testing membership of current bank within local storage
    const membership = (arr, bank, ifsc) => {
        const found = arr.some(e => e.ifsc === ifsc);
        if (!found) arr.push(bank);
        return arr;
    }

    // Adding current bank as favourite
    const addFav = () => {
        let banks = JSON.parse(localStorage.getItem("banks") || "[]");
        banks = membership(banks, bank, bank.ifsc);
        localStorage.setItem("banks", JSON.stringify(banks));
    }

    return (
        <>
            <Head>
                <title>Bank Search | {bank.bank_name}</title>
                <meta name="keywords" content="bank" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 style={{ "textAlign": "center" }}>{bank.bank_name}</h1>
            <div className="bank-details">
                <p><strong>Branch: </strong>{bank.branch}</p>
                <p><strong>IFSC: </strong>{bank.ifsc}</p>
                <p><strong>Address: </strong>{bank.address}</p>
                <p><strong>District: </strong>{bank.district}</p>
                <p><strong>State: </strong>{bank.state}</p>
            </div>
            <a className="btn fav-btn" onClick={addFav}>Add to Favourites</a>
        </>
    );
}

export default Details;