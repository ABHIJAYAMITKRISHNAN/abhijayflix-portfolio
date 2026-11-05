-- ABHIJAYFLIX initial content.
-- Source of truth: content supplied by Abhijay Krishnan.
-- Contact links, resume, photo and project links are intentionally NULL until provided.
-- Lists use '|' as the item delimiter.

-- ---------------------------------------------------------------- PROFILE
INSERT INTO profile (full_name, brand_name, title, introduction, about_title, about_text,
                     email, linkedin_url, github_url, resume_url, image_url)
VALUES ('Abhijay Krishnan',
        'ABHIJAYFLIX',
        'Software Engineer | Java Backend Developer | DevOps Enthusiast | AI/ML Developer',
        'I am a Computer Engineering student passionate about building scalable backend applications, distributed systems, cloud infrastructure, and AI-powered solutions.|My technical interests include Java, Spring Boot, Microservices, Python, Machine Learning, NLP, Docker, Kubernetes, and AWS.|I enjoy solving real-world engineering problems by developing applications that combine backend technologies, cloud infrastructure, and intelligent systems.',
        'The Story Behind the Developer',
        'I''m Abhijay Krishnan, a Computer Engineering student at NMIMS, Mumbai, passionate about building scalable software applications and intelligent systems.|My development journey includes building distributed payment processing systems, logistics platforms, NLP-based machine learning applications, and AI-powered tools.|I enjoy working across backend development, cloud infrastructure, DevOps, and artificial intelligence.|I am particularly interested in Java backend engineering, Spring Boot, microservices, distributed systems, and cloud technologies.|My goal is to become a strong software engineer capable of designing, developing, deploying, and maintaining scalable real-world applications.',
        NULL, NULL, NULL, NULL, NULL);

-- ---------------------------------------------------------------- PROJECTS
INSERT INTO project (slug, title, short_title, project_year, categories, tech_stack, tagline, summary, notes,
                     poster_variant, accent_color, github_url, demo_url, position)
VALUES
('payment-aiops-platform',
 'Distributed Payment Processing & AI-Powered Self-Healing Platform',
 'Payment & AIOps Platform',
 2026,
 'Distributed Systems|Backend Engineering|Artificial Intelligence|AIOps',
 'Java 17|Spring Boot|Python|PostgreSQL|REST APIs|JWT|Docker|Kubernetes|Prometheus|LangGraph|ChromaDB|Ollama|Isolation Forest',
 'Four Spring Boot microservices move the money. A 13-stage multi-agent AIOps pipeline watches them, finds root causes and recommends recovery for a human to approve.',
 'A distributed payment processing platform built with Java 17, Spring Boot, PostgreSQL and four REST microservices, containerised with Docker, deployed on Kubernetes and monitored with Prometheus, paired with an AI-powered incident response pipeline built in Python and LangGraph.',
 'Not fully autonomous: every recovery action recommended by the AIOps pipeline requires human approval before it is executed.',
 'network', '#E50914', NULL, NULL, 1),

('quickparcel',
 'QuickParcel – Parcel Delivery Management Platform',
 'QuickParcel',
 2025,
 'Full Stack Development|Logistics|Cloud Computing|DevOps',
 'Java|Spring Boot|React.js|Firebase Authentication|Firestore|Leaflet|OSRM|MySQL|Docker|AWS EC2',
 'A logistics platform connecting customers with vehicle providers: distance-based pricing, real routes on interactive maps, and synchronized dashboards.',
 'A parcel delivery and logistics platform that connects customers with vehicle providers. Customers enter pickup and destination locations, receive distance-based pricing estimates, find suitable vehicles and create parcel delivery bookings.',
 'QuickParcel is documented as two separate implementations: the version described in my resume uses Firebase Authentication and Firestore, while a separate Spring Boot + MySQL + Docker architecture was deployed on AWS EC2. They are not integrated with each other.',
 'map', '#F5A524', NULL, NULL, 2),

('fake-review-detection',
 'Fake Review Detection System',
 'Fake Review Detection',
 NULL,
 'Natural Language Processing|Machine Learning|Deep Learning|Artificial Intelligence',
 'Python|NLTK|TextBlob|Scikit-learn|TensorFlow|Keras|BiLSTM|Longformer|Hugging Face Transformers|TF-IDF|Pandas|NumPy|Matplotlib|Seaborn|MLflow|Streamlit|Docker|Joblib',
 'Human or machine? An NLP system that separates genuine human-written reviews from AI-generated ones using classical ML, a BiLSTM and an ensemble.',
 'An NLP-based fake review detection system that classifies online product and service reviews as either human-written genuine reviews or AI-generated reviews produced by language models such as ChatGPT and GPT-4.',
 'All metrics are reported project results pending verification against the source code and evaluation files. The technologies listed span the project''s experiments; not every model, dataset or library is part of a single production pipeline.',
 'text', '#8B5CF6', NULL, NULL, 3),

