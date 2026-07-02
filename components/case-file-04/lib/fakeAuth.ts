export async function login() {
  try {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    return {
      success: false,
      error: data.error || "Invalid username or password.",
    };
  } catch (err) {
    return {
      success: false,
      error: "Connection failed.",
    };
  }
}
