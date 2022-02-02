import UserModel, { User } from "@src/model/user.model";


export function create(input: Partial<User>) {
    return UserModel.create(input);
}

export function findUserByEmail(email: string){
    return UserModel.findOne({'email': email});
}

export function foundUserById(id:string){
    return UserModel.findById(id);
}