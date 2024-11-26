import React from "react";
import { Meta, StoryObj } from '@storybook/react';
import FormInput, { FormInputProps } from './FormInput';
import { Form, Formik, FormikProps } from 'formik';
import Button from "../Button/Button";
import { mixed, object,  } from "yup";

function StoryRender<T extends string | number>(props: Omit<FormInputProps<T>, "value" | "onChange">): JSX.Element {    

    return (
        <Formik<{ value: T }>
            initialValues={{ value: "" as T }}
            onSubmit={() => { return }}
            validationSchema={object().shape({
                value: mixed().required()
            })}
        >
            {({ values, setFieldValue }: FormikProps<{ value: T }>) => 
                <Form noValidate>
                    <FormInput
                        {...props} 
                        value={values.value as T}
                        onChange={(v: T) => setFieldValue("value", v)}
                    />
                    <div 
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            columnGap: "5px",
                            padding: "5px"
                        }}
                    >
                        <Button 
                            type="submit"
                            variant="primary"
                        >
                            Save
                        </Button>
                        <Button
                            type="reset"
                            variant="secondary"
                        >
                            Reset
                        </Button>
                    </div>
                </Form>
            }
        </Formik>
    )
}

const meta: Meta<typeof FormInput> = {
    component: FormInput,
};

export default meta;

type FormInputStory = StoryObj<typeof FormInput>;

export const TextInput: FormInputStory = {
    args: {
        field: "value",
        label: "Text",
        type: "text",
        required: true
    },
    render: (props) => {
        return <StoryRender<string> {...props} />
    }
}

export const NumberInput: FormInputStory = {
    args: {
        field: "value",
        label: "Number",
        type: "number",
    },
    render: (props) => {
        return <StoryRender<number> {...props} />
    }
}