import request from 'request';
import express, { RequestHandler } from 'express';
import asyncHandler from '../../../helpers/asyncHandler';
import { BadRequestError } from '../../../core/ApiError';
import { SuccessResponse } from '../../../core/ApiResponse';
import { load } from 'cheerio';
import axios from 'axios';
import ContentRepo from '../../../database/repository/ContentRepo';
import Content from '../../../database/model/Content';
import { start } from 'repl';
import '../../../database';

const router = express.Router();
const tqUrl = 'https://theqoo.net/index.php?mid=ktalk&filter_mode=normal&page=';
const tqUrl1 = 'https://theqoo.net/index.php?mid=kstar&filter_mode=normal&page='; // 국내유명인
const tqUrl2 = 'https://theqoo.net/index.php?mid=ktalk&filter_mode=normal&page='; //케이돌토크
const tqUrl3 = 'https://theqoo.net/index.php?mid=kdolboys&filter_mode=normal&page='; // 케이돌보이즈
const tqUrl4 = 'https://theqoo.net/index.php?mid=kdolgirls&filter_mode=normal&page='; // 케이돌걸즈
const dcUrl = 'https://gall.dcinside.com/board/lists/?id=mkyunghoon';
const dogUrl = 'https://www.dogdrip.net/index.php?mid=ib&page=';
const dogUrl1 = 'https://www.dogdrip.net/index.php?mid=movie&page='; // 영상
const dogUrl2 = 'https://www.dogdrip.net/index.php?mid=music&page='; // 음악
const dogUrl3 = 'https://www.dogdrip.net/index.php?mid=girlgroup&page='; // 걸그룹
const dogUrl4 = 'https://www.dogdrip.net/index.php?mid=ib&page='; // 인방
const tqBaseUrl = 'https://theqoo.net'
const dcBaseUrl = 'https://gall.dcinside.com/'
const dogBaseUrl = 'https://www.dogdrip.net/'
const baseTwitterUrl1 = 'https://twitter.com/search?q=src=typed_query&f=live'
const baseTwitterUrl2 = '&src=typed_query&f=live'
const EmptyUrl = ''
enum ArtistType {
// 강승윤
// 구구단
// 구구단 세미나
// 국헌&유빈
// 규현
// 김기범
// 김도연
// 김동현 (에이비식스)
// 김성규
// 김우석
// 나띠
// 남우현
// 넬
// 노태현
// 뉴이스트
// 뉴이스트 W
// 동방신기
// 드림캐쳐
// 라비
// 러블리즈
// 레드벨벳
// 레오 (빅스) 
// 레오(빅스) 
// 로제
// 마마무
// 모모랜드
// 몬스타엑스
// 문별
// 바비
// 박세진 김윤주(옥상달빛)
// 백현
// 베리베리
// 블랙핑크
// 빅스
// 빅스LR
// 샤이니
// 성진환
// 세븐틴
// 세훈&찬열
// 소녀시대
// 소녀시대-Oh!GG
// 송민호
// 수호
// 슈퍼주니어
// 슈퍼주니어-D&E
// 신화
// 아스트로
// 아이즈원
// 안녕하신가영
// 안예은
// 에스에프나인
// 에프엑스
// 엑소
// 엑스원
// 엔시티
// 엔시티 127
// 엔시티 드림
// 여자친구
// 영케이
// 예성
// 요조
// 워너원
// 웨이션브이
// 위키미키
// 유노윤호
// 윤도현
// 윤아
// 윤지성
// 이성종, 남우현(인피니트)
// 이진혁
// 인투잇
// 정세운
// 조승연
// 종현
// 준수
// 지수연
// 청하
// 첸
// 최강창민
// 최유정
// 크나큰
// 태민
// 태연
// 트레저
// 프로미스나인
// 하성운
// 혁
}

const timer = (ms: number | undefined) => new Promise(res=>setTimeout(res,ms))

export async function startCrawl(){
  // for(let i=0;i<8;i++){
  //   console.log("server gogo crawl gogo"+i)
  //   crawlingIndex(i)
  //   await timer(15000)
  // }
  // tqCrawl(EmptyUrl+tqUrl1,10)
  dogCrawl(EmptyUrl+dogUrl1,10)
  await timer(1500000)
  startCrawl()
}
function crawlingIndex(index : number){
  if (index<4){
    getDogUrl(index)
  }else if(index>=4 && index<8) {
    gettqUrl(index)
  }
}
function getDogUrl(index : number){
  let url
  switch(index){
    case 1 : url = dogUrl1
      break;
    case 2 : url = dogUrl2
      break;
    case 3 : url = dogUrl3
      break;
    case 4 : url = dogUrl4
      break;
  }
  dogCrawl(EmptyUrl+url,10)
}

