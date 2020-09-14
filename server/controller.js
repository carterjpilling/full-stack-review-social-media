//Utility function
const getAllPosts = async (db) => {
  const posts = await db.get_posts()
  return posts
}

module.exports = {
  getPosts: async (req, res) => {
    const db = req.app.get('db')
    const posts = await getAllPosts(db)
    //posts is not in [] because we want it to be an array.
    res.status(200).send(posts)
  },
  addPost: async (req, res) => {
    //TODO Create new post

    const db = req.app.get('db')
    //already verifiedd that there is a user on session with the middleware
    //pulls id from session
    const { id } = req.session.user
    //Pulls content from body.
    const { content } = req.body

    //Save post to the db. 
    await db.add_post([id, content])

    //Send array of posts. 
    const posts = await getAllPosts(db)
    res.status(200).send(posts)

  },
  editPost: async (req, res) => {
    //TODO Pull User, Get Content, Save updated, Send back

    const db = req.app.get('db')
    const { content } = req.body
    //Param on the endpoints in index.js
    const { post_id } = req.body

    await db.edit_post([content, post_id])

    const posts = await getAllPosts(db)
    res.status(200).send(posts)

  },
  deletePost: async (req, res) => {
    //TODO Delete existing post

    const db = req.app.get('db')

    const { post_id } = req.params

    await db.delete_post([post_id])

    const posts = await getAllPosts(db)
    res.status(200).send(posts)
  }
};
