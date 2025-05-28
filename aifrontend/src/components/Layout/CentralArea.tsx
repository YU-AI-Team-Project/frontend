import React, { useState, useRef, useEffect } from 'react';
import { stockApi, chatApi } from '../../api';
import { useStock } from '../../context/StockContext';
import { useAuth } from '../../context/AuthContext';
import { RagChatRequest, ChatResponse } from '../../api/types';

interface CentralAreaProps {
  stockCode?: string;
  companyName?: string;
}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sources?: any[];
}

const CentralArea: React.FC<CentralAreaProps> = ({ 
  stockCode: propStockCode, 
  companyName: propCompanyName 
}) => {
  const { stockData, setNewsData } = useStock();
  const { username, isAuthenticated, isLoading: authLoading } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reportLoaded, setReportLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // StockContext에서 데이터가 있으면 사용하고, 없으면 기본값 사용
  const stockCode = stockData?.stock?.code || propStockCode || 'AAPL';
  const companyName = stockData?.stock?.company_name || propCompanyName || 'Apple Inc.';
  
  // username을 userID로 사용 (API 호환성)
  const userID = username || 'guest';

  // 채팅 기록을 Message 형태로 변환하는 함수
  const convertChatToMessage = (chat: ChatResponse): Message => ({
    id: chat.id,
    text: chat.chat,
    isUser: chat.role === 'user',
    timestamp: new Date(chat.created_at)
  });

  // 채팅 기록 불러오기
  const loadChatHistory = async (): Promise<boolean> => {
    if (authLoading) {
      console.log('채팅 기록 로드 스킵: 인증 상태 확인 중');
      return false;
    }
    if (!isAuthenticated || !username) {
      console.log('채팅 기록 로드 스킵: 인증되지 않음', { isAuthenticated, username });
      return false;
    }
    
    try {
      console.log('채팅 기록 로드 시작:', { userID, stockCode });
      const chats = await chatApi.getChatHistory(userID, stockCode, 100);
      console.log('불러온 채팅 기록:', chats);
      const convertedMessages = chats.map(convertChatToMessage);
      console.log('변환된 메시지:', convertedMessages);
      setMessages(prev => [...prev, ...convertedMessages]);
      return convertedMessages.length > 0;
    } catch (error) {
      console.error('채팅 기록 로드 실패:', error);
      return false;
    }
  };

  // 메시지 전송 처리
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    // 인증되지 않은 사용자는 채팅할 수 없음
    if (!isAuthenticated) {
      const loginMessage: Message = {
        id: Date.now(),
        text: '채팅 기능을 사용하려면 로그인이 필요합니다.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, loginMessage]);
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      // RAG 채팅 API 호출
      const ragRequest: RagChatRequest = {
        userID: userID,
        stock_code: stockCode,
        message: currentMessage
      };

      const ragResponse = await chatApi.chatWithRag(ragRequest);

      if (ragResponse.success) {
        const aiMessage: Message = {
          id: Date.now() + 1,
          text: ragResponse.response,
          isUser: false,
          timestamp: new Date(),
          sources: ragResponse.sources
        };
        setMessages(prev => [...prev, aiMessage]);
        if (ragResponse.sources && ragResponse.sources.length > 0) {
          setNewsData(ragResponse.sources);
        }
      } else {
        // 에러 메시지 표시
        const errorMessage: Message = {
          id: Date.now() + 1,
          text: ragResponse.error || '응답 생성 중 오류가 발생했습니다.',
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('채팅 API 오류:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: '죄송합니다. 응답 생성 중 오류가 발생했습니다. 다시 시도해주세요.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 보고서 로드 함수
  const loadStockReport = async (code: string, forceReload: boolean = false) => {
    if (reportLoaded && !forceReload) return;
    
    setIsLoading(true);
    try {
      const reportResponse = await stockApi.getStockReport(code);
      console.log(reportResponse);
      
      // 보고서를 채팅 메시지로 표시 (기존 메시지에 추가)
      const reportMessage: Message = {
        id: Date.now(),
        text: reportResponse.report,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, reportMessage]);
      setReportLoaded(true);
      
    } catch (error) {
      console.error('보고서 로드 실패:', error);
      const errorMessage: Message = {
        id: Date.now(),
        text: `${companyName} (${code}) 보고서를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 설정 (종목 변경시)
  useEffect(() => {
    console.log('useEffect 실행:', { stockCode, isAuthenticated, username, authLoading });
    
    // 인증 상태가 로딩 중이면 기다림
    if (authLoading) {
      console.log('인증 상태 확인 중, 초기화 연기');
      return;
    }
    
    setMessages([]);
    setReportLoaded(false);
    
          const initializeChat = async () => {
        console.log('initializeChat 시작:', { stockCode, isAuthenticated, username, authLoading });
        
        // 먼저 보고서를 로드하고
        console.log('보고서 로드 시작');
        await loadStockReport(stockCode, true);
        
        // 그 다음 기존 채팅 기록을 불러옴
        console.log('채팅 기록 로드 시작');
        await loadChatHistory();
      };
    
    const timer = setTimeout(initializeChat, 500);

    return () => clearTimeout(timer);
  }, [stockCode, isAuthenticated, username, authLoading]);

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

  // 채팅 기록 삭제 함수
  const handleClearChat = async () => {
    if (!isAuthenticated || !username) return;
    
    try {
      await chatApi.deleteChatHistory(userID, stockCode);
      setMessages([]);
      setReportLoaded(false);
      // 보고서 다시 로드
      setTimeout(() => {
        loadStockReport(stockCode, true);
      }, 500);
    } catch (error) {
      console.error('채팅 기록 삭제 실패:', error);
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isAuthenticated && (
            <button
              onClick={handleClearChat}
              style={{
                padding: '6px 12px',
                backgroundColor: '#dc3545',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              채팅 기록 삭제
            </button>
          )}
          <div style={{
            fontSize: '12px',
            color: '#666',
            fontFamily: 'Inter, sans-serif'
          }}>
            AI 주식 분석 어시스턴트 {username && `(${username})`}
          </div>
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
                  {message.sources && message.sources.length > 0 && (
                    <div style={{
                      marginTop: '8px',
                      padding: '8px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#666',
                      maxWidth: '70%'
                    }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                        참고 자료 ({message.sources.length}개)
                      </div>
                      {message.sources.slice(0, 3).map((source: any, index: number) => (
                        <div key={index} style={{ marginBottom: '2px' }}>
                          • {source.title || (source.content && source.content.substring(0, 50) + '...') || '관련 뉴스'}
                          {source.relevance_score && (
                            <span style={{ color: '#28a745', marginLeft: '4px' }}>
                              ({Math.round(source.relevance_score * 100)}% 관련)
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
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
            style={{
              ...inputStyle,
              backgroundColor: isAuthenticated ? '#FFFFFF' : '#f8f9fa',
              color: isAuthenticated ? '#333' : '#6c757d'
            }}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              isAuthenticated 
                ? `${companyName} 주식에 대해 궁금한 점을 질문해보세요...`
                : '로그인 후 AI 채팅을 이용할 수 있습니다.'
            }
            rows={1}
            disabled={!isAuthenticated}
          />
          <button
            style={{
              ...sendButtonStyle,
              opacity: (inputMessage.trim() && isAuthenticated) ? 1 : 0.5,
              cursor: (inputMessage.trim() && isAuthenticated) ? 'pointer' : 'not-allowed'
            }}
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading || !isAuthenticated}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default CentralArea; 