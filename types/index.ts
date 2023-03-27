export type ZMBook = {
  title: string;
  url: string;
  content: string;
  tokens: number;
  chunks: ZMChunk[];
};

export type ZMChunk = {
  content: string;
  tokens: number;
  embedding: number[];
};

export type ZMJson = {
  current_date: string;
  author: string;
  url: string;
  length: number;
  tokens: number;
  book: ZMBook;
};
