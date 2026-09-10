/** Homepage carousel copy. `\n` = always break. `{sp}` = SP-only break (hidden from 769px). */
export const talentSlides = [
  {
    id: 'putera',
    name: '漆八ぷてら',
    image: '/images/talents/shichihachi-putera.png',
    description: [
      '宇宙からやってきた探査員。\n何かの任務の為に地球に降りてきた気がするが、\n任務は思い出せないし、思い出す気もない。',
    ],
    ctaLabel: 'TALENT PROFILE',
    ctaStacked: true,
    to: '/talents/shichihachi-putera/',
  },
  {
    id: 'maboroshi',
    name: 'マボロシトモダチクラブ\nコインランドリースカッド',
    image: '/images/talents/maboroshi-tomodachi-club.png',
    description: [
      'マボロシトモダチクラブ\n特殊な能力を持ちながら人間ではない存在を監視する任務を受け、街で増える異常現象の調査を開始する。\n能力を隠しつつ情報収集を進めるため、配信活動を始め、さまざまな人々と交流しながら異界の存在に関する情報を集める。\n彼女たちのゆるやかな捜査が今始まる。',
      'コインランドリースカッド\n地球侵略が目的（だったはず）の異人怪人の4人組。\n商店街にあるコインランドリーによく出没する。\n侵略の前準備としてインターネットから人類の調査を進めるはずだったのだが…\n彼女たちのゆるやかな地球侵略が今、始まる？',
    ],
    ctaLabel: 'MEMBER LINEUP',
    ctaStacked: false,
    to: '/talents/',
  },
  {
    id: 'nyankomeshi',
    name: 'もりもりにゃんこめし',
    image: '/images/talents/morimori-nyankomeshi.png',
    description: [
      '急成長中の新興老舗企業。\n缶詰からマタタビまで猫を喜ばせる{sp}ありとあらゆる物を開発している。',
      '秘密裏に開発に成功していた{sp}不思議なけむりで\n社員がもふもふになってしまったという{sp}事故の噂がある。',
      '最近ビルが爆発した。\nーーというかよく爆発する。',
    ],
    ctaLabel: 'MEMBER LINEUP',
    ctaStacked: false,
    to: '/talents/',
  },
  {
    id: 'meiden',
    name: '迷電ワークス',
    image: '/images/talents/meiden-works.png',
    description: [
      '都内のどこかにあるメイド喫茶。\nクセの強い店員しかいないことでその筋では有名。',
      '営業時間も決まっておらず{sp}日替わりでメニューが変わる。\n何を頼んでも出てこない日もある。',
      'とある企業が道楽で始めたらしい。{sp}赤字覚悟である。\nーーというかめちゃくちゃ赤字である。',
    ],
    ctaLabel: 'MEMBER LINEUP',
    ctaStacked: false,
    to: '/talents/',
  },
]

export const drawerJa: Record<string, string> = {
  HOME: 'ホーム',
  ABOUT: '“ビバップ高校”について',
  TALENTS: '所属タレント',
  TOPICS: 'お知らせ',
  SHOP: 'オフィシャルストア',
  GUIDELINE: '二次創作ガイドライン',
}
