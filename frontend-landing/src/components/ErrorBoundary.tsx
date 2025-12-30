import React, { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            padding: '20px',
          }}
        >
          <div
            style={{
              background: 'rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(71, 85, 105, 0.3)',
              borderRadius: '12px',
              padding: '40px',
              maxWidth: '600px',
              width: '100%',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              color: '#e2e8f0',
            }}
          >
            <h1
              style={{
                fontSize: '28px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#f1f5f9',
              }}
            >
              Oops! Something went wrong
            </h1>

            <p
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '24px',
                color: '#cbd5e1',
              }}
            >
              We encountered an unexpected error. Please try again or refresh the page.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <details
                style={{
                  marginBottom: '24px',
                  padding: '16px',
                  background: 'rgba(15, 23, 42, 0.5)',
                  borderRadius: '8px',
                  border: '1px solid rgba(71, 85, 105, 0.2)',
                  cursor: 'pointer',
                }}
              >
                <summary
                  style={{
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#fbbf24',
                    fontSize: '14px',
                  }}
                >
                  Error Details (Development Mode)
                </summary>

                <div
                  style={{
                    marginTop: '12px',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    color: '#f87171',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    padding: '8px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '4px',
                  }}
                >
                  <strong>Error Message:</strong>
                  {'\n'}
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo && (
                    <>
                      <strong>Component Stack:</strong>
                      {'\n'}
                      {this.state.errorInfo.componentStack}
                    </>
                  )}
                </div>
              </details>
            )}

            <button
              onClick={this.resetError}
              style={{
                padding: '12px 32px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#0f172a',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  '0 6px 20px rgba(59, 130, 246, 0.6)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  '0 4px 15px rgba(59, 130, 246, 0.4)';
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
