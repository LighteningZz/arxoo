import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'
import './app.scss'
const Arxoo = (props) => (
    <>
        <Head {...props}>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css?family=Athiti:400" rel="stylesheet" />
        </Head>
        <Nav {...props} />
        {props.children}
    </>

)
export default Arxoo