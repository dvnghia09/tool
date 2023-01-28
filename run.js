import tmProxy from  './tmProxy.js'
import prompt from 'prompt';
import Main from  './main.js'
import  fs from  'fs'

const properties = [
    {
        name: 'apiTmProxy',
        warning: 'Nhập api TmProxy',
        required: true,
        message: 'Nhập api TmProxy'
    },
    {
        name: 'quantity',
        warning: 'Nhập số lượng',
        required: true,
        message: 'Nhập số lượng'
    }
];

prompt.start();

prompt.get(properties, async function (err, input) {
    if (err) {

    }
    // let  listProxy = fs.readFileSync('proxy.txt','utf8').split('\r\n')
    for (let i = 0; i < input.quantity; i++) {
          let proxy = await tmProxy(input.apiTmProxy)
         // let proxy = listProxy[Math.floor(Math.random()*listProxy.length)]
        console.log(proxy)
        let  main = new Main(proxy)
        let response = await  main.buff('https://career.caeruxlab.com/nhan_vat/tran-anh-duc/')
        console.log(response)
         await new Promise(r=>setTimeout(r,70000))
        console.log('Buff :' +i)
    }
    console.log('-------------done-------------')
})