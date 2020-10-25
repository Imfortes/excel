import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.subscribe = options.subscribe || []
        this.store = options.store
        this.unsubscribers = []
        // this.storeSub = null

        console.log(options)

        this.prepare()
    }

    // Настраиваем наш компонент до init
    prepare() {

    }
    // Возвращает шаблон компонента
    toHTML() {
        return ''
    }

    // уведомляем слушателей про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    // подписываемися на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    // сюда приходят отлько изменения по тем понлям на которые мы подписались
    storeChanged() {

    }

    isWatching(key) {
        return this.subscribe.includes(key)
    }

    // $subscribe(fn) {
    //     this.storeSub = this.store.subscribe(fn)
    //     // sub.unsubscribe()
    // }

    // инициализируем компонент добавляем домслушателей
    init() {
        this.initDOMListeners()
    }

    // удаляем компонент чистим слушателя
    destroy() {
       this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
        // this.storeSub.unsubscribe()
    }


}
