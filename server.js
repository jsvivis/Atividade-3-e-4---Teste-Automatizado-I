//importando o aplicativo do arquivo app.js
import app from './app'

//declarando a porta em que o servidor vai rodar
const port = 3001;

app.listen(port, () => {
     //imprime na console a porta em que o servidor está rodando
    console.log(`Servidor rodando na porta ${port}`); 
})