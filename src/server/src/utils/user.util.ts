import { CONSTANTS } from "../common/constant";

export const UserUtils = {
    isAdmin: (user: any) => {
        if (!user['roles'] || user['roles'].length === 0) return false;
        return user['roles'].findIndex(role => role.name === CONSTANTS.ROLE.ADMIN) !== -1;
    },
    isManagerUser: (user: any) => {
        if (!user['roles'] || user['roles'].length === 0) return false;
        return user['roles'].findIndex(role => role.name === CONSTANTS.ROLE.MANAGER_USER) !== -1
    }
}
