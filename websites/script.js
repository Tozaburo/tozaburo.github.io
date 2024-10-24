const tl = gsap.timeline();
const background = document.getElementById("background");
const langSelect = document.getElementById("lang-select");
const overlay = document.getElementById("overlay");
const title = document.getElementById("title");
const contents = document.getElementById("contents");
const segmenter = new TinySegmenter();
const linksContainer = document.getElementById("links-container");
const links = [
  {
    name: "YouTube",
    url: "https://www.youtube.com/c/Tozaburo3D?sub_confirmation=1"
  },
  {
    name: "note",
    url: "https://note.com/tozaburo"
  },
  {
    name: "GitHub",
    url: "https://github.com/Tozaburo"
  },
  {
    name: "LINE",
    url: "https://store.line.me/search/en?q=tozaburo"
  },
  {
    name: "SUZURI",
    url: "https://note.com/tozaburo"
  },
  {
    name: "Scratch",
    url: "https://scratch.mit.edu/users/tozaburo/"
  },
  {
    name: "CurseForge",
    url: "https://www.curseforge.com/members/tozaburo512/projects"
  }
];

let note = [];
let youtube = [];
let websites = [];
let isLoaded = 0;

tl.fromTo(background, 2,
  { width: "0vw" },
  {
    width: "100vw", ease: Power2.easeInOut,
    // onStart: function () {
    //   window.scrollTo(0, 0);
    // }
  },
)
  .fromTo(langSelect, 0.1,
    { opacity: 0 },
    { opacity: 1, ease: Power2.easeInOut }
  )

gsap.registerPlugin(ScrollTrigger); // ScrollTriggerプラグインを登録

window.scrollTo(0, 0);

gsap.to(overlay, {
  width: "100vw",
  duration: 3,
  scrollTrigger: {
    trigger: "body",     // アニメーションをトリガーする要素
    start: "top top",      // 要素が画面の上端に達した時点で開始
    end: "200vh top",      // スクロール位置が200vhに達した時点で終了
    scrub: 1               // スクロールに同期
  }
});

gsap.to(overlay, {
  height: "100vh",
  duration: 3,
  scrollTrigger: {
    trigger: "body",     // アニメーションをトリガーする要素
    start: "300vh top",    // スクロール位置が200vhに達した時点で開始
    end: "500vh top",      // スクロール位置が400vhに達した時点で終了
    scrub: true,
    onEnterBack: () => {
      title.style.opacity = "1";
    },
  },
  onComplete: () => {      // 下方向のスクロールでアニメーション終了時に実行
    title.style.opacity = "0";
    title.style.pointerEvents = "none";
  },
});

function loaded() {
  updateContents();
}

function updateContents() {
  contents.innerHTML = "";
  let html = "";
  for (let n = 0; n < websites.length; n++) {
    let item = websites[websites.length - n - 1];
    let thumbnail = "";
    let title = "";
    let titleJa = "";
    let titleEn = "";
    let url = "";

    console.log(item)
    thumbnail = item.url + "image.png";
    titleJa = item.ja;
    titleEn = item.en;
    title = title.replace(" ", " <wbr>");
    url = item.url;

    html += `
    <a class="content" href="${url}" target="_blank" rel="noopener noreferrer">
      <img
        src="${thumbnail}"
        alt="" onerror="this.onerror=null; this.src='https://tozaburo.github.io/alternate-image.png';">
      <p class="content-title flexB" en="${titleEn}" ja="${titleJa}"></p>
    </a>
    `;
  }
  contents.innerHTML = html;
  document.querySelectorAll(`[${arg.lang}]`).forEach(element => {
    element.innerText = element.getAttribute(`${arg.lang}`);
  });
}

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

fetchData(`https://tozaburo.github.io/websites.json`).then(data => {
  if (data) {
    websites = data;
    console.log(websites);
    isLoaded++
    loaded();
  }
});

barba.init({
  transitions: [
    {
      name: "fade",
      leave(data) {
        // ページが離れるときのアニメーション
        return gsap.to(data.current.container, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => data.current.container.remove()
        });
      },
      enter(data) {
        // 新しいページが表示されるときのアニメーション
        return gsap.from(data.next.container, {
          opacity: 0,
          duration: 0.5
        });
      }
    }
  ]
});