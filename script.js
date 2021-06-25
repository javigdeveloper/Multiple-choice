const controls = document.getElementById("teacherControls");
const area = document.getElementById("initialArea");
const teacherBtn = document.getElementById("teacherBtn");
const instructions = document.getElementById("instructions");
const paragraph = document.getElementById("myParaId");
const inputs = document.getElementById("inputsId");
const optionsBtn = document.getElementById("optionsBtn");
const goToExercise = document.getElementById("goToExerciseId");
const goToExerciseBtn = document.getElementById("goToExerciseBtn");
// const newLine = document.getElementById("newLine");
let clickedSpan = false;

// add span for each word and br for new lines...
const transformText = (str) => {
  const singleSpace = str.split(" ");
  const myHtmlArr = [];
  singleSpace.forEach((el) => {
    if (el.includes("\n")) {
      let innerArr = el.split("\n");
      innerArr.forEach((item) => {
        item == "" ? myHtmlArr.push("<br>") : myHtmlArr.push(`<span>${item}</span><br>`);
      });
    } else {
      myHtmlArr.push(`<span>${el}</span>`);
    }
  });
  paragraph.innerHTML = myHtmlArr.join(" ");
};

// teacher controls button...
teacherBtn.addEventListener("click", () => {
  const myText = area.value;
  transformText(myText);
  controls.remove();
  instructions.innerText = "Click on a word if you want to add options";
});

// when clicking a word...
const changeSpan = (e) => {
  if (e.target.getAttribute("id") === "temporaryId" && clickedSpan) {
    e.target.removeAttribute("id");
    inputs.classList.remove("show");
    clickedSpan = false;
    return;
  }
  if (e.target.nodeName === "SPAN" && !clickedSpan) {
    clickedSpan = true;
    e.target.setAttribute("id", "temporaryId");
    const correctInput = document.getElementById("correctInput");
    inputs.classList.add("show");
    correctInput.value = e.target.innerText;
  }
};
paragraph.addEventListener("click", changeSpan);

// populate options when clicking options button...
optionsBtn.addEventListener("click", () => {
  let answerIndex = Math.floor(Math.random() * 4);
  const htmlCollection = document.getElementsByClassName("altOptions");
  const optionValues = [];
  const temporaryId = document.getElementById("temporaryId");
  clickedSpan = false;

  for (const item of htmlCollection) {
    if (item.value === "") {
      alert("you need to enter 3 alternate answers");
      return;
    }
    optionValues.push(item.value);
  }

  optionValues.splice(answerIndex, 0, correctInput.value);

  temporaryId.outerHTML = `<select data-a-index="${answerIndex + 1}">
    <option></option>
    <option>${optionValues[0]}</option>
    <option>${optionValues[1]}</option>
    <option>${optionValues[2]}</option>
    <option>${optionValues[3]}</option>
    </select>`;

  inputs.classList.remove("show");

  // remove previous values from input fields...
  for (const item of htmlCollection) {
    item.value = "";
  }

  // add further instructions for teacher...
  goToExercise.classList.add("show");
});

// button adds event listener to each select tag...
goToExerciseBtn.addEventListener("click", () => {
  goToExercise.classList.remove("show");
  paragraph.classList.remove("pointerClass");
  paragraph.removeEventListener("click", changeSpan);
  instructions.innerText = "Choose the correct option";

  const selectTags = document.getElementsByTagName("select");
  for (const tag of selectTags) {
    tag.addEventListener("change", () => {
      let tempAnswer = tag.getAttribute("data-a-index");
      let selectedOption = tag.options.selectedIndex;
      if (tempAnswer == selectedOption) {
        tag.classList.add("correct");
      }
    });
  }
});
