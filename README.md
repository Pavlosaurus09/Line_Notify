---
# Line Notify System

Line Notify System is a simple and modern notification system for FiveM servers.
It provides clean NUI notifications with a built-in notification history menu.

This project is **free to use** and designed to be easy to integrate into any FiveM server.

---

✨ Features

- Modern NUI-based notifications
- Notification history menu (default key: F10)
- Built-in Settings panel
- Pause Feed toggle
- Sound Enable / Disable toggle
- 4 Position modes (Right Top, Left Top, Center Left, Center Right)
- Reset to default settings
- LocalStorage-based settings saving
- Anti-spam sound protection
- Notification progress bar animation
- Server-side trigger support
- Client export API
- Broadcast support (notify all players)
- Optimized client-side performance
- Framework-agnostic (ESX / QBCore / Qbox / Standalone)

---
## ✨ Planned Features
- Sounds -Done-
- Position -Done-
- Database -Done-
- Theme
- Visual Theme
- New Color
---

## 📦 Requirements
- FiveM server (latest artifacts recommended)

No framework dependencies required.

---

## 📦 Exports Client

exports['line_notify']:Notify({
    title = "Client",
    message = "Client notify test",
    type = "info",
    duration = 3000
})

---

## 📦 Exports Server

TriggerEvent('line_notify:notify', source, {
    title = "Server",
    message = "Server notify test",
    type = "success",
    duration = 4000
})

---

## ⚙️ Installation
1. Download
2. Place the `line_notify` folder into your `resources` directory
3. Add the following line to your `server.cfg`: ensure line_notify
4. Restart Server

## ⚙️ Image Notify
<img width="358" height="382" alt="image" src="https://github.com/user-attachments/assets/b34f41d4-c3c4-4125-b6d8-4b4547efbbc3" />

## ⚙️ History Menu
<img width="414" height="771" alt="image" src="https://github.com/user-attachments/assets/c715d967-107e-4cad-95aa-54fef3bcb1cd" />

## ⚙️ Settings Menu
<img width="412" height="658" alt="image" src="https://github.com/user-attachments/assets/b04fc5f9-16ae-41e2-811a-234233fe3c61" />




