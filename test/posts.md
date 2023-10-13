# _expand and _embed, query parameters.

posts: [
    { ... }
    { ... }
]

commments: [
    { ..., postId }
    { ..., postId }
]

Get all posts with all its children.
Bij 1 post horen meerdere comments.
Meervoud comments (children)
`http GET http://localhost:3000/posts?_embed=comments`


Get all comments with its parent
Bij 1 comment hoor t1 post.
Enkelvoud post (parent)
`http GET http://localhost:3000/comments?_expand=post`
