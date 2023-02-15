const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    first_name: {
        type: String,
        default: null
    },
    last_name: {
        type: String,
        default: null
    },
    mobile: {
        type: String,
        required: true
    },
    city: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,  // 6 digit length
        required: true
    }
}, {
    timestamps: true
}, {
    collection: "auth"
}
);

module.exports = mongoose.model("auth", authSchema);