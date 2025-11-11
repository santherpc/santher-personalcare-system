# Prompt para Análise e Limpeza Profunda de Projeto React/TypeScript

## OBJETIVO PRINCIPAL
Realizar uma análise completa e precisa do projeto React + TypeScript + Tailwind + Node.js para identificar e remover arquivos/pastas não utilizados, mantendo a integridade e funcionalidade do projeto.

## INSTRUÇÕES DETALHADAS

### 1. ANÁLISE INICIAL - MAPEAMENTO COMPLETO
- Escaneie toda a estrutura do projeto recursivamente
- Identifique todos os arquivos .ts, .tsx, .js, .jsx, .json, .css, .scss, .md
- Mapeie todas as importações e dependências entre arquivos
- Analise package.json para dependências instaladas vs utilizadas
- Verifique arquivos de configuração (tsconfig.json, tailwind.config.js, etc.)

### 2. ANÁLISE GRANULAR DE CÓDIGO E DEPENDÊNCIAS

#### VASCULHAMENTO LINHA POR LINHA:
**PRINCIPAIS PASTAS A EXAMINAR:**
- `/src/components/` - cada componente e suas funções
- `/src/hooks/` - custom hooks e suas exportações
- `/src/utils/` - funções utilitárias e helpers
- `/src/services/` - APIs e serviços
- `/src/types/` - interfaces e types TypeScript
- `/src/constants/` - constantes e configurações
- `/src/contexts/` - contexts React não utilizados
- `/src/store/` - estado global (Redux, Zustand, etc.)
- `/src/assets/` - imagens, ícones, fonts
- `/src/styles/` - CSS/SCSS modules

#### ANÁLISE MICRO-LEVEL POR ARQUIVO:
Para cada arquivo identificado, examine:

**EXPORTS NÃO UTILIZADOS:**
```typescript
// Identifique exports que não são importados em lugar nenhum
export const unusedFunction = () => {} // ← Pode deletar se não usado
export interface UnusedInterface {} // ← Pode deletar se não usado
export { UnusedComponent } // ← Pode deletar se não usado
```

**IMPORTS NÃO UTILIZADOS:**
```typescript
// Imports que existem mas não são usados no arquivo
import { unusedImport, usedImport } from 'library' // ← Remover só unusedImport
import UnusedComponent from './Component' // ← Pode remover linha inteira
```

**VARIÁVEIS/CONSTANTES NÃO REFERENCIADAS:**
```typescript
const UNUSED_CONSTANT = 'value' // ← Deletar se não usado
const usedConstant = 'value' // ← Manter
```

**FUNÇÕES INTERNAS NÃO CHAMADAS:**
```typescript
function internalUnusedFunction() {} // ← Deletar se não chamada
const unusedArrowFunction = () => {} // ← Deletar se não chamada
```

**TIPOS/INTERFACES TYPESCRIPT NÃO REFERENCIADOS:**
```typescript
interface UnusedInterface {} // ← Deletar se não usado
type UnusedType = string // ← Deletar se não usado
```

#### ANÁLISE DE DEPENDÊNCIAS E IMPORTS:
- Trace todas as importações starting from:
  - Entry points (main.tsx, index.tsx, App.tsx)
  - Arquivos de configuração
  - Scripts no package.json
  - Arquivos referenciados em HTML
- Construa um grafo de dependências completo
- Identifique imports circulares ou problemáticos
- Verifique imports dinâmicos (import(), require())
- Analise imports de assets (imagens, fonts, etc.)

### 3. ANÁLISE ESPECÍFICA POR TIPO DE ARQUIVO

#### COMPONENTES REACT (.tsx, .jsx)
- Verifique se estão sendo importados/utilizados
- Analise exports default e named exports
- Confirme uso em rotas, lazy loading, ou renderização condicional
- Verifique referências em arquivos de configuração

#### UTILITIES E HELPERS (.ts, .js)
- Confirme uso de todas as funções exportadas
- Identifique funções não utilizadas dentro de arquivos utilizados
- Verifique tipos/interfaces TypeScript não referenciados

#### ASSETS E ARQUIVOS ESTÁTICOS
- Imagens, fonts, ícones não referenciados
- Arquivos CSS/SCSS não importados
- Arquivos JSON não utilizados

#### ARQUIVOS DE CONFIGURAÇÃO
- Configs obsoletos ou duplicados
- Arquivos de ambiente não utilizados

### 4. VERIFICAÇÕES DE SEGURANÇA ULTRA-CRÍTICAS ANTES DA REMOÇÃO

#### ANÁLISE PROFUNDA OBRIGATÓRIA - CHECKLIST EXPANDIDO:

