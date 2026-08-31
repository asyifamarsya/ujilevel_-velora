// =========================
// ELEMENT
// =========================
const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");

// =========================
// TOGGLE PASSWORD
// =========================
let visible = false;

togglePassword.addEventListener("click", () => {
  visible = !visible;

  passwordInput.type = visible ? "text" : "password";

  eyeIcon.setAttribute(
    "data-feather",
    visible ? "eye-off" : "eye"
  );

  feather.replace();
});

// =========================
// LOGIN
// =========================
function handleLogin() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (password.length < 6) {
    alert("Password minimal 6 karakter!");
    return;
  }


  setTimeout(() => {
    loginBtn.textContent = "Log in";
    loginBtn.disabled = false;

    alert("Login berhasil");
  }, 1500);
}

// =========================
// EVENT
// =========================
loginBtn.addEventListener("click", handleLogin);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleLogin();
  }
});