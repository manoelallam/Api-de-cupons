import puppeteer from "puppeteer"

async function ultimosCupons(loja) {
    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`https://www.meliuz.com.br/desconto/cupom-${loja}`);

    const texts = await page.$$eval('.coupons__coupon__details',
        divs => divs.map(({ innerText }) => innerText));

    const list = [];

    texts.forEach((t,v) => {
        list.push({oferta: t.split('\n')[0], cashback: t.split('\n')[1], validade: t.split('\n')[2] == "Recomendado" ? t.split('\n')[3] : t.split('\n')[2]})
    })

    const listFinal = list.filter(f => f.cashback != undefined)

    await browser.close();

    return listFinal;
}

export default ultimosCupons