('currency-authentication',
 'Currency Authentication System',
 'Currency Authentication',
 2025,
 'Machine Learning|Image Processing|Computer Vision',
 'Python|Image Processing|Random Forest|Support Vector Machine|Gradient Boosting|Tkinter',
 'A machine learning counterfeit detector that analyses currency note images and classifies them through a real-time verification GUI.',
 'A machine learning-based counterfeit currency detection system that uses image processing and classification techniques to analyse currency image characteristics and classify potentially genuine and counterfeit currency notes.',
 NULL,
 'currency', '#10B981', NULL, NULL, 4);

-- ---------------------------------------------------------------- PROJECT SECTIONS
-- Payment & AIOps platform
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 1, 'The Platform', 'TEXT',
       'Developed a distributed payment processing platform using Java 17, Spring Boot, PostgreSQL and four REST microservices. The system uses JWT-based authentication and PostgreSQL for persistent data storage. The microservices are containerised using Docker and deployed on Kubernetes, with Prometheus monitoring.',
       NULL FROM project WHERE slug = 'payment-aiops-platform';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 2, 'The Microservices', 'LIST', NULL,
       'Authentication Service|Payment Service|Ledger Service|Notification Service'
FROM project WHERE slug = 'payment-aiops-platform';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 3, 'Payment Flow', 'FLOW', NULL,
       'Client|Authentication Service|Payment Service|Ledger Service|Notification Service'
FROM project WHERE slug = 'payment-aiops-platform';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 4, 'The AIOps Layer', 'TEXT',
       'Built a 13-stage multi-agent incident response pipeline using Python and LangGraph. The pipeline analyses incidents, retrieves historical context, identifies potential root causes and recommends recovery actions. Human approval is required before any recovery action is executed.',
       NULL FROM project WHERE slug = 'payment-aiops-platform';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 5, 'AIOps Building Blocks', 'LIST', NULL,
       'Isolation Forest for anomaly detection|ChromaDB for historical incident retrieval|Ollama for local LLM inference|LangGraph for multi-stage agent orchestration'
FROM project WHERE slug = 'payment-aiops-platform';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 6, 'AIOps Flow', 'FLOW', NULL,
       'Telemetry|Anomaly Detection|Historical Context Retrieval|Root Cause Analysis|Recovery Recommendation|Human Approval|Kubernetes Recovery'
FROM project WHERE slug = 'payment-aiops-platform';

-- QuickParcel
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 1, 'Overview', 'TEXT',
       'QuickParcel connects customers with vehicle providers. Customers can enter pickup and destination locations, receive distance-based pricing estimates, find suitable vehicles, and create parcel delivery bookings.',
       NULL FROM project WHERE slug = 'quickparcel';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 2, 'Key Features', 'LIST', NULL,
       'User registration and authentication|Customer and provider dashboards|Parcel booking management|Vehicle allocation|Distance-based pricing|Route calculation using OSRM|Interactive maps using Leaflet|Location tracking|Booking status management|Synchronized dashboards'
FROM project WHERE slug = 'quickparcel';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 3, 'Technical Implementation', 'TEXT',
       'Developed Spring Boot REST APIs to handle booking, vehicle allocation, authentication, pricing, and user management. Integrated Leaflet and OSRM for route visualisation and distance calculation.',
       NULL FROM project WHERE slug = 'quickparcel';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 4, 'Implementation A: Resume Version', 'LIST',
       'The project version described in my resume uses Firebase services.',
       'Firebase Authentication|Firestore'
FROM project WHERE slug = 'quickparcel';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 5, 'Implementation B: Containerised Deployment on AWS EC2', 'LIST',
       'A separate Spring Boot, MySQL and Docker-based architecture, deployed on AWS EC2 using Docker containers.',
       'Frontend container|Spring Boot backend container|MySQL database container with persistent storage|Caddy reverse proxy'
FROM project WHERE slug = 'quickparcel';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 6, 'Deployment Architecture', 'FLOW',
       'OSRM is used as the external route calculation service.',
       'Browser|Caddy|Frontend|Spring Boot Backend|MySQL'
FROM project WHERE slug = 'quickparcel';

-- Fake Review Detection
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 1, 'The Problem', 'TEXT',
       'AI-generated reviews are increasingly used to manipulate online ratings and influence customer purchasing decisions. Traditional fake review detection systems focus on spam, duplicate reviews and suspicious user behaviour, but AI-generated reviews can be grammatically correct and resemble genuine human-written reviews.',
       NULL FROM project WHERE slug = 'fake-review-detection';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 2, 'The Approach', 'TEXT',
       'The system classifies reviews into two categories, human-written genuine reviews and AI-generated reviews, by analysing linguistic patterns, vocabulary, sentiment, textual characteristics and contextual information.',
       NULL FROM project WHERE slug = 'fake-review-detection';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 3, 'NLP Preprocessing', 'LIST',
       'The project investigates and implements text preprocessing operations such as:',
       'Text cleaning and normalisation|Tokenisation|Stopword handling|Text standardisation|Linguistic feature extraction'
