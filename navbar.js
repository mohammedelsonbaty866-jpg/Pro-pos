class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .navbar {
          height: 60px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .logo {
          font-weight: 700;
          font-size: 1.5rem;
        }
        .nav-link {
          transition: all 0.2s ease;
        }
        .nav-link:hover {
          color: #3b82f6;
        }
        .user-menu {
          transition: all 0.2s ease;
        }
        .user-menu:hover {
          background-color: #f3f4f6;
        }
      </style>
      <nav class="navbar bg-white px-6 flex items-center justify-between fixed top-0 left-0 right-0 z-10">
        <div class="flex items-center">
          <button id="sidebarToggle" class="mr-4 text-gray-600 hover:text-gray-900">
            <i data-feather="menu"></i>
          </button>
          <a href="index.html" class="logo text-blue-600">BazaarMaster</a>
        </div>
        
        <div class="flex items-center space-x-6">
          <div class="relative">
            <button class="text-gray-600 hover:text-gray-900">
              <i data-feather="bell"></i>
              <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </button>
          </div>
          
          <div class="relative">
            <button class="user-menu flex items-center space-x-2 p-1 rounded-full">
              <img src="http://static.photos/people/200x200/1" alt="User" class="h-8 w-8 rounded-full">
              <span class="hidden md:inline">محمد أحمد</span>
              <i data-feather="chevron-down" class="hidden md:inline"></i>
            </button>
            
            <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">الملف الشخصي</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">الإعدادات</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">تسجيل الخروج</a>
            </div>
          </div>
        </div>
      </nav>
    `;
    
    // Add event listeners
    this.shadowRoot.getElementById('sidebarToggle').addEventListener('click', () => {
      document.querySelector('custom-sidebar').toggleSidebar();
    });
    
    const userMenu = this.shadowRoot.querySelector('.user-menu');
    const dropdown = this.shadowRoot.querySelector('.absolute');
    
    userMenu.addEventListener('click', () => {
      dropdown.classList.toggle('hidden');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.shadowRoot.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });
  }
}

customElements.define('custom-navbar', CustomNavbar);
