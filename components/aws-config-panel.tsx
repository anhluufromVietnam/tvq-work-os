'use client'

import { useState } from 'react'
import { Settings, Check, AlertCircle, ExternalLink, Key } from 'lucide-react'

interface AWSConfig {
  region: string
  accessKeyId: string
  secretAccessKey: string
  bearerKey: string
}

export function AWSConfigPanel() {
  const [config, setConfig] = useState<AWSConfig>({
    region: 'us-east-1',
    accessKeyId: '',
    secretAccessKey: '',
    bearerKey: '',
  })
  const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [authType, setAuthType] = useState<'bearer' | 'standard' | 'none'>('none')

  async function checkConnection() {
    setStatus('checking')
    try {
      const response = await fetch('/api/copilot')
      const data = await response.json()
      
      if (data.awsConfigured) {
        setStatus('success')
        setAuthType(data.authType)
        if (data.authType === 'bearer') {
          setMessage('AWS Bearer Key (ABSK) đã được cấu hình và hoạt động')
        } else {
          setMessage('AWS Access Keys đã được cấu hình và hoạt động')
        }
      } else {
        setStatus('error')
        setMessage('AWS credentials chưa được cấu hình. Vui lòng cập nhật file .env.local')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Không thể kết nối đến API')
    }
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="size-4 text-muted-foreground" />
        <h3 className="font-semibold">Cấu hình AWS Bedrock</h3>
      </div>

      <div className="space-y-3 text-sm">
        <div className="rounded-md bg-muted/50 p-3">
          <p className="text-muted-foreground mb-2">
            Để sử dụng zai.glm-5 model, bạn cần cấu hình AWS credentials trong file <code className="text-foreground">.env.local</code>
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs">
              <Key className="size-3 text-signal" />
              <span className="font-medium">Option 1: AWS Bearer Key (ABSK)</span>
            </div>
            <div className="ml-5 space-y-1 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">AWS_BEARER_KEY=</span>
                <span className="text-signal">ABSK...</span>
              </div>
            </div>

            <div className="border-t pt-2 flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">— hoặc —</span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Key className="size-3 text-muted-foreground" />
              <span className="font-medium">Option 2: Standard Access Keys</span>
            </div>
            <div className="ml-5 space-y-1 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">AWS_ACCESS_KEY_ID=</span>
                <span className="text-muted-foreground">AKIA...</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">AWS_SECRET_ACCESS_KEY=</span>
                <span className="text-muted-foreground">secret...</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={checkConnection}
          disabled={status === 'checking'}
          className="w-full rounded-md bg-signal px-3 py-2 text-sm font-medium text-signal-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === 'checking' ? 'Đang kiểm tra...' : 'Kiểm tra kết nối'}
        </button>

        {status === 'success' && (
          <div className="flex items-center gap-2 rounded-md bg-safe/10 p-2 text-safe">
            <Check className="size-4" />
            <span>{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-start gap-2 rounded-md bg-caution/10 p-2 text-caution">
            <AlertCircle className="size-4 mt-0.5 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground mb-2">Hướng dẫn:</p>
          <ol className="space-y-1 text-xs text-muted-foreground list-decimal list-inside">
            <li>Copy key ABSK của bạn</li>
            <li>Mở file .env.local</li>
            <li>Điền: AWS_BEARER_KEY=your_key</li>
            <li>Restart dev server</li>
          </ol>
          
          <a
            href="https://docs.aws.amazon.com/bedrock/latest/userguide/setting-up.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-xs text-signal hover:underline"
          >
            <ExternalLink className="size-3" />
            AWS Bedrock Setup Guide
          </a>
        </div>
      </div>
    </div>
  )
}
