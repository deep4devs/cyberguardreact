// This fixes the "global is not defined" error
import { Buffer } from 'buffer';

// Add global to window
declare global {
  interface Window {
    global: any;
  }
}

// Polyfill global for browser
if (typeof window !== 'undefined') {
  window.global = window;
  window.Buffer = Buffer;
}
