import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface CentralAreaProps {
  // Define props if any
}

const CentralArea: React.FC<CentralAreaProps> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock 데이터 - 주식 관련 대화 시뮬레이션
  const mockResponses = [
    "Apple Inc. (AAPL)의 최근 재무 성과를 보면, 2024년 Q4 매출이 전년 동기 대비 6.5% 증가한 124.3조원을 기록했습니다. 특히 iPhone 매출이 견조한 성장을 보였고, 서비스 부문도 지속적인 확장을 나타내고 있습니다.",
    "현재 Apple의 PER은 28.5배로 기술주 평균보다 다소 높은 수준이지만, 강력한 브랜드 파워와 안정적인 현금흐름을 고려할 때 합리적인 수준으로 평가됩니다.",
    "Apple의 주요 리스크 요인으로는 중국 시장에서의 경쟁 심화, 스마트폰 시장 포화, 그리고 공급망 이슈가 있습니다. 하지만 AI와 웨어러블 기기 분야에서의 혁신이 새로운 성장 동력이 될 것으로 전망됩니다.",
    "기술적 분석 관점에서 Apple 주가는 현재 상승 추세선을 유지하고 있으며, RSI 지표는 중립 구간에 위치해 있습니다. 200일 이동평균선 위에서 거래되고 있어 장기적 상승 모멘텀이 유지되고 있는 상황입니다.",
    "Apple의 배당 정책을 보면, 현재 배당수익률은 0.44%로 높지 않지만 꾸준히 배당을 증가시켜왔습니다. 또한 적극적인 자사주 매입을 통해 주주가치 제고에 노력하고 있습니다."
  ];

  // Mock AI 응답 생성
  const generateMockResponse = (userMessage: string): string => {
    const responses = mockResponses;
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };

  // 메시지 전송 처리
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Mock AI 응답 시뮬레이션 (1-2초 지연)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateMockResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  // 초기 메시지 설정
  useEffect(() => {
    const initialMessage: Message = {
      id: 'initial',
      type: 'ai',
      content: '안녕하세요! 저는 AI 주식 분석 어시스턴트입니다. Apple Inc. (AAPL)에 대해 궁금한 점이 있으시면 언제든 질문해주세요. 재무분석, 기술적 분석, 시장 전망 등 다양한 정보를 제공할 수 있습니다.',
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, []);

  // 메시지 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 키보드 이벤트 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Style from Figma: 'Central Area' (5:6) has fills: fill_65VSU5 ('#F0F0F0')
  const areaStyle: React.CSSProperties = {
    backgroundColor: '#F0F0F0',
    flexGrow: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 10px',
    height: '100%',
    maxHeight: 'calc(100vh - 40px)',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    padding: '15px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const stockInfoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'baseline',
  };

  const stockNameStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    fontSize: '20px',
    marginRight: '10px',
    color: '#333',
  };

  const stockCodeStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    color: '#666',
    backgroundColor: '#f0f0f0',
    padding: '2px 8px',
    borderRadius: '4px',
  };

  const chatContainerStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const messagesAreaStyle: React.CSSProperties = {
    flexGrow: 1,
    overflowY: 'auto',
    padding: '20px',
    maxHeight: 'calc(100vh - 200px)',
  };

  const messageStyle = (isUser: boolean): React.CSSProperties => ({
    marginBottom: '16px',
    display: 'flex',
    justifyContent: isUser ? 'flex-end' : 'flex-start',
  });

  const messageBubbleStyle = (isUser: boolean): React.CSSProperties => ({
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: '18px',
    backgroundColor: isUser ? '#007bff' : '#f1f3f5',
    color: isUser ? '#FFFFFF' : '#333333',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    lineHeight: '1.4',
    wordBreak: 'break-word',
  });

  const inputAreaStyle: React.CSSProperties = {
    padding: '16px',
    borderTop: '1px solid #e9ecef',
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-end',
  };

  const inputStyle: React.CSSProperties = {
    flexGrow: 1,
    padding: '12px 16px',
    border: '1px solid #dee2e6',
    borderRadius: '24px',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    resize: 'none',
    minHeight: '44px',
    maxHeight: '120px',
  };

  const sendButtonStyle: React.CSSProperties = {
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '24px',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    minWidth: '60px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const loadingStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '16px',
  };

  const loadingBubbleStyle: React.CSSProperties = {
    padding: '12px 16px',
    borderRadius: '18px',
    backgroundColor: '#f1f3f5',
    color: '#666',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontStyle: 'italic',
  };

  const timestampStyle: React.CSSProperties = {
    fontSize: '10px',
    color: '#adb5bd',
    marginTop: '4px',
    textAlign: 'right' as const,
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div style={areaStyle}>
      <div style={headerStyle}>
        <div style={stockInfoStyle}>
          <span style={stockNameStyle}>Apple Inc.</span>
          <span style={stockCodeStyle}>AAPL</span>
        </div>
        <div style={{
          fontSize: '12px',
          color: '#666',
          fontFamily: 'Inter, sans-serif'
        }}>
          AI 주식 분석 어시스턴트
        </div>
      </div>

      <div style={chatContainerStyle}>
        <div style={messagesAreaStyle}>
          {messages.map((message) => (
            <div key={message.id} style={messageStyle(message.type === 'user')}>
              <div>
                <div style={messageBubbleStyle(message.type === 'user')}>
                  {message.content}
                </div>
                <div style={{
                  ...timestampStyle,
                  textAlign: message.type === 'user' ? 'right' : 'left'
                }}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div style={loadingStyle}>
              <div style={loadingBubbleStyle}>
                AI가 답변을 준비하고 있습니다...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={inputAreaStyle}>
          <textarea
            style={inputStyle}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Apple 주식에 대해 궁금한 점을 질문해보세요..."
            rows={1}
          />
          <button
            style={{
              ...sendButtonStyle,
              opacity: inputMessage.trim() ? 1 : 0.5,
              cursor: inputMessage.trim() ? 'pointer' : 'not-allowed'
            }}
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default CentralArea; 