import request from 'request';
import express, { RequestHandler } from 'express';
import puppeteer from 'puppeteer';
import asyncHandler from '../helpers/asyncHandler';
import { load } from 'cheerio';
import axios from 'axios';
import ContentRepo from '../database/repository/ContentRepo';
import Content, { ContentModel } from '../database/model/Content';
import '../database';

const router = express.Router();
const tqBaseUrl = 'https://theqoo.net'
const EmptyUrl = ''
const baseGoogleUrl = 'https://www.google.com'
const googleurl1 = 'https://www.google.com/search?q=site:youtube.com+intitle%3A'
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

export async function startUT_pastCrawl(){
  for(let i=1;i<10;i++){
    console.log("start youtube past crawl"+i)
    getUTUrl_google(i)
    await timer(24 * 60 * 1000)
  }
  startUT_pastCrawl()
  // console.log("DKDK start past crawl")
  // testGGCrawl('https://www.youtube.com/watch?v=RSv0K4hQyV8&ab_channel=%EA%B3%BD%ED%8A%9C%EB%B8%8CKWAKTUBE','아이유')
  
  // ggCrawl('https://www.google.com/search?q=intitle:%EC%95%84%EC%9D%B4%EC%9C%A0+site:youtube.com&tbs=qdr:w&sxsrf=ALeKk02KJpLleV9PUh5VDTiJrXbnzGEUJA:1626192643942&ei=A7vtYO-HOe-bmAW5yp2IBw&start=0&sa=N&ved=2ahUKEwivlYPXt-DxAhXvDaYKHTllB3E4FBDy0wN6BAgBEEA&biw=851&bih=937','아이유')
}
async function testGGCrawl(url : string,artist : string){
  try{
    console.log("ggCrawl url "+url)
    const inBrowser = await puppeteer.launch({
        headless: false,
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
    // const firstContent = await page.content()
    // const first = load(firstContent)
    
    for (let i = 0;i<200;i++){
      await page.keyboard.press('PageDown')
      await timer(100)
    }
    
    const content = await page.content()
    const $ = load(content) 
    if(page.url().match('www.google.com/sorry/index?')){
      console.log("its blocked")
    }
    // for(let e=1;e<1000;e++){
    //   await timer(100)
    //   console.log(page.url() + e)
    // }
    const lists = $('#content-text')
    var come : string = ""
    lists.each(function(index,element){
      console.log("comment : "+index + $(this).text())
      come += ("\n"+$(this).text())
    })

    console.log($('#container > h1 > yt-formatted-string > span').text()+"suck?")
    console.log("youtube\n"
        +'views : ' + $('#count > ytd-video-view-count-renderer > span.view-count.style-scope.ytd-video-view-count-renderer').text()
        +'commentCount : ' + $('#title > h2 > yt-formatted-string > span:nth-child(2)').text()
        +'likes : ' + $('ytd-toggle-button-renderer > a > yt-formatted-string').text()
        +'writer : ' + $('#container > div > yt-formatted-string > a').text()
        +'created : ' + $('#info-text > #info-strings > yt-formatted-string').text()
        +'content : ' + $('#content > #description > yt-formatted-string').children().text()
        +'comments : ' + come
        )
    // console.log("comment? "+ $('#author-text > span').text())
        
   
    
    // let next = undefined
    // $('tbody').find('td').each(async function (index, elem){
    //   console.log('im in for')
    //   if($(this).find('a').attr('id')?.toString()=='pnnext'){
    //     next=$(this).find('a').attr('href')?.toString()
    //     console.log('href : '+next)
    //   }
    // })
    // const nextlist =  $('tbody')
    // nextlist.each(async (index,element)=>{
    //   if($(nextlist).find('a').attr('id')?.toString().match('pnnext')){
    //     console.log('asdasdasd??')
    //     next = $(nextlist).attr('href')?.toString().trim()
    //   }
    // })
    // console.log('next : '+next)
    
    // for(let i=1;i<lists.length;i++){
    //   await timer(100)
    //   if($(lists[i]).attr('href')?.toString().match('youtube.com/watch') && !$(lists[i]).attr('href')?.toString().match('webcache')){
    //     console.log("dkdk"+Date())
    //     console.log($(lists[i]).attr('href'))
    //     crawl_ut($(lists[i]).attr('href')!.toString(),artist)
    //   }
    // }
    // await page.close()
    // if(next != undefined){
    //   console.log("DKDK ::: __ next link : "+ next)
    //   testGGCrawl(baseGoogleUrl+next,artist)
    // }
    // inBrowser.close()
  }catch(error){
    console.log("error 1 : "+error)
  }
}

async function getUTUrl_google(index : number){
  switch (index) {
    case 1 : ut_gg_crawl1()
      break;
    case 2 : ut_gg_crawl2()
      break;
    case 3 : ut_gg_crawl3()
      break;
    case 4 : ut_gg_crawl4()
      break;
    case 5 : ut_gg_crawl5()
      break;
    case 6 : ut_gg_crawl6()
      break;
    case 7 : ut_gg_crawl7()
      break;
    case 8 : ut_gg_crawl8()
      break;
    case 9 : ut_gg_crawl9()
      break;
    default:
      break;
  }
}
async function ut_gg_crawl1() {
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
    ggCrawl(getUrl(artist),artist)
    await timer(250000)
  }
}
async function ut_gg_crawl2() {
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
    await timer(250000)
    ggCrawl(getUrl(artist),artist)
  }
}
async function ut_gg_crawl3() {
  for(var i=1; i<=10; i++){
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
    await timer(250000)
    ggCrawl(getUrl(artist),artist)
  }
}
async function ut_gg_crawl4() {
  for(var i=1; i<=10; i++){
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
    }await timer(250000)
    ggCrawl(getUrl(artist),artist)
  }
}
async function ut_gg_crawl5() {
  for(var i=1; i<=10; i++){
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
    }await timer(250000)
    ggCrawl(getUrl(artist),artist)
  }
}
async function ut_gg_crawl6() {
  for(var i=1; i<=10; i++){
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
    }await timer(250000)
    ggCrawl(getUrl(artist),artist)
  }
}
async function ut_gg_crawl7() {
  for(var i=1; i<=10; i++){
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
    }await timer(250000)
    ggCrawl(getUrl(artist),artist)
  }
}
async function ut_gg_crawl8() {
  for(var i=1; i<=10; i++){
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
    }await timer(250000)
    ggCrawl(getUrl(artist),artist)
  }
}
async function ut_gg_crawl9() {
  for(var i=1; i<=8; i++){
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
    }await timer(250000)
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
    const newBrowser = await puppeteer.launch({
        // headless: false,
        headless: true, //for ec2
        args: ['--no-sandbox', '--disable-setuid-sandbox'],//for ec2
        executablePath: '/usr/bin/chromium-browser', // for ec2
      })
    const page = await (await newBrowser).newPage();
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
      if($(lists[i]).attr('href')?.toString().match('youtube.com/watch') && !$(lists[i]).attr('href')?.toString().match('webcache')){
        await timer(25000)
        if(i%2==1){
          console.log($(lists[i]).attr('href') + i.toString())
          crawl_ut($(lists[i]).attr('href')!.toString(),artist)
        }
      }
    }
    await page.close()
    if(next != undefined){
      console.log("DKDK ::: __ next link : "+ next)
      ggCrawl(baseGoogleUrl+next,artist)
    }
    newBrowser.close()
  }catch(error){
    console.log("error 1 : "+error)
  }
}

