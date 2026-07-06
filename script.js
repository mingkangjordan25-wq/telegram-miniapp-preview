const screens = [...document.querySelectorAll(".screen")];
const navItems = [...document.querySelectorAll(".nav-item")];
const quickLinks = [...document.querySelectorAll("[data-target]")];
const actionButtons = [...document.querySelectorAll("[data-action]")];
const mallTabs = [...document.querySelectorAll("[data-mall-tab]")];
const mallPanels = [...document.querySelectorAll("[data-mall-panel]")];

const languageSelect = document.getElementById("languageSelect");
const spinButton = document.getElementById("spinButton");
const wheel = document.getElementById("wheel");
const resultModal = document.getElementById("resultModal");
const modalEyebrow = document.getElementById("modalEyebrow");
const resultTitle = document.getElementById("resultTitle");
const resultBody = document.getElementById("resultBody");
const closeModal = document.getElementById("closeModal");

const rewardKeys = ["rm3", "extraSpin", "coin10", "freeShip", "rm5", "tryAgain", "rm10", "mystery"];

const state = {
  currentLanguage: "zh",
  spinning: false,
  currentRotation: 0,
  user: {
    ucoin: 86,
    invited: 12,
    verified: 4,
    joined: 7,
    spinsEarned: 4,
    spinCount: 2,
    lastCheckin: "2026-07-06",
    canCheckin: true,
    phone: "+60 12-883 7711",
    phoneVerified: true,
    phoneVerifiedAt: "2026-07-06 18:42",
  },
};

const inviteHistory = [
  { name: "Amir", time: "2026-07-07 14:02", status: "verified" },
  { name: "Siti", time: "2026-07-07 12:48", status: "pending" },
  { name: "Jason", time: "2026-07-06 20:15", status: "verified" },
  { name: "Hana", time: "2026-07-06 18:11", status: "rewardSent" },
];

const spinHistory = [
  { rewardKey: "rm5", time: "2026-07-07 10:45" },
  { rewardKey: "coin10", time: "2026-07-06 21:10" },
  { rewardKey: "extraSpin", time: "2026-07-05 19:08" },
];

const rewardHistory = [
  { item: "Bonus Credit RM5", points: 30, time: "2026-07-06 13:20", status: "approved" },
  { item: "Bonus Credit RM12", points: 70, time: "2026-07-05 11:02", status: "pending" },
];

