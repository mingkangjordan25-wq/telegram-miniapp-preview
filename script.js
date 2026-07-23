const screens = [...document.querySelectorAll(".screen")];
const navItems = [...document.querySelectorAll(".nav-item")];
const quickLinks = [...document.querySelectorAll("[data-target]")];
let actionButtons = [...document.querySelectorAll("[data-action]")];
const mallTabs = [...document.querySelectorAll("[data-mall-tab]")];
const mallPanels = [...document.querySelectorAll("[data-mall-panel]")];

const languageSelect = document.getElementById("languageSelect");
const resultModal = document.getElementById("resultModal");
const modalEyebrow = document.getElementById("modalEyebrow");
const resultTitle = document.getElementById("resultTitle");
const resultBody = document.getElementById("resultBody");
const closeModal = document.getElementById("closeModal");
const toast = document.getElementById("toast");
let homeWheel = document.getElementById("homeWheel");
let homeWheelZone = document.getElementById("homeWheelZone");
const tg = window.Telegram?.WebApp || null;
const pageParams = new URLSearchParams(window.location.search);

const appConfig = {
  botUsername: "UltrawinGroup_bot",
  websiteUrl: "https://ultrawin77.com/my",
  supportTelegram: "@Ultrawin77vvip",
  supportWhatsApp: "+60 17-801 1570",
  ultraMallUrl: "https://ultra-mall.atoms.world/",
  dailyCheckinReward: 1,
  spinCost: 5,
  apiBaseUrl: (pageParams.get("api") || window.UW_MINIAPP_API_BASE || "").replace(/\/$/, ""),
};

const state = {
  currentLanguage: languageSelect?.value || "en",
  spinning: false,
  currentRotation: 0,
  toastTimer: null,
  lockedScrollY: 0,
  backendLoaded: false,
  user: {
    telegramId: null,
    displayName: "@uw_member_demo",
    firstName: "UW",
    ucoin: 128,
    spinCount: 1,
    dailySpinAvailable: true,
    extraSpinBalance: 0,
    checkinReward: 1,
    invited: 26,
    verified: 18,
    joined: 21,
    rewardsEarned: 46,
    lastCheckin: "2026-07-08",
    canCheckin: true,
    phone: "+60 12-883 7711",
    phoneVerified: true,
    phoneVerifiedAt: "2026-07-08 20:00",
  },
};

const inviteHistory = [
  { name: "Aina", time: "2026-07-09 10:12", status: "verified" },
  { name: "Jason", time: "2026-07-09 09:04", status: "verified" },
  { name: "Siti", time: "2026-07-08 22:40", status: "pending" },
  { name: "Amir", time: "2026-07-08 18:15", status: "rewardSent" },
];

const rewardHistory = [
  { item: "Daily Check-In", amount: "+1 UCoin", time: "2026-07-08 20:00", status: "approved" },
  { item: "Free Spin", amount: "+5 UCoin", time: "2026-07-08 14:28", status: "approved" },
];

const spinRewards = [
  { label: "Try Again", shortLabel: "Try Again", type: "empty", weight: 43 },
  { label: "free Spin again", shortLabel: "Free Spin", type: "spin", value: 1, weight: 15 },
  { label: "+5 UCoin", shortLabel: "+5 UCoin", type: "ucoin", value: 5, weight: 22 },
  { label: "+10 UCoin", shortLabel: "+10 UCoin", type: "ucoin", value: 10, weight: 12 },
  { label: "RM5 Credit", shortLabel: "RM5", type: "reward", weight: 6 },
  { label: "RM12 Credit", shortLabel: "RM12", type: "reward", weight: 1.5 },
  { label: "RM25 Credit", shortLabel: "RM25", type: "reward", weight: 0.5 },
];

