-- post 테이블 생성
create table public.posts (
    id uuid not null,
    title character varying null,
    description text null,
    constraint posts_pkey primary key (id)
  ) tablespace pg_default;
alter table public.between_post_and_user enable row level security;

-- post 테이블 정책 1
create policy "Give insert access to authenticated users"
on public.posts 
for insert
to authenticated 
with check (true);
-- post 테이블 정책 2
create policy "Give select access to all users"
on public.posts 
for select
to public 
using (true);
-- post 테이블 정책 3
create policy "User can delete info of their own post"
on public.posts 
for delete
to authenticated 
using (auth.uid() = get_user_id_by_post_id(id));


-- post-user 테이블 생성
create table public.between_post_and_user (
    post_id uuid not null,
    user_id uuid not null,
    constraint between_post_and_user_pkey primary key (post_id),
    constraint between_post_and_user_post_id_fkey foreign key (post_id) references posts (id) on delete cascade,
    constraint between_post_and_user_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
  ) tablespace pg_default;
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