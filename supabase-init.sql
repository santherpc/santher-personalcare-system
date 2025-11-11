-- UFHPC Produção - Schema do Banco de Dados
-- Execute este script no SQL Editor do Supabase para criar todas as tabelas

-- Tabela de configuração de autenticação
CREATE TABLE IF NOT EXISTS auth_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  access_code TEXT NOT NULL
);

-- Inserir código de acesso padrão
INSERT INTO auth_config (id, access_code) 
VALUES (1, 'UFHPC@2025')
ON CONFLICT (id) DO NOTHING;

-- Tabela de coleta do Grupo 1
CREATE TABLE IF NOT EXISTS coleta_grupo1 (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at TIMESTAMP DEFAULT NOW(),
  data_coleta VARCHAR(255) NOT NULL,
  linha_producao VARCHAR(255) NOT NULL,
  sku VARCHAR(255) NOT NULL DEFAULT '',
  peso_sacola_varpe REAL NOT NULL DEFAULT 0,
  parametro_painel REAL DEFAULT 0,
  acrisson REAL DEFAULT 0,
  velocidade_linha REAL NOT NULL,
  core_attach REAL NOT NULL,
  core_wrap REAL NOT NULL,
  surge REAL NOT NULL,
  cuff_end REAL NOT NULL,
  bead REAL NOT NULL,
  leg_elastic REAL NOT NULL,
  cuff_elastic REAL NOT NULL,
  temporary REAL NOT NULL,
  topsheet REAL NOT NULL,
  backsheet REAL NOT NULL,
  frontal REAL NOT NULL,
  ear_attach REAL NOT NULL,
  pulp_fix REAL NOT NULL,
  central REAL NOT NULL,
  release REAL NOT NULL,
  tape_on_bag REAL NOT NULL,
  filme_1x1 REAL NOT NULL
);

-- Tabela de coleta do Grupo 2
CREATE TABLE IF NOT EXISTS coleta_grupo2 (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at TIMESTAMP DEFAULT NOW(),
  data_coleta VARCHAR(255) NOT NULL,
  linha_producao VARCHAR(255) NOT NULL,
  sku VARCHAR(255) NOT NULL DEFAULT '',
  peso_sacola_varpe REAL NOT NULL DEFAULT 0,
  parametro_painel REAL DEFAULT 0,
  acrisson REAL DEFAULT 0,
  velocidade_linha REAL NOT NULL,
  waist_packer REAL NOT NULL,
  isg_elastic REAL NOT NULL,
  waist_elastic REAL NOT NULL,
  isg_side_seal REAL NOT NULL,
  absorvent_fix REAL NOT NULL,
  outer_edge REAL NOT NULL,
  inner REAL NOT NULL,
  bead REAL NOT NULL,
  standing_gather REAL NOT NULL,
  backflim_fix REAL NOT NULL,
  osg_side_seal REAL NOT NULL,
  osg_elastico REAL NOT NULL,
  nw_seal_cont_lateral REAL NOT NULL,
  nw_seal_int_cent_ral REAL NOT NULL,
  out_side_back_flm REAL NOT NULL,
  topsheet_fix REAL NOT NULL,
  core_wrap REAL NOT NULL,
  core_wrap_seal REAL NOT NULL,
  mat_fix REAL NOT NULL
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_coleta_grupo1_data ON coleta_grupo1(data_coleta);
CREATE INDEX IF NOT EXISTS idx_coleta_grupo1_linha ON coleta_grupo1(linha_producao);
CREATE INDEX IF NOT EXISTS idx_coleta_grupo2_data ON coleta_grupo2(data_coleta);
CREATE INDEX IF NOT EXISTS idx_coleta_grupo2_linha ON coleta_grupo2(linha_producao);

-- Comentários nas tabelas
COMMENT ON TABLE auth_config IS 'Configuração de autenticação do sistema';
COMMENT ON TABLE coleta_grupo1 IS 'Dados de coleta de produção do Grupo 1';
COMMENT ON TABLE coleta_grupo2 IS 'Dados de coleta de produção do Grupo 2';
