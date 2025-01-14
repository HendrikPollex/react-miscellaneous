import { Preview } from "@storybook/react";
import { themes } from '@storybook/theming';
import { DocsContainer } from "./DocsContainer";
import "../src/react-miscellaneous.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		layout: 'centered',
		docs: {
			container: DocsContainer,
			toc: true,
		},
		darkMode: {
			classTarget: "html",
			stylePreview: true,
			// Override the default dark theme
			dark: { ...themes.dark, appPreviewBg: "#222425" },
			darkClass: "dark",
			// Override the default light theme
			light: { ...themes.normal, appPreviewBg: "#F6F9FC" },
			lightClass: "light",
		},
	},
	tags: ['autodocs']
};

export default preview;