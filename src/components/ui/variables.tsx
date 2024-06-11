const colorLight = {
    'primary': '#d14040',
    'secondary': '#00769f',
}

const colorDark = {
    'primary': '#d14040',
    'secondary': '#1e272b',
}

export const text = {
    'default': localStorage.getItem('theme') === 'dark' ? 'white' : 'black',
    'secondary': '#6c757d',
    'placeholder': '#6c757d',
    'fontSize': '16px'
}


const menuLight = {
    left: 'white',
    top: 'white',
    textColor: text.default
}

const menuDark = {
    left: '#1e1e1e',
    top: '#1e1e1e',
    textColor: 'white',
}

export const container = {
    backgroundColor: localStorage.getItem('theme') === 'dark' ? '#353535' : 'white',
}

export const menu = {
    left: localStorage.getItem('theme') === 'dark' ? menuDark.left : menuLight.left,
    top: localStorage.getItem('theme') === 'dark' ? menuDark.top : menuLight.top,
    textColor: localStorage.getItem('theme') === 'dark' ? menuDark.textColor : menuLight.textColor,
    borderBottom: '#c5c5c5'
}

export const color = {
    'primary': localStorage.getItem('theme') === 'dark' ? colorDark.primary : colorLight.primary,
    'secondary': localStorage.getItem('theme') === 'dark' ? colorDark.secondary : colorLight.secondary,
    'success': '#28a745',
    'info': '#17a2b8',
    'warning': '#ffc107',
    'danger': '#dc3545',
    'light': '#f8f9fa',
    'dark': '#343a40',
    'white': '#ffffff',
    'black': '#000000',
    'transparent': 'transparent',
    'lightGrey': '#9e9e9e',
}


export const panel = {
    backgroundColor: localStorage.getItem('theme') === 'dark' ? menu.left : 'white',
    textColor: localStorage.getItem('theme') === 'dark' ? 'white' : colorDark.secondary,
}