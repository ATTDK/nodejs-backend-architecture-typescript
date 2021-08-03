import request from 'request';
import express, { RequestHandler } from 'express';
import puppeteer from 'puppeteer';
import asyncHandler from '../helpers/asyncHandler';
import cheerioModule from 'cheerio';
import { load, } from 'cheerio';
import axios from 'axios';
import ContentRepo from '../database/repository/ContentRepo';
import Content, { ContentModel } from '../database/model/Content';
import '../database';
import { crossOriginResourcePolicy } from 'helmet';
import { format } from 'morgan';

const router = express.Router();
const EmptyUrl = ''
const baseGoogleUrl = 'https://www.google.com'
const googleurl1 = 'https://www.google.com/search?q=site:twitter.com+intitle%3A'
const googleurl2 = '&tbs=cdr:1,cd_min:'
const googleurl3 = ',cd_max:'
// const browser = puppeteer.launch({
  // headless: true,
  // headless: false,
  // args: ['--no-sandbox', '--disable-setuid-sandbox'],//for ec2
  // executablePath: '/usr/bin/chromium-browser', // for ec2
  // ignoreDefaultArgs: ["--enable-automation"],
// });

const timer = (ms: number | undefined) => new Promise(res=>setTimeout(res,ms))

export async function startTW_pastCrawl(){
  for(let i=1;i<10;i++){
    console.log("start Twitter gg crawl"+i)
    getTWUrl_google(i)
    await timer(24 * 60 * 1000)
  }
  startTW_pastCrawl()
  // testGGCrawl(googleurl1+encodeURIComponent('김세정')
  // +googleurl2+startYr.getMonth() +"/"+ startYr.getDate() +"/"+ startYr.getFullYear()
  // +googleurl3+endYr.getMonth() +"/"+ endYr.getDate() +"/"+ endYr.getFullYear(),'김세정')
  // testTWCrawl('https://www.google.com/search?q=%EC%95%84%EC%9D%B4%EC%9C%A0+site:twitter.com&sxsrf=ALeKk007lSF_4b3k2ukkESzpI_2lX87ASw:1627496580598','아이유')
  // testTWCrawl('https://mobile.twitter.com/_iuofficial/status/1375721534233309185','아이유')
  // crawl_tw("https://mobile.twitter.com/_iuofficial/status/1375721534233309185","아이유")
  // crawl_tw("https://twitter.com/kr_now/status/1374922549008560131","아이유")
  // ggCrawl("https://www.google.com/search?q=%EC%95%84%EC%9D%B4%EC%9C%A0+site%3Atwitter.com&oq=%EC%95%84%EC%9D%B4%EC%9C%A0+&aqs=chrome.0.69i59l2j69i57j69i60j69i61l2j69i65l2.2484j0j9&sourceid=chrome&ie=UTF-8","아이유")
}
async function testTWCrawl(url : string,artist : string){
  try{
    console.log("twCrawl url "+url)
    const inBrowser = await puppeteer.launch({
        headless: false,
        ignoreDefaultArgs : ["--enable-automation"]
        // headless: true, //for ec2
        // args: ['--no-sandbox', '--disable-setuid-sandbox'],//for ec2
        // executablePath: '/usr/bin/chromium-browser', // for ec2
      })
    const page = await (await inBrowser).newPage();
    await page.setExtraHTTPHeaders({
      'asscept-charset':'euc-kr'
    })
    
    await page.setViewport({
      width: 1366,
      height: 768,
    });
    await page.goto(url);
    await timer(3000)
    const content = await page.content()
    const $ = load(content) 

    //load content.eachitem read
    //
    //
    // const lists = $('.tF2Cxc').find('a')
    let next = undefined
    let lastUrl = undefined
    $('a').each(async function (index, elem){
      if($(this).attr('href')?.toString().match('/status/') && !$(this).attr('href')?.toString().match('webcache')){
        next=$(this).attr('href')?.toString()
        console.log('href : '+next)
        crawl_tw($(this).attr('href')!.toString(),artist)
      }
    })
    // const nextlist =  $('tbody')
    // nextlist.each(async (index,element)=>{
    //   if($(nextlist).find('a').attr('id')?.toString().match('pnnext')){
    //     console.log('asdasdasd??')
    //     next = $(nextlist).attr('href')?.toString().trim()
    //   }
    // })
    
    // for(let i=1;i<lists.length;i++){
    //   await timer(100)
    //   if($(lists[i]).attr('href')?.toString().match('twitter') && !$(lists[i]).attr('href')?.toString().match('webcache')&& !$(lists[i]).attr('href')?.toString().match('recommend')){
    //     console.log("dkdk"+Date())
    //     console.log($(lists[i]).attr('href'))
    //     // crawl_tw($(lists[i]).attr('href')!.toString(),artist)
    //   }
    // }
    // await page.close()
    // if(next != undefined){
    //   console.log("DKDK ::: __ next link : "+ next)
    //   testTWCrawl(baseGoogleUrl+next,artist)
    // }
    // inBrowser.close()
  }catch(error){
    console.log("error 1 : "+error)
  }
}

