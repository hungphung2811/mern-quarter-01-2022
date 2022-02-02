import { CreateUserInput, VerifiUserInput } from '@src/schema/user.schema';
import { create, findUserByEmail, foundUserById } from '@src/service/user.service';
import log from '@src/utils/logger';
import sendEmail from '@src/utils/mailer';
import { Request, Response } from 'express';

export async function createHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
    const body = req.body;
    try {
        const userByEmail = await findUserByEmail(body.email);
        if (userByEmail) {
            return res.status(409).json({
                status: false,
                message: 'Email already exists'
            })
        }

        const user = await create(body);
        await sendEmail({
            from: 'hungpvph12160@fpt.edu.vn',
            to: user.email,
            subject: 'Please verifi your acount',
            text: `verification code ${user.verificationCode} id: ${user._id}`
        });
        return res.send("user created successfully")
    } catch (error: any) {
        log.error(error);
        if (error.code === 11000) {
            return res.status(409).send(`Account already exists`)
        }
        return res.status(500).send(error)
    }
}

export async function verifiHandler(req: Request<VerifiUserInput>, res: Response) {
    const { id, verificationCode } = req.params;
    // find user by id
    try {
        const user = await foundUserById(id);
        if (!user) {
            return res.send('Could not verify user')
        }

        if (user.verified) {
            return res.send("user is verified");
        }

        if (user.verificationCode === verificationCode) {
            user.verified = true;
            await user.save();

            return res.send("user verified successfully")
        }
        return res.send("Could not verify user")
    } catch (error) {
        log.error(error)
    }
}