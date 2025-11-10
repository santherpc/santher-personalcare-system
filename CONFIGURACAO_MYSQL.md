# 🔧 Guia de Configuração - Usando MySQL na Aplicação

## 📌 Visão Geral

A aplicação agora suporta **dois modos de armazenamento**:

1. **Memória (Padrão)** - Para desenvolvimento e testes, sem necessidade de banco de dados
2. **MySQL Enterprise Edition** - Para produção, com persistência de dados

## 🚀 Passo a Passo para Usar MySQL

### Passo 1: Criar o Banco de Dados MySQL

1. Conecte-se ao seu servidor MySQL Enterprise Edition
2. Copie e cole o **Script Completo** do arquivo `MIGRACAO_MYSQL.md` (seção 7)
3. Execute no MySQL Workbench ou via linha de comando:

```bash
mysql -u root -p < script_completo.sql
```

### Passo 2: Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (ou configure as variáveis no seu ambiente):

```bash
# Opção 1: URL de conexão completa (RECOMENDADO)
DATABASE_URL=mysql://usuario:senha@localhost:3306/ufhpc_producao

# Exemplo com usuário root e senha
DATABASE_URL=mysql://root:minhasenha@localhost:3306/ufhpc_producao

# Exemplo com servidor remoto
DATABASE_URL=mysql://ufhpc_app:senhaforte@192.168.1.100:3306/ufhpc_producao
```

