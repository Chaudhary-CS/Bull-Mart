module.exports = {
  apps: [
    {
      name: "bulls-mart-backend",
      script: "server.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        PORT: 8000,
        DB_URL: "mongodb://localhost:27017/bullmart"
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8000,
        DB_URL: process.env.DB_URL || "mongodb://localhost:27017/bullmart"
      },
      env_staging: {
        NODE_ENV: "staging",
        PORT: 8000,
        DB_URL: process.env.DB_URL || "mongodb://localhost:27017/bullmart_staging"
      },
      // Logging configuration
      log_file: "./logs/combined.log",
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      
      // Restart configuration
      max_restarts: 10,
      min_uptime: "10s",
      max_memory_restart: "1G",
      
      // Watch configuration (for development)
      watch: false,
      ignore_watch: ["node_modules", "logs", "uploads"],
      
      // Health check
      health_check_grace_period: 3000,
      health_check_fatal_exceptions: true,
      
      // Kill timeout
      kill_timeout: 5000,
      
      // Listen timeout
      listen_timeout: 8000,
      
      // Cron restart (optional - restart every 24 hours)
      cron_restart: "0 2 * * *",
      
      // Environment variables
      env_file: ".env",
      
      // Node options
      node_args: "--max-old-space-size=2048",
      
      // Source map support
      source_map_support: true,
      
      // Metrics
      pmx: true,
      
      // Auto restart on file change (development only)
      autorestart: true,
      
      // Merge logs
      merge_logs: true,
      
      // Time format
      time: true
    }
  ],

  deploy: {
    production: {
      user: "ubuntu",
      host: "your-production-server.com",
      ref: "origin/main",
      repo: "https://github.com/Chaudhary-CS/Bull-Mart.git",
      path: "/var/www/bulls-mart",
      "pre-deploy-local": "echo 'This is a local executed command'",
      "post-deploy": "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "echo 'This is a pre-setup command'"
    },
    
    staging: {
      user: "ubuntu",
      host: "your-staging-server.com",
      ref: "origin/develop",
      repo: "https://github.com/Chaudhary-CS/Bull-Mart.git",
      path: "/var/www/bulls-mart-staging",
      "post-deploy": "npm install && pm2 reload ecosystem.config.js --env staging"
    }
  },

  // Monitoring configuration
  monitoring: {
    // Enable PM2 monitoring
    pmx: true,
    
    // Metrics collection
    metrics: {
      // Collect metrics every 30 seconds
      interval: 30000,
      
      // Enable custom metrics
      custom_metrics: true,
      
      // Enable system metrics
      system_metrics: true
    }
  }
}; 