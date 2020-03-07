import { AssignRoleUserHandler } from "./assign-role-user.handler";
import { CreateUserHandler, CreateUserStartHandler } from "./create-user.handler";
import { DeleteUserHandler } from "./delete-user.handler";
import { UpdateUserHandler } from "./update-user.handler";
import { WelcomeUserHandler } from "./welcome-user.handler";

export const CommandHandlers = [
  CreateUserStartHandler,
  CreateUserHandler,
  DeleteUserHandler,
  UpdateUserHandler,
  WelcomeUserHandler,
  AssignRoleUserHandler,
];
