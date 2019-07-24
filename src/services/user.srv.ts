import mongoose, { Mongoose, Model } from 'mongoose';
import {injectable} from 'inversify';


const User = mongoose.model('user');


@injectable()
export class UserService {

    constructor(){
    }

    public async getUsers(){
        return await User.find({})
    }
}