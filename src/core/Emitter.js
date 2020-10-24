export class Emitter {
    constructor() {
        this.listeners = {}
    }

    // dispatch, fire, trigger
    // уведомляем слушателей если они есть
    // 'focus', 'make-it-work', 'formula:done'
    // table.emit('table:select', {a: 1})
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }

    // on, listen
    // подписываемся на уведомления либо добавляем нового слушателя
    // formula.subscribe('table:select', () => {})
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] = this.listeners[event]
                .filter(listener => listener !== fn)
        }
    }

}

// EXAMPLE
// const emitter = new Emitter()
//
// const unsub = emitter.subscribe('vladilen', data =>
// console.log('Sub:', data))
//
// emitter.emit('vlad', 42)
// emitter.emit('123412', 45)
//
// setTimeout(() => {
//     emitter.emit('vlad', 'After 2 sec')
// }, 2000)
//
// setTimeout(() => {
//     unsub()
// }, 3000)
//
// setTimeout(() => {
//     emitter.emit('vlad', 'After 4 sec')
// }, 4000)
