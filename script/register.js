//  register

// ── Elemen DOM ──
const togglePass = document.getElementById('togglePass');
const passInput  = document.getElementById('passInput');
const loginBtn   = document.getElementById('loginBtn');
const emailInput = document.getElementById('emailInput');
const emailErr   = document.getElementById('emailErr');
const passErr    = document.getElementById('passErr');
const togglePass = document.getElementById("togglePass");

let visible = false;

togglePass.addEventListener("click", () => {
  visible = !visible;

  passInput.type = visible ? "text" : "password";

  eyeIcon.setAttribute(
    "data-feather",
    visible ? "eye-off" : "eye"
  );
});
// Toggle Visibilitas Password 
togglePass.addEventListener('click', () => {
  const isPassword = passInput.type === 'password';
  passInput.type = isPassword ? 'text' : 'password';
});

// Toast Notification
function showToast(msg, color = 'bg-pink-500') {
  const toast    = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  toastMsg.textContent = msg;
  toast.className = `fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl
                     text-white text-sm font-semibold shadow-lg ${color}`;
  toast.style.opacity   = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateX(-50%) translateY(-8px)';
  }, 2800);
}


    setTimeout(() => {
      loginBtn.textContent = 'Log in';
      loginBtn.disabled    = false;
      showToast('Login berhasil! Selamat datang 🎉', 'bg-green-500');
    }, 1600);



// Event Listeners 
loginBtn.addEventListener('click', handleLogin);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleLogin();
});

document.getElementById('forgotBtn').addEventListener('click', () => {
  showToast('Link reset password telah dikirim ke email kamu.', 'bg-pink-500');
});

document.getElementById('signupBtn').addEventListener('click', () => {
  showToast('Halaman daftar akun segera hadir!', 'bg-pink-400');
});

document.querySelectorAll('.btn-social').forEach((btn) => {
  btn.addEventListener('click', () => {
    showToast(`Melanjutkan dengan ${btn.textContent.trim()}...`, 'bg-gray-700');
  });
}); 
