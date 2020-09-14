const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    /* 
      TODO get email, password from req.body 
      TODO check if user already exists. If they do, reject the request 
      TODO salt and hash password 
      TODO create the user in the db 
      TODO put the user on session 
      TODO send confirmation 
*/

    const db = req.app.get('db')
    const { email, password } = req.body

    //Check if user exists, [user] lets you pull of the first value, not requiring [0]
    const [user] = await db.check_user([email])

    //Checks if user already exists. Use return because it will kick them out and thus ending the function for them.
    if (user) {
      return res.status(409).send('User already exists.')
    }
    //Salt and has the password. 
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    //Create the user in the DB. 
    const [newUser] = await db.register_user([email, hash])

    //Put the new user on session.
    req.session.user = newUser

    //Nodemailer would happen here. Confirmation. 

    //Send Confirmation
    res.status(200).send(req.session.user)




  },
  login: async (req, res) => {
    /* 
        TODO get email and password from req.body 
        TODO see if the user exists. If they don't, reject the request 
        TODO Compare password and hash. If there is a mismatch, reject the request 
        TODO Put the user on session 
        TODO send confirmation 
    */
    const db = req.app.get('db')
    const { email, password } = req.body

    const [existingUser] = await db.check_user([email])

    if (!existingUser) {
      return res.status(404).send('User not found.')
    }

    //Compare password and hash.
    const isAuthenticated = bcrypt.compareSync(password, existingUser.hash)

    //compareSync returns a boolean, allowing us to check truthy/falsey
    if (!isAuthenticated) {
      return res.status(403).send('Incorrect password or email')
    }

    delete existingUser.hash

    req.session.user = existingUser

    res.status(200).send(req.session.user)


  },
  logout: async (req, res) => {
    req.session.destroy()
    return res.sendSatus(200)
  },
  getUser: (req, res) => {
    //TODO Get user from session

    if (req.session.user) {
      res.status(200).send(req.session.user)
    } else {
      res.status(404).send('No session found.')
    }
  },
}
