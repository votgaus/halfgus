{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 /**\
 * Dark Mode Toggle 1.0.2\
 * Copyright 2023 Timothy Ricks\
 * Released under the MIT License\
 * Released on: November 28, 2023\
 */\
\
function colorModeToggle() \{\
  function attr(defaultVal, attrVal) \{\
    const defaultValType = typeof defaultVal;\
    if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;\
    if (attrVal === "true" && defaultValType === "boolean") return true;\
    if (attrVal === "false" && defaultValType === "boolean") return false;\
    if (isNaN(attrVal) && defaultValType === "string") return attrVal;\
    if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;\
    return defaultVal;\
  \}\
\
  const htmlElement = document.documentElement;\
  const computed = getComputedStyle(htmlElement);\
  let toggleEl;\
  let togglePressed = "false";\
\
  const scriptTag = document.querySelector("[tr-color-vars]");\
  if (!scriptTag) \{\
    console.warn("Script tag with tr-color-vars attribute not found");\
    return;\
  \}\
\
  let colorModeDuration = attr(0.5, scriptTag.getAttribute("duration"));\
  let colorModeEase = attr("power1.out", scriptTag.getAttribute("ease"));\
\
  const cssVariables = scriptTag.getAttribute("tr-color-vars");\
  if (!cssVariables.length) \{\
    console.warn("Value of tr-color-vars attribute not found");\
    return;\
  \}\
\
  let lightColors = \{\};\
  let darkColors = \{\};\
  cssVariables.split(",").forEach(function (item) \{\
    let lightValue = computed.getPropertyValue(`--color--$\{item\}`);\
    let darkValue = computed.getPropertyValue(`--dark--$\{item\}`);\
    if (lightValue.length) \{\
      if (!darkValue.length) darkValue = lightValue;\
      lightColors[`--color--$\{item\}`] = lightValue;\
      darkColors[`--dark--$\{item\}`] = darkValue;\
    \}\
  \});\
\
  if (!Object.keys(lightColors).length) \{\
    console.warn("No variables found matching tr-color-vars attribute value");\
    return;\
  \}\
\
  function setColors(colorObject, animate) \{\
    if (typeof gsap !== "undefined" && animate) \{\
      gsap.to(htmlElement, \{\
        ...colorObject,\
        duration: colorModeDuration,\
        ease: colorModeEase\
      \});\
    \} else \{\
      Object.keys(colorObject).forEach(function (key) \{\
        htmlElement.style.setProperty(key, colorObject[key]);\
      \});\
    \}\
  \}\
\
  function goDark(dark, animate) \{\
    if (dark) \{\
      localStorage.setItem("dark-mode", "true");\
      htmlElement.classList.add("dark-mode");\
      setColors(darkColors, animate);\
      togglePressed = "true";\
    \} else \{\
      localStorage.setItem("dark-mode", "false");\
      htmlElement.classList.remove("dark-mode");\
      setColors(lightColors, animate);\
      togglePressed = "false";\
    \}\
    if (typeof toggleEl !== "undefined") \{\
      toggleEl.forEach(function (element) \{\
        element.setAttribute("aria-pressed", togglePressed);\
      \});\
    \}\
  \}\
\
  // Force initial state to light mode\
  goDark(false, false); // This line forces light mode initially\
\
  window.addEventListener("DOMContentLoaded", (event) => \{\
    toggleEl = document.querySelectorAll("[tr-color-toggle]");\
    toggleEl.forEach(function (element) \{\
      element.setAttribute("aria-label", "View Dark Mode");\
      element.setAttribute("role", "button");\
      element.setAttribute("aria-pressed", togglePressed);\
    \});\
    toggleEl.forEach(function (element) \{\
      element.addEventListener("click", function () \{\
        let darkClass = htmlElement.classList.contains("dark-mode");\
        darkClass ? goDark(false, true) : goDark(true, true);\
      \});\
    \});\
  \});\
\}\
colorModeToggle();\
}