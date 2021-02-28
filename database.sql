create table github_discord_url(
    id uuid DEFAULT uuid_generate_v4() not null,
    created_at timestamptz DEFAULT Now() not null,
    updated_at timestamptz DEFAULT Now() not null,
    discord_url varchar(255) not null UNIQUE
);