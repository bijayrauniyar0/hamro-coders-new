--
-- PostgreSQL database dump
--

-- Dumped from database version 15.12 (Debian 15.12-1.pgdg120+1)
-- Dumped by pg_dump version 15.12 (Debian 15.12-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: streams; Type: TABLE; Schema: public; Owner: bijay
--

CREATE TABLE public.streams (
    id integer NOT NULL,
    stream_name character varying(255) NOT NULL
);


ALTER TABLE public.streams OWNER TO bijay;

--
-- Name: streams_id_seq; Type: SEQUENCE; Schema: public; Owner: bijay
--

CREATE SEQUENCE public.streams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.streams_id_seq OWNER TO bijay;

--
-- Name: streams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bijay
--

ALTER SEQUENCE public.streams_id_seq OWNED BY public.streams.id;


--
-- Name: mcq_questions; Type: TABLE; Schema: public; Owner: bijay
--

CREATE TABLE public.mcq_questions (
    id integer NOT NULL,
    test_id integer NOT NULL,
    question character varying(255) NOT NULL,
    options json NOT NULL,
    answer character varying(255) NOT NULL
);


ALTER TABLE public.mcq_questions OWNER TO bijay;

--
-- Name: mcq_questions_id_seq; Type: SEQUENCE; Schema: public; Owner: bijay
--

CREATE SEQUENCE public.mcq_questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mcq_questions_id_seq OWNER TO bijay;

--
-- Name: mcq_questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bijay
--

ALTER SEQUENCE public.mcq_questions_id_seq OWNED BY public.mcq_questions.id;


--
-- Name: tests; Type: TABLE; Schema: public; Owner: bijay
--

CREATE TABLE public.tests (
    id integer NOT NULL,
    stream_id integer NOT NULL,
    title character varying(255) NOT NULL,
    marks integer NOT NULL,
    duration_in_minutes integer NOT NULL
);


ALTER TABLE public.tests OWNER TO bijay;

--
-- Name: tests_id_seq; Type: SEQUENCE; Schema: public; Owner: bijay
--

CREATE SEQUENCE public.tests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tests_id_seq OWNER TO bijay;

--
-- Name: tests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bijay
--

ALTER SEQUENCE public.tests_id_seq OWNED BY public.tests.id;


--
-- Name: user_scores; Type: TABLE; Schema: public; Owner: bijay
--

CREATE TABLE public.user_scores (
    id integer NOT NULL,
    user_id integer NOT NULL,
    score integer NOT NULL,
    test_id integer NOT NULL,
    previous_rank json,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.user_scores OWNER TO bijay;

--
-- Name: user_scores_id_seq; Type: SEQUENCE; Schema: public; Owner: bijay
--

CREATE SEQUENCE public.user_scores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_scores_id_seq OWNER TO bijay;

--
-- Name: user_scores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bijay
--

ALTER SEQUENCE public.user_scores_id_seq OWNED BY public.user_scores.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: bijay
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    number character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO bijay;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: bijay
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO bijay;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bijay
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: streams id; Type: DEFAULT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.streams ALTER COLUMN id SET DEFAULT nextval('public.streams_id_seq'::regclass);


--
-- Name: mcq_questions id; Type: DEFAULT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.mcq_questions ALTER COLUMN id SET DEFAULT nextval('public.mcq_questions_id_seq'::regclass);


--
-- Name: tests id; Type: DEFAULT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.tests ALTER COLUMN id SET DEFAULT nextval('public.tests_id_seq'::regclass);


--
-- Name: user_scores id; Type: DEFAULT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.user_scores ALTER COLUMN id SET DEFAULT nextval('public.user_scores_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: streams; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.streams (id, stream_name) FROM stdin;
1	BCA
2	Others
\.


--
-- Data for Name: mcq_questions; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.mcq_questions (id, test_id, question, options, answer) FROM stdin;
11	1	What is the brain of a computer?	{"1": "RAM", "2": "CPU", "3": "Hard Disk", "4": "Monitor"}	2
12	1	Which of the following is an output device?	{"1": "Keyboard", "2": "Mouse", "3": "Monitor", "4": "Scanner"}	3
13	1	Which of the following is a type of software?	{"1": "System Software", "2": "Application Software", "3": "Utility Software", "4": "All of the above"}	4
14	1	Which number system is used by computers?	{"1": "Decimal", "2": "Binary", "3": "Octal", "4": "Hexadecimal"}	2
15	1	What does RAM stand for?	{"1": "Read Access Memory", "2": "Random Access Memory", "3": "Run Access Memory", "4": "Remote Access Memory"}	2
16	1	Which of the following is an example of system software?	{"1": "MS Word", "2": "Windows OS", "3": "Photoshop", "4": "Chrome Browser"}	2
17	1	Which storage device has the fastest data access speed?	{"1": "SSD", "2": "HDD", "3": "CD-ROM", "4": "Floppy Disk"}	1
18	1	What does GUI stand for?	{"1": "Graphical User Interface", "2": "General User Interface", "3": "Graphical Unified Interface", "4": "General Utility Interface"}	1
19	1	Which of the following is NOT a programming language?	{"1": "Python", "2": "Java", "3": "HTML", "4": "C++"}	3
20	1	Which company developed the Windows operating system?	{"1": "Apple", "2": "Google", "3": "Microsoft", "4": "IBM"}	3
\.


--
-- Data for Name: tests; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.tests (id, stream_id, title, marks, duration_in_minutes) FROM stdin;
1	1	Computer Fundamentals and Applications	10	10
2	1	Digital Logic	10	10
3	1	Mathematics I (Calculus and Algebra)	10	10
4	1	Microprocessor and Computer Architecture	10	10
5	1	Data Structures and Algorithms	10	10
\.


--
-- Data for Name: user_scores; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.user_scores (id, user_id, score, test_id, previous_rank, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.users (id, name, email, password, number, "createdAt", "updatedAt") FROM stdin;
1	Bijay Rauniyar	andreysandrey.10@gmail.com	$2a$10$eswNjE81NBHkvXAwYupmb.I4SS/PEajwcbGlw/YMt4lJDsWq1FPhG	9861842341	2025-03-29 09:06:02.329+00	2025-03-29 09:06:02.329+00
\.


--
-- Name: streams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bijay
--

SELECT pg_catalog.setval('public.streams_id_seq', 2, true);


--
-- Name: mcq_questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bijay
--

SELECT pg_catalog.setval('public.mcq_questions_id_seq', 20, true);


--
-- Name: tests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bijay
--

SELECT pg_catalog.setval('public.tests_id_seq', 5, true);


--
-- Name: user_scores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bijay
--

SELECT pg_catalog.setval('public.user_scores_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bijay
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: streams streams_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.streams
    ADD CONSTRAINT streams_pkey PRIMARY KEY (id);


--
-- Name: mcq_questions mcq_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.mcq_questions
    ADD CONSTRAINT mcq_questions_pkey PRIMARY KEY (id);


--
-- Name: tests tests_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.tests
    ADD CONSTRAINT tests_pkey PRIMARY KEY (id);


--
-- Name: user_scores user_scores_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.user_scores
    ADD CONSTRAINT user_scores_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_number_key; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_number_key UNIQUE (number);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: mcq_questions mcq_questions_test_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.mcq_questions
    ADD CONSTRAINT mcq_questions_test_id_fkey FOREIGN KEY (test_id) REFERENCES public.tests(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tests tests_stream_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.tests
    ADD CONSTRAINT tests_stream_id_fkey FOREIGN KEY (stream_id) REFERENCES public.streams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_scores user_scores_test_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.user_scores
    ADD CONSTRAINT user_scores_test_id_fkey FOREIGN KEY (test_id) REFERENCES public.tests(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_scores user_scores_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.user_scores
    ADD CONSTRAINT user_scores_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