const translations = {
  en: {
    topbarEyebrow: "Telegram Mini App",
    topbarTitle: "Ultrawin77 Reward Center",
    homeChip: "UW check-in and free spin",
    homeHeroTitle: "Check in daily and spin for UW rewards",
    homeHeroDesc: "Simple Telegram Mini App flow: daily check-in and lucky free spin.",
    statUCoin: "UCoin",
    freeSpinStat: "Free Spins",
    dailySpinStat: "Daily Free Spin",
    extraSpinStat: "Extra Spins",
    dailySpinAvailable: "Available",
    dailySpinUsed: "Used",
    statTier: "Tier",
    statInvited: "Invited",
    statVerified: "Verified",
    statShared: "Shared",
    statJoined: "Joined",
    statRewardsEarned: "UCoin Earned",
    statTotalInvites: "Total Invites",
    spinNow: "Spin Now",
    buySpin: "Buy 1 Spin - 5 UCoin",
    spinCore: "SPIN",
    spinHint: "Tap the center button to spin.",
    homeSpinTitle: "Lucky Spin",
    homeSpinDesc: "Use your free spin chance and watch the wheel animation reveal the result.",
    openCheckin: "Open Check-In",
    inviteFriends: "Invite Friends",
    quickActionsTitle: "Quick Actions",
    quickActionsHint: "Only the active UW rewards",
    quickCheckin: "Daily Check-In",
    checkinReady: "Ready now",
    checkinDone: "Claimed",
    quickSpin: "Free Spin",
    quickSpinDesc: "Spin the wheel now",
    quickInvite: "Invite Friend",
    quickMall: "UltraMall",
    quickMallDesc: "Redeem UCoin rewards",
    quickWorldCup: "World Cup Guess",
    quickWorldCupDesc: "Linked from main bot",
    memberTierTitle: "Member Tier",
    checkinPageTitle: "Daily Check-In",
    checkinPageDesc: "Claim once per day to add UCoin to your balance.",
    todayRewardTitle: "Today's Reward",
    checkinHint: "Check in once per day to collect today's reward.",
    claimCheckin: "Claim Check-In",
    viewTierRules: "View Tier Rules",
    streakTitle: "Check-In Snapshot",
    summaryLastCheckin: "Last check-in",
    summaryTierMultiplier: "Tier multiplier",
    summaryVerifiedFriends: "Verified friends",
    rewardPoolTitle: "Tier Benefits",
    benefitBronze: "Bronze +1",
    benefitSilver: "Silver +2",
    benefitGold: "Gold +3",
    benefitInvite: "Verified referrals",
    viewHistory: "View history",
    referralEyebrow: "Your referral pass",
    sharePageTitle: "Invite verified friends and earn more UCoin",
    shareTelegram: "Share on Telegram",
    copyLink: "Copy Link",
    inviteHistoryTitle: "Invite History",
    viewAll: "View all",
    walletEyebrow: "Reward wallet",
    mallPageTitle: "UltraMall Benefits",
    mallBadge: "Claim ready",
    mallCreditTab: "Credit",
    mallGiftTab: "Gift",
    mallCreditFive: "Redeem with 30 UCoin",
    mallCreditTwelve: "Redeem with 70 UCoin",
    mallCreditTwentyFive: "Redeem with 150 UCoin",
    mallCreditFifty: "Redeem with 300 UCoin",
    giftPowerBank: "Power Bank",
    giftEarbuds: "Earbuds",
    giftSmartWatch: "Smart Watch",
    giftIPhone: "iPhone 17 Pro Max",
    accountEyebrow: "Telegram user",
    phoneVerified: "Malaysia number verified",
    accountTier: "Current Tier",
    accountLastCheckin: "Last Check-In",
    menuInviteHistory: "Invite History",
    menuRewardHistory: "Reward History",
    menuPhoneVerification: "Phone Verification",
    menuTerms: "Terms & Rules",
    menuHelp: "Help Center",
    menuWorldCup: "World Cup Guess",
    navHome: "Home",
    navCheckin: "Check-In",
    navShare: "Share",
    navMall: "Mall",
    navAccount: "Account",
    modalEyebrow: "UW Preview",
    close: "Close",
    goShare: "Go Share",
    verified: "Verified",
    pending: "Pending",
    rewardSent: "Reward Sent",
    approved: "Approved",
    modalCheckinTitle: "Daily Check-In Success",
    modalCheckinText: "You received +{points} UCoin for today's check-in.",
    alreadyCheckedInTitle: "Already Checked In",
    alreadyCheckedInText: "You already claimed today's check-in reward.",
    modalInviteTitle: "Invite History",
    modalRewardHistoryTitle: "Reward History",
    modalPhoneTitle: "Phone Verification",
    modalTermsTitle: "Terms & Rules",
    modalHelpTitle: "Help Center",
    modalTierTitle: "Member Tier Rules",
    modalWorldCupTitle: "World Cup Guess",
    modalSpinTitle: "Spin Result",
    noSpinTitle: "No Spins Left",
    noSpinText: "You have used all free spin chances for now. Please check again later.",
    buySpinTitle: "Free Spin Purchased",
    buySpinText: "5 UCoin has been deducted and 1 extra spin has been saved.",
    notEnoughUcoinTitle: "Not Enough UCoin",
    openFromTelegramTitle: "Open From Telegram",
    openFromTelegramText: "Please open this Mini App from the Telegram bot to use your real UW account.",
    backendErrorTitle: "Mini App Connection",
    backendErrorText: "Cannot connect to the reward backend. Please try again later.",
    termsText: "1. Referral rewards are counted after a friend completes verification.\n2. One phone number counts once.\n3. UCoin and claims may require admin approval.",
    helpText: "Telegram Support: {telegram}\nWhatsApp: {whatsapp}\nWebsite: {website}",
    tierInfoText: "Bronze member: +1 UCoin daily.\nSilver member: +2 UCoin daily after 20 verified invites.\nGold member: +3 UCoin daily after 50 verified invites.",
    worldCupText: "World Cup Guess stays in the main bot flow. This mini app can later link out or embed a summary screen.",
    copySuccess: "Invite link copied",
    shareSoon: "Telegram native share can be connected here later.",
    phoneVerifiedLine: "Phone: {phone}",
    phoneVerifiedTime: "Verified at: {time}",
    phoneVerifyAction: "This demo account is already verified for the UW reward flow.",
    tierBronze: "Bronze",
    tierSilver: "Silver",
    tierGold: "Gold",
    tierNextBronze: "{count} more verified invites to Silver",
    tierNextSilver: "{count} more verified invites to Gold",
    tierNextGold: "You are already at the highest Gold tier",
    spinsLeft: "{count} spins left",
    spinWinText: "You won: {reward}",
  },
  ms: {
    topbarEyebrow: "Telegram Mini App",
    topbarTitle: "Pusat Ganjaran Ultrawin77",
    homeChip: "Check-in dan free spin UW",
    homeHeroTitle: "Check-in setiap hari dan spin untuk ganjaran UW",
    homeHeroDesc: "Aliran Mini App yang ringkas: daily check-in dan lucky free spin.",
    statUCoin: "UCoin",
    freeSpinStat: "Free Spin",
    dailySpinStat: "Daily Free Spin",
    extraSpinStat: "Extra Spin",
    dailySpinAvailable: "Ada",
    dailySpinUsed: "Sudah guna",
    statTier: "Tahap",
    statInvited: "Dijemput",
    statVerified: "Disahkan",
    statShared: "Dikongsi",
    statJoined: "Sertai",
    statRewardsEarned: "UCoin Diperoleh",
    statTotalInvites: "Jumlah Jemputan",
    spinNow: "Spin Sekarang",
    buySpin: "Beli 1 Spin - 5 UCoin",
    spinCore: "SPIN",
    spinHint: "Tekan butang tengah untuk spin.",
    homeSpinTitle: "Lucky Spin",
    homeSpinDesc: "Guna peluang free spin dan lihat animasi roda tunjuk keputusan.",
    openCheckin: "Buka Check-In",
    inviteFriends: "Jemput Rakan",
    quickActionsTitle: "Tindakan Pantas",
    quickActionsHint: "Hanya ganjaran UW yang aktif",
    quickCheckin: "Daily Check-In",
    checkinReady: "Boleh claim",
    checkinDone: "Sudah claim",
    quickSpin: "Free Spin",
    quickSpinDesc: "Spin roda sekarang",
    quickInvite: "Jemput Rakan",
    quickMall: "UltraMall",
    quickMallDesc: "Tebus ganjaran UCoin",
    quickWorldCup: "Teka Piala Dunia",
    quickWorldCupDesc: "Dipaut dari bot utama",
    memberTierTitle: "Tahap Ahli",
    checkinPageTitle: "Daily Check-In",
    checkinPageDesc: "Claim sekali sehari untuk tambah UCoin ke baki anda.",
    todayRewardTitle: "Ganjaran Hari Ini",
    checkinHint: "Check-in sekali sehari untuk claim ganjaran hari ini.",
    claimCheckin: "Claim Check-In",
    viewTierRules: "Lihat Peraturan Tahap",
    streakTitle: "Ringkasan Check-In",
    summaryLastCheckin: "Check-in terakhir",
    summaryTierMultiplier: "Pengganda tahap",
    summaryVerifiedFriends: "Rakan disahkan",
    rewardPoolTitle: "Faedah Tahap",
    benefitBronze: "Bronze +1",
    benefitSilver: "Silver +2",
    benefitGold: "Gold +3",
    benefitInvite: "Referral disahkan",
    viewHistory: "Lihat rekod",
    referralEyebrow: "Pas referral anda",
    sharePageTitle: "Jemput rakan yang disahkan dan dapat lebih banyak UCoin",
    shareTelegram: "Kongsi di Telegram",
    copyLink: "Salin Pautan",
    inviteHistoryTitle: "Sejarah Jemputan",
    viewAll: "Lihat semua",
    walletEyebrow: "Dompet ganjaran",
    mallPageTitle: "Faedah UltraMall",
    mallBadge: "Sedia dituntut",
    mallCreditTab: "Kredit",
    mallGiftTab: "Hadiah",
    mallCreditFive: "Tebus dengan 30 UCoin",
    mallCreditTwelve: "Tebus dengan 70 UCoin",
    mallCreditTwentyFive: "Tebus dengan 150 UCoin",
    mallCreditFifty: "Tebus dengan 300 UCoin",
    giftPowerBank: "Power Bank",
    giftEarbuds: "Earbuds",
    giftSmartWatch: "Jam Pintar",
    giftIPhone: "iPhone 17 Pro Max",
    accountEyebrow: "Pengguna Telegram",
    phoneVerified: "Nombor Malaysia disahkan",
    accountTier: "Tahap Semasa",
    accountLastCheckin: "Check-In Terakhir",
    menuInviteHistory: "Sejarah Jemputan",
    menuRewardHistory: "Sejarah Ganjaran",
    menuPhoneVerification: "Pengesahan Telefon",
    menuTerms: "Terma & Peraturan",
    menuHelp: "Pusat Bantuan",
    menuWorldCup: "Teka Piala Dunia",
    navHome: "Utama",
    navCheckin: "Check-In",
    navShare: "Kongsi",
    navMall: "Mall",
    navAccount: "Akaun",
    modalEyebrow: "Preview UW",
    close: "Tutup",
    goShare: "Pergi Kongsi",
    verified: "Disahkan",
    pending: "Menunggu",
    rewardSent: "Ganjaran Dihantar",
    approved: "Diluluskan",
    modalCheckinTitle: "Daily Check-In Berjaya",
    modalCheckinText: "Anda menerima +{points} UCoin untuk check-in hari ini.",
    alreadyCheckedInTitle: "Sudah Check-In",
    alreadyCheckedInText: "Anda sudah claim ganjaran check-in hari ini.",
    modalInviteTitle: "Sejarah Jemputan",
    modalRewardHistoryTitle: "Sejarah Ganjaran",
    modalPhoneTitle: "Pengesahan Telefon",
    modalTermsTitle: "Terma & Peraturan",
    modalHelpTitle: "Pusat Bantuan",
    modalTierTitle: "Peraturan Tahap Ahli",
    modalWorldCupTitle: "Teka Piala Dunia",
    modalSpinTitle: "Hasil Spin",
    noSpinTitle: "Tiada Spin Lagi",
    noSpinText: "Anda sudah guna semua peluang free spin buat masa ini. Sila semak semula kemudian.",
    buySpinTitle: "Free Spin Dibeli",
    buySpinText: "5 UCoin telah ditolak dan 1 extra spin telah disimpan.",
    notEnoughUcoinTitle: "UCoin Tidak Cukup",
    openFromTelegramTitle: "Buka Dari Telegram",
    openFromTelegramText: "Sila buka Mini App ini dari Telegram bot untuk guna akaun UW sebenar anda.",
    backendErrorTitle: "Sambungan Mini App",
    backendErrorText: "Tidak dapat sambung ke reward backend. Sila cuba lagi nanti.",
    termsText: "1. Ganjaran referral dikira selepas rakan selesai pengesahan.\n2. Satu nombor telefon dikira sekali.\n3. UCoin dan tuntutan mungkin perlukan kelulusan admin.",
    helpText: "Telegram Support: {telegram}\nWhatsApp: {whatsapp}\nWebsite: {website}",
    tierInfoText: "Ahli Bronze: +1 UCoin sehari.\nAhli Silver: +2 UCoin sehari selepas 20 referral disahkan.\nAhli Gold: +3 UCoin sehari selepas 50 referral disahkan.",
    worldCupText: "Teka Piala Dunia kekal dalam aliran bot utama. Mini app ini boleh dipautkan atau tunjuk ringkasan pada masa depan.",
    copySuccess: "Pautan jemputan telah disalin",
    shareSoon: "Perkongsian asli Telegram boleh disambung kemudian.",
    phoneVerifiedLine: "Telefon: {phone}",
    phoneVerifiedTime: "Disahkan pada: {time}",
    phoneVerifyAction: "Akaun demo ini sudah disahkan untuk aliran ganjaran UW.",
    tierBronze: "Bronze",
    tierSilver: "Silver",
    tierGold: "Gold",
    tierNextBronze: "{count} lagi referral disahkan ke Silver",
    tierNextSilver: "{count} lagi referral disahkan ke Gold",
    tierNextGold: "Anda sudah berada pada tahap Gold tertinggi",
    spinsLeft: "{count} spin lagi",
    spinWinText: "Anda menang: {reward}",
  },
  zh: {
    topbarEyebrow: "Telegram Mini App",
    topbarTitle: "Ultrawin77 奖励中心",
    homeChip: "UW 奖励与邀请",
    homeHeroTitle: "每日签到，邀请已验证好友，持续累积你的 UCoin",
    homeHeroDesc: "这个预览版对应 UW 的奖励流程：每日签到、会员等级、邀请追踪和 UltraMall 兑换。",
    statUCoin: "UCoin",
    statTier: "等级",
    statInvited: "已邀请",
    statVerified: "已验证",
    statShared: "已分享",
    statJoined: "已加入",
    statRewardsEarned: "已得 UCoin",
    statTotalInvites: "总邀请数",
    spinNow: "立即抽奖",
    spinCore: "SPIN",
    spinHint: "点击中间按钮开始转盘。",
    homeSpinTitle: "幸运转盘",
    homeSpinDesc: "已验证邀请可以解锁更多抽奖机会。",
    openCheckin: "打开签到",
    inviteFriends: "邀请好友",
    quickActionsTitle: "快捷功能",
    quickActionsHint: "常用入口",
    quickCheckin: "每日签到",
    checkinReady: "现在可领",
    checkinDone: "已领取",
    quickInvite: "邀请好友",
    quickMall: "UltraMall",
    quickMallDesc: "兑换 UCoin 奖励",
    quickWorldCup: "世界杯竞猜",
    quickWorldCupDesc: "由主机器人承接",
    memberTierTitle: "会员等级",
    checkinPageTitle: "每日签到",
    checkinPageDesc: "你的会员等级会影响每天可领取的 UCoin 数量。",
    todayRewardTitle: "今日奖励",
    checkinHint: "每天签到一次，按当前等级领取奖励。",
    claimCheckin: "领取签到",
    viewTierRules: "查看等级规则",
    streakTitle: "签到概览",
    summaryLastCheckin: "上次签到",
    summaryTierMultiplier: "等级倍率",
    summaryVerifiedFriends: "已验证好友",
    rewardPoolTitle: "等级福利",
    benefitBronze: "Bronze +1",
    benefitSilver: "Silver +2",
    benefitGold: "Gold +3",
    benefitInvite: "已验证邀请",
    viewHistory: "查看记录",
    referralEyebrow: "你的邀请卡",
    sharePageTitle: "邀请已验证好友，赚取更多 UCoin",
    shareTelegram: "分享到 Telegram",
    copyLink: "复制链接",
    inviteHistoryTitle: "邀请记录",
    viewAll: "查看全部",
    walletEyebrow: "奖励钱包",
    mallPageTitle: "UltraMall 福利",
    mallBadge: "可兑换",
    mallCreditTab: "充值",
    mallGiftTab: "礼品",
    mallCreditFive: "使用 30 UCoin 兑换",
    mallCreditTwelve: "使用 70 UCoin 兑换",
    mallCreditTwentyFive: "使用 150 UCoin 兑换",
    mallCreditFifty: "使用 300 UCoin 兑换",
    giftPowerBank: "充电宝",
    giftEarbuds: "耳机",
    giftSmartWatch: "智能手表",
    giftIPhone: "iPhone 17 Pro Max",
    accountEyebrow: "Telegram 用户",
    phoneVerified: "马来西亚号码已验证",
    accountTier: "当前等级",
    accountLastCheckin: "上次签到",
    menuInviteHistory: "邀请记录",
    menuRewardHistory: "奖励记录",
    menuPhoneVerification: "手机号验证",
    menuTerms: "条款与规则",
    menuHelp: "帮助中心",
    menuWorldCup: "世界杯竞猜",
    navHome: "首页",
    navCheckin: "签到",
    navShare: "分享",
    navMall: "商城",
    navAccount: "账户",
    modalEyebrow: "UW 预览",
    close: "关闭",
    goShare: "去分享",
    verified: "已验证",
    pending: "待完成",
    rewardSent: "已发奖励",
    approved: "已通过",
    modalCheckinTitle: "签到成功",
    modalCheckinText: "你今天已获得 +{points} UCoin。",
    alreadyCheckedInTitle: "今天已签到",
    alreadyCheckedInText: "你今天的签到奖励已经领取过了。",
    modalInviteTitle: "邀请记录",
    modalRewardHistoryTitle: "奖励记录",
    modalPhoneTitle: "手机号验证",
    modalTermsTitle: "条款与规则",
    modalHelpTitle: "帮助中心",
    modalTierTitle: "会员等级规则",
    modalWorldCupTitle: "世界杯竞猜",
    modalSpinTitle: "抽奖结果",
    noSpinTitle: "没有次数了",
    noSpinText: "邀请更多已验证好友来解锁更多抽奖机会。",
    termsText: "1. 好友完成验证后，邀请奖励才会计入。\n2. 同一个手机号只计算一次。\n3. UCoin 与兑换可能需要管理员审核。",
    helpText: "Telegram 客服: {telegram}\nWhatsApp: {whatsapp}\n官网: {website}",
    tierInfoText: "Bronze 会员：每日 +1 UCoin。\nSilver 会员：20 个已验证邀请后每日 +2 UCoin。\nGold 会员：50 个已验证邀请后每日 +3 UCoin。",
    worldCupText: "世界杯竞猜仍然保留在主机器人流程里。这个 mini app 后面可以加跳转或摘要页面。",
    copySuccess: "邀请链接已复制",
    shareSoon: "之后可以接入 Telegram 原生分享。",
    phoneVerifiedLine: "手机号：{phone}",
    phoneVerifiedTime: "验证时间：{time}",
    phoneVerifyAction: "这个演示账号已经完成 UW 奖励流程验证。",
    tierBronze: "Bronze",
    tierSilver: "Silver",
    tierGold: "Gold",
    tierNextBronze: "再有 {count} 个已验证邀请可升级到 Silver",
    tierNextSilver: "再有 {count} 个已验证邀请可升级到 Gold",
    tierNextGold: "你已经是最高 Gold 等级",
    spinsLeft: "剩余 {count} 次",
    spinWinText: "你抽中了：{reward}",
  },
};

