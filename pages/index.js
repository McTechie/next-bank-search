import Head from "next/head"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Head>
        <title>Bank Search App | Home</title>
        <meta name="keywords" content="banks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="title">Home Page</h1>
        <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae error, facere ex illo, cumque rem consectetur nobis corrupti modi perferendis excepturi iure. Provident iure architecto cumque, quos repellendus debitis dolor.</p>
        <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae error, facere ex illo, cumque rem consectetur nobis corrupti modi perferendis excepturi iure. Provident iure architecto cumque, quos repellendus debitis dolor.</p>
        <Link href="/banks"><a className="btn">See Banks Listing</a></Link>
      </div>
    </>
  )
}