const translations = {
  zh: {
    topbarEyebrow: "Telegram Mini App",
    topbarTitle: "Share & Get FREE Spin",
    homeChip: "邀请好友赢奖励",
    homeHeroTitle: "邀请好友验证马来西亚手机号，立即拿 FREE Spin",
    homeHeroDesc: "每有 1 位好友完成马来西亚手机号验证，你就获得 1 次免费转盘机会。",
    statFreeSpins: "免费次数",
    statUCoin: "UCoin",
    statInvited: "邀请人数",
    statVerified: "已验证",
    shareNow: "立即分享",
    spinNow: "立即抽奖",
    quickActionsTitle: "快捷功能",
    quickActionsHint: "常用入口",
    quickCheckin: "每日签到",
    checkinReady: "今天可领取",
    quickVerify: "手机号验证",
    phoneStatusVerified: "已验证",
    phoneStatusPending: "未验证",
    quickInvite: "邀请好友",
    quickMall: "UltraMall",
    quickMallDesc: "用 UCoin 兑换",
    memberTierTitle: "会员等级",
    spinPageTitle: "幸运转盘",
    spinPageDesc: "邀请更多好友完成验证，获得更多抽奖机会。",
    spinCore: "开始",
    rewardPoolTitle: "奖励池",
    viewHistory: "查看记录",
    referralEyebrow: "你的邀请卡",
    sharePageTitle: "邀请好友，赚更多 FREE Spin",
    shareTelegram: "分享到 Telegram",
    copyLink: "复制链接",
    statShared: "已分享",
    statJoined: "已加入",
    statSpinsEarned: "已得次数",
    inviteHistoryTitle: "邀请记录",
    viewAll: "查看全部",
    walletEyebrow: "奖励钱包",
    mallPageTitle: "UltraMall 福利",
    mallCreditTab: "Credit",
    mallGiftTab: "Gift",
    accountEyebrow: "Telegram 用户",
    phoneVerified: "手机号已验证",
    accountTier: "当前等级",
    statTotalInvites: "总邀请数",
    accountLastCheckin: "上次签到",
    menuInviteHistory: "邀请记录",
    menuSpinHistory: "抽奖记录",
    menuRewardHistory: "奖励记录",
    menuPhoneVerification: "手机号验证",
    menuTerms: "条款规则",
    menuHelp: "帮助中心",
    navHome: "首页",
    navSpin: "转盘",
    navShare: "分享",
    navMall: "商城",
    navAccount: "账户",
    spinResultEyebrow: "抽奖结果",
    nice: "知道了",
    getMoreSpins: "去赚更多机会",
    verified: "已验证",
    pending: "待完成",
    rewardSent: "已发奖励",
    approved: "已通过",
    resultNoSpinsTitle: "没有次数了",
    resultNoSpinsText: "邀请更多好友并完成验证，就能继续抽奖。",
    resultTryAgainTitle: "差一点点",
    resultTryAgainText: "这次没有中奖，再邀请好友拿更多机会。",
    resultWinTitle: "恭喜你！",
    resultWinText: "你获得了 {reward}",
    spinsAvailable: "{count} 次机会",
    tierBronze: "Bronze",
    tierSilver: "Silver",
    tierGold: "Gold",
    tierNextBronze: "再成功邀请 {count} 人升级到 Silver",
    tierNextSilver: "再成功邀请 {count} 人升级到 Gold",
    tierNextGold: "你已是最高等级 Gold",
    modalCheckinTitle: "每日签到成功",
    modalCheckinText: "今天签到已领取 +{points} UCoin。",
    modalInviteTitle: "邀请记录",
    modalSpinHistoryTitle: "抽奖记录",
    modalRewardHistoryTitle: "奖励记录",
    modalPhoneTitle: "手机号验证",
    modalTermsTitle: "条款规则",
    modalHelpTitle: "帮助中心",
    termsText: "1. 好友完成马来西亚手机号验证后，推荐人才会获得活动奖励。\n2. 同一个号码只计算一次有效验证。\n3. UCoin 与奖励可能需要审核。",
    helpText: "Telegram Support: @Ultrawin77vvip\nWhatsApp: +60 17-801 1570\nWebsite: ultrawin77.com/my",
    copySuccess: "邀请链接已复制",
    shareSoon: "这里之后会接 Telegram 原生分享。",
    phoneVerifiedLine: "手机号：{phone}",
    phoneVerifiedTime: "验证时间：{time}",
    phoneVerifyAction: "当前账号已验证，可参与邀请奖励。",
    rewardRm3: "RM3 Voucher",
    rewardExtraSpin: "额外一次",
    rewardCoin10: "10 Coins",
    rewardFreeShip: "Free Shipping",
    rewardRm5: "RM5 Voucher",
    rewardTryAgain: "再接再厉",
    rewardRm10: "RM10 Voucher",
    rewardMystery: "Mystery Gift",
  },
  en: {
    topbarEyebrow: "Telegram Mini App",
    topbarTitle: "Share & Get FREE Spin",
    homeChip: "Invite to win rewards",
    homeHeroTitle: "Invite friends to verify their Malaysia phone and get FREE Spins",
    homeHeroDesc: "Each friend who completes Malaysia phone verification gives you 1 FREE Spin.",
    statFreeSpins: "FREE Spins",
    statUCoin: "UCoin",
    statInvited: "Invited",
    statVerified: "Verified",
    shareNow: "Share Now",
    spinNow: "Spin Now",
    quickActionsTitle: "Quick Actions",
    quickActionsHint: "Quick access",
    quickCheckin: "Daily Check-In",
    checkinReady: "Ready today",
    quickVerify: "Phone Verify",
    phoneStatusVerified: "Verified",
    phoneStatusPending: "Not verified",
    quickInvite: "Invite Friend",
    quickMall: "UltraMall",
    quickMallDesc: "Redeem with UCoin",
    memberTierTitle: "Member Tier",
    spinPageTitle: "Lucky Spin",
    spinPageDesc: "Invite more friends to earn more spins after verification.",
    spinCore: "SPIN",
    rewardPoolTitle: "Reward Pool",
    viewHistory: "View history",
    referralEyebrow: "Your referral pass",
    sharePageTitle: "Invite Friends, Earn More Spins",
    shareTelegram: "Share on Telegram",
    copyLink: "Copy Link",
    statShared: "Shared",
    statJoined: "Joined",
    statSpinsEarned: "Spins Earned",
    inviteHistoryTitle: "Invite History",
    viewAll: "View all",
    walletEyebrow: "Reward wallet",
    mallPageTitle: "UltraMall Benefits",
    mallCreditTab: "Credit",
    mallGiftTab: "Gift",
    accountEyebrow: "Telegram user",
    phoneVerified: "Phone Verified",
    accountTier: "Current Tier",
    statTotalInvites: "Total Invites",
    accountLastCheckin: "Last Check-In",
    menuInviteHistory: "Invite History",
    menuSpinHistory: "Spin History",
    menuRewardHistory: "Reward History",
    menuPhoneVerification: "Phone Verification",
    menuTerms: "Terms & Rules",
    menuHelp: "Help Center",
    navHome: "Home",
    navSpin: "Spin",
    navShare: "Share",
    navMall: "Mall",
    navAccount: "Account",
    spinResultEyebrow: "Spin Result",
    nice: "Nice",
    getMoreSpins: "Get More Spins",
    verified: "Verified",
    pending: "Pending",
    rewardSent: "Reward Sent",
    approved: "Approved",
    resultNoSpinsTitle: "No Spins Left",
    resultNoSpinsText: "Invite more friends and ask them to complete verification.",
    resultTryAgainTitle: "Almost There",
    resultTryAgainText: "This round did not win a prize. Share more to get another chance.",
    resultWinTitle: "Congratulations!",
    resultWinText: "You won {reward}",
    spinsAvailable: "{count} spins available",
    tierBronze: "Bronze",
    tierSilver: "Silver",
    tierGold: "Gold",
    tierNextBronze: "{count} more successful invites to Silver",
    tierNextSilver: "{count} more successful invites to Gold",
    tierNextGold: "You are already at the highest Gold tier",
    modalCheckinTitle: "Daily Check-In Success",
    modalCheckinText: "Today's check-in granted +{points} UCoin.",
    modalInviteTitle: "Invite History",
    modalSpinHistoryTitle: "Spin History",
    modalRewardHistoryTitle: "Reward History",
    modalPhoneTitle: "Phone Verification",
    modalTermsTitle: "Terms & Rules",
    modalHelpTitle: "Help Center",
    termsText: "1. Referrers receive rewards only after a friend completes Malaysia phone verification.\n2. The same phone number counts once.\n3. UCoin and rewards may require approval.",
    helpText: "Telegram Support: @Ultrawin77vvip\nWhatsApp: +60 17-801 1570\nWebsite: ultrawin77.com/my",
    copySuccess: "Invite link copied",
    shareSoon: "Telegram native share can be connected here later.",
    phoneVerifiedLine: "Phone: {phone}",
    phoneVerifiedTime: "Verified at: {time}",
    phoneVerifyAction: "This account is verified and can join invite rewards.",
    rewardRm3: "RM3 Voucher",
    rewardExtraSpin: "Extra Spin",
    rewardCoin10: "10 Coins",
    rewardFreeShip: "Free Shipping",
    rewardRm5: "RM5 Voucher",
    rewardTryAgain: "Try Again",
    rewardRm10: "RM10 Voucher",
    rewardMystery: "Mystery Gift",
  },
  ms: {
    topbarEyebrow: "Telegram Mini App",
    topbarTitle: "Share & Get FREE Spin",
    homeChip: "Jemput untuk menang hadiah",
    homeHeroTitle: "Jemput rakan sahkan nombor Malaysia dan dapatkan FREE Spin",
    homeHeroDesc: "Setiap rakan yang melengkapkan pengesahan nombor telefon Malaysia memberi anda 1 FREE Spin.",
    statFreeSpins: "FREE Spins",
    statUCoin: "UCoin",
    statInvited: "Jemputan",
    statVerified: "Disahkan",
    shareNow: "Kongsi Sekarang",
    spinNow: "Pusing Sekarang",
    quickActionsTitle: "Tindakan Pantas",
    quickActionsHint: "Akses pantas",
    quickCheckin: "Daftar Masuk Harian",
    checkinReady: "Sedia hari ini",
    quickVerify: "Sahkan Telefon",
    phoneStatusVerified: "Disahkan",
    phoneStatusPending: "Belum disahkan",
    quickInvite: "Jemput Rakan",
    quickMall: "UltraMall",
    quickMallDesc: "Tebus dengan UCoin",
    memberTierTitle: "Tahap Ahli",
    spinPageTitle: "Lucky Spin",
    spinPageDesc: "Jemput lebih ramai rakan untuk dapatkan lebih banyak spin selepas pengesahan.",
    spinCore: "PUSING",
    rewardPoolTitle: "Kolam Hadiah",
    viewHistory: "Lihat rekod",
    referralEyebrow: "Pas jemputan anda",
    sharePageTitle: "Jemput Rakan, Dapat Lebih Banyak FREE Spin",
    shareTelegram: "Kongsi di Telegram",
    copyLink: "Salin Pautan",
    statShared: "Dikongsi",
    statJoined: "Sertai",
    statSpinsEarned: "Spin Diperoleh",
    inviteHistoryTitle: "Sejarah Jemputan",
    viewAll: "Lihat semua",
    walletEyebrow: "Dompet ganjaran",
    mallPageTitle: "Faedah UltraMall",
    mallCreditTab: "Credit",
    mallGiftTab: "Gift",
    accountEyebrow: "Pengguna Telegram",
    phoneVerified: "Telefon Disahkan",
    accountTier: "Tahap Semasa",
    statTotalInvites: "Jumlah Jemputan",
    accountLastCheckin: "Check-In Terakhir",
    menuInviteHistory: "Sejarah Jemputan",
    menuSpinHistory: "Sejarah Spin",
    menuRewardHistory: "Sejarah Ganjaran",
    menuPhoneVerification: "Pengesahan Telefon",
    menuTerms: "Terma & Peraturan",
    menuHelp: "Pusat Bantuan",
    navHome: "Utama",
    navSpin: "Spin",
    navShare: "Kongsi",
    navMall: "Mall",
    navAccount: "Akaun",
    spinResultEyebrow: "Hasil Spin",
    nice: "Baik",
    getMoreSpins: "Dapatkan Lagi Spin",
    verified: "Disahkan",
    pending: "Menunggu",
    rewardSent: "Ganjaran Dihantar",
    approved: "Diluluskan",
    resultNoSpinsTitle: "Tiada Spin Lagi",
    resultNoSpinsText: "Jemput lebih ramai rakan dan minta mereka lengkapkan pengesahan.",
    resultTryAgainTitle: "Hampir Berjaya",
    resultTryAgainText: "Pusingan ini belum menang. Kongsi lagi untuk peluang seterusnya.",
    resultWinTitle: "Tahniah!",
    resultWinText: "Anda menang {reward}",
    spinsAvailable: "{count} spin tersedia",
    tierBronze: "Bronze",
    tierSilver: "Silver",
    tierGold: "Gold",
    tierNextBronze: "{count} lagi jemputan berjaya ke Silver",
    tierNextSilver: "{count} lagi jemputan berjaya ke Gold",
    tierNextGold: "Anda sudah di tahap Gold tertinggi",
    modalCheckinTitle: "Daftar Masuk Berjaya",
    modalCheckinText: "Daftar masuk hari ini memberi +{points} UCoin.",
    modalInviteTitle: "Sejarah Jemputan",
    modalSpinHistoryTitle: "Sejarah Spin",
    modalRewardHistoryTitle: "Sejarah Ganjaran",
    modalPhoneTitle: "Pengesahan Telefon",
    modalTermsTitle: "Terma & Peraturan",
    modalHelpTitle: "Pusat Bantuan",
    termsText: "1. Pemberi rujukan menerima ganjaran selepas rakan melengkapkan pengesahan nombor Malaysia.\n2. Nombor yang sama hanya dikira sekali.\n3. UCoin dan hadiah mungkin perlu kelulusan.",
    helpText: "Telegram Support: @Ultrawin77vvip\nWhatsApp: +60 17-801 1570\nWebsite: ultrawin77.com/my",
    copySuccess: "Pautan jemputan telah disalin",
    shareSoon: "Perkongsian asli Telegram boleh disambung kemudian.",
    phoneVerifiedLine: "Telefon: {phone}",
    phoneVerifiedTime: "Disahkan pada: {time}",
    phoneVerifyAction: "Akaun ini telah disahkan dan boleh menyertai ganjaran jemputan.",
    rewardRm3: "Baucar RM3",
    rewardExtraSpin: "Spin Tambahan",
    rewardCoin10: "10 Syiling",
    rewardFreeShip: "Penghantaran Percuma",
    rewardRm5: "Baucar RM5",
    rewardTryAgain: "Cuba Lagi",
    rewardRm10: "Baucar RM10",
    rewardMystery: "Hadiah Misteri",
  },
};