**VERIFICAÇÃO DE REFERÊNCIAS INDIRETAS:**
- [ ] Usado em string templates ou concatenações?
- [ ] Referenciado em arquivos .json (package.json, tsconfig, etc.)?
- [ ] Usado em comentários JSDoc importantes?
- [ ] Importado via require() dinâmico?
- [ ] Usado em eval() ou execução dinâmica?
- [ ] Referenciado em arquivos de configuração (webpack, vite, etc.)?
- [ ] Usado em variáveis de ambiente ou .env?
- [ ] Importado em testes unitários/integration/e2e?

**VERIFICAÇÃO DE USO CONDICIONAL:**
- [ ] Usado apenas em development mode?
- [ ] Usado apenas em production builds?
- [ ] Importado via lazy loading ou code splitting?
- [ ] Usado em feature flags ou conditional rendering?
- [ ] Referenciado em HOCs (Higher Order Components)?
- [ ] Usado em render props ou children functions?

**VERIFICAÇÃO DE CONTEXTO DE FRAMEWORK:**
- [ ] Usado em React.memo, React.forwardRef?
- [ ] Referenciado em useCallback, useMemo dependencies?
- [ ] Usado em Context Providers?
- [ ] Importado em rotas do React Router?
- [ ] Usado em middlewares ou interceptors?
- [ ] Referenciado em error boundaries?

**VERIFICAÇÃO DE METADADOS E BUILD:**
- [ ] Usado em manifestos (PWA, browser extension)?
- [ ] Referenciado em serviceworkers?
- [ ] Usado em scripts de build customizados?
- [ ] Importado em arquivos de internacionalização (i18n)?
- [ ] Usado em schemas de validação (Yup, Zod, etc.)?

#### ANÁLISE DE IMPACTO ANTES DA REMOÇÃO:

**PARA CADA LINHA/FUNÇÃO IDENTIFICADA:**
1. **Busca Global**: Procurar referências em TODOS os arquivos do projeto
2. **Análise de String**: Verificar se nome aparece em strings ou templates
3. **Verificação de Tipos**: Confirmar se tipos TypeScript não quebrarão
4. **Teste de Build**: Simular remoção e testar build
5. **Análise de Runtime**: Verificar se pode ser chamado dinamicamente

**COMANDO DE VERIFICAÇÃO ANTES DE DELETAR:**
```bash
# Para cada item identificado, execute:
grep -r "nomeDoItem" . --exclude-dir=node_modules
grep -r "nomeDoItem" . --include="*.json"
grep -r "nomeDoItem" . --include="*.md"
grep -r "nomeDoItem" . --include="*.yml"
grep -r "nomeDoItem" . --include="*.yaml"
```

### 5. CATEGORIAS DE ARQUIVOS A ANALISAR

#### SEGUROS PARA REMOÇÃO (após confirmação):
- Componentes React não importados
- Utilities/helpers não utilizados
- Assets não referenciados
- Arquivos de teste para código removido
- Arquivos de configuração obsoletos
- Dependencies não utilizadas no package.json

#### NUNCA REMOVER:
- package.json, package-lock.json, yarn.lock
- tsconfig.json, tailwind.config.js
- .env files, .gitignore
- README.md, LICENSE
- Arquivos de configuração do IDE
- node_modules/ (obviamente)
- dist/, build/ (deixar ao usuário decidir)

### 6. PROCESSO DE EXECUÇÃO ULTRA-SEGURO

#### FASE 1 - ANÁLISE GRANULAR SEM REMOÇÃO:
1. **Scan Completo**: Mapear toda estrutura do projeto
2. **Análise Linha por Linha**: Examinar cada export, import, função, variável
3. **Verificação Cruzada**: Confirmar uso de cada elemento identificado
4. **Classificação de Risco**: Categorizar por nível de segurança
5. **Relatório Detalhado**: Gerar lista específica com evidências

#### FASE 2 - VERIFICAÇÃO TRIPLE-CHECK:
1. **Busca Global**: grep em todos os arquivos por cada item
2. **Análise Contextual**: Verificar uso em comentários, strings, configs
3. **Teste Simulado**: Simular remoção sem executar
4. **Validação de Tipos**: Confirmar que TypeScript não quebra
5. **Aprovação Manual**: Solicitar confirmação para cada item

#### FASE 3 - REMOÇÃO INCREMENTAL E TESTADA:
1. **Backup Automático**: Criar branch/commit antes de cada remoção
2. **Remoção Individual**: Um item por vez, não em lote
3. **Teste Imediato**: Build + lint + test após cada remoção
4. **Rollback Automático**: Reverter se qualquer teste falhar
5. **Log Detalhado**: Registrar cada ação para auditoria

