import type { Meta, StoryObj } from '@storybook/react';
import FormOp, { Form } from './Form';
import { IFormContext } from './FormContext';
import FormInput from '../Input/FormInput';
import Button from '../Button/Button';
import * as Yup from "yup";

interface FormTestType {
    email: string;
    password: string;
}

function StoryRender(): JSX.Element {
    return (
        <div style={{ width: "400px" }}>
            <FormOp<FormTestType>
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => {}}
                validateOnChange={true}
                validationSchema={Yup.object<FormTestType>().shape({
                    email: Yup.string().nullable().required("is required.").email("must be of valid format."),
                    password: Yup.string().nullable().required("is required."),
                })}
            >
                {({ values, setFormValue }: IFormContext<FormTestType>) => 
                    <Form>
                        <FormInput
                            field="email"
                            label="Email"
                            type="text"
                            value={values.email}
                            onChange={(v: string) => setFormValue("email", v)}
                            required
                        />
                        <FormInput
                            field="password"
                            label="Password"
                            type="text"
                            className='mt-10'
                            value={values.password}
                            onChange={(v: string) => setFormValue("password", v)}
                            required
                        />
                        <Button 
                            style={{ width: "100%", marginTop: "10px" }} 
                            type="submit" 
                            variant="primary" 
                            label='Login' 
                        />
                    </Form>
                }
            </FormOp>
        </div>
    )
}

const meta: Meta<typeof Form> = {
    component: Form,
};

export default meta;

type FormStory = StoryObj<typeof Form>;

export const LoginForm: FormStory = {
    render: () => {
        return <StoryRender />
    }
}