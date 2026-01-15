const live = document.getElementById('live')
const historyPanel = document.getElementById('history')
const list = document.getElementById('list')

let paused = false


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu()
})

window.addEventListener('message', (e) => {
    const d = e.data

    if (d.action === 'notify') renderNotify(d.payload)
    if (d.action === 'openHistory') openHistory()
    if (d.action === 'closeHistory') closeHistory()
})

function renderNotify(data) {
    if (paused) return

    const duration = data.duration || 4000
    const createdAt = Date.now()

    const n = document.createElement('div')
    n.className = `notify ${data.type}`
    n.innerHTML = `
        <div class="icon"><i class="fas ${getIcon(data.type)}"></i></div>
        <div class="content">
            <div class="title">${data.title}</div>
            <div class="message">${data.message}</div>
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
            <div class="title">${data.title}</div>
            <div class="message">${data.message}</div>
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


function openHistory() {
    historyPanel.style.display = 'flex'
    requestAnimationFrame(() => {
        historyPanel.classList.add('show')
        historyPanel.classList.remove('hide')
    })
}

function closeHistory() {
    historyPanel.classList.remove('show')
    historyPanel.classList.add('hide')
    setTimeout(() => {
        historyPanel.style.display = 'none'
    }, 350)
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


function clearAll() { list.innerHTML = '' }
function togglePause() { paused = !paused }
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
