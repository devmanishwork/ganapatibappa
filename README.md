# 🕉️ श्री सिद्धिविनायक गणपती स्टॉल
## Shree Siddhivinayak Ganapati Stall

A beautiful catalog website for Ganapati murtis with WhatsApp contact integration.

---

## 🚀 Quick Start

```bash
# 1. Install all dependencies
npm install

# 2. Set up the database
npx prisma db push

# 3. Generate Prisma client
npx prisma generate

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Pages

| Page | URL | Description |
|------|-----|-------------|
| **Storefront** | `/` | Public murti catalog with WhatsApp buttons |
| **Admin Login** | `/admin/login` | Password protected login |
| **Admin Dashboard** | `/admin` | Manage all murtis |
| **Add Murti** | `/admin/add` | Add a new murti |
| **Edit Murti** | `/admin/edit/[id]` | Edit an existing murti |

---

## 🔐 Admin Login

Default password: **`ganesh123`**

To change it, edit the `.env` file:
```
ADMIN_PASSWORD="your-new-password"
```

---

## 📞 WhatsApp

WhatsApp number: **9637153890**

When a customer clicks "WhatsApp वर विचारा", it opens WhatsApp with a pre-filled message about that murti.

---

## 🗄️ Database

Uses **SQLite** (file-based) — no database server needed!  
Database file: `prisma/dev.db`

To view/edit data visually:
```bash
npx prisma studio
```

---

## 🌈 Tech Stack

- **Next.js 15** — Full-stack React framework
- **Tailwind CSS** — Saffron/gold themed styling  
- **Prisma + SQLite** — Database
- **TypeScript** — Type safety

---

## गणपती बाप्पा मोरया! 🙏
