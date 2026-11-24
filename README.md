# SAEPVision — Arquitetura MVC & Orientação a Objetos

## Estrutura do Projeto

```text
SAEPVision/
├── Config/
│   └── configuration.php          # Constantes de conexão (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD)
├── Controller/
│   ├── AuthController.php         # Controlador de Login, Sessão e Logout
│   ├── PublicacaoController.php   # Controlador de Listagem, Cadastro e Exclusão de Fotos
│   └── CurtidaController.php      # Controlador de Curtidas
├── Model/
│   ├── Connection.php             # Conexão PDO Singleton com MySQL
│   ├── Usuario.php                # Model de Usuário
│   ├── Publicacao.php             # Model de Publicação
│   └── Curtida.php                # Model de Curtida
├── templates/
│   ├── css/
│   │   └── style.css              # Paleta #FFFFFF, #000000, #FF0000 + Fonte Inter
│   └── js/                        # Front-end MVC Orientado a Objetos (ES6 Classes)
├── View/
│   └── home.php                   # View principal da aplicação
├── anexos_prova/                  # Imagens, ícones SVG, CSV e modelo ER
├── database.sql                   # Banco de dados MySQL (saep_vision)
├── index.php                      # Ponto de entrada (Roteador + View)
├── composer.json                  # Configuração PSR-4
├── .env.example                   # Exemplo de variáveis de ambiente
└── .gitignore
```
