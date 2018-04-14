module.exports = {
  server: {
      port: 4000, // Port the express app is listening on
      secret: "nlM4bMXPFxqRMAjELa9cc6km2bKDSpk3dYkCZYrpDHpgroCdw2RaxMfgERHmSpD3DNJyoavdFLzTExssVV63kCtipz65bWqI9ykjjQXvLwy6lTjxoYUD7w6GOer8Erh2", // Random 128 character string for sessions
    },
    database: {
      /*
       * URL to connect to the database. Takes the form:
       *  mongodb://[ip address]:[port]/[database name]
       */
      url: 'mongodb://35.184.205.111:27017/groupify'//'mongodb://127.0.0.1:27017/groupify'
    }
}
