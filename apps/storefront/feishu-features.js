function parseFeishuBool(value, defaultValue = true) {
   if (value === undefined || value === null || value === '') return defaultValue
   if (typeof value === 'boolean') return value
   const s = String(value).trim().toLowerCase()
   if (['是', 'yes', 'true', '1', '开启', '开', 'on', '启用', 'y'].includes(s)) {
      return true
   }
   if (['否', 'no', 'false', '0', '关闭', '关', 'off', '禁用', 'n'].includes(s)) {
      return false
   }
   return defaultValue
}

function mapFeaturesFromStoreFields(fields = {}) {
   return {
      productReviews: parseFeishuBool(fields['开启商品评价'], true),
      blogComments: parseFeishuBool(fields['开启博客评论'], true),
      contactMessages: parseFeishuBool(fields['开启联系留言'], true),
   }
}

module.exports = { parseFeishuBool, mapFeaturesFromStoreFields }
