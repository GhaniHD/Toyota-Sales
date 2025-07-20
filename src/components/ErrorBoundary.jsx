import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Terjadi Kesalahan</h2>
            <p className="text-gray-700 mb-4">{this.state.error?.message || 'Maaf, ada masalah saat memuat data.'}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Muat Ulang
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;