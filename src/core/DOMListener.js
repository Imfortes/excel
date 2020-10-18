import {capitalize} from '@core/utils';

// Framework

export class DOMListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root provided for DomListener`)
        }

        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        console.log(this.listeners, this.$root)
        this.listeners.map(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                const name = this.name || ''
                throw new Error(
                    `Method ${method} is not implemented in ${name} Component`
                )
            }
            console.log('listner and root', listener, this.$root)
            console.log('method', method)

            this[method] = this[method].bind(this)

            this.$root.on(listener, this[method])
        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}

// input => onInput
function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}
