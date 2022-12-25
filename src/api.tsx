import axios from "axios"
import { useState, useEffect, MouseEventHandler, useCallback } from 'react'
import { useSearchParams, useParams, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler, UseFormRegister, UseFormHandleSubmit, FieldErrorsImpl } from 'react-hook-form'

// ----------------- 型定義(ここから)------------------
// スレッドについての型定義
interface threadsData {
  id: string
  title: string
}
interface threadTitle {
  title: string
}
// 投稿についての型定義
interface threadData {
  threadId: string
  title: string
  posts: postData[]
}
interface postData {
  id: string
  post: string
}
interface postInput {
  post: string
}
// ----------------- 型定義(ここまで) ------------------


// ----------------- API実装(ここから)-------------------
const instance = axios.create({
  baseURL: 'https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com',
})

// スレッドについてのGetリクエスト
export const useGetThread = (): { threads: threadsData[] | undefined, beforeList: MouseEventHandler, nextList: MouseEventHandler} => {
  const [searchParams, setSearchParams] = useSearchParams()
  const offset = Number(searchParams.get('offset') ?? 0)
  const [threads, setThreads] = useState<threadsData[] | undefined>()
  useEffect(() => {
    instance
      .get<threadsData[]>('/threads', {
        params: {
          offset,
        },
      })
      .then(res => {
        console.log(res)
        setThreads(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [offset])

  const beforeList = useCallback(() => {
    setSearchParams({ offset: String(offset >= 10 ? offset - 10 : 0) })
  }, [offset, setSearchParams])

  const nextList = useCallback(() => {
    setSearchParams({ offset: String(offset + 10) })
  }, [offset, setSearchParams])

  return { threads: threads, beforeList: beforeList, nextList: nextList }
}

// スレッドについてのPostリクエスト
export const usePostThread = (): {
  register: UseFormRegister<threadTitle>
  handleSubmit: UseFormHandleSubmit<threadTitle>
  onSubmit: SubmitHandler<threadTitle>
  errors: FieldErrorsImpl<{title: string}>
} => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<threadTitle>()
  const onSubmit: SubmitHandler<threadTitle> = data => {
    instance
      .post('/threads', {
        title: data.title,
      })
      .then(function (res) {
        console.log(res)
        navigate(`/thread/${res.data.id}`, { state: data.title })
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  return {
    register: register,
    handleSubmit: handleSubmit,
    onSubmit: onSubmit,
    errors: errors,
  }
}

// 投稿についてのGetリクエスト
export const useGetPost = (): {
  thread: threadData | undefined,
  beforeList: MouseEventHandler,
  nextList: MouseEventHandler
} => {
  const [searchParams, setSearchParams] = useSearchParams()
  const offset = Number(searchParams.get('offset') ?? 0)
  const threadId = useParams().thread_id
  const [thread, setThread] = useState<threadData>()

  // スレッド内の投稿一覧の取得
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
  }, [threadId, offset])

  // usecallbackを使う
  const beforeList = useCallback(() => {
    setSearchParams({ offset: String(offset >= 10 ? offset - 10 : 0) })
  }, [offset, setSearchParams])

  const nextList = useCallback(() => {
    setSearchParams({ offset: String(offset + 10) })
  }, [offset, setSearchParams])

  return { thread: thread, beforeList: beforeList, nextList: nextList }
}

// 投稿についてのPostリクエスト
export const usePostPost = (): {
  register: UseFormRegister<postInput>
  handleSubmit: UseFormHandleSubmit<postInput>
  onSubmit: SubmitHandler<postInput>
  errors: FieldErrorsImpl<{post: string}>
} => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<postInput>()
  const threadId = useParams().thread_id
  const onSubmit: SubmitHandler<postInput> = data => {
    instance
      .post(`/threads/${threadId}/posts`, {
        post: data.post,
      })
      .then(function (res) {
        console.log(res)
        window.location.reload()
      })
      .catch(function (err) {
        console.log(err)
      })
  }
  return {
    register: register,
    handleSubmit: handleSubmit,
    onSubmit: onSubmit,
    errors: errors,
  }
}
// ----------------- API実装(ここまで))-------------------
