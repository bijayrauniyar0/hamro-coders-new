--
-- PostgreSQL database dump
--

-- Dumped from database version 15.10 (Debian 15.10-1.pgdg120+1)
-- Dumped by pg_dump version 15.10 (Debian 15.10-1.pgdg120+1)

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
-- Name: mcq_questions; Type: TABLE; Schema: public; Owner: bijay
--

CREATE TABLE public.mcq_questions (
    id integer NOT NULL,
    subject_code character varying(10) NOT NULL,
    question text NOT NULL,
    options jsonb NOT NULL,
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
-- Name: subjects; Type: TABLE; Schema: public; Owner: bijay
--

CREATE TABLE public.subjects (
    subject_code character varying(10) NOT NULL,
    title character varying(255) NOT NULL,
    semester integer NOT NULL,
    course_name character varying(255) NOT NULL
);


ALTER TABLE public.subjects OWNER TO bijay;

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
-- Name: mcq_questions id; Type: DEFAULT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.mcq_questions ALTER COLUMN id SET DEFAULT nextval('public.mcq_questions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: mcq_questions; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.mcq_questions (id, subject_code, question, options, answer) FROM stdin;
1	BCA101	What is the output of printf("%d", (5+3*2));	{"A": "11", "B": "16", "C": "13", "D": "10"}	C
2	BCA102	What is the base of the binary number system?	{"A": "10", "B": "2", "C": "8", "D": "16"}	B
3	BCA103	Which device is used to process data?	{"A": "Printer", "B": "Monitor", "C": "CPU", "D": "Mouse"}	C
\.


--
-- Data for Name: subjects; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.subjects (subject_code, title, semester, course_name) FROM stdin;
BCA101	Introduction to C Programming	2	BCA
BCA102	Discrete Mathematics	2	BCA
BCA103	Computer Organization	2	BCA
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: bijay
--

COPY public.users (id, name, email, password, number, "createdAt", "updatedAt") FROM stdin;
1	Bijay Rauniyar	andreysandrey.10@gmail.com	$2a$10$QCnqrUxWsrHAh9QbIl0Fruxt/R0QVIxOK0OMhOvI9Y7/.TcwUtEfG	9861842341	2025-01-27 16:10:12.436+00	2025-01-27 16:10:12.436+00
\.


--
-- Name: mcq_questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bijay
--

SELECT pg_catalog.setval('public.mcq_questions_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bijay
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: mcq_questions mcq_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.mcq_questions
    ADD CONSTRAINT mcq_questions_pkey PRIMARY KEY (id);


--
-- Name: subjects subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (subject_code);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: mcq_questions fk_subject_code; Type: FK CONSTRAINT; Schema: public; Owner: bijay
--

ALTER TABLE ONLY public.mcq_questions
    ADD CONSTRAINT fk_subject_code FOREIGN KEY (subject_code) REFERENCES public.subjects(subject_code) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

