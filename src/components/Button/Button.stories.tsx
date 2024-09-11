import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { Add, Link } from '@mui/icons-material';

const meta: Meta<typeof Button> = {
    component: Button,
};

export default meta;

type ButtonStory = StoryObj<typeof Button>;

export const Basic: ButtonStory = {
    args: {
        label: 'Button',
        variant: 'primary'
    },
};

export const ImageButton: ButtonStory = {
    args: {
        variant: 'primary',
        imageLeft: Link
    },
};

export const FullButton: ButtonStory = {
    args: {
        label: 'Button',
        variant: 'primary',
        imageLeft: Add,
        imageRight: Link
    },
};