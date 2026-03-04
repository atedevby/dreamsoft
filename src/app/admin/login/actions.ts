"use server";

import { redirect } from "next/navigation";
import { loginWithEnvCredentials } from "@/lib/admin-auth";

export type LoginFormState = {
  error: string | null;
};

export async function loginAction(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const login = String(formData.get("login") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  const isValid = await loginWithEnvCredentials(login, password);

  if (!isValid) {
    return { error: "Неверный логин или пароль" };
  }

  redirect("/admin");
}
