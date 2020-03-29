"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cqrs_1 = require("@nestjs/cqrs");
const permission_created_event_1 = require("../events/impl/permission-created.event");
const permission_updated_event_1 = require("../events/impl/permission-updated.event");
const permission_deleted_event_1 = require("../events/impl/permission-deleted.event");
const permission_welcomed_event_1 = require("../events/impl/permission-welcomed.event");
const permission_assign_email_sent_event_1 = require("permissions/events/impl/permission-assign-email-sent.event");
const permission_assign_replied_event_1 = require("permissions/events/impl/permission-assign-replied.event");
class Permission extends cqrs_1.AggregateRoot {
    constructor(id) {
        super();
        this.id = id;
    }
    setData(data) {
        this.data = data;
    }
    createPermission(streamId) {
        this.apply(new permission_created_event_1.PermissionCreatedEvent(streamId, this.data));
    }
    updatePermission(streamId) {
        this.apply(new permission_updated_event_1.PermissionUpdatedEvent(streamId, this.data));
    }
    welcomePermission(streamId) {
        this.apply(new permission_welcomed_event_1.PermissionWelcomedEvent(streamId, this.id));
    }
    deletePermission(streamId) {
        this.apply(new permission_deleted_event_1.PermissionDeletedEvent(streamId, this.id));
    }
    sendAssignPermissionEmail(streamId) {
        this.apply(new permission_assign_email_sent_event_1.PermissionAssignEmailSentEvent(streamId, this.data));
    }
    replyPermissionAssign(streamId) {
        this.apply(new permission_assign_replied_event_1.PermissionAssignRepliedEvent(streamId, this.data));
    }
}
exports.Permission = Permission;
//# sourceMappingURL=permission.model.js.map