Object.assign(translations.zh, {
  topbarEyebrow: "Telegram Mini App",
  topbarTitle: "Ultrawin77 奖励中心",
  homeChip: "UW 签到和免费转盘",
  homeHeroTitle: "每日签到，免费转盘赢 UW 奖励",
  homeHeroDesc: "简化版 Telegram Mini App：只保留每日签到和免费转盘。",
  statUCoin: "UCoin",
  freeSpinStat: "免费转盘",
  dailySpinStat: "每日免费转盘",
  extraSpinStat: "额外转盘",
  dailySpinAvailable: "可使用",
  dailySpinUsed: "已使用",
  spinNow: "立即转盘",
  buySpin: "5 UCoin 买 1 次",
  spinCore: "SPIN",
  spinHint: "点击中间按钮开始转盘。",
  homeSpinTitle: "幸运转盘",
  homeSpinDesc: "使用你的免费转盘次数，等待动画显示结果。",
  openCheckin: "打开签到",
  quickActionsTitle: "快捷功能",
  quickActionsHint: "只保留 UW 当前奖励",
  quickCheckin: "每日签到",
  checkinReady: "现在可领取",
  checkinDone: "已领取",
  quickSpin: "免费转盘",
  quickSpinDesc: "现在开始转盘",
  checkinPageTitle: "每日签到",
  checkinPageDesc: "每天领取一次，把 UCoin 加到余额。",
  todayRewardTitle: "今日奖励",
  checkinHint: "每天签到一次，领取今日奖励。",
  claimCheckin: "领取签到",
  streakTitle: "签到状态",
  summaryLastCheckin: "上次签到",
  navHome: "首页",
  navCheckin: "签到",
  modalEyebrow: "UW 预览",
  close: "关闭",
  modalCheckinTitle: "签到成功",
  modalCheckinText: "你今天已获得 +{points} UCoin。",
  alreadyCheckedInTitle: "今天已签到",
  alreadyCheckedInText: "你今天的签到奖励已经领取过了。",
  modalSpinTitle: "转盘结果",
  noSpinTitle: "没有转盘次数",
  noSpinText: "你现在的免费转盘次数已用完，请稍后再查看。",
  buySpinTitle: "已购买转盘",
  buySpinText: "已扣除 5 UCoin，并保存 1 次额外转盘。",
  notEnoughUcoinTitle: "UCoin 不足",
  openFromTelegramTitle: "请从 Telegram 打开",
  openFromTelegramText: "请从 Telegram bot 打开这个 Mini App，才能使用你的真实 UW 账户。",
  backendErrorTitle: "Mini App 连接",
  backendErrorText: "暂时无法连接奖励后台，请稍后再试。",
  spinsLeft: "剩余 {count} 次",
  spinWinText: "你抽中了：{reward}",
});