function t(key, params = {}) {
  const table = translations[state.currentLanguage] || translations.en;
  let text = table[key] || translations.en[key] || key;
  Object.entries(params).forEach(([name, value]) => {
    text = text.replace(`{${name}}`, String(value));
  });
  return text;
}

function rewardLabel(rewardKey) {
  const rewardMap = {
    rm3: "rewardRm3",
    extraSpin: "rewardExtraSpin",
    coin10: "rewardCoin10",
    freeShip: "rewardFreeShip",
    rm5: "rewardRm5",
    tryAgain: "rewardTryAgain",
    rm10: "rewardRm10",
    mystery: "rewardMystery",
  };

  return t(rewardMap[rewardKey]);
}

function getTierInfo(invited) {
  if (invited >= 50) {
    return { key: "gold", multiplier: 3, progress: 100, next: t("tierNextGold") };
  }

  if (invited >= 20) {
    return {
      key: "silver",
      multiplier: 2,
      progress: ((invited - 20) / 30) * 100,
      next: t("tierNextSilver", { count: 50 - invited }),
    };
  }

  return {
    key: "bronze",
    multiplier: 1,
    progress: (invited / 20) * 100,
    next: t("tierNextBronze", { count: 20 - invited }),
  };
}

function setActiveScreen(target) {
  screens.forEach((screen) => {
    screen.classList.toggle("is-active", screen.dataset.screen === target);
  });

  navItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.target === target);
  });
}

