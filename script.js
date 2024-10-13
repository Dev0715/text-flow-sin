const flowingText = "Thetford Mines - Virtuel partout au Québec";
const flowingImageHref =
  "https://box11.domaineinternet.ca/~cliniqueautrem/wp-content/uploads/2024/09/blob-sourire.svg";
const flowingTextId = "text-flowing";
// const flowingPathId = "path-flowing";
const animationSpeed = -1;
const repeatedCount = 10;
const hiddenSpanSize = 50;

document.addEventListener("DOMContentLoaded", startMarquee);

function startMarquee() {
  const flowingTextEl = document.getElementById(flowingTextId);
  flowingTextEl.innerHTML = duplicateTextContent(flowingText, repeatedCount);
  createImages();

  const tSpanSpaceEl = document.getElementById(`tspan-${0}`);
  const rect = tSpanSpaceEl.getBoundingClientRect();
  const pathLength = 1383; //rect.width;
  console.log(rect, pathLength);

  let offset = 0;
  setInterval(() => {
    offset -= animationSpeed;
    if (offset < 0) {
      offset = pathLength;
    } else if (offset > pathLength) {
      offset = 0;
    }
    flowingTextEl.setAttribute("startOffset", `${offset}px`);
    animateImages();
  }, 10);
}

function duplicateTextContent(textContent, count) {
  let duplicatedText = "";
  for (let i = 0; i < count; i++) {
    duplicatedText += `<tspan id="tspan-${i}">${textContent}<tspan id="tspan-space-${i}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tspan></tspan>`;
  }
  return duplicatedText;
}

function createImages() {
  const imagesContainer = document.getElementById("images-container");
  for (let i = 0; i < repeatedCount; i++) {
    const tSpanEl = document.getElementById(`tspan-${i}`);
    const spanRect = tSpanEl.getBoundingClientRect();
    const tSpanSpaceEl = document.getElementById(`tspan-space-${i}`);
    const spaceRect = tSpanSpaceEl.getBoundingClientRect();

    const imgEl = document.createElement("img");
    imgEl.id = `img-${i}`;
    imgEl.src = flowingImageHref;
    imgEl.style.position = "absolute";
    imgEl.style.left = spaceRect.left + spaceRect.width / 2 - 9 - 9 + "px";
    imgEl.style.top = spaceRect.top + spaceRect.height / 2 - 9 - 6 + "px";
    imgEl.width = 18;
    imgEl.height = 18;
    imgEl.alt = "alt";

    if (spanRect.width < 50) {
      imgEl.style.display = "none";
    }

    imagesContainer.appendChild(imgEl);
  }
}

function animateImages() {
  for (let i = 0; i < repeatedCount; i++) {
    const tSpanEl = document.getElementById(`tspan-${i}`);
    const spanRect = tSpanEl.getBoundingClientRect();
    const tSpanSpaceEl = document.getElementById(`tspan-space-${i}`);
    const spaceRect = tSpanSpaceEl.getBoundingClientRect();
    const imgEl = document.getElementById(`img-${i}`);

    imgEl.style.left = spaceRect.left + spaceRect.width / 2 - 9 - 9 + "px";
    imgEl.style.top = spaceRect.top + spaceRect.height / 2 - 9 - 6 + "px";

    // console.log(spaceRect);

    if (spaceRect.width < 50 && imgEl.style.display !== "none") {
      imgEl.style.display = "none";
    }
    if (spanRect.width > 50 && imgEl.style.display === "none") {
      imgEl.style.display = "block";
    }
  }
}