const zhLanguageOption = languageSelect?.querySelector('option[value="zh"]');
if (zhLanguageOption) {
  zhLanguageOption.textContent = "中文";
}

function t(key, params = {}) {
  const table = translations[state.currentLanguage] || translations.en;
  let text = table[key] || translations.en[key] || key;
  Object.entries(params).forEach(([name, value]) => {
    text = text.replace(`{${name}}`, String(value));
  });
  return text;
}

function syncTelegramShell() {
  if (!tg) return;
  tg.ready();
  tg.expand();
  try {
    tg.setHeaderColor("#1a140f");
    tg.setBackgroundColor("#fff1e0");
  } catch {
    // Ignore Telegram shell errors outside Telegram.
  }
}

function syncTelegramUser() {
  const telegramUser = tg?.initDataUnsafe?.user;
  if (!telegramUser) return;

  state.user.telegramId = telegramUser.id || null;
  state.user.firstName = telegramUser.first_name || telegramUser.username || "UW";
  state.user.displayName = telegramUser.username
    ? `@${telegramUser.username}`
    : [telegramUser.first_name, telegramUser.last_name].filter(Boolean).join(" ") || state.user.displayName;
}

function getTelegramInitData() {
  return tg?.initData || "";
}

function backendConfigured() {
  return Boolean(appConfig.apiBaseUrl);
}

