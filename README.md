# 🐶 The DogPark Channel

The DogPark Channel 是一個為公會 **DogPark** 設計的前端網站，  
成員可以在這裡紀錄與管理目前有哪些頻道，方便大家一起追蹤與交流。  

## 🚀 功能特色
- 頻道紀錄：方便公會成員查看有哪些頻道正在使用  
- 公會氛圍：以「DogPark」為核心概念，帶點趣味狗狗風格  
- 表單驗證：透過 Yup 提供安全、簡潔的驗證流程  
- Firebase 支援：提供資料儲存與串接功能  
- RWD 支援：可在桌面與手機上流暢使用  

## 🛠 技術棧
- [React 18](https://react.dev/) - 前端框架  
- [Vite](https://vitejs.dev/) - 開發與建置工具  
- [MUI](https://mui.com/) - UI 元件庫  
- [Zustand](https://zustand-demo.pmnd.rs/) - 狀態管理  
- [React Router](https://reactrouter.com/) - 頁面路由  
- [Emotion](https://emotion.sh/docs/introduction) - CSS-in-JS 樣式管理  
- [Yup](https://github.com/jquense/yup) - 表單驗證  
- [Firebase](https://firebase.google.com/) - 後端服務與資料存取  
- [ESLint](https://eslint.org/) - 程式碼規範檢查  

## 📦 專案結構
TheDogParkChannel/
├── src/ # 專案原始碼
│ ├── components/ # React 元件
│ ├── pages/ # 頁面路由
│ ├── store/ # Zustand 狀態管理
│ ├── hooks/ # 自訂 Hooks
│ ├── utils/ # 工具方法 (含 Yup 驗證)
│ ├── services/ # Firebase 相關邏輯
│ └── App.jsx # 主要應用程式
├── public/ # 靜態資源
├── package.json
└── vite.config.js

shell
複製
編輯

## 🔧 開發環境需求
- Node.js 18+  
- npm 9+  

## ▶️ 開始使用
```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 專案打包
npm run build

# 預覽打包結果
npm run preview
🐾 未來規劃
頻道標籤與分類

成員權限與紀錄

Firebase 身份驗證（Auth）

更可愛的 DogPark 主題化 UI

## 📸 Screenshot
![Screenshot](./assets/screenshot.png.png)