**OU use variáveis separadas:**

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=ufhpc_producao
```

### Passo 3: Instalar Dependências (Já Feito)

O pacote `mysql2` já foi instalado automaticamente. Se precisar reinstalar:

```bash
npm install mysql2
```

### Passo 4: Reiniciar a Aplicação

A aplicação detecta automaticamente se existe a variável `DATABASE_URL` e usa MySQL:

```bash
npm run dev
```

**Verificação no console:**
- ✅ Se estiver usando MySQL, a aplicação conectará ao banco de dados
- ✅ Se não houver `DATABASE_URL`, usará armazenamento em memória

## 🔍 Verificar se Está Funcionando

### Teste 1: Verificar Conexão

Execute este comando SQL no seu MySQL:

```sql
USE ufhpc_producao;
SELECT * FROM auth_config;
```

Deve retornar:
```
+----+-------------+
| id | access_code |
+----+-------------+
|  1 | UFHPC@2025  |
+----+-------------+
```

### Teste 2: Adicionar Dados pela Aplicação

1. Abra a aplicação no navegador
2. Faça login com o código: `UFHPC@2025`
3. Adicione uma coleta de dados
4. Verifique no MySQL:

```sql
SELECT COUNT(*) FROM coleta_grupo1;
SELECT COUNT(*) FROM coleta_grupo2;
```

### Teste 3: Verificar Logs da Aplicação

No console onde a aplicação está rodando, você deve ver:
- Conexões ao banco de dados
- Queries sendo executadas (em modo debug)

## 📊 Estrutura de Arquivos Criados/Modificados

```
projeto/
├── MIGRACAO_MYSQL.md         # Scripts SQL para criar tabelas
├── CONFIGURACAO_MYSQL.md     # Este arquivo (configuração)
├── .env.example               # Exemplo de variáveis de ambiente
├── shared/
│   └── schema.ts             # ✅ Atualizado para MySQL
├── server/
│   ├── db.ts                 # ✅ NOVO - Conexão MySQL
│   ├── mysql-storage.ts      # ✅ NOVO - Implementação MySQL
│   └── storage.ts            # ✅ Atualizado - Suporta MySQL ou Memória
```

## 🔄 Alternando Entre Memória e MySQL

### Usar Memória (Desenvolvimento/Testes)
Remova ou comente a variável `DATABASE_URL` do arquivo `.env`:

```bash
# DATABASE_URL=mysql://...
```

Reinicie a aplicação. Os dados serão armazenados em memória.

### Usar MySQL (Produção)
Configure a variável `DATABASE_URL` no `.env`:

```bash
DATABASE_URL=mysql://usuario:senha@host:porta/banco
```

Reinicie a aplicação. Os dados serão persistidos no MySQL.

## 🛡️ Segurança

### Proteção de Credenciais

**NUNCA** commite o arquivo `.env` no Git!

Verifique se está no `.gitignore`:
```
.env
.env.local
```

### Usuário Dedicado (Recomendado)

Crie um usuário MySQL específico para a aplicação:

```sql
CREATE USER 'ufhpc_app'@'%' IDENTIFIED BY 'senha_forte_123!@#';
GRANT SELECT, INSERT, UPDATE, DELETE ON ufhpc_producao.* TO 'ufhpc_app'@'%';
FLUSH PRIVILEGES;
```

Use esse usuário na `DATABASE_URL`:
```bash
DATABASE_URL=mysql://ufhpc_app:senha_forte_123!@#@localhost:3306/ufhpc_producao
```

## 🚨 Solução de Problemas

### Erro: "Can't connect to MySQL server"

**Solução:**
1. Verifique se o MySQL está rodando
2. Confirme host, porta e credenciais
3. Teste a conexão manualmente:
   ```bash
   mysql -h localhost -u root -p
   ```

### Erro: "Access denied for user"

**Solução:**
1. Verifique usuário e senha na `DATABASE_URL`
2. Confirme permissões do usuário:
   ```sql
   SHOW GRANTS FOR 'usuario'@'localhost';
   ```

### Erro: "Unknown database 'ufhpc_producao'"

**Solução:**
1. Crie o banco de dados primeiro:
   ```sql
   CREATE DATABASE ufhpc_producao;
   ```
2. Execute os scripts de criação de tabelas

### Dados não Aparecem na Aplicação

**Solução:**
1. Verifique se a `DATABASE_URL` está configurada corretamente
2. Reinicie a aplicação
3. Limpe o cache do navegador (Ctrl+Shift+Delete)
4. Verifique os logs de erro no console

## 📈 Performance e Otimizações

### Índices

Os scripts SQL já incluem índices para:
- `data_coleta` - Para ordenação por data
- `linha_producao` - Para filtros por linha
- Constraint único em `(data_coleta, linha_producao)` - Evita duplicatas

### Connection Pool

A conexão MySQL usa pool de conexões automaticamente (via `mysql2/promise`).

Configuração padrão:
- Conexões mínimas: 0
- Conexões máximas: 10
- Timeout: 10 segundos

Para ajustar, modifique `server/db.ts`.

### Backup Automático

Configure cron job para backup diário:

```bash
# Adicione ao crontab (crontab -e)
0 2 * * * mysqldump -u root -p'senha' ufhpc_producao > /backup/ufhpc_$(date +\%Y\%m\%d).sql
```

## ✅ Checklist de Implantação

Antes de colocar em produção:

- [ ] Banco de dados MySQL criado
- [ ] Tabelas criadas com os scripts SQL
- [ ] Usuário dedicado criado com permissões limitadas
- [ ] `DATABASE_URL` configurada no ambiente de produção
- [ ] Backup automático configurado
- [ ] SSL/TLS habilitado na conexão MySQL (se remoto)
- [ ] Firewall configurado para permitir conexão MySQL
- [ ] Logs de erro monitorados
- [ ] Teste de carga realizado

## 🔗 Recursos Adicionais

- **MySQL Enterprise Edition Docs**: https://dev.mysql.com/doc/
- **Drizzle ORM MySQL**: https://orm.drizzle.team/docs/get-started-mysql
- **mysql2 Package**: https://github.com/sidorares/node-mysql2

## 💡 Próximos Passos Recomendados

1. **Monitoramento**: Configure alertas para falhas de conexão
2. **Replicação**: Setup de replica para alta disponibilidade
3. **Auditoria**: Ative MySQL Enterprise Audit para compliance
4. **Criptografia**: Use MySQL Enterprise Encryption para dados sensíveis
5. **Particionamento**: Se as tabelas crescerem muito (>1M linhas)

---

**Dúvidas?** Revise os scripts SQL em `MIGRACAO_MYSQL.md` ou verifique os logs de erro da aplicação.
