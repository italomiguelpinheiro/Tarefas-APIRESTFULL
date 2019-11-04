var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TarefaSchema = new Schema({
    titulo: String,
    descricao: String,
    prioridade: Number
})

module.exports = mongoose.model('Tarefa', TarefaSchema);