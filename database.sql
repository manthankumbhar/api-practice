create table github_discord_url(
    id uuid DEFAULT uuid_generate_v4(),
    created_at timestamptz DEFAULT Now(),
    updated_at varchar,
    discord_urls varchar(255)
);