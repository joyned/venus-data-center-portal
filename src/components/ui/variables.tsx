const colorLight = {
    'primary': '#00769f',
    'secondary': '#d14040',
}

const colorDark = {
    'primary': '#014259',
    'secondary': '#1e272b',
}

export const text = {
    'default': localStorage.getItem('theme') === 'dark' ? '#bfbfbf' : '#bfbfbf',
    'secondary': '#6c757d',
    'placeholder': '#6c757d',
    'fontSize': '16px',
}

const menuLight = {
    'left': 'white',
    'top': '#F5F3EF',
    'textColor': text.default
}

const menuDark = {
    'left': '#212120',
    'top': '#212120',
    'textColor': text.default,
}

export const button = {
    'backgroundColor': localStorage.getItem('theme') === 'dark' ? colorDark.primary : colorLight.primary,
    'transparentColor': localStorage.getItem('theme') === 'dark' ? 'white' : colorLight.primary,
}

export const container = {
    'backgroundColor': localStorage.getItem('theme') === 'dark' ? '#292929' : '#F5F3EF',
}

export const menu = {
    'left': localStorage.getItem('theme') === 'dark' ? menuDark.left : menuLight.left,
    'top': localStorage.getItem('theme') === 'dark' ? menuDark.top : menuLight.top,
    'textColor': localStorage.getItem('theme') === 'dark' ? menuDark.textColor : menuLight.textColor,
}

export const color = {
    'primary': localStorage.getItem('theme') === 'dark' ? colorDark.primary : colorLight.primary,
    'secondary': localStorage.getItem('theme') === 'dark' ? colorDark.secondary : colorLight.secondary,
    'borderColor': localStorage.getItem('theme') === 'dark' ? '#3d3d3d' : '#c5c5c5',
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
    'darkGrey': '#424242',
}


export const panel = {
    'backgroundColor': localStorage.getItem('theme') === 'dark' ? menu.left : 'white',
    'textColor': localStorage.getItem('theme') === 'dark' ? 'white' : colorDark.secondary,
    'shadowColor': localStorage.getItem('theme') === 'dark' ? 'rgb(81 79 75 / 50%)' : 'rgba(204,197,185,.5)',
}