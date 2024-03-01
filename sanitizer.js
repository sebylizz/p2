const fs = require('fs');

async function sanitize() {
try {
    const response = await fetch("https://www.washingtonpost.com/technology/interactive/2024/ai-video-sora-openai-flaws/", {
    "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en-DK;q=0.9,en;q=0.8,it-IT;q=0.7,it;q=0.6,da-DK;q=0.5,da;q=0.4",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": "wp_devicetype=0; wp_ak_signinv2=1|20230125; wp_ak_om=1|20230731; wp_ak_wab=1|2|0|0|0|1|1|1|2|20230418; wp_ak_v_mab=0|0|0|1|20231130; wp_ak_v_ot=1; wp_ak_ot=1|20211012; wp_geo=DK||||EEA; akaas_wp_ak_v_nav=1716848212~rv=24~id=a4250e50575b038831b143342a332f94~rn=0-control; ak_bmsc=499A8DAABF71EDFCDF49A7B2D63D3B8B~000000000000000000000000000000~YAAQXB1BF+Ur2+WNAQAAXGKk7BZ4LODfnjVPvBghmFC91Ied9DniaIYttnXTiROJfaq7FvnqvAb+K1MymlBoMhKEpLcNToEncGXjIL3SFB+0SarF1feODUstrjVGPxbEsyqDAAvlvuOkpvv9vUrbYP1KN9yi2M++DVmpSQpoMXfc63cZJyioqMMogLUdjoUNucOaC8w/mS/RgQF3Wd8iILiWTewGaBrLTBmT1ZgEgqxjcHLeOe2hqcJJFcrG/IjCU/fLrdc/mPWf9MqwDxCeMxzOB5E4+8aj2q/wur1Ll8GxIak06txqf00xX99WI2EteYQrWLuWMS9S8VC76e0a4HIh4DVuxpLArJPTIEiGf2bSOJ+PZ37Rijbnz8oJEkyp5R1tyvNayoiCAnNYovPa3ol1; wp_ttrid=\"de771048-6e3b-46a8-976b-8c76f56929ca\"; wp_usp=1---; wp_ak_bt=1|20200518; wp_ak_bfd=1|20201222; wp_ak_tos=1|20211110; wp_ak_sff=1|20220425; wp_ak_co=2|20220505; wp_ak_pp=1|20210310; _abck=60D0F02736653B1D91B8C463B4692C81~-1~YAAQXB1BF3Ys2+WNAQAAlWek7Asi9LAr06c2VC0+WYrhwp0YyyqQb0CTYLh2/co12HR/gjRbJ1IPgm7ZBuhouqNtNmmHIdDTwffnBArNVVwYvs4I9yg6lRyXYzdProtx46bO8mqWfIJH346/U0ABn8PCSmP47UBiPUMXMyEinx1vLjmdCvBppXRENMrgL7G+oviM8HxNJghdNmb6pFeCo3ALIQoJnlIP7rnlAVTW0XpPpic1fmP77E/h+LNwdDseNpbzstnh12Zss6wURQ5qXRTAb0+HtkKvDp25arvzsgq9GwWSHeMNbtMgnl/+8hg+4vm6/lRBmVxF/+kPMsTfcGTjxOUQVnEq48QfsbU03XbKcGqLKLfbI3MJ4WdFLq4ggpeWQQ==~-1~-1~-1; bm_sz=96AA99C3213CEA74243CA8F75D894E96~YAAQXB1BF3gs2+WNAQAAlWek7Bbbpry9NdGvQVDI0xOhN3bN4dJbmeRkad7PjSFZne+cPakogsnRftXuxiIAePn/0QQDs/yS1uSJp+MHnECx+LJwi96o4t0AN7crv7wovfhoH80TnAcZJmSuYe2T1eV5dSb4osG/MNQ9QZU7kAYwtn0Dk3G+VMXzjTEIDliFziFAdb6SDUgzqkvFj8ziqPLQYfji/Bjy4hb+j375sFA+frk2kEBxXK80WjND79Bc8rSGcfblWNUW27Uvi+4GhWgaWSFz+ofp5to80EoIxeVRZ9rh7xAsgbyH9llmm20KfC4PTQk82gECYqlahV364ys6uLW6vhzBx08b+8Bbo/XpjAnq8neXj0vgo0DPFY9w~3421497~4470839; wp_pwapi_ar=\"H4sIAAAAAAAA/w3IwRHAIAgEwF6uAkDkEruRYAf5Ofae7HM3KrgyZEazyFJ6iy757/WwJsbGiwGl3EIzde/EOR8LEDAmOAAAAA==\"; bm_sv=A4D05564224CCF1C0A38BCB5C9F7B7F8~YAAQXB1BFxQt2+WNAQAAmm6k7BbfJc/S3UuQMvYLA/5VLTvq1jvX6crO7sKNraQN6GuXOR1cLRH4OjsNoFRN/fFX/Nxoqb5QQQKsR5/EXoTFiwGll6iv8ZSl1FY7AE98tWp69Tk8OXSQx3pFQcPAw6v10x+tLIUSNFNX+IJaMp5Z2yZ6+RW0QapXarNbU73x9JALAyJc8dCHoiTgodDTeO9FVnyfSVd5dGc0QzupCVudgZeTM7z7xykgAL6aZK4K+VF4d3BPJ5Q=~1; wp_s=T.1.1709072214.1709072217.2.3.0.3",
        "Referer": "https://www.washingtonpost.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
    });

    const rawHtml = await response.text();

    const title = getTitle(rawHtml);
    const content = sanitizeHtml(rawHtml);

    return title+"\n"+content;
} catch (error) {
    console.error('Error:', error.message);
}
}

function getTitle(html){
    let title = html.match(/"article","headline":"([^"]+)/)[1];
    return title;
}

function sanitizeHtml(html) {
    let content = html.replace(/<[^>]*>/g, '').match(/storiesSave(.+?)www.washington/)[1];
    //return html.replace(/<[^>]*>/g, '');
    if(content === null){
        return "Couldn't retrieve article";
    }
    return content;
}

sanitize().then((result) => {
    fs.writeFile("./out.txt", result, function(err) {
        if(err){
            return console.log(err);
        }
        console.log("saved");
    });
});
