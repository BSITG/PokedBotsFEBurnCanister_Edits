import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    :root {
        --color-1: #186cb8;
        --color-2: #2a9a9f;
        --color-3: #f1b211;
        --color-4: #e83611;
        --color-5: #f9002f;
    }
    

    html {
        background: url('army-blur.jpg') no-repeat center center fixed; 
        font-family: ${props => props.theme.fontFamilyRegular}; 
        color:  ${props => props.theme.fontColor};
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }

    body {
        background-color:  #00000000;
        font-family: ${props => props.theme.fontFamilyRegular}; 
        color:  ${props => props.theme.fontColor};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: 100vh;
    }
    
    @font-face {
        font-family: ${props => props.theme.fontFamilyRegular}; 
        src: url(${props => props.theme.fontFamilySrcRegular}); 
    }    

    @font-face {
        font-family: ${props => props.theme.fontFamilyMedium}; 
        src: url(${props => props.theme.fontFamilySrcMedium}); 
    }    

    @font-face {
        font-family: ${props => props.theme.fontFamilyBold}; 
        src: url(${props => props.theme.fontFamilySrcBold}); 
    } 

    h2 {
        font-size: 2.5rem;
    }

    div.modal-content {
        background-color: ${props => props.theme.popupModalColor} !important;
    }

    .card
    {
        border: none !important;
    }

    .tooltip-inner
    {
        border-radius: 0px;
        border-width: 3px;
        max-width: 15em;
        line-height: 18px;
        background-color:  ${props => props.theme.inverseBackgroundColor}; 
        font-size: ${props => props.theme.fontSizeRegular} !important;
        padding: 15px;
        font-family: ${props => props.theme.fontFamilyRegular}; 
        color:  ${props => props.theme.inverseFontColor}; 
        border: 3px solid ${props => props.theme.borderColor} !important;
    }

    .tooltip-arrow
    {
        display: none !important;
    }

    .form-control, select, option, input, textbox, button, .btn, .modal-content
    {
        border: 3px solid ${props => props.theme.borderColor} !important;
    }

    a.disabled, .dropdown-item:disabled, select:disabled,  .nav-link.disabled    
    {
        background-color:  ${props => props.theme.background} !important; 
        color:  ${props => props.theme.disabledFontColor} !important;
    }

    .breadcrumb-item a, .breadcrumb-item.active{
        color: white;
        text-decoration: none;
     }

     .list-group, .card-text {
        margin-bottom: 10px !important;
        overflow-y:scroll !important;
        overflow-x:hidden !important;
        -webkit-overflow-scrolling: touch;
    }

    .breadcrumb {
        margin-bottom: 5px !important;
    }

    .list-group-item  {
        background-color:  ${props => props.theme.background} !important; 
        color:  ${props => props.theme.fontColor} !important;
        border: 3px solid ${props => props.theme.borderColor} !important;
        font-size: ${props => props.theme.fontSizeRegular} !important;
        padding: 0 !important;
        border-radius: 0px !important;
        padding-left: .5rem !important;
    }

    a.page-link, span.page-link {
        background-color:  ${props => props.theme.background} !important; 
        color:  ${props => props.theme.fontColor} !important;
        border: 3px solid ${props => props.theme.borderColor} !important;
        font-size: ${props => props.theme.fontSizeRegular} !important;
        border-radius: 0px !important;
    }

    .list-group-item.active, .nav-link.active, .page-item.active .page-link {
        background-color: ${props => props.theme.activeBackgroundColor} !important;
        color: ${props => props.theme.activeFontColor} !important;
    }

    label, .btn, .input-group-text, input[type='text'], .nav-link  {
        color: ${props => props.theme.fontColor} !important;
    }

    .form-label {
        margin: 0 !important;
        line-height: 0 !important;
    }

    .form-control, .card-text {
        font-size: 2rem;
        padding: 0 !important;
        padding-left: .5rem !important;
    }

    .form-control#EqualityOperator {
        width: auto !important;
    }

    .form-check-input:checked {
        background-color:  ${props => props.theme.background} !important;
    }

    .form-check-input:checked[type=checkbox] {
        background-image: none !important;
    }

    /* Style the scroll bars */

    /* width */
    ::-webkit-scrollbar {
        width: 10px;
      }
  
      /* Track */
      ::-webkit-scrollbar-track {
      }
      
      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: white; 
        border-radius: 4px;
      }
  
      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #e9ecef; 
      }

      .react-autosuggest__input:focus {
        outline: none;
        padding-left: 5px;
      }

      .react-autosuggest__input {
        padding-left: 5px;
      }

      .react-autosuggest__suggestion {
        cursor: pointer;
        font-size: ${props => props.theme.fontSizeRegular} !important;
      }

      .react-autosuggest__suggestions-list {
        margin: 0;
        padding: 0;
        padding-left: 5px;
        list-style-type: none;
      }
      
      pre {
          font-family: AsepriteFont;
          line-height: 25px;
          font-size: ${props => props.theme.fontSizeRegular} !important;
     }

     .dropdown-item {
        font-size: ${props => props.theme.fontSizeRegular} !important;
        background:  ${props => props.theme.background};  
        color:  ${props => props.theme.fontColor} !important;
        line-height: 40px !important;
        padding: 0px !important;
        padding-left: 5px !important;
    }

    .dropdown-menu {
        background-color:  ${props => props.theme.background} !important;
    }

    .dropdown-item:hover, a.link-item:hover {
        background-color: ${props => props.theme.activeBackgroundColor} !important;
        color: ${props => props.theme.activeFontColor} !important;
    }

    a:hover {
        color: black !important;
    }

    a {
        color: white !important;
    }

    .dropdown-toggle::after {
        vertical-align: 0 !important;
        margin-right: .255em;
    }
  `

  export const getWizardIndexByStepName = (step) => {
    switch(step) {
        case 'login' : return 0;
        case 'driver' : return 1;
        case 'bots' : return 2;
        case 'confirm-burn' : return 3;
        case 'burn' : return 4;
        case 'gen2bot' : return 5;
    }
  } 