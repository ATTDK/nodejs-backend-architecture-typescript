import { load } from 'cheerio';

 export const extract = (html: string) => {
  if (html === '') return [];
  const $ = load(html);
  const crawledRealtimeKeywords = $(
    'td.title',
  );
  const keywords: string[] = $(crawledRealtimeKeywords)
    .map(
      (i, ele): string => {
        return $(ele).text();
      },
    )
    .get();
  return keywords;
};