FROM project WHERE slug = 'fake-review-detection';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 4, 'Feature Engineering', 'LIST', NULL,
       'TF-IDF|Unigrams and bigrams|Sentiment analysis|Linguistic features|Lexical diversity'
FROM project WHERE slug = 'fake-review-detection';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 5, 'Machine Learning Models', 'LIST', NULL,
       'Logistic Regression|Random Forest|Support Vector Classifier'
FROM project WHERE slug = 'fake-review-detection';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 6, 'Deep Learning: Bidirectional LSTM', 'TEXT',
       'Implemented a Bidirectional LSTM model for sequential text classification. The BiLSTM processes text in both forward and backward directions to capture contextual information.',
       NULL FROM project WHERE slug = 'fake-review-detection';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 7, 'Ensemble Learning', 'TEXT',
       'The project combines Logistic Regression and BiLSTM predictions. The reported ensemble accuracy is achieved using a 0.5 decision threshold. An additional calibrated threshold of 0.22 reportedly produces 94.69% test accuracy while limiting false flags on genuine Amazon reviews to approximately 1%.',
       NULL FROM project WHERE slug = 'fake-review-detection';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 8, 'Longformer Integration', 'TEXT',
       'The project also integrates a pretrained Longformer-based AI text detector, evaluated on additional AI-generated review sets (see Reported Results).',
       NULL FROM project WHERE slug = 'fake-review-detection';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 9, 'Datasets Investigated', 'LIST',
       'The exact datasets used by each training and evaluation pipeline are still to be verified against the source code.',
       'Amazon Reviews Dataset|MAGE Dataset|GPT-4 IMDb Reviews'
FROM project WHERE slug = 'fake-review-detection';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 10, 'Streamlit Application', 'LIST', NULL,
       'Individual review input|Review rating input|Real-time fake review detection|Human-written versus AI-generated classification|Prediction probability scores|Explainability and feature-based insights|CSV upload for batch processing|Batch prediction results|Downloading prediction results'
FROM project WHERE slug = 'fake-review-detection';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 11, 'Model Evaluation', 'LIST', NULL,
       'Accuracy|Precision|Recall|F1-score|Confusion matrix|False positives|False negatives|Cross-dataset evaluation|Classification threshold calibration'
FROM project WHERE slug = 'fake-review-detection';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 12, 'Project Architecture', 'FLOW', NULL,
       'Dataset Collection|Text Preprocessing|Feature Engineering|Model Training|Ensemble Prediction|AI-Generated or Human-Written Classification|Streamlit Interface'
FROM project WHERE slug = 'fake-review-detection';

-- Currency Authentication
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 1, 'Overview', 'TEXT',
       'Built a machine learning-based counterfeit currency detection system using image processing and classification techniques. The system analyses currency image characteristics and uses machine learning models to classify potentially genuine and counterfeit currency notes.',
       NULL FROM project WHERE slug = 'currency-authentication';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 2, 'Models Implemented', 'LIST', NULL,
       'Random Forest|Support Vector Machine|Gradient Boosting'
FROM project WHERE slug = 'currency-authentication';
INSERT INTO project_section (project_id, position, heading, kind, body, items)
SELECT id, 3, 'Real-time Verification GUI', 'TEXT',
       'Developed a real-time verification GUI using Tkinter.',
       NULL FROM project WHERE slug = 'currency-authentication';

-- ---------------------------------------------------------------- PROJECT METRICS
INSERT INTO project_metric (project_id, position, label, metric_value, note)
SELECT id, 1, 'Macro F1 score', '1.00', 'Across 48 evaluation incidents' FROM project WHERE slug = 'payment-aiops-platform';
INSERT INTO project_metric (project_id, position, label, metric_value, note)
SELECT id, 2, 'Cross-service faults identified: multi-agent pipeline', '4 / 4', NULL FROM project WHERE slug = 'payment-aiops-platform';
INSERT INTO project_metric (project_id, position, label, metric_value, note)
SELECT id, 3, 'Cross-service faults identified: single-agent baseline', '0 / 4', NULL FROM project WHERE slug = 'payment-aiops-platform';

