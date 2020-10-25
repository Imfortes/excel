export class TableSelection {
    constructor() {
        this.group = []
        this.current = null
    }

    // $el instanceof DOM === true
    select($el) {
        this.clear()
        this.group.push($el)
        this.current = $el
        $el.focus().addClass('selected')
    }

    clear() {
        this.group.forEach($el => $el.removeClass('selected'))
        this.group = []
    }

    get selectedIds() {
        return this.group.map($el => $el.id())
    }

    selectGroup($group = []) {
        this.clear()

        this.group = $group
        this.group.forEach($el => $el.addClass('selected'))
    }

    applyStyle(style) {
        this.group.forEach($el => $el.css(style))
    }
}
