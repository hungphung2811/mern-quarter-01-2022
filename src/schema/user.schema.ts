import { findUserByEmail } from '@src/service/user.service';
import { object, string, TypeOf } from 'zod'

export const createUserSchema = object({
    body: object({
        firstName: string({
            required_error: "First name is Required"
        }),
        lastName: string({
            required_error: "Last name is Required"
        }),
        password: string({
            required_error: "passWord is Required"
        }).min(6, "Password is too short - should be at least 6 characters"),
        passwordConfirmation: string({
            required_error: "passWordConfirmation is Required"
        }),
        email: string({
            required_error: "email is Required"
        }).email("not a valid email"),
    }).refine(data => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passWordConfirmation"]
    })
});


export const verifyUserSchema = object({
    params: object({
        id: string(),
        verificationCode: string()
    })
})

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"]
export type VerifiUserInput = TypeOf<typeof verifyUserSchema>["params"]