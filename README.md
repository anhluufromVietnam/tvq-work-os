# TVQ Work OS — AI Work Operating System

Hệ điều hành công việc với AI Copilot điều khiển bằng ngôn ngữ tự nhiên.

## ✅ Status: HOẠT ĐỘNG

## Tính năng

- **Command Mode**: Giao việc bằng ngôn ngữ tự nhiên
- **Executive Copilot**: Phân tích tình hình toàn công ty
- **AI Provider cấu hình được**: AWS Bedrock (zai.glm-5) / Muse Spark / Custom OpenAI-compatible — đổi URL, key, model ngay trong app
- **Permission Engine**: Hệ thống phân quyền L1-L3 + RBAC (admin/manager/member)
- **Audit Logging**: Ghi nhận mọi thay đổi

## Cài đặt

### 1. Cài đặt dependencies

```bash
pnpm install
```

### 2. Cấu hình AI Provider (2 cách)

**Cách A — trong app (khuyến nghị, chỉ Admin):**
Mở app → Cài đặt → Cấu hình AI Provider → chọn provider (Bedrock / Muse Spark / Custom), điền Base URL, API Key, tên Model → Lưu.

**Cách B — qua file `.env.local`:**

```env
AI_PROVIDER=bedrock
AI_BASE_URL=
AI_API_KEY=
AI_MODEL=
# Legacy Bedrock:
AWS_REGION=us-east-1
AWS_BEARER_KEY=ABSK...your_key_here
```

### 3. Chạy ứng dụng

```bash
pnpm dev
```

Mở http://localhost:3000

Tài khoản mặc định: `admin@tvq.local / admin123`, `manager@tvq.local / manager123`, `member@tvq.local / member123`.

## API Endpoints

### POST /api/copilot

Gọi AI provider đã cấu hình với messages và context.

**Request:**
```json
{
  "messages": [
    {"role": "user", "content": "Phân tích tình hình"}
  ],
  "context": {
    "mode": "executive"
  }
}
```

**Response:**
```json
{
  "success": true,
  "content": "Phân tích tình hình toàn công ty...",
  "model": "muse-spark",
  "provider": "muse-spark",
  "timestamp": "2026-10-22T10:29:42.574Z"
}
```

### GET /api/copilot

Kiểm tra trạng thái provider hiện tại (provider, model, đã cấu hình key hay chưa).

### GET / PUT /api/ai-provider (chỉ Admin)

Xem / lưu cấu hình AI provider (provider, baseUrl, model; key được mask, để trống để giữ nguyên).

## Cấu trúc dự án

```
├── app/
│   ├── api/copilot/route.ts      # API route gọi AI provider
│   ├── api/ai-provider/route.ts  # API lưu cấu hình provider (admin)
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── components/
│   ├── ai-provider-panel.tsx     # Panel cấu hình provider
│   └── copilot/
│       ├── copilot-panel.tsx     # Copilot UI panel
│       ├── plan-card.tsx         # Plan approval card
│       └── analysis-card.tsx     # Analysis display card
├── lib/
│   ├── ai-provider.ts           # Resolve provider + gọi chat/completions
│   ├── copilot-ai.ts            # AI integration logic
│   ├── copilot-engine.ts        # Local engine (fallback)
│   ├── store.tsx                # State management
│   └── types.ts                 # TypeScript types
└── .env.local                   # AI credentials (không commit)
```

## AI Provider

Mặc định: **AWS Bedrock** (`zai.glm-5`) qua endpoint `https://bedrock-mantle.{region}.api.aws/v1/chat/completions` với ABSK Bearer Key.

Đổi sang **Muse Spark** hoặc endpoint **Custom** tương thích OpenAI chat/completions bất cứ lúc nào trong Cài đặt — không cần sửa code hay restart server.

## License

Private project for TVQ Work OS.
