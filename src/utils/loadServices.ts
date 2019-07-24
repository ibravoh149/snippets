import { UserService } from '../services/user.srv';
import TYPES from "../constant/types";
import { Container } from "inversify";

let container = new Container();

container.bind<UserService>(TYPES.UserService).to(UserService)

export default container;