feather.replace();

// SAVE PROFILE

const saveBtn = document.getElementById("saveBtn");

const username = document.querySelectorAll("input")[0];
const email = document.querySelectorAll("input")[1];
const phone = document.querySelectorAll("input")[2];
const address = document.querySelectorAll("input")[3];

saveBtn.addEventListener("click", () => {

  if (
    username.value === "" ||
    email.value === "" ||
    phone.value === "" ||
    address.value === ""
  ) {
    alert("Semua data wajib diisi!");
    return;
  }

  alert("Profile berhasil diupdate!");

});


// FOTO PROFILE

const uploadPhoto = document.getElementById("uploadPhoto");
const profileImage = document.getElementById("profileImage");

const savePhotoBtn = document.getElementById("savePhotoBtn");
const cancelPhotoBtn = document.getElementById("cancelPhotoBtn");

let oldImage = profileImage.src;
let newImage = "";

// preview foto
uploadPhoto.addEventListener("change", function () {

  const file = this.files[0];

  if (file) {

    const reader = new FileReader();

    reader.onload = function (e) {

      newImage = e.target.result;

      profileImage.src = newImage;

      savePhotoBtn.classList.remove("hidden");
      cancelPhotoBtn.classList.remove("hidden");

    };

    reader.readAsDataURL(file);

  }

});

// save photo
savePhotoBtn.addEventListener("click", () => {

  oldImage = newImage;

  savePhotoBtn.classList.add("hidden");
  cancelPhotoBtn.classList.add("hidden");

  alert("Foto profile berhasil diganti!");

});

// cancel photo
cancelPhotoBtn.addEventListener("click", () => {

  profileImage.src = oldImage;

  uploadPhoto.value = "";

  savePhotoBtn.classList.add("hidden");
  cancelPhotoBtn.classList.add("hidden");

});

