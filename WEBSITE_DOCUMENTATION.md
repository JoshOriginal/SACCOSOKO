# SACCO-SOKO - Complete Website Documentation

## Table of Contents
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Admin Panel Features](#admin-panel-features)
4. [Public Pages](#public-pages)
5. [Authentication System](#authentication-system)
6. [Theme System](#theme-system)
7. [Security Features](#security-features)
8. [Database & Integration](#database--integration)

---

## Overview

**SACCO-SOKO** is a comprehensive e-commerce and logistics platform designed to connect sellers and customers across Kenya. The platform provides an admin dashboard for management and a public-facing website for customer interactions.

### Key Features:
- **Admin Dashboard**: Complete platform management with analytics, product management, order tracking, customer management, and seller oversight
- **Public Portal**: Shop, product discovery, order tracking, seller registration, and customer support
- **Authentication**: Secure admin login with session management
- **Theme Customization**: Dynamic color themes and dark/light mode support
- **Security**: Password management, two-factor authentication setup, and protected admin routes

---

## Technology Stack

### Frontend Framework
- **React 18** - UI library with functional components
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and dev server
- **React Router v6** - Client-side routing with protected routes
- **Context API** - State management for Auth and Theme

### UI Components & Styling
- **Shadcn/ui** - Accessible component library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library (200+ icons)
- **Recharts** - Data visualization for analytics

### Backend & Database
- **Supabase** - PostgreSQL database and backend services
- **TypeScript Types** - Type-safe database operations

### State Management & Persistence
- **localStorage** - Client-side persistence for:
  - Admin authentication sessions
  - Theme preferences (color & dark mode)

---

## Admin Panel Features

The admin dashboard is accessible at `/admin/dashboard` and requires authentication (Username: `SACCO-SOKO`, Password: `#SACCO-SOKO2025`).

### 1. **Dashboard** (`/admin/dashboard`)
**Real-time Platform Overview**
- Key Performance Indicators (KPIs):
  - Total Revenue (₦)
  - Total Orders Count
  - Active Sellers Count
  - Customer Count
- Visual Charts:
  - Revenue Trend Chart (Last 7 days)
  - Order Status Distribution (Pie chart)
  - Top Products (Bar chart)
- Recent Orders Table:
  - Order ID, Customer, Status, Amount, Date
  - Quick status updates
- Performance Metrics:
  - Order fulfillment rate
  - Average order value
  - Customer satisfaction metrics

### 2. **Products Management** (`/admin/products`)
**Complete Product Lifecycle Management**
- Product Listing:
  - Search functionality
  - Filter by category, status, stock level
  - Sort by price, name, date added
  - Pagination support
- Product Operations:
  - Add new products
  - Edit product details
  - Delete products
  - Bulk operations
- Product Information Fields:
  - Product name and description
  - Category assignment
  - Price and cost
  - Stock quantity and SKU
  - Images and thumbnails
  - Seller assignment
- Inventory Management:
  - Track stock levels
  - Low stock alerts
  - Stock status indicators

### 3. **Orders Management** (`/admin/orders`)
**Order Processing & Tracking**
- Order Listing:
  - Search by order ID or customer
  - Filter by status (Pending, Processing, Shipped, Delivered, Cancelled)
  - Filter by date range
  - Sort options
- Order Details:
  - Order ID, customer info, order date
  - Items ordered with quantities and prices
  - Delivery address
  - Payment method and status
  - Order timeline/history
- Order Operations:
  - Update order status
  - View customer details
  - Print orders
  - Cancel orders
  - Add notes/comments

### 4. **Customers Management** (`/admin/customers`)
**Customer Database & Analytics**
- Customer Directory:
  - Complete customer list
  - Search by name, email, phone
  - Filter by registration date, purchase history
  - View customer details:
    - Personal information
    - Contact details
    - Address book
    - Account creation date
- Customer Analytics:
  - Total purchases
  - Total spending
  - Last purchase date
  - Lifetime value
  - Account status
- Customer Actions:
  - View order history
  - Send messages/notifications
  - Manage customer accounts
  - Track customer segments

### 5. **Sellers Management** (`/admin/sellers`)
**Seller Onboarding & Oversight**
- Seller Directory:
  - Active sellers list
  - Pending seller applications
  - Seller verification status
  - Search and filter options
- Seller Information:
  - Business name and details
  - Contact information
  - Business license/registration
  - Bank account details
  - Commission rates
- Seller Performance:
  - Total sales and revenue
  - Product count
  - Customer ratings
  - Return/complaint rate
  - Seller reliability score
- Seller Actions:
  - Approve/reject applications
  - Suspend/activate accounts
  - Update commission rates
  - View seller analytics
  - Manage seller disputes

### 6. **Analytics & Reports** (`/admin/analytics`)
**Business Intelligence & Performance Tracking**
- Revenue Analytics:
  - Daily, weekly, monthly revenue
  - Revenue by category
  - Revenue by seller
  - Top-performing sellers
- Sales Analysis:
  - Units sold
  - Average order value
  - Sales trends
  - Seasonal patterns
- Customer Analytics:
  - New customer acquisition rate
  - Returning customer rate
  - Customer retention metrics
  - Customer segmentation
- Inventory Analytics:
  - Stock turnover rates
  - Slow-moving products
  - Stockout incidents
  - Optimal stock levels

### 7. **Reports** (`/admin/reports`)
**Report Generation & Export**
- Available Reports:
  - Sales reports (daily, weekly, monthly)
  - Inventory reports
  - Customer reports
  - Seller performance reports
  - Financial reports
- Report Features:
  - Custom date ranges
  - Filter by category/seller
  - Export to PDF/Excel
  - Email delivery options
  - Schedule recurring reports
  - Report history/archive

### 8. **Settings** (`/admin/settings`)
**Platform Configuration & Account Management**

#### General Settings Tab
- **Business Information**:
  - Business name: "SACCO-SOKO Kenya"
  - Business email: admin@sacco-soko.ke
  - Phone number: +254 700 000 000
  - Website: sacco-soko.co.ke
  - Business address: Nairobi CBD, Kenya
  
- **Platform Configuration**:
  - Commission Rate: 5% (adjustable)
  - Minimum Order Value: ₦500 (adjustable)
  - Return Period: 30 days (adjustable)
  - Tax settings
  - Currency configuration
  - Shipping cost matrix

#### Notifications Tab
- **Email Notification Settings** (All toggleable):
  - New Orders alerts
  - Low Stock Alerts
  - Customer Messages notifications
  - Payment Notifications
  - Seller Applications alerts
  - System Notifications
  - Bulk notification management

#### Security Tab
- **Password & Authentication**:
  - Current password field
  - New password field
  - Confirm password field
  - **Features**:
    - Show/Hide password toggle (applies to all password fields)
    - Real-time password matching validation
    - Visual feedback:
      - ✅ Green border + checkmark when passwords match
      - ❌ Red border + alert when passwords don't match
    - Disabled button until all validations pass
    - Password strength indicators (coming soon)
  
- **Two-Factor Authentication (2FA)**:
  - 2FA status display
  - Enable/disable 2FA
  - Backup codes management
  - Device trusted list
  - Recovery options

#### Appearance Tab
- **Theme & Display Settings**:
  - **Color Themes** (4 options):
    - 🟠 Orange (default primary)
    - 🔵 Blue
    - 🟢 Green
    - 🟣 Purple
    - Each theme includes primary and secondary color overrides
    - Active theme highlights with border and background color
  
  - **Dark Mode Toggle**:
    - Switch between light and dark themes
    - Applies to entire UI including:
      - Backgrounds
      - Text colors
      - Borders
      - Cards and modals
      - Sidebar styling
  
  - **Features**:
    - Changes apply immediately (no manual save needed)
    - Preferences persist across sessions (localStorage)
    - Smooth color transitions
    - Status indicator showing "Theme Saved"

---

## Public Pages

### Customer-Facing Pages

#### 1. **Home Page** (`/`)
**Landing Page with Marketing Focus**
- **Hero Section**:
  - Main headline and value proposition
  - Call-to-action buttons
  - Hero image/banner
  
- **Categories Section**:
  - Grid of product categories
  - Category images
  - Quick navigation to category pages
  
- **Featured Products Section**:
  - Carousel of bestselling products
  - Product cards with:
    - Product image
    - Name and price
    - Seller info
    - Rating and reviews
    - Add to cart button
  
- **Delivery Routes Section**:
  - Available delivery areas
  - Delivery time estimates
  - Delivery cost information
  
- **Seller CTA (Call-to-Action)**:
  - "Sell on SACCO-SOKO" section
  - Benefits of becoming a seller
  - Sign-up link to seller registration

#### 2. **Shop All Products** (`/shop`)
**Complete Product Catalog**
- Product Grid View:
  - Display all products (paginated)
  - Product cards with images, names, prices
  - Seller badges
  - Rating and review count
  - Stock status
  
- Search Functionality:
  - Search by product name
  - Search by SKU
  - Search by seller name
  
- Filtering Options:
  - Filter by category
  - Filter by price range
  - Filter by rating
  - Filter by stock status
  - Filter by seller
  
- Sorting:
  - Sort by price (low to high, high to low)
  - Sort by newest products
  - Sort by most popular
  - Sort by bestsellers
  
- Advanced Features:
  - Product comparison
  - Save favorites/wishlist
  - View product details

#### 3. **Categories** (`/categories`)
**Product Category Discovery**
- Category Listing:
  - All available categories
  - Category descriptions
  - Product count per category
  - Featured products per category
  
- Category Navigation:
  - Subcategories display
  - Breadcrumb navigation
  - Related categories
  
- Category Content:
  - Category description and details
  - Category image
  - Filter by price, seller, rating

#### 4. **Product Details** (`/product/:id`)
**Individual Product Information Page**
- Product Display:
  - Multiple product images (gallery)
  - Zoom functionality
  - Image thumbnails
  
- Product Information:
  - Product name and SKU
  - Price and original price
  - Availability status
  - Stock quantity indicator
  
- Seller Information:
  - Seller name and badge
  - Seller rating
  - Contact seller button
  - View all seller products link
  
- Product Details:
  - Full description
  - Specifications/attributes
  - Dimensions and weight
  - Material composition
  
- Customer Reviews:
  - Star rating (1-5)
  - Review text
  - Reviewer name
  - Helpful votes
  - Filter reviews by rating
  
- Purchase Options:
  - Quantity selector
  - Add to cart button
  - Add to wishlist button
  - Buy now button
  
- Related Products:
  - Similar products
  - Product recommendations

#### 5. **Track Order** (`/track-order`)
**Order Tracking Page**
- Order Search:
  - Search by order ID
  - Search by email address
  - Search by phone number
  
- Order Status Display:
  - Current order status
  - Order timeline with dates
  - Status stages:
    - Order Confirmed
    - Processing
    - Shipped
    - In Transit
    - Out for Delivery
    - Delivered
  
- Order Details:
  - Order date and time
  - Expected delivery date
  - Delivery address
  - Items in order
  - Total amount
  - Payment method
  
- Tracking Information:
  - Courier/logistics provider
  - Tracking number
  - Real-time location updates
  - Estimated delivery time
  
- Actions:
  - Download invoice
  - Initiate return
  - Contact seller
  - Contact support

#### 6. **Sell on SACCO-SOKO** (`/sell-on-metro`)
**Seller Onboarding Page**
- Benefits Section:
  - Why become a seller
  - Commission rates
  - Features available to sellers
  - Success stories/testimonials
  
- Requirements:
  - Legal requirements
  - Documentation needed
  - Business verification requirements
  
- Registration Form:
  - Business information
  - Business owner details
  - Contact information
  - Bank account details
  - Business license upload
  
- FAQ Section:
  - Common seller questions
  - Process explanation

#### 7. **About Us** (`/about-us`)
**Company Information Page**
- Company Overview:
  - Company history
  - Mission statement
  - Vision statement
  - Core values
  
- Team Information:
  - Leadership team
  - Company culture
  - Join our team link
  
- Achievements:
  - Milestones
  - Awards and recognition
  - Statistics (users, sellers, transactions)
  
- Social Responsibility:
  - Community initiatives
  - Sustainability efforts
  - Partnership information

#### 8. **Returns & Refunds** (`/returns-refunds`)
**Return Policy & Process**
- Return Policy:
  - Return eligibility criteria
  - Return window (30 days)
  - Condition requirements
  - Exceptions to returns
  
- Refund Policy:
  - Refund timeline
  - Refund methods
  - Processing times
  
- How to Return:
  - Step-by-step process
  - How to initiate return
  - Shipping instructions
  - Return address information
  
- FAQs:
  - Common return questions
  - Refund status checking
  - Return shipping costs

#### 9. **Shipping Information** (`/shipping-info`)
**Delivery & Shipping Details**
- Shipping Rates:
  - Rates by location
  - Rates by weight
  - Free shipping thresholds
  
- Delivery Areas:
  - Covered regions
  - Delivery timeframes
  - Express delivery options
  
- Tracking:
  - How to track orders
  - Tracking frequency
  
- Delivery Zones:
  - Zone 1: Nairobi (1-2 days)
  - Zone 2: Major cities (2-3 days)
  - Zone 3: Regional areas (3-5 days)

#### 10. **FAQs** (`/faqs`)
**Frequently Asked Questions**
- Organized by Categories:
  - General Questions
  - Ordering & Checkout
  - Shipping & Delivery
  - Returns & Refunds
  - Payment Methods
  - Account & Security
  - Seller Questions
  
- Features:
  - Search FAQs
  - Expandable answer sections
  - Print FAQs option
  - Contact support link

#### 11. **Contact Us** (`/contact-us`)
**Customer Support Contact Page**
- Contact Information:
  - Email addresses (support, sales, technical)
  - Phone numbers
  - Hours of operation
  - Office address
  - Map/location
  
- Contact Form:
  - Name, email, phone fields
  - Subject selection
  - Message text area
  - File attachment option
  - Submit button
  
- Support Options:
  - Live chat option
  - Email support
  - Phone support
  - Submit ticket option
  
- Response Time:
  - Expected response timeframe
  - SLA information

### Legal Pages

#### 12. **Privacy Policy** (`/privacy-policy`)
**Data Protection & Privacy Information (11+ Sections)**
- Information Collection:
  - What data we collect
  - How we collect it
  - Why we collect it
  
- Use of Information:
  - How we use your data
  - Data sharing practices
  - Third-party services
  
- Data Protection:
  - Security measures
  - Data encryption
  - Access controls
  
- User Rights:
  - Right to access
  - Right to deletion
  - Right to correction
  - Data portability
  
- Cookies:
  - Cookie usage
  - Cookie preferences
  - Tracking technologies
  
- Children's Privacy:
  - Age restrictions
  - Parental consent
  
- Policy Updates:
  - Change notification
  - Effective date
  
- Contact:
  - Privacy officer contact
  - Complaint process

#### 13. **Terms of Service** (`/terms-of-service`)
**Legal Terms & Conditions (16+ Sections)**
- Acceptance of Terms:
  - Agreement to terms
  - Updates to terms
  
- User Accounts:
  - Account creation requirements
  - Account responsibility
  - Password protection
  
- User Conduct:
  - Prohibited activities
  - Illegal use restrictions
  - Intellectual property respect
  
- Seller Responsibilities:
  - Product accuracy
  - Shipping obligations
  - Return handling
  
- Payment:
  - Payment terms
  - Accepted methods
  - Disputed transactions
  
- Shipping & Delivery:
  - Shipping policies
  - Delivery timeframes
  - Lost package procedures
  
- Refunds & Returns:
  - Return eligibility
  - Refund processing
  - Return shipping
  
- Intellectual Property:
  - Content ownership
  - License grants
  - Trademark usage
  
- Limitation of Liability:
  - Damage limitations
  - Disclaimer of warranties
  
- Dispute Resolution:
  - Governing law
  - Dispute process
  - Arbitration clause
  
- Termination:
  - Account termination rights
  - Effect of termination
  
- Changes to Service:
  - Service modifications
  - Discontinuation of service
  
- Contact:
  - Legal contact information
  - Dispute contact

---

## Authentication System

### Login Flow
**Admin Access**: `/admin/login`
- Secure credential validation
- Session management with localStorage
- Redirect to admin dashboard on success
- Redirect to login on unauthorized access

### Credentials
```
Username: SACCO-SOKO
Password: #SACCO-SOKO2025
```

### Features
- Session Persistence:
  - Login status saved in localStorage
  - Session persists across browser refresh
  - Automatic redirect to login if session expires
  
- Protected Routes:
  - All `/admin/*` routes require authentication
  - ProtectedRoute wrapper component
  - Unauthorized users redirected to login
  
- Logout Functionality:
  - Logout button in admin sidebar
  - Clears session data
  - Redirects to home page

### Security Components
- `AuthContext.tsx` - State management for auth
- `useAuth.ts` - Custom hook for auth access
- `ProtectedRoute.tsx` - Route wrapper for protection
- `AdminLogin.tsx` - Login form page

---

## Theme System

### Theme Customization Features

#### Color Themes
**4 Available Color Schemes:**
1. **Orange Theme** (Default)
   - Primary: #FF8C00
   - Secondary: #FFA500
   - Used for main CTAs and accents

2. **Blue Theme**
   - Primary: #1E40AF
   - Secondary: #3B82F6
   - Professional, corporate look

3. **Green Theme**
   - Primary: #16A34A
   - Secondary: #22C55E
   - Fresh, eco-friendly appearance

4. **Purple Theme**
   - Primary: #7C3AED
   - Secondary: #A78BFA
   - Modern, creative feel

#### Dark Mode Support
- Full dark theme support with:
  - Dark backgrounds (HSL 220° 25% 8%)
  - Light text colors (HSL 0° 0% 98%)
  - Adjusted card and border colors
  - Sidebar styling for dark mode

#### Theme Application
- **Global CSS Variables**:
  - Primary and secondary colors
  - Text, background, and border colors
  - Sidebar colors
  - Shadow and glow effects
  
- **DOM Classes**:
  - `theme-orange`, `theme-blue`, `theme-green`, `theme-purple`
  - `dark-mode` or `light-mode`
  - Applied to `document.documentElement`

#### Features
- Real-time application
- Automatic persistence (localStorage)
- Smooth transitions between themes
- No page reload required

### Theme System Components
- `themeContextType.ts` - Type definitions
- `ThemeContext.tsx` - Provider component
- `useTheme.ts` - Custom hook for theme access

---

## Security Features

### Password Management
Located in Admin Settings → Security Tab

#### Password Change Features
- **Current Password Verification**:
  - Required to change password
  - Prevents unauthorized changes
  
- **New Password Input**:
  - Accepts new password entry
  - Password strength validation (coming soon)
  
- **Confirm Password Validation**:
  - Real-time matching check
  - Visual feedback:
    - ✅ Green border + checkmark = match
    - ❌ Red border + alert = mismatch
  
- **Show/Hide Password Toggle**:
  - Single toggle controls all password fields
  - Eye icon indicates current state
  - Blue toggle switch for easy on/off
  
- **Button States**:
  - Disabled until requirements met:
    - Current password filled
    - New password matches confirm password
  - Auto-disabled after successful change

#### Visual Feedback System
- **Input Field Colors**:
  - Red border: Passwords don't match
  - Green border: Passwords match
  - Default: Empty/neutral state
  
- **Notification Banner**:
  - Shows when confirm password has content
  - Green banner: Passwords match ✅
  - Red banner: Passwords mismatch ❌
  - Clear messaging with icons

### Two-Factor Authentication (2FA)
- Status display
- Enable/disable functionality
- Recovery codes management
- Device trusted list
- Setup instructions

### Protected Routes
- Admin routes require authentication
- Automatic redirection for unauthorized access
- Session validation on each route

---

## Database & Integration

### Supabase Configuration
- **Database**: PostgreSQL via Supabase
- **Client**: Supabase client initialized in `integrations/supabase/client.ts`
- **Type Definitions**: TypeScript interfaces in `integrations/supabase/types.ts`

### Data Models (Expected)
```
Users:
  - id, email, username, password_hash, role, created_at, updated_at

Products:
  - id, name, description, price, cost, sku, category_id, seller_id, stock, images, created_at

Orders:
  - id, customer_id, items, total_amount, status, delivery_address, created_at, updated_at

Customers:
  - id, name, email, phone, address, registration_date, total_spent, created_at

Sellers:
  - id, business_name, email, phone, business_license, bank_account, status, rating, created_at

Categories:
  - id, name, description, image, parent_category_id

Reviews:
  - id, product_id, customer_id, rating, comment, created_at
```

---

## User Flows

### Customer Journey
1. **Browse Products**:
   - Land on home page
   - Browse categories or shop all
   - View featured products
   
2. **Product Discovery**:
   - Search products
   - Filter by category, price, rating
   - View detailed product information
   
3. **Purchase**:
   - Add products to cart
   - Proceed to checkout
   - Enter delivery address
   - Select payment method
   - Place order
   
4. **Post-Purchase**:
   - Track order status
   - Receive delivery updates
   - Leave product reviews
   - Manage returns if needed

### Admin Workflow
1. **Login**:
   - Access admin panel with credentials
   - Session persists across visits
   
2. **Dashboard Monitoring**:
   - View KPIs and metrics
   - Monitor recent orders
   - Check revenue trends
   
3. **Management Tasks**:
   - Manage products
   - Process orders
   - Review customer data
   - Oversee sellers
   - Generate reports
   
4. **Configuration**:
   - Customize theme
   - Manage notifications
   - Update password
   - Configure platform settings

### Seller Journey
1. **Registration**:
   - Fill seller application form
   - Submit business documents
   - Await admin approval
   
2. **Dashboard Access**:
   - View seller dashboard (after approval)
   - Monitor sales and revenue
   - Manage inventory
   
3. **Order Fulfillment**:
   - Receive orders
   - Update order status
   - Manage shipments
   - Handle customer inquiries

---

## Performance & Quality

### Optimization Features
- Lazy loading for images
- Code splitting with React Router
- Optimized Recharts visualizations
- Efficient search and filtering
- Pagination for large datasets

### Accessibility
- Semantic HTML
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance
- Screen reader optimization

### Browser Support
- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Development & Deployment

### Development Server
- **Tool**: Vite
- **Port**: 8084 (default, auto-increments if in use)
- **Command**: `npm run dev`
- **Hot Module Replacement (HMR)**: Enabled for instant updates

### Build & Production
- **Build Command**: `npm run build`
- **Output**: Optimized production bundle
- **Environment Variables**: Configure Supabase connection

### Code Quality
- TypeScript for type safety
- ESLint for code standards
- Tailwind CSS for consistent styling
- Component-based architecture

---

## Future Enhancements

### Planned Features
- Advanced analytics with more visualizations
- Email notification system integration
- Real-time notifications (WebSocket)
- Mobile app version
- Multi-language support
- Advanced inventory management
- Automated order processing
- AI-powered recommendations
- Advanced seller tools
- Customer loyalty program
- Subscription products
- Digital products support

### Security Enhancements
- Password strength requirements
- Rate limiting on login
- IP whitelisting
- Audit logging
- Compliance certifications (GDPR, etc.)

---

## Support & Maintenance

### Contact Information
- **Email**: admin@sacco-soko.ke
- **Phone**: +254 700 000 000
- **Address**: Nairobi CBD, Kenya
- **Website**: sacco-soko.co.ke

### Troubleshooting
- Check browser console for errors
- Verify localStorage is enabled
- Clear browser cache if experiencing issues
- Contact admin support for account issues

---

**Last Updated**: December 23, 2025
**Version**: 1.0
**Status**: Production Ready
