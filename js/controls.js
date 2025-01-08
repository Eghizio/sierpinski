import { rngColor } from "./rendering.js";

const getTheme = () => {
  return (
    window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--color") ?? rngColor()
  );
};

const bindPointColorPicker = (config) => {
  const pointColorPicker = document.querySelector("input[type=color]");
  pointColorPicker.value = config.color;

  pointColorPicker.addEventListener("input", (event) => {
    config.color = event.target.value;
  });

  return config.color;
};

const bindPointRadiusSelect = (config) => {
  const pointRadiusSelect = document.querySelector("select");
  pointRadiusSelect.value = config.radius;

  pointRadiusSelect.addEventListener("input", (event) => {
    config.radius = parseInt(event.target.value, 10);
  });

  return config.radius;
};

const bindIterationsInput = (config) => {
  const iterationsInput = document.querySelector("input[type=number]");
  iterationsInput.value = config.iterations;

  iterationsInput.addEventListener("input", (event) => {
    config.iterations = event.target.valueAsNumber;
    console.log(config);
  });

  return config.iterations;
};

const bindDelayRangePicker = (config) => {
  const delayRange = document.querySelector("input[type=range]");
  const delay = delayRange.valueAsNumber ?? 0;

  delayRange.addEventListener("input", (event) => {
    const delay = event.target.valueAsNumber;
    config.delay = delay;
    delayRange.title = `Delay: ${delay}ms`;
  });

  return delay;
};

const bindInstantCheckbox = (config) => {
  const instantCheckbox = document.querySelector("input[type=checkbox]");
  const isChecked = instantCheckbox.checked;

  instantCheckbox.addEventListener("input", (event) => {
    config.instant = event.target.checked;
  });

  return isChecked;
};

export const bindControlsToConfig = (config) => {
  config.theme = getTheme();
  config.color = bindPointColorPicker(config);
  config.radius = bindPointRadiusSelect(config);
  config.iterations = bindIterationsInput(config);
  config.delay = bindDelayRangePicker(config);
  config.instant = bindInstantCheckbox(config);
};
