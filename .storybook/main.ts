import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

    addons: [
        "@chromatic-com/storybook",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-links",
        "@storybook/blocks",
        "@storybook/preset-create-react-app",
        "@storybook/react",
        "@storybook/react-webpack5",
        "@storybook/theming",
        "storybook-dark-mode",
    ],

    framework: {
		name: "@storybook/react-webpack5",
		options: {
            strictMode: true
        },
	},

    docs: {
        defaultName: "Doc"
    },

    staticDirs: ["../public"],

    typescript: {
        reactDocgen: "react-docgen-typescript"
    }
};
export default config;