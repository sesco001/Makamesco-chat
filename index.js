// index.js
let isLogin = true;

const authBtn = document.getElementById("authBtn");
const toggle = document.getElementById("toggle");

authBtn.onclick = async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) return alert("Fill in all fields!");

  const endpoint = isLogin ? "/login" : "/register";

  const response = await fetch("http://localhost:3000" + endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const result = await response.json();

  if (result.success) {
    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));
    window.location.href = "chat.html";
  } else {
    alert(result.message || "Error occurred");
  }
};

toggle.onclick = () => {
  isLogin = !isLogin;
  authBtn.textContent = isLogin ? "Login" : "Sign Up";
  toggle.textContent = isLogin ? "Don't have an account? Sign up" : "Already have an account? Login";
};
