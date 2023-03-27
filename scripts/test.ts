import axios from "axios";
import * as cheerio from "cheerio";
import { encode } from "gpt-3-encoder";
import { type } from "os";
import fs from "fs";
import { ZMBook, ZMJson } from "@/types";

const BASE_URL_GOOGLE_PATENT =
  "https://patents.google.com/patent/CN110244311B/";
const BASE_URL_FPO = "https://www.freepatentsonline.com/8848839.html";

(async () => {
  // const file: ZMJson = JSON.parse(
  //   fs.readFileSync("scripts/zen_motor.json", "utf8")
  // );
  // console.log(file.book.chunks.length);

  const html = await axios.get(`${BASE_URL_GOOGLE_PATENT}`);
  const $ = cheerio.load(html.data);
  const text = $("div.description-paragraph");
  const pre = $(text).text();
  console.log(pre);
  console.log(typeof pre);
  console.log(pre.length);
  // console.log(text);
})();
