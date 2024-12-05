import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
    component: Button,
};

export default meta;

type ButtonStory = StoryObj<typeof Button>;

export const Basic: ButtonStory = {
    render: (args) => <Button {...args}>Button</Button>,
    args: {
        variant: 'primary'
    },
};