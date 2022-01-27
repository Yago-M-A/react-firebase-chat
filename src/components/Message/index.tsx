import { Timestamp } from 'firebase/firestore'
import * as S from './styles'
import Moment from 'react-moment'
import { useEffect, useRef } from 'react'

type msgProps = {
  text: string
  to: string
  from: string
  createdAt: Timestamp
  media: string
}

type MessageProps = {
  msg: msgProps
  user1: string
}

const Message = ({ msg, user1 }: MessageProps) => {
  console.log(msg)
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msg])
  return (
    <S.Wrapper
      own={msg.from === user1 ? 'own' : ''}
      send={msg.from === user1 ? 'me' : 'frind'}
      ref={scrollRef}
    >
      <p>
        {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
        {msg.text}
        <br />
        <small>
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </small>
      </p>
    </S.Wrapper>
  )
}

export default Message
