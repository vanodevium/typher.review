import "./app.css";

import { easyScrollSync } from "easy-scroll-sync";

const Typograf = require("typograf");

const typo = new Typograf({ locale: ["uk", "en-US"], live: true });
const $editor = document.querySelector("#editor");
const $result = document.querySelector("#result");

easyScrollSync();

$editor.focus();

let lastValue = $editor.value;

$editor.addEventListener(
  "input",
  async () => {
    const value = $editor.value;

    if (value !== lastValue) {
      if (!value) {
        lastValue = "";
        $result.value = lastValue;
        return;
      }

      lastValue = typo.execute(value);
      $result.value = lastValue;
      await navigator.clipboard.writeText(lastValue);
    }
  },
  false,
);

$result.addEventListener("click", async () => {
  await navigator.clipboard.writeText($result.value);
});

window.dataLayer = window.dataLayer || [];
window.gtag = (...params) => {
  dataLayer.push(...params);
};
window.gtag("js", new Date());
window.gtag("config", "G-X8YC3F72DB");
