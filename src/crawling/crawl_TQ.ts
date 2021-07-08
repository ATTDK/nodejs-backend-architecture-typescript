import request from 'request';
import express, { RequestHandler } from 'express';
import puppeteer from 'puppeteer';
import asyncHandler from '../helpers/asyncHandler';
import { load } from 'cheerio';
import axios from 'axios';
import ContentRepo from '../database/repository/ContentRepo';
import Content, { ContentModel } from '../database/model/Content';
import '../database';
import { time } from 'console';

const router = express.Router();
const tqUrl = 'https://theqoo.net/index.php?mid=ktalk&filter_mode=normal&page=';
const tqUrl1 = 'https://theqoo.net/index.php?mid=kstar&filter_mode=normal&page='; // 국내유명인
const tqUrl2 = 'https://theqoo.net/index.php?mid=ktalk&filter_mode=normal&page='; //케이돌토크
const tqUrl3 = 'https://theqoo.net/index.php?mid=kdolboys&filter_mode=normal&page='; // 케이돌보이즈
const tqUrl4 = 'https://theqoo.net/index.php?mid=kdolgirls&filter_mode=normal&page='; // 케이돌걸즈
const tqBaseUrl = 'https://theqoo.net'
const EmptyUrl = ''
const baseGoogleUrl = 'https://www.google.com'
const googleurl1 = 'https://www.google.com/search?q=site:theqoo.net+'
const googleurl2 = '&tbs=cdr:1,cd_min:'
const googleurl3 = ',cd_max:'
const browser = puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],//for ec2
});

const timer = (ms: number | undefined) => new Promise(res=>setTimeout(res,ms))

export async function startTQCrawl(){
   for(let i=1;i<5;i++){
     console.log("start TheQoo crawl"+i)
     gettqUrl(i)
     await timer(15000)
   }
  startTQCrawl()
}

export async function startTQ_resCrawl(){
  getDailyUrl()

  await timer(60 * 1000)
  startTQ_resCrawl()
}

export async function startTQ_pastCrawl(){
  for(let i=1;i<10;i++){
    console.log("start TheQoo crawl"+i)
    gettqUrl_google(i)
    await timer(50000)
  }
  startTQ_pastCrawl()
  // gettqUrl_google(1)
  console.log("DKDK start past crawl")
  // ggCrawl('https://www.google.com/search?&as_epq=%EA%B9%80%EC%84%B8%EC%A0%95&as_qdr=all&as_sitesearch=theqoo.net&tbs=cdr:1,cd_min:4/7/2021,cd_max:4/8/2021','김세정') // 폰에선 작동됨
  // ggCrawl('https://www.google.com/search?&as_epq=%EA%B9%80%EC%84%B8%EC%A0%95&as_qdr=all&as_sitesearch=theqoo.net&tbs=cdr:y','김세정')
  
  // const browser = await puppeteer.launch({
  //   headless: false
  // })
  // const page = await browser.newPage();
  // await page.setViewport({
  //   width: 1366,
  //   height: 768
  // });
  // await page.goto('https://www.google.com/search?&as_epq=%EA%B9%80%EC%84%B8%EC%A0%95&as_qdr=all&as_sitesearch=theqoo.net&tbs=cdr:1,cd_min:4/7/2020,cd_max:4/8/2021');
  // const content = await page.content()
  // const $ = load(content) 
  // const lists = $('.tF2Cxc').find('a')
  // const next = $('tbody').find('a').attr('href')?.toString()
  // console.log(next)
  // lists.each((index, list) => {
  //   if($(list).attr('href')?.toString().match('https://theqoo.net') && !$(list).attr('href')?.toString().match('webcache')){
  //     console.log(index)
  //     console.log($(list).attr('href'))
  //     console.log("gacha")
  //   }
  // })
  // await page.goto(baseGoogleUrl+next)
  // const newcontent = await page.content()
  // const $$ = load(content) 
  // const listss = $$('.tF2Cxc').find('a')
  // const nexts = $$('tbody').find('a').attr('href')?.toString()
  // console.log(nexts)
  // listss.each((index, list) => {
  //   if($(list).attr('href')?.toString().match('https://theqoo.net') && !$(list).attr('href')?.toString().match('webcache')){
  //     console.log(index)
  //     console.log($(list).attr('href'))
  //     console.log("gacha")
  //   }
  // })
}

