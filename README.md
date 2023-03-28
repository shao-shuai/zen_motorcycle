# GPT for Zen and the Art of Motorcycle Maintenance

![](.public/demo.gif)

[Zen and the Art of Motorcycle Maintenance](https://en.wikipedia.org/wiki/Zen_and_the_Art_of_Motorcycle_Maintenance) by Robert M. Pirsig is my favorite book in 2022.

With this app, you are able to ask Robert questions and search book content with natural language.

## Dataset

[Zen and the Art of Motorcycle Maintenance](https://archive.org/stream/ZenAndTheArtOfMotorcycleRepair-RobertPirsig/zen-motorcycle_djvu.txt)

## Implementation

[Zen and the Art of Motorcycle Maintenance](https://archive.org/stream/ZenAndTheArtOfMotorcycleRepair-RobertPirsig/zen-motorcycle_djvu.txt) is scraped and written as a json file `./scripts/zen_motor.json`.

The book was split into chunks and each chunk was embedded with [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings) (`text-embedding-ada-002`), refer to `./scripts/embed.ts`, all the embeddings are stored in [Supabase](https://supabase.com/) database.

When user input a question:
1. Seach mode: the embedding of each chunk would be comparaed with the embedding of the question, and the chunks with close cosine similarity score will be returned.
2. Chat mode: the returned chinks will be used as prompt and fed to OpenAI's API and get an answer.

## Running Locally

Here's a quick overview of how to run it locally.

### Requirements

1. Set up OpenAI

You'll need an OpenAI API key to generate embeddings.

2. Set up Supabase and create a database

Note: there are also other embedding databases

Check schema.sql for setting up database on Supabase.

### Repo Setup

3. Clone repo

```bash
git clone https://github.com/shao-shuai/zen_motorcycle.git
```

4. Install dependencies

```bash
npm i
```

5. Set up environment variables

Create a .env.local file in the root of the repo with the following variables:

```bash
OPENAI_API_KEY=

NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

## Thanks

This repo was inspired by [paul-graham-gpt](https://github.com/mckaywrigley/paul-graham-gpt) created by [Mckay Wrigley](https://github.com/mckaywrigley), he also has an awesome video here, [How to create an OpenAI Q&A bot with ChatGPT API + embeddings](https://www.youtube.com/watch?v=RM-v7zoYQo0&t=2412s).

