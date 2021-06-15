import Link from "next/link"

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <Link href="/"><a>McTechie's Bank Search</a></Link>
            </div>
            <Link href="/about"><a>About</a></Link>
            <Link href="/banks"><a>Bank Listings</a></Link>
            <Link href="/favourites"><a>Favourites</a></Link>
        </nav>
    );
}

export default Navbar;