function gettqUrl(index : number){
  let url
  switch(index){
    case 1 : url = baseTwitterUrl1 + "" + baseTwitterUrl2
      break;
    case 2 : url = tqUrl2
      break;
    case 3 : url = tqUrl3
      break;
    case 4 : url = tqUrl4
      break;
  }
  tqCrawl(EmptyUrl+url,10)
}

function getTwitUrl(index : number){
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
}

async function tqCrawl(url:string, limit : number){
  for(var i=1; i<= limit; i++){
    await boardCrawl_theqoo(tqUrl+i)
    if (i%5 == 0){
      await timer(1500)
    }
    console.log("DKDKDK don : ",i)
  }
}

async function dogCrawl(url:string, limit : number){
  for(var i=1; i<= limit; i++){
    await boardCrawl_dog(dogUrl+i)
    if (i%5 == 0){
      await timer(1500)
    }
    console.log("DKDKDK don : ",i)
  }
}

router.get(
  '/crawlingTheqoo',
  asyncHandler(async (req, res)=>{
    for(var i=1; i<= 1; i++){
      await boardCrawl_theqoo(tqUrl+i)
      if (i%5 == 0){
        await timer(1500)
      }
      console.log("DKDKDK don : ",i)
    }
  })
);

router.get(
  '/crawlingTheqoo11',
  asyncHandler(async (req, res) => {
    request.get(tqUrl,(re_err, re_res) => {
      let $ = load(re_res.body);
      let link;
      try{
        $('table').find('tbody').find('tr').each(function (index, elem){
          // $('table>tbody>tr>td>a').each(function (index, elem){
          if(index > 3){
            console.log("tete" 
            + $(this).find('td.title>a').attr('href')+ "  "
            + $(this).find('td.title').text().trim()+ "  "
            );
            link = $(this).find('td.title>a').attr('href')
            console.log(link);
            var split = link!.split('document_srl=');
            console.log(split[1])
            request.get(tqBaseUrl+link,(rere_err,rere_res, html)=>{
              let the = load(rere_res.body);
              try{
                  console.log("dipdip"
                  // +the('article').find('div').text().trim() // content
                  // +"   "
                  // +"comment: "
                  // +the('div').find('ul').text().trim()
                  // +the('.ul.fdb_lst_ul')
                  +the('div.cmtPosition')
                  )
                  
              }catch{

              }
            })

          }
        })
        
      }catch (re_err){
        throw new BadRequestError('Bad Request _ crawling');
      }
      
    });

  })
);

router.get(
  '/crawlingDc',
  asyncHandler(async (req, res) => {
    request.get(dcUrl,(dc_err, dc_res) => {
      let $d = load(dc_res.body);
      let link;
      console.log('dcdc'+dcUrl)

      try{
        $d('table').find('tbody').find('tr').each(function (index, elem){
          // $('table>tbody>tr>td>a').each(function (index, elem){
            console.log("dcdc : " 
            + $d(this).find('td>a').text().trim()+ "  "
            );
            link = $d(this).find('td>a').attr('href')
            request.get(dcBaseUrl+link,(dc_err,dc_res)=>{
              let so = load(dc_res.body)
              try{
                console.log("content : "
                +so(this).find('div.gallview_contents')
                )
              }catch{

              }
            })
        })
        
      }catch (re_err){
        throw new BadRequestError('Bad Request _ crawling');
      }
      
    });

  })
);

router.get(
  '/crawlingDogdrip',
  asyncHandler(async (req, res)=>{
    for(var i=1; i<= 300; i++){
      await boardCrawl_dog(dogUrl+i)
      if (i%5 == 0){
        await timer(1500)
      }
      console.log("DKDKDK don : ",i)
    }
  })
);

async function twitterCrawl(url:string){
  try{
    request.get(url,(err,res)=> {

    })
  }catch{

  }
}


