const promClient = require("prom-client");

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

// Custom metrics
const tasksCreated = new promClient.Counter({
  name: "tasks_created_total",
  help: "Total number of tasks created",
  registers: [register],
});

const tasksDeleted = new promClient.Counter({
  name: "tasks_deleted_total",
  help: "Total number of tasks deleted",
  registers: [register],
});

const tasksUpdated = new promClient.Counter({
  name: "tasks_updated_total",
  help: "Total number of tasks updated",
  registers: [register],
});

const usersRegistered = new promClient.Counter({
  name: "users_registered_total",
  help: "Total number of users registered",
  registers: [register],
});

const userLogins = new promClient.Counter({
  name: "user_logins_total",
  help: "Total number of user logins",
  registers: [register],
});

const httpRequestDuration = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

const dbErrors = new promClient.Counter({
  name: "database_errors_total",
  help: "Total number of database errors",
  registers: [register],
});

module.exports = {
  register,
  tasksCreated,
  tasksDeleted,
  tasksUpdated,
  usersRegistered,
  userLogins,
  httpRequestDuration,
  dbErrors,
};
