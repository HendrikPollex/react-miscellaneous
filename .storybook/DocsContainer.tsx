import React, {PropsWithChildren} from 'react';
import { DocsContainer as BaseContainer, DocsContainerProps as BaseContainerProps } from '@storybook/blocks';
import { themes } from '@storybook/theming';
import { addons } from '@storybook/preview-api';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

const channel = addons.getChannel();

export const DocsContainer = (props: PropsWithChildren<BaseContainerProps>) => {

	const [isDark, setDark] = React.useState<boolean>();

	React.useEffect(() => {
		channel.on(DARK_MODE_EVENT_NAME, setDark);
		return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
	}, [channel, setDark]);

	return (
		<BaseContainer
			context={props.context}
			theme={isDark ? themes.dark : themes.light}
		>
			{props.children}
		</BaseContainer>
	);
};