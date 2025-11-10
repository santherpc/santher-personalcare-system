import { sql } from "drizzle-orm";
import { mysqlTable, text, varchar, float, int, timestamp } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const authConfig = mysqlTable("auth_config", {
  id: int("id").primaryKey().default(1),
  accessCode: text("access_code").notNull(),
});

export const coletaGrupo1 = mysqlTable("coleta_grupo1", {
  id: int("id").primaryKey().autoincrement(),
  createdAt: timestamp("created_at").defaultNow(),
  dataColeta: varchar("data_coleta", { length: 255 }).notNull(),
  linhaProducao: varchar("linha_producao", { length: 255 }).notNull(),
  sku: varchar("sku", { length: 255 }).notNull().default(''),
  pesoSacolaVarpe: float("peso_sacola_varpe").notNull().default(0),
  parametroPainel: float("parametro_painel").default(0),
  acrisson: float("acrisson").default(0),
  velocidadeLinha: float("velocidade_linha").notNull(),
  coreAttach: float("core_attach").notNull(),
  coreWrap: float("core_wrap").notNull(),
  surge: float("surge").notNull(),
  cuffEnd: float("cuff_end").notNull(),
  bead: float("bead").notNull(),
  legElastic: float("leg_elastic").notNull(),
  cuffElastic: float("cuff_elastic").notNull(),
  temporary: float("temporary").notNull(),
  topsheet: float("topsheet").notNull(),
  backsheet: float("backsheet").notNull(),
  frontal: float("frontal").notNull(),
  earAttach: float("ear_attach").notNull(),
  pulpFix: float("pulp_fix").notNull(),
  central: float("central").notNull(),
  release: float("release").notNull(),
  tapeOnBag: float("tape_on_bag").notNull(),
  filme1x1: float("filme_1x1").notNull(),
});

export const coletaGrupo2 = mysqlTable("coleta_grupo2", {
  id: int("id").primaryKey().autoincrement(),
  createdAt: timestamp("created_at").defaultNow(),
  dataColeta: varchar("data_coleta", { length: 255 }).notNull(),
  linhaProducao: varchar("linha_producao", { length: 255 }).notNull(),
  sku: varchar("sku", { length: 255 }).notNull().default(''),
  pesoSacolaVarpe: float("peso_sacola_varpe").notNull().default(0),
  parametroPainel: float("parametro_painel").default(0),
  acrisson: float("acrisson").default(0),
  velocidadeLinha: float("velocidade_linha").notNull(),
  waistPacker: float("waist_packer").notNull(),
  isgElastic: float("isg_elastic").notNull(),
  waistElastic: float("waist_elastic").notNull(),
  isgSideSeal: float("isg_side_seal").notNull(),
  absorventFix: float("absorvent_fix").notNull(),
  outerEdge: float("outer_edge").notNull(),
  inner: float("inner").notNull(),
  bead: float("bead").notNull(),
  standingGather: float("standing_gather").notNull(),
  backflimFix: float("backflim_fix").notNull(),
  osgSideSeal: float("osg_side_seal").notNull(),
  osgElastico: float("osg_elastico").notNull(),
  nwSealContLateral: float("nw_seal_cont_lateral").notNull(),
  nwSealIntCentRal: float("nw_seal_int_cent_ral").notNull(),
  outSideBackFlm: float("out_side_back_flm").notNull(),
  topsheetFix: float("topsheet_fix").notNull(),
  coreWrap: float("core_wrap").notNull(),
  coreWrapSeal: float("core_wrap_seal").notNull(),
  matFix: float("mat_fix").notNull(),
});

export const insertColetaGrupo1Schema = createInsertSchema(coletaGrupo1).omit({
  id: true,
  createdAt: true,
});

export const insertColetaGrupo2Schema = createInsertSchema(coletaGrupo2).omit({
  id: true,
  createdAt: true,
});

export const insertAuthConfigSchema = createInsertSchema(authConfig).omit({
  id: true,
});

export type InsertAuthConfig = z.infer<typeof insertAuthConfigSchema>;
export type AuthConfig = typeof authConfig.$inferSelect;
export type InsertColetaGrupo1 = z.infer<typeof insertColetaGrupo1Schema>;
export type InsertColetaGrupo2 = z.infer<typeof insertColetaGrupo2Schema>;
export type ColetaGrupo1 = typeof coletaGrupo1.$inferSelect;
export type ColetaGrupo2 = typeof coletaGrupo2.$inferSelect;
