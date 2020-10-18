import {$} from '@core/dom'

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || []
    }

    getRoot() {
        const $root = $.create('div', 'excel')

        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el)
            // DEBUG

            if (component.name) {
                window['c' + component.name] = component
            }

            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        console.log(this.components)

        return $root
    }

    render() {
        console.log(this.$el)
        // afterbegin, afterend, beforeend, beforebegin
        // this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`)
        // const node = this.$el.appendChild(document.createElement('h1'))
        // node.textContent = 'TEST';
        // this.$el.appendChild(node);

        this.$el.append(this.getRoot())
        console.log(this.components)

        this.components.forEach(component => component.init())
    }

}
