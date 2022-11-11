import styled from "styled-components";

function MixModal(props) {
  const { open, close } = props;
  return (
    <div>
      {open ? (
        <Background onClick={close}>
          <section onClick={(e) => e.stopPropagation()}>
            <main>{props.children}</main>
          </section>
        </Background>
      ) : null}
    </div>
  );
}

const Background = styled.div`
  background-color: rgba(13, 12, 15, 0.7);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  & section {
    position: fixed;
    top: 5%;
    width: 90%;
    max-width: 600px;
    height: 85vh;
    background-color: ${(props) => props.theme.colors.subBlack};
    border-radius: 5px;
  }
`;
export default MixModal;
