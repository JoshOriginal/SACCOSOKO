# SACCO-SOKO - Admin Dashboard Guide

## Overview

A comprehensive admin panel with professional UX for managing all aspects of the SACCO-SOKO e-commerce platform. The admin area includes dashboard analytics, product management, order tracking, customer insights, seller management, advanced reporting, and system settings.

## Admin Routes

All admin routes are prefixed with `/admin` and wrapped with the `AdminLayout` component which provides a consistent sidebar navigation.

### Available Admin Pages

| Route | Page | Features |
|-------|------|----------|
| `/admin` | **Admin Dashboard** | KPI cards, revenue trends, category distribution, recent orders |
| `/admin/products` | **Product Management** | Search, add/edit/delete products, stock status, inventory alerts |
| `/admin/orders` | **Order Management** | Order filtering by status, customer search, export functionality |
| `/admin/customers` | **Customer Analytics** | Customer database, contact info, order history, spending analysis |
| `/admin/sellers` | **Seller Management** | Seller approvals, commission management, performance tracking |
| `/admin/analytics` | **Analytics & Insights** | Revenue analysis, product performance, customer growth trends |
| `/admin/reports` | **Reports & Export** | Sales reports, return analysis, category performance, custom reports |
| `/admin/settings` | **Admin Settings** | Business info, notifications, security, appearance preferences |

## Key Features

### 1. Admin Dashboard (`/admin`)
- **Statistics Cards**: Revenue, Orders, Customers, Products with % changes
- **Revenue Chart**: 6-month trend visualization
- **Category Distribution**: Pie chart showing product categories
- **Recent Orders Table**: Latest orders with status badges
- **Inventory Alerts**: Low stock notifications

### 2. Product Management (`/admin/products`)
- **Search & Filter**: Quick product lookup
- **Add Product Dialog**: Easy product addition form
- **Product Table**: Comprehensive product listing with:
  - Product name and category
  - Price and stock levels
  - Status indicators
  - Edit, view, and delete actions
- **Stock Status**: Color-coded indicators (green >20, yellow >0, red 0)
- **Summary Cards**: Total, In Stock, Out of Stock counts

### 3. Order Management (`/admin/orders`)
- **Order Statistics**: Total, Pending, Processing, Delivered counts
- **Advanced Search**: Find by Order ID, Customer name, or Email
- **Status Filtering**: Filter orders by status
- **Order Table**: Comprehensive order details with:
  - Order ID and date
  - Customer information
  - Item count and total amount
  - Status badges
  - Action buttons
- **Export Functionality**: Download order data

### 4. Customer Analytics (`/admin/customers`)
- **Customer Statistics**: Total, Active, Average Orders, Total Revenue
- **Search Capability**: Find customers by name, email, or phone
- **Customer Database**: Full contact and activity information
- **Customer Insights**: 
  - Top customers
  - Average order value
  - Most active regions
- **Status Tracking**: Active/Inactive indicators

### 5. Seller Management (`/admin/sellers`)
- **Seller Statistics**: Total, Active, Pending, Suspended counts
- **Seller Search**: Find by business name, owner, or email
- **Status Filtering**: Filter by seller status
- **Seller Details**: View and manage:
  - Business and owner information
  - Contact details
  - Product counts and sales
  - Ratings and performance
- **Seller Approval**: Approve pending seller applications
- **Commission Management**: Adjust seller commission rates
- **Action Dialogs**: Quick access to seller details and management

### 6. Analytics & Reports (`/admin/analytics`)
- **Revenue Analysis**: 6-month revenue and order trends
- **Product Performance**: Top 5 performing products with revenue breakdown
- **Category Analytics**: Sales distribution by product category
- **Customer Growth**: Customer acquisition trends
- **Customer Segments**: High-value, regular, occasional, and dormant customers
- **Key Metrics**: ROI, conversion rates, customer lifetime value
- **Multiple Visualizations**: Line charts, bar charts, pie charts

### 7. Reports & Export (`/admin/reports`)
- **Sales Report**: Revenue trends, top products, performance metrics
- **Returns Report**: Return reasons analysis, return trends, refund tracking
- **Category Report**: Category rankings and sales distribution
- **Custom Report Generator**: 
  - Flexible date ranges
  - Multiple export formats (PDF, Excel, CSV)
  - Customizable sections
- **Report History**: Access previously generated reports

### 8. Admin Settings (`/admin/settings`)
- **Business Information**: Company details, contact information
- **Platform Configuration**: Commission rates, order minimums, return periods
- **Email Notifications**: Configurable notification preferences
- **Security Settings**: 
  - Password management
  - Two-factor authentication
  - Active sessions management
- **Appearance**: Theme and display customization

## Component Architecture

