import { create } from "@storybook/theming";

const commonOptions = {
  brandTitle: "Turbo Monorepo — Storybook",
  brandUrl: "https://myopic.design/",
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
