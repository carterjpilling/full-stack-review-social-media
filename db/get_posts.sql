SELECT p.id, u.email, p.users_id AS author_id, p.content, p.created_at  From posts p 
JOIN users u ON p.users_id = u.id;
/*Get all posts and connect a user id to the post id. */