### AdminLayout Component (`src/components/layout/AdminLayout.tsx`)
- **Responsive Sidebar Navigation**: Collapsible menu with icons
- **Top Header**: Notifications and user profile
- **Active Route Highlighting**: Visual indication of current page
- **Mobile Responsive**: Sidebar collapses on smaller screens
- **Menu Items**:
  - Dashboard
  - Products
  - Orders
  - Customers
  - Sellers
  - Analytics
  - Reports
  - Settings

### Page Components
All admin pages are located in `src/pages/` and export as default components:
- `AdminDashboard.tsx` - Dashboard with KPIs and charts
- `AdminProducts.tsx` - Product management interface
- `AdminOrders.tsx` - Order tracking and management
- `AdminCustomers.tsx` - Customer database and analytics
- `AdminSellers.tsx` - Seller management system
- `AdminAnalytics.tsx` - Detailed analytics and insights
- `AdminReports.tsx` - Report generation and export
- `AdminSettings.tsx` - System configuration

## Data Visualization

The admin area uses **Recharts** for professional data visualization:
- **Line Charts**: Revenue trends, customer growth
- **Bar Charts**: Category performance, product rankings
- **Pie Charts**: Category distribution, revenue breakdown

## UI Components Used

- **Shadcn/ui Components**: Cards, Buttons, Inputs, Dialogs, Select, Badges, Tabs, Alerts
- **Lucide Icons**: 30+ icons for visual indicators and navigation
- **Tailwind CSS**: Responsive design with utility-first styling
- **Recharts**: Data visualization library

## Features & Best Practices

✅ **Professional Design**: Clean, modern interface with consistent styling  
✅ **Data-Driven**: Charts, statistics, and insights throughout  
✅ **User-Friendly**: Intuitive navigation with clear CTAs  
✅ **Responsive**: Mobile-friendly layout with collapsible sidebar  
✅ **Actionable**: Easy-to-use forms, filters, and management tools  
✅ **Real-Time Data**: Sample data simulating live metrics  
✅ **Export Capabilities**: Download reports in multiple formats  
✅ **Search & Filter**: Quick access to specific data  
✅ **Status Indicators**: Clear visual feedback with badges and icons  
✅ **Dialog Forms**: Non-disruptive data entry and editing  

## Getting Started

### Access the Admin Area
```
http://localhost:8083/admin
```

### Navigation
- Use the sidebar to navigate between admin pages
- Click on menu items to switch between sections
- Use the collapsible button to minimize sidebar on smaller screens

### Common Tasks

**Add a New Product**
1. Go to `/admin/products`
2. Click "Add Product" button
3. Fill in product details
4. Click "Save"

**Filter Orders by Status**
1. Go to `/admin/orders`
2. Use the status dropdown to filter
3. View filtered results in table

**View Sales Analytics**
1. Go to `/admin/analytics`
2. Switch between tabs (Revenue, Products, Categories, Customers)
3. View charts and metrics
4. Download reports

**Approve Seller Applications**
1. Go to `/admin/sellers`
2. Filter by "Pending" status
3. Click action button on seller
4. Click "Approve" to activate account

**Generate Custom Reports**
1. Go to `/admin/reports`
2. Click "Custom Report" tab
3. Select report type and date range
4. Choose export format
5. Click "Generate Report"

## Technical Details

### Dependencies
- React 18+ with TypeScript
- React Router DOM v6
- Shadcn/ui component library
- Recharts for data visualization
- Lucide React for icons
- Tailwind CSS for styling

### File Structure
```
src/
├── pages/
│   ├── AdminDashboard.tsx
│   ├── AdminProducts.tsx
│   ├── AdminOrders.tsx
│   ├── AdminCustomers.tsx
│   ├── AdminSellers.tsx
│   ├── AdminAnalytics.tsx
│   ├── AdminReports.tsx
│   └── AdminSettings.tsx
├── components/
│   └── layout/
│       └── AdminLayout.tsx
└── App.tsx (contains admin routes)
```

### Sample Data
All pages include realistic sample data for demonstration:
- Products with inventory levels
- Orders with customer details
- Customers with order history
- Sellers with commission rates
- Revenue metrics and trends
- Return reasons and statistics

## Future Enhancements

Potential features to add:
- **Authentication**: Admin login and role-based access control
- **Database Integration**: Connect to real backend API
- **Real-Time Updates**: WebSocket integration for live data
- **Advanced Filters**: More sophisticated search and filtering
- **Bulk Actions**: Select multiple items for batch operations
- **Audit Logs**: Track admin actions and changes
- **User Roles**: Different admin permission levels
- **Email Integration**: Send notifications from admin panel
- **Inventory Alerts**: Automated low stock alerts
- **Performance Optimization**: Pagination for large datasets

## Support

For issues or questions about the admin dashboard, refer to the component source code in `src/pages/` and `src/components/layout/AdminLayout.tsx`.

---

**Last Updated**: June 2024  
**Version**: 1.0  
**Admin Area Status**: ✅ Fully Functional
