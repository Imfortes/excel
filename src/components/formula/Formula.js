import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {

    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click']
        })
    }

    toHTML() {
        return `
            <div class="excel__formula">
                <div class="formula-info">Fx</div>

                <div class="formula-input" 
                contenteditable="true" 
                spellcheck="false"></div>
            </div>
        `
    }

    onInput(event) {
        console.log(this.$root)

        console.log('onInput Formula', event)
        console.log(event.target.textContent.trim())
    }

    onClick(event) {
        console.log('click')
    }
}
