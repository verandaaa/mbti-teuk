import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function userUserClient() {
  const supabase = createClientComponentClient();

  const updateUser = async () => {
    const { data, error } = await supabase.auth.updateUser({
      email: "new@email.com",
    });
    return data;
  };

  return { updateUser };
}
