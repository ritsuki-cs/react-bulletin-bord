import { useState, useEffect } from 'react';
import axios from 'axios'

interface Data {
  "id": string,
  "title": string
}
export function Thread() {
  const instance = axios.create({
    baseURL: 'https://virtserver.swaggerhub.com/INFO_3/BulletinBoardApplication/1.0.0',
  })

  const [threads, setThreads] = useState([]);
  useEffect(() => {
    instance.get('/threads', {
      params: {
        offset: 0,
      },
    })
    .then(res => {
      console.log(res)
      setThreads(res.data)
      // console.log(threads);
    })
    .catch(err => {
      console.log(err)
    })
  }, [])


  return (
    <div className="Thread">
      <div className="title">新着スレッド</div>
      <table className="thread-list">
        {threads.map((data: Data) => (
          <tr>
            <td>{data.title}</td>
          </tr>
        ))}
        <tr>
          <td>テスト1(取得したデータではない)</td>
        </tr>
        <tr>
          <td>テスト2(取得したデータではない)</td>
        </tr>
        <tr>
          <td>テスト3(取得したデータではない)</td>
        </tr>
        <tr>
          <td>テスト4(取得したデータではない)</td>
        </tr>
      </table>
    </div>
  )
}