import styled from "styled-components";

function GachaModal(props) {
  const { open, close } = props;
  return (
    <div>
      {open ? (
        <Background onClick={close}>
          <section
          //   onClick={(e) => e.stopPropagation()}
          >
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
    width: 90%;
    max-width: 600px;
    height: 80vh;
    background-color: ${(props) => props.theme.colors.subBlack};
    border-radius: 5px;
    & main {
      padding: 0 20px;
    }
  }
`;
export default GachaModal;
