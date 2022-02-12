import * as S from "./styles";

interface Props {
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

const Editor: React.FC<Props> = ({
  children,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
}) => {
  return (
    <S.Container
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </S.Container>
  );
};

export default Editor;
