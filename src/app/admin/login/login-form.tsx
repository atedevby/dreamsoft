"use client";

import { useActionState } from "react";
import { loginAction, type LoginFormState } from "@/app/admin/login/actions";

const initialState: LoginFormState = { error: null };

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="loginCard">
      <div className="stack">
        <p className="eyebrow">DreamSoft Admin</p>
        <h1>Вход в панель управления</h1>
        <p className="muted">
          Для входа используйте логин и пароль из <code>.env</code>.
        </p>
      </div>

      <div className="stack">
        <label className="field">
          <span>Логин</span>
          <input name="login" required autoComplete="username" />
        </label>

        <label className="field">
          <span>Пароль</span>
          <input name="password" type="password" required autoComplete="current-password" />
        </label>
      </div>

      {state.error ? <p className="errorText">{state.error}</p> : null}

      <button className="buttonPrimary buttonWide" type="submit" disabled={isPending}>
        {isPending ? "Проверяем..." : "Войти в админку"}
      </button>
    </form>
  );
}
