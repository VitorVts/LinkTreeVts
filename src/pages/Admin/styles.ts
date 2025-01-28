import styled from "styled-components";
import { Container } from "@mui/material";

export const StyledContainer = styled(Container)`
  text-align: left;
  margin-top: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 40px;
  padding: 20px;
  background-color: #fbfbfb;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const BannerContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const Banner = styled.img`
  width: 100%;
  height: auto;
  border-radius: 30px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    bottom: -40px;
  }
`;

export const Avatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 6px solid #ffffff;
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;

  @media (max-width: 768px) {
    width: 130px;
    height: 130px;
    bottom: -60px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 60px;
  padding-right: 60px;
  margin-top: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-top: 30px;
  }
`;

export const PersonalInfoContainer = styled.div`
  max-width: 50%;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    max-width: 100%;
    text-align: center;
    margin-top: 10px;
    padding-bottom: 10px;
  }
`;

export const ContactInfoContainer = styled.div`
  max-width: 50%;
  text-align: right;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    max-width: 100%;
    text-align: center;
    margin-top: 20px;
    padding-bottom: 10px;
  }
`;

export const ContainerText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 5px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;