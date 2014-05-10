/**
 * Created by asafdav on 3/1/14.
 */
// Require modules
var bcrypt = require('bcrypt');
var uid = require('uid2');
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var timestamps = require('mongoose-timestamp');
var _ = require('lodash');


// Define the internal object
var internals = {};

var TOKEN_LEN = 32;
var TokenPlatformTypes = {
    DESKTOP: 'desktop',
    MOBILE: 'mobile'
};
var UserRoleTypes = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    EDITOR: 'EDITOR',
    VIEWER: 'VIEWER'
};

var RoleHierarchy = {};
RoleHierarchy[UserRoleTypes.SUPER_ADMIN] = [UserRoleTypes.SUPER_ADMIN, UserRoleTypes.ADMIN, UserRoleTypes.EDITOR, UserRoleTypes.VIEWER];
RoleHierarchy[UserRoleTypes.ADMIN] = [UserRoleTypes.ADMIN, UserRoleTypes.EDITOR, UserRoleTypes.VIEWER];
RoleHierarchy[UserRoleTypes.EDITOR] = [UserRoleTypes.EDITOR, UserRoleTypes.VIEWER];
RoleHierarchy[UserRoleTypes.VIEWER] = [UserRoleTypes.VIEWER];

var UserSchema = new Schema({
    email: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    password: {
        type: String,
        required: false,
        select: false
    },
    name: {
        type: String,
        required: false
    },
    thumb: {
        type: String
    },
    facebook: {
        id: {
            type: String,
            index: {
                unique: true,
                sparse: true
            }
        },
        accessToken: String,
        refreshToken: String
    },
    verified: {
        type: Boolean,
        default: false,
        required: true
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    },
    role: { // Global user role
        type: String,
        required: true,
        enum: _.values(UserRoleTypes),
        default: UserRoleTypes.EDITOR
    },
    access_tokens: [{
        token: {
            type: String,
            required: true
        },
        platform: {
            type: String,
            required: false,
            enum: _.values(TokenPlatformTypes)
        },
        ips: Schema.Types.Mixed
    }]
});
UserSchema.plugin(timestamps);
UserSchema.statics.TokenPlatformTypes = TokenPlatformTypes;
UserSchema.statics.RoleTypes = UserRoleTypes;
UserSchema.statics.RoleHierarchy = RoleHierarchy;

UserSchema.pre("save", function(next) {
    var self = this;

    if ( !! self.email) self.email = self.email.toLowerCase();

    // only hash the password if it has been modified (or is new)
    if (!self.isModified('password')) return next();

    // Hash the password - the safe way
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(self.password, salt, function(err, hash) {
            self.password = hash;
            next();
        });
    });
});

/**
 * Check if the provided password is equal to the saved password
 * @param candidatePassword
 * @param cb
 */
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.generateToken = function(platform, cb) {
    var self = this;
    if (!platform) platform = TokenPlatformTypes.DESKTOP;

    uid(32, function(err, token) {
        if (err) throw Error(err);

        var newToken = {
            token: token,
            platform: platform
        };
        self.access_tokens.push(newToken);
        cb(null, newToken);
    });
};

// Format the entity for the api, remove restricted fields
if (!UserSchema.options.toObject) UserSchema.options.toObject = {};
UserSchema.options.toObject.transform = function(doc, ret, options) {
    // Remove restricted fields
    delete ret.password;
    delete ret.access_tokens;
    if ( !! ret.facebook && !! ret.facebook.accessToken) delete ret.facebook.accessToken;
};

module.exports = Mongoose.model("ShowMyStackUser", UserSchema);
