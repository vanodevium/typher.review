import "./app.css";

import { easyScrollSync } from "easy-scroll-sync";

import Typograf from "typograf";

const typo = new Typograf({ locale: ["uk", "en-US"], live: true });

function boot() {
  const $editor = document.querySelector("#editor");
  const $result = document.querySelector("#result");

  if (!$editor || !$result) {
    return;
  }

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

        try {
          await navigator.clipboard.writeText(lastValue);
        } catch {
          // Clipboard may be unavailable without a user gesture.
        }
      }
    },
    false,
  );

  $result.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText($result.value);
    } catch {
      // Ignore clipboard errors on click-to-copy.
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

window.dataLayer = window.dataLayer || [];
window.gtag = (...params) => {
  dataLayer.push(...params);
};
window.gtag("js", new Date());
window.gtag("config", "G-X8YC3F72DB");
