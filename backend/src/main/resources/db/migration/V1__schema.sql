-- ABHIJAYFLIX schema
-- List-valued columns (tech stacks, bullet points, flow steps) are stored as
-- pipe-delimited text and converted by StringListConverter.

CREATE TABLE profile (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name       VARCHAR(120)  NOT NULL,
    brand_name      VARCHAR(60)   NOT NULL,
    title           VARCHAR(255)  NOT NULL,
    introduction    TEXT          NOT NULL,
    about_title     VARCHAR(160)  NOT NULL,
    about_text      TEXT          NOT NULL,
    email           VARCHAR(255),
    linkedin_url    VARCHAR(500),
    github_url      VARCHAR(500),
    resume_url      VARCHAR(500),
    image_url       VARCHAR(500)
);

CREATE TABLE project (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    slug            VARCHAR(80)   NOT NULL UNIQUE,
    title           VARCHAR(200)  NOT NULL,
    short_title     VARCHAR(80)   NOT NULL,
    project_year    INT,
    categories      TEXT          NOT NULL,
    tech_stack      TEXT          NOT NULL,
    tagline         VARCHAR(300)  NOT NULL,
    summary         TEXT          NOT NULL,
    notes           TEXT,
    poster_variant  VARCHAR(30)   NOT NULL,
    accent_color    VARCHAR(20)   NOT NULL,
    github_url      VARCHAR(500),
    demo_url        VARCHAR(500),
    position        INT           NOT NULL
);

CREATE TABLE project_section (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id      BIGINT        NOT NULL,
    position        INT           NOT NULL,
    heading         VARCHAR(200)  NOT NULL,
    kind            VARCHAR(20)   NOT NULL,   -- TEXT | LIST | FLOW
    body            TEXT,
    items           TEXT,
    CONSTRAINT fk_section_project FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE
);

CREATE TABLE project_metric (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id      BIGINT        NOT NULL,
    position        INT           NOT NULL,
    label           VARCHAR(200)  NOT NULL,
    metric_value    VARCHAR(60)   NOT NULL,
    note            VARCHAR(300),
    CONSTRAINT fk_metric_project FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE
);

CREATE TABLE experience (
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    slug             VARCHAR(80)   NOT NULL UNIQUE,
    company          VARCHAR(160)  NOT NULL,
    role             VARCHAR(160)  NOT NULL,
    duration         VARCHAR(60)   NOT NULL,
    summary          TEXT          NOT NULL,
    tech_stack       TEXT          NOT NULL,
    responsibilities TEXT          NOT NULL,
    highlights       TEXT,
    position         INT           NOT NULL
);

CREATE TABLE skill_category (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    slug            VARCHAR(80)   NOT NULL UNIQUE,
    name            VARCHAR(120)  NOT NULL,
    skills          TEXT          NOT NULL,
    position        INT           NOT NULL
);

CREATE TABLE education (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    degree              VARCHAR(160)  NOT NULL,
    branch              VARCHAR(160)  NOT NULL,
    institution         VARCHAR(255)  NOT NULL,
    expected_graduation VARCHAR(40)   NOT NULL,
    position            INT           NOT NULL
);

CREATE TABLE certification (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    title           VARCHAR(255)  NOT NULL,
    kind            VARCHAR(30)   NOT NULL,   -- CERTIFICATION | PROGRAM | HACKATHON
    position        INT           NOT NULL
);

CREATE TABLE contact_message (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(120)  NOT NULL,
    email           VARCHAR(255)  NOT NULL,
    message         TEXT          NOT NULL,
    created_at      TIMESTAMP     NOT NULL
);
