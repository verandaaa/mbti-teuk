
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

CREATE OR REPLACE FUNCTION "public"."generate_unique_random_nickname"() RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    new_nickname TEXT;
BEGIN
    LOOP
        new_nickname := (SELECT
            (SELECT adjective FROM adjectives ORDER BY RANDOM() LIMIT 1) || ' ' ||
            (SELECT noun FROM nouns ORDER BY RANDOM() LIMIT 1) || ' ' ||
            LPAD((RANDOM()*10000)::INT::TEXT, 4, '0')
        );

        EXIT WHEN NOT EXISTS (SELECT 1 FROM users WHERE users.nickname = new_nickname);
    END LOOP;

    RETURN new_nickname;
END;
$$;

ALTER FUNCTION "public"."generate_unique_random_nickname"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_user_mbti"() RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN (SELECT mbti FROM public.users WHERE id = auth.uid());
END;
$$;

ALTER FUNCTION "public"."get_user_mbti"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_user_nickname"() RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN (SELECT nickname FROM public.users WHERE id = auth.uid());
END;
$$;

ALTER FUNCTION "public"."get_user_nickname"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.users (id, mbti, nickname)
  values (new.id, new.raw_user_meta_data ->> 'mbti', new.raw_user_meta_data ->> 'nickname');
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

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

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."adjectives" (
    "adjective" "text" NOT NULL
);

ALTER TABLE "public"."adjectives" OWNER TO "postgres";

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

CREATE TABLE IF NOT EXISTS "public"."comments" (
    "id" bigint NOT NULL,
    "createdAt" timestamp with time zone DEFAULT "now"() NOT NULL,
    "text" "text" NOT NULL,
    "userNickname" "text" DEFAULT "public"."get_user_nickname"() NOT NULL,
    "userMbti" "text" DEFAULT "public"."get_user_mbti"() NOT NULL,
    "postId" "uuid" NOT NULL,
    "userId" "uuid" DEFAULT "auth"."uid"() NOT NULL
);

ALTER TABLE "public"."comments" OWNER TO "postgres";

ALTER TABLE "public"."comments" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."comments_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."mbtiTypes" (
    "mbti" character varying(4)
);

ALTER TABLE "public"."mbtiTypes" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."options" (
    "id" bigint NOT NULL,
    "value" "text" NOT NULL,
    "postId" "uuid" NOT NULL,
    "imageId" "uuid",
    "userId" "uuid" DEFAULT "auth"."uid"() NOT NULL
);

ALTER TABLE "public"."options" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."mbtiTypesOptionsCrossView" AS
 SELECT "mbtiTypes"."mbti",
    "options"."id" AS "optionId",
    "options"."postId"
   FROM ("public"."mbtiTypes"
     CROSS JOIN "public"."options");

ALTER TABLE "public"."mbtiTypesOptionsCrossView" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."nouns" (
    "noun" "text" NOT NULL
);

ALTER TABLE "public"."nouns" OWNER TO "postgres";

ALTER TABLE "public"."options" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."options_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."participates" (
    "id" bigint NOT NULL,
    "createdAt" timestamp with time zone DEFAULT "now"() NOT NULL,
    "userMbti" "text" DEFAULT "public"."get_user_mbti"() NOT NULL,
    "optionId" bigint NOT NULL,
    "userId" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "postId" "uuid" NOT NULL
);

ALTER TABLE "public"."participates" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."participateView" AS
 SELECT "mbtiTypesOptionsCrossView"."optionId",
    "mbtiTypesOptionsCrossView"."mbti",
    "mbtiTypesOptionsCrossView"."postId",
    "count"("participates"."id") AS "count"
   FROM ("public"."mbtiTypesOptionsCrossView"
     LEFT JOIN "public"."participates" ON ((("mbtiTypesOptionsCrossView"."optionId" = "participates"."optionId") AND (("mbtiTypesOptionsCrossView"."mbti")::"text" = "participates"."userMbti"))))
  GROUP BY "mbtiTypesOptionsCrossView"."optionId", "mbtiTypesOptionsCrossView"."mbti", "mbtiTypesOptionsCrossView"."postId";