async function boardCrawl_theqoo(url:string) {
  try{
    request.get(url,(err,res) => {
      console.log("url is : ",url)
      let $ = load(res.body,{xmlMode : true});
      var result: { title: string; views: string; commentCount: string; link: string; created : string; }[] = [];
      try{
        $('table').find('tbody').find('tr').each(async function (index, elem){
          if (index>5){
            result[index]={
              title : $(this).find('td.title>a>span').text().trim(),
              views : $(this).find('td.m_no').text().trim(),
              commentCount : $(this).find('td.title>a.replyNum').text().trim(),
              link : $(this).find('td.title>a').attr('href')!.toString(),
              created : $(this).find('td.time').text().trim(),
              } 
              const Content = await ContentRepo.findContentAllDataById(result[index].link);
              if (Content) {
                  Content.views = result[index].views;
                  Content.commentCount = result[index].commentCount;
                  Content.created = result[index].created;
                  await ContentRepo.update(Content)
                  console.log("DKDK!! update ")
              } else {
                const createdContent = await ContentRepo.create({
                  title : result[index].title,
                  views : result[index].views,
                  commentCount : result[index].commentCount,
                  link : tqBaseUrl+result[index].link,
                  created : result[index].created,
                  sites : "theqoo",
                } as Content)
                console.log("DKDK!! create ",createdContent)
              }
            await contentParse_theqoo(tqBaseUrl+result[index].link)
          }
        })
      }catch{
        throw new BadRequestError('BadResponse _ boardCrawling');
      }
    })
  }catch{
    throw new BadRequestError('BadResponse _ boardCrawling');
  }
}

async function boardCrawl_dog(url:string) {
  try{
    request.get(url,(err,res) => {
      let $ = load(res.body,{xmlMode : true});
      var result: { title: string; views: string; likes: string; commentCount: string; link: string; writer: string; created : string; }[] = [];
      try{
        $('table').find('tbody').find('tr').each(async function (index, elem){
          result[index]={
          title : $(this).find('td.title>span>a>span.ed.title-link').text().trim(),
          views : $(this).find('td.readNum').text().trim(),
          likes : $(this).find('td.ed.voteNum.text-primary').text().trim(),
          commentCount : $(this).find('td.title>span>a.ed.link-reset>span.ed.text-primary').text().trim(),
          link : $(this).find('td.title>span>a').attr('href')!.toString(),
          writer : $(this).find('td.author').find('a').text().trim(),
          created : $(this).find('td.time').text().trim(),
          } 
          const Content = await ContentRepo.findContentAllDataById(result[index].link);
          if (Content) {
              Content.views = result[index].views;
              Content.likes = result[index].likes;
              Content.commentCount = result[index].commentCount;
              Content.created = result[index].created;
              await ContentRepo.update(Content)
              console.log("DKDK!! update ")
          } else {
            const createdContent = await ContentRepo.create({
              title : result[index].title,
              views : result[index].views,
              likes : result[index].likes,
              commentCount : result[index].commentCount,
              link : result[index].link,
              writer : result[index].writer,
              created : result[index].created,
              sites : "dogdrip",
            } as Content)
            console.log("DKDK!! create ")
          }
          await contentParse_dog(EmptyUrl+result[index].link)
        })
      }catch{
        throw new BadRequestError('BadResponse _ boardCrawling');
      }
    })
  }catch{
    throw new BadRequestError('BadResponse _ boardCrawling');
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
          $('article').find('.xe_content').each(async function (index,element){
            if($(this).text().trim().length>0){
              try{
                Content.content += (+"\n"+$(this).text().trim())
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

async function contentParse_dog(url:string) {
  try{
    request.get(url, (req,res)=>{
      let $ = load(res.body,{xmlMode : true})
      var comment : [string];
      var result: { content?: string; comment? : string;  }[] = [];
      try{
        //본문
        $('div.ed.clearfix.margin-vertical-large').find('.xe_content').each(async function (index,element){
          if($(this).text().trim().length>0){
            const Content = await ContentRepo.findContentAllDataById(url)
            if (Content){
              try{
                Content.content += ($(this).text().trim())
                await ContentRepo.update(Content)
              }catch{
                console.log("FUCK 콘텐트")
              }
            }else {
              console.log('!콘텐트 콘텐트')
            }
          }
        })


        //댓글
        $('div.ed.comment-list').find('.xe_content').each(async function (index,element){
          if($(this).text().trim().length>0){
            const Content = await ContentRepo.findContentAllDataById(url)
            if (Content){
              try{
                Content.comment += ($(this).text().trim())
                await ContentRepo.update(Content)
              }catch{
                console.log("FUCK 코멘트")
              }
            }else {
              console.log('!콘텐트 코멘트')
            }
          }
        })
        
      }catch(ere){
        console.log('comment error',ere)
      }
    })
  }catch(err){
    console.log(err)
  }
}

export default router