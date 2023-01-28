import { fetch, CookieJar } from "node-fetch-cookies";
import HttpsProxyAgent  from  "https-proxy-agent"



export  default class main{
    constructor(proxy) {
        this.proxyAgent = ''
        this.hearder ={
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'content-type': 'application/x-www-form-urlencoded',
            'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': "Windows",
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
        }

        if (proxy!= undefined && proxy != null && proxy != ''){
            if (proxy.split(':').length==4){
                this.host=  proxy.split(':')[0]
                this.port = proxy.split(':')[1]
                this.userProxy =proxy.split(':')[2]
                this.passProxy =proxy.split(':')[3]
                this.proxyAgent = new HttpsProxyAgent('http://' +this.userProxy+':'+this.passProxy+'@'+this.host+':'+this.port);
            }
            if (proxy.split(':').length==2){
                this.host=  proxy.split(':')[0]
                this.port = proxy.split(':')[1]
                this.userProxy =''
                this.passProxy =''
                this.proxyAgent = new HttpsProxyAgent('http://' +this.host+':'+this.port);
            }
        }
        this.cookieJar = new CookieJar()
    }
    async buff(url){
        // let url ='https://career.caeruxlab.com/nhan_vat/tran-anh-duc/'
        let response = await (await fetch(this.cookieJar,url,{
            method:'GET',
            headers: this.hearder,
            agent: this.proxyAgent
        })).text()
        let nonce = response.match(/(?<=data-ulike-nonce=").*?(?=")/)?.[0]
        let urlPost='https://career.caeruxlab.com/wp-admin/admin-ajax.php'
        response = await (await fetch(this.cookieJar,urlPost,{
            method:'POST',
            headers: this.hearder,
            body: new URLSearchParams({
                action: 'wp_ulike_process',
                'id':543,
                nonce:nonce,
                type:'post',
                template:'wpulike-robeen',
                displayLikers:'',
                likersTemplate:'popover'
            }),
            agent: this.proxyAgent
        })).json()
        return response
    }
}