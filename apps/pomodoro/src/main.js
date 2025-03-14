import { mount } from 'svelte'
import App from './App.svelte'
import './global.css'
import '@zr/ui/ui.css'

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
