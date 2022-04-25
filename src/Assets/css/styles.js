import { Paper } from "@material-ui/core";
import styled from "styled-components";

export const LoginStyles = styled(Paper)`
  background-color: #ffe77d;
  min-height: 100vh;
  min-width: 100vw;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-areas: "login";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  .login-container {
    align-self: center;
    justify-self: center;
    background-color: rgba(255, 255, 255);
    z-index: 2;
    width: 400px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.56),
      0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);

    margin: 2.5em;
    padding: 2.5em 1.5em;
    display: grid;
    align-items: start;
    align-content: start;
    grid-gap: 1em;
    border: 0.07em solid rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    opacity: 0.95;

    @media (max-width: 400px) {
      width: 100%;
    }

    .header {
      display: grid;
      align-items: start;
      align-content: start;
      justify-items: center;
      text-align: center;
      grid-gap: 1em;
      /* border-bottom: 0.05em solid lightblue; */

      .brand-logo {
        height: 10em;
        width: 10em;
        /* box-shadow: 0 10px 25px -8px rgba(0, 0, 0, 0.56),
          0 2px 15px 0px rgba(0, 0, 0, 0.12), 0 4px 8px -3px rgba(0, 0, 0, 0.2); */
        /* img {
          margin: 1em !important;
          padding: 1em !important;
        } */
      }
      .brand-name {
        font-weight: 900;
        opacity: 0.75;
      }
      .brand-tagline {
        font-weight: 400;
      }
    }

    .error {
      display: grid;
      grid-auto-flow: column;
      justify-items: start;
      justify-content: start;
      align-items: center;
      font-size: 0.8em;
      font-weight: 500;
      margin: 3px;
      padding: 3px 8px;
      color: ${(p) => p.theme.palette.secondary.main};
    }

    .body {
      display: grid;
      grid-gap: 1em;
      align-content: start;

      .body-title {
        text-align: center;
        display: grid;
        grid-auto-flow: column;
        justify-content: center;
        justify-items: start;
        align-items: center;
        .badge {
          ${"" /* background-color: ${(p) => p.theme.palette.primary.dark}; */}
          background-color: #ffe77d;
          padding: 3px;
          border-radius: 5px;
          margin: 0 5px;
          color: #fff;
          font-size: 0.75em;
          font-weight: 900;
        }
      }

      .form {
        display: grid;
        grid-gap: 1em;
        align-content: start;
        align-items: start;

        .forgetpass {
          justify-self: end;
          align-self: center;
          padding: 0;
          span {
            padding: 0;
            text-align: right;
          }
          a {
            text-decoration: none !important;
          }
        }

        .submit-btn {
          /* box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3); */
        }
      }
    }

    .footer {
      margin-top: 2em;
      border-top: 1px solid black;
      display: grid;
      justify-items: center;
      align-items: center;
      grid-gap: 0.4em;
      .title {
        justify-self: center;
        background-color: #ffe77d;
        margin-top: -10px;
        font-size: 0.7em;
        text-align: center;
        padding: 0 0.5em;
      }

      .tuo_logo {
        height: 35px;
        width: 35px;
        box-shadow: 0 10px 25px -8px rgba(0, 0, 0, 0.56),
          0 2px 15px 0px rgba(0, 0, 0, 0.12), 0 4px 8px -3px rgba(0, 0, 0, 0.2);
      }

      .tuo-name {
        font-weight: 700;
        font-size: 0.67em;
      }
    }
  }
`;

export const StyledImageBackground = styled.div`
  background: url("${(p) => p.imgSrc}") no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  min-width: 100vw;
  opacity: 0;

  transition: 2s opacity cubic-bezier(0.95, 0.05, 0.795, 0.035);
  -webkit-transition: 2s opacity cubic-bezier(0.95, 0.05, 0.795, 0.035);
  -moz-transition: 2s opacity cubic-bezier(0.95, 0.05, 0.795, 0.035);
  -o-transition: 2s opacity cubic-bezier(0.95, 0.05, 0.795, 0.035);

  &.active {
    opacity: 1;
  }
`;
