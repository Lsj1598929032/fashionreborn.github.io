function initNavigation() {
  // 处理导航链接点击
  document.querySelectorAll('.nav-dropdown .dropdown-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // 平滑滚动到目标部分
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // 更新URL
        updateURL(targetId);
        
        // 高亮当前部分
        highlightActiveSection(targetId.substring(1));
        
        // 关闭下拉菜单
        const dropdown = this.closest('.nav-dropdown');
        if (dropdown) {
          dropdown.style.display = 'none';
        }
      }
    });
  });

  // 处理页面加载和URL变化
  window.addEventListener('load', handleURLNavigation);
  window.addEventListener('popstate', (event) => {
    if (event.state && event.state.section) {
      const targetSection = document.querySelector(event.state.section);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        highlightActiveSection(event.state.section.substring(1));
      }
    }
  });

  // 监听滚动以更新导航状态
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id], .module-card[id]');
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 60) {
        currentSection = section.getAttribute('id');
      }
    });
    
    if (currentSection) {
      highlightActiveSection(currentSection);
    }
  });
}

// 高亮当前活动部分
function highlightActiveSection(sectionId) {
  // 移除所有导航项的活动状态
  document.querySelectorAll('.nav-dropdown .dropdown-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // 添加当前部分的活动状态
  const activeItem = document.querySelector(`.nav-dropdown .dropdown-item[href="#${sectionId}"]`);
  if (activeItem) {
    activeItem.classList.add('active');
  }
} 