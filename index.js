const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let empresasCadastradas = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f7fa;
                color: #333;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: flex-start;
                height: 100vh;
                flex-direction: column;
                overflow-y: auto;
                scroll-behavior: smooth;
            }

            h1 {
                color: #4CAF50;
                margin-top: 20px;
            }

            form {
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                width: 400px;
                max-width: 90%;
                margin-bottom: 20px;
                overflow-y: auto;
                max-height: 400px;
            }

            label {
                font-size: 14px;
                margin-bottom: 5px;
                display: block;
            }

            input[type="text"],
            input[type="email"],
            input[type="number"] {
                width: 100%;
                padding: 10px;
                margin-bottom: 15px;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 14px;
            }

            input[type="submit"],
            button {
                background-color: #4CAF50;
                color: white;
                border: none;
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                border-radius: 4px;
            }

            input[type="submit"]:hover,
            button:hover {
                background-color: #45a049;
            }

            p[style="color: red;"] {
                color: red;
                font-weight: bold;
            }

            ul {
                list-style-type: none;
                padding-left: 0;
                width: 90%;
                max-width: 600px;
                margin-top: 20px;
                margin-bottom: 30px;
            }

            li {
                background-color: #fff;
                padding: 10px;
                margin-bottom: 10px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
        </style>

        <h1>Cadastro de Empresa</h1>
        <form action="/cadastro" method="POST">
            <label for="cnpj">CNPJ:</label><br>
            <input type="text" id="cnpj" name="cnpj"><br><br>

            <label for="razao_social">Razão Social:</label><br>
            <input type="text" id="razao_social" name="razao_social"><br><br>

            <label for="nome_fantasia">Nome Fantasia:</label><br>
            <input type="text" id="nome_fantasia" name="nome_fantasia"><br><br>

            <label for="endereco">Endereço:</label><br>
            <input type="text" id="endereco" name="endereco"><br><br>

            <label for="cidade">Cidade:</label><br>
            <input type="text" id="cidade" name="cidade"><br><br>

            <label for="uf">UF:</label><br>
            <input type="text" id="uf" name="uf"><br><br>

            <label for="cep">CEP:</label><br>
            <input type="text" id="cep" name="cep"><br><br>

            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email"><br><br>

            <label for="telefone">Telefone:</label><br>
            <input type="text" id="telefone" name="telefone"><br><br>

            <button type="submit">Cadastrar</button>
        </form>

        <h2>Empresas Cadastradas</h2>
        <ul>
            ${empresasCadastradas.map(emp => `
                <li>
                    <strong>${emp.razao_social}</strong> (${emp.nome_fantasia})<br>
                    CNPJ: ${emp.cnpj}, Endereço: ${emp.endereco}, ${emp.cidade} - ${emp.uf}, ${emp.cep}<br>
                    Email: ${emp.email}, Telefone: ${emp.telefone}
                </li>
            `).join('')}
        </ul>
    `);
});

app.post('/cadastro', (req, res) => {
    const { cnpj, razao_social, nome_fantasia, endereco, cidade, uf, cep, email, telefone } = req.body;

    let erros = [];
    if (!cnpj || !razao_social || !nome_fantasia || !endereco || !cidade || !uf || !cep || !email || !telefone) {
        erros.push("Todos os campos são obrigatórios.");
    }

    if (cnpj.length !== 14 || isNaN(cnpj)) {
        erros.push("CNPJ inválido! Deve ter 14 caracteres numéricos.");
    }

    if (!email.includes('@') || !email.includes('.')) {
        erros.push("Email inválido! Verifique o formato do email.");
    }

    if (telefone.length < 10 || isNaN(telefone)) {
        erros.push("Telefone inválido! O telefone deve ter pelo menos 10 dígitos.");
    }

    if (erros.length > 0) {
        return res.send(`
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f7fa; color: #333; padding: 20px; }
                h1 { color: #4CAF50; }
                p { color: red; font-weight: bold; }
            </style>
            <h1>Cadastro de Empresa</h1>
            <p>${erros.join('<br>')}</p>
            <a href="/">Voltar</a>
        `);
    }

    empresasCadastradas.push({ cnpj, razao_social, nome_fantasia, endereco, cidade, uf, cep, email, telefone });

    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
