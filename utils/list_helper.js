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

module.exports = {
  dummy,
  totalLikes
}