function openModal(eyebrow, title, bodyHtml, ctaTarget = "share") {
  modalEyebrow.textContent = eyebrow;
  resultTitle.textContent = title;
  resultBody.innerHTML = bodyHtml;
  resultModal.querySelector(".secondary-btn").dataset.target = ctaTarget;
  resultModal.classList.add("is-open");
}

function renderInviteList() {
  const root = document.getElementById("inviteList");
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
  const tier = getTierInfo(state.user.invited);
  const tierLabel = t(`tier${tier.key.charAt(0).toUpperCase()}${tier.key.slice(1)}`);

  document.documentElement.lang = state.currentLanguage === "zh" ? "zh-CN" : state.currentLanguage;
  document.getElementById("spinCountHome").textContent = state.user.spinCount;
  document.getElementById("spinCountSpin").textContent = t("spinsAvailable", { count: state.user.spinCount });
  document.getElementById("ucoinHome").textContent = state.user.ucoin;
  document.getElementById("invitedHome").textContent = state.user.invited;
  document.getElementById("verifiedHome").textContent = state.user.verified;
  document.getElementById("sharedCount").textContent = state.user.invited;
  document.getElementById("joinedCount").textContent = state.user.joined;
  document.getElementById("verifiedCount").textContent = state.user.verified;
  document.getElementById("spinsEarnedCount").textContent = state.user.spinsEarned;
  document.getElementById("walletUcoin").textContent = `UCoin ${state.user.ucoin}`;
  document.getElementById("ucoinAccount").textContent = state.user.ucoin;
  document.getElementById("accountTierShort").textContent = tierLabel;
  document.getElementById("totalInvitesAccount").textContent = state.user.invited;
  document.getElementById("lastCheckinShort").textContent = state.user.lastCheckin.slice(5);
  document.getElementById("checkinStatus").textContent = state.user.canCheckin ? t("checkinReady") : state.user.lastCheckin;
  document.getElementById("phoneStatusText").textContent = state.user.phoneVerified ? t("phoneStatusVerified") : t("phoneStatusPending");
  document.getElementById("inviteDigest").textContent = `${state.user.verified} ${t("statVerified")}`;
  document.getElementById("phoneVerifiedTag").textContent = state.user.phoneVerified ? t("phoneVerified") : t("phoneStatusPending");
  document.getElementById("tierBadge").textContent = `${tierLabel} x${tier.multiplier}`;
  document.getElementById("tierName").textContent = tierLabel;
  document.getElementById("tierProgressText").textContent = tier.next;
  document.getElementById("tierMultiplier").textContent = `x${tier.multiplier}`;
  document.getElementById("tierFill").style.width = `${Math.max(8, tier.progress)}%`;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

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
    "share",
  );
}

