const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema({
    nome: String,
    tipo: String,
    tamanho: String,
    genero: String,
    castracao: Boolean,
    vermifugacao: Boolean,
    vacinacao: String,
    fotos: [{ type: String }],
    detalhes: String,
    peso: Number,
    ano: Number,
    mes: Number,
    location: {
        type: { type: String },
        coordinates: []
    },
    status: { type: Boolean, default: true },
    doador: { type: Schema.Types.ObjectId, ref: 'User' },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    dislike: [{ type: Schema.Types.ObjectId, ref: 'User' }]

}, {
    timestamps: true
})
PetSchema.index({ location: "2dsphere" });
module.exports = mongoose.model('Pet', PetSchema);