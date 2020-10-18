import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
    

    toHTML() {
        return `
            <div class="excel__header">

            <input type="text" class="input" value="Новая таблица">

            <div>

                <div class="button">

                        <span class="material-icons">
                            delete_forever
                        </span>

                    <span class="material-icons">
                            exit_to_app
                        </span>

                </div>

            </div>

        </div>        
        `
    }
}
