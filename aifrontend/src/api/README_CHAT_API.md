# Chat API 사용 가이드

이 문서는 프론트엔드에서 백엔드의 채팅 API를 사용하는 방법을 설명합니다.

## 주요 기능

### 1. RAG 기반 AI 채팅 (`chatWithRag`)
- **용도**: 메인 채팅 기능
- **특징**: 뉴스, 보고서, 이전 대화를 종합하여 AI 응답 생성
- **자동 저장**: 사용자 메시지와 AI 응답이 자동으로 DB에 저장됨

```typescript
import { chatApi, RagChatRequest } from '../api';

const sendMessage = async () => {
  const request: RagChatRequest = {
    user_id: 1,
    stock_code: "005930", // 선택사항
    message: "삼성전자 주가 전망은 어떤가요?"
  };

  const response = await chatApi.chatWithRag(request);
  
  if (response && response.success) {
    console.log('AI 응답:', response.response);
    console.log('참조 뉴스 수:', response.source_count);
    console.log('뉴스 소스:', response.sources);
  }
};
```

### 2. 채팅 내역 조회 (`getChatHistory`)
- **용도**: 이전 대화 내역 불러오기
- **정렬**: 시간순 정렬

```typescript
const loadHistory = async () => {
  const history = await chatApi.getChatHistory({
    user_id: 1,
    stock_code: "005930",
    limit: 50,  // 선택사항
    offset: 0   // 선택사항
  });

  if (history) {
    console.log('채팅 내역:', history);
  }
};
```

### 3. 채팅 내역 삭제 (`deleteChats`)
- **용도**: 특정 사용자와 종목의 모든 대화 삭제

```typescript
const clearHistory = async () => {
  const result = await chatApi.deleteChats({
    user_id: 1,
    stock_code: "005930"
  });

  if (result) {
    console.log(`${result.deleted_count}개 메시지 삭제됨`);
  }
};
```

### 4. 수동 채팅 저장 (`saveChat`)
- **용도**: 직접 채팅 메시지 저장 (거의 사용 안 함)
- **참고**: RAG 채팅에서 자동 저장되므로 일반적으로 불필요

```typescript
const saveManually = async () => {
  const result = await chatApi.saveChat({
    user_id: 1,
    stock_code: "005930",
    role: ChatRole.USER,
    chat: "수동으로 저장하는 메시지"
  });
};
```

## 타입 정의

### 주요 인터페이스

```typescript
// RAG 채팅 요청
interface RagChatRequest {
  user_id: number;
  stock_code?: string;  // 선택사항
  message: string;
}

// RAG 채팅 응답
interface RagChatResponse {
  user_query: string;
  response: string;
  sources: NewsSource[];
  source_count: number;
  success: boolean;
  error?: string;
}

// 채팅 메시지
interface ChatMessage {
  id: number;
  role: ChatRole;
  chat: string;
  created_at: string;
}

// 뉴스 소스
interface NewsSource {
  id: string;
  title: string;
  content: string;
  published_at: string | null;
  similarity: number;
  query_type?: string;
}
```

### 채팅 역할 (ChatRole)

```typescript
enum ChatRole {
  USER = "user",
  GPT = "gpt",
  ASSISTANT = "assistant"
}
```

## 사용 예시

### 기본 채팅 컴포넌트

```typescript
import React, { useState, useEffect } from 'react';
import { chatApi, ChatMessage, RagChatRequest } from '../api';

const ChatComponent = ({ userId, stockCode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // 채팅 내역 로드
  useEffect(() => {
    const loadHistory = async () => {
      const history = await chatApi.getChatHistory({
        user_id: userId,
        stock_code: stockCode
      });
      if (history) setMessages(history);
    };
    loadHistory();
  }, [userId, stockCode]);

  // 메시지 전송
  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    setLoading(true);
    const response = await chatApi.chatWithRag({
      user_id: userId,
      stock_code: stockCode,
      message: input
    });

    if (response?.success) {
      // 채팅 내역 새로고침
      const newHistory = await chatApi.getChatHistory({
        user_id: userId,
        stock_code: stockCode
      });
      if (newHistory) setMessages(newHistory);
      setInput('');
    }
    setLoading(false);
  };

  return (
    <div>
      {/* 메시지 표시 */}
      <div>
        {messages.map(msg => (
          <div key={msg.id}>
            <strong>{msg.role}:</strong> {msg.chat}
          </div>
        ))}
      </div>

      {/* 입력 영역 */}
      <div>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          전송
        </button>
      </div>
    </div>
  );
};
```

## 유틸리티 함수

### 메시지 포맷팅

```typescript
// 채팅 메시지 포맷팅
const formatted = chatApi.formatChatMessage(message);
// 결과: "[14:30] 나: 안녕하세요"

// 뉴스 소스 포맷팅  
const newsFormatted = chatApi.formatNewsSource(source);
// 결과: "📰 삼성전자 실적 발표 (2024.1.15) - 유사도: 85.2%"
```

## 에러 처리

모든 API 함수는 실패 시 `null`을 반환하거나 `success: false`를 포함합니다:

```typescript
const response = await chatApi.chatWithRag(request);

if (!response || !response.success) {
  console.error('채팅 실패:', response?.error);
  // 에러 처리 로직
  return;
}

// 성공 시 처리
console.log('응답:', response.response);
```

## 백엔드 엔드포인트 매핑

| 프론트엔드 함수 | 백엔드 엔드포인트 | HTTP 메서드 |
|----------------|------------------|-------------|
| `chatWithRag` | `/api/chats/rag` | POST |
| `getChatHistory` | `/api/chats/` | GET |
| `saveChat` | `/api/chats/` | POST |
| `deleteChats` | `/api/chats/` | DELETE |

## 주의사항

1. **RAG 채팅 우선 사용**: 일반적으로 `chatWithRag`만 사용하면 됩니다.
2. **자동 저장**: RAG 채팅은 자동으로 DB에 저장되므로 별도 저장 불필요.
3. **stock_code 선택사항**: RAG 채팅에서 stock_code는 선택사항이지만, 제공하면 더 정확한 답변 가능.
4. **에러 처리**: 모든 API 호출에 대해 적절한 에러 처리 구현 필요.
5. **로딩 상태**: 사용자 경험을 위해 로딩 상태 표시 권장. 