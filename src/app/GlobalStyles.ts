'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    /* Reset CSS */
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    /* Globals CSS */
    :root {
        /* Default Dark Mode */
        --background: #0a0a0a;
        --foreground: #ededed;
        
        /* Interactive Elements */
        --primary: #00c853;
        --secondary: #2a2a2a;
        --accent: #FFD700;

        /* Text Colors */
        --text-primary: #ededed;
        --text-secondary: #999999;
        
        /* Borders */
        --border: #333333;
        
        /* Cards */
        --card-bg: #1e1e1e;
        --card-hover: #252525;

        /* Platform Area */
        --platform-bg: #ffffff;
        --platform-text: #000000;

        --logo-bg: #1e1e1e;
    }

    html,
    body {
        max-width: 100vw;
        overflow-x: hidden;
    }

    body {
        color: var(--text-primary);
        background: var(--background);
        font-family: 'BMHANNAPro', Arial, Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /* transition removed for instant switch */
    }

    /* Update selection color */
    ::selection {
        background: var(--primary);
        color: #fff;
    }

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        word-break: keep-all;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    @media (prefers-color-scheme: dark) {
        html {
            color-scheme: dark;
        }
    }

    /* Common Utility Classes */
    .inner {
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 120px;

        @media (max-width: 1440px) {
            max-width: 1280px;
            padding: 0 100px;
        }

        @media (max-width: 1280px) {
            max-width: 1024px;
            padding: 0 40px;
        }

        @media (max-width: 1024px) {
            max-width: 100%;
            padding: 0 30px;
        }

        @media (max-width: 768px) {
            max-width: 100%;
            padding: 0 20px;
        }
    }
`;

export default GlobalStyles;
