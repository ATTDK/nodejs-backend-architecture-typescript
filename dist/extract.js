"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = void 0;
const cheerio_1 = require("cheerio");
const extract = (html) => {
    if (html === '')
        return [];
    const $ = cheerio_1.load(html);
    const crawledRealtimeKeywords = $('.ah_roll_area.PM_CL_realtimeKeyword_rolling ul > li span.ah_k');
    const keywords = $(crawledRealtimeKeywords)
        .map((i, ele) => {
        return $(ele).text();
    })
        .get();
    return keywords;
};
exports.extract = extract;
//# sourceMappingURL=extract.js.map