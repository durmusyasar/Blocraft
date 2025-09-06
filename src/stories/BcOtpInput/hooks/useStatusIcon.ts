import React from 'react';
import { ErrorOutline, CheckCircle, InfoOutlined, WarningAmber } from "@mui/icons-material";

export const getStatusIconAndColor = (status?: string, color?: string) => {
  const statusIcons = {
    error: React.createElement(ErrorOutline, { color: "error", fontSize: "small" }),
    warning: React.createElement(WarningAmber, { color: "warning", fontSize: "small" }),
    success: React.createElement(CheckCircle, { color: "success", fontSize: "small" }),
    info: React.createElement(InfoOutlined, { color: "info", fontSize: "small" }),
  };

  const statusColors = {
    error: '#f44336',
    warning: '#ff9800',
    success: '#4caf50',
    info: '#2196f3',
  };

  return {
    statusIcon: status ? statusIcons[status as keyof typeof statusIcons] : null,
    statusColor: status ? statusColors[status as keyof typeof statusColors] : color,
  };
};
