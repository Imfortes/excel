import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
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
            this.$formula.text($cell.data.value)
        })

        // this.$on('table:input', $cell => {
        //     this.$formula.text($cell.text())
        // })

        // this.$subscribe(state => {
        //     console.log('FormulaState', state)
        //     console.log('Formula update')
        //     this.$formula.text(state.currentText)
        // })
    }

    storeChanged({currentText}) {
        console.log('changes:', currentText)
        this.$formula.text(currentText)
    }

    onInput(event) {
        console.log(this.$root)
        console.log('onInput Formula', event)
        const text = $(event.target).text()
        this.$emit('formula:input', text)
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('Formula:done')
        }
    }
}
