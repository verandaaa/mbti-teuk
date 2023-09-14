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

-- delete policy 앞으로 설정 할 것...
-- findUser(post_id) == auth.uid()
