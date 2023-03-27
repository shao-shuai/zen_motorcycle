// Total character is 816634
// Token number is 203068
import { ZMBook, ZMChunk, ZMJson } from "@/types";
import axios from "axios";
import * as cheerio from "cheerio";
import { encode } from "gpt-3-encoder";
import fs from "fs";

const BASE_URL =
  "https://archive.org/stream/ZenAndTheArtOfMotorcycleRepair-RobertPirsig/zen-motorcycle_djvu.txt";

const CHUNK_SIZE = 200;

const getArticle = async () => {
  let article: ZMBook = {
    title: "zen and the art of motorcycle maintenance",
    url: BASE_URL,
    content: "",
    tokens: 203068,
    chunks: [],
  };

  const html = await axios.get(`${BASE_URL}`);
  const $ = cheerio.load(html.data);
  const text = $("pre");
  const pre = $(text).text();

  // clean text
  let cleanedText = pre.replace(
    /zen and the art of motorcycle maintenance, robert m. pirsig/g,
    ""
  );
  cleanedText = cleanedText.replace(/Page [\da-zA-Z]+ of 192/g, "");
  cleanedText = cleanedText.replace(/Page Oof 192/g, "");
  cleanedText = cleanedText.replace(/\s+/g, " "); // replace all occurrences of one or more consecutive whitespace characters (such as spaces, tabs, or line breaks) with a single space character.
  cleanedText = cleanedText.replace(/\.([a-zA-Z])/g, ". $1"); // insert a space after any period that is immediately followed by a letter.

  let articleText = cleanedText.replace(/\n/g, " ");

  const trimmedContent = articleText.trim();

  article.content = trimmedContent;

  return article;
};

const getChunks = async (article: ZMBook) => {
  const { title, url, content, tokens, chunks } = article;

  let articleTextChunks = [];

  const split = content.split(". ");
  let chunkText = "";

  for (let i = 0; i < split.length; i++) {
    const sentence = split[i];
    const sentenceTokenLength = encode(sentence);
    const chunkTextTokenLength = encode(chunkText).length;

    if (chunkTextTokenLength + sentenceTokenLength.length > CHUNK_SIZE) {
      articleTextChunks.push(chunkText.trim());
      chunkText = "";
    }

    // why sentence[sentence.length - 1].match(/[a-z0-9]/i) doesn't work here
    if (sentence.charAt(sentence.length - 1).match(/[a-z0-9]/i)) {
      chunkText += sentence + ". ";
    } else {
      chunkText += sentence + " ";
    }
  }

  articleTextChunks.push(chunkText.trim());

  const articleChunks = articleTextChunks.map((text) => {
    const trimmedText = text.trim();

    const chunk: ZMChunk = {
      content: trimmedText,
      tokens: encode(trimmedText).length,
      embedding: [],
    };

    return chunk;
  });

  const chunkedSection: ZMBook = {
    ...article,
    chunks: articleChunks,
  };

  return chunkedSection;
};

(async () => {
  let book = await getArticle();
  let bookChunks = await getChunks(book);
  console.log(bookChunks.chunks.length);

  const json: ZMJson = {
    current_date: "2023-03-20",
    author: "Robert M. Pirsig",
    url: BASE_URL,
    length: bookChunks.chunks.reduce(
      (acc, essay) => acc + essay.content.length,
      0
    ),
    tokens: bookChunks.tokens,
    book: bookChunks,
  };

  fs.writeFileSync("scripts/zen_motor.json", JSON.stringify(json));
})();
