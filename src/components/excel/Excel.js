import {$} from '@core/dom'
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber';
import {updateDate} from '@/redux/actions';
import {preventDefault} from '@core/utils';

export class Excel {
    constructor(options) {
        this.components = options.components || []
        this.store = options.store
        this.emitter = new Emitter()
        this.subscriber = new StoreSubscriber(this.store)
    }

    getRoot() {
        const $root = $.create('div', 'excel')

        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        }

        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            // DEBUG

            // if (component.name) {
            //     window['c' + component.name] = component
            // }

            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        console.log(this.components)

        return $root
    }

    init() {
        console.log(process.env.NODE_ENV)
        if (process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', preventDefault)
        }
        this.store.dispatch(updateDate())
        console.log(this.$el)
        // afterbegin, afterend, beforeend, beforebegin
        // this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`)
        // const node = this.$el.appendChild(document.createElement('h1'))
        // node.textContent = 'TEST';
        // this.$el.appendChild(node);
        console.log(this.components)

        this.subscriber.subscribeComponents(this.components)
        this.components.forEach(component => component.init())
    }

    destroy() {
        this.subscriber.unsubscribeFromStore()
        this.components.forEach(component => component.destroy())
        document.removeEventListener('contextmenu', preventDefault)
    }

}
