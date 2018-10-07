# ANOTHER REACT TODO LIST

프론트엔드 개발 공부를 할 때 흔히 만들게 되는 투두리스트. [[미리보기]](https://fc3-basic.surge.sh)


# Redux, mobX (상태 관리 라이브러리 state management library)
## Redux vs mobX
- Redux가 사용량은 10배 많다.
- Redux는 함수형 프로그래밍 기반 / mobX는 상태 관리 기반

## 함수형 프로그래밍이란?
데이터를 함수의 결과물로 취급한다.

## Redux?
1. **store (Global state)** : 어느 위치의 컴포넌트에서든 접근 가능한 저장 상태 / 공간
2. **action** : 정의할 수 있는 동작 / 경우
3. **dispatch** : action을 발생시키는 함수
4. **reducer** : 이전 store의 값과 action을 받아 action type에 따라 store를 새로 업데이트 해주는 함수.

## Redux 작동 순서
1. reducer - 위의 정의와 같음, 함수
2. store - 리듀서의 묶음
3. action - 필요한 작업 타입 정의
4. connect - 컴포넌트에 연결
