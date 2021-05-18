import request from 'request';
import {Send} from 'express';
import express from 'express';
import asyncHandler from '../../../helpers/asyncHandler';
import { BadRequestError } from '../../../core/ApiError';
import { SuccessResponse } from '../../../core/ApiResponse';
import { resolve } from 'path';
import { load } from 'cheerio';

const router = express.Router();
const url = 'https://theqoo.net/index.php?mid=total&filter_mode=normal&s_module_srl=1941552&page=1';

router.get(
  '/crawling',
  asyncHandler(async (req, res) => {
    request.get(url,(re_err, re_res) => {
      let $ = load(re_res.body);

      try{
        $('table').find('tbody').find('tr').each(function (index, elem){
          if(index > 3){
            console.log("tete" 
            // + $(this).find('td.title').text().trim()
            // + $(this).find('td.m_no').text().trim() + "  "
            // + $(this).find('td.no').text().trim() + "  "
            + $(this).find('td.title.a').text().trim()+ "  "
            );
          }
        })
        
      }catch (re_err){
        throw new BadRequestError('Bad Request _ crawling');
      }
      
    });
    
  })
);


export default router