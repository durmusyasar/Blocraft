import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { ErrorOutline, Refresh } from '@mui/icons-material';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class OtpInputErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to monitoring service
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('BcOtpInput Error Boundary caught an error:', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            border: '1px solid #f44336',
            borderRadius: 2,
            backgroundColor: '#ffebee',
            minHeight: 120,
            justifyContent: 'center',
          }}
        >
          <ErrorOutline 
            sx={{ 
              fontSize: 48, 
              color: '#f44336', 
              marginBottom: 2 
            }} 
          />
          
          <Typography 
            variant="h6" 
            color="error" 
            gutterBottom
            sx={{ textAlign: 'center' }}
          >
            OTP Input Error
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              textAlign: 'center', 
              marginBottom: 2,
              maxWidth: 300 
            }}
          >
            Something went wrong with the OTP input component. 
            Please try refreshing or contact support if the problem persists.
          </Typography>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Alert 
              severity="error" 
              sx={{ 
                marginBottom: 2, 
                maxWidth: 400,
                fontSize: '0.75rem'
              }}
            >
              <Typography variant="caption" component="div">
                <strong>Error:</strong> {this.state.error.message}
              </Typography>
              {this.state.errorInfo && (
                <Typography variant="caption" component="div" sx={{ marginTop: 1 }}>
                  <strong>Component Stack:</strong>
                  <pre style={{ 
                    fontSize: '0.7rem', 
                    marginTop: 4, 
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}>
                    {this.state.errorInfo.componentStack}
                  </pre>
                </Typography>
              )}
            </Alert>
          )}

          <Button
            variant="contained"
            color="primary"
            startIcon={<Refresh />}
            onClick={this.handleRetry}
            sx={{ marginTop: 1 }}
          >
            Try Again
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default OtpInputErrorBoundary;
