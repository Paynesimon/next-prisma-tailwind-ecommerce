// db-push-client.js
// 功能：对指定客户 Neon 数据库执行 prisma db push（schema 同步）
// 用法：
//   node db-push-client.js client001
//   node db-push-client.js client001 client002
//   node db-push-client.js --all          # 飞书店铺表全部客户ID

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function loadEnvFile(filePath) {
   if (!fs.existsSync(filePath)) return
   for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      let val = trimmed.slice(eq + 1).trim()
      if (
         (val.startsWith('"') && val.endsWith('"')) ||
         (val.startsWith("'") && val.endsWith("'"))
      ) {
         val = val.slice(1, -1)
      }
      if (!process.env[key]) process.env[key] = val
   }
}

loadEnvFile(path.join(__dirname, '.env'))
loadEnvFile(path.join(__dirname, '.env.local'))

const FEISHU_APP_ID = process.env.FEISHU_APP_ID || 'YOUR_FEISHU_APP_ID'
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET || 'YOUR_FEISHU_APP_SECRET'
const FEISHU_APP_TOKEN = process.env.FEISHU_APP_TOKEN || 'YOUR_FEISHU_APP_TOKEN'
const FEISHU_TABLES = { store: 'tblAn8PI1eoduVkn' }
const NEON_API_KEY = process.env.NEON_API_KEY || 'YOUR_NEON_API_KEY'
const NEON_ORG_ID = process.env.NEON_ORG_ID || 'YOUR_NEON_ORG_ID'

const STOREFRONT_DIR = __dirname
const ADMIN_DIR = path.join(__dirname, '..', 'admin')

function log(emoji, msg) {
   console.log(`${emoji}  ${msg}`)
}

async function getFeishuToken() {
   const res = await fetch(
      'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
      {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ app_id: FEISHU_APP_ID, app_secret: FEISHU_APP_SECRET }),
      }
   )
   const data = await res.json()
   return data.tenant_access_token
}

async function getStoreClientIds() {
   const token = await getFeishuToken()
   const res = await fetch(
      `https://open.feishu.cn/open-apis/bitable/v1/apps/${FEISHU_APP_TOKEN}/tables/${FEISHU_TABLES.store}/records`,
      { headers: { Authorization: `Bearer ${token}` } }
   )
   const data = await res.json()
   const ids = new Set()
   for (const row of data.data?.items || []) {
      const id = String(row.fields['客户ID'] || '').trim()
      if (id) ids.add(id)
   }
   return [...ids]
}

async function getConnectionString(clientId) {
   const projectName = `shop-${clientId}`
   const listRes = await fetch(
      `https://console.neon.tech/api/v2/projects?org_id=${NEON_ORG_ID}`,
      { headers: { Authorization: `Bearer ${NEON_API_KEY}` } }
   )
   const listData = await listRes.json()
   const project = listData.projects?.find((p) => p.name === projectName)
   if (!project) throw new Error(`找不到客户数据库：${projectName}`)

   const connRes = await fetch(
      `https://console.neon.tech/api/v2/projects/${project.id}/connection_uri?role_name=neondb_owner&database_name=neondb`,
      { headers: { Authorization: `Bearer ${NEON_API_KEY}` } }
   )
   const connData = await connRes.json()
   if (!connData.uri) throw new Error('无法获取数据库连接字符串')
   return connData.uri
}

function runDbPush(appDir, connectionString) {
   execSync('npx prisma db push --skip-generate', {
      cwd: appDir,
      stdio: 'inherit',
      env: { ...process.env, DATABASE_URL: connectionString },
   })
}

async function pushSchemaForClient(clientId, { includeAdmin = false } = {}) {
   log('🔄', `同步 schema：${clientId}`)
   const connectionString = await getConnectionString(clientId)
   runDbPush(STOREFRONT_DIR, connectionString)
   log('✅', `Storefront schema 已同步：${clientId}`)
   if (includeAdmin) {
      runDbPush(ADMIN_DIR, connectionString)
      log('✅', `Admin schema 已同步：${clientId}`)
   }
}

async function main() {
   const args = process.argv.slice(2)
   const includeAdmin = args.includes('--admin')
   const useAll = args.includes('--all')
   const clientIds = args.filter((a) => !a.startsWith('--'))

   if (!useAll && !clientIds.length) {
      console.log('用法: node db-push-client.js [--admin] client001 [client002 ...]')
      console.log('      node db-push-client.js [--admin] --all')
      process.exit(1)
   }

   let targets = clientIds
   if (useAll) {
      targets = await getStoreClientIds()
      if (!targets.length) throw new Error('飞书店铺表未找到任何客户ID')
      log('📋', `共 ${targets.length} 个客户：${targets.join(', ')}`)
   }

   for (const clientId of targets) {
      await pushSchemaForClient(clientId, { includeAdmin })
   }

   log('🎉', '全部完成')
}

if (require.main === module) {
   main().catch((error) => {
      console.error('\n❌ 出错了：', error.message)
      process.exit(1)
   })
}

module.exports = { pushSchemaForClient, getConnectionString }