async function getTWUrl_google(index : number){
  switch (index) {
    case 1 : tt_gg_crawl1()
      break;
    case 2 : tt_gg_crawl2()
      break;
    case 3 : tt_gg_crawl3()
      break;
    case 4 : tt_gg_crawl4()
      break;
    case 5 : tt_gg_crawl5()
      break;
    case 6 : tt_gg_crawl6()
      break;
    case 7 : tt_gg_crawl7()
      break;
    case 8 : tt_gg_crawl8()
      break;
    case 9 : tt_gg_crawl9()
      break;
    default:
      break;
  }
}
async function tt_gg_crawl1() {
  for(var i=1; i<=10; i++){
    var artist = ""
    switch (i) {
      case 1:
        artist = "강승윤"
        break;
      case 2:
        artist = "구구단"
        break;
      case 3:
        artist = "구구단 세미나"
        break;
      case 4:
        artist = "국헌"
        break;
      case 5:
        artist = "유빈"
        break;
      case 6:
        artist = "규현"
        break;
      case 7:
        artist = "김기범"
        break;
      case 8:
        artist = "김도연"
        break;
      case 9:
        artist = "김동현"
        break;
      case 10:
        artist = "김성규"
        break;                                                              
      default:
        artist = "강승윤"
        break;
    }
    await timer(15000)
    ggCrawl(getUrl(artist),artist)
  }
}
async function tt_gg_crawl2() {
  for(var i=1; i<=10; i++){
    var artist = ""
    switch (i) {
      case 1:
        artist = "김우석"
        break;
      case 2:
        artist = "나띠"
        break;
      case 3:
        artist = "남우현"
        break;
      case 4:
        artist = "넬"
        break;
      case 5:
        artist = "노태현"
        break;
      case 6:
        artist = "뉴이스트"
        break;
      case 7:
        artist = "뉴이스트W"
        break;
      case 8:
        artist = "동방신기"
        break;
      case 9:
        artist = "드림캐쳐"
        break;
      case 10:
        artist = "라비"
        break;                                                              
      default:
        artist = "라비"
        break;
    }
    await timer(15000)
    ggCrawl(getUrl(artist),artist)
  }
}
async function tt_gg_crawl3() {
  for(var i=1; i<=10; i++){
  await timer(15000)
    var artist = ""
    switch (i) {
      case 1:
        artist = "러블리즈"
        break;
      case 2:
        artist = "레드벨벳"
        break;
      case 3:
        artist = "레오"
        break;
      case 4:
        artist = "로제"
        break;
      case 5:
        artist = "마마무"
        break;
      case 6:
        artist = "모모랜드"
        break;
      case 7:
        artist = "몬스타엑스"
        break;
      case 8:
        artist = "문별"
        break;
      case 9:
        artist = "바비"
        break;
      case 10:
        artist = "박세진"
        break;                                                              
      default:
        artist = "김윤주"
        break;
        
    }
    ggCrawl(getUrl(artist),artist)
  }
}
async function tt_gg_crawl4() {
  for(var i=1; i<=10; i++){
    await timer(15000)
    var artist = ""
    switch (i) {
      case 1:
        artist = "백현"
        break;
      case 2:
        artist = "베리베리"
        break;
      case 3:
        artist = "블랙핑크"
        break;
      case 4:
        artist = "빅스"
        break;
      case 5:
        artist = "빅스LR"
        break;
      case 6:
        artist = "샤이니"
        break;
      case 7:
        artist = "성진환"
        break;
      case 8:
        artist = "세븐틴"
        break;
      case 9:
        artist = "세훈"
        break;
      case 10:
        artist = "찬열"
        break;                                                              
      default:
        artist = "김윤주"
        break;
    }
    ggCrawl(getUrl(artist),artist)
  }
}
async function tt_gg_crawl5() {
  for(var i=1; i<=10; i++){
    await timer(15000)
    var artist = ""
    switch (i) {
      case 1:
        artist = "김윤주"
        break;
      case 2:
        artist = "소녀시대"
        break;
      case 3:
        artist = "소녀시대-Oh!GG"
        break;
      case 4:
        artist = "송민호"
        break;
      case 5:
        artist = "수호"
        break;
      case 6:
        artist = "슈퍼주니어"
        break;
      case 7:
        artist = "슈퍼주니어-D&E"
        break;
      case 8:
        artist = "신화"
        break;
      case 9:
        artist = "아스트로"
        break;
      case 10:
        artist = "아이즈원"
        break;                                                              
      default:
        artist = "김윤주"
        break;
    }
    ggCrawl(getUrl(artist),artist)
  }
}
async function tt_gg_crawl6() {
  for(var i=1; i<=10; i++){
    await timer(15000)
    var artist = ""
    switch (i) {
      case 1:
        artist = "안녕하신가영"
        break;
      case 2:
        artist = "안예은"
        break;
      case 3:
        artist = "SF9"
        break;
      case 4:
        artist = "EXO"
        break;
      case 5:
        artist = "엑스원"
        break;
      case 6:
        artist = "NCT"
        break;
      case 7:
        artist = "NCT127"
        break;
      case 8:
        artist = "NCT드림"
        break;
      case 9:
        artist = "여자친구"
        break;
      case 10:
        artist = "영케이"
        break;                                                              
      default:
        artist = "김윤주"
        break;
    }
    ggCrawl(getUrl(artist),artist)
  }
}
async function tt_gg_crawl7() {
  for(var i=1; i<=10; i++){
    await timer(15000)
    var artist = ""
    switch (i) {
      case 1:
        artist = "예성"
        break;
      case 2:
        artist = "요조"
        break;
      case 3:
        artist = "워너원"
        break;
      case 4:
        artist = "웨이션브이"
        break;
      case 5:
        artist = "위키미키"
        break;
      case 6:
        artist = "유노윤호"
        break;
      case 7:
        artist = "윤도현"
        break;
      case 8:
        artist = "윤아"
        break;
      case 9:
        artist = "윤지성"
        break;
      case 10:
        artist = "이성종"
        break;                                                              
      default:
        artist = ""
        break;
    }
    ggCrawl(getUrl(artist),artist)
  }
}
async function tt_gg_crawl8() {
  for(var i=1; i<=10; i++){
    await timer(15000)
    var artist = ""
    switch (i) {
      case 1:
        artist = "이진혁"
        break;
      case 2:
        artist = "인투잇"
        break;
      case 3:
        artist = "정세운"
        break;
      case 4:
        artist = "조승연"
        break;
      case 5:
        artist = "종현"
        break;
      case 6:
        artist = "준수"
        break;
      case 7:
        artist = "지수연"
        break;
      case 8:
        artist = "청하"
        break;
      case 9:
        artist = "첸"
        break;
      case 10:
        artist = "최강창민"
        break;                                                              
      default:
        artist = ""
        break;
    }
    ggCrawl(getUrl(artist),artist)
  }
}
async function tt_gg_crawl9() {
  for(var i=1; i<=8; i++){
    await timer(15000)
    var artist = ""
    switch (i) {
      case 1:
        artist = "최유정"
        break;
      case 2:
        artist = "크나큰"
        break;
      case 3:
        artist = "태민"
        break;
      case 4:
        artist = "태연"
        break;
      case 5:
        artist = "트레저"
        break;
      case 6:
        artist = "프로미스나인"
        break;
      case 7:
        artist = "하성운"
        break;
      case 8:
        artist = "혁"
        break;                                                              
      default:
        artist = ""
        break;
    }
    ggCrawl(getUrl(artist),artist)
  }
}
function getUrl(artist:string) {
  let startYr = new Date();
  let endYr = new Date();
  startYr.setFullYear(startYr.getFullYear()-2)
  startYr.setMonth(startYr.getMonth()+1)
  // endYr.setFullYear(endYr.getFullYear()-2)/
  endYr.setFullYear(endYr.getFullYear()-1)
  endYr.setMonth(endYr.getMonth()-11)
  endYr.setDate(endYr.getDate()+1)
  
  return googleurl1+encodeURIComponent(artist)
  +googleurl2+startYr.getMonth() +"/"+ startYr.getDate() +"/"+ startYr.getFullYear()
  +googleurl3+endYr.getMonth() +"/"+ endYr.getDate() +"/"+ endYr.getFullYear()
}