function gettqUrl(index : number){
  let url
  switch (index) {
    case 1 : url = tqUrl1
      break;
    case 2 : url = tqUrl2
      break;
    case 3 : url = tqUrl3
      break;
    case 4 : url = tqUrl4
      break;
    default:
      break;
  }
  tqCrawl(EmptyUrl+url,15)
}

async function gettqUrl_google(index : number){
  switch (index) {
    case 1 : tq_gg_crawl1()
      break;
    case 2 : tq_gg_crawl2()
      break;
    case 3 : tq_gg_crawl3()
      break;
    case 4 : tq_gg_crawl4()
      break;
    case 5 : tq_gg_crawl5()
      break;
    case 6 : tq_gg_crawl6()
      break;
    case 7 : tq_gg_crawl7()
      break;
    case 8 : tq_gg_crawl8()
      break;
    case 9 : tq_gg_crawl9()
      break;
    default:
      break;
  }
}
async function tq_gg_crawl1() {
  for(var i=1; i<=10; i++){
    console.log("tq_gg_crawl1",Date())
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
async function tq_gg_crawl2() {
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
async function tq_gg_crawl3() {
  await timer(15000)
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
    ggCrawl(getUrl(artist),artist)
  }
}
async function tq_gg_crawl4() {
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
async function tq_gg_crawl5() {
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
async function tq_gg_crawl6() {
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
async function tq_gg_crawl7() {
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
async function tq_gg_crawl8() {
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
async function tq_gg_crawl9() {
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

async function getDailyUrl(){
  let url
  try {
    const Contents = await ContentRepo.findContentAllDataBySite("theqoo")
    if(Contents){
      let some = Contents!.toString().split("link: '")
      // console.log("test :?? :: ",some.length)
      for(let i=1;i<some.length;i++){
        contentCrawl_theqoo(some[i].split("'")[0])
        if(i % 100 == 0){
          await timer(5000)
        }
      }
    }
    
  } catch (error) {
      console.log("getDailly error : "+error)
  }
}


async function tqCrawl(url:string, limit : number){
  for(var i=1; i<= limit; i++){
    boardCrawl_theqoo(url+i)
    if (i%5 == 0){
      await timer(1500)
    }
    console.log("DKDKDK don : ",i)
  }
}
async function contentCrawl_theqoo(url:string) {
  try{
    request.get(url,async (err,res)=>{
      console.log("url is : ",url)
      let $ = load(res.body,{xmlMode : true})
      const Content = await ContentRepo.findContentAllDataById(url);
      var result: {views: string; commentCount: string; created : string;}
      if(Content){
        result={
          views : $('div.theqoo_document_header').find('div.count_container').text().trim().split(" ")[0],
          commentCount : $('div.theqoo_document_header').find('div.count_container').text().trim().split(" ")[2],
          created : $('div.board.clear').find('div.side.fr > span').text().trim()
        }
        Content.views = result.views,
        Content.commentCount = result.commentCount,
        Content.created = result.created
        await ContentRepo.update(Content)
        console.log("DKDK!! update ")
      }
    })
  }catch(error){
    console.log(error)
  }
}

async function ggCrawl(url:string, artist : string){
  try{
    console.log("ggCrawl url "+url)
    const page = await (await browser).newPage();
    await page.setViewport({
      width: 1366,
      height: 768
    });
    await page.goto(url);
    const content = await page.content()
    const $ = load(content) 
    const lists = $('.tF2Cxc').find('a')
    const next =  $('tbody').find('a').attr('href')?.toString()
    lists.each(async (index, list) => {
      if($(list).attr('href')?.toString().match('https://theqoo.net') && !$(list).attr('href')?.toString().match('webcache')){
        await timer(1000)
        crawl_theqoo($(list).attr('href')!.toString(),artist)
      }
    })
    await timer(1000)
    page.close()
    if(next != undefined){
      console.log("DKDK ::: __ next link : "+ next)
      ggCrawl(baseGoogleUrl+next,artist)
    }
  }catch(error){
    console.log("error 1 : "+error)
  }
}

async function boardCrawl_theqoo(url:string) {
  try{
    request.get(url,(err,res) => {
      console.log("url is : ",url)
      let $ = load(res.body,{xmlMode : true});
      var result: { title: string; views: string; commentCount: string; link: string; created : string; artist : string | undefined;}[] = [];
      try{
        $('table').find('tbody').find('tr').each(async function (index, elem){
          let require_index = 5;
          let isTalk = false
          if(url.includes('kstar')){
            require_index = 6
          } else if(url.includes('ktalk')) {
            isTalk = true
            // console.log(" dk :: " + $(this).find('td.title').find('a:nth-of-type(2)').attr('href')?.toString().trim().split('#')[0])
          }
          if (index>require_index){
            result[index]={
              title : $(this).find('td.title>a>span').text().trim(),
              views : $(this).find('td.m_no').text().trim(),
              commentCount : $(this).find('td.title>a.replyNum').text().trim(),
              link :  isTalk ? $(this).find('td.title>a').attr('href')!.toString() : EmptyUrl + $(this).find('td.title').find('a:nth-of-type(2)').attr('href')?.toString().trim().split('#')[0],
              created : $(this).find('td.time').text().trim(),
              artist : isTalk ? "" : $(this).find('td.title>a.preface').text().trim().split(")")[0],
              } 
            const Content = await ContentRepo.findContentAllDataById(result[index].link);
            if (Content) {
                Content.views = result[index].views;
                Content.commentCount = result[index].commentCount;
                Content.created = result[index].created;
                Content.artist = result[index].artist
                await ContentRepo.update(Content)
                console.log("DKDK!! update ")
            } else {
              const createdContent = await ContentRepo.create({
                title : result[index].title,
                views : result[index].views,
                commentCount : result[index].commentCount,
                link : tqBaseUrl+result[index].link,
                created : result[index].created,
                artist : result[index].artist,
                sites : "theqoo",
              } as Content)
              console.log("DKDK!! create ",createdContent)
            }
            await contentParse_theqoo(tqBaseUrl+result[index].link)
          }
        })
      }catch(re_err){
        console.log("error "+re_err)
      }
    })
  }catch(err){
    console.log("error "+err)
  }
}
async function crawl_theqoo(url:string, artist : string) {
  try{
    request.get(url, async (req,res)=>{
      let $ = load(res.body,{xmlMode : true})
      var result: { title: string; views: string; commentCount: string; link: string; created : string; artist : string | undefined; content : string | undefined;};
      console.log("content Parsing ", url)
      try{
        const Content = await ContentRepo.findContentAllDataById(url)
        if (Content){
          
         }else {
          result={
            title : $('div > span.title\n').text().trim(),
            views : $('div.count_container').text().split(' ')[1],
            commentCount : $('div.comment_header_bar > b').text().trim(),
            link : url, 
            created : $('div.side.fr > span').text().trim(),
            artist :artist,
            content : $('article > div').text().trim()
            } 
            const createdContent = await ContentRepo.create({
              title : result.title,
              views : result.views,
              commentCount : result.commentCount,
              link : tqBaseUrl+result.link,
              created : result.created,
              artist : result.artist,
              content : result.content,
              sites : "theqoo",
            } as Content)
            console.log("DKDK!! create ",createdContent)
        }
      }catch(ere){
        console.log('comment error',ere)
      }
    })
  }catch(err){
    console.log(err)
  }
}

async function contentParse_theqoo(url:string) {
  try{
    request.get(url, async (req,res)=>{
      let $ = load(res.body,{xmlMode : true})
      console.log("content Parsing ", url)
      try{
        //본문 추가
        
        const Content = await ContentRepo.findContentAllDataById(url)
        if (Content){
          let createTime = $('div.side.fr').find('span').text().trim()
          try{
            Content.created = createTime
          }catch{

          }
          $('article').find('.xe_content').each(async function (index,element){
            if($(this).text().trim().length>0){
              try{
                Content.content += ($(this).text().trim()+"\n")
                await ContentRepo.update(Content)
                console.log("content updated")
              }catch{
                console.log("FUCK")
              }
            }
          })
          $('div.cmtposition>ul.fdb_lst_ul').find('.xe_content').each(async function (index, ele) {
            if($(this).text().trim().length>0){
              try{
                Content.comment += (+"\n"+$(this).text().trim())
                await ContentRepo.update(Content)
                console.log("comment updated")
              }catch{
                console.log("FUCK")
              }
            }
          })
         }else {
          console.log('본문 !콘텐트')
        }
      }catch(ere){
        console.log('comment error',ere)
      }
    })
  }catch(err){
    console.log(err)
  }
}

export default router