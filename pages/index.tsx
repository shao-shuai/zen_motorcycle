import { ZMChunk } from "@/types";
import Head from "next/head";
import { use, useState } from "react";
import endent from "endent";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [chunks, setChunks] = useState<ZMChunk[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAnswer = async () => {
    setLoading(true);
    setAnswer("");

    const searchResponse = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!searchResponse.ok) {
      return;
    }

    const results: ZMChunk[] = await searchResponse.json();
    setChunks(results);
    console.log(results);

    const prompt = endent`
    Use the following passages to answer the query: ${query}

    ${results.map((chunk) => chunk.content).join("\n")}
    `;

    console.log(prompt);

    // const answerResponse = await fetch("/api/answer", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ prompt }),
    // });

    // if (!answerResponse.ok) {
    //   return;
    // }

    // const data = answerResponse.body;

    // if (!data) {
    //   return;
    // }

    // const reader = data.getReader();

    // const decoder = new TextDecoder();

    // let done = false;

    // while (!done) {
    //   const { value, done: doneReading } = await reader.read();
    //   done = doneReading;
    //   const chunkValue = decoder.decode(value);
    //   setAnswer((prev) => prev + chunkValue);
    // }

    // setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Zen Motor GPT</title>
        <meta
          name="description"
          content="AI Q&A on Zen and the Art of Motorcycle Maintenance"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <div className="flex items-center justify-left w-full">
        <div className="flex items-center justify-left w-full py-4 px-8">
          <div className="text-xl font-bold text-gray-800">Zen Motor GPT</div>
        </div>
      </div> */}

      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="relative mt-4 mx-auto" style={{ maxWidth: "400px" }}>
          <input
            className="h-12 w-full rounded-full border border-zinc-600 pr-12 pl-11 focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800 sm:h-16 sm:py-2 sm:pr-16 sm:pl-16 sm:text-lg"
            type="text"
            placeholder="Ask Robert a question"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 ring-blue-300 my-5 mx-40"
            onClick={handleAnswer}
          >
            Ask
          </button>
        </div>

        <div>
          {chunks.map((chunk, index) => (
            <div key={index} className="mx-64">
              <div className="mt-4 border border-zinc-600 rounded-lg p-4">
                <p>{chunk.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="my-12">
          {loading ? (
            <div>Loading</div>
          ) : (
            <div className="mx-64"> {answer} </div>
          )}
        </div> */}
      </div>
      {/* </div> */}
    </>
  );
}
