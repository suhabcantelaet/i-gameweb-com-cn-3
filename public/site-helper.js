// public/site-helper.js
(function() {
  'use strict';

  // 配置信息
  const SITE_URL = 'https://i-gameweb.com.cn';
  const KEYWORD = '爱游戏';
  const VERSION = '1.0.0';

  // 提示卡片类型
  const CARD_TYPES = {
    INFO: 'info',
    WARNING: 'warning',
    TIP: 'tip'
  };

  // 关键词数据
  const keywordData = [
    { name: '爱游戏', color: '#e74c3c', description: '官方平台' },
    { name: '攻略', color: '#2ecc71', description: '玩法指南' },
    { name: '社区', color: '#3498db', description: '玩家交流' },
    { name: '更新', color: '#f39c12', description: '最新动态' }
  ];

  // 访问说明内容
  const visitInfo = {
    title: '欢迎来到' + KEYWORD,
    content: '本平台提供丰富的游戏资讯与互动社区，请通过 ' + SITE_URL + ' 访问。',
    tips: [
      '使用最新浏览器获得最佳体验',
      '建议开启 JavaScript 支持',
      '部分功能需要登录账户'
    ]
  };

  // 创建提示卡片
  function createCard(type, title, message) {
    const card = document.createElement('div');
    card.className = 'site-card site-card-' + type;
    card.setAttribute('data-type', type);

    const header = document.createElement('div');
    header.className = 'card-header';
    header.textContent = title || type.toUpperCase();

    const body = document.createElement('div');
    body.className = 'card-body';
    body.textContent = message || '';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'card-close';
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', function() {
      card.style.display = 'none';
    });

    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(closeBtn);

    return card;
  }

  // 创建关键词徽章
  function createBadge(keywordItem) {
    const badge = document.createElement('span');
    badge.className = 'site-badge';
    badge.style.backgroundColor = keywordItem.color || '#666';
    badge.textContent = keywordItem.name;
    badge.title = keywordItem.description || '';

    badge.addEventListener('click', function() {
      showToast('点击了标签：' + keywordItem.name);
    });

    return badge;
  }

  // 显示临时消息提示
  function showToast(message, duration) {
    duration = duration || 3000;
    const toast = document.createElement('div');
    toast.className = 'site-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(function() {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, duration);
  }

  // 渲染页面组件
  function renderComponents() {
    const container = document.createElement('div');
    container.className = 'site-helper-container';
    container.id = 'siteHelperContainer';

    // 访问说明卡片
    const infoCard = createCard(
      CARD_TYPES.INFO,
      visitInfo.title,
      visitInfo.content
    );
    container.appendChild(infoCard);

    // 提示列表
    const tipList = document.createElement('ul');
    tipList.className = 'site-tip-list';
    visitInfo.tips.forEach(function(tipText) {
      const item = document.createElement('li');
      item.textContent = tipText;
      tipList.appendChild(item);
    });
    container.appendChild(tipList);

    // 关键词区域
    const badgesContainer = document.createElement('div');
    badgesContainer.className = 'site-badges';
    badgesContainer.appendChild(createBadge(keywordData[0]));
    badgesContainer.appendChild(createBadge(keywordData[1]));
    badgesContainer.appendChild(createBadge(keywordData[2]));
    badgesContainer.appendChild(createBadge(keywordData[3]));
    container.appendChild(badgesContainer);

    document.body.appendChild(container);
  }

  // 自动初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderComponents);
  } else {
    renderComponents();
  }

  // 暴露一些功能到全局（可选）
  window.siteHelper = {
    version: VERSION,
    showToast: showToast,
    createCard: createCard,
    keywordData: keywordData,
    siteUrl: SITE_URL
  };

})();