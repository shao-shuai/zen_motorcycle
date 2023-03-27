-- Create vector extension
create extension vector;

-- Create table for book chunks
create table zen_motor (
  id bigserial primary key,
  content text,
  tokens bigint,
  embedding vector (1536)
);

-- Create function for finding the most related chunks of a given query
create or replace function zen_search (
  query_embedding vector(1536),
  similarity_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  tokens bigint,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    zen_motor.id,
    zen_motor.content,
    zen_motor.tokens,
    1 - (zen_motor.embedding <=> query_embedding) as similarity
  from zen_motor
  where 1 - (zen_motor.embedding <=> query_embedding) > similarity_threshold
  order by zen_motor.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- Create index
create index on zen_motor
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);