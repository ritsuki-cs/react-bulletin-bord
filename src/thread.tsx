import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { useGetPost, usePostPost } from './api'


export const Thread = () => {
  const { thread, beforeList, nextList, getThread } = useGetPost();
  const { register, handleSubmit, onSubmit, errors } = usePostPost({onPost: () => {
    getThread()
    let comment = document.getElementById('comment')! as HTMLInputElement
    comment.value = ""
  }});
  const location = useLocation()

  // 最適な方法が分からない
  // 以前はGetリクエストでスレッドタイトルを取得できたが、APIの仕様が変わって不便になった
  // const title: string = location.state
  const [title, setTitle] = useState(location.state)

  if (!thread) {
    return (
      // ローディング画面
      <div className="title-loading">Now Loading ...</div>
    )
  }

  const posts = thread.posts;
  const isEmpty: boolean = (posts == null)

  return (
    <div className="Thread">
      <div className="title">{title}</div>
      <div className="contents">
        <div className="post-list">
          {!isEmpty &&
            <>
              <table>
                {posts.map(data => (
                  <tr>
                    <td className="td-post">{data.post}</td>
                  </tr>
                ))}
              </table>
              <div className="buttons">
                <button onClick={beforeList}>前の10件</button>
                {posts.length === 10 &&
                  <button onClick={nextList} className="button-right">
                    次の10件
                  </button>
                }
              </div>
            </>
          }
        </div>
        <div className="new-post">
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              placeholder="投稿しよう！"
              {...register('post', { required: true })}
              className="new-post-input"
              id="comment"
            />
            {errors.post && <div className='error-message'>※ 投稿内容を入力してください</div>}
            <div className="new-post-links">
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
