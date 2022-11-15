import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { IoCaretDownOutline } from "react-icons/io5";

const Dropdown = ({ getSortKey }) => {
  const dropdownItems = [
    { value: "상관없음", name: "전체국가" },
    { value: "A", name: "A조" },
    { value: "B", name: "B조" },
    { value: "C", name: "C조" },
    { value: "D", name: "D조" },
    { value: "E", name: "E조" },
    { value: "F", name: "F조" },
    { value: "G", name: "G조" },
    { value: "H", name: "H조" },
  ];

  const [sortName, setSortName] = useState("전체국가");

  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState("상관없음");
  const onActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const onSelectItem = (e) => {
    setValue(e.target);
    setSortName(e.target.innerText);

    setIsActive((prev) => !prev);
    getSortKey(e.target.id);
  };

  return (
    <Wrapper>
      <DropdownContainer>
        <DropdownBody onClick={onActiveToggle}>
          <DropdownSelect>
            <span>{sortName}</span>
            <span>
              <IoCaretDownOutline />
            </span>
          </DropdownSelect>
        </DropdownBody>
        <DropdownMenu isActive={isActive}>
          {dropdownItems.map((dropdownItems) => (
            <DropdownItemContainer
              id={dropdownItems.value}
              key={dropdownItems.value}
              value={dropdownItems.value}
              name={dropdownItems.name}
              onClick={onSelectItem}
            >
              {dropdownItems.name}
            </DropdownItemContainer>
          ))}
        </DropdownMenu>
      </DropdownContainer>
    </Wrapper>
  );
};

export default Dropdown;

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  background: #141e30;
`;

export const DropdownContainer = styled.main`
  width: 100px;
  margin-top: 5px;
  margin-right: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const DropdownBody = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
  height: 20px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.mainRed};
  padding: 5px;
  border-radius: 5px;
  z-index: 5;
  border: 1px solid ${(props) => props.theme.colors.white};
`;

const DropdownSelect = styled.p`
  width: 100px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  > span {
    font-size: 12px;
  }
`;

const DropdownMenu = styled.ul`
  display: ${(props) => (props.isActive ? `block` : `none`)};
  border: 1px solid ${(props) => props.theme.colors.white};
  margin-top: -2px;
  width: 80px;
  height: 160px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.mainRed};
  position: absolute;
  opacity: 0.8;
  border-radius: 5px;
  z-index: 5;
  padding-left: 10px;
  padding-right: 10px;
`;

const DropdownItemContainer = styled.li`
  margin-top: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2px;
  font-size: 12px;
  &:last-child {
    border-bottom: none;
  }
`;
