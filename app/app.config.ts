// ビバップ高校のブランド情報。Header / Footer / useSeo / useForm から参照する。
// 型は `shared/types/brand.ts`（monorepo では `packages/core/app/types/brand.ts`）。
// appConfig はビルド時定数。環境依存値は runtimeConfig / .env.* へ。
export default defineAppConfig({
  brand: {
    siteName: 'ビバップ高校',
    siteUrl: 'https://vhs-city.com/vebophighschool',
    description:
      'VTuber事務所「ビバップ高校」。合言葉は「型通りより型破り」。ジャンル問わずマルチタレントユニットをプロデュース。',
    ogImage: 'https://vhs-city.com/vebophighschool/ogp_main.png',
    copyright: '© ビバップ高校 / viviON Inc.',
    logo: {
      default: '/images/common/logo-icon.png',
      white: '/images/common/logo.png',
    },
    sns: {
      youtube: 'https://www.youtube.com/@VebopProject_official',
      x: 'https://x.com/Vebop_Project',
      xHandle: 'Vebop_Project',
    },
    news: {
      apiPrefix: '/api/vebop',
    },
    loading: {
      bgIcon: '/images/common/loading-icon.svg',
      innerBg: '/images/common/loading-bg.png',
      defaultImage: '/images/common/loading.png',
    },
    nav: {
      main: [
        { label: 'HOME', to: '/' },
        { label: 'ABOUT', to: '/#About' },
        { label: 'TALENTS', to: '/talents/' },
        { label: 'TOPICS', to: '/topics/' },
        { label: 'SHOP', to: 'https://vivionblue.com/collections/vebop-project', external: true, newTab: true },
        { label: 'GUIDELINE', to: '/guideline/' },
      ],
      sub: [
        { label: '会社概要', to: 'https://vivion.co.jp/', external: true },
        { label: '二次創作ガイドライン', to: '/guideline/' },
        { label: 'ファンレター・プレゼントの送付について', to: '/present-rules/' },
        { label: 'プライバシーポリシー', to: '/privacy/' },
      ],
      footer: [
        { label: 'プライバシーポリシー', to: '/privacy/' },
        { label: 'プレゼント送付ガイドライン', to: '/present-rules/' },
        { label: 'お問い合わせ', to: '/contact/' },
        { label: '株式会社viviON', to: 'https://vivion.co.jp/', external: true },
      ],
    },
    contact: {
      endpoint: '',
      productionName: 'vebop',
      routes: {
        contactComplete: '/contact/complete/',
        contactError: '/contact/error/',
        downloadComplete: '/promotion/download/complete/',
        downloadError: '/promotion/download/error/',
      },
    },
  },
})