async function ggCrawl(url:string, artist : string){
  const UA =  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
  try{
    console.log("ggCrawl url "+url)
    const inBrowser = await puppeteer.launch({
        headless: false,
        args:['--disable-web-security'],
        // headless: true, //for ec2
        // args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],//for ec2
        // executablePath: '/usr/bin/chromium-browser', // for ec2
      })
    const page = await (await inBrowser).newPage();
    await page.setExtraHTTPHeaders({
      'asscept-charset':'euc-kr'
    })
    
    await page.setViewport({
      width: 1366,
      height: 768,
    });
    await page.goto(url);
    const content = await page.content()
    const $ = load(content) 
    if(page.url().match('www.google.com/sorry/index?')){
      console.log("its blocked")
    }
    const lists = $('.tF2Cxc').find('a')
    let next = undefined
    $('tbody').find('td').each(async function (index, elem){
      if($(this).find('a').attr('id')?.toString()=='pnnext'){
        next=$(this).find('a').attr('href')?.toString()
      }
    })
    for(let i=1;i<lists.length;i++){
      if($(lists[i]).attr('href')?.toString().match('/status/') && !$(lists[i]).attr('href')?.toString().match('webcache')){
        await timer(2000)
        if(i%2==1){
          console.log($(lists[i]).attr('href') + i.toString())
          crawl_tw($(lists[i]).attr('href')!.toString(),artist)
        }
      }
    }
    // $('a').each(async function (index, elem){
    //   if($(this).attr('href')?.toString().match('/status/') && !$(this).attr('href')?.toString().match('webcache')){
    //     await timer(1000)
    //     crawl_tw($(this).attr('href')!.toString(),artist)
    //   }
    // })
    await page.close()
    if(next != undefined){
      console.log("DKDK ::: __ next link : "+ next)
      ggCrawl(baseGoogleUrl+next,artist)
    }
    inBrowser.close()
  }catch(error){
    console.log("error 1 : "+error)
  }
}

