const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0
    for(const {likes} of blogs) {
        total += likes
    }
    return total
}

const favoriteBlog = (blogs) => {
    const reducer = (prev, curr) => {
        return prev.likes >= curr.likes ? prev : curr
    }
    const {title, author, likes} = blogs.reduce(reducer, blogs[0])
    return {title, author, likes}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}