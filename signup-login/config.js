module.exports = {
  server: {
      port: 4000, // Port the express app is listening on
      secret: "nlM4bMXPFxqRMAjELa9cc6km2bKDSpk3dYkCZYrpDHpgroCdw2RaxMfgERHmSpD3DNJyoavdFLzTExssVV63kCtipz65bWqI9ykjjQXvLwy6lTjxoYUD7w6GOer8Erh2", // Random 128 character string for sessions
    },
    database: {
      url: 'mongodb://127.0.0.1:27017/groupify'// URL to connect to the database
    }
}
