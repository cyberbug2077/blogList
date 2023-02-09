const listHelper = require('../utils/list_helper')
const {listWithOneBlog, listWithSixBlogs} = require('./blogListForTest')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('calculate the total likes of the list with 6 blogs', () => {
    const result = listHelper.totalLikes(listWithSixBlogs)
    expect(result).toBe(36)
  })
})