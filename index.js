const tl = gsap.timeline();
const tozaburo = document.getElementById("tozaburo");
const background = document.getElementById("background");
const langSelect = document.getElementById("lang-select");
const overlay = document.getElementById("overlay");
const title = document.getElementById("title");
const contents = document.getElementById("contents");
// const wbr = ["する", "める", "れる", "って"];
const segmenter = new TinySegmenter();
const seeMore = document.getElementById("see-more");
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
    url: "https://suzuri.jp/Tozaburo"
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

// window.onload = () => {
//   tl.to(window, {
//     scrollTo: 0, // スクロール位置を0（最上部）に設定
//     duration: 1, // アニメーションの時間（秒）
//     ease: 'power2.inOut' // イージングの設定
//   });
// };

// window.scrollTo(0, 0);

tl.fromTo(background, 2,
  { width: "0vw" },
  {
    width: "100vw", ease: Power2.easeInOut,
    // onStart: function () {
    //   window.scrollTo(0, 0);
    // }
  },
)
  .fromTo(tozaburo, 1,
    { fontSize: "10vw" },
    { fontSize: "15vw", ease: Power2.easeInOut },
    "-=1"
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
  console.log(isLoaded)
  if (isLoaded === 3) {
    updateContents("websites");
  }
}

document.querySelectorAll(".button").forEach((button) => {
  button.onclick = (e) => {
    document.querySelectorAll(".button").forEach((elm) => { elm.classList.remove("active") });
    e.target.classList.add("active");
    tl.to(contents, 0.5, {
      opacity: "0",
      ease: Power2.easeInOut,
      onComplete: () => updateContents(e.target.id)
    })
      .to(contents, 0.5, {
        opacity: "1",
        ease: Power2.easeInOut
      });
  }
})

function updateContents(variable) {
  contents.innerHTML = "";
  let html = "";
  console.log(variable)
  for (let n = 0; n < 4; n++) {
    let item = {};
    let thumbnail = "";
    let title = "";
    let titleJa = "";
    let titleEn = "";
    let url = "";
    switch (variable) {
      case "websites":
        item = websites[websites.length - n - 1]
        console.log(item)
        thumbnail = item.url + "image.png";
        titleJa = item.ja;
        titleEn = item.en;
        title = title.replace(" ", " <wbr>");
        url = item.url;
        seeMore.href = "/websites";
        break;
      case "youtube":
        item = youtube[n];
        thumbnail = item.thumbnail;
        title = item.title.replace(" ", " <wbr>");
        url = item.url;
        seeMore.href = "https://www.youtube.com/c/Tozaburo3D?sub_confirmation=1";
        break;
      case "note":
        item = note[n];
        thumbnail = item.thumbnail;
        title = item.title.replace(" ", " <wbr>");
        title = segmenter.segment(title).join("<wbr>");
        url = item.url;
        seeMore.href = "https://note.com/tozaburo";
        break;
    }
    switch (variable) {
      case "websites":
        html += `
    <a class="content" href="${url}" target="_blank" rel="noopener noreferrer">
      <img
        src="${thumbnail}"
        alt="" onerror="this.onerror=null; this.src='https://tozaburo.github.io/alternate-image.png';">
      <p class="content-title flexB" en="${titleEn}" ja="${titleJa}"></p>
    </a>
    `;
        break;
      default:
        html += `
    <a class="content" href="${url}" target="_blank" rel="noopener noreferrer">
      <img
        src="${thumbnail}"
        alt="">
      <p class="content-title flexB">${title}</p>
    </a>
    `;
        break;
    }
  }
  contents.innerHTML = html;
  document.querySelectorAll(`[${arg.lang}]`).forEach(element => {
    element.innerText = element.getAttribute(`${arg.lang}`);
  });
}

const fetchRSSData = async (url) => {
  try {
    const response = await fetch(`https://rss.studiodesignapp.com/rssConverter?url=${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

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

fetchRSSData(`https://note.com/tozaburo/rss`).then(data => {
  if (data) {
    note = data.items.map(item => {
      return {
        title: item.title,
        url: item.link,
        thumbnail: item.media_thumbnail
      };
    });
    console.log(note);
    isLoaded++;
    loaded();
  }
});

fetchRSSData(`https://www.youtube.com/feeds/videos.xml?channel_id=UCUZ5WL0YWaXgNZAQ4Q4N7Nw`).then(data => {
  if (data) {
    youtube = data.items.map(item => {
      return {
        title: item.media_group.media_title,
        url: item.media_group.media_content_url,
        thumbnail: item.media_group.media_thumbnail_url
      };
    });
    console.log(youtube);
    isLoaded++;
    loaded();
  }
});

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

for (let i = 1; i <= 4; i++) {
  gsap.to(`h1:nth-child(${i}).blog-animate`, {
    color: "#FFFFFF",  // "#FFFFFFFF" は無効な値なので修正しています
    fontSize: "2em",
    delay: i * 0.1, // 100msの遅延を秒に変換
    duration: 0.5,  // 500msのアニメーション時間
    ease: "back.out(1.7)"  // easeOutBackと同等のイージング
  });
}

function updateLinks() {
  let html = "";

  links.forEach((data) => {
    html += `<a class="link flexB" href="${data.url}" target="_blank" rel="noopener noreferrer">${data.name}</a>`;
  })
  linksContainer.innerHTML = html;
}

updateLinks();