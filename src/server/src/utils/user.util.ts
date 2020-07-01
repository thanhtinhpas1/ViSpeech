import { CONSTANTS } from "../common/constant";

export const UserUtils = {
    isAdmin: (roles: any) => {
        if (!roles || roles.length === 0) return false;
        return roles.findIndex(role => role.name === CONSTANTS.ROLE.ADMIN) !== -1;
    },
    isManagerUser: (roles: any) => {
        if (!roles || roles.length === 0) return false;
        return roles.findIndex(role => role.name === CONSTANTS.ROLE.MANAGER_USER) !== -1
    }
}
