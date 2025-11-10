# Guia de Migração: PostgreSQL para MySQL Enterprise Edition

## 📋 Passo a Passo da Migração

### 1. Pré-requisitos
- MySQL Enterprise Edition instalado e rodando
- Acesso com privilégios de criação de banco de dados
- Backup dos dados atuais (se houver)

### 2. Criar o Banco de Dados MySQL

Execute este comando no seu servidor MySQL:

```sql
CREATE DATABASE ufhpc_producao 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE ufhpc_producao;
```

### 3. Criar as Tabelas

Execute os scripts SQL abaixo **na ordem apresentada** para criar todas as tabelas:

#### 3.1. Tabela auth_config (Configuração de Autenticação)

```sql
CREATE TABLE auth_config (
  id INT PRIMARY KEY DEFAULT 1,
  access_code TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir código de acesso padrão
INSERT INTO auth_config (id, access_code) VALUES (1, 'UFHPC@2025');
```

#### 3.2. Tabela coleta_grupo1 (Linhas de Produção L80-L94)

```sql
CREATE TABLE coleta_grupo1 (
  id INT PRIMARY KEY AUTO_INCREMENT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_coleta VARCHAR(255) NOT NULL,
  linha_producao VARCHAR(255) NOT NULL,
  sku VARCHAR(255) NOT NULL DEFAULT '',
  peso_sacola_varpe FLOAT NOT NULL DEFAULT 0,
  parametro_painel FLOAT DEFAULT 0,
  acrisson FLOAT DEFAULT 0,
  velocidade_linha FLOAT NOT NULL,
  core_attach FLOAT NOT NULL,
  core_wrap FLOAT NOT NULL,
  surge FLOAT NOT NULL,
  cuff_end FLOAT NOT NULL,
  bead FLOAT NOT NULL,
  leg_elastic FLOAT NOT NULL,
  cuff_elastic FLOAT NOT NULL,
  temporary FLOAT NOT NULL,
  topsheet FLOAT NOT NULL,
  backsheet FLOAT NOT NULL,
  frontal FLOAT NOT NULL,
  ear_attach FLOAT NOT NULL,
  pulp_fix FLOAT NOT NULL,
  central FLOAT NOT NULL,
  `release` FLOAT NOT NULL,
  tape_on_bag FLOAT NOT NULL,
  filme_1x1 FLOAT NOT NULL,
  
  -- Índice para evitar duplicatas
  UNIQUE KEY unique_coleta_grupo1 (data_coleta, linha_producao),
  
  -- Índices para performance
  INDEX idx_data_coleta_g1 (data_coleta),
  INDEX idx_linha_producao_g1 (linha_producao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 3.3. Tabela coleta_grupo2 (Linhas de Produção L84-L85)

```sql
CREATE TABLE coleta_grupo2 (
  id INT PRIMARY KEY AUTO_INCREMENT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_coleta VARCHAR(255) NOT NULL,
  linha_producao VARCHAR(255) NOT NULL,
  sku VARCHAR(255) NOT NULL DEFAULT '',
  peso_sacola_varpe FLOAT NOT NULL DEFAULT 0,
  parametro_painel FLOAT DEFAULT 0,
  acrisson FLOAT DEFAULT 0,
  velocidade_linha FLOAT NOT NULL,
  waist_packer FLOAT NOT NULL,
  isg_elastic FLOAT NOT NULL,
  waist_elastic FLOAT NOT NULL,
  isg_side_seal FLOAT NOT NULL,
  absorvent_fix FLOAT NOT NULL,
  outer_edge FLOAT NOT NULL,
  inner FLOAT NOT NULL,
  bead FLOAT NOT NULL,
  standing_gather FLOAT NOT NULL,
  backflim_fix FLOAT NOT NULL,
  osg_side_seal FLOAT NOT NULL,
  osg_elastico FLOAT NOT NULL,
  nw_seal_cont_lateral FLOAT NOT NULL,
  nw_seal_int_cent_ral FLOAT NOT NULL,
  out_side_back_flm FLOAT NOT NULL,
  topsheet_fix FLOAT NOT NULL,
  core_wrap FLOAT NOT NULL,
  core_wrap_seal FLOAT NOT NULL,
  mat_fix FLOAT NOT NULL,
  
  -- Índice para evitar duplicatas
  UNIQUE KEY unique_coleta_grupo2 (data_coleta, linha_producao),
  
  -- Índices para performance
  INDEX idx_data_coleta_g2 (data_coleta),
  INDEX idx_linha_producao_g2 (linha_producao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 4. Verificar a Criação das Tabelas

Execute este comando para verificar se todas as tabelas foram criadas:

```sql
SHOW TABLES;

-- Deve mostrar:
-- auth_config
-- coleta_grupo1
-- coleta_grupo2
```

Para ver a estrutura de cada tabela:

```sql
DESCRIBE auth_config;
DESCRIBE coleta_grupo1;
DESCRIBE coleta_grupo2;
```

### 5. Configurar Usuário e Permissões (Opcional mas Recomendado)

```sql
-- Criar usuário específico para a aplicação
CREATE USER 'ufhpc_app'@'localhost' IDENTIFIED BY 'sua_senha_forte_aqui';

-- Conceder permissões apenas no banco de dados da aplicação
GRANT SELECT, INSERT, UPDATE, DELETE ON ufhpc_producao.* TO 'ufhpc_app'@'localhost';

-- Se o app estiver em outro servidor, use:
-- CREATE USER 'ufhpc_app'@'%' IDENTIFIED BY 'sua_senha_forte_aqui';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ufhpc_producao.* TO 'ufhpc_app'@'%';

FLUSH PRIVILEGES;
```

### 6. Otimizações Recomendadas para MySQL Enterprise

```sql
-- Configurações específicas para o banco de dados
ALTER DATABASE ufhpc_producao 
  CHARACTER SET = utf8mb4 
  COLLATE = utf8mb4_unicode_ci;

-- Ativar strict mode (recomendado para integridade de dados)
SET GLOBAL sql_mode = 'TRADITIONAL,NO_AUTO_VALUE_ON_ZERO';
```

### 7. Script Completo (Copie e Cole Tudo de Uma Vez)

```sql
-- ========================================
-- SCRIPT COMPLETO DE MIGRAÇÃO MYSQL
-- Aplicação: UFHPC Produção
-- Data: Novembro 2025
-- ========================================

-- 1. Criar banco de dados
CREATE DATABASE IF NOT EXISTS ufhpc_producao 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE ufhpc_producao;

-- 2. Criar tabela de autenticação
CREATE TABLE IF NOT EXISTS auth_config (
  id INT PRIMARY KEY DEFAULT 1,
  access_code TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO auth_config (id, access_code) VALUES (1, 'UFHPC@2025')
ON DUPLICATE KEY UPDATE access_code = 'UFHPC@2025';

-- 3. Criar tabela coleta_grupo1
CREATE TABLE IF NOT EXISTS coleta_grupo1 (
  id INT PRIMARY KEY AUTO_INCREMENT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_coleta VARCHAR(255) NOT NULL,
  linha_producao VARCHAR(255) NOT NULL,
  sku VARCHAR(255) NOT NULL DEFAULT '',
  peso_sacola_varpe FLOAT NOT NULL DEFAULT 0,
  parametro_painel FLOAT DEFAULT 0,
  acrisson FLOAT DEFAULT 0,
  velocidade_linha FLOAT NOT NULL,
  core_attach FLOAT NOT NULL,
  core_wrap FLOAT NOT NULL,
  surge FLOAT NOT NULL,
  cuff_end FLOAT NOT NULL,
  bead FLOAT NOT NULL,
  leg_elastic FLOAT NOT NULL,
  cuff_elastic FLOAT NOT NULL,
  temporary FLOAT NOT NULL,
  topsheet FLOAT NOT NULL,
  backsheet FLOAT NOT NULL,
  frontal FLOAT NOT NULL,
  ear_attach FLOAT NOT NULL,
  pulp_fix FLOAT NOT NULL,
  central FLOAT NOT NULL,
  `release` FLOAT NOT NULL,
  tape_on_bag FLOAT NOT NULL,
  filme_1x1 FLOAT NOT NULL,
  UNIQUE KEY unique_coleta_grupo1 (data_coleta, linha_producao),
  INDEX idx_data_coleta_g1 (data_coleta),
  INDEX idx_linha_producao_g1 (linha_producao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Criar tabela coleta_grupo2
CREATE TABLE IF NOT EXISTS coleta_grupo2 (
  id INT PRIMARY KEY AUTO_INCREMENT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_coleta VARCHAR(255) NOT NULL,
  linha_producao VARCHAR(255) NOT NULL,
  sku VARCHAR(255) NOT NULL DEFAULT '',
  peso_sacola_varpe FLOAT NOT NULL DEFAULT 0,
  parametro_painel FLOAT DEFAULT 0,
  acrisson FLOAT DEFAULT 0,
  velocidade_linha FLOAT NOT NULL,
  waist_packer FLOAT NOT NULL,
  isg_elastic FLOAT NOT NULL,
  waist_elastic FLOAT NOT NULL,
  isg_side_seal FLOAT NOT NULL,
  absorvent_fix FLOAT NOT NULL,
  outer_edge FLOAT NOT NULL,
  inner FLOAT NOT NULL,
  bead FLOAT NOT NULL,
  standing_gather FLOAT NOT NULL,
  backflim_fix FLOAT NOT NULL,
  osg_side_seal FLOAT NOT NULL,
  osg_elastico FLOAT NOT NULL,
  nw_seal_cont_lateral FLOAT NOT NULL,
  nw_seal_int_cent_ral FLOAT NOT NULL,
  out_side_back_flm FLOAT NOT NULL,
  topsheet_fix FLOAT NOT NULL,
  core_wrap FLOAT NOT NULL,
  core_wrap_seal FLOAT NOT NULL,
  mat_fix FLOAT NOT NULL,
  UNIQUE KEY unique_coleta_grupo2 (data_coleta, linha_producao),
  INDEX idx_data_coleta_g2 (data_coleta),
  INDEX idx_linha_producao_g2 (linha_producao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Verificar criação
SHOW TABLES;

-- ========================================
-- SCRIPT CONCLUÍDO COM SUCESSO
-- ========================================
```

## 📊 Diferenças Importantes: PostgreSQL vs MySQL

| Recurso | PostgreSQL | MySQL |
|---------|-----------|-------|
| Auto-increment | SERIAL | AUTO_INCREMENT |
| Timestamp | TIMESTAMP | TIMESTAMP |
| Texto | TEXT | TEXT |
| Números decimais | REAL | FLOAT |
| Inteiros | INTEGER | INT |
| Constraint único | UNIQUE | UNIQUE KEY |

## ✅ Checklist de Validação

Após executar os scripts, verifique:

- [ ] Banco de dados `ufhpc_producao` criado
- [ ] Tabela `auth_config` criada com código de acesso
- [ ] Tabela `coleta_grupo1` criada com todas as colunas
- [ ] Tabela `coleta_grupo2` criada com todas as colunas
- [ ] Índices criados para performance
- [ ] Constraints de unicidade funcionando

## 🔧 Testes de Validação

Execute estes comandos para testar:

```sql
-- Teste 1: Inserir dados no grupo 1
INSERT INTO coleta_grupo1 (
  data_coleta, linha_producao, velocidade_linha,
  core_attach, core_wrap, surge, cuff_end, bead,
  leg_elastic, cuff_elastic, temporary, topsheet,
  backsheet, frontal, ear_attach, pulp_fix,
  central, `release`, tape_on_bag, filme_1x1
) VALUES (
  '2025-11-07', 'L80', 150.5,
  10.1, 10.2, 10.3, 10.4, 10.5,
  10.6, 10.7, 10.8, 10.9, 11.0,
  11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7
);

-- Teste 2: Consultar dados
SELECT * FROM coleta_grupo1 ORDER BY created_at DESC LIMIT 1;

-- Teste 3: Teste de unicidade (deve dar erro)
INSERT INTO coleta_grupo1 (
  data_coleta, linha_producao, velocidade_linha,
  core_attach, core_wrap, surge, cuff_end, bead,
  leg_elastic, cuff_elastic, temporary, topsheet,
  backsheet, frontal, ear_attach, pulp_fix,
  central, `release`, tape_on_bag, filme_1x1
) VALUES (
  '2025-11-07', 'L80', 150.5,
  10.1, 10.2, 10.3, 10.4, 10.5,
  10.6, 10.7, 10.8, 10.9, 11.0,
  11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7
);
-- Deve retornar erro: Duplicate entry

-- Limpar teste
DELETE FROM coleta_grupo1 WHERE data_coleta = '2025-11-07';
```

## 🔐 Segurança

Após a migração, considere:

1. **Backup Regular**: Configure backup automático
   ```bash
   mysqldump -u root -p ufhpc_producao > backup_$(date +%Y%m%d).sql
   ```

2. **Auditoria**: Ative logs de auditoria do MySQL Enterprise
   ```sql
   INSTALL PLUGIN audit_log SONAME 'audit_log.so';
   SET GLOBAL audit_log_policy = 'ALL';
   ```

3. **Criptografia**: Use MySQL Enterprise Encryption para dados sensíveis

## 📞 Próximos Passos

Depois de criar as tabelas no MySQL:

1. Configure a string de conexão no código da aplicação
2. Instale o driver MySQL para Node.js: `mysql2`
3. Atualize o Drizzle ORM para usar MySQL
4. Migre dados existentes (se houver)
5. Teste a aplicação completamente

## 💡 Dicas

- Use **MySQL Workbench** para gerenciar visualmente o banco
- Ative **slow query log** para otimizar consultas lentas
- Configure **replicação** para alta disponibilidade
- Use **particionamento** se as tabelas crescerem muito (>1M linhas)
