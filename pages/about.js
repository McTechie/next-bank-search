import Head from "next/head"

const About = () => {
    return (
        <>
            <Head>
                <title>Bank Search App | About</title>
                <meta name="keywords" content="banks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <h1 className="title" style={{"textAlign": "center"}}>About Page</h1>
                <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, aperiam harum! Quasi suscipit sint saepe quisquam atque necessitatibus voluptas ex totam, accusamus nobis aliquam officiis rem magnam, quis laudantium numquam.</p>
                <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, aperiam harum! Quasi suscipit sint saepe quisquam atque necessitatibus voluptas ex totam, accusamus nobis aliquam officiis rem magnam, quis laudantium numquam.</p>
            </div>
        </>
    );
}

export default About;