import '@/styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import { IPFSInput, NotificationProvider,Ico } from 'web3uikit'
import Head from 'next/head'
import HeaderPage from './HeaderPage'
import Footer from './Footer'

export default function App({ Component, pageProps }) {
  return (
      <MoralisProvider initializeOnMount={false}>
        <NotificationProvider>
          <Head>
            <title>National Credits System</title>
            <meta name="description" content="Governed by Indian Education Ministry." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div style={{margin:"1% 7% 7%",backgroundImage:"9th-grade-2.jpg"}}>
            <HeaderPage/>
            <Component {...pageProps} />
          </div> 
                  
        </NotificationProvider>      
      </MoralisProvider>
    
  )
}
