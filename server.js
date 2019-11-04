var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Tarefa = require("./app/models/tarefa");

mongoose.connect('mongodb://localhost/noderest', { useMongoClient: true });
mongoose.Promise = global.Promise;



app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.port || 8000;

//    ROTAS
//==================================================
var router = express.Router();


router.use(function(req, res, next){
    console.log("Algo esta acontecendo aqui....");
    next();
});
router.get('/', function(req, res){
    res.json({message: 'Controle de Tarefas'});
});

//   API's
//===================================================
app.use('/api', router);


router.route('/tarefas')
    
    .post(function(req, res){
        var tarefa = new Tarefa();

        tarefa.titulo = req.body.titulo;
        tarefa.descricao = req.body.descricao;
        tarefa.prioridade = req.body.prioridade;

        tarefa.save(function(eroor){
            if(error)
                res.send('Erro ao tentar salvar a Tarefa: ' + error);
            res.json({message: 'Tarefa cadastrada com sucesso'});
        });
    })

    

    .get(function(req, res) {
        Tarefa.find(function(error,tarefas) {
            if(error) 
                res.send('Erro ao tentar selecionar todas as Tarefas: ' + error);

            res.json(tarefas);
        });
    });

    router.route('/tarefas/:tarefa_id')

    .get(function (req, res) {
    
       Tarefa.findById(req.params.tarefa_id, function(error, tarefa) {
            if(error)
                res.send('Id da Tarefa não encontrado: ' + error);
            
            tarefa.titulo = req.body.titulo;
            tarefa.descricao = req.body.descricao;
            tarefa.prioridade = req.body.prioridade;
            tarefa.save(function(error){
                if(erro)
                    res.send('Erro ao atualizar a tarefa: ' + error);

                res.json({message: 'Tarefa atualizada com sucesso.'})
            });

            res.json(tarefa);
        });
    })

    .delete(function(req, res) {
            
        Produto.remove({
            _id: req.params.produto_id
            }, function(error) {
                if (error) 
                    res.send("Id da Tarefa não encontrado: " + error);

                res.json({ message: 'Tarefa excluída com sucesso.' });
            });
        });


app.listen(port);
console.log("Servidor on");