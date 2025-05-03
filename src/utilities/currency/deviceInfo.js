
import { headers } from 'next/headers'; // Import headers if needed within this file, or pass it in

// Modified function to accept headers object
export function getDeviceInfo(requestHeaders) {
  if (!headers) {
    console.warn("getDeviceInfoServer: Request headers object is required.");
    return null;
  }

  const deviceInfo = {
    userAgent: headers.get("user-agent") || "N/A",
    language: requestHeaders.get("accept-language")?.split(",")[0] || "N/A", 
  };
  return deviceInfo;
}
