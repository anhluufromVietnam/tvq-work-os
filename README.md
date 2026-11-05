# TVQ Work Copilot - AWS zai.glm-5 Integration

Ứng dụng Work Copilot tích hợp AWS Bedrock với model zai.glm-5.

## ✅ Status: HOẠT ĐỘNG

API đã kết nối thành công với AWS Bedrock và trả về dữ liệu thật từ zai.glm-5 model.

## Tính năng

- **Command Mode**: Giao việc bằng ngôn ngữ tự nhiên
- **Executive Copilot**: Phân tích tình hình toàn công ty
- **AI Integration**: Sử dụng zai.glm-5 model qua AWS Bedrock Mantle API
- **Permission Engine**: Hệ thống phân quyền L1-L3
- **Audit Logging**: Ghi nhận mọi thay đổi

## Cài đặt

### 1. Cài đặt dependencies

```bash
pnpm install
```

### 2. Cấu hình AWS credentials

Tạo file `.env.local`:

```env
AWS_REGION=us-east-1
AWS_BEARER_KEY=ABSK...your_key_here
```

### 3. Chạy ứng dụng

```bash
pnpm dev
```

Mở http://localhost:3000

## API Endpoints

### POST /api/copilot

Gọi zai.glm-5 model với messages và context.

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
  "model": "zai.glm-5",
  "timestamp": "2026-10-22T10:29:42.574Z"
}
```

### GET /api/copilot

Kiểm tra trạng thái API.

## Cấu trúc dự án

```
├── app/
│   ├── api/copilot/route.ts    # API route cho zai.glm-5
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page
├── components/
│   └── copilot/
│       ├── copilot-panel.tsx   # Copilot UI panel
│       ├── plan-card.tsx       # Plan approval card
│       └── analysis-card.tsx   # Analysis display card
├── lib/
│   ├── copilot-ai.ts          # AI integration logic
│   ├── copilot-engine.ts      # Local engine (fallback)
│   ├── store.tsx              # State management
│   └── types.ts               # TypeScript types
└── .env.local                 # AWS credentials
```

## AWS Configuration

### ABSK Key Format

Key bắt đầu bằng `ABSK` - AWS Bearer Session Key cho Bedrock API.

### Endpoint

```
https://bedrock-mantle.{region}.api.aws/v1/chat/completions
```

### Model ID

```
zai.glm-5
```

## License

Private project for TVQ Work OS.
