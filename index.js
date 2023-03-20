const puppeteer = require('puppeteer');
//biblioteca para conseguir pegar dados de entrada no console
const readLineSync = require('readline-sync');

async function RoboConversor(){
    /*headless é um atributo do launch que faz com que nosso bot funcione no navegador de forma completa, por padrão o 
    headless vem true mas para iniciarmos uma versão completa ("com cabeça") devemos deixar o headless como "false"
    */
    const browser = await puppeteer.launch({ headless: true});
    // browser é um atributo do pupperteer que abre o browser e com o ".newPage()" cria uma nova page
    const page = await browser.newPage();

    const moedaBase = readLineSync.question('Informe a moeda base: ') || 'dolar';
    const moedaAtual = readLineSync.question('Informe a moeda desejada: ') || 'real';
    //.goto() vai levar a página criada para uma url específica
    await page.goto(`https://www.google.com/search?q=${moedaBase}+para+${moedaAtual}&oq=${moedaBase}+para+${moedaAtual}&aqs=chrome..69i57j0i271l2.2882j0j1&sourceid=chrome&ie=UTF-8`);
   
    //valor da class que guarda o valor de conversão do browser, porém desta forma não conseguimos acessar o conteúdo da página
    //const resultado = document.querySelector('.lWzCpb a61j6').value;

     //evaluate >> permite que a gente rode um código js para que a gente tenha acesso a página e pega um retorno a partir disso, ou seja, algum elemento da página
     // a gente joga o retorno da função no terminal do browser e o resultado vai pra variável "resultado"
     const resultado = await page.evaluate(() => {
        return document.querySelector('.lWzCpb.a61j6').value;
    })

    console.log(`O valor de 1 ${moedaBase} convertido em ${moedaAtual} é ${resultado}`);
    //browser.close serve para fechar o aba web
    await browser.close();
}

RoboConversor();