async function crawl_tw(url:string, artist : string) {
  var options ={
    url : url,
    headers: { 'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36' }
  }
  try{
    const inBrowser = await puppeteer.launch({
      // headless: false,
      // args:['--disable-web-security'],
      headless: true, //for ec2
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],//for ec2
      executablePath: '/usr/bin/chromium-browser', // for ec2
    })
    const page = await (await inBrowser).newPage();
    await page.setExtraHTTPHeaders({
      'asscept-charset':'euc-kr'
    })
    
    await page.setViewport({
      width: 1366,
      height: 768,
    });
    await page.goto(url);
    await timer(1000)
    // for (let i = 0;i<10;i++){
    //   await page.keyboard.press('PageDown')
    //   await timer(100)
    // }
    const pageContent = await page.content()
    const $ = load(pageContent, {xmlMode : true})
    // var result: { likes : string| undefined ;link: string; writer : string | undefined; created : string| undefined; artist : string | undefined; content : string | undefined; sites:string };
    var likes,writer,content,created,sites : string;
    $('article').each(function (i,e){
      if(i==0){
        // console.log(''
        // +"writer : "+$(this).find('div>div>div>div>div:nth-child(2)>div>div>div>div:nth-child(1)>div>a>div>div:nth-child(1)>div:nth-child(1)>span>span').text()
        // +"\ncontent : "+$(this).find('div>div>div>div:nth-child(3)>div:nth-child(1)>div>div').text()
        // +"\ncreated : "+$(this).find('div > div > div > div:nth-child(3) > div:nth-child(3) > div > div:nth-child(1) > a:nth-child(1) > span').text()
        // +"\nlikes"+$(this).find('div>div>div>div:nth-child(3) > div:nth-child(4) > div>div:nth-child(3) > div>a>div>span>span').text()
        // )
        likes = $(this).find('div>div>div>div:nth-child(3) > div:nth-child(4) > div>div:nth-child(3) > div>a>div>span>span').text()
        writer = $(this).find('div>div>div>div>div:nth-child(2)>div>div>div>div:nth-child(1)>div>a>div>div:nth-child(1)>div:nth-child(1)>span>span').text()
        content = $(this).find('div>div>div>div:nth-child(3)>div:nth-child(1)>div>div').text()
        created = $(this).find('div > div > div > div:nth-child(3) > div:nth-child(3) > div > div:nth-child(1) > a:nth-child(1) > span').text()
      }
    })
    try{
      const Content = await ContentRepo.findContentAllDataById(url)
      if (Content){
        console.log('already crawlled')
      } else {
       
        const createdContent = await ContentRepo.create({
          likes : likes,
          link : url,
          writer : writer,
          created : created,
          artist : artist,
          content : content,
          sites : "twitter",
        } as Content)
        console.log("DKDK!! create ",createdContent)
      }
    }catch{

    }
    
    
    
  }catch(err){
    console.log(err)
  }
}
export default router