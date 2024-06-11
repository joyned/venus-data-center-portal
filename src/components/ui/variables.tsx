const colorLight = {
    'primary': '#1c8daa',
    'secondary': '#004a64',
}

const colorDark = {
    'primary': '#652F2C',
    'secondary': '#1e272b',
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
}

export const text = {
    'default': localStorage.getItem('theme') === 'dark' ? 'white' : '#343a40',
    'secondary': '#6c757d',
    'placeholder': '#6c757d',
    'fontSize': '16px'
}

export const panel = {
    backgroundColor: localStorage.getItem('theme') === 'dark' ? colorDark.secondary : 'white',
    textColor: localStorage.getItem('theme') === 'dark' ? 'white' : colorDark.secondary,
}