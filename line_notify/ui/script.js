const live = document.getElementById('live')
const historyPanel = document.getElementById('history')
const settingsPanel = document.getElementById('settings')
const list = document.getElementById('list')
const audio = document.getElementById('notifySound')

let paused = localStorage.getItem('pause') === 'true'
let soundEnabled = localStorage.getItem('sound') !== 'false'
let position = localStorage.getItem('position') || 'right-top'
let lastSoundTime = 0

applySettings()

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu()
})

window.addEventListener('message', (e) => {
    const d = e.data

    if (d.action === 'notify') renderNotify(d.payload)
    if (d.action === 'openHistory') openHistory()
    if (d.action === 'closeHistory') closeHistory()
    if (d.action === 'toggleSound') {
        soundEnabled = d.state
        localStorage.setItem('sound', soundEnabled)
        applySettings()
    }
})

function renderNotify(data) {
    if (!data || paused) return

    const duration = data.duration || 4000
    const createdAt = Date.now()

    if (soundEnabled && data.sound !== false) {
        playSound(data.type)
    }

    const n = document.createElement('div')
    n.className = `notify ${data.type}`
    n.innerHTML = `
        <div class="icon"><i class="fas ${getIcon(data.type)}"></i></div>
        <div class="content">
            <div class="title">${data.title || ''}</div>
            <div class="message">${data.message || ''}</div>
            <div class="progress">
                <span style="animation-duration:${duration}ms"></span>
            </div>
        </div>
    `
    live.appendChild(n)

    requestAnimationFrame(() => n.classList.add('show'))

    const h = document.createElement('div')
    h.className = `notify ${data.type} show`
    h.innerHTML = `
        <div class="icon"><i class="fas ${getIcon(data.type)}"></i></div>
        <div class="content">
            <div class="title">${data.title || ''}</div>
            <div class="message">${data.message || ''}</div>
            <div class="time" data-time="${createdAt}">right now</div>
        </div>
    `
    list.prepend(h)

    setTimeout(() => {
        n.classList.remove('show')
        n.classList.add('hide')
        setTimeout(() => n.remove(), 350)
    }, duration)
}

function playSound(type) {
    const now = Date.now()
    if (now - lastSoundTime < 300) return
    lastSoundTime = now

    const sounds = {
        success: 'sounds/success.mp3',
        error: 'sounds/error.mp3',
        info: 'sounds/info.mp3',
        warning: 'sounds/warning.mp3'
    }

    audio.src = sounds[type] || sounds.info
    audio.volume = 0.5
    audio.play().catch(() => {})
}

function openHistory() {
    historyPanel.style.display = 'flex'
    requestAnimationFrame(() => historyPanel.classList.add('show'))
}

function closeHistory() {
    historyPanel.classList.remove('show')
    setTimeout(() => historyPanel.style.display = 'none', 350)
}

function openSettings() {
    settingsPanel.style.display = 'flex'
    requestAnimationFrame(() => settingsPanel.classList.add('show'))
}

function closeSettings() {
    settingsPanel.classList.remove('show')
    setTimeout(() => settingsPanel.style.display = 'none', 350)
}

function togglePause() {
    paused = !paused
    localStorage.setItem('pause', paused)
    applySettings()
}

function toggleSound() {
    soundEnabled = !soundEnabled
    localStorage.setItem('sound', soundEnabled)
    applySettings()
}

function setPosition(pos) {
    position = pos
    localStorage.setItem('position', pos)
    applySettings()
}

function resetSettings() {
    paused = false
    soundEnabled = true
    position = 'right-top'

    localStorage.setItem('pause', paused)
    localStorage.setItem('sound', soundEnabled)
    localStorage.setItem('position', position)

    applySettings()
}

function applySettings() {
    document.querySelectorAll('.setting').forEach(s => s.classList.remove('active'))

    if (paused) document.getElementById('pauseToggle')?.classList.add('active')
    if (soundEnabled) document.getElementById('soundToggle')?.classList.add('active')

    document.querySelectorAll('.position').forEach(p => p.classList.remove('active'))
    const posEl = document.getElementById('pos-' + position)
    if (posEl) posEl.classList.add('active')

    live.className = ''
    live.classList.add('pos-' + position)
}

setInterval(() => {
    document.querySelectorAll('.time').forEach(el => {
        const diff = Math.floor((Date.now() - el.dataset.time) / 1000)
        el.innerText = formatTime(diff)
    })
}, 1000)

function formatTime(sec) {
    if (sec < 5) return 'right now'
    if (sec < 60) return `before ${sec} seconds`
    const min = Math.floor(sec / 60)
    if (min < 60) return `before ${min} minutes`
    return `before ${Math.floor(min / 60)} hours`
}

function clearAll() {
    list.innerHTML = ''
}

function closeMenu() {
    fetch(`https://${GetParentResourceName()}/close`, { method: 'POST' })
}

function getIcon(type) {
    return {
        success: 'fa-check',
        error: 'fa-xmark',
        info: 'fa-info',
        warning: 'fa-triangle-exclamation'
    }[type] || 'fa-info'
}
