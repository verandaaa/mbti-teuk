
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

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE SCHEMA IF NOT EXISTS "private";

ALTER SCHEMA "private" OWNER TO "postgres";

CREATE SCHEMA IF NOT EXISTS "public";

ALTER SCHEMA "public" OWNER TO "pg_database_owner";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."continents" AS ENUM (
    'Africa',
    'Antarctica',
    'Asia',
    'Europe',
    'Oceania',
    'North America',
    'South America'
);

ALTER TYPE "public"."continents" OWNER TO "postgres";

CREATE TYPE "public"."mood" AS ENUM (
    'happy',
    'sad',
    'excited',
    'calm'
);

ALTER TYPE "public"."mood" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."is_valid_mbti"("object_value" "text") RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN object_value IN ('ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP',
                          'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP',
                          'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ');
END;
$$;

ALTER FUNCTION "public"."is_valid_mbti"("object_value" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."validate_options"("options" "jsonb"[]) RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$
begin

    if array_length(options, 1) < 2 or array_length(options, 1) > 15 then
      raise exception 'Options array length must be between 2 and 15';
    end if;

    if exists (
      select 1
      from unnest(options) as element
      where element is null
      or not element ? 'text' 
      or (element ->> 'text') is null
      or length(element ->> 'text') < 1 or length(element ->> 'text') > 20
      or (select count(*) from jsonb_object_keys(element)) > 1
    ) then
      raise exception 'Options element has something wrong';
    end if;

    return true;

end;
$$;

ALTER FUNCTION "public"."validate_options"("options" "jsonb"[]) OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."categories" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL
);

ALTER TABLE "public"."categories" OWNER TO "postgres";

ALTER TABLE "public"."categories" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."categories_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."posts" (
    "id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "category" "text" NOT NULL,
    "options" "jsonb"[] NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    CONSTRAINT "posts_options_check" CHECK ("public"."validate_options"("options")),
    CONSTRAINT "posts_title_check" CHECK ((("length"("title") >= 1) AND ("length"("title") <= 50)))
);

ALTER TABLE "public"."posts" OWNER TO "postgres";

ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_name_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "posts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "posts_category_fkey" FOREIGN KEY ("category") REFERENCES "public"."categories"("name") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

CREATE POLICY "Give insert access to authenticated users" ON "public"."posts" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Give select access to all users" ON "public"."categories" FOR SELECT USING (true);

CREATE POLICY "Give select access to all users" ON "public"."posts" FOR SELECT USING (true);

CREATE POLICY "User can delete info of their own post" ON "public"."posts" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "user_id"));

ALTER TABLE "public"."categories" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."posts" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."is_valid_mbti"("object_value" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."is_valid_mbti"("object_value" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_valid_mbti"("object_value" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."validate_options"("options" "jsonb"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."validate_options"("options" "jsonb"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."validate_options"("options" "jsonb"[]) TO "service_role";

GRANT ALL ON TABLE "public"."categories" TO "anon";
GRANT ALL ON TABLE "public"."categories" TO "authenticated";
GRANT ALL ON TABLE "public"."categories" TO "service_role";

GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."posts" TO "anon";
GRANT ALL ON TABLE "public"."posts" TO "authenticated";
GRANT ALL ON TABLE "public"."posts" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;

--
-- Dumped schema changes for auth and storage
--

CREATE OR REPLACE FUNCTION "auth"."validate_raw_user_meta_data"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin

    if not new.raw_user_meta_data ? 'mbti' then
        raise exception 'Missing mbti in raw_user_meta_data';
    end if;

    if not public.is_valid_mbti(new.raw_user_meta_data ->> 'mbti') then
        raise exception 'Invalid mbti value in raw_user_meta_data';
    end if;

    IF (SELECT COUNT(*) FROM jsonb_object_keys(new.raw_user_meta_data)) > 1 THEN
        raise exception 'Invalid key in raw_user_meta_data';
    end if;

    return new;
end;
$$;

ALTER FUNCTION "auth"."validate_raw_user_meta_data"() OWNER TO "postgres";

CREATE OR REPLACE TRIGGER "before_auth_user_created" BEFORE INSERT ON "auth"."users" FOR EACH ROW EXECUTE FUNCTION "auth"."validate_raw_user_meta_data"();

