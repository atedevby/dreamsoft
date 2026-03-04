import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { LoginForm } from "@/app/admin/login/login-form";

export default async function AdminLoginPage() {
  const isAuthenticated = await isAdminAuthenticated();
  if (isAuthenticated) {
    redirect("/admin");
  }

  return (
    <div className="adminLoginWrap">
      <section className="loginShowcase">
        <p className="eyebrow">Belarus Furniture CRM</p>
        <h2>Управляйте каталогом, ценами и контентом в одном месте</h2>
        <p className="muted">
          После входа вы сможете редактировать товары, меню хедера, ссылки футера и
          контакты сайта.
        </p>
        <div className="loginBenefits">
          <article>Товары и цены</article>
          <article>Контент хедера/футера</article>
          <article>Контакты и настройки сайта</article>
        </div>
      </section>
      <LoginForm />
    </div>
  );
}
