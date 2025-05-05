# NCU Food Map 中大美食打卡校園社交互動平台

## 專案介紹

Food Map 是一款結合趣味、美食探索與社交互動的中央大學校園地圖式社交網站。使用者可以透過地圖輕鬆紀錄與分享自己在校園內外發現的美食，並藉由 AI 分析提供個人化的飲食推薦與熱度地圖。

## 功能特色

- 地圖定位功能：使用 Google Maps API，標記美食地點
- 登入/註冊系統：表單驗證 + JWT 安全認證
- 美食打卡紀錄：地點、餐點名稱、照片上傳、心情、評分
- AI 美食推薦：根據打卡文字與評分，推薦相似餐廳或健康建議
- 自訂化打卡標記：可愛圖示 / 顏色分類（甜點、正餐、飲料）
- 數據視覺化：個人美食地圖、最多打卡時段、地區熱度圖
- 社交功能：加好友、留言、分享今日最推美食

## 技術架構

- Frontend: Next.js + TypeScript + Chakra UI
- Map: Google Maps API
- AI: Together AI API (LLaMA 3.3 70B)
- 數據視覺化: Chart.js

## 開始使用

1. 安裝依賴：
```bash
npm install
```

2. 設置環境變數：
創建 `.env.local` 文件並添加以下內容：
```
NEXT_PUBLIC_TOGETHER_API_KEY=your_together_api_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

3. 啟動開發服務器：
```bash
npm run dev
```

4. 打開瀏覽器訪問 `http://localhost:3000`

## 開發團隊

- 吳辰夜：前端開發
- 蔡睿中：後端開發
- 李昭儀：UI/UX 設計
- 葉治廷：AI 分析設計
- 游旻峻：地圖功能開發

## 注意事項

- 請確保已安裝 Node.js 16.0.0 或更高版本
- 需要有效的 Together AI API 密鑰和 Google Maps API 密鑰
- 開發時請遵循 ESLint 規則和 TypeScript 類型檢查 