import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
    }

    toHTML() {
        return `
            <div class="excel__formula">
                <div class="formula-info">Fx</div>

                <div id="formula" 
                class="formula-input" 
                contenteditable="true" 
                spellcheck="false"></div>
            </div>
        `
    }

    init() {
        super.init()

        this.$formula = this.$root.find('#formula')

        this.$on('table:select', $cell => {
            this.$formula.text($cell.text())
        })

        this.$on('table:input', $cell => {
            this.$formula.text($cell.text())
        })
    }

    onInput(event) {
        console.log(this.$root)
        console.log('onInput Formula', event)

        this.$emit('formula:input', $(event.target).text())
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('Formula:done')
        }
    }
}
