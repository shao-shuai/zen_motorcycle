# GPT for Zen and the Art of Motorcycle Maintenance

[Zen and the Art of Motorcycle Maintenance](https://en.wikipedia.org/wiki/Zen_and_the_Art_of_Motorcycle_Maintenance) by Robert M. Pirsig is my favorite book in 2022.

With this app, you are able to search the content of the book with natural language.

## Dataset

[Zen and the Art of Motorcycle Maintenance](https://archive.org/stream/ZenAndTheArtOfMotorcycleRepair-RobertPirsig/zen-motorcycle_djvu.txt)

## How it works

The book was split into chunks and each chunk was embedded with [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings) (`text-embedding-ada-002`).

When user input a question, the question is firsted embedded, then all the chunks are looped over and compare the cosine similarity of the dembedded quesiton and each chunk.

You can set up the threshold and the number of returned results.

## Thanks

This repo was inspired by [paul-graham-gpt](https://github.com/mckaywrigley/paul-graham-gpt) created by [Mckay Wrigley](https://github.com/mckaywrigley), he also has an awesome video here, [How to create an OpenAI Q&A bot with ChatGPT API + embeddings](https://www.youtube.com/watch?v=RM-v7zoYQo0&t=2412s).
