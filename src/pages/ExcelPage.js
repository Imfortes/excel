import {Page} from '@core/page/Page';
import {createStore} from '@core/store/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {normalizeInitialState} from '@/redux/initialState';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {StateProcessor} from '@core/page/StateProcessor';
import {LocalStorageClient} from '@/shared/LocalStorageClient';

export class ExcelPage extends Page {
    constructor(param) {
        super(param)

        this.storeSub = null
        this.processor = new StateProcessor(
            new LocalStorageClient(this.params),
            400
        )
    }
    async getRoot() {
        // const params = this.params ? this.params : Date.now().toString()
        // const state = storage(storageName(params))
        // const stateListener = debounce(state => {
        //     console.log('App State', state)
        //     storage(storageName(params), state)
        // }, 300)

        const state = await this.processor.get()
        const initialState = normalizeInitialState(state)
        const store = createStore(rootReducer, initialState)

        this.storeSub = store.subscribe(this.processor.listen)

        this.excel = new Excel( {
            components: [Header, Toolbar, Formula, Table],
            store
        });

        console.log('state', state)
        console.log('initialState', initialState);
        console.log('Excel', this.excel);

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
        this.storeSub.unsubscribe()
    }

    destroy() {
        this.excel.destroy()
    }
}