function showSpinHistory() {
  openModal(
    t("menuSpinHistory"),
    t("modalSpinHistoryTitle"),
    `<div class="modal-list">${spinHistory
      .map((item) => `<div class="modal-row"><strong>${rewardLabel(item.rewardKey)}</strong><span>${item.time}</span></div>`)
      .join("")}</div>`,
    "spin",
  );
}

function showRewardHistory() {
  openModal(
    t("menuRewardHistory"),
    t("modalRewardHistoryTitle"),
    `<div class="modal-list">${rewardHistory
      .map((item) => `<div class="modal-row"><strong>${item.item}</strong><span>${item.points} UCoin | ${item.time} | ${t(item.status)}</span></div>`)
      .join("")}</div>`,
    "mall",
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
    "account",
  );
}

function showTerms() {
  openModal(
    t("menuTerms"),
    t("modalTermsTitle"),
    `<div class="modal-copy">${t("termsText").replaceAll("\n", "<br>")}</div>`,
    "account",
  );
}

function showHelp() {
  openModal(
    t("menuHelp"),
    t("modalHelpTitle"),
    `<div class="modal-copy">${t("helpText").replaceAll("\n", "<br>")}</div>`,
    "account",
  );
}

quickLinks.forEach((button) => {
  button.addEventListener("click", () => {
    resultModal.classList.remove("is-open");
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
      if (state.user.canCheckin) {
        const points = getTierInfo(state.user.invited).multiplier;
        state.user.canCheckin = false;
        state.user.ucoin += points;
        state.user.lastCheckin = "2026-07-07";
        renderDashboard();
        openModal(
          t("quickCheckin"),
          t("modalCheckinTitle"),
          `<div class="modal-copy">${t("modalCheckinText", { points })}</div>`,
          "home",
        );
      } else {
        openModal(t("quickCheckin"), t("quickCheckin"), `<div class="modal-copy">${state.user.lastCheckin}</div>`, "home");
      }

      return;
    }

    if (action === "share-telegram") {
      openModal(t("navShare"), t("shareTelegram"), `<div class="modal-copy">${t("shareSoon")}</div>`, "share");
      return;
    }

    if (action === "copy-link") {
      try {
        await navigator.clipboard.writeText(document.getElementById("refLinkText").textContent);
      } catch {
        // Clipboard can fail in file:// preview mode. The demo still shows success feedback.
      }

      openModal(t("navShare"), t("copyLink"), `<div class="modal-copy">${t("copySuccess")}</div>`, "share");
      return;
    }

    if (action === "invite-history") showInviteHistory();
    if (action === "spin-history") showSpinHistory();
    if (action === "reward-history") showRewardHistory();
    if (action === "phone-verification") showPhoneInfo();
    if (action === "terms") showTerms();
    if (action === "help") showHelp();
  });
});

