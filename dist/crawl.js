"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crawl = void 0;
const request_1 = __importDefault(require("request"));
const crawl = () => new Promise((resolve, reject) => {
    request_1.default.get('https://naver.com', (err, res) => {
        if (err)
            reject(err);
        resolve(res.body);
    });
});
exports.crawl = crawl;
//# sourceMappingURL=crawl.js.map