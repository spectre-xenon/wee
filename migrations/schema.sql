-- Links table
CREATE TABLE
    IF NOT EXISTS links (
        id TEXT NOT NULL,
        big_url TEXT NOT NULL,
        clicks INTEGER NOT NULL,
        PRIMARY KEY (id)
    );

-- bigUrl index
CREATE INDEX IF NOT EXISTS idx_links_big_url on links (big_url)