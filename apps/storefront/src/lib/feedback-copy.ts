import { getLocale } from '@/lib/locale'
import type { StorefrontTheme } from '@/lib/theme'

export type FeedbackCopy = {
   contactTitle: string
   contactDesc: string
   name: string
   email: string
   phone: string
   subject: string
   message: string
   submit: string
   submitting: string
   success: string
   error: string
   reviewsTitle: string
   reviewsEmpty: string
   writeReview: string
   rating: string
   reviewText: string
   reviewSubmit: string
   reviewPending: string
   reviewLogin: string
   reviewPurchaseRequired: string
   reviewAlready: string
   verifiedPurchase: string
   commentsTitle: string
   commentsEmpty: string
   commentName: string
   commentEmail: string
   commentText: string
   commentSubmit: string
   commentPending: string
   inquiryTitle: string
   inquirySubmit: string
}

const COPY: Record<string, FeedbackCopy> = {
   en: {
      contactTitle: 'Contact us',
      contactDesc: 'Questions, wholesale inquiries, or support — we reply within 1–2 business days.',
      name: 'Name',
      email: 'Email',
      phone: 'Phone (optional)',
      subject: 'Subject',
      message: 'Message',
      submit: 'Send message',
      submitting: 'Sending…',
      success: 'Message sent. We will get back to you soon.',
      error: 'Could not send. Please try again.',
      reviewsTitle: 'Customer reviews',
      reviewsEmpty: 'No reviews yet.',
      writeReview: 'Write a review',
      rating: 'Rating',
      reviewText: 'Your review',
      reviewSubmit: 'Submit review',
      reviewPending: 'Thank you — your review is pending approval.',
      reviewLogin: 'Sign in to write a review.',
      reviewPurchaseRequired: 'Only customers who purchased this product can leave a review.',
      reviewAlready: 'You already reviewed this product.',
      verifiedPurchase: 'Verified purchase',
      commentsTitle: 'Comments',
      commentsEmpty: 'No comments yet. Be the first to share your thoughts.',
      commentName: 'Name',
      commentEmail: 'Email (not published)',
      commentText: 'Comment',
      commentSubmit: 'Post comment',
      commentPending: 'Thank you — your comment is pending approval.',
      inquiryTitle: 'Product inquiry',
      inquirySubmit: 'Send inquiry',
   },
   zh: {
      contactTitle: '联系我们',
      contactDesc: '咨询、批发询价或售后问题，我们会在 1–2 个工作日内回复。',
      name: '姓名',
      email: '邮箱',
      phone: '电话（选填）',
      subject: '主题',
      message: '留言内容',
      submit: '发送留言',
      submitting: '发送中…',
      success: '留言已发送，我们会尽快回复您。',
      error: '发送失败，请稍后重试。',
      reviewsTitle: '用户评价',
      reviewsEmpty: '暂无评价。',
      writeReview: '写评价',
      rating: '评分',
      reviewText: '评价内容',
      reviewSubmit: '提交评价',
      reviewPending: '感谢提交，评价审核通过后将展示。',
      reviewLogin: '登录后可发表评价。',
      reviewPurchaseRequired: '仅购买过该商品的用户可以评价。',
      reviewAlready: '您已评价过该商品。',
      verifiedPurchase: '已购用户',
      commentsTitle: '评论',
      commentsEmpty: '暂无评论，欢迎留下第一条评论。',
      commentName: '昵称',
      commentEmail: '邮箱（不公开）',
      commentText: '评论内容',
      commentSubmit: '发表评论',
      commentPending: '感谢留言，评论审核通过后将展示。',
      inquiryTitle: '商品询价',
      inquirySubmit: '发送询价',
   },
   ja: {
      contactTitle: 'お問い合わせ',
      contactDesc: 'ご質問・卸売のご相談は 1〜2 営業日以内にご返信します。',
      name: 'お名前',
      email: 'メール',
      phone: '電話（任意）',
      subject: '件名',
      message: 'メッセージ',
      submit: '送信',
      submitting: '送信中…',
      success: '送信しました。折り返しご連絡いたします。',
      error: '送信に失敗しました。もう一度お試しください。',
      reviewsTitle: 'カスタマーレビュー',
      reviewsEmpty: 'レビューはまだありません。',
      writeReview: 'レビューを書く',
      rating: '評価',
      reviewText: 'レビュー内容',
      reviewSubmit: '投稿',
      reviewPending: '投稿ありがとうございます。承認後に公開されます。',
      reviewLogin: 'ログインしてレビューを投稿できます。',
      reviewPurchaseRequired: '購入済みのお客様のみレビューできます。',
      reviewAlready: 'すでにレビュー済みです。',
      verifiedPurchase: '購入済み',
      commentsTitle: 'コメント',
      commentsEmpty: 'コメントはまだありません。',
      commentName: 'お名前',
      commentEmail: 'メール（非公開）',
      commentText: 'コメント',
      commentSubmit: '投稿',
      commentPending: 'ありがとうございます。承認後に公開されます。',
      inquiryTitle: '商品のお問い合わせ',
      inquirySubmit: '送信',
   },
}

export function getFeedbackCopy(): FeedbackCopy {
   const lang = getLocale().language
   return COPY[lang] || COPY[lang.split('-')[0]] || COPY.en
}

export function feedbackSectionClass(theme: StorefrontTheme): string {
   switch (theme) {
      case 'blog':
         return 'font-serif'
      case 'corporate':
         return 'rounded-lg border bg-card p-6 shadow-sm'
      default:
         return 'rounded-lg border p-6'
   }
}
