module.exports = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.status(403).send('Please log in to perform this action.')
  }
}

/*Checks to see if a user is logged in before making or works with posts. THis is something that could be done through postman etc. */