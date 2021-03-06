"use strict";

class Assitant {
  constructor(options) {
    this.options = options;
    this.input = document.createElement("input");
    this.input.classList.add("input");
    this.input.addEventListener("change", () => {
      this.input.style.outline = "none";
      this.input.placeholder = "Ask something";
    });
    this.input.setAttribute("type", "text");
    this.input.setAttribute("placeholder", "Ask something");
    this.assistantBody = document.createElement("div");
  }

  init() {
    localStorage.setItem("firsttime", true);
    this.options.container.appendChild(this.createAssistant());
    this.openChatBot = document.createElement("div");
    this.openChatBot.classList.add("open-chat-bot");
    this.openChatBot.onclick = () => {
      var asis = document.getElementById("assistant");
      asis.style.display = "block";
      this.openChatBot.style.display = "none";
    };
    this.robotIcon = document.createElement("i");
    this.robotIcon.classList.add("fas");
    this.robotIcon.classList.add("fa-robot");
    this.openChatBot.appendChild(this.robotIcon);
    this.options.container.appendChild(this.openChatBot);
    var style = document.createElement("link");
    var script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/eb3ac9fd91.js";
    script.defer = true;
    script.crossOrigin = "anonymous";
    style.setAttribute("rel", "stylesheet");
    style.setAttribute("href", "./style.css");
    document.head.appendChild(style);
    document.head.appendChild(script);
  }
  createAssistant() {
    let assistant = document.createElement("div");
    assistant.classList.add("assistant");
    assistant.id = "assistant";
    assistant.appendChild(this.createAssistantHeader());
    assistant.appendChild(this.createAssistantBody());
    assistant.appendChild(this.createAssistantFotter());
    return assistant;
  }
  createAssistantHeader() {
    let assistantHeader = document.createElement("div");
    assistantHeader.classList.add("assistant-header");
    assistantHeader.appendChild(this.createAssistantHeaderTitle());
    assistantHeader.appendChild(this.createAssistantHeaderH1());
    assistantHeader.appendChild(this.createHeaderClose());
    return assistantHeader;
  }
  createHeaderClose() {
    let assistantHeaderCloseButton = document.createElement("div");
    assistantHeaderCloseButton.classList.add("header-close-button");
    let close = document.createElement("i");
    close.classList.add("fa");
    close.classList.add("fa-times");
    close.onclick = () => {
      console.log("hello");
      var asis = document.getElementById("assistant");
      asis.style.display = "none";
      this.openChatBot.style.display = "grid";
    };
    assistantHeaderCloseButton.appendChild(close);
    return assistantHeaderCloseButton;
  }
  createAssistantHeaderTitle() {
    let assistantHeaderTitle = document.createElement("div");
    assistantHeaderTitle.classList.add("assistant-header-avatar");
    assistantHeaderTitle.appendChild(this.createAssistantHeaderTitleAvatar());
    return assistantHeaderTitle;
  }
  createAssistantHeaderH1() {
    let assistantHeaderH1 = document.createElement("div");
    assistantHeaderH1.classList.add("assistant-header-title");
    assistantHeaderH1.innerHTML = `<p class="title">Assistant</p>`;
    return assistantHeaderH1;
  }
  createAssistantBody() {
    this.assistantBody.classList.add("assistant-body");
    this.assistantBody.onload = () => {
      if (!localStorage.getItem("firsttime")) {
        tihis.createAssistantBodyTitle(
          "hello You ask me anything like qustion or chat with me in proper english word"
        );
      }
    };
    return this.assistantBody;
  }
  createAssistantHeaderTitleAvatar() {
    let ButttonImage = document.createElement("i");
    ButttonImage.classList.add("fas");
    ButttonImage.classList.add("fa-robot");
    ButttonImage.classList.add("button-image");

    return ButttonImage;
  }

  createAssistantFotter() {
    let assistantFooter = document.createElement("div");
    assistantFooter.classList.add("assistant-footer");
    assistantFooter.appendChild(this.createAssistantFooterInput());
    return assistantFooter;
  }
  createAssistantFooterInput() {
    let assistantFooterInput = document.createElement("div");
    assistantFooterInput.classList.add("assistant-footer-input");
    assistantFooterInput.appendChild(this.input);
    assistantFooterInput.appendChild(this.createAssistantFooterButton());

    return assistantFooterInput;
  }
  createAssistantFooterButton() {
    let Button = document.createElement("button");
    Button.classList.add("button");
    Button.setAttribute("type", "submit");
    let ButttonImage = document.createElement("i");
    ButttonImage.classList.add("far");
    ButttonImage.classList.add("fa-paper-plane");
    ButttonImage.classList.add("button-image");
    Button.appendChild(ButttonImage);
    Button.addEventListener("click", () => {
      if (this.input.value) {
        this.createReplay();
      } else {
        this.input.style.outline = "solid 0.8px crimson";
        this.input.placeholder = "enter something";
      }
    });
    return Button;
  }
  createReplay() {
    let assistantBodyContent = document.createElement("div");
    assistantBodyContent.classList.add("assistant-body-reply");
    assistantBodyContent.innerHTML = `<p class="reply">${this.Replay()}</p>`;
    this.assistantBody.appendChild(assistantBodyContent);
    (async () => {
      await fetch("https://young-reef-67448.herokuapp.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          question: this.input.value,
        }),
      }).then(async (res) => {
        const data = await res.text();
        console.log(data);
        this.createAssistantBodyTitle(data);
      });
    })();
    return (this.input.value = "");
  }

  createAssistantBodyTitle(ans) {
    let assistantBodyTitle = document.createElement("div");
    assistantBodyTitle.classList.add("assistant-body-question");
    assistantBodyTitle.innerHTML = `<p class="question">${ans}</p>`;
    this.assistantBody.appendChild(assistantBodyTitle);
    this.assistantBody.scrollBy(
      assistantBodyTitle.offsetX,
      assistantBodyTitle.offsetY
    );
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en";
    speech.text = ans;
    window.speechSynthesis.speak(speech);
  }
  Replay() {
    return this.input.value;
  }
}
