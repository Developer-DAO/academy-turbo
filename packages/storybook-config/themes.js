import { create } from "@storybook/theming";

const commonOptions = {
  brandTitle: "D_D Academy — Storybook",
  brandUrl: "https://example.com/",
  brandTarget: "_blank",
};

export const light = create({
  base: "light",
  brandImage: "./logo-light.svg",
  ...commonOptions,
});

export const dark = create({
  base: "dark",
  brandImage: "./logo-dark.svg",
  ...commonOptions,
});
