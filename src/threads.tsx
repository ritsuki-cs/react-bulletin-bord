import { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

interface Data {
  id: string,
  title: string
}

let offset = 0

export function Threads() {
  const instance = axios.create({
    baseURL: 'https://railway-react-bulletin-board.herokuapp.com',
  })

  const [threads, setThreads] = useState([]);
  useEffect(() => {
    instance.get('/threads', {
      params: {
        offset: offset,
      },
    })
    .then(res => {
      console.log(res)
      setThreads(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const beforeList = () => {
    if (offset >= 10) {
      offset -= 10
      instance.get('/threads', {
        params: {
          offset: offset,
        },
      })
        .then(res => {
          console.log(res)
          setThreads(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
    else {
      offset = 0
    }
  }

  const nextList = () => {
    offset += 10
    instance
      .get('/threads', {
        params: {
          offset: offset,
        },
      })
      .then(res => {
        console.log(res)
        setThreads(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }


  return (
    <div className="Threads">
      <div className="title">新着スレッド</div>
      <table className="thread-list">
        {threads.map((data: Data) => (
          <tr>
            <td>{data.id}</td>
            <td>
              <Link to={'/thread/' + data.id} className="thread-link" >{data.title}</Link>
            </td>
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
  )
}