export function initAuthHint() {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_hint", "password_is_reverse");
  }
}
