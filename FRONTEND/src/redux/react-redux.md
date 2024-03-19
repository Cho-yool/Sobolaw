# 루트 상태

```
import { configureStore } from '@reduxjs/toolkit'
// ...

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
```

rootstate와 dispatch는따로 추가 타이핑 없이 중앙에 유형 정의

# 훅 정의하기

useDispatch와 useSelector는 import 해올 수 있지만 본인의 앱에 맞게 타입생성해주는 게 좋음여

```
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
```

근데 난 공통때 안했음

# 앱에서 사용하기

## Slice 상태, Action 타입 정의하깅
