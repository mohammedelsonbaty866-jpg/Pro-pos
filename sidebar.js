class CustomSidebar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .sidebar {
          width: 250px;
          transition: all 0.3s ease;
        }
        .sidebar.collapsed {
          width: 70px;
        }
        .sidebar-link {
          transition: all 0.2s ease;
        }
        .sidebar-link:hover {
          background-color: #f3f4f6;
        }
        .sidebar-link.active {
          background-color: #e0e7ff;
          color: #3b82f6;
          border-right: 3px solid #3b82f6;
        }
        .sidebar-link i {
          min-width: 24px;
        }
        .sidebar-link-text {
          transition: opacity 0.3s ease;
        }
        .sidebar.collapsed .sidebar-link-text {
          opacity: 0;
          width: 0;
          display: none;
        }
        .sidebar.collapsed .sidebar-link {
          justify-content: center;
        }
      </style>
      <aside class="sidebar bg-white h-screen shadow-md fixed top-0 right-0 pt-16 overflow-y-auto">
        <div class="p-4">
          <ul class="space-y-2">
            <li>
              <a href="index.html" class="sidebar-link flex items-center p-3 rounded-lg active">
                <i data-feather="home"></i>
                <span class="sidebar-link-text mr-3">الرئيسية</span>
              </a>
            </li>
            <li>
              <a href="invoices.html" class="sidebar-link flex items-center p-3 rounded-lg">
                <i data-feather="file-text"></i>
                <span class="sidebar-link-text mr-3">الفواتير</span>
              </a>
            </li>
            <li>
              <a href="customers.html" class="sidebar-link flex items-center p-3 rounded-lg">
                <i data-feather="users"></i>
                <span class="sidebar-link-text mr-3">العملاء</span>
              </a>
            </li>
            <li>
              <a href="products.html" class="sidebar-link flex items-center p-3 rounded-lg">
                <i data-feather="package"></i>
                <span class="sidebar-link-text mr-3">المنتجات</span>
              </a>
            </li>
            <li>
              <a href="inventory.html" class="sidebar-link flex items-center p-3 rounded-lg">
                <i data-feather="database"></i>
                <span class="sidebar-link-text mr-3">المخزون</span>
              </a>
            </li>
            <li>
              <a href="suppliers.html" class="sidebar-link flex items-center p-3 rounded-lg">
                <i data-feather="truck"></i>
                <span class="sidebar-link-text mr-3">الموردين</span>
              </a>
            </li>
            <li>
              <a href="purchases.html" class="sidebar-link flex items-center p-3 rounded-lg">
                <i data-feather="shopping-cart"></i>
                <span class="sidebar-link-text mr-3">المشتريات</span>
              </a>
            </li>
            <li>
              <a href="expenses.html" class="sidebar-link flex items-center p-3 rounded-lg">
                <i data-feather="dollar-sign"></i>
                <span class="sidebar-link-text mr-3">المصروفات</span>
              </a>
            </li>
            <li>
              <a href="reports.html" class="sidebar-link flex items-center p-3 rounded-lg">
                <i data-feather="pie-chart"></i>
                <span class="sidebar-link-text mr-3">التقارير</span>
              </a>
            </li>
            <li>
              <a href="settings.html" class="sidebar-link flex items-center p-3 rounded-lg">
                <i data-feather="settings"></i>
                <span class="sidebar-link-text mr-3">الإعدادات</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    `;
  }
  
  toggleSidebar() {
    const sidebar = this.shadowRoot.querySelector('.sidebar');
    sidebar.classList.toggle('collapsed');
  }
}

customElements.define('custom-sidebar', CustomSidebar);
