import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

interface Data {
  threadId: string
  posts: [
    {
      id: string,
      post: string
    }
  ]
}

export function Thread() {
  const instance = axios.create({
    baseURL: 'https://railway-react-bulletin-board.herokuapp.com',
  })

  const threadId = useParams().thread_id;

  const [posts, setPosts] = useState([])
  useEffect(() => {
    instance
      .get(`/threads/${threadId}/posts`, {
        params: {
          threadId: threadId,
          offset: 0,
        },
      })
      .then(res => {
        console.log(res)
        setPosts(res.data)
        console.log(posts);
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="Thread">
      <div className="title"></div>
      <div className="contents">
        <table className="post-list"></table>
        <div className="new-post"></div>
      </div>
    </div>
  )
}
