import Link from 'next/link';
import { useMoralis } from 'react-moralis';
import { ConnectButton, LinkTo } from 'web3uikit';
import Image from 'next/image'
export default function HeaderPage(){
    const {isWeb3Enabled} = useMoralis()
    return(
        <div style={{marginBottom:"1%"}}>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                <div style={{display:"flex", flexDirection:"row",gap:"2px",alignItems:"center",color:"red",fontSize:"18px",fontFamily:"times new roman"}}>
                    <Image src={'/logo-2.jpg'} width={100} height={100}></Image>
                    <Link href={'/'}><h2>The National Credit System</h2></Link>
                </div>
                
                <div style={{color:"#505050",display:"flex",flexDirection:"row",justifyContent:"flex-end",alignItems:"center",gap:"2%",fontFamily:"cursive"}}>
                    {isWeb3Enabled ? (

                        <Link href={"/dashboard"}>
                            <h3>Dashboard</h3>
                        </Link>):(
                        <Link href={"/"}>
                            
                        </Link>
                    )}
                    
                    <Link href={"/admin"}>
                        <h3>Admin</h3>
                    </Link>
                    
                    <a href='https://www.google.com/' target='_blank'>
                        <h3>Docs</h3>
                    </a>
                    <Link href={"/faq"} target='_blank'>
                        <h3>FAQs</h3>
                    </Link>

                    <ConnectButton moralisAuth={true}/>
                </div>
            </div>
            <hr></hr>
            
        </div>
    )
}