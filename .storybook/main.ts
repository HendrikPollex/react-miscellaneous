import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/preset-create-react-app",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@chromatic-com/storybook",
		"@storybook/addon-interactions",
		"storybook-dark-mode",
	],
	framework: {
		name: "@storybook/react-webpack5",
		options: {
			strictMode: true
		},
	},
	docs: {
		defaultName: "Documentation"
	},
	staticDirs: ["../public"],
};
export default config;