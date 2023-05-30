// // require("dotenv").config()
// const fs = require("fs")
// const Moralis = require("moralis").default

// const fileUploads = [
//     {
//         path: "resume_pic.jpg",
//         content: fs.readFileSync("./resume_pic.jpg",{encoding: "base64"})
//     },
//     {
//         path:"WIN_20230218_19_30_26_Pro.jpg",
//         content: fs.readFileSync("./WIN_20230218_19_30_26_Pro.jpg",{encoding: "base64"})
//     }
// ]

// async function addToIPFS(){
//     await Moralis.start({
//             apiKey: "e9IznzNBwCZgsZcgXAiGZsroWbryfHjhAIJjaDnsBbcpuYTdkVDNE6pEzVGrwlyf"

//         }
//     )
//     const res = Moralis.EvmApi.ipfs.uploadFolder({
//         abi: fileUploads
//     })
//     console.log((await res).result)
// }

// addToIPFS()
// module.exports = {addToIPFS}