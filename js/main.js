let bgImgs = [...document.querySelectorAll(".img-box img")];
let mainBg = document.querySelector(".landing-area");
let myColors = [...document.querySelectorAll("aside .colors ul li")];
let asideToggler = document.getElementById("open");
let aside = document.getElementById("aside");
let randomBgBtn = [...document.querySelectorAll(".random-bg button")];
let randomBgOption = true;
let bulletsBtn = [...document.querySelectorAll(".show-bullets button")];
let bulletOption = true;
let bgChanger;
let sideBullets = document.querySelector(".side-bullets");
let reset = document.getElementById("reset");

// Check Local Storage for
// -- random background option
if (localStorage.getItem("randomBg") == "true") {
  randomBgOption = true;
  document.getElementById("random-yes").classList.add("active");
  changeBackgrounds();
} else {
  randomBgOption = false;
  document.getElementById("random-no").classList.add("active");
}

// -- Show Bullets option
if (localStorage.getItem("bullets") == "true") {
  bulletOption = true;
  document.getElementById("bullets-yes").classList.add("active");
  sideBullets.style.display = 'block';
} else {
  bulletOption = false;
  document.getElementById("bullets-no").classList.add("active");
  sideBullets.style.display = 'none';
}

// pick saved color
if (localStorage.color) {
  document.body.style.setProperty("--mainColor", localStorage.color);
  myColors.forEach(ele => {
    ele.classList.remove("active")
  });
  myColors.forEach(ele => {
    if (ele.getAttribute("data-color") == localStorage.color) {
      ele.classList.add("active")
    }
  });
}

// Random background
function changeBackgrounds() {
  if (randomBgOption == true) {
    bgChanger = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * bgImgs.length);
      mainBg.style.backgroundImage = `url(${bgImgs[randomNumber].src})`
    }, 10000);
  };
};

// aside open & close
asideToggler.addEventListener("click", () => {
  aside.classList.toggle("open");
});

// Change color
myColors.forEach(color => {
  color.addEventListener("click", (e) => {
    myColors.forEach(ele => {
      ele.classList.remove("active")
    });
    color.classList.add("active");
    document.body.style.setProperty("--mainColor", e.currentTarget.getAttribute("data-color"));
    localStorage.setItem("color", e.currentTarget.getAttribute("data-color"))
  });
});

// Random Background btn
randomBgBtn.forEach(e => {
  e.addEventListener("click", () => {
    if (e.dataset.bg == 'yes') {
      randomBgOption = true;
      changeBackgrounds()
      localStorage.setItem("randomBg", randomBgOption)
    } else {
      randomBgOption = false;
      clearInterval(bgChanger)
      localStorage.setItem("randomBg", randomBgOption)
    };
    randomBgBtn.forEach(ele => {
      ele.classList.remove("active");
    });
    e.classList.add("active");
  });
});

// Random Background btn
bulletsBtn.forEach(e => {
  e.addEventListener("click", () => {
    bulletsBtn.forEach(ele => {
      ele.classList.remove("active");
    });
    e.classList.add("active");
    if (e.dataset.show == 'yes') {
      bulletOption = true;
      sideBullets.style.display = 'block';
      localStorage.setItem("bullets", bulletOption)
    } else {
      bulletOption = false;
      sideBullets.style.display = 'none';
      localStorage.setItem("bullets", bulletOption)
    };
  });
});

// Reset Button
reset.onclick = () => {
  localStorage.setItem("color","#ff9800")
  localStorage.setItem("randomBg","true")
  localStorage.setItem("bullets","true")
  window.location.reload()
}

// Skill progress
let progressSpans = [...document.querySelectorAll(".progress span")]
window.onscroll = () => {
  if (window.scrollY >= document.getElementById("skills").offsetTop - 300) {
    progressSpans.forEach((e) => {
      e.style.width = e.dataset.width;
    });
  };
};

// Gallery Popup
bgImgs.forEach(img => {
  img.addEventListener("click", () => {
    let overlay = document.createElement("div")
    overlay.className = 'overlay-popup'
    document.body.append(overlay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    let popupTitle = document.createElement("h4");
    popupTitle.className='popupTitle'
    popupTitle.append(document.createTextNode(img.alt))
    popupBox.append(popupTitle)
    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    popupBox.append(popupImg);
    overlay.append(popupBox);
    let closeBtn = document.createElement("div");
    closeBtn.append(document.createTextNode("X"));
    closeBtn.className = 'closeBtn';
    popupBox.append(closeBtn);
  });
});
// Close Button
document.addEventListener("click", (e) => {
  if (e.target.className == 'closeBtn') {
    e.target.parentElement.remove();
    document.querySelector(".overlay-popup").remove()
  }
})