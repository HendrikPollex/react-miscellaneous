import type { Meta, StoryObj } from '@storybook/react';
import FormInput, { FormInputProps } from './FormInput';
import Form from '../Form/Form';
import { IFormContext } from '../Form/FormContext';

function StoryRender<T extends string | number>(props: Omit<FormInputProps<T>, "value" | "onChange">): JSX.Element {    

    return (
        <Form<{ value: string }>
            initialValues={{ value: "" }}
            onSubmit={(values) => {}}
        >
            {({ values, setFormValue }: IFormContext<{ value: string }>) => 
                <FormInput
                    {...props} 
                    value={values.value as T}
                    onChange={(v: T) => setFormValue("value", v)}
                />
            }
        </Form>
    )
}

const meta: Meta<typeof FormInput> = {
    component: FormInput,
};

export default meta;

type FormInputStory = StoryObj<typeof FormInput>;

export const TextInput: FormInputStory = {
    args: {
        id: "text_input",
        field: "text",
        label: "Label",
        type: "text",
        required: true
    },
    render: (props) => {
        return <StoryRender {...props} />
    }
}

export const NumberInput: FormInputStory = {
    args: {
        id: "number_input",
        label: "Label",
        type: "number",
    },
    render: (props) => {
        return <StoryRender {...props} />
    }
}