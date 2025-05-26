import React, { useState, useRef, useEffect } from 'react';
import { stockApi } from '../../api';
import { useStock } from '../../context/StockContext';

interface CentralAreaProps {
  stockCode?: string;
  companyName?: string;
}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const CentralArea: React.FC<CentralAreaProps> = ({ 
  stockCode: propStockCode, 
  companyName: propCompanyName 
}) => {
  const { stockData } = useStock();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reportLoaded, setReportLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // StockContext에서 데이터가 있으면 사용하고, 없으면 기본값 사용
  const stockCode = stockData?.stock?.code || propStockCode || 'AAPL';
  const companyName = stockData?.stock?.company_name || propCompanyName || 'Apple Inc.';

  // Mock AI 응답 생성
  const generateMockResponse = (userMessage: string): string => {
    const responses = [
      `${companyName}에 대한 질문이군요. 현재 주가 동향을 분석해보겠습니다.`,
      `${userMessage}에 대해 설명드리겠습니다. ${companyName}은 안정적인 투자처로 평가받고 있습니다.`,
      `좋은 질문입니다! ${companyName}의 재무 상태는 전반적으로 양호한 편입니다.`,
      `${companyName}의 향후 전망에 대해 말씀드리면, 기술적 분석 결과 상승 추세를 보이고 있습니다.`,
      `시장 분석 결과 ${companyName}은 현재 매수 적기로 판단됩니다.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // 메시지 전송 처리
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // AI 응답 시뮬레이션 (1-2초 지연)
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: generateMockResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, Math.random() * 1000 + 1000);
  };

  // 보고서 로드 함수
  const loadStockReport = async (code: string, forceReload: boolean = false) => {
    if (reportLoaded && !forceReload) return;
    
    setIsLoading(true);
    try {
      const reportResponse = await stockApi.getStockReport(code);
      console.log(reportResponse);
      
      // 보고서를 채팅 메시지로 표시
      const reportMessage: Message = {
        id: Date.now(),
        text: reportResponse.report,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages([reportMessage]);
      setReportLoaded(true);
      
      // 보고서 후 안내 메시지
      setTimeout(() => {
        const guideMessage: Message = {
          id: Date.now() + 1,
          text: `${companyName} (${code}) 보고서를 확인해보세요! 추가로 궁금한 점이 있으시면 언제든 질문해주세요.`,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, guideMessage]);
      }, 1000);
      
    } catch (error) {
      console.error('보고서 로드 실패:', error);
      const errorMessage: Message = {
        id: Date.now(),
        text: `${companyName} (${code}) 보고서를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages([errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 설정 (종목 변경시)
  useEffect(() => {
    setMessages([]);
    setReportLoaded(false);
    
    const timer = setTimeout(() => {
      loadStockReport(stockCode, true);
    }, 500);

    return () => clearTimeout(timer);
  }, [stockCode]);

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

  const messageBubbleStyle = (isUser: boolean, isReport: boolean = false): React.CSSProperties => ({
    maxWidth: isReport ? '90%' : '70%',
    padding: isReport ? '16px 20px' : '12px 16px',
    borderRadius: '18px',
    backgroundColor: isUser ? '#007bff' : (isReport ? '#f8f9fa' : '#f1f3f5'),
    color: isUser ? '#FFFFFF' : '#333333',
    fontFamily: 'Inter, sans-serif',
    fontSize: isReport ? '13px' : '14px',
    lineHeight: isReport ? '1.6' : '1.4',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
    border: isReport ? '1px solid #e9ecef' : 'none',
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
          <span style={stockNameStyle}>{companyName}</span>
          <span style={stockCodeStyle}>{stockCode}</span>
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
          {messages.map((message) => {
            const isReport = message.text.length > 1000; // 긴 메시지는 보고서로 간주
            return (
              <div key={message.id} style={messageStyle(message.isUser)}>
                <div>
                  <div style={messageBubbleStyle(message.isUser, isReport)}>
                    {message.text}
                  </div>
                  <div style={{
                    ...timestampStyle,
                    textAlign: message.isUser ? 'right' : 'left'
                  }}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            );
          })}
          
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
            placeholder={`${companyName} 주식에 대해 궁금한 점을 질문해보세요...`}
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