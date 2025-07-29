// 🧪 vitest.config.js — Server-Side Testing Setup for Node.js APIs

export default {
  test: {
    globals: true,                            // 🌍 Enable global variables like `describe` and `it`
    environment: 'node',                      // 🖥️ Use Node-like environment for backend APIs
    include: ['__tests__/**/*.test.js'],      // 📂 Target test files inside __tests__ directory
    },
};