#### COMANDOS DE VERIFICAÇÃO OBRIGATÓRIOS:

**ANTES DE CADA REMOÇÃO:**
```bash
# Verificação global de referências
grep -r "NOME_DO_ITEM" . --exclude-dir=node_modules --exclude-dir=.git

# Verificação em arquivos de configuração
find . -name "*.json" -o -name "*.js" -o -name "*.ts" | xargs grep "NOME_DO_ITEM"

# Verificação em testes
find . -path "*/test/*" -o -path "*/__tests__/*" -o -name "*.test.*" -o -name "*.spec.*" | xargs grep "NOME_DO_ITEM"

# Verificação TypeScript
npx tsc --noEmit --skipLibCheck
```

**APÓS CADA REMOÇÃO:**
```bash
# Build completo
npm run build

# Verificação de tipos
npx tsc --noEmit

# Linting
npm run lint

# Testes automatizados
npm test

# Verificação de imports
npx eslint . --ext .js,.jsx,.ts,.tsx --rule 'import/no-unresolved: error'
```

### 7. COMANDOS E FERRAMENTAS

#### PARA ANÁLISE:
```bash
# Encontrar arquivos não importados
npx unimported

# Verificar dependências não utilizadas
npx depcheck

# Análise de bundle
npx webpack-bundle-analyzer
```

#### PARA VERIFICAÇÃO PÓS-LIMPEZA:
```bash
# Verificar build
npm run build

# Verificar tipos TypeScript
npx tsc --noEmit

# Verificar linting
npm run lint

# Rodar testes
npm test
```

### 8. RELATÓRIO FINAL NECESSÁRIO - NÍVEL GRANULAR

Após a análise, forneça:

#### RESUMO EXECUTIVO:
- Total de arquivos analisados
- Total de linhas de código examinadas
- Exports/imports não utilizados identificados
- Funções/variáveis não referenciadas encontradas
- Espaço em disco a ser liberado
- Tempo estimado para limpeza segura

#### DETALHAMENTO MICRO-LEVEL:

**CATEGORIA: EXPORTS NÃO UTILIZADOS**
```
Arquivo: src/utils/helpers.ts
- Linha 15: export const unusedHelper = () => {} 
- Evidência: 0 imports encontrados em todo projeto
- Segurança: ALTA - Pode remover com segurança
- Impacto: Reduz 3 linhas, 156 bytes
```

**CATEGORIA: IMPORTS NÃO UTILIZADOS**
```
Arquivo: src/components/Button.tsx  
- Linha 3: import { unusedIcon } from 'lucide-react'
- Evidência: Importado mas não usado no componente
- Segurança: ALTA - Pode remover import específico
- Impacto: Reduz bundle size em ~2KB
```

**CATEGORIA: FUNÇÕES INTERNAS NÃO CHAMADAS**
```
Arquivo: src/hooks/useCustomHook.ts
- Linha 25-30: function internalHelper() {...}
- Evidência: Definida mas nunca chamada no hook
- Segurança: MÉDIA - Verificar se não é callback futuro
- Impacto: Reduz 6 linhas, 234 bytes
```

**CATEGORIA: TIPOS/INTERFACES NÃO REFERENCIADOS**
```
Arquivo: src/types/api.ts
- Linha 12: interface UnusedApiResponse {}
- Evidência: 0 referências em arquivos .ts/.tsx
- Segurança: ALTA - Não impacta runtime
- Impacto: Reduz 4 linhas, 145 bytes
```

#### ANÁLISE DE RISCO POR ITEM:
- **RISCO ZERO** (verde): Pode deletar imediatamente
- **RISCO BAIXO** (amarelo): Revisar uma vez antes de deletar  
- **RISCO MÉDIO** (laranja): Análise manual obrigatória
- **RISCO ALTO** (vermelho): NÃO DELETAR sem investigação profunda

#### IMPACTO QUANTIFICADO:
- **Redução de Bundle**: X KB menos no build final
- **Linhas de Código**: X linhas removidas 
- **Complexidade**: Redução de X% na complexidade ciclomática
- **Manutenibilidade**: Melhoria no índice de manutenibilidade

#### LOG DE VERIFICAÇÕES REALIZADAS:
```
✅ Busca global por referências: 847 arquivos verificados
✅ Análise de strings/templates: 0 referências indiretas encontradas  
✅ Verificação de configurações: package.json, tsconfig.json, etc.
✅ Análise de testes: 23 arquivos de teste verificados
✅ Verificação TypeScript: Sem erros de tipo
✅ Análise de comentários: Nenhuma documentação perdida
```

