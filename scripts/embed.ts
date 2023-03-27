import { ZMBook, ZMJson } from "@/types";
import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import { Configuration, OpenAIApi } from "openai";

loadEnvConfig("");

const generateEmbeddings = async (book: ZMBook) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  for (let i = 0; i < book.chunks.length; i++) {
    const chunk = book.chunks[i];

    const { content, tokens } = chunk;

    const embeddingResponse = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: content,
    });

    const [{ embedding }] = embeddingResponse.data.data;

    const { data, error } = await supabase
      .from("zen_motor")
      .insert({
        content,
        tokens,
        embedding,
      })
      .select("*");

    if (error) {
      console.log("error", error);
    } else {
      console.log(`Chunk ${i} is saved`);
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
  }
};

(async () => {
  const file: ZMJson = JSON.parse(
    fs.readFileSync("scripts/zen_motor.json", "utf8")
  );

  await generateEmbeddings(file.book);
})();
