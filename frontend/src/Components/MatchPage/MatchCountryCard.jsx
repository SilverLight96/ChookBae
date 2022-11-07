import React from "react";
import styled from "styled-components";
import axios from "axios";


function MatchCountryCard(props) {
    // value -----------------------------------------------
    const baseURL = "https://k7a202.p.ssafy.io/"
    const data = {}
    // axios -----------------------------------------------
    const flagClick = async(id, name) => {
        const dataAxios = await axios
        .get(baseURL + 'v1/match/team/' + id, {
            headers: {
                'Content-Type': 'application/json',
                },
        })
        props.setState(dataAxios.data)
        props.selectedCard(name)
        console.log(props);
    }
    // fromating -------------------------------------------
    props.data.map((elem) => {
        if (data[elem[0]]) {
            data[elem[0]].push(elem.slice(1))
        } else {
            data[elem[0]] = [elem.slice(1)]
        }
    })
    // return country list ---------------------------------
    return (
        <Container>
            {Object.keys(data).map((elem, index) => {
                return(
                    <GroupContainer key={index}>
                        <CountryContainer>
                            <h1>{elem}조</h1>
                        </CountryContainer>
                        {data[elem].map((country, index) => {
                            return (
                                <CountryContainer
                                key={index}
                                onClick={() => flagClick(country[0], country[1])}
                                >
                                    <StyledFlag src={country[2]} />
                                    <StyledName>
                                        <p>{country[1]}</p>
                                    </StyledName>
                                </CountryContainer>
                            )
                        })}
                    </GroupContainer>
                )
            })}
        </Container>
    )
}

export default MatchCountryCard

const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const GroupContainer = styled.div`
    width: 95%;
    height: 100%;
    background-color: #760D27;
    border-radius: 10px;
    padding: 5px 2px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 2%;
`

const CountryContainer = styled.div`
    width: 19%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    color: white;


`

const StyledFlag = styled.img`
    &:hover {
        background-color: #914154;
    }

    width: 100%;
    height: 100%;


`

const StyledName = styled.div`
    width: 100%;
    height: 5%;
    font-size: 5%;
    color: white;
    text-align: center;

`