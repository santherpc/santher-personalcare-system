import postgres from 'postgres';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

const sql = postgres(DATABASE_URL);

async function createTables() {
  try {
    console.log('Creating tables...');
    
    // Create auth_config table
    await sql`
      CREATE TABLE IF NOT EXISTS "auth_config" (
        "id" integer PRIMARY KEY DEFAULT 1,
        "access_code" text NOT NULL
      )
    `;
    console.log('✓ auth_config table created');

    // Create coleta_grupo1 table
    await sql`
      CREATE TABLE IF NOT EXISTS "coleta_grupo1" (
        "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "created_at" timestamp DEFAULT now(),
        "data_coleta" varchar(255) NOT NULL,
        "linha_producao" varchar(255) NOT NULL,
        "sku" varchar(255) NOT NULL DEFAULT '',
        "peso_sacola_varpe" real NOT NULL DEFAULT 0,
        "parametro_painel" real DEFAULT 0,
        "acrisson" real DEFAULT 0,
        "velocidade_linha" real NOT NULL,
        "core_attach" real NOT NULL,
        "core_wrap" real NOT NULL,
        "surge" real NOT NULL,
        "cuff_end" real NOT NULL,
        "bead" real NOT NULL,
        "leg_elastic" real NOT NULL,
        "cuff_elastic" real NOT NULL,
        "temporary" real NOT NULL,
        "topsheet" real NOT NULL,
        "backsheet" real NOT NULL,
        "frontal" real NOT NULL,
        "ear_attach" real NOT NULL,
        "pulp_fix" real NOT NULL,
        "central" real NOT NULL,
        "release" real NOT NULL,
        "tape_on_bag" real NOT NULL,
        "filme_1x1" real NOT NULL
      )
    `;
    console.log('✓ coleta_grupo1 table created');

    // Create coleta_grupo2 table
    await sql`
      CREATE TABLE IF NOT EXISTS "coleta_grupo2" (
        "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "created_at" timestamp DEFAULT now(),
        "data_coleta" varchar(255) NOT NULL,
        "linha_producao" varchar(255) NOT NULL,
        "sku" varchar(255) NOT NULL DEFAULT '',
        "peso_sacola_varpe" real NOT NULL DEFAULT 0,
        "parametro_painel" real DEFAULT 0,
        "acrisson" real DEFAULT 0,
        "velocidade_linha" real NOT NULL,
        "waist_packer" real NOT NULL,
        "isg_elastic" real NOT NULL,
        "waist_elastic" real NOT NULL,
        "isg_side_seal" real NOT NULL,
        "absorvent_fix" real NOT NULL,
        "outer_edge" real NOT NULL,
        "inner" real NOT NULL,
        "bead" real NOT NULL,
        "standing_gather" real NOT NULL,
        "backflim_fix" real NOT NULL,
        "osg_side_seal" real NOT NULL,
        "osg_elastico" real NOT NULL,
        "nw_seal_cont_lateral" real NOT NULL,
        "nw_seal_int_cent_ral" real NOT NULL,
        "out_side_back_flm" real NOT NULL,
        "topsheet_fix" real NOT NULL,
        "core_wrap" real NOT NULL,
        "core_wrap_seal" real NOT NULL,
        "mat_fix" real NOT NULL
      )
    `;
    console.log('✓ coleta_grupo2 table created');

    // Insert default access code
    await sql`
      INSERT INTO "auth_config" ("id", "access_code") 
      VALUES (1, '1234') 
      ON CONFLICT ("id") DO NOTHING
    `;
    console.log('✓ Default access code inserted (1234)');

    console.log('\n✅ All tables created successfully!');
    console.log('You can now log in with code: 1234');
    
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

createTables();
