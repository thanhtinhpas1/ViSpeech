"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cqrs_1 = require("@nestjs/cqrs");
const user_created_event_1 = require("../events/impl/user-created.event");
const user_deleted_event_1 = require("../events/impl/user-deleted.event");
const user_updated_event_1 = require("../events/impl/user-updated.event");
const password_changed_event_1 = require("../events/impl/password-changed.event");
const user_welcomed_event_1 = require("users/events/impl/user-welcomed.event");
const verify_email_sent_event_1 = require("users/events/impl/verify-email-sent.event");
const email_verified_event_1 = require("users/events/impl/email-verified.event");
class User extends cqrs_1.AggregateRoot {
    constructor(id) {
        super();
        this.id = id;
    }
    setData(data) {
        this.data = data;
    }
    createUserStart(streamId) {
        this.apply(new user_created_event_1.UserCreationStartedEvent(streamId, this.data));
    }
    createUser(streamId) {
        this.apply(new user_created_event_1.UserCreatedEvent(streamId, this.data));
    }
    updateUser(streamId) {
        this.apply(new user_updated_event_1.UserUpdatedEvent(streamId, this.data));
    }
    deleteUser(streamId) {
        this.apply(new user_deleted_event_1.UserDeletedEvent(streamId, this.id));
    }
    changePassword(streamId, newPassword, oldPassword) {
        this.apply(new password_changed_event_1.PasswordChangedEvent(streamId, this.id, newPassword, oldPassword));
    }
    sendVerifyEmail(streamId) {
        this.apply(new verify_email_sent_event_1.VerifyEmailSentEvent(streamId, this.id));
    }
    verifyEmail(streamId) {
        this.apply(new email_verified_event_1.EmailVerifiedEvent(streamId, this.data));
    }
    welcomeUser(streamId) {
        this.apply(new user_welcomed_event_1.UserWelcomedEvent(streamId, this.id));
    }
}
exports.User = User;
//# sourceMappingURL=user.model.js.map