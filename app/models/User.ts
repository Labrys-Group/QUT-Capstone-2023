import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';


@modelOptions({ schemaOptions: { timestamps: true, collection: "Users" } })
class User {
    @prop()
    walletAddress?: string | undefined;

    @prop()
    userName?: string;
}

export const UserModel = getModelForClass(User); // UserModel is a regular Mongoose Model with correct types
