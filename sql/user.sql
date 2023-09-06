-- mbti 유효성 검사
CREATE OR REPLACE FUNCTION public.is_valid_mbti(object_value text)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN object_value IN ('ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP',
                          'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP',
                          'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ');
END;
$$;

-- 회원가입 전 메타데이터 유효성 검사
create or replace function auth.validate_raw_user_meta_data()
returns trigger
language plpgsql
as $$
begin

    if not new.raw_user_meta_data ? 'mbti' then
        raise exception 'Missing mbti in raw_user_meta_data';
    end if;

    if not public.is_valid_mbti(new.raw_user_meta_data ->> 'mbti') then
        raise exception 'Invalid mbti value in raw_user_meta_data';
    end if;

    IF (SELECT COUNT(*) FROM jsonb_object_keys(new.raw_user_meta_data)) > 1 THEN
        raise exception 'Invalid keys in raw_user_meta_data';
    end if;

    return new;
end;
$$;

create trigger before_auth_user_created
before insert on auth.users
for each row
execute function auth.validate_raw_user_meta_data();





-- function 존재 찾기
SELECT routine_name
FROM information_schema.routines
WHERE routine_schema = 'auth'; 
