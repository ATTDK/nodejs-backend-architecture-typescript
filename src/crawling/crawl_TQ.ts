import request from 'request';
import express, { RequestHandler } from 'express';
import asyncHandler from '../helpers/asyncHandler';
import { load } from 'cheerio';
import axios from 'axios';
import ContentRepo from '../database/repository/ContentRepo';
import Content from '../database/model/Content';
import '../database';

const router = express.Router();
const tqUrl = 'https://theqoo.net/index.php?mid=ktalk&filter_mode=normal&page=';
const tqUrl1 = 'https://theqoo.net/index.php?mid=kstar&filter_mode=normal&page='; // 국내유명인
const tqUrl2 = 'https://theqoo.net/index.php?mid=ktalk&filter_mode=normal&page='; //케이돌토크
const tqUrl3 = 'https://theqoo.net/index.php?mid=kdolboys&filter_mode=normal&page='; // 케이돌보이즈
const tqUrl4 = 'https://theqoo.net/index.php?mid=kdolgirls&filter_mode=normal&page='; // 케이돌걸즈
const tqBaseUrl = 'https://theqoo.net'
const EmptyUrl = ''

const timer = (ms: number | undefined) => new Promise(res=>setTimeout(res,ms))

export async function startTQCrawl(){
   for(let i=1;i<5;i++){
     console.log("server gogo crawl gogo"+i)
     gettqUrl(i)
     await timer(15000)
   }
  startTQCrawl()
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


async function tqCrawl(url:string, limit : number){
  for(var i=1; i<= limit; i++){
    boardCrawl_theqoo(url+i)
    if (i%5 == 0){
      await timer(1500)
    }
    console.log("DKDKDK don : ",i)
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
          if (index>6){
            result[index]={
              title : $(this).find('td.title>a>span').text().trim(),
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