spinButton.addEventListener("click", () => {
  if (state.spinning) return;

  if (state.user.spinCount <= 0) {
    openModal(
      t("spinResultEyebrow"),
      t("resultNoSpinsTitle"),
      `<div class="modal-copy">${t("resultNoSpinsText")}</div>`,
      "share",
    );
    return;
  }

  state.spinning = true;
  state.user.spinCount -= 1;
  renderDashboard();

  const rewardIndex = Math.floor(Math.random() * rewardKeys.length);
  const rewardKey = rewardKeys[rewardIndex];
  const sectorAngle = 360 / rewardKeys.length;
  const stopAngle = 360 - rewardIndex * sectorAngle - sectorAngle / 2;

  state.currentRotation += 1800 + stopAngle;
  wheel.style.transform = `rotate(${state.currentRotation}deg)`;

  window.setTimeout(() => {
    if (rewardKey === "extraSpin") {
      state.user.spinCount += 1;
    }

    renderDashboard();
    openModal(
      t("spinResultEyebrow"),
      rewardKey === "tryAgain" ? t("resultTryAgainTitle") : t("resultWinTitle"),
      `<div class="modal-copy">${
        rewardKey === "tryAgain"
          ? t("resultTryAgainText")
          : t("resultWinText", { reward: rewardLabel(rewardKey) })
      }</div>`,
      "share",
    );
    state.spinning = false;
  }, 4200);
});

languageSelect.addEventListener("change", () => {
  state.currentLanguage = languageSelect.value;
  applyTranslations();
});

closeModal.addEventListener("click", () => {
  resultModal.classList.remove("is-open");
});

resultModal.addEventListener("click", (event) => {
  if (event.target === resultModal) {
    resultModal.classList.remove("is-open");
  }
});

applyTranslations();
