import React, { Component, ReactNode } from 'react';
import { Alert, AlertTitle, Button, Box } from '@mui/material';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

class PasswordInputErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('BcPasswordInput Error Boundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box sx={{ p: 2 }}>
          <Alert severity="error">
            <AlertTitle>Password Input Error</AlertTitle>
            Something went wrong with the password input component.
            {this.state.error && (
              <Box sx={{ mt: 1, fontSize: '0.875rem', fontFamily: 'monospace' }}>
                {this.state.error.message}
              </Box>
            )}
            <Button 
              onClick={this.handleReset} 
              size="small" 
              sx={{ mt: 1 }}
            >
              Try Again
            </Button>
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default PasswordInputErrorBoundary;
