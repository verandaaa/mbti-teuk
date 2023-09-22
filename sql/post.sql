-- create post-user table 
create table public.between_post_and_user(
    post_id uuid not null references public.posts on delete cascade,
    user_id uuid not null references auth.users on delete cascade,

    primary key(post_id)
);
alter table public.between_post_and_user enable row level security;

-- post-user 테이블에 insert
create or replace function public.create_post_user_relationship()
returns trigger
language plpgsql
security definer
as $$
begin
    insert into public.between_post_and_user(post_id, user_id)
    values (new.id, auth.uid());
    return new;
end;
$$;

create trigger after_post_created
after insert on public.posts
for each row
execute function public.create_post_user_relationship();

-- post-user 테이블에서 자신이 쓴 글만 조회 하는 정책
create policy "User can read info of their own post"
on between_post_and_user for select
to authenticated 
using (auth.uid() = user_id);

-- 자신이 쓴 글만 삭제하는 정책
create policy "User can delete info of their own post"
on posts for delete
to authenticated 
using (auth.uid() = get_user_id_by_post_id(id));

-- post_id로부터 user_id를 찾는 함수
create or replace function public.get_user_id_by_post_id(post_id_to_find uuid)
returns uuid
language plpgsql
as $$
declare
    user_id_found uuid;
begin
    select user_id into user_id_found
    from public.between_post_and_user
    where post_id = post_id_to_find;

    return user_id_found;
end;
$$;