import type { Meta, StoryObj } from '@storybook/react';
import FormOp, { Form } from './Form';
import { IFormContext } from '../Form/FormContext';
import FormInput from '../Input/FormInput';
import Button from '../../Button/Button';

interface FormTestType {
    email: string;
    password: string;
}

function StoryRender(): JSX.Element {
    return (
        <FormOp<FormTestType>
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {}}
        >
            {({ values, setFormValue }: IFormContext<FormTestType>) => 
                <Form>
                    <FormInput
                        id="form_email"
                        field="email"
                        label="Email"
                        type="text"
                        value={values.email}
                        onChange={(v: string) => setFormValue("email", v)}
                        required={true}
                    />
                    <FormInput
                        id="form_email"
                        field="password"
                        label="Password"
                        type="text"
                        className='mt-10'
                        value={values.password}
                        onChange={(v: string) => setFormValue("password", v)}
                        required={true}
                    />
                    <Button style={{ width: "100%", marginTop: "10px"}} type="submit" variant="primary" label='Login' />
                </Form>
            }
        </FormOp>
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