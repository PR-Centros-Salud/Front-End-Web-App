import Head from "next/head";

const Layout = ({ children }) => {

  return (
    <>
        <Head>
            <title>Medic App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/images/icons/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/images/icons/favicon-16x16.png"/>
            <link rel="manifest" href="/images/icons/site.webmanifest"/>
            <link rel="mask-icon" href="/images/icons/safari-pinned-tab.svg" color="#5bbad5"/>
            <meta name="msapplication-TileColor" content="#da532c"/>
            <meta name="theme-color" content="#ffffff"/>
        </Head>
        <main>
            { children }
        </main>

    </>
  )
}

export default Layout