ALTER TABLE "public"."participateView" OWNER TO "postgres";

ALTER TABLE "public"."participates" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."participates_id_seq"
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
    "createdAt" timestamp with time zone DEFAULT "now"() NOT NULL,
    "viewCount" integer DEFAULT 1 NOT NULL,
    "userNickname" "text" DEFAULT "public"."get_user_nickname"() NOT NULL,
    "userMbti" "text" DEFAULT "public"."get_user_mbti"() NOT NULL,
    "categoryId" integer NOT NULL,
    "userId" "uuid" DEFAULT "auth"."uid"() NOT NULL
);

ALTER TABLE "public"."posts" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."postView" AS
 SELECT "posts"."id",
    "posts"."title",
    "posts"."description",
    "posts"."createdAt",
    "posts"."viewCount",
    "posts"."userNickname",
    "posts"."userMbti",
    "posts"."categoryId",
    "posts"."userId",
    ( SELECT "categories"."name"
           FROM "public"."categories"
          WHERE ("categories"."id" = "posts"."categoryId")) AS "categoryName",
    ( SELECT "participates"."optionId"
           FROM "public"."participates"
          WHERE (("participates"."userId" = "auth"."uid"()) AND ("participates"."postId" = "posts"."id"))) AS "selectedOptionId",
    ( SELECT "count"(*) AS "count"
           FROM "public"."participates"
          WHERE ("participates"."postId" = "posts"."id")) AS "participateCount"
   FROM "public"."posts";

ALTER TABLE "public"."postView" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."uniqueRandomNicknameView" AS
 SELECT "public"."generate_unique_random_nickname"() AS "nickname";

ALTER TABLE "public"."uniqueRandomNicknameView" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" NOT NULL,
    "mbti" "text" NOT NULL,
    "nickname" "text" NOT NULL
);

ALTER TABLE "public"."users" OWNER TO "postgres";

ALTER TABLE ONLY "public"."adjectives"
    ADD CONSTRAINT "adjectives_pkey" PRIMARY KEY ("adjective");

ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_name_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."mbtiTypes"
    ADD CONSTRAINT "mbtitypes_mbti_key" UNIQUE ("mbti");

ALTER TABLE ONLY "public"."nouns"
    ADD CONSTRAINT "nouns_pkey" PRIMARY KEY ("noun");

ALTER TABLE ONLY "public"."options"
    ADD CONSTRAINT "options_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."participates"
    ADD CONSTRAINT "participates_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "posts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "public_comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON UPDATE RESTRICT ON DELETE CASCADE;

ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "public_comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."options"
    ADD CONSTRAINT "public_options_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON UPDATE RESTRICT ON DELETE CASCADE;

ALTER TABLE ONLY "public"."options"
    ADD CONSTRAINT "public_options_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."participates"
    ADD CONSTRAINT "public_participates_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "public"."options"("id") ON UPDATE RESTRICT ON DELETE CASCADE;

ALTER TABLE ONLY "public"."participates"
    ADD CONSTRAINT "public_participates_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON UPDATE RESTRICT ON DELETE CASCADE;

ALTER TABLE ONLY "public"."participates"
    ADD CONSTRAINT "public_participates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "public_posts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "public_posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE RESTRICT ON DELETE RESTRICT;

CREATE POLICY "Enable delete for users based on userId" ON "public"."comments" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "userId"));

CREATE POLICY "Enable delete for users based on userId" ON "public"."options" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "userId"));

CREATE POLICY "Enable delete for users based on userId" ON "public"."posts" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "userId"));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."comments" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."options" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."participates" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."posts" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."adjectives" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."categories" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."comments" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."nouns" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."options" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."participates" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."posts" FOR SELECT USING (true);

CREATE POLICY "Enable select for users based on id" ON "public"."users" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "id"));

