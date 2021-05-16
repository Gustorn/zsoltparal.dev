module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("MY_HEROKU_URL"),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "c38eb3fa2dae622180da4d396f9f4bc6"),
    },
  },
});