async function crawl_ut(url:string, artist : string) {
  try{
    const inBrowser = await puppeteer.launch({
      // headless: false,
      headless: true, //for ec2
      args: ['--no-sandbox', '--disable-setuid-sandbox'],//for ec2
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
    await timer(3000)
    for (let i = 0;i<200;i++){
      await page.keyboard.press('PageDown')
      await timer(100)
    }
    const content = await page.content()
    const $ = load(content) 
    if(page.url().match('www.google.com/sorry/index?')){
      console.log("its blocked")
    }
    var result: { title: string; views: string; commentCount: string; likes : string ;link: string; writer : string ; created : string; artist : string | undefined; content : string | undefined; };
    var resComment : string = ""
    const lists = $('#content-text')
    lists.each(function(index,element){
      // console.log("comment : "+index + $(this).text())
      resComment += ("\n"+$(this).text())
    })
    console.log("content Parsing ", url)
    try{
      const Content = await ContentRepo.findContentAllDataById(url)
      if (Content){
        console.log('already crawlled')
        }else {
        result={
          title : $('h1.title.style-scope.ytd-video-primary-info-renderer > yt-formatted-string').text().trim(),
          views : $('#count > ytd-video-view-count-renderer > span.view-count.style-scope.ytd-video-view-count-renderer').text().split(' ')[1],
          commentCount : $('div.title > h2 > yt-formatted-string > span:nth-child(2)').text().trim(),
          likes : $('ytd-toggle-button-renderer > a > yt-formatted-string').text().split(' ')[1],
          link : url,
          writer : $('#container > div > yt-formatted-string > a').text().trim(),
          created : $('#info-text > #info-strings > yt-formatted-string').text().trim(),
          artist :artist,
          content : $('#content > #description > yt-formatted-string').children().text().trim(),
          } 
          const createdContent = await ContentRepo.create({
            title : result.title,
            views : result.views,
            commentCount : result.commentCount,
            likes : result.likes,
            link : result.link,
            writer : result.writer,
            created : result.created,
            artist : result.artist,
            content : result.content,
            comment : resComment,
            sites : "youtube",
          } as Content)
          console.log("DKDK!! create ",createdContent)
      }
      await page.close()
      inBrowser.close()
    }catch(ere){
      console.log('comment error',ere)
    }
  }catch(err){
    console.log(err)
  }
}
export default router