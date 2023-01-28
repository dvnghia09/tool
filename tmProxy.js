import { fetch, CookieJar } from "node-fetch-cookies";
let cookieJar = new CookieJar()

export default async function ChangeAndGetProxy(apiKey) {
    await fetch(cookieJar,'https://tmproxy.com/api/proxy/get-new-proxy',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "api_key": apiKey,
            "sign": "",
            "id_location": 0
        })
    })

    let response = await (await fetch(cookieJar,'https://tmproxy.com/api/proxy/get-current-proxy',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "api_key": apiKey
        })
    })).json()

    if (response?.data?.https === null || response?.data?.https === undefined){
        await new Promise(r=>setTimeout(r,10000))
        await ChangeAndGetProxy(apiKey)
    }
    return  (response?.data?.https ?? undefined)
}