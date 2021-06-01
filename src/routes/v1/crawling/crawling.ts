import request from 'request';
import express, { RequestHandler } from 'express';
import asyncHandler from '../../../helpers/asyncHandler';
import { BadRequestError } from '../../../core/ApiError';
import { SuccessResponse } from '../../../core/ApiResponse';
import { resolve } from 'path';
import { load } from 'cheerio';
import axios from 'axios';
import { SiteCode } from '../../../database/model/Site';
import ContentRepo from '../../../database/repository/ContentRepo';
import Content from '../../../database/model/Content';
import Comment from '../../../database/model/Comment';
import { delay, find } from 'lodash';
import { format } from 'morgan';
const router = express.Router();
const tqUrl = 'https://theqoo.net/index.php?mid=total&filter_mode=normal&s_module_srl=1941552&page=300';
const dcUrl = 'https://gall.dcinside.com/board/lists/?id=mkyunghoon';
const dogUrl = 'https://www.dogdrip.net/index.php?mid=ib&page=';
const tqBaseUrl = 'https://theqoo.net/'
const dcBaseUrl = 'https://gall.dcinside.com/'
const dogBaseUrl = 'https://www.dogdrip.net/'
const EmptyUrl = ''
let $href = [];

router.get(
  '/crawlingTheqoo',
  asyncHandler(async (req, res) => {
    request.get(tqUrl,(re_err, re_res) => {
      let $ = load(re_res.body);
      let link;
      console.log('theqoo')

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

    for(var i=1; i<= 20; i++){
      await boardCrawl(dogUrl+i)
      console.log("DKDKDK don : ",i)
      if(i % 5 == 0){
        delay(boardCrawl, 500)
      }
    }
  })
);


async function boardCrawl(url:string) {
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
          await contentParse(EmptyUrl+result[index].link)
        })
      }catch{
        throw new BadRequestError('BadResponse _ boardCrawling');
      }
    })
  }catch{
    throw new BadRequestError('BadResponse _ boardCrawling');
  }
}

async function contentParse(url:string) {
  try{
    request.get(url, (req,res)=>{
      let $ = load(res.body,{xmlMode : true})
      var comment : [string];
      var result: { content?: string; comment? : string;  }[] = [];
      try{
        $('div.ed.comment-list').find('.xe_content').each(async function (index,element){
          if($(this).text().trim().length>0){
            const Content = await ContentRepo.findContentAllDataById(url)
            if (Content){
              if(Content.comment){
                console.log('콘텐트 && 코멘트')
                Content.comment = ["dm?"]
                await ContentRepo.update(Content)
              }else if (!Content.comment){
                console.log('콘텐트 && !코멘트')
                Content.comment = [""]
                try{
                  Content.comment.push($(this).text().trim())
                  await ContentRepo.update(Content)
                }catch{
                  console.log("FUCK")
                }
                
                // Content.comment[index] = $(this).text().trim()
              }
            }else {
              console.log('!콘텐트')
            }
          }
        })

        /*if(true){
          //댓글 추가
         
          //내용 추가
          
          $('div.ed.clearfix.margin-vertical-large').find('.xe_content').each(function (index,ele){
           if(ele){
            result[index]={
              content : $(this).text().trim()
            }
           }
          })
          await ContentRepo.update(Content)
          console.log("DKDK!! update "+Content)
        } else {
          console.log("DKDK!! content cannot")
            // $('div.ed.comment-list').find('.xe_content').each(function (index,element){
            //console.log(
            //url + 
            //" comment : "
            //+$(this).text().trim()
            //+"index : ",index
            //)
            //})
        }*/
      }catch(ere){
        console.log('comment error',ere)
      }
    })
  }catch(err){
    console.log(err)
  }
}

export default router