/**
 * Dark Mode Toggle 1.0.2
 * Copyright 2023 Timothy Ricks
 * Released under the MIT License
 * Released on: November 28, 2023
 */

function colorModeToggle() {
  const htmlElement = document.documentElement;
  let toggleEl;

  function goDark(dark, animate) {
    if (dark) {
      localStorage.setItem("dark-mode", "true");
      htmlElement.classList.add("dark-mode");
      // Additional logic to set dark mode styles
    } else {
      localStorage.setItem("dark-mode", "false");
      htmlElement.classList.remove("dark-mode");
      // Additional logic to set light mode styles
    }

    // Update toggle button state if needed
    if (typeof toggleEl !== "undefined") {
      toggleEl.forEach(function (element) {
        element.setAttribute("aria-pressed", dark ? "true" : "false");
      });
    }
  }

  // Event listener for toggle button
  window.addEventListener("DOMContentLoaded", (event) => {
    toggleEl = document.querySelectorAll("[tr-color-toggle]");
    toggleEl.forEach(function (element) {
      element.addEventListener("click", function () {
        let darkClass = htmlElement.classList.contains("dark-mode");
        goDark(!darkClass, true); // Toggle dark mode state
      });
    });
  });

  // Initial state setup (force light mode initially)
  goDark(false, false); // Change to true to force dark mode initially
}

colorModeToggle();
