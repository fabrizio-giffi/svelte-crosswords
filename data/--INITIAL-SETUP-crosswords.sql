-- SQLite

-- TABLE DECLARATIONS

-- Create crosswords table                                                                                               
CREATE TABLE IF NOT EXISTS crosswords (
    id INTEGER PRIMARY KEY,
    horizontal INTEGER NOT NULL,
    vertical INTEGER NOT NULL,
    created TEXT NOT NULL
);

-- Create index for the created column in the crosswords table
CREATE INDEX IF NOT EXISTS idx_crosswords_created ON crosswords(created);

-- Create Cells table
CREATE TABLE IF NOT EXISTS cells (
    id INTEGER PRIMARY KEY,
    crossword INTEGER NOT NULL,
    black BOOLEAN DEFAULT FALSE,
    letter TEXT DEFAULT NULL,
    number INTEGER DEFAULT NULL,
    FOREIGN KEY (crossword) REFERENCES crosswords(id) ON DELETE CASCADE
);

-- Create index for the crossword column in the cells table
CREATE INDEX IF NOT EXISTS idx_cells_crossword ON cells(crossword);

-- Create Definitions table
CREATE TABLE IF NOT EXISTS definitions (
    id INTEGER PRIMARY KEY,
    crossword INTEGER NOT NULL,
    direction TEXT CHECK(direction IN ('horizontal', 'vertical')) NOT NULL,
    text TEXT NOT NULL,
    number INTEGER NOT NULL,
    solution INTEGER DEFAULT NULL,
    FOREIGN KEY (crossword) REFERENCES crosswords(id) ON DELETE CASCADE,
    FOREIGN KEY (solution) REFERENCES solutions(id) ON DELETE CASCADE
);

-- Create index for the crossword column in the definitions table
CREATE INDEX IF NOT EXISTS idx_definitions_crossword ON definitions(crossword);

-- Create Solutions table
CREATE TABLE IF NOT EXISTS solutions (
    id INTEGER PRIMARY KEY,
    definition INTEGER NOT NULL,
    text TEXT CHECK(text IN ('horizontal', 'vertical')) NOT NULL,
    FOREIGN KEY (definition) REFERENCES definitions(id) ON DELETE CASCADE
);

-- Create index for the definition column in the solutions table
CREATE INDEX IF NOT EXISTS idx_solutions_definition ON solutions(definition);


-- DUMMY SINGLE CROSSWORD --

-- Insert crossword
INSERT OR REPLACE INTO crosswords (horizontal, vertical, created) VALUES (5, 5, "right_now");

-- Insert cells (assuming crossword_id is 1)
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);
INSERT OR REPLACE INTO cells (crossword, black, letter, number) VALUES (1, 0, NULL, NULL);

-- Insert definitions (assuming crossword_id is 1)
INSERT OR REPLACE INTO definitions (crossword, direction, text, number, solution) VALUES (1, 'horizontal', 'Definition 1', 1, NULL);
INSERT OR REPLACE INTO definitions (crossword, direction, text, number, solution) VALUES (1, 'vertical', 'Definition 2', 2, NULL);
INSERT OR REPLACE INTO definitions (crossword, direction, text, number, solution) VALUES (1, 'horizontal', 'Definition 3', 3, NULL);
INSERT OR REPLACE INTO definitions (crossword, direction, text, number, solution) VALUES (1, 'vertical', 'Definition 4', 4, NULL);
INSERT OR REPLACE INTO definitions (crossword, direction, text, number, solution) VALUES (1, 'horizontal', 'Definition 5', 5, NULL);