const listHelper = require('../utils/list_helper')
const blogLists = require('./blogListForTest')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogLists.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('calculate the total likes of the list with 6 blogs', () => {
    const result = listHelper.totalLikes(blogLists.listWithSixBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite', () => {
  test('find the top faverite blog of the list with 6 blogs', () => {
    const result = listHelper.favoriteBlog(blogLists.listWithSixBlogs)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })
})