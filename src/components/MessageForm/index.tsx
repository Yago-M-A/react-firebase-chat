import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react'
import { BsUpload } from 'react-icons/bs'
import * as S from './styles'

type MessageFormProps = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
  text: string
  setText: Dispatch<SetStateAction<string>>
  setImg: Dispatch<SetStateAction<File | undefined>>
}

const MessageForm = ({
  handleSubmit,
  text,
  setText,
  setImg
}: MessageFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImg(e.target.files[0])
    }
  }
  return (
    <S.MessageForm onSubmit={handleSubmit}>
      <label htmlFor="img">
        <BsUpload />
      </label>
      <input
        type="file"
        id="img"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <div>
        <input
          type="text"
          placeholder="Enter Message"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        />
      </div>
      <div>
        <button type="submit">Send</button>
      </div>
    </S.MessageForm>
  )
}

export default MessageForm
