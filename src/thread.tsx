import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Post {
  id: string,
  post: string
}
interface Data {
  threadId: string,
  title: string,
  posts: Post[]
}

interface Input {
  post: string
}

let offset = 0


export function Thread() {
  const instance = axios.create({
    baseURL: 'https://railway-react-bulletin-board.herokuapp.com',
  })

  // スレッドIDの取得
  const threadId = useParams().thread_id;

  // スレッド内の投稿一覧の取得
  const [thread, setThread] = useState<Data>()
  useEffect(() => {
    instance
      .get(`/threads/${threadId}/posts`, {
        params: {
          threadId: threadId,
          offset: offset,
        },
      })
      .then(res => {
        console.log(res)
        setThread(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const beforeList = () => {
    if (offset >= 10) {
      offset -= 10
      instance
        .get(`/threads/${threadId}/posts`, {
          params: {
            threadId: threadId,
            offset: offset,
          },
        })
        .then(res => {
          console.log(res)
          setThread(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      offset = 0
    }
  }

  const nextList = () => {
    offset += 10
    instance
      .get(`/threads/${threadId}/posts`, {
        params: {
          threadId: threadId,
          offset: offset,
        },
      })
      .then(res => {
        console.log(res)
        setThread(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const { register, handleSubmit } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = data => {
    instance.post(`/threads/${threadId}/posts`, {
      post: data.post
    })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err)
      });
  }

  if (thread) {
    const posts = thread?.posts;

    return (
      <div className="Thread">
        <div className="title">{thread.title}</div>
        <div className="contents">
          <div className="post-list">
            <table>
              {posts.map((data: Post) => (
                <tr>
                  <td className="td-id">{data.id}</td>
                  <td className="td-post">{data.post}</td>
                </tr>
              ))}
            </table>
            <div className="buttons">
              <button onClick={beforeList}>前の10件</button>
              <button onClick={nextList} className="button-right">
                次の10件
              </button>
            </div>
          </div>
          <div className="new-post">
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                placeholder="投稿しよう！"
                {...register('post')}
                className="new-post-input"
              />
              <div className='new-post-links'>
                <Link to="/" className="link-top">
                  Topに戻る
                </Link>
                <input type="submit" value="投稿" className="new-post-button" />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        {/* <div className="title">スレッドが取得できませんでした</div> */}
      </div>
    )
  }
}
