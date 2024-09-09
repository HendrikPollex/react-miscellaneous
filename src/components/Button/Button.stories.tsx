import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
 
const meta: Meta<typeof Button> = {
    component: Button,
};
 
export default meta;
type ButtonStory = StoryObj<typeof Button>;
 
export const Primary: ButtonStory = {
    args: {
        label: 'Button',
        variant: 'primary'
    },
};