function canUseBackend() {
  return backendConfigured() && Boolean(getTelegramInitData());
}

function requireTelegramBackend() {
  if (canUseBackend()) return true;

  if (backendConfigured()) {
    openModal(
      t("openFromTelegramTitle"),
      t("openFromTelegramTitle"),
      `<div class="modal-copy">${t("openFromTelegramText")}</div>`,
      "home",
    );
    return false;
  }

  return false;
}

async function miniappApi(path, options = {}) {
  const response = await fetch(`${appConfig.apiBaseUrl}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Telegram-Init-Data": getTelegramInitData(),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.ok === false) {
    const error = new Error(payload.message || t("backendErrorText"));
    error.payload = payload;
    error.status = response.status;
    throw error;
  }
  return payload;
}

function applyServerState(payload) {
  if (!payload?.user) return;
  const user = payload.user;
  state.backendLoaded = true;
  state.user.telegramId = user.telegram_id || state.user.telegramId;
  state.user.displayName = user.display_name || state.user.displayName;
  state.user.firstName = (user.display_name || state.user.firstName || "UW").replace(/^@/, "").slice(0, 1) || "UW";
  state.user.ucoin = Number(user.ucoin || 0);
  state.user.spinCount = Number(user.spin_count || 0);
  state.user.dailySpinAvailable = Boolean(user.daily_spin_available);
  state.user.extraSpinBalance = Number(user.extra_spin_balance || 0);
  state.user.canCheckin = Boolean(user.checkin_available);
  state.user.checkinReward = Number(user.checkin_reward || 1);
  state.user.lastCheckin = user.last_checkin || "-";
  appConfig.spinCost = Number(user.spin_cost || appConfig.spinCost || 5);
  renderDashboard();
}

async function loadMiniAppState() {
  if (!canUseBackend()) {
    renderDashboard();
    return;
  }

  try {
    const payload = await miniappApi("/api/miniapp/me");
    if (Array.isArray(payload.rewards) && payload.rewards.length === spinRewards.length) {
      payload.rewards.forEach((reward, index) => {
        spinRewards[index] = {
          label: reward.label,
          shortLabel: reward.short_label || reward.shortLabel || reward.label,
          type: reward.type,
          value: Number(reward.value || 0),
          weight: Number(reward.weight || 0),
        };
      });
      renderSpinLabels();
    }
    applyServerState(payload);
  } catch (error) {
    showToast(error.payload?.message || t("backendErrorText"));
  }
}

function showBackendError(error) {
  const message = error?.payload?.message || error?.message || t("backendErrorText");
  openModal(
    t("backendErrorTitle"),
    error?.payload?.error === "auth_failed" ? t("openFromTelegramTitle") : t("backendErrorTitle"),
    `<div class="modal-copy">${message}</div>`,
    "home",
  );
}

function getTierInfo(verified) {
  if (verified >= 50) {
    return { key: "gold", multiplier: 3, progress: 100, next: t("tierNextGold") };
  }

  if (verified >= 20) {
    return {
      key: "silver",
      multiplier: 2,
      progress: ((verified - 20) / 30) * 100,
      next: t("tierNextSilver", { count: 50 - verified }),
    };
  }

  return {
    key: "bronze",
    multiplier: 1,
    progress: (verified / 20) * 100,
    next: t("tierNextBronze", { count: 20 - verified }),
  };
}

function setActiveScreen(target) {
  if (!screens.some((screen) => screen.dataset.screen === target)) {
    target = "home";
  }

  screens.forEach((screen) => {
    screen.classList.toggle("is-active", screen.dataset.screen === target);
  });

  navItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.target === target);
  });
}

function openModal(eyebrow, title, bodyHtml, ctaTarget = "home") {
  modalEyebrow.textContent = eyebrow;
  resultTitle.textContent = title;
  resultBody.innerHTML = bodyHtml;
  resultModal.querySelector(".secondary-btn").dataset.target = ctaTarget;
  resultModal.classList.add("is-open");
  state.lockedScrollY = window.scrollY || window.pageYOffset || 0;
  document.body.classList.add("modal-open");
  document.body.style.top = `-${state.lockedScrollY}px`;
}

function closeCurrentModal() {
  resultModal.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  document.body.style.top = "";
  window.scrollTo(0, state.lockedScrollY);
}

function showToast(message) {
  if (state.toastTimer) {
    window.clearTimeout(state.toastTimer);
  }

  toast.textContent = message;
  toast.classList.add("is-visible");
  toast.setAttribute("aria-hidden", "false");

  state.toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
    toast.setAttribute("aria-hidden", "true");
  }, 1800);
}

function buildReferralCode() {
  return state.user.telegramId ? `UW77-${state.user.telegramId}` : "UW77-2486";
}

function buildReferralLink() {
  const refValue = state.user.telegramId ? `ref_${state.user.telegramId}` : "ref_UW772486";
  return `https://t.me/${appConfig.botUsername}?start=${refValue}`;
}

function buildShareText() {
  return `Join Ultrawin77 Reward Center: ${buildReferralLink()}`;
}

function ensureHomeSpinWheel() {
  if (document.getElementById("homeWheelZone")) return;

  const spinPanel = document.getElementById("spinCountHome")?.closest(".panel");
  if (!spinPanel) return;

  spinPanel.classList.add("spin-panel");
  spinPanel.querySelector(".reward-grid")?.remove();
  spinPanel.querySelector(".cta-row")?.remove();

  const wheelMarkup = document.createElement("div");
  wheelMarkup.innerHTML = `
    <div class="home-wheel-zone" id="homeWheelZone">
      <div class="wheel-pointer"></div>
      <div class="wheel" id="homeWheel">
        <span class="wheel-label" data-spin-label="0">Try Again</span>
        <span class="wheel-label" data-spin-label="1">Free Spin</span>
        <span class="wheel-label" data-spin-label="2">+5 UCoin</span>
        <span class="wheel-label" data-spin-label="3">+10 UCoin</span>
        <span class="wheel-label" data-spin-label="4">RM5</span>
        <span class="wheel-label" data-spin-label="5">RM12</span>
        <span class="wheel-label" data-spin-label="6">RM25</span>
      </div>
      <button class="spin-core" id="homeSpinButton" type="button" data-action="spin-now" data-i18n="spinCore">SPIN</button>
    </div>
    <div class="spin-footer">
      <span data-i18n="spinHint">Tap the center button to spin.</span>
    </div>
  `;

  spinPanel.append(...wheelMarkup.children);
  homeWheel = document.getElementById("homeWheel");
  homeWheelZone = document.getElementById("homeWheelZone");
  actionButtons = [...document.querySelectorAll("[data-action]")];
}

function renderSpinLabels() {
  document.querySelectorAll("[data-spin-label]").forEach((node) => {
    const reward = spinRewards[Number(node.dataset.spinLabel)];
    if (reward) {
      node.textContent = reward.shortLabel;
    }
  });
}

function renderInviteList() {
  const root = document.getElementById("inviteList");
  if (!root) return;

  root.innerHTML = inviteHistory
    .slice(0, 3)
    .map(
      (item) => `
        <article>
          <div>
            <strong>${item.name}</strong>
            <p>${item.time}</p>
          </div>
          <span class="tag ${item.status === "pending" ? "pending" : "success"}">${t(item.status)}</span>
        </article>
      `,
    )
    .join("");
}

function renderDashboard() {
  const tier = getTierInfo(state.user.verified);
  const tierLabel = t(`tier${tier.key.charAt(0).toUpperCase()}${tier.key.slice(1)}`);

  document.documentElement.lang = state.currentLanguage === "zh" ? "zh-CN" : state.currentLanguage;

  const mappings = {
    ucoinHome: state.user.ucoin,
    ucoinCheckin: state.user.ucoin,
    spinCountStat: state.user.spinCount,
    spinCountCheckin: state.user.spinCount,
    dailySpinStatus: state.user.dailySpinAvailable ? t("dailySpinAvailable") : t("dailySpinUsed"),
    extraSpinHome: state.user.extraSpinBalance,
    tierHome: tierLabel,
    invitedHome: state.user.invited,
    verifiedHome: state.user.verified,
    sharedCount: state.user.invited,
    joinedCount: state.user.joined,
    verifiedCount: state.user.verified,
    rewardsEarnedCount: state.user.rewardsEarned,
    walletUcoin: `UCoin ${state.user.ucoin}`,
    ucoinAccount: state.user.ucoin,
    accountTierShort: tierLabel,
    totalInvitesAccount: state.user.invited,
    lastCheckinShort: state.user.lastCheckin.slice(5),
    tierBadge: `${tierLabel} x${tier.multiplier}`,
    tierName: tierLabel,
    tierProgressText: tier.next,
    tierMultiplier: `x${tier.multiplier}`,
    tierSummaryCheckin: `${tierLabel} x${tier.multiplier}`,
    checkinPoints: `+${state.user.checkinReward || appConfig.dailyCheckinReward} UCoin`,
    lastCheckinLabel: state.user.lastCheckin,
    lastCheckinValue: state.user.lastCheckin,
    tierMultiplierSummary: `x${tier.multiplier}`,
    verifiedSummary: state.user.verified,
    refCodeText: buildReferralCode(),
    refLinkText: buildReferralLink(),
    spinCountHome: t("spinsLeft", { count: state.user.spinCount }),
    accountUsername: state.user.displayName,
    avatarCore: state.user.firstName.slice(0, 1).toUpperCase(),
  };

  Object.entries(mappings).forEach(([id, value]) => {
    const node = document.getElementById(id);
    if (node) {
      node.textContent = String(value);
    }
  });

  const checkinStatus = document.getElementById("checkinStatus");
  if (checkinStatus) {
    checkinStatus.textContent = state.user.canCheckin ? t("checkinReady") : t("checkinDone");
  }

  const checkinStatusSummary = document.getElementById("checkinStatusSummary");
  if (checkinStatusSummary) {
    checkinStatusSummary.textContent = state.user.canCheckin ? t("checkinReady") : t("checkinDone");
  }

  const phoneVerifiedTag = document.getElementById("phoneVerifiedTag");
  if (phoneVerifiedTag) {
    phoneVerifiedTag.textContent = state.user.phoneVerified ? t("phoneVerified") : t("pending");
  }

  const inviteDigest = document.getElementById("inviteDigest");
  if (inviteDigest) {
    inviteDigest.textContent = `${state.user.verified} ${t("verified").toLowerCase()}`;
  }

  const tierFill = document.getElementById("tierFill");
  if (tierFill) {
    tierFill.style.width = `${Math.max(8, tier.progress)}%`;
  }
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  renderSpinLabels();
  renderInviteList();
  renderDashboard();
}

function showInviteHistory() {
  openModal(
    t("menuInviteHistory"),
    t("modalInviteTitle"),
    `<div class="modal-list">${inviteHistory
      .map((item) => `<div class="modal-row"><strong>${item.name}</strong><span>${item.time} | ${t(item.status)}</span></div>`)
      .join("")}</div>`,
    "home",
  );
}

function showRewardHistory() {
  openModal(
    t("menuRewardHistory"),
    t("modalRewardHistoryTitle"),
    `<div class="modal-list">${rewardHistory
      .map((item) => `<div class="modal-row"><strong>${item.item}</strong><span>${item.amount} | ${item.time} | ${t(item.status)}</span></div>`)
      .join("")}</div>`,
    "home",
  );
}

function showPhoneInfo() {
  openModal(
    t("menuPhoneVerification"),
    t("modalPhoneTitle"),
    `<div class="modal-list">
      <div class="modal-row"><strong>${t("phoneVerifiedLine", { phone: state.user.phone })}</strong></div>
      <div class="modal-row"><span>${t("phoneVerifiedTime", { time: state.user.phoneVerifiedAt })}</span></div>
      <div class="modal-row"><span>${t("phoneVerifyAction")}</span></div>
    </div>`,
    "home",
  );
}

function showTerms() {
  openModal(
    t("menuTerms"),
    t("modalTermsTitle"),
    `<div class="modal-copy">${t("termsText").replaceAll("\n", "<br>")}</div>`,
    "home",
  );
}

function showHelp() {
  openModal(
    t("menuHelp"),
    t("modalHelpTitle"),
    `<div class="modal-copy">${t("helpText", {
      telegram: appConfig.supportTelegram,
      whatsapp: appConfig.supportWhatsApp,
      website: appConfig.websiteUrl,
    }).replaceAll("\n", "<br>")}</div>`,
    "home",
  );
}

function showTierInfo() {
  openModal(
    t("memberTierTitle"),
    t("modalTierTitle"),
    `<div class="modal-copy">${t("tierInfoText").replaceAll("\n", "<br>")}</div>`,
    "checkin",
  );
}

function showWorldCupInfo() {
  openModal(
    t("menuWorldCup"),
    t("modalWorldCupTitle"),
    `<div class="modal-copy">${t("worldCupText")}</div>`,
    "home",
  );
}

function pickSpinRewardIndex() {
  const totalWeight = spinRewards.reduce((total, reward) => total + reward.weight, 0);
  let ticket = Math.random() * totalWeight;

  for (let index = 0; index < spinRewards.length; index += 1) {
    ticket -= spinRewards[index].weight;
    if (ticket <= 0) {
      return index;
    }
  }

  return spinRewards.length - 1;
}

async function runSpin() {
  if (state.spinning) return;

  let serverPayload = null;
  let rewardIndex = null;
  let reward = null;

  if (backendConfigured()) {
    if (!requireTelegramBackend()) return;
    try {
      serverPayload = await miniappApi("/api/miniapp/spin/play", { method: "POST" });
      rewardIndex = Number(serverPayload.result?.index ?? 0);
      reward = spinRewards[rewardIndex] || {
        label: serverPayload.result?.label || "Try Again",
        shortLabel: serverPayload.result?.short_label || serverPayload.result?.label || "Try Again",
        type: serverPayload.result?.type || "empty",
        value: Number(serverPayload.result?.value || 0),
      };
    } catch (error) {
      if (error.payload?.user) {
        applyServerState(error.payload);
      }
      showBackendError(error);
      return;
    }
  }

  if (!serverPayload && state.user.spinCount <= 0) {
    openModal(
      t("homeSpinTitle"),
      t("noSpinTitle"),
      `<div class="modal-copy">${t("noSpinText")}</div>`,
      "home",
    );
    return;
  }

  if (rewardIndex === null) {
    rewardIndex = pickSpinRewardIndex();
    reward = spinRewards[rewardIndex];
  }

  const sectorAngle = 360 / spinRewards.length;
  const stopAngle = 360 - rewardIndex * sectorAngle - sectorAngle / 2;
  const currentMod = state.currentRotation % 360;
  const nextRotation = state.currentRotation + 1800 + ((stopAngle - currentMod + 360) % 360);

  state.spinning = true;
  homeWheelZone?.classList.add("is-spinning");
  if (!serverPayload) {
    if (state.user.dailySpinAvailable) {
      state.user.dailySpinAvailable = false;
    } else {
      state.user.extraSpinBalance = Math.max(0, state.user.extraSpinBalance - 1);
    }
    state.user.spinCount -= 1;
  }
  state.currentRotation = nextRotation;
  renderDashboard();

  if (homeWheel) {
    homeWheel.style.transform = `rotate(${state.currentRotation}deg)`;
  }

  window.setTimeout(() => {
    if (serverPayload) {
      applyServerState(serverPayload);
    } else if (reward.type === "ucoin") {
      state.user.ucoin += reward.value;
      state.user.rewardsEarned += reward.value;
    }

    if (!serverPayload && reward.type === "spin") {
      state.user.extraSpinBalance += reward.value;
      state.user.spinCount += reward.value;
    }

    rewardHistory.unshift({
      item: `Spin Reward - ${reward.label}`,
      amount: reward.type === "ucoin" ? `+${reward.value} UCoin` : reward.label,
      time: "2026-07-09 12:00",
      status: "approved",
    });

    state.spinning = false;
    homeWheelZone?.classList.remove("is-spinning");
    renderDashboard();
    openModal(
      t("homeSpinTitle"),
      t("modalSpinTitle"),
      `<div class="modal-copy">${t("spinWinText", { reward: reward.label })}</div>`,
      "home",
    );
  }, 4300);
}

async function runDailyCheckin() {
  if (backendConfigured()) {
    if (!requireTelegramBackend()) return;
    try {
      const payload = await miniappApi("/api/miniapp/checkin", { method: "POST" });
      applyServerState(payload);
      openModal(
        t("quickCheckin"),
        payload.claimed ? t("modalCheckinTitle") : t("alreadyCheckedInTitle"),
        `<div class="modal-copy">${payload.message || ""}</div>`,
        "checkin",
      );
    } catch (error) {
      if (error.payload?.user) {
        applyServerState(error.payload);
      }
      showBackendError(error);
    }
    return;
  }

  if (state.user.canCheckin) {
    const points = state.user.checkinReward || appConfig.dailyCheckinReward;
    state.user.canCheckin = false;
    state.user.ucoin += points;
    state.user.rewardsEarned += points;
    state.user.lastCheckin = "2026-07-09";
    renderDashboard();
    openModal(
      t("quickCheckin"),
      t("modalCheckinTitle"),
      `<div class="modal-copy">${t("modalCheckinText", { points })}</div>`,
      "checkin",
    );
    return;
  }

  openModal(
    t("quickCheckin"),
    t("alreadyCheckedInTitle"),
    `<div class="modal-copy">${t("alreadyCheckedInText")}</div>`,
    "checkin",
  );
}

async function buySpin() {
  if (backendConfigured()) {
    if (!requireTelegramBackend()) return;
    try {
      const payload = await miniappApi("/api/miniapp/spin/buy", { method: "POST" });
      applyServerState(payload);
      openModal(
        t("buySpinTitle"),
        t("buySpinTitle"),
        `<div class="modal-copy">${payload.message || t("buySpinText")}</div>`,
        "home",
      );
    } catch (error) {
      if (error.payload?.user) {
        applyServerState(error.payload);
      }
      openModal(
        t("notEnoughUcoinTitle"),
        error.payload?.error === "auth_failed" ? t("openFromTelegramTitle") : t("notEnoughUcoinTitle"),
        `<div class="modal-copy">${error.payload?.message || error.message || t("backendErrorText")}</div>`,
        "home",
      );
    }
    return;
  }

  if (state.user.ucoin < appConfig.spinCost) {
    openModal(
      t("notEnoughUcoinTitle"),
      t("notEnoughUcoinTitle"),
      `<div class="modal-copy">${t("notEnoughUcoinTitle")}</div>`,
      "home",
    );
    return;
  }

  state.user.ucoin -= appConfig.spinCost;
  state.user.extraSpinBalance += 1;
  state.user.spinCount += 1;
  renderDashboard();
  openModal(
    t("buySpinTitle"),
    t("buySpinTitle"),
    `<div class="modal-copy">${t("buySpinText")}</div>`,
    "home",
  );
}

ensureHomeSpinWheel();

quickLinks.forEach((button) => {
  button.addEventListener("click", () => {
    closeCurrentModal();
    setActiveScreen(button.dataset.target);
  });
});

mallTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    mallTabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    mallPanels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.mallPanel === tab.dataset.mallTab));
  });
});

actionButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const action = button.dataset.action;

    if (action === "daily-checkin") {
      await runDailyCheckin();
      return;
    }

    if (action === "share-telegram") {
      if (tg?.openTelegramLink) {
        const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(buildReferralLink())}&text=${encodeURIComponent(buildShareText())}`;
        tg.openTelegramLink(shareUrl);
      } else {
        openModal(t("navHome"), t("shareTelegram"), `<div class="modal-copy">${t("shareSoon")}</div>`, "home");
      }
      return;
    }

    if (action === "copy-link") {
      try {
        await navigator.clipboard.writeText(buildReferralLink());
      } catch {
        // Ignore clipboard failures in restricted preview environments.
      }
      showToast(t("copySuccess"));
      return;
    }

    if (action === "spin-now") {
      await runSpin();
      return;
    }

    if (action === "buy-spin") {
      await buySpin();
      return;
    }

    if (action === "invite-history") showInviteHistory();
    if (action === "reward-history") showRewardHistory();
    if (action === "phone-verification") showPhoneInfo();
    if (action === "terms") showTerms();
    if (action === "help") showHelp();
    if (action === "tier-info") showTierInfo();
    if (action === "worldcup-info") showWorldCupInfo();
  });
});

languageSelect?.addEventListener("change", () => {
  state.currentLanguage = languageSelect.value;
  applyTranslations();
});

closeModal?.addEventListener("click", closeCurrentModal);

resultModal?.addEventListener("click", (event) => {
  if (event.target === resultModal) {
    closeCurrentModal();
  }
});

syncTelegramShell();
syncTelegramUser();
applyTranslations();
loadMiniAppState();
