**Barlink Frontend Integration Guide** (

This doc will:

* Capture all multi-tenant, RBAC, and API/data access patterns.
* Document expected URL structure, storage rules, endpoint patterns, and model schemas for menus, promotions, favorites, ratings, etc.
* Serve as “source of truth” for all future frontend developers.


## `frontend-integration-guide.md`

markdown
# Barlink Frontend Integration Guide

> **Version:** 2025-06  
> **Purpose:** How to build & maintain the Barlink customer/staff frontend for a multi-tenant, RBAC, restaurant platform.


## 🔑 Architecture Overview

- **Multi-Tenant:** Each restaurant is i own “tenant”. All menus, orders, ratings, and promotions are restaurant-scoped.
- **RBAC:** Superadmin, Owner, Manager, Staff, and Customer—roles have clearly defined access.
- **All flows (except superadmin) are rooted at `/r/[slug]`**.


## 🧭 URL & Routing Patterns

- **Platform root**: `/` (superadmin dashboard only; create/view restauran, register owners)
- **Tenant root**: `/r/[slug]`
  - `/r/[slug]/auth/login` — Owner/Manager/Staff/Customer login
  - `/r/[slug]/auth/register` — Staff/Customer registration (if allowed)
  - `/r/[slug]/menu`, `/r/[slug]/menu/[menuId]` — Menu & details
  - `/r/[slug]/cart` — Cart for this restaurant
  - `/r/[slug]/orders`, `/r/[slug]/orders/[orderId]` — Orders for this restaurant/user
  - `/r/[slug]/profile` — Profile/settings for logged-in user

**Never** fetch or display global data ouide the restaurant context, except for superadmin UI.


## 🔐 Authentication & Token Storage

- **Superadmin:** Only at `/`; can register restauran & owners.
- **Owner/Manager/Staff/Customer:** Only operate in `/r/[slug]` routes.
- **Token Storage:**  
  Store per-restaurant, e.g.:  


localStorage.setItem('barlink\_token\_\[slug]', token)

`
- **JWTs** for tenant users always include `restaurant` field.


## 🗃️ API Usage & Data Access

- **Always use the current restaurant’s slug or ID** for all API calls.
- **API endpoints are always tenant-scoped** unless superadmin.

### **Sample API Patterns**

| Endpoint                                | Who can use      | Notes                                      |
|------------------------------------------|------------------|---------------------------------------------|
| `POST /api/auth/login`                   | All              | Returns JWT with `restaurant` if tenant     |
| `GET /api/restaurants/slug/:slug`        | All              | Get restaurant data by slug (public)        |
| `GET /api/menus?slug=pasta-classics`     | Tenant           | Get menu(s) by category slug (tenant only)  |
| `GET /api/promotions/active`             | Tenant/Public    | Current restaurant’s promotions             |
| `GET /api/menus/popular`                 | Tenant/Public    | Most-ordered items for this restaurant      |
| `POST /api/orders`                       | Tenant           | Place order in restaurant                   |
| `GET /api/orders`                        | Tenant           | My orders in this restaurant                |
| `GET /api/orders/restaurant/:id`         | Owner/Manager    | All orders for their restaurant             |
| `POST /api/ratings`                      | Tenant           | Rate a menu item (needs menuId/itemId)      |
| `GET /api/ratings/item/:itemId/summary`  | Tenant/Public    | Rating stats for one menu item              |
| `POST /api/favorites`                    | Tenant           | Favorite a menu item (needs menuId/itemId)  |
| `GET /api/favorites/count/:itemId`       | Tenant/Public    | Like count for item (restaurant only)       |
| `GET /api/analytics/restaurant/:id`      | Owner/Manager    | Dashboard data for their restaurant         |


## 🧩 Data Model/Schema Reference

### **Menu (as of 2025-06)**

interface Menu {
_id: string;
restaurant: string;
category: { name: string; slug: string };
description: string;
subcategories: Array<{
  name: string;
  items: MenuItem[];
}>;
createdAt: string;
updatedAt: string;
}
`

### **MenuItem**


interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image?: string;
  tags?: string[];
  options?: { label: string; price: number }[];
}


### **Promotion**


interface Promotion {
  _id: string;
  restaurant: string;
  title: string;
  description?: string;
  tag?: string;
  items: { menuId: string; itemId: string }[];
  startDate?: string;
  endDate?: string;
}


### **Order**


interface Order {
  _id: string;
  restaurant: string;
  user: string;
  items: Array<{ menuItem: string; quantity: number; price: number }>;
  total: number;
  status: 'pending' | 'served' | 'paid';
  createdAt: string;
  updatedAt: string;
}



## ⚙️ Tenant Flow: Always Restaurant-Scoped

* **All navigation, cart, orders, etc., are within `/r/[slug]`**.
* Auth, token, and local storage **never leak across restaurants**.
* Use `slug` to fetch data for restaurant context.


## 🛑 Security & RBAC Rules

* All endpoints **enforce**:

  * User’s token must have matching `restaurant` for data access/mutation.
  * Only superadmin can access `/api/restaurants`, `/api/users` without a restaurant.
  * Tenant users **cannot** create/view other restaurant’s data.


## 🖥️ UI/UX Guidance

* Show restaurant name/logo in header (from `/api/restaurants/slug/:slug`).
* Menus, promotions, orders: always scoped to that restaurant.
* If in platform root, only show superadmin UI.


## 📝 Example Frontend Usage

* On scan of restaurant QR, land at `/r/acme-bistro`
* Use `slug` in all API calls, e.g.:

  
  // Fetch restaurant info
  fetch(`/api/restaurants/slug/acme-bistro`)

  // Fetch active promotions
  fetch(`/api/promotions/active?restaurant=acme-bistro`)

  // Place order
  fetch(`/api/orders`, { method: "POST", headers: {...}, body: {...} })
  
* Store session/cart as `barlink_token_acme-bistro`, `barlink_cart_acme-bistro`.




*Last updated: 2025-06-07*

