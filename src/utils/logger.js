/**
 * 日志管理工具
 * 根据环境变量控制日志级别和敏感信息过滤
 * development: 显示所有日志(DEBUG)，但过滤敏感信息
 * test: 显示WARN和ERROR，过滤敏感信息
 * production: 只显示ERROR，且只显示基本错误类型
 */

const env = import.meta.env.MODE || 'development';

// 敏感信息正则匹配
const SENSITIVE_PATTERNS = [
  /(api|access)[_\-]?key(=|:)\s*['"]?[a-z0-9]{20,}['"]?/gi,
  /(password|pwd|passwd)(=|:)\s*['"].+?['"]/gi,
  /(jwt|token)(=|:)\s*['"].+?['"]/gi,
  /(db|database)(_|\.)?(host|name|user|pass)(=|:)\s*['"].+?['"]/gi,
];

// 过滤敏感信息
function filterSensitive(data) {
  if (typeof data === 'string') {
    return SENSITIVE_PATTERNS.reduce((str, pattern) => str.replace(pattern, '[FILTERED]'), data);
  }
  if (typeof data === 'object' && data !== null) {
    try {
      return JSON.parse(filterSensitive(JSON.stringify(data)));
    } catch {
      return '[FILTERED: Circular Reference]';
    }
  }
  return data;
}

class Logger {
  static debug(...args) {
    if (env === 'development') {
      console.debug('[DEBUG]', ...args); // 开发环境不过滤
    } else if (env === 'test') {
      console.debug('[DEBUG]', ...args.map(filterSensitive)); // 测试环境过滤
    }
  }

  static log(...args) {
    if (env === 'development') {
      console.log('[INFO]', ...args); // 开发环境不过滤
    } else if (env === 'test') {
      console.log('[INFO]', ...args.map(filterSensitive)); // 测试环境过滤
    }
  }

  static warn(...args) {
    if (env === 'development') {
      console.warn('[WARN]', ...args); // 开发环境不过滤
    } else if (env === 'test') {
      console.warn('[WARN]', ...args.map(filterSensitive)); // 测试环境过滤
    }
  }

  static error(...args) {
    if (env === 'production') {
      // 生产环境只显示错误类型
      console.error('[ERROR]', args[0]?.message || args[0] || 'Error occurred');
    } else if (env === 'development') {
      console.error('[ERROR]', ...args); // 开发环境不过滤
    } else {
      console.error('[ERROR]', ...args.map(filterSensitive)); // 测试环境过滤
    }
  }
}

export default Logger;