### 9. VALIDAÇÕES FINAIS

Após qualquer remoção, execute:
- `npm run build` - confirmar build funciona
- `npm run dev` - confirmar desenvolvimento funciona
- `npm test` - confirmar testes passam
- Verificação manual das principais funcionalidades

## IMPORTANTE: ORDEM DE PRIORIDADE ULTRA-SEGURA

### PRIMEIRO: ANÁLISE GRANULAR COMPLETA
1. **Scan Linha por Linha**: Examinar cada export, import, função, variável
2. **Verificação Cruzada Tripla**: Confirmar não-uso com 3 métodos diferentes
3. **Relatório Detalhado**: Lista específica com evidências de cada item
4. **Classificação de Risco**: Categorizar cada item por nível de segurança

### SEGUNDO: REMOÇÃO MICRO-INCREMENTAL  
1. **Apenas Risco ZERO**: Começar só com itens de segurança absoluta
2. **Um Item Por Vez**: NUNCA remover múltiplos itens simultaneamente
3. **Teste Após Cada Remoção**: Build + lint + test + verificação manual
4. **Rollback Imediato**: Se qualquer erro, reverter automaticamente

### TERCEIRO: EXPANSÃO CAUTELOSA
1. **Risco Baixo**: Apenas após todos os itens de risco zero
2. **Aprovação Manual**: Solicitar confirmação para cada item
3. **Teste Extensivo**: Verificação funcional completa
4. **Documentação**: Log detalhado de cada ação realizada

### CRITÉRIOS DE PARADA ABSOLUTOS

**INTERROMPA IMEDIATAMENTE SE:**
- Qualquer teste falhar após remoção
- Build começar a apresentar warnings novos  
- TypeScript reportar novos erros
- ESLint encontrar problemas de importação
- Funcionalidade core parar de funcionar
- Qualquer dúvida sobre segurança da remoção

### METODOLOGIA DE VERIFICAÇÃO TRIPLE-CHECK

**PARA CADA ITEM IDENTIFICADO:**

1. **CHECK 1 - Busca Textual Global:**
```bash
grep -r "NOME_EXATO" . --exclude-dir=node_modules --exclude-dir=.git
rg "NOME_EXATO" --type-not binary
```

2. **CHECK 2 - Análise de AST/Parsing:**
```bash
# Usar ferramentas como ts-morph ou @typescript-eslint/parser
# Para análise sintática precisa das referências
```

3. **CHECK 3 - Simulação de Remoção:**
```bash
# Comentar código temporariamente
# Executar build completo  
# Verificar se tudo funciona
# Só então fazer remoção definitiva
```

**SÓ PROCEDA COM REMOÇÃO SE OS 3 CHECKS CONFIRMAREM SEGURANÇA ABSOLUTA**

## CRITÉRIOS DE PARADA ABSOLUTOS

**INTERROMPA IMEDIATAMENTE E NÃO REMOVA NADA SE:**
- Qualquer grep retornar resultado positivo para o item
- Encontrar referência em comentários importantes/JSDoc
- Item aparecer em strings/templates mesmo que não usado
- TypeScript mostrar warnings sobre tipos não encontrados
- ESLint reportar problemas de imports após simulação
- Arquivo modificado nos últimos 7 dias (pode ser WIP)
- Qualquer dúvida mínima sobre impacto da remoção
- Build time aumentar após remoção (pode ser dependência oculta)

**REGRAS DE OURO:**
- **QUANDO EM DÚVIDA, NÃO REMOVA**
- **É melhor manter código "morto" do que quebrar o projeto**  
- **Prefira commenting out ao invés de deletar permanentemente**
- **Sempre teste em ambiente de desenvolvimento primeiro**
- **Nunca remova em batch - sempre individual**

### VALIDAÇÃO FINAL OBRIGATÓRIA

Antes de considerar qualquer remoção concluída:

1. **Teste Manual Completo**: Navegar por todas as funcionalidades principais
2. **Teste de Build**: `npm run build` deve executar sem erros/warnings
3. **Teste de Desenvolvimento**: `npm run dev` deve iniciar normalmente
4. **Teste de Tipos**: `npx tsc --noEmit` deve passar sem erros
5. **Teste de Linting**: `npm run lint` não deve reportar novos problemas
6. **Teste de Testes**: `npm test` deve manter mesma cobertura
7. **Verificação de Performance**: Bundle size não deve aumentar

**LEMBRE-SE**: O objetivo é LIMPEZA SEGURA, não limpeza agressiva. É infinitamente melhor manter 10 linhas desnecessárias do que quebrar 1 funcionalidade!