CREATE POLICY "Enable update for users based on userId" ON "public"."comments" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "userId")) WITH CHECK (("auth"."uid"() = "userId"));

CREATE POLICY "Enable update for users based on userId" ON "public"."options" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "userId")) WITH CHECK (("auth"."uid"() = "userId"));

CREATE POLICY "Enable update for users based on userId" ON "public"."posts" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "userId")) WITH CHECK (("auth"."uid"() = "userId"));

ALTER TABLE "public"."adjectives" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."categories" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."comments" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."mbtiTypes" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."nouns" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."options" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."participates" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."posts" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."generate_unique_random_nickname"() TO "anon";
GRANT ALL ON FUNCTION "public"."generate_unique_random_nickname"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."generate_unique_random_nickname"() TO "service_role";

GRANT ALL ON FUNCTION "public"."get_user_mbti"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_mbti"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_mbti"() TO "service_role";

GRANT ALL ON FUNCTION "public"."get_user_nickname"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_nickname"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_nickname"() TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."is_valid_mbti"("object_value" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."is_valid_mbti"("object_value" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_valid_mbti"("object_value" "text") TO "service_role";

GRANT ALL ON TABLE "public"."adjectives" TO "anon";
GRANT ALL ON TABLE "public"."adjectives" TO "authenticated";
GRANT ALL ON TABLE "public"."adjectives" TO "service_role";

GRANT ALL ON TABLE "public"."categories" TO "anon";
GRANT ALL ON TABLE "public"."categories" TO "authenticated";
GRANT ALL ON TABLE "public"."categories" TO "service_role";

GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."comments" TO "anon";
GRANT ALL ON TABLE "public"."comments" TO "authenticated";
GRANT ALL ON TABLE "public"."comments" TO "service_role";

GRANT ALL ON SEQUENCE "public"."comments_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."comments_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."comments_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."mbtiTypes" TO "anon";
GRANT ALL ON TABLE "public"."mbtiTypes" TO "authenticated";
GRANT ALL ON TABLE "public"."mbtiTypes" TO "service_role";

GRANT ALL ON TABLE "public"."options" TO "anon";
GRANT ALL ON TABLE "public"."options" TO "authenticated";
GRANT ALL ON TABLE "public"."options" TO "service_role";

GRANT ALL ON TABLE "public"."mbtiTypesOptionsCrossView" TO "anon";
GRANT ALL ON TABLE "public"."mbtiTypesOptionsCrossView" TO "authenticated";
GRANT ALL ON TABLE "public"."mbtiTypesOptionsCrossView" TO "service_role";

GRANT ALL ON TABLE "public"."nouns" TO "anon";
GRANT ALL ON TABLE "public"."nouns" TO "authenticated";
GRANT ALL ON TABLE "public"."nouns" TO "service_role";

GRANT ALL ON SEQUENCE "public"."options_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."options_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."options_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."participates" TO "anon";
GRANT ALL ON TABLE "public"."participates" TO "authenticated";
GRANT ALL ON TABLE "public"."participates" TO "service_role";

GRANT ALL ON TABLE "public"."participateView" TO "anon";
GRANT ALL ON TABLE "public"."participateView" TO "authenticated";
GRANT ALL ON TABLE "public"."participateView" TO "service_role";

GRANT ALL ON SEQUENCE "public"."participates_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."participates_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."participates_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."posts" TO "anon";
GRANT ALL ON TABLE "public"."posts" TO "authenticated";
GRANT ALL ON TABLE "public"."posts" TO "service_role";

GRANT ALL ON TABLE "public"."postView" TO "anon";
GRANT ALL ON TABLE "public"."postView" TO "authenticated";
GRANT ALL ON TABLE "public"."postView" TO "service_role";

GRANT ALL ON TABLE "public"."uniqueRandomNicknameView" TO "anon";
GRANT ALL ON TABLE "public"."uniqueRandomNicknameView" TO "authenticated";
GRANT ALL ON TABLE "public"."uniqueRandomNicknameView" TO "service_role";

GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";

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
