import request from 'request';
import express, { RequestHandler } from 'express';
import { load } from 'cheerio';
import ContentRepo from '../database/repository/ContentRepo';
import Content from '../database/model/Content';
import '../database';

const router = express.Router();
const twitterUrl1 = "https://twitter.com/search?q=";
const twitterUrl2 = "&src=typed_query";
const twitterType = "&f=";
const twitterType1 = "live";
const twitterType2 = "image";
const twitterType3 = "video";
const tqBaseUrl = 'https://theqoo.net'
const EmptyUrl = ''

const timer = (ms: number | undefined) => new Promise(res=>setTimeout(res,ms))

export async function startTwitterCrawl(){
   for(let i=1;i<9;i++){
     console.log("start Twitter crawl"+i)
     gettqUrl(i)
     await timer(1500)
   }
   startTwitterCrawl()
}
function gettqUrl(index : number){
  switch (index) {
    case 1 : twitCrawl1()
      break;
    case 2 : twitCrawl2()
      break;
    case 3 : twitCrawl3()
      break;
    case 4 : twitCrawl4()
      break;
    case 5 : twitCrawl5()
      break;
    case 6 : twitCrawl6()
      break;
    case 7 : twitCrawl7()
      break;
    case 8 : twitCrawl8()
      break;
    case 9 : twitCrawl9()
      break;
    default:
      break;
  }
}
function getUrl(artist:string) {
  return twitterUrl1+artist+twitterUrl2
}
function getLiveUrl(artist:string) {
  return twitterUrl1+artist+twitterUrl2+twitterType+twitterType1
}
function boardCrawl(artist:string){
  boardCrawl_twit(getUrl(artist))
  boardCrawl_twit(getLiveUrl(artist))
}

async function twitCrawl1() {
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
    boardCrawl(artist)
  }
}

async function twitCrawl2() {
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
    boardCrawl(artist)
  }
}
async function twitCrawl3() {
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
    boardCrawl(artist)
  }
}
async function twitCrawl4() {
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
    }
    boardCrawl(artist)
  }
}
async function twitCrawl5() {
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
    }
    boardCrawl(artist)
  }
}
async function twitCrawl6() {
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
    }
    boardCrawl(artist)
  }
}
async function twitCrawl7() {
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
    }
    boardCrawl(artist)
  }
}
async function twitCrawl8() {
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
    }
    boardCrawl(artist)
  }
}
async function twitCrawl9() {
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
    }
    boardCrawl(artist)
  }
}

async function boardCrawl_twit(url:string) {
  try{
    request.get(url,(err,res) => {
      console.log("url is : ",url)
      let $ = load(res.body,{xmlMode : true});
      var result: { nickname: string; views: string; commentCount: string; link: string; created : string; artist : string | undefined;}[] = [];
      try{
        $('main > div > section').find('div').each(async function (index, elem){
          result[index]={
            nickname : $(this).find('td.title>a>span').text().trim(),
            views : $(this).find('td.m_no').text().trim(),
            commentCount : $(this).find('td.title>a.replyNum').text().trim(),
            link : $(this).find('td.title>a').attr('href')!.toString(),
            created : $(this).find('td.time').text().trim(),
            artist : $(this).find('td.title>a.preface').text().trim(),
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
                views : result[index].views,
                commentCount : result[index].commentCount,
                link : tqBaseUrl+result[index].link,
                created : result[index].created,
                artist : result[index].artist,
                sites : "twitter",
              } as Content)
              console.log("DKDK!! create ",createdContent)
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

export default router