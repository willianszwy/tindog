const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nome: String,
    facebook_id: String,
    email: String,
    telefone: String,
    whatsapp: Boolean,
    avatar: String,
    cpf: String,
    primeiro_acesso: { type: Boolean, default: true },
    pets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],

}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);