INSERT INTO project_metric (project_id, position, label, metric_value, note)
SELECT id, 1, 'Logistic Regression: test accuracy', '95.20%', NULL FROM project WHERE slug = 'fake-review-detection';
INSERT INTO project_metric (project_id, position, label, metric_value, note)
SELECT id, 2, 'BiLSTM: test accuracy', '95.47%', NULL FROM project WHERE slug = 'fake-review-detection';
INSERT INTO project_metric (project_id, position, label, metric_value, note)
SELECT id, 3, 'Ensemble: test accuracy', '96.57%', 'At a 0.5 decision threshold' FROM project WHERE slug = 'fake-review-detection';
INSERT INTO project_metric (project_id, position, label, metric_value, note)
SELECT id, 4, 'Ensemble: calibrated threshold (0.22)', '94.69%', 'Test accuracy; false flags on genuine Amazon reviews limited to approximately 1%' FROM project WHERE slug = 'fake-review-detection';
INSERT INTO project_metric (project_id, position, label, metric_value, note)
SELECT id, 5, 'ChatGPT-generated Yelp reviews', '78.79%', 'Additional evaluation' FROM project WHERE slug = 'fake-review-detection';
INSERT INTO project_metric (project_id, position, label, metric_value, note)
SELECT id, 6, 'GPT-4-generated IMDb reviews', '96.5%', 'Additional evaluation' FROM project WHERE slug = 'fake-review-detection';
INSERT INTO project_metric (project_id, position, label, metric_value, note)
SELECT id, 7, 'GPT-2-generated Amazon reviews', '94%', 'Detection with the combined system' FROM project WHERE slug = 'fake-review-detection';

-- ---------------------------------------------------------------- EXPERIENCE
INSERT INTO experience (slug, company, role, duration, summary, tech_stack, responsibilities, highlights, position)
VALUES
('orivon-technologies',
 'Orivon Technologies',
 'Software Engineering Intern',
 '2 Months',
 'Developed Java and Spring Boot REST APIs for a cloud-based document management platform.',
 'Java|Spring Boot|Spring Data JPA|Hibernate|MySQL|Docker|AWS EC2|AWS S3|AWS CloudWatch|Postman',
 'Developed REST APIs using Java and Spring Boot|Worked with Spring Data JPA and Hibernate|Used MySQL for database operations|Deployed containerised services on AWS EC2 using Docker|Integrated Amazon S3 for cloud storage|Used AWS CloudWatch for monitoring|Tested APIs using Postman|Used AI-assisted development tools with structured prompting to accelerate coding and debugging|Verified generated code within an Agile/Scrum workflow',
 NULL,
 1),
('mindstix-foundation',
 'Mindstix Foundation',
 'AI / Software Development Intern',
 '1 Month',
 'Worked on developing two AI-powered chatbot applications.',
 'Python|AI Chatbots|Prompt Engineering|Structured Interaction Techniques',
 'Built two AI-powered chatbot applications using Python|Used prompt engineering and structured interaction techniques|Evaluated AI responses for correctness, relevance, and usability|Iteratively refined prompts based on model limitations and mentor feedback',
 'Interview Conductor Bot|Doubt Resolution Bot',
 2);

-- ---------------------------------------------------------------- SKILLS
INSERT INTO skill_category (slug, name, skills, position) VALUES
('languages', 'Programming Languages', 'Java|Python|C++', 1),
('backend', 'Backend Development', 'Spring Boot|Spring MVC|Spring Data JPA|Hibernate|REST APIs|Maven', 2),
('databases', 'Databases', 'MySQL|Firebase', 3),
('frontend', 'Frontend Development', 'React.js|Next.js|HTML|CSS|JavaScript', 4),
('devops-cloud', 'DevOps & Cloud', 'Git|GitHub|Postman|Docker|Kubernetes|CI/CD|AWS EC2|AWS S3|AWS CloudWatch', 5),
('ai-ml', 'AI & Machine Learning', 'NLP|TensorFlow|Keras|Scikit-learn|LangGraph|ChromaDB|Ollama|Machine Learning|Deep Learning', 6),
('core-cs', 'Core Computer Science', 'Data Structures and Algorithms|Object-Oriented Programming|Database Management Systems|Operating Systems|Computer Networks', 7);

-- ---------------------------------------------------------------- EDUCATION
INSERT INTO education (degree, branch, institution, expected_graduation, position) VALUES
('Bachelor of Technology', 'Computer Engineering', 'MPSTME, SVKM’s NMIMS, Mumbai', '2027', 1);

-- ---------------------------------------------------------------- CERTIFICATIONS & ACHIEVEMENTS
INSERT INTO certification (title, kind, position) VALUES
('Coding Shuttle – Spring Boot 0 to 100 Cohort 4.0 (AI + DevOps)', 'PROGRAM', 1),
('Sigma 5.0 – DSA & Full Stack Development', 'PROGRAM', 2),
('Internship Completion Certificate – Mindstix Foundation', 'CERTIFICATE', 3),
('Smart India Hackathon 2024–25', 'HACKATHON', 4),
('Cyber Cypher MPSTME Hackathon', 'HACKATHON', 5);
