import React from 'react';
import { CheckCircle, ErrorOutline, InfoOutlined, WarningAmber } from "@mui/icons-material";

export function getStatusIconAndColor(status: string | undefined, color: string | undefined): { statusIcon: React.ReactNode, statusColor: string | undefined } {
  let statusIcon: React.ReactNode = null;
  let statusColor: string | undefined = undefined;
  if (status === "error") {
    statusIcon = <ErrorOutline color="error" fontSize="small" />;
    statusColor = "error";
  } else if (status === "warning") {
    statusIcon = <WarningAmber color="warning" fontSize="small" />;
    statusColor = "warning";
  } else if (status === "success") {
    statusIcon = <CheckCircle color="success" fontSize="small" />;
    statusColor = "success";
  } else if (status === "info") {
    statusIcon = <InfoOutlined color="info" fontSize="small" />;
    statusColor = "info";
  } else if (["primary", "secondary", "success", "error", "info", "warning"].includes(color || "")) {
    if (color === "primary") {
      statusIcon = <InfoOutlined color="primary" fontSize="small" />;
      statusColor = "primary";
    } else if (color === "secondary") {
      statusIcon = <InfoOutlined color="secondary" fontSize="small" />;
      statusColor = "secondary";
    } else if (color === "success") {
      statusIcon = <CheckCircle color="success" fontSize="small" />;
      statusColor = "success";
    } else if (color === "warning") {
      statusIcon = <WarningAmber color="warning" fontSize="small" />;
      statusColor = "warning";
    } else if (color === "error") {
      statusIcon = <ErrorOutline color="error" fontSize="small" />;
      statusColor = "error";
    } else if (color === "info") {
      statusIcon = <InfoOutlined color="info" fontSize="small" />;
      statusColor = "info";
    }
  } else {
    statusIcon = <InfoOutlined color="primary" fontSize="small" />;
    statusColor = "primary";
  }
  return { statusIcon, statusColor };
} 