-- Contact details supplied by Abhijay Krishnan.
-- Resume and photo stay NULL until the real files are added to frontend/public/.

ALTER TABLE profile ADD COLUMN phone VARCHAR(40);

UPDATE profile
SET email        = 'abhijay.k2004@gmail.com',
    phone        = '+91 8779479851',
    github_url   = 'https://github.com/ABHIJAYAMITKRISHNAN',
    linkedin_url = 'https://www.linkedin.com/in/abhijay-krishnan-06baa4367/';
