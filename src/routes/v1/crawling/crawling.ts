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
import { find } from 'lodash';
import { format } from 'morgan';
const router = express.Router();
const tqUrl = 'https://theqoo.net/index.php?mid=total&filter_mode=normal&s_module_srl=1941552&page=300';
const dcUrl = 'https://gall.dcinside.com/board/lists/?id=mkyunghoon';
const dogUrl = 'https://www.dogdrip.net/index.php?mid=ib&page=1';
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
    for(var i=1; i< 30000; i++){
      await boardCrawl(dogUrl+i)
    }
  })
);

router.get(
  '/crawlingDogdri1p',
  asyncHandler(async (req, res) => {
    request.get(dogUrl,(re_err, re_res) => {
      let $ = load(re_res.body,{xmlMode : true});
      var result = [];
      console.log('Dogdrip table')
      try{
        $('table').find('tbody').find('tr').each(function (index, elem){
          var title, views, likes, commentCount, link, writer
          
          title = $(this).find('td.title>span>a>span.ed.title-link').text().trim()
          views = $(this).find('td.readNum').text().trim()
          likes = $(this).find('td.ed.voteNum.text-primary').text().trim()
          commentCount = $(this).find('td.title>span>a.ed.link-reset>span.ed.text-primary').text().trim()
          link = $(this).find('td.title>span>a').attr('href')
          writer = $(this).find('td.author').find('a').text().trim()
          result[index]={
            title,
            views,
            likes,
            commentCount,
            link,
            writer
          };
          console.log(
            "Title : " + title
            +"\nViews : " + views
            +"\nLikes : " + likes
            +"\nComment Count : " + commentCount
            +"\nLink : " + link
            +"\nWriter : " + writer
          )
          contentParse(EmptyUrl+link)
        })
      }catch (re_err){
        throw new BadRequestError('Bad Request _ crawling');
      }
    });
  })
);

async function boardCrawl(url:string) {
  try{
    request.get(url,(err,res) => {
      let $ = load(res.body,{xmlMode : true});
      try{
        $('table').find('tbody').find('tr').each(function (index, elem){
          var title, views, likes, commentCount, link, writer
          
          title = $(this).find('td.title>span>a>span.ed.title-link').text().trim()
          views = $(this).find('td.readNum').text().trim()
          likes = $(this).find('td.ed.voteNum.text-primary').text().trim()
          commentCount = $(this).find('td.title>span>a.ed.link-reset>span.ed.text-primary').text().trim()
          link = $(this).find('td.title>span>a').attr('href')
          writer = $(this).find('td.author').find('a').text().trim()
          console.log(
            "Title : " + title
            +"\nViews : " + views
            +"\nLikes : " + likes
            +"\nComment Count : " + commentCount
            +"\nLink : " + link
            +"\nWriter : " + writer
          )
          contentParse(EmptyUrl+link)
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
    request.get(url,(req,res)=>{
      let $ = load(res.body)
      try{
        console.log(
          ""
          +$('div.ed.comment-item.clearfix').find('.xe_content').text().trim()
        )
      }catch(ere){
        console.log('comment error',ere)
      }
    })
  }catch(err){
    console.log(err)
  }
}

export default router


export const updateTop: RequestHandler = async (req, res) => {
  try {  
      const crawl = (url : string) =>
          new Promise<string>((resolve, reject) => {
              request.get({
                      url: '',
                      jar: true
                  }, (err, res) => {
                  if (err) reject(err);
                  resolve(res.body);
              });
      });
      const result = [];
      for(var i=0; i<3000; i++){
        result[i] = await crawl(dogUrl+i);
      }

     // const result = awa/ crawl();
      const extract = (html: string, j:number) => {
          if (html === '') return [];
          const $ = load(html);
          const crawledRealtimeKeywords = $(`#menu2093_obj18 > div._fnctWrap._articleTable > form > table > tbody > tr:nth-child(${j}) > td._artclTdTitle > a`,);
          const keywords = $(crawledRealtimeKeywords)
            .map(
              (i, ele) => {
                  return {content: $(ele).text(),
                  link: $(ele).attr()};
              },
            )
            .get();
          return keywords;
      };
      const postedAt = (html: string, j:number) => {
          if (html === '') return [];
          const $ = load(html);
          const crawledRealtimeKeywords = $(`#menu2093_obj18 > div._fnctWrap._articleTable > form > table > tbody > tr:nth-child(${j}) > td._artclTdRdate`,);
          const keywords: string[] = $(crawledRealtimeKeywords)
            .map(
              (i, ele): string => {
                  return $(ele).text();
              },
            )
            .get();
          return keywords;
      };
      let top: any[] = [];
      for (let i: number = 1; i <= 10; i++) {
          let res = extract(result, i)[0];
          let content: string = res.content.replace('\n\t\t\t\t\t\t\t\t\t','');
          content = content.replace('\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t','');
          content = content.replace('\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t','');
          let link: string = res.link.href;
          let posted_at: string = postedAt(result, i)[0];
          let elem: {
              content: string,
              posted_at: string,
              link: string
          } = {
              content,
              posted_at,
              link 
          }
          top.push(elem);
          let topRepository = await getRepository(inha_plaza);
          let topUpdate = await topRepository.findOne(i);
          topUpdate.title = content;
          topUpdate.link = link;
          topUpdate.posted_at = new Date(posted_at);
          await topRepository.save(topUpdate);
      }
      console.log(top)
      res.status(201).json(response.success(message.READ_SUCCESS, top));
  } catch(err) {
      console.log(err)
  }
};
